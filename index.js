const axiomas = {
  a1: '(p>(q>p))',
  a2: '((p>(q>r))>((p>q)>(p>r)))',
  a3: '(p>(q>(p&q)))',
  a4: '((p&q)>p)',
  a5: '((p&q)>q)',
  a6: '(p>(pvq))',
  a7: '(q>(pvq))',
  a8: '((p>r)>((q>r)>((pvq)>r)))',
  a9: '((p>q)>((p>¬q)>¬p))',
  a10: '(¬¬p>p)',
};

function verificarFormulas() {
  const instancias = document.querySelectorAll('#instancia');
  const axiomas = document.querySelectorAll('#axioma');
  const substituicoes = document.querySelectorAll('#sub');

  if (!instancias.length || !axiomas.length || !substituicoes.length) return false;
 
  for (let i = 0; i < instancias.length; i++) {
    let axioma = axiomas[i].value;
    let instancia = instancias[i].value;
    let substituicao = substituicoes[i].value;
    axioma = formatarString(axioma);
    instancia = formatarString(instancia);
    substituicao = formatarString(substituicao);

    if (axioma === 'mp') {
      const [ primeiro, segundo ] = substituicao.split(',');

      if (!primeiro || !segundo) return;

      try {
        let primeiroElemento = instancias[primeiro - 1].value;
        let segundoElemento = instancias[segundo - 1].value;
        primeiroElemento = formatarString(primeiroElemento);
        segundoElemento = formatarString(segundoElemento);

        let resultadoMP = modusPonens(primeiroElemento, segundoElemento);
        
        if (resultadoMP !== instancia) {
          alert(`Modus Ponens entre (${primeiroElemento}) e (${segundoElemento}) resultou em (${resultadoMP}) que é diferente de (${instancia}) que foi passada.`);
          console.log(false);
          return false;
        }
      } catch(err) {
        console.log(err);
        return false;
      }

    } else {
      const axiomaInstanciado = instanciarAxioma(axioma, substituicao);
      
      if(instancia !== axiomaInstanciado) {
        alert(`Instânciação do axioma (${axioma}) com a substituição (${substituicao}) resultou em (${axiomaInstanciado}), que é diferente da (${instancia}) passada.`);
        console.log(false);
        return false;
      }
    }
  }
  console.log(true);
  return true;
}

function instanciarAxioma(axioma, substituicao) {
 try {
  axioma = axiomas[axioma];
  substituicao = substituicao.split(';');

  substituicao.forEach(sub => {
    const [ atomo, valor ] = sub.split('=');
    axioma = axioma.replaceAll(`${atomo}`, `${valor}`);
  });

  console.log(axioma);

  return axioma;
 } catch (err) {
  return false;
 }
}

function modusPonens(instancia1, instancia2) {
  console.log(instancia1, instancia2);

  let result;

  if (instancia1.length > instancia2.length) {
    result = instancia1.replace(instancia2, '');
  } else {
    result = instancia2.replace(instancia1, '');
  }

  result = result.slice(2, result.length - 1);

  console.log(result);

  return result;
}

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

function formatarString(string) {
  return string.replaceAll(' ', '').toLowerCase();
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