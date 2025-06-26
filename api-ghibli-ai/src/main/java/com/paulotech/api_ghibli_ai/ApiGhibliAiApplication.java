package com.paulotech.api_ghibli_ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ApiGhibliAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGhibliAiApplication.class, args);
	}

}
