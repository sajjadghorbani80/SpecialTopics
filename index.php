<!DOCTYPE html>
<html lang="fa">

<head>
    <link rel="stylesheet" href="style.css">
    <title>زمانبندی شیفت</title>
    <script src="./index.js"></script>
</head>

<body dir="rtl">

    <main>

        <table id="shift">

        </table>


    </main>
    <div style="text-align: center;margin-top: 20px;">
        <input type="text" name="input" id="number">
        <button onclick="createColumns()">ساخت جدول</button>
        <button onclick="alert(GetData())">چاپ شیفت‌ها</button>
        <form style="display: inline;">

            <input type="text" name="arrayeman" id="output" hidden>
            <input type="submit" name="save" value="save" onclick="GetData()">
            <input type="submit" name="load" value="load">
        </form>
    </div>
    <!-- <p id="output"></p> -->
    <?php
    include("./mylibrary.php");
    ?>

    <?php

    if (isset($_GET['save'])) {
        $data = json_encode($_GET['arrayeman']);
        $res = doquery("INSERT INTO timing (times)
    VALUES ($data)");
        if ($res)
            echo "saved";
    }

    if (isset($_GET['load'])) {

        $res = doquery("SELECT times FROM timing");
        if (mysqli_num_rows($res) > 0) {
            // output data of each row
            $row = mysqli_fetch_assoc($res);
            $times = $row["times"];
            echo "<script>SetData($times);</script>";
        } else {
            echo "0 results";
        }
    }
    ?>
    
</body>

</html>