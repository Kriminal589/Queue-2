package com.webserver.webserver.repos;

import com.webserver.webserver.models.DisposableLink;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DisposableLinkRepository extends CrudRepository<DisposableLink, Long> {
    Optional<DisposableLink> findByExtension(String extension);
}
