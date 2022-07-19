import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 07', () => {
  const link = '/pokemons/25';
  test('A página deve conter um titulo com {nomePokemon} Details', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const titlePokemon = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(titlePokemon).toBeInTheDocument();
  });

  test('Verificar se não existe link de mais detalhes na página do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  test('Verificar se existe um titulo Summary', () => {
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

  test('Verificar se existe um parágrafo com infos do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const infoPokemon = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(infoPokemon).toBeInTheDocument();
  });

  test('Verificar o titulo dos mapas: Game Locations of {namePokemon}', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const mapTitle = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(mapTitle).toBeInTheDocument();
  });

  test('Verificar se exibe o mapa e o nome da localização do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const mapInfo = screen.getByText('Kanto Viridian Forest');
    expect(mapInfo).toBeInTheDocument();

    const mapImage = screen.getAllByRole('img', {
      alt: /pikachu location/i,
      src: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    });
    expect(mapImage[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImage[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Verificar se a página tem um texto com checkbox para favoritar pokémon ', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const inputFavorite = screen.getByRole('checkbox');
    expect(inputFavorite).toBeInTheDocument();

    const textFavorite = screen.getByLabelText(/pokémon favoritado/i);
    expect(textFavorite).toBeInTheDocument();
  });

  test('Verificar se o pokémon é adicionado/removido à lista de favoritos', async () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(link);

    const inputFavorite = screen.getByRole('checkbox');
    expect(inputFavorite).toBeInTheDocument();

    userEvent.click(inputFavorite);

    const favoritePokemon = await screen.getAllByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon[0]).toBeInTheDocument();

    userEvent.click(inputFavorite);

    expect(favoritePokemon[0]).not.toBeInTheDocument();
  });
});
