package com.cg.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cg.todo.dto.JwtAuthResponse;
import com.cg.todo.dto.LoginDto;
import com.cg.todo.dto.RegisterDto;
import com.cg.todo.service.AuthService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	//build register rest API
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	//build login rest API
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
		JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
		
		return new ResponseEntity<>(jwtAuthResponse,HttpStatus.OK);
	}
}
