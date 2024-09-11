package com.cg.todo.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TodoApiException extends RuntimeException {
	
	private HttpStatus status;
	private String message;

}
