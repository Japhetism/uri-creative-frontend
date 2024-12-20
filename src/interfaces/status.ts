export enum Status {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected'
}
  
export interface IStatus {
  status: Status;
}

export type SortOrder = 'asc' | 'desc';