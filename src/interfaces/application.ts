import { IStatus } from "./status";

export interface IApplication extends IStatus {
  id: number;
  jobTitle: string;
  companyName: string;
  dateApplied: string;
}

export interface IApplicationStats {
  pending: number;
  accepted: number;
  rejected: number;
}