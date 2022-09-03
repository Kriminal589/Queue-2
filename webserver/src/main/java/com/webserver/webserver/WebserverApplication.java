package com.webserver.webserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class WebserverApplication extends SpringBootServletInitializer {

//	@Override
//	protected SpringApplicationBuilder configure(SpringApplicationBuilder springApplicationBuilder){
//		return springApplicationBuilder.sources(WebserverApplication.class);
//	}

	public static void main(String[] args) {
		SpringApplication.run(WebserverApplication.class, args);
	}

}
