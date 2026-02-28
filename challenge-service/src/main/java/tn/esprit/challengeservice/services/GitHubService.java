package tn.esprit.challengeservice.services;

import com.goterl.lazysodium.SodiumJava;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Slf4j
@Service
public class GitHubService {

    private static final String TEMPLATE_URL =
            "https://api.github.com/repos/challenge-org-Freelancy/challenge-Test/generate";
    private static final String ORG_OWNER = "challenge-org-Freelancy";
    private static final String SONAR_ORG = "challenge-org-freelancy";
    private static final int SEAL_BYTES = 48;

    @Value("${github.token}")
    private String githubToken;

    @Value("${sonar.token}")
    private String sonarToken;

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

    public boolean doesUserExist(String usernameGithub) {
        String url = "https://api.github.com/users/" + usernameGithub;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/vnd.github+json");

        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.GET, request, Void.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (HttpClientErrorException.NotFound e) {
            return false;
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

    public void createSonarCloudProject(String repoName) {
        if (sonarToken == null || sonarToken.isEmpty()) {
            log.warn("SONAR_TOKEN not configured, skipping SonarCloud project creation for repo: {}", repoName);
            return;
        }

        String projectKey = ORG_OWNER + "_" + repoName;
        String url = "https://sonarcloud.io/api/projects/create"
                + "?name=" + repoName
                + "&organization=" + SONAR_ORG
                + "&project=" + projectKey;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + sonarToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("SonarCloud project created: {}", projectKey);
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 400 && e.getResponseBodyAsString().contains("already exists")) {
                log.info("SonarCloud project already exists: {}", projectKey);
            } else {
                log.error("Failed to create SonarCloud project: {}", e.getMessage());
                throw new RuntimeException("Failed to create SonarCloud project: " + e.getMessage());
            }
        }
    }

    public String createPullRequest(String repoName, String branchName) {
        String url = "https://api.github.com/repos/" + ORG_OWNER + "/" + repoName + "/pulls";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "title", "Challenge Submission",
                "head", branchName,
                "base", "main",
                "body", "Automated challenge submission from branch " + branchName
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String prUrl = (String) response.getBody().get("html_url");
                log.info("Pull request created for repo {}: {}", repoName, prUrl);
                return prUrl;
            }
            throw new RuntimeException("Failed to create pull request: " + response.getStatusCode());
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode().value() == 422 && e.getResponseBodyAsString().contains("A pull request already exists")) {
                log.info("Pull request already exists for branch {} in repo {}", branchName, repoName);
                throw new RuntimeException("A pull request already exists for branch " + branchName);
            }
            throw new RuntimeException("Failed to create pull request: " + e.getMessage());
        }
    }

    public void addSonarTokenSecret(String repoName) {
        if (sonarToken == null || sonarToken.isEmpty()) {
            log.warn("SONAR_TOKEN not configured, skipping secret creation for repo: {}", repoName);
            return;
        }
        addRepoSecret(repoName, "SONAR_TOKEN", sonarToken);
    }

    private void addRepoSecret(String repoName, String secretName, String secretValue) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github+json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        String keyUrl = "https://api.github.com/repos/" + ORG_OWNER + "/" + repoName + "/actions/secrets/public-key";
        HttpEntity<Void> keyRequest = new HttpEntity<>(headers);
        ResponseEntity<Map> keyResponse = restTemplate.exchange(keyUrl, HttpMethod.GET, keyRequest, Map.class);

        if (!keyResponse.getStatusCode().is2xxSuccessful() || keyResponse.getBody() == null) {
            throw new RuntimeException("Failed to get repo public key for: " + repoName);
        }

        String publicKeyBase64 = (String) keyResponse.getBody().get("key");
        String keyId = (String) keyResponse.getBody().get("key_id");

        byte[] publicKeyBytes = Base64.getDecoder().decode(publicKeyBase64);
        byte[] messageBytes = secretValue.getBytes(StandardCharsets.UTF_8);
        byte[] cipherText = new byte[SEAL_BYTES + messageBytes.length];

        SodiumJava sodium = new SodiumJava();
        int result = sodium.crypto_box_seal(cipherText, messageBytes, messageBytes.length, publicKeyBytes);
        if (result != 0) {
            throw new RuntimeException("Failed to encrypt secret value");
        }

        String encryptedValue = Base64.getEncoder().encodeToString(cipherText);

        String secretUrl = "https://api.github.com/repos/" + ORG_OWNER + "/" + repoName + "/actions/secrets/" + secretName;
        Map<String, String> body = Map.of(
                "encrypted_value", encryptedValue,
                "key_id", keyId
        );
        HttpEntity<Map<String, String>> secretRequest = new HttpEntity<>(body, headers);
        ResponseEntity<Void> response = restTemplate.exchange(secretUrl, HttpMethod.PUT, secretRequest, Void.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("Secret {} added to repo {}", secretName, repoName);
        } else {
            throw new RuntimeException("Failed to add secret to repo: " + response.getStatusCode());
        }
    }
}
