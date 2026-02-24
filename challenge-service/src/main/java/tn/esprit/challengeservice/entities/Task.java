package tn.esprit.challengeservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String idTask;
    private String description;
    private String title;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    private Date submittedAt;
    private Date deadline;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Challenge challenge;
}
