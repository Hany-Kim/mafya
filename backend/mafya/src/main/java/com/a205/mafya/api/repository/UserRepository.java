package com.a205.mafya.api.repository;

import com.a205.mafya.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserCode(String userCode);

    List<User> findAllByClassCodeAndStatus(String classCode, int status);
}
