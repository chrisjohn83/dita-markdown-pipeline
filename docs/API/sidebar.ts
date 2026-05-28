import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/connected-car-vehicle-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "api/list-vehicles",
          label: "List Vehicles",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
