// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Dummy Data for reportsBarChartData and gradientLineChartData
const reportsBarChartData = {
  chart: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: {
      label: "Tickets Resolved",
      data: [120, 150, 80, 130, 200, 160, 180, 210, 240],
    },
  },
  items: [
    {
      icon: { color: "primary", component: "business" },
      label: "Departments",
      progress: { content: "12", percentage: 60 },
    },
    {
      icon: { color: "info", component: "settings" },
      label: "Machines",
      progress: { content: "75", percentage: 90 },
    },
    {
      icon: { color: "warning", component: "work" },
      label: "Active Jobs",
      progress: { content: "45", percentage: 30 },
    },
    {
      icon: { color: "error", component: "support_agent" },
      label: "Tickets",
      progress: { content: "10", percentage: 50 },
    },
  ],
};


const gradientLineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  datasets: [
    {
      label: "Machines Performance",
      color: "info",
      data: [70, 80, 60, 100, 90, 110, 120, 115, 130],
    },
    {
      label: "Job Completion Rate",
      color: "dark",
      data: [30, 50, 40, 70, 60, 80, 85, 90, 95],
    },
  ],
};


function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
                title={{ text: "Machines" }}
                count="3"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "settings" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
                title={{ text: "Active Jobs" }}
                count="3"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "work" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "New Signups" }}
                count="+2,100"
                percentage={{ color: "error", text: "-5%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Sales" }}
                count="$1500"
                percentage={{ color: "success", text: "+12%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="Active Users"
                description={
                  <>
                    (<strong>+20%</strong>) compared to last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      12% growth{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        since last month
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
