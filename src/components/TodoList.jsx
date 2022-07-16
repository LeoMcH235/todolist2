import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./TodoItem";

const KEY = "todolist-todos";

export function TodoList() {
  const [todos, setTodos] = useState([]);

  const taskRef = useRef();
  const descRef = useRef();

  const agregarTarea = () => {
    const task = taskRef.current.value;
    const desc = descRef.current.value;

    console.log(task, desc);

    if (task === "" && desc === "") return;
    console.log("Agregando tarea...");

    /* Metodo que esta definido por react para operar los elementos */

    setTodos((prevTodos) => {
      const newTask = {
        id: uuid(),
        task: task,
        desc: desc,
        completed: false
      };

      return [...prevTodos, newTask];
    });

    taskRef.current.value = null;
    descRef.current.value = null;

  };



  const ResumenTareas = () => {
    const cant = cantidadTareas()

    if (cant === 0) {
      return (
        <div className="alert alert-success mt-3">
          Felicidades no tienes tareas pendientes :)
        </div>
      )
    }

    if (cant === 1) {
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
    const todo = newTodos.find((todo) => todo.id === id)
    /* Cambiamos el estado al caso contrario */
    todo.completed = !todo.completed
    if (todo.completed) {
      setTodos(todo.cambiarEstadoTarea)
    }
    /* Setear y actualizar la lista */
    setTodos(newTodos)
  }

  const eliminarTareasImportantes = () => {
    /* Se seleccionan todas las tareas que no estan completas */
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }


  return (
    <Fragment>
      <h1><strong>Post It Simulator!</strong></h1>
      <div className="input-group my-4">
        {/* Campo titulo */}
        <input
          ref={taskRef}
          type="text"
          placeholder="Ingrese una tarea"
          className="input-group form-control"
        />
        {/* Campo descripcion */}
        <input
          ref={descRef}
          type="text"
          placeholder="Ingrese descripcion"
          className="input-group form-control ms-2"
        />
        <div className="col-md-3">
          <input type="checkbox" value="importante" className="checkmark form-check-input ms-4" />

          <label className="text-blanco">Importante!</label>
        </div>


        <button onClick={agregarTarea} className="btn btn-agregar btn-success ms-2">
          Agregar
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></TodoItem>
        ))}
      </ul>

      <ResumenTareas />
    </Fragment>

  );
}
