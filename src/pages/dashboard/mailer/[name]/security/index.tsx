import { DashboardMailer_SecurityView } from "../../../../../views/dashboard/mailer/_/security/_view/index";
import { DashboardMailer_SecurityLayout } from "../../../../../views/dashboard/mailer/_/security/_layout";

import type { TCustomPage } from "../../../../_app";

const DashboardMailer_SecurityPage: TCustomPage = () => {
  return <DashboardMailer_SecurityView />;
};

DashboardMailer_SecurityPage.Layout = DashboardMailer_SecurityLayout;

export default DashboardMailer_SecurityPage;
