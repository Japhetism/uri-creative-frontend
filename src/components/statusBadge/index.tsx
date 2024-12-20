import { IStatus } from '@/interfaces/status';
import React from 'react';

const StatusBadge: React.FC<IStatus> = ({ status }) => {
  let statusText = '';
  let statusColor = '';
  let statusTextColor = '';

  switch (status) {
    case 'accepted':
      statusText = 'Accepted';
      statusColor = 'bg-green-100';
      statusTextColor = 'text-green-500'
      break;
    case 'pending':
      statusText = 'Pending';
      statusColor = 'bg-yellow-100';
      statusTextColor = 'text-yellow-500'
      break;
    case 'rejected':
      statusText = 'Rejected';
      statusColor = 'bg-red-100';
      statusTextColor = 'text-red-500'
      break;
  }

  return (
    <div className={`${statusTextColor} py-1 rounded-full ${statusColor} text-center`}>
      {statusText}
    </div>
  );
};

export default StatusBadge;
