import { Container, Group, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "../../../../../../utils/api";

export const DashboardMailer_SecurityView = () => {
  const {
    query: { name },
  } = useRouter();

  const { data: dataMailer } = api.mailer.getMailer.useQuery({
    name: name as string,
  });
  return dataMailer ? (
    <Container sx={{ maxWidth: "100%" }}>
      <Group noWrap={true}>
        <Text weight="bold">ApiKey:</Text>
        <Text sx={{ wordBreak: "break-all" }}>{dataMailer.apiKey}</Text>
      </Group>
      <Group>
        <Text weight="bold">Activate:</Text>
        <Text>{dataMailer.activate ? "enable" : "disable"}</Text>
      </Group>
      <Group>
        <Text weight={"bold"}>Origins:</Text>
        {dataMailer.originsMailer.length === 0 && (
          <Text>Ninguno registrado</Text>
        )}
        {dataMailer.originsMailer.map((originData) => (
          <Text key={originData.id}>{originData.origin}</Text>
        ))}
      </Group>
    </Container>
  ) : null;
};
