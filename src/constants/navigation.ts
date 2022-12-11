import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum StackScreen {
  Main = 'Main',
  Detail = 'Detail',
}

export type NativeStackParams = {
  [StackScreen.Main]: undefined;
  [StackScreen.Detail]: undefined;
};

export type NativeScreenProps<Screen extends StackScreen> = NativeStackScreenProps<NativeStackParams, Screen>;
