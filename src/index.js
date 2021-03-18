import Template from '@templates/Template.js';
// Importamos los estilos.
import '@styles/main.css';
import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();