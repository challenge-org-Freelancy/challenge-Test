import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modern-challenges-grid',
  templateUrl: './modern-challenges-grid.component.html',
  styleUrls: ['./modern-challenges-grid.component.css']
})
export class ModernChallengesGridComponent implements OnChanges {
  @Input() challenges: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() duplicate = new EventEmitter<any>();
  @Output() viewParticipants = new EventEmitter<any>();

  searchQuery: string = '';
  filterCategory: string = 'all';
  filterStatus: string = 'all';
  filterDifficulty: string = 'all';
  viewMode: 'grid' | 'list' = 'grid';

  categories = ['Web Development', 'Mobile Development', 'Machine Learning', 'DevOps', 'Data Science', 'Blockchain'];
  statuses = ['Draft', 'Active', 'Closed'];
  difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  filteredChallenges: any[] = [];

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredChallenges = this.challenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           (challenge.description || '').toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.filterCategory === 'all' || challenge.category === this.filterCategory;
      const matchesStatus = this.filterStatus === 'all' || challenge.status === this.filterStatus;
      const matchesDifficulty = this.filterDifficulty === 'all' || challenge.difficulty === this.filterDifficulty;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onEdit(challenge: any): void {
    this.edit.emit(challenge);
  }

  onDuplicate(challenge: any): void {
    this.duplicate.emit(challenge);
  }

  onViewParticipants(challenge: any): void {
    this.viewParticipants.emit(challenge);
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
