import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deadline-analytics',
  templateUrl: './deadline-analytics.component.html',
  styleUrls: ['./deadline-analytics.component.css']
})
export class DeadlineAnalyticsComponent implements OnInit {
  deadlinePieData: any;
  deadlinePieOptions: any;
  taskBarData: any;
  taskBarOptions: any;

  ngOnInit(): void {
    this.initializeCharts();
  }

  private initializeCharts(): void {
    // Overall Deadline Performance - Pie (On Time 67%, Late 23%, Missed 10%) - same design as Technology Popularity
    const pieColors = ['#02066F', '#800020', '#d4183d'];
    this.deadlinePieData = {
      labels: ['On Time (67%)', 'Late (23%)', 'Missed (10%)'],
      datasets: [{
        data: [67, 23, 10],
        backgroundColor: pieColors,
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverOffset: 10
      }]
    };

    this.deadlinePieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 30 },
      radius: '75%',
      plugins: {
        datalabels: { display: false },
        legend: {
          position: 'left',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            font: { size: 14, family: "'Inter', sans-serif" },
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
            label: (ctx: any) => ` ${ctx.label?.replace(/ \(\d+%\)/, '')} : ${ctx.raw}%`
          }
        }
      }
    };

    // Task-by-Task Performance - Horizontal Stacked Bar
    const taskLabels = [
      'Setup WebSocket Conn...',
      'Implement User Authe...',
      'Create Message UI Co...',
      'Design Database Sche...',
      'Implement Search Fun...'
    ];
    const onTimeData = [78, 65, 71, 88, 52];
    const lateData = [22, 35, 29, 12, 48];

    this.taskBarData = {
      labels: taskLabels,
      datasets: [
        {
          label: 'On Time %',
          data: onTimeData,
          backgroundColor: '#02066F'
        },
        {
          label: 'Late %',
          data: lateData,
          backgroundColor: '#800020',
          borderRadius: { topRight: 8, bottomRight: 8 }
        }
      ]
    };

    this.taskBarOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: { display: false },
        legend: { display: false }
      },
      scales: {
        x: {
          stacked: true,
          max: 100,
          ticks: { stepSize: 25 },
          grid: { color: '#e5e7eb', borderDash: [3, 3] },
          border: { display: false }
        },
        y: {
          stacked: true,
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#6b7280', font: { size: 11 } }
        }
      }
    };
  }
}
