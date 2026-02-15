import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deadline-analytics',
  templateUrl: './deadline-analytics.component.html',
  styleUrls: ['./deadline-analytics.component.css']
})
export class DeadlineAnalyticsComponent implements OnInit {
  completionRateData: any;
  completionRateOptions: any;

  onTimeStats = {
    onTime: 68,
    late: 22,
    pending: 10
  };

  ngOnInit(): void {
    this.initializeCharts();
  }

  private initializeCharts(): void {
    // Completion Rate Chart
    this.completionRateData = {
      labels: ['On Time', 'Late', 'Pending'],
      datasets: [{
        data: [this.onTimeStats.onTime, this.onTimeStats.late, this.onTimeStats.pending],
        backgroundColor: [
          '#10B981', // Green
          '#EF4444', // Red
          '#F59E0B'  // Yellow
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };

    this.completionRateOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    };
  }

  get avgCompletionTime(): string {
    return '4.2 days';
  }

  get upcomingDeadlines(): number {
    return 12;
  }
}
