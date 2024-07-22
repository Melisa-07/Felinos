<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
?>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "GatFinder";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT nombre, edad, descripcion, imagen FROM gatos";
$result = mysqli_query($conn, $sql);

$gatos = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $gatos[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($gatos);

$conn->close();
?>