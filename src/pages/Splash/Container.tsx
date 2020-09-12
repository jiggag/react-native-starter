import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { splashAction } from '@actions/root';
import Presenter from './Presenter';

const Container = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(splashAction.REQUEST());
  }, [dispatch]);

  return <Presenter />;
};

export default Container;
