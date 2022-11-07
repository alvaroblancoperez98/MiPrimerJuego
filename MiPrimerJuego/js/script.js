let ciudades = [];
//array que guarda los ciudades para jugar
ciudades = ["BOLONIA", "PARIS", "BARCELONA", "HUELVA", "CADIZ", "SEVILLA", "GRANADA", "MADRID", "MERIDA", "HELSINKI", "CUENCA"];
//array donde se guradaran las ciudades desordenadas
let ciudadesDesordenadas=[];
//variable que guarda la posicion actual
let posActual = 0;
//variable que guarda la cantidad acertada
let cantidadAcertadas = 0;
//variables para la funcion move()
let x = 0;
let idInterval;

//funcion para desordenar las ciudades
function desordenarCiudades(){
    for(var i=0;i<ciudades.length;i++){
        //convertimos la ciudad en un array
        let ciudad = ciudades[i];
        ciudadx = ciudad.split('');
    
        let ciudadDesordenada;
    
        //desordenamos el array
        ciudadDesordenada = ciudadx.sort(function(){return Math.random() - 0.5});
    
        //Convertimos el array a string
        ciudadDesordenada = ciudadDesordenada.toString();
        ciudadDesordenada = ciudadDesordenada.replace(/,/g,"");
    
        //Guardamos la ciudad en el array de ciudades desordenadas
        ciudadesDesordenadas.push(ciudadDesordenada);
    }
}


function mostrarNuevaciudad(){
    //controlo si termina el array
    if(posActual >= ciudades.length){
        mostrarPantallaFinal();
    }
    let contenedorciudad = document.getElementById("ciudad");
    //eliminamos todo lo que tiene el div de la ciudad
    contenedorciudad.innerHTML="";

    let ciudad = ciudadesDesordenadas[posActual];
    ciudadx = ciudad.split('');

    x=0;
    clearInterval(idInterval);
    move();
    //En este for introduzco las nuevas ciudades
    for(i=0;i<ciudadx.length;i++){
        var div = document.createElement("div");
        div.className = "letra";
        div.innerHTML = ciudad[i];
        contenedorciudad.appendChild(div);
    }
}

//Funcion para mostrar el resultado y la pantalla final
function mostrarPantallaFinal(){
    clearInterval(idInterval);
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "flex";
    document.getElementById("acertadas").innerHTML = cantidadAcertadas;
}

//Funcion que compara la ciudad ingresada con la ciudad correcta
function comparar(){
    var ciudadOrdaneda = ciudades[posActual];
    var ciudadIngresada = document.getElementById("ciudadIngresada").value;
    ciudadIngresada = ciudadIngresada.toUpperCase();

    if(ciudadOrdaneda == ciudadIngresada){
        posActual++;
        cantidadAcertadas++;
        document.getElementById("contador").innerHTML = cantidadAcertadas;
        ciudadIngresada = document.getElementById("ciudadIngresada").value="";
        mostrarNuevaciudad();
    }
}

//Funcion que comprueba si myBar esta completo(para reiniciarlo) y vacia la ciudad que esta ingresando cuando se acabe el tiempo
function move() {
  if (x == 0) {
    x= 1;
    let elem= document.getElementById("myBar");
    let width = 1;
    idInterval = setInterval(frame, 60);
    function frame() {
      if (width >= 100) {
        clearInterval(idInterval);
        x = 0;
        posActual++;
        ciudadIngresada = document.getElementById("ciudadIngresada").value="";
        mostrarNuevaciudad();
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
} 

//boton de comenzar
function comenzarJuego(){
    ciudadesDesordenadas=[];
    posActual = 0;
    cantidadAcertadas = 0;
    desordenarCiudades();
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    document.getElementById("pantalla-final").style.display = "none";
    mostrarNuevaciudad();
    document.getElementById("contador").innerHTML = 0;
    document.getElementById("ciudadIngresada").focus();
}