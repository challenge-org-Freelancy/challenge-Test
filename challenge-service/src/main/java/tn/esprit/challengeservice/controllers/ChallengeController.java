package tn.esprit.challengeservice.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.challengeservice.entities.Challenge;
import tn.esprit.challengeservice.services.ichallengeService;

import java.util.List;

@RestController
@RequestMapping("/challenges")
@CrossOrigin(origins = "http://localhost:4200") // allow only Angular dev server
@RequiredArgsConstructor
public class ChallengeController {

    private final ichallengeService challengeService;

    @PostMapping
    public Challenge addChallenge(@RequestBody Challenge challenge) {
        return challengeService.addChallenge(challenge);
    }

    @GetMapping
    public List<Challenge> getAllChallenges() {
        return challengeService.getAllChallenges();
    }

    @GetMapping("/{id}")
    public Challenge getChallengeById(@PathVariable String id) {
        return challengeService.getChallengeById(id);
    }

    @PutMapping("/{id}")
    public Challenge updateChallenge(@PathVariable String id,
                                     @RequestBody Challenge challenge) {
        return challengeService.updateChallenge(id, challenge);
    }

    @DeleteMapping("/{id}")
    public void deleteChallenge(@PathVariable String id) {
        challengeService.deleteChallenge(id);
    }
}