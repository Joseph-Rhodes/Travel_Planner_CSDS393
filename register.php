<?php

$host = "file:///Users/gumzessex/Desktop/CSDS290Final/Travel_Planner_CSDS393/Homepage.html#";
$port = "5432";
$dbname = "travel";
$user = "postgres";
$password = "root";
$connection_string = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password}";
$dbconn = pg_connect($connection_string);

if (isset($_POST['submit']) && !empty($_POST['submit'])) {

    $sql = "INSERT INTO 
        public.user(username,email,pwd) values('" . $_POST['username'] . "','" . $_POST['email'] . "','" . md5($_POST['password']) . ")";

    $result = pg_query($dbconn, $sql);


    if ($result) {
        echo "Data saved successfully.";
    } else {
        echo "Something went wrong.";
    }

}

?>