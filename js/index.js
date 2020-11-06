
const desTarea = document.getElementById('desTarea'); //input de texto
const nuevaTareaBoton = document.getElementById('nuevaTareaBoton');// boton
const tareasContainer = document.getElementById('tareasContainer'); //donde aparecen las tareas
const columnaToDo = document.getElementById('columnaToDo');
const columnaDoing = document.getElementById('columnaDoing');
const columnaDone = document.getElementById('columnaDone');

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
        nivel: 1,
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
            
            if(valor.nivel === 1){
                columnaToDo.value=''
                let bloqueTarea = new Tarea(valor);
                columnaToDo.appendChild(bloqueTarea.render());
                
            }

            if(valor.nivel === 2){
                columnaDoing.value=''
                let bloqueTarea = new Tarea(valor);
                columnaDoing.appendChild(bloqueTarea.render());
            }

            if(valor.nivel === 3){
                columnaDone.value=''
                let bloqueTarea = new Tarea(valor);
                columnaDone.appendChild(bloqueTarea.render());
            }
           

            /*let bloqueTarea = new Tarea(valor);
            tareasContainer.appendChild(bloqueTarea.render());*/
        }
    )

});