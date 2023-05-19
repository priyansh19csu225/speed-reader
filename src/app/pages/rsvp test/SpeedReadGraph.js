import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const options = {
  plugins: {
    legend: {
      display: false,
      position: 'bottom',
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'WPM',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Comprehensions Attempted',
      },
    },
  },
};

const ReportGraph = ({ results }) => {
  const chartData = {
    labels: results.map((result) => result.comprehension_name),
    datasets: [
      {
        label: 'WPM',
        data: results.map((result) => result.wpm),
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
      },
      {
        label: 'Correct Answers',
        data: results.map((result) => result.correct_answers),
        backgroundColor: 'rgba(75,192,192,0.4)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
      },
      {
        label: 'Correct Answers Percentage',
        data: results.map((result) => {
          return (result.correct_answers / result.total_questions) * 100;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
      },
    ],
  };

  const chartData2 = {
    labels: results.map((result, index) => index + 1),
    datasets: [
      {
        label: 'WPM',
        data: results.map((result) => result.wpm),
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Customize the bar color
      },
    ],
  };
  //
  return (
    <div>
      <Bar data={chartData} options={options} height="50px" width="100px" />
      {/* <Bar data={chartData2} options={options} height="100px" width="300px" /> */}
      {/* <Line data={chartData} options={options} height="100px" width="300px" /> */}
      <Line data={chartData2} options={options} height="50px" width="100px" />
    </div>
  );
};

export default ReportGraph;
