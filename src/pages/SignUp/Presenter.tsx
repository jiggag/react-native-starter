import React from 'react';
import { Button } from '@components/Button';
import { Wrapper } from '@components/Wrapper';
import { styles } from './styles';

interface SignUpProps {
  onPress: () => void;
}

export const Presenter = ({ onPress }: SignUpProps) => {
  return (
    <Wrapper>
      <Button btnStyle={styles.button} textStyle={styles.text} onPress={onPress} text="SignUp" />
    </Wrapper>
  );
};
