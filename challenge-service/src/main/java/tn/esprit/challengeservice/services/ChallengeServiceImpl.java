package tn.esprit.challengeservice.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.challengeservice.entities.*;
import tn.esprit.challengeservice.repositories.ChallengeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ichallengeService {

    private final ChallengeRepository challengeRepository;

    @Override
    public Challenge addChallenge(Challenge challenge) {
        if (challenge.getTasks() != null) {
            challenge.getTasks().forEach(task -> task.setChallenge(challenge));
        }
        return challengeRepository.save(challenge);
    }

    @Override
    public Challenge getChallengeById(String id) {
        return challengeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Challenge not found with id: " + id));
    }

    @Override
    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }

    @Override
    public Challenge updateChallenge(String id, Challenge challenge) {
        Challenge existingChallenge = challengeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Challenge not found with id: " + id));
        existingChallenge.setTitle(challenge.getTitle());
        existingChallenge.setCategory(challenge.getCategory());
        existingChallenge.setTechnology(challenge.getTechnology());
        existingChallenge.setDifficulty(challenge.getDifficulty());
        existingChallenge.setDescription(challenge.getDescription());
        existingChallenge.setPoints(challenge.getPoints());
        existingChallenge.setMaxParticipants(challenge.getMaxParticipants());
        existingChallenge.setGithubUrl(challenge.getGithubUrl());
        existingChallenge.setImage(challenge.getImage());
        existingChallenge.setStartDate(challenge.getStartDate());
        existingChallenge.setEndDate(challenge.getEndDate());
        existingChallenge.setStatus(challenge.getStatus());
        return challengeRepository.save(existingChallenge);
    }

    @Override
    public void deleteChallenge(String id) {
        if (!challengeRepository.existsById(id)) {
            throw new RuntimeException("Challenge not found with id: " + id);
        }
        challengeRepository.deleteById(id);
    }
}
