/*
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */

import { Component } from '@angular/core';

@Component({
  selector: 'angular-apollo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public labelNames = [
    { label : '7:00 - 9:00' },
    { label : '9:00 - 11:00' },
    { label : '11:00 - 13:00' },
    { label : '13:00 - 15:00' },
    { label : '15:00 - 17:00' },
    { label : '17:00 - 19:00' },
    { label : '19:00 - 21:00' }
  ];
  public activeSession = {
    labels: ['< 1min', '1min - 5min', '5min - 10min', '10min - 15min', '15min - 20min', '20min - 25min', '25min +'],
    datasets: [
      {
        label: 'Morning',
        fillColor: 'rgba(100, 161, 200, 0.87)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(62, 33, 85, 0.86)',
        pointStrokeColor: '#fff',
        pointHighlightFill: 'rgba(24, 100, 176, 0.71)',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: 'Day Time',
        fillColor: 'rgba(222, 146, 46, 0.9)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(62, 33, 85, 0.86)',
        pointStrokeColor: '#fff',
        pointHighlightFill: 'rgba(148, 15, 15, 0.71)',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 96, 27, 100]
      },
      {
        label: 'Evening',
        fillColor: 'rgba(197, 53, 53, 0.86)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(62, 33, 85, 0.86)',
        pointStrokeColor: '#fff',
        pointHighlightFill: 'rgba(222, 179, 62, 0.71)',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [86, 3, 47, 19, 9, 27, 4]
      }
    ]
  };

  public chartOptions = {
    responsive: true
  };

  public chartData = [
    { data: [9, 3, 9, 45, 5, 9, 7], label: 'Active Users' }
  ];

  public chartLabels = [
    '7:00 - 9:00',
    '9:00 - 11:00',
    '11:00 - 13:00',
    '15:00 - 17:00',
    '17:00 - 19:00',
    '19:00 - 21:00'
  ];

  public onChartClick(event) {
    console.log(event);
  }

  public updateData() {
    console.log('updateData', this);
  }
}
