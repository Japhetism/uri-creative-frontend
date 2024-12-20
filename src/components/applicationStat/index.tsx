"use client"

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Notification from '../notification';
import { getApplicationStats } from '../../service/api';
import { IApplicationStatusCount } from '@/interfaces/application';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ApplicationStatistics: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<IApplicationStatusCount>({ pending: 0, accepted: 0, rejected: 0 });
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showError = () => {
    setNotification({
      message: 'An error occurred while retrieving the applications.',
      type: 'error',
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const { data } = await getApplicationStats();
        setStats(data?.countByStatus);
      } catch (error) {
        console.error('Error fetching application stats:', error);
        showError();
      }
      finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="w-full h-72 bg-gray-200 animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-2 w-2/4"></div> 
        <div className="h-64 bg-gray-300 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <>
      <div className="w-full">
        <h3 className="text-xl font-bold mb-4">Application Statistics</h3>
        <Bar data={chartData} />
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </>
  );
};

export default ApplicationStatistics;
