import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technology-chart',
  templateUrl: './technology-chart.component.html',
  styleUrls: ['./technology-chart.component.css']
})
export class TechnologyChartComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  participantCounts = [1444, 1289, 980, 877, 567]; // React, Node.js, Python, TypeScript, Docker

  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    this.chartData = {
      labels: ['React (28%)', 'Node.js (25%)', 'Python (19%)', 'TypeScript (17%)', 'Docker (11%)'],
      datasets: [{
        data: [28, 25, 19, 17, 11],
        backgroundColor: [
          '#02066F',  // React - Deep Blue (Primary)
          '#800020',  // Node.js - Burgundy (Accent)
          '#3B82F6',  // Python - Blue
          '#10B981',  // TypeScript - Green
          '#F59E0B'   // Docker - Orange
        ],
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverOffset: 10
      }]
    };

    const participantCounts = this.participantCounts;
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 30 },
      radius: '75%',
      plugins: {
        datalabels: { display: false },
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 14,
              family: "'Inter', sans-serif"
            },
            color: '#1F2937',
            generateLabels: (chart: any) => {
              const data = chart.data;
              return data.labels.map((label: string, i: number) => ({
                text: label,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
              }));
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (context: any) => {
              const count = participantCounts[context.dataIndex] ?? 0;
              return ` ${context.label?.replace(/ \(\d+%\)/, '')} : ${count}`;
            }
          }
        }
      }
    };
  }
}
