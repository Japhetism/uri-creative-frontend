const ApplicationSkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4 animate-pulse">
        <div className="w-24 h-6 bg-gray-200 rounded"></div>
        <div className="w-32 h-6 bg-gray-200 rounded"></div>
        <div className="w-16 h-6 bg-gray-200 rounded"></div>
        <div className="w-24 h-6 bg-gray-200 rounded"></div>
      </div>

      {[...Array(5)].map((_, idx) => (
        <div key={idx} className="flex space-x-4 animate-pulse">
        <div className="w-24 h-6 bg-gray-200 rounded"></div>
        <div className="w-32 h-6 bg-gray-200 rounded"></div>
        <div className="w-16 h-6 bg-gray-200 rounded"></div>
        <div className="w-24 h-6 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationSkeletonLoader;
  