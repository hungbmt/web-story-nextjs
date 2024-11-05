import "./dashboard.css";
import AdminLayout from "@/app/layout/adminLayout/adminLayout";
import DashBoard from "./dashboard";
const dashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard-wraper">
        <DashBoard />
      </div>
    </AdminLayout>
  );
};

export default dashboard;
