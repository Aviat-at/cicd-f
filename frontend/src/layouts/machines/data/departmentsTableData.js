/* eslint-disable react/prop-types */


const departmentsTableData = {
  columns: [
    { name: "id",  align: "center" },
    { name: "name",  align: "left" },
    { name: "description",  align: "left" },
    { name: "created_at",  align: "left" },
    { name: "updated_at",  align: "left" },
    { name: "action", align: "center" },
  ],
  rows: [
    {
      id: 1,
      name: "New Department",
      description: "test",
      created_at: "2024-11-20 08:19:34.424775+00",
      updated_at: "2024-11-20 08:19:34.424775+00",
      action: "Edit",
    },
  ],
};

export default departmentsTableData;
