import React, { useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { MDBContainer, MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import todoImage from "./assets/todo.jpg";
import { getTodo, saveTodo, updateTodo } from "../service/TodoService";
import { useNavigate, useParams } from "react-router-dom";

export const TodoComponent = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateTodo = (data) => {
    const todo = {
      title: data.title,
      description: data.description,
      completed: data.completed === 'true',
    };

    if (id) {
      updateTodo(id, todo).then((response) => {
        console.log(response.data);
        navigate('/todos');
      }).catch((error) => {
        console.error(error);
      });
    } else {
      saveTodo(todo).then((response) => {
        console.log(response.data);
        navigate('/todos');
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  const pageTitle = () => {
    return id ? <h1 className="head-color mt-5 text-center">Update Todo</h1> : <h1 className="head-color mt-5 text-center">Add Todo</h1>;
  };

  useEffect(() => {
    if (id) {
      getTodo(id).then((response) => {
        const todo = response.data;
        reset({
          title: todo.title,
          description: todo.description,
          completed: todo.completed ? 'true' : 'false'
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [id, reset]);

  return (
    <MDBContainer>
      <MDBRow className="mt-5 justify-content-center">
        <MDBCol md="4" className="d-flex align-items-center justify-content-center">
          <img className="img-fluid" alt="todo" src={todoImage} />
        </MDBCol>
        <MDBCol className="ms-5" md="6">
          <form onSubmit={handleSubmit(saveOrUpdateTodo)}>
            {pageTitle()}
            <div className="form-outline mb-4 mt-5">
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <MDBInput
                    {...field}
                    label="Title"
                    id="title"
                    floatingLabel
                  />
                )}
              />
              {errors.title && <span className="text-danger">{errors.title.message}</span>}
            </div>

            <div className="form-outline mb-4">
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <MDBInput
                    {...field}
                    label="Description"
                    id="description"
                    floatingLabel
                  />
                )}
              />
              {errors.description && <span className="text-danger">{errors.description.message}</span>}
            </div>

            <div className="form-outline mb-4">
              <Controller
                name="completed"
                control={control}
                defaultValue=""
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <select {...field} className="form-select">
                    <option value="" disabled>Select status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                )}
              />
              {errors.completed && <span className="text-danger">{errors.completed.message}</span>}
            </div>

            <MDBBtn type="submit" className="btn btn-success btn-block">Submit</MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
