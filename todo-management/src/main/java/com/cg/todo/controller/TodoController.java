	package com.cg.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.todo.dto.TodoDto;
import com.cg.todo.service.TodoService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

/*most of the developer prefer method level security to secure 
 * the rest APIs based using role based authorization */

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
@EnableMethodSecurity
public class TodoController {

	@Autowired
	private TodoService todoService;

	// build addtodo rest api
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/save")
	public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {
		TodoDto savedTodo = todoService.addTodo(todoDto);
		return new ResponseEntity<TodoDto>(savedTodo, HttpStatus.CREATED);
	}

	@PreAuthorize("hasAnyRole('ADMIN','USER')")
	@GetMapping("/get/{id}")
	public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long todoId) {
		TodoDto todoDto = todoService.getTodo(todoId);
		return new ResponseEntity<TodoDto>(todoDto, HttpStatus.OK);
	}

	// build getalltodos rest apis
	@PreAuthorize("hasAnyRole('ADMIN','USER')")
	@GetMapping("/all")
	public ResponseEntity<List<TodoDto>> getAllTodos() {
		List<TodoDto> todos = todoService.getAllTodos();
		return new ResponseEntity<>(todos, HttpStatus.OK);
	}

	// build update todo rest api
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/update/{id}")
	public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @PathVariable("id") Long todoId) {
		TodoDto updatedTodo = todoService.updateTodo(todoDto, todoId);
		return ResponseEntity.ok(updatedTodo);
	}

	// build delete todo rest api
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id) {
		todoService.deleteTodo(id);
		return ResponseEntity.ok("Todo deleted successfully!.");
	}

	// build complete todo rest api
	@PreAuthorize("hasAnyRole('ADMIN','USER')")
	@PatchMapping("/{id}/completed")
	public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long todoId) {
		TodoDto updatedTodo = todoService.completeTodo(todoId);
		return ResponseEntity.ok(updatedTodo);
	}

	// build incomplete todo rest api
	@PreAuthorize("hasAnyRole('ADMIN','USER')")
	@PatchMapping("/{id}/incompleted")
	public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long todoId) {
		TodoDto updatedTodo = todoService.inCompleteTodo(todoId);
		return ResponseEntity.ok(updatedTodo);
	}
}
