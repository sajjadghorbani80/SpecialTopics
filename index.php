<!DOCTYPE html>
<html lang="fa">

<head>
    <link rel="stylesheet" href="style.css">
    <title>زمانبندی شیفت</title>
</head>

<body dir="rtl">
    
    <main>
        <input type="text" name="input" id="number"> <button onclick="createColumns()"></button>
        <table id="shift">
        
        </table>


    </main>
    
    <button onclick="GetData()">چاپ شیفت‌ها</button>
    <script src="./index.js"></script>
</body>

</html>

<?php 
include("mylibrary.php");
?>

<form>
    <input type="submit" name="ok">
</form>
<?php
if(isset($_GET['ok']))