'use strict';

const Item = require('../Models/Item');

function result(linhas, colunas, aeroportos, mapa) {
  let totalAeroportosAbertos = 1;
  let diasPrimeiroAeroporto = 0;
  let diasTodosAeroportos = 0;
  let dias = 1;
  let newMapa = JSON.parse(JSON.stringify(mapa));

  while (totalAeroportosAbertos > 0) {
    avancarDia(linhas, colunas, newMapa);
    totalAeroportosAbertos = getTotalAeroportosAbertos(newMapa);

    if (totalAeroportosAbertos !== aeroportos && diasPrimeiroAeroporto <= 0) {
      diasPrimeiroAeroporto = dias;
    } else if (totalAeroportosAbertos === 0) {
      diasTodosAeroportos = dias;
    }
    dias++;
  }

  if (diasTodosAeroportos === 0 && diasPrimeiroAeroporto > 0) {
    diasTodosAeroportos = diasPrimeiroAeroporto;
  }

  return { diasPrimeiroAeroporto, diasTodosAeroportos, mapa };
}

function avancarDia(linhas, colunas, mapa) {
  for (let i = 0; i < mapa.length; i++) {
    for (let j = 0; j < mapa.length; j++) {
      let item = mapa[i][j];
      if (item && item.tipo === '*') {
        moverNuvem(linhas, colunas, mapa, item);
      }
    }
  }
}

function moverNuvem(linhas, colunas, mapa, item) {
  moverParaCima(linhas, colunas, mapa, item);
  moverParaDireita(linhas, colunas, mapa, item);
  moverParaBaixo(linhas, colunas, mapa, item);
  moverParaEsquerda(linhas, colunas, mapa, item);
}

function moverParaCima(linhas, colunas, mapa, item) {
  let x = item.x - 1;
  if (mapa[x]) {
    let newItem = mapa[x][item.y];
    if (x >= 0 && newItem.tipo !== '*') {
      let novaNuvem = new Item(x, item.y, '*');
      mapa[x][item.y] = novaNuvem;
    }
  }
}

function moverParaDireita(linhas, colunas, mapa, item) {
  let y = item.y + 1;
  if (mapa[item.x][y]) {
    let newItem = mapa[item.x][y];
    if (y <= colunas && newItem.tipo !== '*') {
      let novaNuvem = new Item(item.x, y, '*');
      mapa[item.x][y] = novaNuvem;
    }
  }
}

function moverParaBaixo(linhas, colunas, mapa, item) {
  let x = item.x + 1;
  if (mapa[x]) {
    let newItem = mapa[x][item.y];
    if (x <= linhas && newItem.tipo !== '*') {
      let novaNuvem = new Item(x, item.y, '*');
      mapa[x][item.y] = novaNuvem;
    }
  }
}

function moverParaEsquerda(linhas, colunas, mapa, item) {
  let y = item.y - 1;
  if (mapa[item.x][y]) {
    let newItem = mapa[item.x][y];
    if (y <= colunas && newItem.tipo !== '*') {
      let novaNuvem = new Item(item.x, y, '*');
      mapa[item.x][y] = novaNuvem;
    }
  }
}

function getTotalAeroportosAbertos(mapa) {
  let total = 0;
  for (let i = 0; i < mapa.length; i++) {
    for (let j = 0; j < mapa.length; j++) {
      let item = mapa[i][j];
      if (item && item.tipo === 'A') {
        total++;
      }
    }
  }
  return total;
}

module.exports = { result };
