const verificarFormulas = require('./metodoAxiomatico');

function addLine() {
  const formula = document.querySelector('#formula');
  formula.classList.remove('errado');
  formula.classList.remove('correto');
  const result = document.querySelector('#resultado');
  result.textContent = '';

  const line = document.createElement('div');
  line.style.display = 'flex';
  line.style.marginTop = '10px';
  line.style.justifyContent = 'space-around';

  const instancia = document.createElement('input');
  instancia.required = true;
  instancia.placeholder = 'Instância';
  instancia.classList.add('input');
  instancia.id = 'instancia';

  const axioma = document.createElement('input');
  axioma.required = true;
  axioma.placeholder = 'Axioma';
  axioma.classList.add('input');
  axioma.id = 'axioma';

  const substituicao = document.createElement('input');
  substituicao.required = true;
  substituicao.placeholder = 'Substituição';
  substituicao.classList.add('input');
  substituicao.id = 'sub';

  const excluir = document.createElement('img');
  excluir.classList.add('excluir');
  excluir.setAttribute('src', './assets/x-square.svg');
  excluir.style.cursor = 'pointer';

  excluir.addEventListener('click', () => {
    if (confirm('Excluir linha?')) formula.removeChild(line);
    formula.classList.remove('errado');
    formula.classList.remove('correto');
    result.textContent = '';
  });

  line.appendChild(instancia);
  line.appendChild(axioma);
  line.appendChild(substituicao);
  line.appendChild(excluir);

  formula.appendChild(line);
}

function mostrarResultador(resultado) {
  const formula = document.querySelector('#formula');

  const result = document.querySelector('#resultado');
  result.textContent = resultado ? 'Correto' : 'Errado';

  if (resultado) {
    formula.classList.remove('errado');
    formula.classList.add('correto');
  } else {
    formula.classList.remove('correto');
    formula.classList.add('errado');
  }
}

const addLineBtn = document.querySelector('#lineBtn');
addLineBtn.addEventListener('click', addLine);

const formula = document.querySelector('#formula');
formula.addEventListener('submit', (e) => {
  e.preventDefault();
  mostrarResultador(verificarFormulas());
});