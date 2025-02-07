// UserDetail.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import axios from 'axios';
import UserDetail from '../dashboard/index.tsx';

// Mock axios
jest.mock('axios');

describe('UserDetail Component', () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useLocation: jest.fn(() => ({
          pathname: '/dashboard',
        })),
      }));

  it('fetches and displays user details correctly', async () => {
    // Mock API response
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { name: 'Leanne Graham', email: 'Sincere@april.biz' },
    });

    render(<UserDetail />);

    // Ensure loading state is shown initially
    expect(screen.getByText('Loading user details...')).toBeInTheDocument();

    // Wait for the user details to appear
    await waitFor(() => expect(screen.getByText('Name: Leanne Graham')).toBeInTheDocument());

    // Ensure the correct details are displayed
    expect(screen.getByText('Name : Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Email : Sincere@april.biz')).toBeInTheDocument();
  });

  it('handles no user data scenario', async () => {
    // Mock empty API response
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: null });

    render(<UserDetail />);

    // Wait for the message to appear
    await waitFor(() => expect(screen.getByText('No user data found.')).toBeInTheDocument());
  });

  it('handles API error gracefully', async () => {
    // Mock an API error
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<UserDetail />);

    // Wait for the message to appear
    await waitFor(() => expect(screen.getByText('No user data found.')).toBeInTheDocument());
  });
});
