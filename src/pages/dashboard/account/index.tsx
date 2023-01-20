import React from "react";
import { DashboardAccountLayout } from "../../../views/dashboard/account/_layout";
import { DashboardAccountView } from "../../../views/dashboard/account/_view";
import type { TCustomPage } from "../../_app";

const DashboardAccountPage: TCustomPage = () => {
  return (
    <>
      <DashboardAccountView />
    </>
  );
};

DashboardAccountPage.Layout = DashboardAccountLayout;

export default DashboardAccountPage;
