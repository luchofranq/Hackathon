<?php

include 'conexion.php';

if ($con) {
    echo "Conexion con base de datos exitosa!<br>";
    echo "Estación meteorológica<br>";

    // Verificar si todos los campos necesarios están presentes y no son nulos ni 0
    if(isset($_POST['temperatura']) && $_POST['temperatura'] !== '' && $_POST['temperatura'] != 0 &&
       isset($_POST['humedad']) && $_POST['humedad'] !== '' && $_POST['humedad'] != 0 &&
       isset($_POST['velocidad']) && $_POST['velocidad'] !== '' && $_POST['velocidad'] != 0 &&
       isset($_POST['solar']) && $_POST['solar'] !== '' && $_POST['solar'] != 0 &&
       isset($_POST['rain']) && $_POST['rain'] !== '' && $_POST['rain'] != 0) {
        
        // Recoger los datos del formulario
        $temperatura = $_POST['temperatura'];
        $humedad = $_POST['humedad'];
        $velocidad = $_POST['velocidad'];
        $rain = $_POST['rain'];
        $solar = $_POST['solar'];
        // Insertar en la base de datos
        $consulta = "INSERT INTO report(temperature, wind_speed, moisture, solar_energy, rain, id_institute) VALUES ('$temperatura', '$velocidad','$humedad','$solar','$rain',1)";

        $resultado = mysqli_query($con, $consulta);

        if ($resultado) {
            echo "Registro en base de datos OK!<br>";
        } else {
            echo "Falla! Registro BD<br>";
        }
    } else {
        echo "No se han proporcionado todos los datos necesarios o algunos valores son nulos o 0.<br>";
    }
} else {
    echo "Falla! conexión con Base de datos<br>";
}

?>
