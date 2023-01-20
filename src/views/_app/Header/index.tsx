import Link from "next/link";
import Image from "next/image";
import {
  Title,
  Header as MantineHeader,
  Group,
  Input,
  Box,
  Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import type { CSSProperties } from "react";

const BtnDashboard = () => {
  return (
    <Button href="/dashboard" component={Link}>
      Dashboard
    </Button>
  )
}

const BtnLogin = () => {
  return (
    <Button onClick={() => void signIn()}>
      Login
    </Button>
  )
}

export const Links = () => {
  const { data: sessionData } = useSession();
  const style: CSSProperties = {
    textTransform: "uppercase",
    fontSize: ".9em",
    letterSpacing: ".15em",
  };

  return (
    <Group>
      <Link href="/dashboard" style={{ ...style }}>
        Mujer
      </Link>
      <Link href="/category/man" style={{ ...style }}>
        Hombre
      </Link>

      { sessionData ? <BtnDashboard /> : <BtnLogin /> }
    </Group>
  );
};

export const Header = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);

  return (
    <MantineHeader height={showSearch ? 110 : 70} p="md">
      <Group position="apart">
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: ".5em" }}
        >
          <Image
            src="https://cdn.discordapp.com/avatars/673899341290930187/37015a21b18cff45167152c2740c3167.webp?size=128"
            width={32}
            height={32}
            alt="I Hear You"
          />
          <Title size="h4">Barato</Title>
        </Link>

        <Links />
      </Group>
      <Box p="md">
        {showSearch && (
          <Input
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
          />
        )}
      </Box>
    </MantineHeader>
  );
};
