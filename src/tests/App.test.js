import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 01', () => {
  test('Teste se no App contem um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('link', { name: /home/i });
    expect(textHome).toBeInTheDocument();

    const textAbout = screen.getByRole('link', { name: /About/i });
    expect(textAbout).toBeInTheDocument();

    const textFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(textFavoritePokemons).toBeInTheDocument();
  });

  test('Ao clicar no Home acontece o redirecionamento para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(homeTitle).toBeInTheDocument();
  });

  test('Ao clicar em About acontece o redirecionamento para a página /about', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Ao clicar em Favorite Pokemons é redirecionado para a página /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites).toBeInTheDocument();

    userEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const aboutFavorites = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(aboutFavorites).toBeInTheDocument();
  });

  test('Ao entrar em uma URL inexistente é redirecionado para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pikachu->>>-mewtwo');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
