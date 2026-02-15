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
          data: [240, 320, 390, 420, 490, 520],
          borderColor: '#02066F',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 5,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#02066F',
          pointBorderWidth: 2
        },
        {
          label: 'Active',
          data: [420, 470, 520, 490, 570, 610],
          borderColor: '#800020',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 5,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#800020',
          pointBorderWidth: 2
        }
      ]
    };

    this.completionTrendsOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 10, right: 10, bottom: 0, left: 0 } },
      plugins: {
        datalabels: { display: false },
        tooltip: {
          backgroundColor: '#ffffff',
          titleColor: '#111827',
          bodyColor: '#374151',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: 16,
          cornerRadius: 8,
          displayColors: true,
          titleFont: { size: 15 },
          bodyFont: { size: 14 },
          callbacks: {
            title: (items: any[]) => items[0]?.label ?? '',
            label: (ctx: any) => ` ${ctx.dataset.label} : ${ctx.raw}`
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          align: 'center',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: { size: 12 },
            color: '#374151',
            generateLabels: (chart: any) => {
              const datasets = chart.data.datasets;
              return datasets.map((ds: any, i: number) => ({
                text: ds.label,
                fillStyle: ds.borderColor,
                strokeStyle: ds.borderColor,
                lineWidth: 2,
                fontColor: ds.borderColor,
                hidden: false,
                index: i
              }));
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 800,
          ticks: {
            stepSize: 200,
            color: '#6b7280',
            font: { size: 12 }
          },
          grid: {
            color: 'rgba(229, 231, 235, 0.9)',
            borderDash: [3, 3]
          },
          border: { display: false }
        },
        x: {
          ticks: {
            color: '#6b7280',
            font: { size: 12 }
          },
          grid: {
            color: 'rgba(229, 231, 235, 0.9)',
            borderDash: [3, 3]
          },
          border: { display: false }
        }
      }
    };
  }
}
