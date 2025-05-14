package com.pfe.model;



import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "produits")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class Produit {
    @Id
    private String id;
    private String name;
    private double price;
    private String category;
    private double rating;
}
 