package com.example.atlantic.product;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.Repository;

import java.util.List;

/**
 * Репозиторий только для чтения: сайт не изменяет каталог, поэтому методы записи
 * намеренно не наследуются от {@code CrudRepository}.
 */
public interface ProductRepository extends Repository<Product, Integer> {

    List<Product> findAll(Sort sort);
}
