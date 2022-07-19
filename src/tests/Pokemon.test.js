import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 06', () => {
  const link = '/pokemons/25';
  test('Verifica se o nome correto do pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByText(/pikachu/i);
    expect(namePokemon).toBeInTheDocument();
  });

  test('Verifica se o tipo correto do pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);

    const typePokemon = screen.getAllByText(/electric/i);
    expect(typePokemon[1]).toBeInTheDocument();
  });

  test('Verifica se o peso médio do pokémon é exibido na tela', () => {
    renderWithRouter(<App />);

    const weightPokemon = screen.getByText(/Average weight: 6.0 kg/i);
    expect(weightPokemon).toBeInTheDocument();
  });

  test('Verifica se a imagem do pokemon é exibida', () => {
    renderWithRouter(<App />);

    const imagePokemon = screen.getByAltText(/pikachu sprite/i);
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica se o link de More Details é válido e estou na página correta', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);
  });

  test('Verifica se é feito o redirecionamento para a página de Detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const summaryTitle = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryTitle).toBeInTheDocument();
  });

  test('Verifica se existe um icone de estrela nos pokemons favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const inputCheckbox = screen.getByRole('checkbox');
    userEvent.click(inputCheckbox);

    const imageStar = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(imageStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
