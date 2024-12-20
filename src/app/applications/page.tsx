import ApplicationStatistics from "@/components/applicationStat";
import ApplicationTable from "@/components/applicationTable";
import Layout from "@/components/layout";

const Application: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 w-full">
        <div className="w-full sm:w-[70%] mb-4 sm:mb-0">
          <ApplicationTable />
        </div>
        
        <div className="w-full sm:w-[30%]">
          <ApplicationStatistics />
        </div>
      </div>
    </Layout>
  );
};

export default Application;
