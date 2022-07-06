import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./TodoItem";

const KEY = "todolist-todos";

export function TodoList() {
  const [todos, setTodos] = useState([]);

  const taskRef = useRef();

  /* Permite almacenar los datos en el nabegador */
/*   useEffect(() => {

    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos){
        setTodos(storedTodos);
    }
}, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);
 */
  /* Fin de reglas */

  const agregarTarea = () => {
    const task = taskRef.current.value;
    console.log(task);

    if (task === "") return;
    console.log("Agregando tarea...");

    /* Metodo que esta definido por react para operar los elementos */

    setTodos((prevTodos) => {
      const newTask = {
        id: uuid(),
        task: task,
        completed: false
      };

      return [...prevTodos, newTask];
    });

    taskRef.current.value = null;
  };


  const ResumenTareas = () => {
    const cant = cantidadTareas()

    if(cant === 0){
      return (
        <div className="alert alert-success mt-3">
          Felicidades no tienes tareas pendientes :)
        </div>
      )
    }

    if(cant === 1){
      return (
        <div className="alert alert-info mt-3">
          Te queda solamente una tarea pendiente!!
        </div>
      )
    }

    return (
      <div className="alert alert-info mt-3">
        Te quedan {cant} tareas pendientes!!
      </div>
    )

  }

  const cantidadTareas = () => {
      return todos.filter((todo) => !todo.completed).length;
  }

  const cambiarEstadoTarea = (id) => {
    console.log(id)
    /* Tomamos los datos de la lista actuales */
    const newTodos = [...todos]
    /* Buscar el elemento con nuestro id */
    const todo = newTodos.find((todo) => todo.id ===id)
    /* Cambiamos el estado al caso contrario */
    todo.completed = !todo.completed
    /* Setear y actualizar la lista */
    setTodos(newTodos)
  }

  const eliminarTareasCompletas = () => {
    /* Se seleccionan todas las tareas que aun no se hacen */
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
 }


  return (
    <Fragment>
      <h1>Listado de Tareas</h1>
      <div className="input-group my-4">
        <input
          ref={taskRef}
          type="text"
          placeholder="Ingrese una tarea"
          className="form-control"
        />
        <button onClick={agregarTarea} className="btn btn-success ms-2">
          +
        </button>
        <button onClick={eliminarTareasCompletas} className='btn btn-danger ms-2'>
        <i class="bi bi-trash"></i>

        </button>
      </div>

      <ul className="list-group">
        {/* Investigar que más se puede hacer con el método map */}
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></TodoItem>
        ))}
      </ul>

      <ResumenTareas />
    </Fragment>
  );
}
