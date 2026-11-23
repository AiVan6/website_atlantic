package com.example.atlantic.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Позиция ассортимента. Таблица {@code products} заполняется из дампа {@code atlantica.dump};
 * приложение работает с ней только на чтение.
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    private Integer id;

    @Column(nullable = false)
    private String name;

    /** Код категории: «ХК», «ГК», «Соленая», «Салат» и т.д. */
    private String type;

    /** Путь к изображению относительно корня статики, например {@code img/products/ХК/Кета.jpg}. */
    private String img;

    protected Product() {
        // для JPA
    }

    public Product(Integer id, String name, String type, String img) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.img = img;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getImg() {
        return img;
    }
}
