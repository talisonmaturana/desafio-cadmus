'use strict';

const { result } = require('./resultado');

const Item = require('../Models/Item');
const Matriz = require('../Models/Matriz');

module.exports = (router) => {
  router.get('/', (req, res) => {
    let { nuvens = 4, aeroportos = 3, linhas = 10, colunas = 10 } = req.body;

    let mapa = [];

    for (let x = 0; x < linhas; x++) {
      mapa.push({});

      for (let y = 0; y < colunas; y++) {
        mapa[x][y] = new Item(x, y, '.');
      }
    }

    while (aeroportos > 0) {
      let linha = Math.floor(Math.random() * linhas);
      let coluna = Math.floor(Math.random() * colunas);
      let item = mapa[linha][coluna];
      if (item.tipo === '.') {
        item.tipo = 'A';
        aeroportos--;
      }
    }

    while (nuvens > 0) {
      let linha = Math.floor(Math.random() * linhas);
      let coluna = Math.floor(Math.random() * colunas);
      let item = mapa[linha][coluna];
      if (item.tipo === '.') {
        item.tipo = '*';
        nuvens--;
      }
    }

    let resultados = result(linhas, colunas, aeroportos, mapa);

    res.json(
      new Matriz(
        linhas,
        colunas,
        resultados.diasPrimeiroAeroporto,
        resultados.diasTodosAeroportos,
        resultados.mapa
      )
    );
  });
};
