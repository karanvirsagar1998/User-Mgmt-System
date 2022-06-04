package com.appa4.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

// param:collection-Name and D-type of primary key
public interface UserRepository extends MongoRepository<User, String> {

}
