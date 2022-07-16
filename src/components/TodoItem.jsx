import React, { Fragment } from "react";
import { TodoList } from "./TodoList";
export function TodoItem({ todo, cambiarEstado }) {
  const { id, task, desc, completed} = todo;


  const fnCambiarEstado = () => {
    cambiarEstado(id);
  };

  return (
    <Fragment>
      <form className="d-flex" action="post" method="post">
          <li >
            <div>
            <a href="#">
              <span className="botonX">x</span>
              <h2>{todo.task}</h2>
              <p>{todo.desc}</p>
            </a>
            </div>
          </li>
      </form>
    </Fragment>
  );
}
