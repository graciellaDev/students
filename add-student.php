<?php
$surname = $_POST['surname'];
$name = $_POST['name'];
$patronymic = $_POST['patronymic'];
$faculty = $_POST['faculty'];
$study = $_POST['study'];
$birth = explode('-', $_POST['birth']);
$student = [];
$student += ['surname' => $surname];
$student += ['name' => $name];
$student += ['patronymic' => $patronymic];
$student += ['birth' => $birth[2].'.'.$birth[1].'.'.$birth[0]];
$student += ['study' => $study];
$student += ['faculty' => $faculty];                    
$file = file_get_contents('db.json');     
$taskList=json_decode($file, false, 512, JSON_UNESCAPED_UNICODE);              
array_push($taskList, $student);
file_put_contents('db.json',json_encode($taskList, JSON_UNESCAPED_UNICODE));

unset($taskList);  
echo 'true';
?>