package com.cg.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.todo.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{

}
