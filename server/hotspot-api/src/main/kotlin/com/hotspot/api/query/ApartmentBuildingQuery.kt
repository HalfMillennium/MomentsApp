package com.hotspot.api.query

import com.hotspot.api.model.ApartmentBuilding
import com.hotspot.api.repository.ApartmentBuildingRepository
import com.coxautodev.graphql.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component
import java.util.*

@Component
class ApartmentBuildingQuery(
    private val apartmentBuildingRepository: ApartmentBuildingRepository
) : GraphQLQueryResolver {

    fun apartmentBuildings(): MutableList<ApartmentBuilding> =
        apartmentBuildingRepository.findAll()

    fun apartmentBuildingById(id: String): Optional<ApartmentBuilding> =
        apartmentBuildingRepository.findById(id)
}