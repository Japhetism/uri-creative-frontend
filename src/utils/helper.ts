import { IApplication } from "@/interfaces/application";
import { SortOrder } from "@/interfaces/status";

export const filterApplications = (applications: IApplication[], filterStatus: string): IApplication[] => {
  if (filterStatus !== '') {
    return applications.filter(
    (application) => application?.status?.toLowerCase() === filterStatus?.toLowerCase()
    );
  }
  return applications;
};

export const sortApplications = (applications: IApplication[], sortKey: keyof IApplication, sortOrder: SortOrder): IApplication[] => {
  return applications.sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    if (valueA instanceof Date && valueB instanceof Date) {
      return sortOrder === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
    }
    return sortOrder === 'asc' ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
  });
};
