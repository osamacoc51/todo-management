package com.cg.todo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cg.todo.security.JwtAuthenticationEntryPoint;
import com.cg.todo.security.JwtAuthenticationFilter;


//import lombok.AllArgsConstructor;

@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtAuthenticationEntryPoint authenticationEntryPoint;
	
	@Autowired
	private JwtAuthenticationFilter authenticationFilter;

	@Bean
	static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	 @Bean
	    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http.csrf(csrf -> csrf.disable())
	             .authorizeHttpRequests(authorize -> {
//	                authorize.requestMatchers(HttpMethod.POST, "/api/todos/**").hasRole("ADMIN");
//	                authorize.requestMatchers(HttpMethod.PUT,"/api/todos/**").hasRole("ADMIN");
//	                authorize.requestMatchers(HttpMethod.DELETE,"/api/todos/**").hasRole("ADMIN");
//	                
//	                authorize.requestMatchers(HttpMethod.GET,"api/todos/**").hasAnyRole("ADMIN","USER");
//	                authorize.requestMatchers(HttpMethod.PATCH,"api/todos/**").hasAnyRole("ADMIN","USER");
//	                authorize.requestMatchers(HttpMethod.GET,"api/todos/**").permitAll();
	            	authorize.requestMatchers("/api/todos/auth/**").permitAll();
	            	authorize.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
	                authorize.anyRequest().authenticated();
	            })
	            .httpBasic(Customizer.withDefaults());
	        
	        http.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));
	        
	        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
	        
	        return http.build();
	    }
	 
	 @Bean
	 public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		 return configuration.getAuthenticationManager();
	 }
//
//	@Bean
//	UserDetailsService userDetailsService() {
//		UserDetails user = User.builder().username("osama").password(passwordEncoder().encode("password")).roles("USER")
//				.build();
//
//		UserDetails admin = User.builder().username("admin").password(passwordEncoder().encode("admin")).roles("ADMIN")
//				.build();
//
//		return new InMemoryUserDetailsManager(user, admin);
//	}
}
