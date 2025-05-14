package com.pfe.repository;


import com.pfe.model.Produit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProduitRepository extends MongoRepository<Produit, String> {
}
