package com.cg.todo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cg.todo.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query
	Optional<User> findByUsername(String username);
	
	@Query
	Boolean existsByEmail(String email);
	
	@Query
	Optional<User> findByUsernameOrEmail(String username, String email);
	
	Boolean existsByUsername(String username);

}
