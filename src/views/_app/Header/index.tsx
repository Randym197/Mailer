import Link from "next/link";
import Image from "next/image";
import { Title, Header as MantineHeader, Group, Button } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import type { CSSProperties } from "react";
import { useRouter } from "next/router";

const BtnDashboard = () => {
  return (
    <Button href="/dashboard" component={Link}>
      Dashboard
    </Button>
  );
};

const BtnLogin = () => {
  const login = async () => {
    await signIn("github", { callbackUrl: "/dashboard" });
  };
  return <Button onClick={() => void login()}>Login</Button>;
};

export const Links = () => {
  const { data: sessionData } = useSession();
  const style: CSSProperties = {
    textTransform: "uppercase",
    textDecoration: "none",
    fontSize: ".9em",
  };

  return (
    <Group>
      <Link href="/support" style={{ ...style }}>
        Support
      </Link>

      {sessionData ? <BtnDashboard /> : <BtnLogin />}
    </Group>
  );
};

export const Header = () => {
  return (
    <MantineHeader height={70} p="md">
      <Group position="apart">
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: ".5em", textDecoration: "none" }}
        >
          <Image
            src="/img/letter.png"
            width={32}
            height={32}
            alt="I Hear You"
          />
          <Title size="h4">Mailer</Title>
        </Link>

        <Links />
      </Group>
    </MantineHeader>
  );
};
