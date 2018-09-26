<?php

require_once('conexion.php');

$id=1;
$accion='insert';
$nombre='nombre';
$desc='descr';

$proc = $con->prepare('CALL prPolitica(?,?,?,?)');

$proc->bindParam(1, $id, PDO::PARAM_INT|PDO::PARAM_INPUT_OUTPUT, 12);
$proc->bindParam(2, $nombre, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
$proc->bindParam(3, $desc, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
$proc->bindParam(4, $accion, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
$proc->execute();
$con=null;