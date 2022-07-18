import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Requisito 04', () => {
  test('Teste se a página contém um h2 com texto "Page requested not found" ', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a página contem a imagem do pikachu chorando', () => {
    render(<NotFound />);

    const pikachuCrying = screen.getAllByAltText(/pikachu/i);
    pikachuCrying.forEach((item) => {
      expect(item).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
  });
});
