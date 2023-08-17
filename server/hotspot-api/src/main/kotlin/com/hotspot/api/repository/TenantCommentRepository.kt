package com.hotspot.api.repository

import com.hotspot.api.model.TenantComment
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface TenantCommentRepository : MongoRepository<TenantComment, String>