<?php
function doquery($q) {
$L = mysqli_connect("127.0.0.1:3306","root","","pool");
if(!$L) 
    die("not connect");

$r= mysqli_query($L,$q);
if(!$r)
    die("query didnt run");
return($r);
}