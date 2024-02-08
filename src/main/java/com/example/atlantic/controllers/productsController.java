package com.example.atlantic.controllers;

import com.example.atlantic.models.Products;
import com.example.atlantic.repositorys.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
public class productsController {

    @Autowired
    private ProductsRepository productsRepository;

    private Iterable<Products> searchResults;

//    @GetMapping("/")
//    public String index(Model model){
//        model.addAttribute("title","Атлантика");
//        Iterable<Products> products = productsRepository.findAll();
//
//        model.addAttribute("products",products);
//        return "index";
//    }


    @GetMapping("/products")
    public String productsPage(@RequestParam(required = false, name="searchTerm") String name, Model model){
        model.addAttribute("title","Атлантика");
        Iterable<Products> products = productsRepository.findAll();

        model.addAttribute("products",products);
        searchResults = productsRepository.findByNameContainingIgnoreCase(name);
        return "products";
    }


    @GetMapping("/api/data")
    public ResponseEntity<Iterable<Products>> getProduct(){

        Iterable<Products> data = productsRepository.findAll();

        System.out.println(searchResults);

        if(searchResults.iterator().hasNext()){
            data = searchResults;
        }

        return ResponseEntity.ok(data);
    }

}