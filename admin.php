<html>

<head>
    <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
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
        <label for="input">تعداد شیفت را وارد کنید :</label>
        <input class="form-control" style="display:inline-block;width:10%" type="text" name="input" id="number">
        <button class="btn btn-primary btn-lg" onclick="createColumns()">ساخت جدول</button>
        <button class="btn btn-primary btn-lg" onclick="alert(GetData())">چاپ شیفت‌ها</button>
        <form style="display: inline;">

            <input type="text" name="array" id="output" hidden>
            <input type="submit" class="btn btn-success btn-lg" name="save" value="ذخیره جدول" onclick="GetData()">
            <input type="submit" class="btn btn-success btn-lg" name="load" value="بارگزاری جدول">
        </form>
        <form action="admin.php" method="post" style="display: inline;">
            <input class="btn btn-danger btn-lg" type="submit" name="delete" value="خالی کردن جداول" />
        </form>

    </div>
    <button class="float btn btn-primary"><a href="/specialtopics">صفحه اصلی</a></button>
    <?php include "mylibrary.php"; ?>

    <?php

    if (isset($_GET['save'])) {
        $data = $_GET['array'];
        $res = callSP("CALL addnewrecord($data)");
        if ($res)
            echo '<script> alert("جدول ذخیره شد");</script>';
        header("Refresh:0; url=admin.php");
    }

    if (isset($_GET['load'])) {
        $res = callSP('CALL getrecords()');
        $result = $res->fetch_array(MYSQLI_ASSOC);
        $result = $result["ss"];
        echo "<script>SetData('$result');</script>";
    }
    ?>
<?php
    if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['delete']))
    {
        $res = callSP('CALL emtytables()');
        if ($res)
        echo '<script> alert("جداول با موفقیت خالی شدند");</script>';
    }
    
?>

</body>

</html>