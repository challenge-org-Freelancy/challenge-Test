import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant-analytics',
  templateUrl: './participant-analytics.component.html',
  styleUrls: ['./participant-analytics.component.css']
})
export class ParticipantAnalyticsComponent implements OnInit {
  // Popular Challenge Categories - Bar chart
  categoryData: any;
  categoryOptions: any;

  // Completion Trends - Line chart
  completionTrendsData: any;
  completionTrendsOptions: any;

  ngOnInit(): void {
    this.initializeCharts();
  }

  private initializeCharts(): void {
    // Popular Challenge Categories (Frontend, Backend, Full Stack, AI/ML, DevOps, Mobile)
    this.categoryData = {
      labels: ['Frontend', 'Backend', 'Full Stack', 'AI/ML', 'DevOps', 'Mobile'],
      datasets: [{
        label: 'Participants',
        data: [1260, 980, 650, 280, 165, 155],
        backgroundColor: '#02066F',
        borderRadius: 8
      }]
    };

    this.categoryOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1400,
          grid: { color: 'rgba(229, 231, 235, 1)' }
        },
        x: {
          grid: { display: false }
        }
      }
    };

    // Completion Trends (Last 6 Months) - Sep, Oct, Nov, Dec, Jan, Feb
    this.completionTrendsData = {
      labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
      datasets: [
        {
          label: 'Completed',
          data: [280, 320, 380, 420, 460, 520],
          borderColor: '#02066F',
          backgroundColor: 'rgba(2, 6, 111, 0.1)',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Active',
          data: [450, 480, 520, 520, 480, 420],
          borderColor: '#800020',
          backgroundColor: 'rgba(128, 0, 32, 0.1)',
          fill: false,
          tension: 0.4
        }
      ]
    };

    this.completionTrendsOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 800,
          grid: { color: 'rgba(229, 231, 235, 1)' }
        },
        x: {
          grid: { display: false }
        }
      }
    };
  }
}
