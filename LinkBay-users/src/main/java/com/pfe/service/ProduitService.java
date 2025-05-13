package com.pfe.service;


import com.pfe.model.Produit;
import com.pfe.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository repository;

    public Produit saveProduit(Produit produit) {
        return repository.save(produit);
    }

    public List<Produit> getAllProduits() {
        return repository.findAll();
    }

    public Produit getProduitById(String id) {
        return repository.findById(id).orElse(null);
    }

    public Produit updateProduit(String id, Produit produit) {
        produit.setId(id);
        return repository.save(produit);
    }

    public void deleteProduit(String id) {
        repository.deleteById(id);
    }
}
