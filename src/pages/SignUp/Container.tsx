import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { splashAction } from '@actions/root';
import { signUpAction } from '@actions/auth';
import Presenter from './Presenter';

const Container = () => {
  const dispatch = useDispatch();

  const onPress = useCallback(() => dispatch(signUpAction.REQUEST()), [dispatch]);

  useEffect(() => {
    dispatch(splashAction.REQUEST());
  }, [dispatch]);

  return <Presenter onPress={onPress} />;
};

export default Container;
