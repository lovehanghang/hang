<?php
$conn = mysqli_connect("localhost","hang","xxq521778");
mysqli_select_db($conn,"hang");
$sql = "SELECT * FROM pings";
$retval = mysqli_query($conn,$sql);
$data = [];
while($row = mysqli_fetch_array($retval,MYSQLI_ASSOC)){
    $a = '{"user":"'.$row["user"].'","name":"'.$row["name"].'","content":"'.$row["content"].'"}';
    array_unshift($data,$a);
}
echo '{"content":'.json_encode($data).'}';
?>