package com.example.atlantic.controllers;

import com.example.atlantic.models.Products;
import com.example.atlantic.repositorys.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.Optional;


@Controller
public class AtlanticController {

    @Autowired
    private ProductsRepository productsRepository;

    ArrayList<Optional<Products>> arrayList;

    @GetMapping("/")
    public String MainPage(Model model) {
        model.addAttribute("title", "Атлантика");
        Iterable<Products> products = productsRepository.findAll();

        arrayList = new ArrayList<>();
        for (int i = 1; i <= 3; i++)
            arrayList.add(productsRepository.findById((long) i));
//        arrayList.add(productsRepository.findById((long) 2));
//        arrayList.add(productsRepository.findById((long) 6));

        model.addAttribute("products",arrayList);

        return "index";
    }


    @GetMapping("/api/main_products")
    public ResponseEntity<ArrayList<Optional<Products>>> getProduct(){
        System.out.println(arrayList);
        return ResponseEntity.ok(arrayList);
    }

}


