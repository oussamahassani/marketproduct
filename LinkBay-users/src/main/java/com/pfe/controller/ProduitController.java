package com.pfe.controller;
import com.pfe.model.Produit;
import com.pfe.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "*") // si React front
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }

    @GetMapping("/{id}")
    public Produit getProduit(@PathVariable String id) {
        return produitService.getProduitById(id);
    }

    @PutMapping("/{id}")
    public Produit updateProduit(@PathVariable String id, @RequestBody Produit produit) {
        return produitService.updateProduit(id, produit);
    }

    @DeleteMapping("/{id}")
    public void deleteProduit(@PathVariable String id) {
        produitService.deleteProduit(id);
    }
}

