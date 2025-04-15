import { useState } from "react";

// @mui/material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function PlatformSettings() {
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [jobUpdates, setJobUpdates] = useState(false);
  const [departmentChanges, setDepartmentChanges] = useState(true);
  const [newMachineLaunches, setNewMachineLaunches] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <Card>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Platform Settings
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1.5} pb={2} px={2} lineHeight={1.25}>
        <SoftTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          Notifications
        </SoftTypography>
        <SoftBox display="flex" alignItems="center" mt={2}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            Maintenance Alerts
          </SoftTypography>
          <Switch checked={maintenanceAlerts} onChange={() => setMaintenanceAlerts(!maintenanceAlerts)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center" mt={2}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            Job Updates
          </SoftTypography>
          <Switch checked={jobUpdates} onChange={() => setJobUpdates(!jobUpdates)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center" mt={2}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            Department Changes
          </SoftTypography>
          <Switch checked={departmentChanges} onChange={() => setDepartmentChanges(!departmentChanges)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center" mt={2}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            New Machine Launches
          </SoftTypography>
          <Switch checked={newMachineLaunches} onChange={() => setNewMachineLaunches(!newMachineLaunches)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center" mt={2}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            Product Updates
          </SoftTypography>
          <Switch checked={productUpdates} onChange={() => setProductUpdates(!productUpdates)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center" mt={2}>
          <SoftTypography variant="button" fontWeight="regular" color="text">
            Newsletter
          </SoftTypography>
          <Switch checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;
