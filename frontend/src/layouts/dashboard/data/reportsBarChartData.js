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

export default reportsBarChartData;
