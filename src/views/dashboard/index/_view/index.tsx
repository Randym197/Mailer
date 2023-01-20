import {
  Code,
  Container,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "../../../../utils/api";

export const DashboardIndexView = () => {
  const { data: dataMailers } = api.mailer.getAll.useQuery();
  const router = useRouter()
  return (
    <Stack sx={{ gap: "1em" }}>
      <Title order={3}>Mailers</Title>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 2 }]}>
        {dataMailers?.map(({ name, id }) => {
          return (
            <Paper sx={{cursor: "pointer"}} shadow="xs" p="md" key={id} onClick={() => void router.push(`/dashboard/mailer/${name}/data`)}>
              {name}
            </Paper>
          );
        })}
      </SimpleGrid>

      <Divider />

      <Title order={3}>How to Use</Title>
      <Text>Make a HTTP POST request to: </Text>
      <Text>{location.protocol}{`//`}{location.host}/api/mailer/{`{name}`}</Text>
      <Text>Set header Authorization: Bearer {`{token}`} (token in the Security tab of your mailer)</Text>
      <Text>Set header Content-Type: application/json</Text>
      <Text>With Body:</Text>
      <Code>
from?: string; {`// Boss👻" <own@z.com>'`} <br/>
to: string; {`// "foo@a.com, bar@b.com"`} <br/>
subject: string; {`// "Hello ✔"`} <br/>
text: string; {`// "Hello world?"`} <br/>
html: string; {`// "<b>Hello world?</b>"`}
      </Code>
      <Text>And end! 🎉</Text>
    </Stack>
  );
};
