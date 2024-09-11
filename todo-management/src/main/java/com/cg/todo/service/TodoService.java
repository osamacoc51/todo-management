package com.cg.todo.service;

import java.util.List;

import com.cg.todo.dto.TodoDto;
import com.cg.todo.entity.Todo;

public interface TodoService {
	
	TodoDto addTodo(TodoDto todoDto);
	TodoDto getTodo(Long id);
	List<TodoDto> getAllTodos();
	TodoDto updateTodo(TodoDto todoDto, Long id);
	void deleteTodo(Long id);
	TodoDto completeTodo(Long id);
	TodoDto inCompleteTodo(Long id);

}
