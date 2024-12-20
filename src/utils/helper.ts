import { IApplication } from "@/interfaces/application";
import { SortOrder } from "@/interfaces/status";

export const sortApplications = (applications: IApplication[], sortOrder: SortOrder) => {
  return applications.sort((a, b) => {
    const dateA = a.dateApplied;
    const dateB = b.dateApplied;

    if (sortOrder === 'asc') {
      return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    } else {
      return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
    }
  });
}

export const filterApplications = (
  applications: IApplication[],
  filterStatus: string,
  startDate: string | null,
  endDate: string | null
): IApplication[] => {
  return applications.filter((application) => {
    const matchesStatus = filterStatus ? application.status === filterStatus : true;

    const applicationDate = new Date(application.dateApplied);
    const matchesStartDate = startDate ? applicationDate >= new Date(startDate) : true;
    const matchesEndDate = endDate ? applicationDate <= new Date(endDate) : true;

    return matchesStatus && matchesStartDate && matchesEndDate;
  });
};

