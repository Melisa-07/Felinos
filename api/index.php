<?php
$servername = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$dbname = getenv('DB_NAME');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM gatos";
$result = mysqli_query($conn, $sql);

?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description"
    content="Elegi la mascota ideal y ayudanos adoptando o transitando. Colabora en Mercado Pago para apoyar al hogar de Felinos callejeros Rosario." />
  <link rel="stylesheet" href="/felinos/public/style.css" async />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,400;1,500&display=swap"
    rel="stylesheet" />
  <title>GatFinder</title>
</head>

<body>
  <!-- DONATION BUBLE -->
  <div class="circle-container">
    <div class="tooltip">
      <a href="https://link.mercadopago.com.ar/hogardegatosros?fbclid=PAAab2ZMsIKtldoL8gKPDeLwIRBZtNk1tm2LMRUWBIWxaXIOX7XElito1RPbs"
        target="_blank">
        <img src="../image/mercado-pago.webp" alt="" />
      </a>
      <span class="tooltiptext">Mercado Pago</span>
    </div>
  </div>
  <div class="profile">
    <main>
      <section>
        <div class="white-bkg"></div>
        <header>
          <div class="hamburger-menu" onclick="mostrarContenido()">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <span>GatFinder</span>
          <input type="checkbox" id="modo-oscuro" onchange="cambiarModo()" />
          <label for="modo-oscuro" class="switch"></label>
        </header>
        <div class="cards">
          <!-- JAVASCRIPT CODE -->
          <!-- MESSAGES -->
          <div class="section-overlay" onclick="mostrarContenido()">
            <div class="menu">
              <ul>
                <li class="active">Mensajes</li>
              </ul>
            </div>
            <div class="messages">
              <div class="avatar">
                <img src="../image/pinito-elmalcriado.webp" alt="pinito, el gato malcriado" />
              </div>
              <div class="message">
                <div class="user">Pinito</div>
                <div class="text">Ayudá a mis papis</div>
              </div>
            </div>
            <div class="messages">
              <div class="avatar">
                <img src="../image/felinos-logo.webp" alt="logo de Felinos callejeros" />
              </div>
              <div class="message">
                <div class="user">Felinos Callejeros</div>
                <div class="text">
                  Muchas gracias a todos <br />los que nos acompañan<br />
                  colaborando!
                </div>
              </div>
            </div>
            <div class="messages">
              <div class="avatar">
                <img src="../image/felino-adoptado.webp" alt="felino adoptado" />
              </div>
              <div class="message">
                <div class="user">Hola!</div>
                <div class="text">
                  Para elegir un felino<br />deslizá hacia la derecha,<br />
                  para seguir mirando<br />hacia la izquierda
                </div>
              </div>
            </div>
          </div>
          <!-- DESCRIPTION -->
          <div class="overlay-description" onclick="mostrarDescripcion()">
            <div class="description-text"><span></span></div>
          </div>
          <span>
            No hay más gatitos cerca tuyo...<br />
            Vuelve a intentarlo más tarde
          </span>
        </div>
        <footer>
          <button class="is-undo" aria-label="undo"></button>
          <button class="is-remove is-big" aria-label="remove" onclick="removerTarjeta()"></button>
          <button class="is-star" aria-label="star"></button>
          <button class="is-fav is-big" aria-label="fav"></button>
          <button class="is-zap" aria-label="zap"></button>
        </footer>
      </section>
    </main>
  </div>
  <script src="/felinos/public/script.js" defer></script>
</body>

</html>
<?php
$conn->close();
?>