package tn.esprit.challengeservice.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j
@Service
public class GitHubService {

    private static final String TEMPLATE_URL =
            "https://api.github.com/repos/challenge-org-Freelancy/challenge-Test/generate";
    private static final String ORG_OWNER = "challenge-org-Freelancy";

    @Value("${github.token}")
    private String githubToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public String createRepository(String repoName) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "owner", ORG_OWNER,
                "name", repoName,
                "private", true
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                TEMPLATE_URL,
                HttpMethod.POST,
                request,
                Map.class
        );

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            String htmlUrl = (String) response.getBody().get("html_url");
            log.info("GitHub repository created successfully: {}", htmlUrl);
            return htmlUrl;
        }

        throw new RuntimeException("Failed to create GitHub repository: " + response.getStatusCode());
    }

    public void addCollaborator(String repoName, String usernameGithub) {
        String url = "https://api.github.com/repos/" + ORG_OWNER + "/" + repoName + "/collaborators/" + usernameGithub;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of("permission", "push");

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.PUT,
                request,
                Map.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("Collaborator {} added to repo {}", usernameGithub, repoName);
        } else {
            throw new RuntimeException("Failed to add collaborator: " + response.getStatusCode());
        }
    }

    public boolean isCollaboratorAccepted(String repoName, String usernameGithub) {
        String url = "https://api.github.com/repos/" + ORG_OWNER + "/" + repoName + "/collaborators/" + usernameGithub;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");

        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Void> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    request,
                    Void.class
            );
            return response.getStatusCode().value() == 204;
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }
}
