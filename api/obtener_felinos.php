<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
?>

<?php
$database_url = getenv('DATABASE_URL');
$dbparts = parse_url($database_url);

$servername = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$dbname = getenv('DB_NAME');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT nombre, edad, descripcion, imagen FROM felinos";
$result = mysqli_query($conn, $sql);

$gatos = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $gatos[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($felinos);

$conn->close();
?>