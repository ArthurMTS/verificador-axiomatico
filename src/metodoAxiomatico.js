const axiomas = {
  a1: '(p>(q>p))',
  a2: '((p>(q>r))>((p>q)>(p>r)))',
  a3: '(p>(q>(p&q)))',
  a4: '((p&q)>p)',
  a5: '((p&q)>q)',
  a6: '(p>(p|q))',
  a7: '(q>(p|q))',
  a8: '((p>r)>((q>r)>((p|q)>r)))',
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
    instancia = instancia.replaceAll(' ','');
    substituicao = substituicao.replaceAll(' ','');

    if (!corretudeFormula(instancia)) return false;

    if (axioma === 'mp') {
      const [ primeiro, segundo ] = substituicao.split(',');

      if (!primeiro || !segundo) return false;

      if (primeiro - 1 >= i || segundo - 1 >= i) return false;

      let primeiroElemento;
      let segundoElemento;

      try {
        primeiroElemento = instancias[primeiro - 1].value;
        segundoElemento = instancias[segundo - 1].value;
        primeiroElemento = formatarString(primeiroElemento);
        segundoElemento = formatarString(segundoElemento);
      
      } catch(err) {
        return false;
      }

      let resultadoMP = modusPonens(primeiroElemento, segundoElemento);

      if (!corretudeFormula(resultadoMP)) return false;

      if (instancia !== resultadoMP) {
        alert(`Modus Ponens entre [ ${primeiroElemento} ] e [ ${segundoElemento} ] resultou em [ ${resultadoMP} ] que é diferente de [ ${instancia} ] que foi passado.`);
        console.log(false);
        return false;
      }

    } else if (axioma === 'hip') {
      continue;

    } else {
      try {
        const axiomaInstanciado = instanciarAxioma(axioma, substituicao);

        if (!corretudeFormula(axiomaInstanciado)) return false;
      
        if(instancia !== axiomaInstanciado) {
          alert(`Instânciação do axioma [ ${axioma} ] com a substituição [ ${substituicao} ] resultou em [ ${axiomaInstanciado} ], que é diferente de [ ${instancia} ] passado.`);
          console.log(false);
          return false;
        }
      } catch(err) {
        return false;
      }
    } 
  }
  console.log(true);
  return true;
}

function corretudeFormula(formula) {
  const elementos = formula.split('');

  let parenteses = 0;
  let next;

  for (let i = 0; i < elementos.length; i++) {
    next = elementos[i + 1];

    switch(elementos[i]) {
      case '(':
        parenteses++;
        if (next === ')' ||
            next === '>' ||
            next === '&' ||
            next === '|') return false;
        break;
      case ')':
        parenteses--;
        if (i === elementos.length - 1) break;
        else if (next === '(' ||
            next.charCodeAt(0) >= 97 &&
            next.charCodeAt(0) <= 122) return false;
        break;
      case '>':
      case '&':
      case '|':
        if (next === ')' ||
            next === '>' ||
            next === '&' ||
            next === '|') return false;
        break;
      default:
        if (elementos[i].charCodeAt(0) < 97 ||
            elementos[i].charCodeAt(0) > 122) return false; 
        else if (i === elementos.length - 1) break;
        else if (next === '(' ||
            next.charCodeAt(0) >= 97 &&
            next.charCodeAt(0) <= 122) return false;
        break;
    }
  }

  if (parenteses != 0) return false;

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

function modusPonens(primeiroElemento, segundoElemento) {
  console.log(primeiroElemento, segundoElemento);

  let result;

  if (primeiroElemento.length > segundoElemento.length) {
    result = primeiroElemento.replace(segundoElemento, '');
  } else {
    result = segundoElemento.replace(primeiroElemento, '');
  }

  result = result.slice(2, result.length - 1);

  console.log(result);

  return result;
}

function formatarString(string) {
  return string.replaceAll(' ', '').toLowerCase();
}

module.exports = verificarFormulas;