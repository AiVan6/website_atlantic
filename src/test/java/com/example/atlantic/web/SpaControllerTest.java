package com.example.atlantic.web;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SpaController.class)
class SpaControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void clientRoutesAreForwardedToIndex() throws Exception {
        mvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("/index.html"));
    }

    @Test
    void apiPathIsNotForwarded() throws Exception {
        mvc.perform(get("/api"))
                .andExpect(forwardedUrl(null));
    }

    @Test
    void filesAreNotForwarded() throws Exception {
        mvc.perform(get("/missing.png"))
                .andExpect(status().isNotFound())
                .andExpect(forwardedUrl(null));
    }

    @Test
    void notFoundDoesNotEchoRequestedPath() throws Exception {
        mvc.perform(get("/api/<script>x</script>.js"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.detail").value("Ресурс не найден."));
    }
}
