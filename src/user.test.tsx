import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDetail from '../src/components/dashboard/index.tsx';
import '@testing-library/jest-dom';



test('renders user', () => {
  render(<UserDetail />);
  
  const user_1 = screen.getByText(/Leanne Graham/);
  expect(user_1).toBeInTheDocument();

  const user_2 = screen.getByText(/Ervin Howell/);
  expect(user_2).toBeInTheDocument();

  const user_3 = screen.getByText(/Clementine Bauch/);
  expect(user_3).toBeInTheDocument();

  const user_4 = screen.getByText(/Patricia Lebsack/);
  expect(user_4).toBeInTheDocument();

  const user_5 = screen.getByText(/Chelsey Dietrich/);
  expect(user_5).toBeInTheDocument();

  const user_6 = screen.getByText(/Mrs. Dennis Schulist/);
  expect(user_6).toBeInTheDocument();

  const user_7 = screen.getByText(/Kurtis Weissnat/);
  expect(user_7).toBeInTheDocument();

  const user_8 = screen.getByText(/Nicholas Runolfsdottir V/);
  expect(user_8).toBeInTheDocument();

  const user_9 = screen.getByText(/Glenna Reichert/);
  expect(user_9).toBeInTheDocument();

  const user_10 = screen.getByText(/Clementina DuBuque/);
  expect(user_10).toBeInTheDocument();
});