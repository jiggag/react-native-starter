import React from 'react';
import { Button } from '@components/Button/Button';
import { Wrapper } from '@components/Wrapper';

interface SignUpProps {
  onPress: () => void;
}

export const Presenter = ({ onPress }: SignUpProps) => {
  return (
    <Wrapper>
      <Button onPress={onPress} text="SignUp" />
    </Wrapper>
  );
};
