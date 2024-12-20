import { SetStateAction } from "react";
import { IStatus } from "./status";

export interface IApplication extends IStatus {
  id: number;
  jobTitle: string;
  companyName: string;
  dateApplied: string;
}

export interface IApplicationStats {
  [x: string]: SetStateAction<IApplicationStats>;
}