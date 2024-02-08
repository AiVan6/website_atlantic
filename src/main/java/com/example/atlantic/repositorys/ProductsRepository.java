package com.example.atlantic.repositorys;

import com.example.atlantic.models.Products;
import org.springframework.data.repository.CrudRepository;

public interface ProductsRepository extends CrudRepository<Products,Long> {
    Iterable<Products> findByNameContainingIgnoreCase(String name);

}
