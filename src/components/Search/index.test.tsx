import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Search from '.';

test('Search input testing', async () => {
  render(<Search onSearch={() => {}} />);
  const search = screen.getByTestId('search');
  await userEvent.type(search, 'Drinks');
  expect(search).toHaveValue('Drinks');
});
