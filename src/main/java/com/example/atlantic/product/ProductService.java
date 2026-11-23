package com.example.atlantic.product;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class ProductService {

    private static final Sort DEFAULT_ORDER = Sort.by("id");
    private static final Pattern LEADING_SLASHES = Pattern.compile("^[/\\\\]+");
    private static final Pattern PARENT_SEGMENT = Pattern.compile("(^|[/\\\\])\\.\\.([/\\\\]|$)");

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<ProductDto> findAll() {
        return repository.findAll(DEFAULT_ORDER).stream()
                .map(ProductService::toDto)
                .toList();
    }

    static ProductDto toDto(Product product) {
        return new ProductDto(product.getId(), product.getName(), product.getType(), toImageUrl(product.getImg()));
    }

    /**
     * Пути в БД хранятся относительно корня статики и содержат кириллицу и пробелы,
     * поэтому приводим их к абсолютному и корректно закодированному URL-пути.
     * Результат всегда ссылается на собственный origin: ведущие «/» и «\» схлопываются
     * (иначе «//host/…» стал бы внешней ссылкой), пути с «..» отбрасываются.
     */
    static String toImageUrl(String path) {
        if (!StringUtils.hasText(path)) {
            return null;
        }
        String relative = LEADING_SLASHES.matcher(path.strip()).replaceFirst("");
        if (relative.isEmpty() || PARENT_SEGMENT.matcher(relative).find()) {
            return null;
        }
        return UriUtils.encodePath("/" + relative, StandardCharsets.UTF_8);
    }
}
