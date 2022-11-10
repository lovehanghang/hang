<?php
//更新于2022年11月1日
//生成随机字符
function abc(){
    $arr = array("a","b","c","d","e","f","g","h","i","j","K","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
    return $arr[rand(0,25)].$arr[rand(0,25)].$arr[rand(0,25)].$arr[rand(0,25)]."H";
}
//$name为用户名
//$key为密码
$name = $_POST["name"];
$key = $_POST["key"];
if($name == null || $key == null){
    echo "验证不通过";
    exit();
}
$conn = mysqli_connect("localhost","hang","xxq521778");
//创建连接
mysqli_query($conn,"set names utf8");
//字符转义
mysqli_real_escape_string($conn,$name);
mysqli_real_escape_string($conn,$key);
$sql = "SELECT * FROM user WHERE name='{$name}'";
//选择数据库
mysqli_select_db($conn,"hang");
$retval = mysqli_query($conn,$sql);
while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
    //如果密码正确
    if("{$row["key"]}" == $key){
            $num = rand(0,10).$arr[rand(0,26)].rand(0,10).abc().abc().rand(0,5).date("Y").date("m").date("d");
            //把临时秘钥和账号联立起来
            $sql = "UPDATE user SET class = '{$num}' WHERE name='{$name}'";
            mysqli_select_db($conn,"hang");
            $retval2 = mysqli_query($conn,$sql);
            if($retval2){
                //返回临时秘钥和用户数据
                echo $num."&&"."{$row["data"]}";
                mysqli_close($conn);
                exit();
            }
    } else {
        echo "账号或密码错误";
        exit();
    }
}
echo "账号或密码错误";
mysqli_close($conn);
?>