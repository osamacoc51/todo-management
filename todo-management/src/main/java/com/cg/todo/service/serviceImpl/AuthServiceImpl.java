package com.cg.todo.service.serviceImpl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cg.todo.dto.JwtAuthResponse;
import com.cg.todo.dto.LoginDto;
import com.cg.todo.dto.RegisterDto;
import com.cg.todo.entity.Role;
import com.cg.todo.entity.User;
import com.cg.todo.exception.TodoApiException;
import com.cg.todo.repository.RoleRepository;
import com.cg.todo.repository.UserRepository;
import com.cg.todo.security.JwtTokenProvider;
import com.cg.todo.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Override
	public String register(RegisterDto registerDto) {
		
		//check username is already exists in database
		if(userRepository.existsByUsername(registerDto.getUsername())) {
			throw new TodoApiException(HttpStatus.BAD_REQUEST,"username already exists!.");
		}
		
		//check email is already exists in database
		if(userRepository.existsByEmail(registerDto.getEmail())) {
			throw new TodoApiException(HttpStatus.BAD_REQUEST,"email already exists!.");
		}
		
		User user = new User();
		user.setName(registerDto.getName());
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		
		Set<Role> roles = new HashSet<Role>();
		Role userRole = roleRepository.findByName("ROLE_USER");
		roles.add(userRole);
		
		user.setRole(roles);
		
		userRepository.save(user);
		
		return "user registered successfully";
	}

	@Override
	public JwtAuthResponse login(LoginDto loginDto) {
		
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginDto.getUsernameOrEmail(),
				loginDto.getPassword()	
				));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtTokenProvider.generateToken(authentication);
		
		Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail());
		
		String role = null;
		
		if(userOptional.isPresent()){
			User loggedInUser = userOptional.get();
			Optional<Role> optionalRole = loggedInUser.getRole().stream().findFirst();
			
			if(optionalRole.isPresent()) {
				Role userRole = optionalRole.get();
				role = userRole.getName();
			}
		}
		
		JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
		jwtAuthResponse.setRole(role);
		jwtAuthResponse.setAccessToken(token);
		return jwtAuthResponse;
	}

}
