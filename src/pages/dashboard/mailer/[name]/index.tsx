import { DashboardMailer_IndexLayout } from "../../../../views/dashboard/mailer/_/index/_layout";
import { DashboardMailer_IndexView } from "../../../../views/dashboard/mailer/_/index/_view";
import type { TCustomPage } from "../../../_app";

const DashboardMailer_IndexPage: TCustomPage = () => {
  return (
    <>
      <DashboardMailer_IndexView />
    </>
  );
};

DashboardMailer_IndexPage.Layout = DashboardMailer_IndexLayout;

export default DashboardMailer_IndexPage;
