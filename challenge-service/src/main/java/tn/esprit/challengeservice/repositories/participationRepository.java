package tn.esprit.challengeservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.challengeservice.entities.ChallengeParticipation;

import java.util.List;

public interface participationRepository extends JpaRepository<ChallengeParticipation, String> {

    boolean existsByChallengeIdChallengeAndUsernameGithub(String challengeId, String usernameGithub);

    List<ChallengeParticipation> findByChallengeIdChallenge(String challengeId);
}
