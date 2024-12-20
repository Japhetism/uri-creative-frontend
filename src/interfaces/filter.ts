import { SortOrder } from "./status"

export interface IFilters {
  filterStatus: string
  sortOrder: SortOrder
  setFilterStatus: (filter: string) => void
  setSortOrder: (order: SortOrder) => void
}