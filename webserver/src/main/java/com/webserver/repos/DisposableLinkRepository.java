package com.webserver.repos;

import com.webserver.models.DisposableLink;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DisposableLinkRepository extends CrudRepository<DisposableLink, Long> {
}
