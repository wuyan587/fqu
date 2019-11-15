<?php
include './conn.php';
if(isset($_GET['typeof'])){
    $type=$_GET['typeof'];
    switch($type){
        case 'goods':
            $result=$conn->query('select * from shangping');
            $arr=array();
                for($i=0;$i<$result->num_rows;$i++){
                    $arr[$i]=$result->fetch_assoc();
                }
            echo json_encode($arr);
            break;
    }
}
if(isset($_GET['sid'])){
    $id=$_GET['sid'];
    $result=$conn->query("select * from shangping where sid=$id");
    echo json_encode($result->fetch_assoc());
}