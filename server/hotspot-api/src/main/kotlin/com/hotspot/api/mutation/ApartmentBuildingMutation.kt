package com.hotspot.api.mutation

import com.hotspot.api.model.ApartmentBuilding
import com.hotspot.api.repository.ApartmentBuildingRepository
import com.coxautodev.graphql.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component
import org.bson.types.ObjectId

@Component
class ApartmentBuildingMutation(
    private val apartmentBuildingRepository: ApartmentBuildingRepository
) : GraphQLMutationResolver {

    fun newApartmentBuilding(name: String, address: String, zipCode: String, isLuxury: Boolean): ApartmentBuilding =
        apartmentBuildingRepository.insert(ApartmentBuilding(name, address, zipCode, isLuxury))

    fun deleteApartmentBuilding(id: String): Boolean {
        apartmentBuildingRepository.deleteById(id)
        return true
    }
}