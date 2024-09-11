package com.cg.todo.service;

import com.cg.todo.dto.JwtAuthResponse;
import com.cg.todo.dto.LoginDto;
import com.cg.todo.dto.RegisterDto;

public interface AuthService {
	
	String register(RegisterDto registerDto);
	
	JwtAuthResponse login(LoginDto loginDto);

}
