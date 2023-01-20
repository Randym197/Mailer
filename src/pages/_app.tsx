import { useState } from "react";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";
import { AppLayout } from "../views/_app";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";

import type { FC, ReactNode } from "react";
import type { NextComponentType, NextPageContext } from "next";
import type {AppType } from "next/app";
import type {Session } from "next-auth";
import type { ColorScheme } from "@mantine/core";

export type TLayout = FC<{
  children: ReactNode;
}>;

export type TCustomPage = NextComponentType<NextPageContext> & {
  Layout: TLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const Layout = (Component as TCustomPage).Layout || AppLayout;

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
