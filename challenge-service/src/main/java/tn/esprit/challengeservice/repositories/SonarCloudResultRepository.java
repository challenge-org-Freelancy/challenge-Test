package tn.esprit.challengeservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.challengeservice.entities.SonarCloudResult;

import java.util.Optional;

public interface SonarCloudResultRepository extends JpaRepository<SonarCloudResult, String> {
    Optional<SonarCloudResult> findByParticipationId(String participationId);
}
