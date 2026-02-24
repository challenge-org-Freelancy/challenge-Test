package tn.esprit.challengeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ChallengeServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChallengeServiceApplication.class, args);
    }

}
