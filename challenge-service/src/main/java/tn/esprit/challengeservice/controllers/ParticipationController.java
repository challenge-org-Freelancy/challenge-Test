package tn.esprit.challengeservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.challengeservice.entities.ChallengeParticipation;
import tn.esprit.challengeservice.entities.SonarCloudResult;
import tn.esprit.challengeservice.services.GitHubService;
import tn.esprit.challengeservice.services.iparticipationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/participations")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ParticipationController {

    private final iparticipationService participationService;
    private final GitHubService gitHubService;

    @PostMapping("/{challengeId}/join")
    public ChallengeParticipation joinChallenge(
            @PathVariable String challengeId,
            @RequestParam String usernameGithub) {
        return participationService.joinChallenge(challengeId, usernameGithub);
    }

    @GetMapping
    public List<ChallengeParticipation> getAllParticipations() {
        return participationService.getAllParticipations();
    }

    @GetMapping("/{id}")
    public ChallengeParticipation getParticipationById(@PathVariable String id) {
        return participationService.getParticipationById(id);
    }

    @GetMapping("/challenge/{challengeId}")
    public List<ChallengeParticipation> getParticipationsByChallenge(@PathVariable String challengeId) {
        return participationService.getParticipationsByChallenge(challengeId);
    }

    @DeleteMapping("/{id}")
    public void deleteParticipation(@PathVariable String id) {
        participationService.deleteParticipation(id);
    }

    @GetMapping("/{id}/invitation-status")
    public Map<String, Object> checkInvitationStatus(@PathVariable String id) {
        boolean accepted = participationService.checkInvitationStatus(id);
        return Map.of(
                "participationId", id,
                "accepted", accepted,
                "message", accepted ? "Invitation accepted" : "Invitation still pending"
        );
    }

    @PostMapping("/{participationId}/submit")
    public Map<String, Object> submitChallenge(
            @PathVariable String participationId,
            @RequestParam String branchName) {
        String prUrl = participationService.submitChallenge(participationId, branchName);
        return Map.of(
                "participationId", participationId,
                "pullRequestUrl", prUrl,
                "message", "Challenge submitted successfully. SonarCloud analysis will run automatically."
        );
    }

    @GetMapping("/{participationId}/sonar-results")
    public SonarCloudResult getSonarResults(@PathVariable String participationId) {
        return participationService.fetchSonarResults(participationId);
    }

    @GetMapping("/github/user-exists/{usernameGithub}")
    public Map<String, Object> checkGitHubUserExists(@PathVariable String usernameGithub) {
        boolean exists = gitHubService.doesUserExist(usernameGithub);
        return Map.of(
                "usernameGithub", usernameGithub,
                "exists", exists
        );
    }
}
