import React, { Fragment } from "react";

export function TodoItem({ todo, cambiarEstado }) {
  const { id, task, completed } = todo;

  const fnCambiarEstado = () => {
    cambiarEstado(id);
  };

  return (
    <Fragment>
      <li className="list-group-item">
        <input type="checkbox" className="form-check-input me-2" onChange={fnCambiarEstado} checked={completed} />

        {todo.task}
      </li>
    </Fragment>
  );
}
