import type { ReactNode } from "react";
import { Header } from "./Header";
import { AppShell, useMantineTheme } from "@mantine/core";
import { Footer } from "./Footer";
import type { TLayout } from "../../../pages/_app";

export const AppLayout: TLayout = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          scrollBehavior: "smooth",
        },
      }}
      header={<Header />}
      footer={<Footer />}
    >
      {children}
    </AppShell>
  );
};
