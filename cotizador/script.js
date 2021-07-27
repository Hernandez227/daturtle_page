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
    const base = 300    ;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }

    //leer el año
    const diferencia = new Date().getMonth() - this.anio;
    //cada año de diferencia afeca en 3 %
    cantidad -= ((diferencia*3) * cantidad ) / 100;

    /*
        Si el seguro es Básico * 30% más
        Si el seguro es Completo 50% más
    */
   if (this.tipo === 'maintenance') {
       cantidad *= 1.15;
   } else if(this.tipo === 'stored'){
       cantidad *= 1.20;
   }else if(this.tipo === 'create'){
        cantidad *= 1.30;
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
       <p>Time: ${seguro.anio} months</p>
       <p>Extra service: ${seguro.tipo}</p>
       <p>Total: $ ${total}</p>   
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 500);   
    
}

//capturar datops del formulario
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
      min = max - 6;

const  selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
   let option = document.createElement('option');
   option.value = i;
   option.innerHTML = i;
   selectAnios.appendChild(option);
    
}