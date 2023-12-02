<?php

$host = "file:///Users/gumzessex/Desktop/CSDS290Final/Travel_Planner_CSDS393/Homepage.html#";
$port = "5432";
$dbname = "travel";
$user = "postgres";
$password = "root";
$connection_string = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password}";
$dbconn = pg_connect($connection_string);

if (isset($_POST['submit']) && !empty($_POST['submit'])) {
    $hashpassword = md5($_POST['password']);

    $sql = "select * from public.user where email = '" . pg_escape_string($_POST['email']) . "' and password = '" . $hashpassword . "'";

    $data = pg_query($dbconn, $sql);

    $login_check = pg_num_rows($data);

    if ($login_check > 0) {
        echo "Login Successful.";
    } else {
        echo "Incorrect username or password.";
    }

}

?>