package tn.esprit.challengeservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.challengeservice.entities.ChallengeParticipation;
import tn.esprit.challengeservice.services.iparticipationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/participations")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ParticipationController {

    private final iparticipationService participationService;

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
}
