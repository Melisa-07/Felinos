document.addEventListener("DOMContentLoaded", function() {
  mostrarContenido();
  cambiarModo();
  mostrarImagenes();
});

// MENU
function mostrarContenido() {
  var contenido = document.querySelector('.section-overlay');
  var overlayDescripcion = document.querySelector('.overlay-description');
  
  if (!contenido) {
    console.error('Error: No se encontró el elemento con la clase .section-overlay');
    return;
  }
  if (!overlayDescripcion) {
    console.error('Error: No se encontró el elemento con la clase .overlay-description');
    return;
  }
  
  if (overlayDescripcion.style.display === 'block') {
    overlayDescripcion.style.display = 'none';
  }
  
  if (contenido.style.display === 'none' || contenido.style.display === '') {
    contenido.style.display = 'block';
  } else {
    contenido.style.display = 'none';
  }
}

// DARK MODE
function cambiarModo() {
  var cuerpo = document.body;
  var modoOscuro = document.getElementById("modo-oscuro");

  if (modoOscuro.checked) {
    cuerpo.classList.add("modo-oscuro");
  } else {
    cuerpo.classList.remove("modo-oscuro");
  }
}

// PHOTOS
async function mostrarImagenes() {
  try {
      var contenedor = document.querySelector('.cards');
      const response = await fetch('obtener_felinos.php');
      const data = await response.json();

      data.forEach(gato => {          
          var article = document.createElement('article');
          var img = document.createElement('img');
          var h2 = document.createElement('h2');
          var span = document.createElement('span');
          var divNope = document.createElement('div');
          var divLike = document.createElement('div');
          var arrowDown = document.createElement('div');

          arrowDown.classList.add('arrow-down');
          arrowDown.innerHTML = '<img src="./image/circle-arrow.png" alt="Flecha hacia abajo">';
          arrowDown.onclick = () => mostrarDescripcion(gato.descripcion);

          img.src = gato.imagen;
          img.alt = gato.nombre;     
          h2.textContent = gato.nombre;
          span.textContent = gato.edad + " años";
          divNope.textContent = 'NOPE';
          divNope.classList.add('choice', 'nope');
          divLike.textContent = 'LIKE';
          divLike.classList.add('choice', 'like');

          h2.appendChild(span);
          article.appendChild(img);
          article.appendChild(h2);
          article.appendChild(divNope);
          article.appendChild(divLike);
          article.appendChild(arrowDown);

          contenedor.appendChild(article);
      });
  } catch (error) {
      console.error('Error al cargar las imágenes:', error);
  }
}
document.addEventListener("DOMContentLoaded", mostrarImagenes);

function mostrarDescripcion(descripcion) {
  var descripcionOverlay = document.querySelector('.overlay-description');
  if (!descripcionOverlay) {
    console.error('Error: No se encontró el contenedor con la clase .overlay-description');
    return;
  }
  var descripcionText = descripcionOverlay.querySelector('.description-text span');
  if (!descripcionText) {
    console.error('Error: No se encontró el elemento span dentro de .description-text');
    return;
  }
  descripcionText.textContent = descripcion;
  descripcionOverlay.style.display = 'block';
}

const DECISION_THRESHOLD = 75;
let isAnimating = false;
let pullDeltaX = 0;

function startDrag(event) {
  if (isAnimating) return;

  const actualCard = event.target.closest('article');
  if (!actualCard) return;

  const startX = event.pageX ?? event.touches[0].pageX;

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);

  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('touchend', onEnd, { passive: true });

  function onMove(event) {
    const currentX = event.pageX ?? event.touches[0].pageX;

    pullDeltaX = currentX - startX;

    if (pullDeltaX === 0) return;

    isAnimating = true;

    const deg = pullDeltaX / 14;

    actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;

    actualCard.style.cursor = 'grabbing';

    const opacity = Math.abs(pullDeltaX) / 100;
    const isRight = pullDeltaX > 0;

    const choiceEl = isRight
      ? actualCard.querySelector('.choice.like')
      : actualCard.querySelector('.choice.nope');

    choiceEl.style.opacity = opacity;
  }

  function onEnd(event) {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);

    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);

    const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD;

    if (decisionMade) {
      const goRight = pullDeltaX >= 0;

      if (goRight) {
        window.open('https://forms.gle/mA87itoazFcECLP56', '_blank');
      } else {
        actualCard.classList.add(goRight ? 'go-right' : 'go-left');
        actualCard.addEventListener('transitionend', () => {
          actualCard.remove();
        });
      }
    } else {
      actualCard.classList.add('reset');
      actualCard.classList.remove('go-right', 'go-left');

      actualCard.querySelectorAll('.choice').forEach(choice => {
        choice.style.opacity = 0;
      });
    }

    actualCard.addEventListener('transitionend', () => {
      actualCard.removeAttribute('style');
      actualCard.classList.remove('reset');

      pullDeltaX = 0;
      isAnimating = false;
    });

    actualCard.querySelectorAll(".choice").forEach((el) => (el.style.opacity = 0));
  }
}

document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, { passive: true });

document.querySelectorAll('.is-fav').forEach(button => {
  button.addEventListener('click', () => {
    window.open('https://forms.gle/mA87itoazFcECLP56', '_blank');
  });
});

function removerTarjeta() {
  const actualCard = document.querySelector('article:last-child');
  const pullDeltaX = -75;

  if (!isAnimating) {
    const goRight = pullDeltaX >= 0;

    if (!goRight) {
      actualCard.style.transition = 'transform 0.5s ease-out';
      actualCard.classList.add('go-left');
      actualCard.addEventListener('transitionend', () => {
        actualCard.remove();
      });
    }
  }
}

function mostrarDescripcion(descripcion) {
  var descripcionElemento = document.querySelector('.overlay-description .description-text span');
  descripcionElemento.textContent = descripcion;
  var overlayDescripcion = document.querySelector('.overlay-description');
  var contenido = document.querySelector('.section-overlay');

  if (!overlayDescripcion) {
    console.error('Error: No se encontró el contenedor con la clase .overlay-description');
    return;
  }

  if (!contenido) {
    console.error('Error: No se encontró el contenedor con la clase .section-overlay');
    return;
  }

  if (contenido.style.display === 'block') {
    contenido.style.display = 'none';
  }

  if (overlayDescripcion.style.display === 'none' || overlayDescripcion.style.display === '') {
    overlayDescripcion.style.display = 'block';
  } else {
    overlayDescripcion.style.display = 'none';
  }
}
