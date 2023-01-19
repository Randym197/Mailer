import { useRouter } from "next/router";
import { api } from "../../../../utils/api";
import { DashboardLayout } from "../../../../views/dashboard/Layout";
import { MailerView } from "../../../../views/dashboard/Mailer";
import type { TCustomPage } from "../../../_app";

const MailerPage: TCustomPage = () => {
  const {
    query: { name },
  } = useRouter();
  const { data: dataMailer } = api.mailer.getMailer.useQuery({
    name: name as string,
  });
  console.log(dataMailer);
  return (
    <>
      { dataMailer && <MailerView {...dataMailer} /> }
    </>
  );
};

MailerPage.Layout = DashboardLayout;

export default MailerPage;
