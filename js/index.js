
const desTarea = document.getElementById('desTarea'); //input de texto
const nuevaTareaBoton = document.getElementById('nuevaTareaBoton');// boton
const tareasContainer = document.getElementById('tareasContainer'); //donde aparecen las tareas

const database = firebase.database();

//funciones

registrarTarea = () => {

    if (desTarea.value === ''){
        alety('Campo Vacio');
        return;
    }

    let referencia = database.ref('tareas').push();
    let publicacionTarea = {
        id: referencia.key,
        tarea: desTarea.value, //cambiarle el estado por un valor que ponga aqui o por una rama que se crea en firebase
    };

    referencia.set(publicacionTarea);

    desTarea.value='';
}

nuevaTareaBoton.addEventListener('click', registrarTarea); //boton que sube las tareas a firebase

//lectura
database.ref('tareas').on('value', function(data) {
    tareasContainer.innerHTML = ''; //para que se puedan crear nuevas tareas sin que se copien
    data.forEach(
        publicacionTarea => {
            let valor = publicacionTarea.val();
            
           

            let bloqueTarea = new Tarea(valor);
            tareasContainer.appendChild(bloqueTarea.render());
        }
    )

});