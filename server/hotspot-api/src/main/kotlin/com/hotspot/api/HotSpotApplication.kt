package com.hotspot.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HotSpotApplication

fun main(args: Array<String>) {
    runApplication<HotSpotApplication>(*args)
}
