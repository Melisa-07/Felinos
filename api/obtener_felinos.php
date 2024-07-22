<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
?>

<?php
$servername = "mysql.railway.internal";  
$username = "root";  
$password = "gZxcaZVgfKMBZalpzaauSnKQXnMAAAqR";  
$dbname = "railway";  
$port = "3306"; 

$conn = new mysqli($servername, $username, $password, $dbname, $port);

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