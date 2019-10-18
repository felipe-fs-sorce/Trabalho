<?php
session_start();
$_session['logged_in'] = false;
session_destroy();
header('Location: index.php');
exit();