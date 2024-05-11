import axios from 'axios';
import { $authHost, $host } from './index';
import { jwtDecode } from 'jwt-decode';
import { cleanup, renderHook } from '@testing-library/react-hooks';
import { check,registration,logins } from './userApi';

jest.mock('axios');

describe('registration function', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should return user data if registration is successful', async () => {
    const login = 'test_login';
    const email = 'test@example.com';
    const password_ = 'test_password';
    const name_ = 'Test';
    const lastname = 'Tester';
    const surname = 'Testsson';
    const phone = '+1234567890';

    // Mock the $host.post() method to return a successful response
    axios.$host.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { token: 'test_token' },
      })
    );

    // Call the registration function and store the result
    const response = await registration(
      login,
      email,
      password_,
      name_,
      lastname,
      surname,
      phone
    );

    // Assert that the function returned the expected user data
    expect(response).toEqual({
      sub: 'test_user_id',
      email: 'test@example.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('should throw an error if registration fails', async () => {
    // Mock the $host.post() method to return an error
    axios.$host.post.mockImplementationOnce(() => Promise.reject('Error message'));

    // Assert that the registration function throws an error
    await expect(
      registration(
        'test_login',
        'test@example.com',
        'test_password',
        'Test',
        'Tester',
        'Testsson',
        '+1234567890'
      )
    ).rejects.toThrow('Error message');
  });
});

describe('logins function', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should return user data if login is successful', async () => {
    const login = 'test_login';
    const password_ = 'test_password';

    // Mock the $host.post() method to return a successful response
    axios.$host.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { token: 'test_token' },
      })
    );

    // Call the logins function and store the result
    const response = await logins(login, password_);

    // Assert that the function returned the expected user data
    expect(response).toEqual({
      id: 'test_user_id',
      login: 'test_login',
      email: 'test@example.com',
      role: 'USER',
      order_sum: 0,
      orders: [],
      master: false,
    });
  });

  it('should throw an error if login fails', async () => {
    // Mock the $host.post() method to return an error
    axios.$host.post.mockImplementationOnce(() => Promise.reject('Error message'));

    // Assert that the logins function throws an error
    await expect(logins('test_login', 'test_password')).rejects.toThrow('Error message');
  });
});

describe('check function', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should return user data if authentication is successful', async () => {
    // Mock the $authHost.get() method to return a successful response
    axios.$authHost.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { token: 'test_token' },
      })
    );

    // Call the check function and store the result
    const response = await check();

    // Assert that the function returned the expected user data
    expect(response).toEqual({
      id: 'test_user_id',
      login: 'test_login',
      email: 'test@example.com',
      role: 'USER',
      order_sum: 0,
      orders: [],
      master: false,
    });
  });

  it('should throw an error if authentication fails', async () => {
    // Mock the $authHost.get() method to return an error
    axios.$authHost.get.mockImplementationOnce(() => Promise.reject('Error message'));

    // Assert that the check function throws an error
    await expect(check()).rejects.toThrow('Error message');
  });
});
