import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getApplicationStats } from '../../service/api';
import { IApplicationStats } from '@/interfaces/application';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApplicationStatistics: React.FC = () => {
  const [stats, setStats] = useState<IApplicationStats>({ pending: 0, accepted: 0, rejected: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getApplicationStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching application stats:', error);
      }
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: ['Pending', 'Accepted', 'Rejected'],
    datasets: [
      {
        label: 'Applications by Status',
        data: [stats.pending, stats.accepted, stats.rejected],
        backgroundColor: ['#ffbb33', '#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">Application Statistics</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default ApplicationStatistics;
