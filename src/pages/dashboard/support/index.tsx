import React from "react";
import { DashboardSupportLayout } from "../../../views/dashboard/support/_layout";
import { DashboardSupportView } from "../../../views/dashboard/support/_view";
import type { TCustomPage } from "../../_app";

const DashboardSupportPage: TCustomPage = () => {
  return (
    <>
      <DashboardSupportView />
    </>
  );
};

DashboardSupportPage.Layout = DashboardSupportLayout;

export default DashboardSupportPage;
