import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signUpAction } from '@actions/auth';
import { splashAction } from '@actions/root';
import { ContainerWrapper } from '@components/Wrapper';
import { Presenter } from './Presenter';

export const Container = () => {
  const dispatch = useDispatch();

  const onPress = useCallback(() => dispatch(signUpAction.REQUEST()), [dispatch]);

  useEffect(() => {
    dispatch(splashAction.REQUEST());
  }, [dispatch]);

  return (
    <ContainerWrapper>
      <Presenter onPress={onPress} />
    </ContainerWrapper>
  );
};
