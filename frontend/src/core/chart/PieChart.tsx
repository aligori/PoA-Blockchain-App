import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, ChartDataLabels);

const PieChart = ({ yesVotes, noVotes }: {  yesVotes: number, noVotes: number }) => {
  const data = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        data: [yesVotes, noVotes],
        hoverBackgroundColor: ['#34d399', '#f87171'],
        backgroundColor: ['#059669', '#ef4444'],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'start',
        offset: 8,
        borderRadius: 4,
        font: {
          size: 22,
          weight: 'bold',
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value}`;
        },
      },
    },
  };

  return <div className="h-72">
    <Pie data={data} options={options} />
  </div>
};

export default PieChart;
