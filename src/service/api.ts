import { IApplication, IApplicationStats } from '@/interfaces/application';
import axios from 'axios';

const BASE_URL = 'https://uri-creative-backend.onrender.com';

export const getApplications = async (params: Record<string, any> = {}): Promise<{ data: IApplication[], totalPages: number }> => {
  try {
    const response = await axios.get<{ data: IApplication[], totalPages: number }>(`${BASE_URL}/applications`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const getApplicationStats = async (): Promise<IApplicationStats> => {
  try {
    const response = await axios.get<IApplicationStats>(`${BASE_URL}/applications/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching application stats:', error);
    throw error;
  }
};
