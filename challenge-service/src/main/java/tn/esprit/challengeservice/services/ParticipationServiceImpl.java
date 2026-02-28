package tn.esprit.challengeservice.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.challengeservice.entities.*;
import tn.esprit.challengeservice.repositories.ChallengeRepository;
import tn.esprit.challengeservice.repositories.participationRepository;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipationServiceImpl implements iparticipationService {

    private final participationRepository participationRepository;
    private final ChallengeRepository challengeRepository;
    private final GitHubService gitHubService;

    @Override
    public ChallengeParticipation joinChallenge(String challengeId, String usernameGithub) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found with id: " + challengeId));

        if (!ChallengeStatus.ACTIVE.equals(challenge.getStatus())) {
            throw new RuntimeException("Challenge is not active");
        }

        boolean alreadyJoined = participationRepository
                .existsByChallengeIdChallengeAndUsernameGithub(challengeId, usernameGithub);
        if (alreadyJoined) {
            throw new RuntimeException("User " + usernameGithub + " has already joined this challenge");
        }

        String sanitizedTitle = challenge.getTitle()
                .replaceAll("[^a-zA-Z0-9-]", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
        String repoName = sanitizedTitle + "-" + usernameGithub;

        String repoUrl = gitHubService.createRepository(repoName);
        gitHubService.addCollaborator(repoName, usernameGithub);

        ChallengeParticipation participation = ChallengeParticipation.builder()
                .usernameGithub(usernameGithub)
                .repoUrl(repoUrl)
                .repoName(repoName)
                .forkCreatedAt(new Date())
                .status(ParticipationStatus.ACTIVE)
                .challenge(challenge)
                .build();

        return participationRepository.save(participation);
    }

    @Override
    public List<ChallengeParticipation> getAllParticipations() {
        return participationRepository.findAll();
    }

    @Override
    public ChallengeParticipation getParticipationById(String id) {
        return participationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participation not found with id: " + id));
    }

    @Override
    public List<ChallengeParticipation> getParticipationsByChallenge(String challengeId) {
        return participationRepository.findByChallengeIdChallenge(challengeId);
    }

    @Override
    public void deleteParticipation(String id) {
        if (!participationRepository.existsById(id)) {
            throw new RuntimeException("Participation not found with id: " + id);
        }
        participationRepository.deleteById(id);
    }

    @Override
    public boolean checkInvitationStatus(String participationId) {
        ChallengeParticipation participation = participationRepository.findById(participationId)
                .orElseThrow(() -> new RuntimeException("Participation not found with id: " + participationId));

        return gitHubService.isCollaboratorAccepted(participation.getRepoName(), participation.getUsernameGithub());
    }
}
