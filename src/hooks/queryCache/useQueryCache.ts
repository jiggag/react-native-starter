import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { QueryKey, QueryObserver, useQueryClient } from 'react-query';
import { Updater } from 'react-query/types/core/utils';

type State<Data> = Data | undefined;
type SetState<Data> = Updater<Data | undefined, Data>;
type QueryCache<Data> = [State<Data>, (prevState: SetState<Data>) => void];

export function useQueryCache<Data>(queryKey: QueryKey): QueryCache<Data> {
  const queryClient = useQueryClient();
  const [state, setState] = useState<Data>();

  const setQueryCache = useCallback((updater: State<Data> | SetState<Data>) => {
    queryClient.setQueryData<Data | undefined>(queryKey, updater);
    setState(updater);
  }, [queryClient, queryKey]);

  const queryCache = useMemo(() => {
    return state;
  }, [state]);

  useEffect(() => {
    setQueryCache(queryClient.getQueryData<Data>(queryKey));

    const unsubscribe = new QueryObserver<Data>(queryClient, {
      queryKey,
      notifyOnChangeProps: ['data', 'isError', 'isSuccess'],
      staleTime: Infinity,
    }).subscribe((result) => {
      setQueryCache(result.data);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient, queryKey, setQueryCache]);

  return [queryCache, setQueryCache];
}
