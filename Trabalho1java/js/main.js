document.getElementById('formulario').addEventListener('submit', cadastraCarro);

function cadastraCarro(e) {


    var clienteNome = document.getElementById('clienteNome').value;
    var documentoPlaca = document.getElementById('documentoPlaca').value;
    var fabricanteMarca = document.getElementById('fabricanteMarca').value;
    var modeloCarro = document.getElementById('modeloCarro').value;
    var time = new Date();

    if (!clienteNome && !documentoPlaca) {
        alert("Por favor, preencha os campos em branco!");
        return false;
    }

    carro = {
        cliente: clienteNome,
        documento: documentoPlaca,
        fabricante: fabricanteMarca,
        modelo: modeloCarro,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }





    if (localStorage.getItem('setor2') === null) {
        var carros = [];
        carros.push(carro);
        localStorage.setItem('setor2', JSON.stringify(carros));

    } else {
        var carros = JSON.parse(localStorage.getItem('setor2'));
        carros.push(carro);
        localStorage.setItem('setor2', JSON.stringify(carros));
    }

    document.getElementById('formulario').reset();

    mostraSetor();

    e.preventDefault();
}

function apagarCar(documento) {
    console.log(documento);
    var carros = JSON.parse(localStorage.getItem('setor2'));

    for (var i = 0; i < carros.length; i++) {
        if (carros[i].documento == documento) {
            carros.splice(i, 1);
        }
        localStorage.setItem('setor2', JSON.stringify(carros));
    }

    mostraSetor();
}

function mostraSetor() {
    var carros = JSON.parse(localStorage.getItem('setor2'));
    var carrosResultados = document.getElementById('resultados')

    carrosResultados.innerHTML = '';

    for (var i = 0; i < carros.length; i++) {
        var cliente = carros[i].cliente;
        var documento = carros[i].documento;
        var fabricante = carros[i].fabricante;
        var modelo = carros[i].modelo;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        carrosResultados.innerHTML += '<tr><td>' + cliente +
            '</td><td>' + documento +
            '</td><td>' + fabricante +
            '</td><td>' + modelo +
            '</td><td>' + hora + ':' + minutos +

            '</td><td><button class="btn-danger" onclick="apagarCar(\'' + documento + '\')">Excluir</button></td>' +
            '</tr>';
    }
}