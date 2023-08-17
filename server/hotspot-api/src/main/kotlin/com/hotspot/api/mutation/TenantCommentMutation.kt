package com.hotspot.api.mutation

import com.hotspot.api.model.TenantComment
import com.hotspot.api.repository.TenantCommentRepository
import com.coxautodev.graphql.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component

@Component
class TenantCommentMutation(
    private val tenantCommentRepository: TenantCommentRepository
) : GraphQLMutationResolver {

    fun newTenantComment(hotSpotUserId: String, apartmentBuildingId: String, displayName: String, datePosted: String, content: String): TenantComment =
        tenantCommentRepository.insert(TenantComment(hotSpotUserId, apartmentBuildingId, displayName, datePosted, content))

    fun deleteTenantComment(id: String): Boolean {
        tenantCommentRepository.deleteById(id)
        return true
    }
}