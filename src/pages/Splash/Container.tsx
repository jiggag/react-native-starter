import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { splashAction } from '@actions/root';
import { ContainerWrapper } from '@components/Wrapper';
import Presenter from './Presenter';

const Container = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(splashAction.REQUEST());
  }, [dispatch]);

  return (
    <ContainerWrapper>
      <Presenter />
    </ContainerWrapper>
  );
};

export default Container;
