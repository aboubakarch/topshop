import { screen } from '@testing-library/react';
import Home from './pages/Home';
import { renderWithProviders } from './utils/test-utils';

describe('all element rendering', () => {
  test('render show more', () => {
    renderWithProviders(<Home />);
    const linkElement = screen.getByText(/\+ Show More/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('renders search input', () => {
    renderWithProviders(<Home />);
    const linkElement = screen.getByTestId('search-input');
    expect(linkElement).toBeInTheDocument();
  });
});
