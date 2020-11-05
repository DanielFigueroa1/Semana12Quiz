class Tarea {

    constructor(publicacionTarea){
        this.publicacionTarea = publicacionTarea;
    }

    render = () => {
        let component = document.createElement('div');
        component.className = 'bloqueTarea';

        let nombreTarea = document.createElement('div'); //nombre tarea
        nombreTarea.className = 'nombreTareas';
        nombreTarea.innerHTML = this.publicacionTarea.tarea;

        //tiempo de subida

        let botonBorrar = document.createElement('button');//boton borrar
        botonBorrar.className = "botonEliminar";
        botonBorrar.innerHTML = "X";

        let botonSubir = document.createElement('button');//boton derecho
        botonSubir.className = "botonSubirRango";
        botonSubir.innerHTML = ">";

        let botonBajar = document.createElement('button');//boton izquierdo
        botonBajar.className = "botonBajarRango";
        botonBajar.innerHTML = "<";


        //para que los botones y nombre de tarea se creen
        component.appendChild(nombreTarea);
        component.appendChild(botonBorrar);
        component.appendChild(botonSubir);
        component.appendChild(botonBajar);

        botonBorrar.addEventListener('click', ()=>{
            //alert(this.publicacionTarea.id);
            const database = firebase.database();
            database.ref('tareas/'+this.publicacionTarea.id).set(null);
        });

        return component;
    }
}