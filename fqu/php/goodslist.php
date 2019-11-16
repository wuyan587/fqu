<?php
include './conn.php';
if(isset($_REQUEST['typeof'])){
    $type=$_REQUEST['typeof'];
    switch($type){
        case 'goods':
            $result=$conn->query('select * from shangping');
            $arr=array();
                for($i=0;$i<$result->num_rows;$i++){
                    $arr[$i]=$result->fetch_assoc();
                }
            echo json_encode($arr);
            break;
        case 'login':
            $username=$_REQUEST['username'];
            $password=$_REQUEST['password'];
            $result=$conn->query("select * from register where phone='$username' and password='$password'");
                    if($result->num_rows>=1)
                        echo true;
                    else 
                        echo false;
            break;
        case 'yz':
            $username=$_REQUEST['username'];
            
            $result=$conn->query("select * from register where phone='$username'");
            
            if($result->num_rows>=1)
                echo true;
            else 
                echo false;
    break;
        case 'add':
            $username=$_REQUEST['username'];
            $password=$_REQUEST['password'];
            $conn->query("insert register values( NULL,'$username','$password' ) ");
    }
}
if(isset($_GET['sid'])){
    $id=$_GET['sid'];
    $result=$conn->query("select * from shangping where sid=$id");
    echo json_encode($result->fetch_assoc());
}