import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../pages/Pokedex';

describe('Requisito 05', () => {
  test('Verifica se a página tem um h2 com o texto "Encountered Pokémons"', async () => {
    renderWithRouter(<App />);

    const title = await screen.findByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  // test('Verifica se é exibido um novo pokémon ao clicar no botão', () => {
  //   renderWithRouter(<App />);

  //   const button = screen.getByRole('button', { name: /próximo pokémon/i });
  //   expect(button).toBeInTheDocument();

  //   const namePokemon = screen.queryAllByTestId(/pokemon-name/i);
  //   namePokemon.forEach((item) => {
  //     console.log(item);
  //     expect(namePokemon).toHaveLength(1);
  //     expect(namePokemon[0]).toBeInTheDocument();
  //     userEvent.click(button);
  //     expect(item[1]).toBeInTheDocument();
  //   });
  // });

  test('Verifica se a Pokedex possui botões de filtro', () => {
    renderWithRouter(<App />);

    // Requisito 01
    const button = screen.getAllByTestId(/pokemon-type-button/i);
    expect(button[0]).toBeInTheDocument();
    expect(button[1]).toBeInTheDocument();
    expect(button[2]).toBeInTheDocument();
    expect(button[3]).toBeInTheDocument();
    expect(button[4]).toBeInTheDocument();
    expect(button[5]).toBeInTheDocument();
    expect(button[6]).toBeInTheDocument();

    // Requisito 04
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    // Requisito 02 e 03
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    const fireType = screen.getAllByTestId(/pokemon-type/i);
    fireType.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    expect(fireType[1]).toBeInTheDocument();
  });

  test('Verifica se a Pokédex possui botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // Requisito 01
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    // Requisito 02
    userEvent.click(buttonAll);
    const eletric = screen.getAllByTestId(/pokemon-type/i);

    // Requisito 03
    eletric.forEach((eletricType) => {
      expect(eletricType).toBeInTheDocument();
    });
  });
});
