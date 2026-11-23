package com.example.atlantic.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Отдаёт index.html Vue-приложения для клиентских маршрутов (history mode),
 * чтобы прямой заход или обновление страницы, например {@code /products}, не давали 404.
 * Пути с точкой (файлы статики) и {@code /api} сюда не попадают.
 */
@Controller
public class SpaController {

    @GetMapping("/{route:^(?!api$)[^.]+$}")
    public String forwardToApp() {
        return "forward:/index.html";
    }
}
