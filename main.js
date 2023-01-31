// Elementos que necesitamos para manipular el DOM

contraseñaGenerada = document.getElementById("contraseña-generada");
copiarContraseña = document.getElementById("copiar-contraseña");
longitudContraseña = document.getElementById("longitud-contraseña");
incrementarRango = document.getElementById("incrementar-rango");
disminuirRango = document.getElementById("disminuir-rango");
inputLongitud = document.getElementById("longitud");
inputMayusculas = document.getElementById("mayusculas");
inputMinusculas = document.getElementById("minusculas");
inputNumeros= document.getElementById("numeros");
inputSimbolos = document.getElementById("simbolos");
botonGenerar = document.getElementById("boton-generar");

// Console.log para ver si lo estamos haciendo bien

console.log(contraseñaGenerada);
console.log(longitudContraseña);
console.log(copiarContraseña);
console.log(incrementarRango);
console.log(disminuirRango);
console.log(inputLongitud);
console.log(inputMayusculas);
console.log(inputMinusculas);
console.log(inputNumeros);
console.log(inputSimbolos);
console.log(botonGenerar);

// Variables que vamos a usar para conformar la contraseña

mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
console.log(mayusculas.length);
minusculas = "abcdefghijklmnopqrstuvwxyz";
console.log(minusculas.length);
numeros = "0123456789"
console.log(numeros.length);
simbolos = "!@#$%&*()_+=";
console.log("El total de simbolos es" + " " + simbolos.length);

// Lógica para que el botón "+" y "-" aumente y disminuya el rango de la contraseña, y que se muestre el número en lugar correspondiente

incrementarRango.addEventListener("click", function incrementarUno(){
    inputLongitud.value = parseInt(inputLongitud.value) + 1;
    longitudContraseña.textContent = inputLongitud.value;
});

disminuirRango.addEventListener("click", function disminuirUno(){
    inputLongitud.value = parseInt(inputLongitud.value) - 1;
    longitudContraseña.textContent = inputLongitud.value;
});

// Mostramos el valor en el lugar correspondiente según el valor de la barra.
function mostrarCantidad(valor){
    longitudContraseña.textContent = valor;
}

// Número aleatorio para elegir un caracter de cada string
function numeroAleatorio(maximo){
    return Math.floor(Math.random() * maximo)
}

// Funciones para obtener un caracter de cada string.

function obtenerMayuscula(){
    return mayusculas[numeroAleatorio(mayusculas.length)];
}

function obtenerMinuscula(){
    return minusculas[numeroAleatorio(minusculas.length)];
}

function obtenerNumeros(){
    return numeros[numeroAleatorio(numeros.length)];
}

function obtenerSimbolos(){
    return simbolos[numeroAleatorio(simbolos.length)];
}

// Lógica para que el botón "Generar contraseña" cree una contraseña aleatoria utilizando las características seleccionadas

let contraseñaNueva = '';

botonGenerar.addEventListener("click", function generarContraseña(e){
    console.log(obtenerMayuscula());
    console.log(obtenerMinuscula());
    console.log(obtenerNumeros());
    console.log(obtenerSimbolos());

    contraseñaNueva = '';

    if(inputMayusculas.checked){
        contraseñaNueva += obtenerMayuscula();
    }if(inputMinusculas.checked){
        contraseñaNueva += obtenerMinuscula();
    }if(inputNumeros.checked){
        contraseñaNueva += obtenerNumeros();
    }if(inputSimbolos.checked){
        contraseñaNueva += obtenerSimbolos();
    }

    if (inputMayusculas.checked || inputMinusculas.checked || inputNumeros.checked || inputSimbolos.checked) {
        rellenarContraseña();
    }

    console.log(contraseñaNueva);
    contraseñaGenerada.textContent = contraseñaNueva;


    if(checkboxDestildados()){
        mostrarError()
    }

})

function rellenarContraseña(){
    while(contraseñaNueva.length < parseInt(longitudContraseña.textContent)){
        const aleatorio = caracterAleatorio();

        if(inputMayusculas.checked && aleatorio === 0){
            contraseñaNueva += obtenerMayuscula();
        }if(inputMinusculas.checked && aleatorio === 1){
            contraseñaNueva += obtenerMinuscula();
        }if(inputNumeros.checked && aleatorio === 2){
            contraseñaNueva += obtenerNumeros();
        }if(inputSimbolos.checked && aleatorio === 3){
            contraseñaNueva += obtenerSimbolos();
        }
    }

    console.log(contraseñaNueva);
}

function caracterAleatorio(){
    return Math.floor(Math.random() * 4)
}

// LÓGICA PARA EL BOTÓN DE COPIAR CONTRASEÑA

copiarContraseña.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    textarea.value = contraseñaNueva;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
})

// RECORREMOS LOS INPUT CHECKBOX PARA SABER SI ESTAN DESTILDADOS

function checkboxDestildados(){
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log(checkboxes);
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        return false;
      }
    }
    return true;
  }

// LÓGICA PARA MOSTRAR UN ERROR SI NO SE TILDA NINGUN CARACTER 

function mostrarError(){
    const divError = document.querySelector("#error");
    const parrafoError = document.createElement('p');
    parrafoError.innerText = "Por favor selecciona alguna de las opciones de caracteres para crear tu contraseña";
    divError.appendChild(parrafoError);
    parrafoError.classList.add("error")

    setTimeout(() => {
        parrafoError.remove();
      }, 3000);
}