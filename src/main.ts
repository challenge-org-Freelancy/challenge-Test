import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { AppModule } from './app/app.module';

Chart.register(ChartDataLabels);

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
