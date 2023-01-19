import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Divider,
  Button,
  ScrollArea,
  NavLink,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import Link from "next/link";

import type { ReactNode } from "react";
import type { TLayout } from "../../../pages/_app";
import { api } from "../../../utils/api";

export const DashboardLayout: TLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { data: mailers } = api.mailer.getAll.useQuery();

  return (
    <AppShell
      styles={{
        main: {
          background:
            colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          px="sm"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200 }}
        >
          <Navbar.Section my={"sm"}>
            <NavLink href="/dashboard" label={"Account"} component={Link} />
          </Navbar.Section>

          <Divider></Divider>

          <Navbar.Section grow component={ScrollArea} my="sm" mx="-xs" px="xs">
            {mailers?.map(({ name, id }) => (
              <NavLink
                key={id}
                href={`/dashboard/mailer/${name}`}
                label={name}
                component={Link}
              />
            ))}
          </Navbar.Section>

          <Divider></Divider>

          <Navbar.Section>
            <NavLink href="/dashboard" label={"Support"} component={Link} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group w="100%" position="apart">
              <Link href="/dashboard">Dashboard</Link>
              <Group>
                <Button>Crear</Button>
                <ActionIcon
                  variant="outline"
                  color={dark ? "yellow" : "blue"}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
              </Group>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
