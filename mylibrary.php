<?php
function dequery($q) {
$L = mysqli_conect("http://127.0.0.1:5500","sa","Docker@123");
if(!$L) 
    die("not connect");

    $r= mysqli_query($L,$q);
    if(!$r)
        die("query didnt run");
    return($r);
}