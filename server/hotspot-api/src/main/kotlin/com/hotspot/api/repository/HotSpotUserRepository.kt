package com.hotspot.api.repository

import com.hotspot.api.model.HotSpotUser
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface HotSpotUserRepository : MongoRepository<HotSpotUser, String>