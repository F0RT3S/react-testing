import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Requisito 03', () => {
  test('Teste de exibição da mensagem caso não tenha pokemons favoritados', () => {
    render(<FavoritePokemons />);

    const titleNoPokemonsFavorites = screen.getByText('No favorite pokemon found');
    expect(titleNoPokemonsFavorites).toBeInTheDocument();
  });

  // test('Teste se é exibido todos os pokemons favoritados', async () => {
  //   render(<FavoritePokemons />);

  //   global.fetch = jest.fn();

  //   const pokemon = await screen.findByTestId(/pokemon-name/i);
  //   expect(pokemon).toBeInTheDocument();
  // });
});
