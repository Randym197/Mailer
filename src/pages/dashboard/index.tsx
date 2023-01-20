import { Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DashboardIndexLayout } from "../../views/dashboard/index/_layout";
import { DashboardIndexView } from "../../views/dashboard/index/_view";
import type { TCustomPage } from "../_app";

const DashboardIndexPage: TCustomPage = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  return sessionData?.user ? (
    <>
      <DashboardIndexView />
    </>
  ) : null;
};

DashboardIndexPage.Layout = DashboardIndexLayout;

export default DashboardIndexPage;
