<?php
//Resgate das variaveis
$login =  $_POST["login"];
$senha =  $_POST["senha"];

//Verifica se as variaveis estão vazias
if (empty($login) || empty($senha)) {
    header("Location: form_login.php");

    exit();

}

//Conexão com banco de dados
$connect =  new PDO("mysql:dbname=usuario;host=localhost", "conexao", "samuraix");
$stmt = $connect->prepare("SELECT * FROM tb_usuario WHERE usuario = :USUARIO  AND senha = :SENHA");

$stmt->bindParam(":EMAIL", $login);
$stmt->bindParam(":SENHA", $senha);

$stmt->execute();

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

//Verificar se a variavel resultado possui algum dado
if (count($resultado) <=0){
    echo "Usuario ou senha invalido !";

    exit;

}

//Pegar o primeiro indice para estancia
$pega = $resultado[0];


//Iniciar a sessão
session_start();
$_SESSION['logged_in'] = true;
$_SESSION['user_id'] = $pega['id_login'];
$_SESSION['user_name'] = $pega['email'];

//Verifica se o usuario é admin ou usuario é comum
if ($pega['nivel'] == 1) {
    header('Location: cadastrar.php');
    exit();
}else {
    header('Location: cadastro.php');
	 exit();
}

?>