import { useRouter } from "next/router";
import { api } from "../../../../../utils/api";
import { DashboardMailer_DataView } from "../../../../../views/dashboard/mailer/_/data/_view/index";
import { DashboardMailer_DataLayout } from "../../../../../views/dashboard/mailer/_/data/_layout";

import type { TCustomPage } from "../../../../_app";

const DashboardMailer_DataPage: TCustomPage = () => {
  const {
    query: { name },
  } = useRouter();

  const { data: dataMailer } = api.mailer.getMailer.useQuery({
    name: name as string,
  });

  return dataMailer ? <DashboardMailer_DataView {...dataMailer} /> : null;
};

DashboardMailer_DataPage.Layout = DashboardMailer_DataLayout;

export default DashboardMailer_DataPage;
