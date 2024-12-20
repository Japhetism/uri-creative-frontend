import { IFilters } from "@/interfaces/filter";

const Filters: React.FC<IFilters> = ({ filterStatus, sortOrder, setFilterStatus, setSortOrder }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        className="border p-2 rounded"
      >
        <option value="asc">Oldest</option>
        <option value="desc">Newest</option>
      </select>
    </div>
  );
};

export default Filters;
