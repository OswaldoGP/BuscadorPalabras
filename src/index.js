import './main.css';

const texto = document.getElementById('texto');
const palabra = document.getElementById('palabra');
const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('btnLimpiar');
const alerta = document.getElementById('alerta');
const resultado = document.getElementById('resultado');
const contador = document.getElementById('contador');
const remplazar = document.getElementById('remplazar');
const btnRemplazar = document.getElementById('btnRemplazar');

const mostrarAlerta = (mensaje, tipo) => {
  alerta.textContent = mensaje;
  alerta.className = `alerta ${tipo}`;
};


const ocultarAlerta = () => {
  alerta.className = 'oculto';
};


const escaparHtml = (cadena) => {
  return cadena
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};


const escaparRegex = (cadena) => {
  return cadena.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};


const buscar = () => {
  const textoValor = texto.value;
  const palabraValor = palabra.value.trim();

  if (textoValor.trim() === '') {
    mostrarAlerta('Escribe tu texto¡', 'danger');
    return;
  }

  if (palabraValor === '') {
    mostrarAlerta('Escribe tu palabra a buscar¡', 'danger');
    return;
  }


  const expresion = new RegExp(`(${escaparRegex(palabraValor)})`, 'gi');
  const partes = textoValor.split(expresion);

  const total = (partes.length - 1) / 2;

  const html = partes
    .map((parte, i) => (i % 2 === 1 ? `<mark>${escaparHtml(parte)}</mark>` : escaparHtml(parte)))
    .join('');

  resultado.innerHTML = html;
  contador.textContent = total;

  if (total === 0) {
    mostrarAlerta(`No se encontro "${palabraValor}" en el texto`, 'warning');
  } else {
    mostrarAlerta(`Se encontro la palabra ${total} vez/veces`, 'success');
  }
};


const remplazarPalabra = () => {
  const textoValor = texto.value;
  const palabraValor = palabra.value.trim();
  const nuevaValor = remplazar.value.trim();

  if (textoValor.trim() === '') {
    mostrarAlerta('Debes escribir un texto', 'danger');
    return;
  }

  if (palabraValor === '') {
    mostrarAlerta('Debes escribir lo que quieres buscar', 'danger');
    return;
  }

  if (nuevaValor === '') {
    mostrarAlerta('Debes escribir la palabra por la que se remplazara', 'danger');
    return;
  }

  const expresion = new RegExp(`(${escaparRegex(palabraValor)})`, 'gi');
  const partes = textoValor.split(expresion);
  const total = (partes.length - 1) / 2;

  if (total === 0) {
    mostrarAlerta(`No se encontro "${palabraValor}" en el texto`, 'warning');
    return;
  }

  const textoNuevo = partes
    .map((parte, i) => (i % 2 === 1 ? nuevaValor : parte))
    .join('');

  const html = partes
    .map((parte, i) => (i % 2 === 1 ? `<mark>${escaparHtml(nuevaValor)}</mark>` : escaparHtml(parte)))
    .join('');

  texto.value = textoNuevo;
  resultado.innerHTML = html;
  contador.textContent = total;
  mostrarAlerta(`Se remplazaron ${total} coincidencias por "${nuevaValor}"`, 'success');
};


const limpiar = () => {
  texto.value = '';
  palabra.value = '';
  remplazar.value = '';
  resultado.innerHTML = '';
  contador.textContent = 0;
  ocultarAlerta();
};

btnBuscar.addEventListener('click', buscar);
btnLimpiar.addEventListener('click', limpiar);
btnRemplazar.addEventListener('click', remplazarPalabra);