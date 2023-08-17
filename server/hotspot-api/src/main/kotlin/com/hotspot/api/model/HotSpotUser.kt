package com.hotspot.api.model

import com.hotspot.api.model.ApartmentBuilding
import org.bson.types.ObjectId

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "user")
data class HotSpotUser(
    val firstName: String,
    val lastName: String,
    val displayName: String
) {
    @Id
    var id: String = ObjectId().toString()

    @Transient
    var favoritedBuildings: List<ApartmentBuilding> = ArrayList()

    @Transient
    var pastBuildings: List<ApartmentBuilding> = ArrayList()

    // add array of user's created reviews
}