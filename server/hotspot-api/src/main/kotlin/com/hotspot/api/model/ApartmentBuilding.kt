package com.hotspot.api.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "building")
data class ApartmentBuilding(
    val name: String,
    val address: String,
    val zipCode: String,
    val isLuxury: Boolean
) {
    @Id
    var id: String = ObjectId().toString()

    // add tenant reviews
}