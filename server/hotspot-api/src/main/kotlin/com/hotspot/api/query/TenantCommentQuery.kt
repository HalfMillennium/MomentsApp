package com.hotspot.api.query

import com.hotspot.api.model.TenantComment
import com.hotspot.api.repository.TenantCommentRepository
import com.coxautodev.graphql.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component
import java.util.*

@Component
class TenantCommentQuery(
    private val tenantCommentRepository: TenantCommentRepository
) : GraphQLQueryResolver {

    fun tenantComments(): MutableList<TenantComment> =
        tenantCommentRepository.findAll()

    fun tenantCommentById(id: String): Optional<TenantComment> =
        tenantCommentRepository.findById(id)
}