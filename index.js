const addLineBtn = document.querySelector('#lineBtn');

function addLine() {
  const formula = document.querySelector('#formula');

  const line = document.createElement('div');
  line.style.display = 'flex';
  line.style.marginTop = '10px';
  line.style.justifyContent = 'space-around';

  const instancia = document.createElement('input');
  instancia.required = true;
  instancia.placeholder = 'Instância';
  instancia.classList.add('input');

  const axioma = document.createElement('input');
  axioma.required = true;
  axioma.placeholder = 'Axioma';
  axioma.classList.add('input');

  const substituicao = document.createElement('input');
  substituicao.required = true;
  substituicao.placeholder = 'Substituição';
  substituicao.classList.add('input');

  const excluir = document.createElement('img');
  excluir.classList.add('excluir');
  excluir.setAttribute('src', './assets/x-square.svg');
  excluir.style.cursor = 'pointer';

  excluir.addEventListener('click', () => {
    if (confirm('Excluir linha?')) formula.removeChild(line);
  });

  line.appendChild(instancia);
  line.appendChild(axioma);
  line.appendChild(substituicao);
  line.appendChild(excluir);

  formula.appendChild(line);
}

addLineBtn.addEventListener('click', addLine);