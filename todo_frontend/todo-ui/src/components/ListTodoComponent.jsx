import React, { useEffect, useState } from "react";
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from "../service/TodoService";
import { useNavigate } from "react-router-dom";
import { MDBBtnGroup, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { isAdminUser } from "../service/AuthService";
;

export const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate()

  const isAdmin = isAdminUser();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.config);
        console.log(error.response);
      });
  }

  function addNewTodo() {
    navigate('/add-todo')
  }

  function updateTodo(id) {
    console.log(id);
    navigate(`/update-todo/${id}`)
  }

  function removeTodo(id) {
    console.log(id);
    deleteTodo(id).then((response) => {
      listTodos();
    }).catch((error) => {
      console.log(error);
    })
  }

  function markCompleteTodo(id) {
    console.log(id);
    completeTodo(id).then((response) => {
      listTodos();
    }).catch((error) => {
      console.log(error);
    })
  }

  function markInCompleteTodo(id) {
    console.log(id);
    incompleteTodo(id).then((response) => {
      listTodos();
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="container mt-5">
      <h2 className="head-color text-center mt-5">List of Todos</h2>
      {
        isAdmin &&
        <div className="d-flex justify-content-start">
          <button type="button" className="btn btn-outline-primary mb-3" data-mdb-ripple-init data-mdb-ripple-color="dark" style={{ color: '#40679E' }} onClick={addNewTodo}>Add Todo</button>
        </div>
      }

      <div className="table-responsive">
        <MDBTable className="table table-bordered table-striped table-hover border-primary responsive">
          <MDBTableHead className="thead-dark text-center">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody className='text-center'>
            {todos.map((todo) => (
              <tr
                key={todo.id}

              >
                <td className={todo.completed ? "table-success" : "table-danger"}>{todo.title}</td>
                <td className={todo.completed ? "table-success" : "table-danger"}>{todo.description}</td>
                <td className={todo.completed ? "table-success" : "table-danger"}>{todo.completed ? "Yes" : "No"}</td>
                <td>
                  {
                    isAdmin &&
                    <MDBBtnGroup type="button" className="btn btn-outline-secondary" onClick={() => updateTodo(todo.id)}>Update</MDBBtnGroup>
                  }

                  {
                    isAdmin &&
                    <MDBBtnGroup type="button" className="btn btn-outline-danger ms-3" onClick={() => removeTodo(todo.id)}>Delete</MDBBtnGroup>
                  }

                  <MDBBtnGroup type="button" className="btn btn-outline-success ms-3" onClick={() => markCompleteTodo(todo.id)}>Complete</MDBBtnGroup>
                  <MDBBtnGroup type="button" className="btn btn-outline-info ms-3" onClick={() => markInCompleteTodo(todo.id)}>InComplete</MDBBtnGroup>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div >
  );
};