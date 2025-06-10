import DashboardLayout from "@/Components/Dashboard/DashboardLayout/DashboardLayout";


const dashboardLayout = ({ children }) => {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
};

export default dashboardLayout;