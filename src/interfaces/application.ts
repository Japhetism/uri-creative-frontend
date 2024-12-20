import { IStatus } from "./status";

export interface IApplication extends IStatus {
  id: number;
  jobTitle: string;
  companyName: string;
  dateApplied: string;
}

export interface IApplicationStatusCount {
  pending: number;
  accepted: number;
  rejected: number;
}

interface MonthCount {
  [key: string]: number; 
};

export interface IApplicationStatistics {
  total: number;
  countByStatus: IApplicationStatusCount;
  countByMonth: MonthCount;
};
