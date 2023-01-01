<?php
function doquery($query) {
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_db = 'pool_db';
$db_port = 8080;

$mysqli = new mysqli(
  $db_host,
  $db_user,
  $db_password,
  $db_db
);
if ($mysqli->connect_error) {
  echo 'Error11: '.$mysqli->connect_errno;
  echo '<br>';
  echo 'Error12: '.$mysqli->connect_error;
  exit();
}
$result = $mysqli->query($query);
return $result;

}

function callSP($query) {
  $db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_db = 'pool_db';
$db_port = 8080;

$mysqli = new mysqli(
  $db_host,
  $db_user,
  $db_password,
  $db_db
);
if ($mysqli->connect_error) {
  echo 'Error11: '.$mysqli->connect_errno;
  echo '<br>';
  echo 'Error12: '.$mysqli->connect_error;
  exit();
}

$result = $mysqli->query($query);
return $result;
// $row = $result -> fetch_array(MYSQLI_ASSOC);
// // return $row["ss"];
// return $row;
// printf ("%s\n", $row["ss"]);
}
?>