import './styles/styles.css';

import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

let app = null;

function start() {
  const model = new Model();
  const view = new View(
    'root',
    'Gerador de Letras para Adedanha - v1.0.1',
    'Letras que já foram sorteadas'
  );

  app = new Controller(model, view);

  //window.app = app;
}

start();
