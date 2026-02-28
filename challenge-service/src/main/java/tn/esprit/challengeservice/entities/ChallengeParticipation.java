package tn.esprit.challengeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String usernameGithub;
    private String repoUrl;
    private String repoName;
    private Date forkCreatedAt;

    @Enumerated(EnumType.STRING)
    private ParticipationStatus status;

    @JsonIgnore
    @ManyToOne
    private Challenge challenge;
}
