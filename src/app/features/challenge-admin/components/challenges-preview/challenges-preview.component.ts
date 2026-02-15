import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-challenges-preview',
  templateUrl: './challenges-preview.component.html',
  styleUrls: ['./challenges-preview.component.css']
})
export class ChallengesPreviewComponent implements OnChanges {
  @Input() challenges: any[] = [];
  @Output() viewAll = new EventEmitter<void>();

  recentChallenges: any[] = [];
  stats = {
    total: 0,
    active: 0,
    totalParticipants: 0,
    avgCompletion: 0
  };

  ngOnChanges(): void {
    this.calculateStats();
    this.filterRecentChallenges();
  }

  private filterRecentChallenges(): void {
    this.recentChallenges = this.challenges
      .filter(c => c.status === 'Active')
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 6);
  }

  private calculateStats(): void {
    const total = this.challenges.length;
    const active = this.challenges.filter(c => c.status === 'Active').length;
    const totalParticipants = this.challenges.reduce((sum, c) => sum + (c.participants || 0), 0);
    const avgCompletion = total > 0 
      ? Math.round(this.challenges.reduce((sum, c) => sum + (c.progress ?? c.completionRate ?? 0), 0) / total)
      : 0;

    this.stats = { total, active, totalParticipants, avgCompletion };
  }

  onViewAll(): void {
    this.viewAll.emit();
  }

  onChallengeClick(challenge: any): void {
    this.viewAll.emit();
  }

  getStatusColor(status?: string): string {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Draft': return 'bg-gray-400';
      case 'Closed': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  }

  getDifficultyColor(difficulty?: string): string {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Expert': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }

  trackByChallenge(index: number, challenge: any): string {
    return challenge.id;
  }
}
