package com.cg.todo.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.cg.todo.entity.User;
import com.cg.todo.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
				.orElseThrow(()-> new UsernameNotFoundException("User not exist by username or email"));
		
		Set<GrantedAuthority> authorities = user.getRole().stream()
				.map((role)-> new SimpleGrantedAuthority(role.getName()))
				.collect(Collectors.toSet());
		return new org.springframework.security.core.userdetails.User(
				usernameOrEmail,
				user.getPassword(),
				authorities
				);
	}

}
