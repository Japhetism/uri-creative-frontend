"use client"

import React, { useState, useEffect } from 'react';
import { getApplications } from '../../service/api';
import Filters from '../filter';
import StatusBadge from '../statusBadge';
import { IApplication } from '@/interfaces/application';
import ApplicationSkeletonLoader from '../loader/applicationLoader';
import Notification from '../notification';
import { filterApplications, sortApplications } from '@/utils/helper';

interface Pagination {
  page: number;
  totalPages: number;
}

type SortOrder = 'asc' | 'desc';

const ApplicationTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, totalPages: 1 });
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [filteredApplications, setFilteredApplications] = useState<IApplication[]>([]);
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

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const { data } = await getApplications();
        setApplications(data);
        setPagination({ page: 1, totalPages: Math.ceil(data.length / itemsPerPage) });
      } catch (error) {
        console.error('Error fetching applications:', error);
        showError();
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    console.log("sort order ", sortOrder)
    const filtered = filterApplications(applications, filterStatus, startDate, endDate);
    const sorted = sortApplications(filtered, sortOrder);
    setFilteredApplications(sorted);
    setPagination({ page: 1, totalPages: Math.ceil(sorted.length / itemsPerPage) });
  }, [filterStatus, applications, sortOrder, startDate, endDate]);

  const getPaginatedApplications = () => {
    const startIndex = (pagination.page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredApplications.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  if (isLoading) return <ApplicationSkeletonLoader />;

  return (
    <div className="overflow-x-auto">
      <Filters
        sortOrder={sortOrder}
        filterStatus={filterStatus}
        setSortOrder={setSortOrder}
        setFilterStatus={setFilterStatus}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left border-b cursor-pointer">Job Title</th>
            <th className="p-4 text-left border-b cursor-pointer">Company Name</th>
            <th className="p-4 text-left border-b cursor-pointer">Status</th>
            <th className="p-4 text-left border-b cursor-pointer">Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedApplications().map((application) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="p-4 border-b">{application.jobTitle}</td>
              <td className="p-4 border-b">{application.companyName}</td>
              <td className="p-4 border-b"><StatusBadge status={application.status} /></td>
              <td className="p-4 border-b">{new Date(application.dateApplied).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default ApplicationTable;
