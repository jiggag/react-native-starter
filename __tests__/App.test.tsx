import React from 'react';
import { render } from '@testing-library/react-native';
import ReactTestRenderer from 'react-test-renderer';
import { App } from '../src/App';

// Note: import explicitly to use the types shipped with jest.

jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(() => ({
    authorizationStatus: jest.fn(),
  })),
  onForegroundEvent: jest.fn(),
  AuthorizationStatus: jest.fn(),
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

it('renders correctly', () => {
  const { toJSON } = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});
