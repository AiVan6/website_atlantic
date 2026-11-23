package com.example.atlantic.product;

import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ProductServiceTest {

    private final ProductRepository repository = mock(ProductRepository.class);
    private final ProductService service = new ProductService(repository);

    @Test
    void findAllMapsEntitiesAndSortsById() {
        when(repository.findAll(any(Sort.class))).thenReturn(List.of(
                new Product(1, "Язь пласт", "ХК", "img/products/ХК/Язь пласт.jpg")));

        List<ProductDto> result = service.findAll();

        assertThat(result).containsExactly(new ProductDto(1, "Язь пласт", "ХК",
                "/img/products/%D0%A5%D0%9A/%D0%AF%D0%B7%D1%8C%20%D0%BF%D0%BB%D0%B0%D1%81%D1%82.jpg"));
        verify(repository).findAll(Sort.by("id"));
    }

    @Test
    void imageUrlKeepsLeadingSlashAndEncodesSpecialCharacters() {
        assertThat(ProductService.toImageUrl("/img/a b.png")).isEqualTo("/img/a%20b.png");
        assertThat(ProductService.toImageUrl("img/Торнадо (Кола).jpg"))
                .isEqualTo("/img/%D0%A2%D0%BE%D1%80%D0%BD%D0%B0%D0%B4%D0%BE%20(%D0%9A%D0%BE%D0%BB%D0%B0).jpg");
    }

    @Test
    void imageUrlIsNullForMissingImage() {
        assertThat(ProductService.toImageUrl(null)).isNull();
        assertThat(ProductService.toImageUrl("  ")).isNull();
    }

    @Test
    void imageUrlNeverPointsToForeignOriginOrParentDirectory() {
        assertThat(ProductService.toImageUrl("//evil.example/x.png")).isEqualTo("/evil.example/x.png");
        assertThat(ProductService.toImageUrl("\\\\evil.example/x.png")).isEqualTo("/evil.example/x.png");
        assertThat(ProductService.toImageUrl("/\\evil.example/x.png")).isEqualTo("/evil.example/x.png");
        assertThat(ProductService.toImageUrl("img/../../application.properties")).isNull();
        assertThat(ProductService.toImageUrl("..")).isNull();
        assertThat(ProductService.toImageUrl("///")).isNull();
        assertThat(ProductService.toImageUrl("img/a..b.png")).isEqualTo("/img/a..b.png");
    }
}
