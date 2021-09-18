import React from 'react';
import { Text } from 'react-native';
import { Wrapper } from '@components/Wrapper';
import { IS_DEV_MODE } from '@utils/Constants';

export const Presenter = () => {
  return (
    <Wrapper>
      <Text>
        starter
        {IS_DEV_MODE ? 'dev' : 'prod'}
      </Text>
    </Wrapper>
  );
};
