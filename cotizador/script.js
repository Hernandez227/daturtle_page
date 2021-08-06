//constructor
function Seguro(marca , anio, tipo) 
{
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo; 
}
//cotizarSeguro
Seguro.prototype.cotizarSeguro = function () {
  

    let cantidad;
    const base = 300;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.20;
            break;
        case '2':
            cantidad = base * 1.50;
            break;
        case '3':
            cantidad = base * 1.90;
            break;
    }

    //leer el mes
    const diferencia = new Date().getMonth() - this.anio;
    //cada mes de diferencia afecta en 6 %
    cantidad -= ((diferencia*6) * cantidad ) / 100;

    /*
        Si el servicio es maintenance * 16% más
        Si el servicio es stored 20% más
        Si el servicio es create 24% más
        Si es ninguno, no se suma ningun porcentaje
    */
   if (this.tipo === 'maintenance') {
       cantidad *= 1.16;
   } else if(this.tipo === 'stored'){
       cantidad *= 1.20;
   }else if(this.tipo === 'create'){
        cantidad *= 1.24;
   }else if(this.tipo === 'none'){
       cantidad == cantidad;
   }

   return cantidad;
}



//parte visual HTML
function Interfaz(){}

//Mensaje en HTml
Interfaz.prototype.mostarMensaje = function(mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === 'error') {
    div.classList.add('mensaje', 'error');
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));

  setTimeout(function() {
      document.querySelector('.mensaje').remove();
  }, 2000);
};

//imprime resultado de cotización
Interfaz.prototype.mostrarResultado = function (seguro, total) {
    const resultado = document.getElementById('resultado');
    let marca;

    switch (seguro.marca) {
        case '1':
            marca = 'Junior';            
            break;
        case '2':
            marca = 'Senior';
            break;
        case '3':
            marca = 'Principal';
            break;    
    }

    //crear un div
    const div = document.createElement('div');
    //insertar la información
    div.innerHTML = `
       <p class="header">Your resume:</p>
       <p>Service: ${marca}</p>
       <p>Time of technical support: ${seguro.anio} months</p>
       <p>Extra service: ${seguro.tipo}</p>
       <p>Total: $ ${total.toFixed(2)}</p> 

    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 500);   
    
}

//capturar datos del formulario
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //leer mes seleccionado
    const anio = document.getElementById("anio");
    const anioSeleccionado = anio.options[anio.selectedIndex].value; 

    //leer dato del radio Button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();
    //revisamos que los campos no estén vacíos

    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        //interfaz imprimiendo error
        interfaz.mostarMensaje('You need filling out all the data', 'error');
    } else {
        //limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        const cantidad = seguro.cotizarSeguro(seguro);
        //mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostarMensaje('Quoting your service', 'Correct');

    }

});




const max = new Date().getMonth(),
      min = max - 7;

const  selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
   let option = document.createElement('option');
   option.value = i;
   option.innerHTML = i;
   selectAnios.appendChild(option);
    
}
