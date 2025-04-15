// @mui material components
import Tooltip from "@mui/material/Tooltip";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images (You can use appropriate images for your system or leave as placeholders)
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "project", align: "left" },
      { name: "members", align: "left" },
      { name: "budget", align: "center" },
      { name: "completion", align: "center" },
    ],

    rows: [
      {
        project: [ "Operations Team","Machine Maintenance"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "John Doe"],
              [team2, "Jane Smith"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $12,000
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={60} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        project: ["IT Support Team","Server Upgrade"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team3, "Robert Brown"],
              [team4, "Emily White"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $8,500
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={40} color="warning" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        project: ["Support Team","Customer Support Ticketing System"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team2, "Jessica Doe"],
              [team1, "Ryan Tompson"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $5,000
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        project: ["Tech Team","Ticket System Overhaul"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team4, "John Doe"],
              [team3, "Robert Brown"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $10,000
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={80} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        project: ["HR Team","New Employee Onboarding"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team2, "Jessica Doe"],
              [team1, "Ryan Tompson"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $2,500
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={20} color="error" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        project: ["Marketing Team" ,"Website Redesign"],
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team3, "Emily White"],
              [team1, "Ryan Tompson"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $15,000
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={50} color="warning" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
    ],
  };
}
