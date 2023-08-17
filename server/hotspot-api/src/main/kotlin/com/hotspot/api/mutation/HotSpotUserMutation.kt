package com.hotspot.api.mutation

import com.hotspot.api.model.HotSpotUser
import com.coxautodev.graphql.tools.GraphQLMutationResolver

import com.hotspot.api.repository.HotSpotUserRepository
import org.springframework.stereotype.Component

@Component
class HotSpotUserMutation(
    private val hotSpotUserRepository: HotSpotUserRepository
) : GraphQLMutationResolver {

    fun newHotSpotUser(firstName: String, lastName: String, displayName: String): HotSpotUser =
        hotSpotUserRepository.insert(HotSpotUser(firstName, lastName, displayName))

    fun deleteHotSpotUser(id: String): Boolean {
        hotSpotUserRepository.deleteById(id)
        return true
    }
}