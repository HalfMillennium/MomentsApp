package com.hotspot.api.query

import com.hotspot.api.model.HotSpotUser
import com.hotspot.api.repository.HotSpotUserRepository
import com.coxautodev.graphql.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component
import java.util.*

@Component
class HotSpotUserQuery(
    private val hotSpotUserRepository: HotSpotUserRepository
) : GraphQLQueryResolver {

    fun hotSpotUsers(): MutableList<HotSpotUser> =
        hotSpotUserRepository.findAll()

    fun hotSpotUserById(id: String): Optional<HotSpotUser> =
        hotSpotUserRepository.findById(id)
}