<html>

<head>
    <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">

    <title>خرید بلیت</title>
    <script src="./index.js"></script>
</head>

<body dir="rtl" id="body">

    <main>
        <table id="shift">

        </table>
    </main>
    <div style="text-align: center;margin-top: 20px;">
        <label for="input">تعداد بلیت را وارد کنید :</label>

        <form name="buyForm" style="display: inline;" onsubmit="return validateForm()">
            <input class="form-control" style="display:inline;width:10%;" type="text" name="input" id="number" required>
            <input type="text" name="shiftID" id="shiftID" hidden>
            <input type="text" name="gender" id="gender" hidden>
            <input class="btn btn-success btn-lg" type="submit" name="buy" value="ثبت سفارش">
        </form>
    </div>

    <button class="float btn btn-primary"><a href="/specialtopics">صفحه اصلی</a></button>
    <?php include "mylibrary.php"; ?>
    <?php

    $cap = callSP('CALL gettotalcap()');
    $res = callSP('CALL getrecords()');
    $recrow = $res->fetch_array(MYSQLI_ASSOC);
    $recrow = $recrow["ss"];

    $caprow = $cap->fetch_array(MYSQLI_ASSOC);
    $caprow = $caprow["ss"];

    $resultsell = callSP('CALL gettotalsell()');
    $rowsell = array();
    if ($resultsell->num_rows > 0) {
        //output data of each row
        //create an array

        //fill that array
        while ($row = $resultsell->fetch_assoc()) {
            $rowsell[] = $row;
        }
        //after filling the arrray
        //encode into json
        //pass the array
        //echo $rowsell[0]['shiftID'];
    }
    // for($i =0;$i < count($rowsell);$i++){
    $rowsell = Json_encode($rowsell);
    // }
    echo "<script>SetDataUser('$recrow','$caprow','$rowsell');</script>";


    ?>
    <?php

    if (isset($_GET['input'])) {
        $count = $_GET['input'];
        $shiftID = $_GET['shiftID'];
        $gender = $_GET['gender'];
        $res = callSP("CALL buyticket($count,$shiftID,$gender)");
        if ($res) {
            echo '<script> alert("سفارش شما با موفقیت ثبت شد");</script>';
            header("Refresh:0; url=user.php");
        }
    }


    ?>
</body>

</html>