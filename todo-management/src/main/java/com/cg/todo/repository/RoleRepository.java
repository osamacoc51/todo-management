package com.cg.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cg.todo.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	
	@Query
	Role findByName(String name);

}
