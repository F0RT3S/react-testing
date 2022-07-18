import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Requisito 02', () => {
  test('Teste se a página contém informações sobre a Pokedex', () => {
    render(<About />);

    const textAbout = screen.getByText(/This application simulates a Pokédex/i);
    expect(textAbout).toBeInTheDocument();
  });

  test('Teste se a página contém o texto About Pokédex', () => {
    render(<About />);

    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(titleAbout).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com infos da pokédex', () => {
    render(<About />);

    const textAbout = screen.getByText(/This application simulates a Pokédex/i);
    expect(textAbout).toBeInTheDocument();

    const textAbout2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(textAbout2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma pokédex', () => {
    render(<About />);

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  });
});
