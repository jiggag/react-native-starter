import React from 'react';
import { render } from '@testing-library/react-native';
import { App } from '../src/App';

// Note: import explicitly to use the types shipped with jest.

jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(() => ({
    authorizationStatus: jest.fn(),
  })),
  onForegroundEvent: jest.fn(),
  AuthorizationStatus: jest.fn(),
}));

it('renders correctly', () => {
  const { toJSON } = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});
