import { Tabs, Title } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { DashboardLayout } from "../../../../_shared/_layout";

export const DashboardMailer_Layout = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const name = router.query.name as string;
  return (
    <DashboardLayout>
      <Title>{name}</Title>
      <Tabs defaultValue="data" value={router.asPath.split("/").pop()}>
        <Tabs.List>
          <Tabs.Tab
            value="data"
            icon={<IconPhoto size={14} />}
            onClick={() => void router.push(`/dashboard/mailer/${name}/data`)}
          >
            Data
          </Tabs.Tab>
          <Tabs.Tab
            value="security"
            icon={<IconMessageCircle size={14} />}
            onClick={() =>
              void router.push(`/dashboard/mailer/${name}/security`)
            }
          >
            Security
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="data" pt="xs">
          {children}
        </Tabs.Panel>

        <Tabs.Panel value="security" pt="xs">
          {children}
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  );
};
