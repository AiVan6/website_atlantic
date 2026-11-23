package com.example.atlantic.product;

/**
 * Представление товара для API.
 *
 * @param imageUrl абсолютный URL-путь к изображению (уже закодированный) или {@code null}
 */
public record ProductDto(Integer id, String name, String type, String imageUrl) {
}
