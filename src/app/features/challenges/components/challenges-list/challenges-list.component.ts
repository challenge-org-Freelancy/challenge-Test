import { Component, OnInit } from '@angular/core';
import { Challenge } from '@core/models/challenge.model';
import { ChallengesDataService } from '../../services/challenges-data.service';
import { ChallengeFilters } from '../challenge-filters/challenge-filters.component';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.css','./../../challenges.styles.css']
})
export class ChallengesListComponent implements OnInit {
  allChallenges: Challenge[] = [];
  filteredChallenges: Challenge[] = [];
  displayedChallenges: Challenge[] = [];
  
  searchTerm = '';
  currentFilters: ChallengeFilters = {
    category: 'All Categories',
    difficulty: 'All Levels',
    pointRange: { min: 0, max: Infinity },
    sortBy: 'popular'
  };

  loading = false;
  viewMode: 'grid' | 'list' = 'grid';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;

  // Make Math available in template
  Math = Math;
  Infinity = Infinity;

  constructor(private challengesDataService: ChallengesDataService) {}

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.allChallenges = this.challengesDataService.getMockChallenges();
      this.applyFiltersAndSearch();
      this.loading = false;
    }, 300);
  }

  onSearchChanged(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase();
    this.currentPage = 1;
    this.applyFiltersAndSearch();
  }

  onFiltersChanged(filters: ChallengeFilters): void {
    this.currentFilters = filters;
    this.currentPage = 1;
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch(): void {
    let result = [...this.allChallenges];

    // Apply search
    if (this.searchTerm) {
      result = result.filter(challenge =>
        challenge.title.toLowerCase().includes(this.searchTerm) ||
        challenge.description.toLowerCase().includes(this.searchTerm) ||
        challenge.category.toLowerCase().includes(this.searchTerm)
      );
    }

    // Apply category filter
    if (this.currentFilters.category !== 'All Categories') {
      result = result.filter(c => c.category === this.currentFilters.category);
    }

    // Apply difficulty filter
    if (this.currentFilters.difficulty !== 'All Levels') {
      result = result.filter(c => c.difficulty === this.currentFilters.difficulty);
    }

    // Apply points filter
    if (this.currentFilters.pointRange.min > 0 || this.currentFilters.pointRange.max < Infinity) {
      result = result.filter(c =>
        c.points >= this.currentFilters.pointRange.min &&
        c.points <= this.currentFilters.pointRange.max
      );
    }

    // Apply sorting
    result = this.sortChallenges(result, this.currentFilters.sortBy);

    this.filteredChallenges = result;
    this.totalPages = Math.ceil(result.length / this.itemsPerPage);
    this.updateDisplayedChallenges();
  }

  sortChallenges(challenges: Challenge[], sortBy: string): Challenge[] {
    const sorted = [...challenges];
    
    switch (sortBy) {
      case 'popular':
        return sorted.sort((a, b) => b.participants - a.participants);
      case 'points-high':
        return sorted.sort((a, b) => b.points - a.points);
      case 'points-low':
        return sorted.sort((a, b) => a.points - b.points);
      case 'newest':
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'oldest':
        return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      default:
        return sorted;
    }
  }

  updateDisplayedChallenges(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedChallenges = this.filteredChallenges.slice(startIndex, endIndex);
  }

  onJoinChallenge(challengeId: string): void {
    console.log('Joining challenge:', challengeId);
    // Implement join logic here
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedChallenges();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get visiblePages(): number[] {
    const maxVisible = 5;
    const pages = this.pages;
    
    if (pages.length <= maxVisible) {
      return pages;
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(this.currentPage - half, 1);
    let end = Math.min(start + maxVisible - 1, this.totalPages);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    return pages.slice(start - 1, end);
  }
}