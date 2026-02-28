package tn.esprit.challengeservice.services;

import tn.esprit.challengeservice.entities.ChallengeParticipation;

import java.util.List;

public interface iparticipationService {
    ChallengeParticipation joinChallenge(String challengeId, String usernameGithub);
    List<ChallengeParticipation> getAllParticipations();
    ChallengeParticipation getParticipationById(String id);
    List<ChallengeParticipation> getParticipationsByChallenge(String challengeId);
    void deleteParticipation(String id);
    boolean checkInvitationStatus(String participationId);
}
