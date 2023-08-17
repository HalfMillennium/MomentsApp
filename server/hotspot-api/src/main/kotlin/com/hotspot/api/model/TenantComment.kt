package com.hotspot.api.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "tenant_comment")
data class TenantComment(
    val hotSpotUserId: String,
    val apartmentBuildingId: String,
    val displayName: String,
    val content: String,
    val datePosted: String
) {
    @Id
    var id: String = ObjectId().toString()
}