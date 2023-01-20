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
  Text,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import Link from "next/link";
import { api } from "../../../../utils/api";

import type { ReactNode } from "react";
import type { TLayout } from "../../../../pages/_app";
import { ModalCreateMailer } from "./ModalCreateMailer";
import { signOut } from "next-auth/react";

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

  const { data: mailers, refetch } = api.mailer.getAll.useQuery();

  const [openedModal, setOpenedModal] = useState(false);

  const logout = async () => {
    await signOut();
    setOpened(false);
  }

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
            <NavLink
              href="/dashboard/account"
              label={"Account"}
              component={Link}
              onClick={() => setOpened(false)}
            />
          </Navbar.Section>

          <Divider></Divider>

          <Navbar.Section grow component={ScrollArea} my="sm" mx="-xs" px="xs">
            {mailers?.map(({ name, id }) => (
              <NavLink
                key={id}
                href={`/dashboard/mailer/${name}/data`}
                label={name}
                component={Link}
                onClick={() => setOpened(false)}
              />
            ))}
          </Navbar.Section>

          <Divider></Divider>

          <Navbar.Section>
            <NavLink
              href="/dashboard/support"
              label={"Support"}
              component={Link}
              onClick={() => setOpened(false)}
            />
          </Navbar.Section>
          <Navbar.Section>
            <NavLink
              label={"Logout"}
              onClick={() => void logout()}
            />
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
              <Link href="/dashboard" onClick={() => setOpened(false)}>
                Dashboard
              </Link>
              <Group>
                <Button onClick={() => setOpenedModal(true)}>Create</Button>
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
      {openedModal && (
        <ModalCreateMailer opened={openedModal} setOpened={setOpenedModal} refetch={refetch} />
      )}
    </AppShell>
  );
};
