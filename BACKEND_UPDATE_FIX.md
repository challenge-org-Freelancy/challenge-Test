# Backend Update Fix - Challenge Service

If only **start date**, **end date**, and **status** are being saved when updating a challenge, your backend's `updateChallenge` method is likely only copying those three fields.

## Fix your `ChallengeService.updateChallenge` method

Ensure you copy **all** fields from the incoming challenge to the existing entity before saving:

```java
public Challenge updateChallenge(String id, Challenge challenge) {
    Challenge existing = challengeRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Challenge not found: " + id));

    // Copy ALL fields from request to existing entity
    existing.setTitle(challenge.getTitle());
    existing.setDescription(challenge.getDescription());
    existing.setCategory(challenge.getCategory());
    existing.setTechnology(challenge.getTechnology());
    existing.setDifficulty(challenge.getDifficulty());
    existing.setStatus(challenge.getStatus());
    existing.setPoints(challenge.getPoints());
    existing.setMaxParticipants(challenge.getMaxParticipants());
    existing.setGithubUrl(challenge.getGithubUrl());
    existing.setImage(challenge.getImage());
    existing.setStartDate(challenge.getStartDate());
    existing.setEndDate(challenge.getEndDate());

    return challengeRepository.save(existing);
}
```

## Frontend payload

The frontend now sends this JSON on PUT `/challenges/{id}`:

```json
{
  "idChallenge": "uuid-here",
  "title": "...",
  "description": "...",
  "category": "...",
  "technology": "...",
  "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED|EXPERT",
  "status": "DRAFT|ACTIVE|COMPLETED",
  "maxParticipants": 100,
  "points": 100,
  "githubUrl": "https://...",
  "startDate": "2026-02-01T00:00:00.000Z",
  "endDate": "2026-03-01T00:00:00.000Z",
  "image": "data:image/jpeg;base64,... or null"
}
```

## Verify in browser DevTools

1. Open DevTools (F12) → Network tab
2. Edit a challenge and click Save
3. Find the PUT request to `/challenges/{id}`
4. Check the Request Payload — all fields should be present
