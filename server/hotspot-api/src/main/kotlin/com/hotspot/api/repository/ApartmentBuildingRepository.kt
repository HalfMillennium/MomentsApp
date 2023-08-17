package com.hotspot.api.repository

import com.hotspot.api.model.ApartmentBuilding
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ApartmentBuildingRepository : MongoRepository<ApartmentBuilding, String>