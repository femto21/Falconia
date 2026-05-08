package com.femto.falconia.repository;

import com.femto.falconia.domain.entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LinkRepository extends JpaRepository<Link, Integer> {
    List<Link> getLinksByUserId(UUID userId);
}
