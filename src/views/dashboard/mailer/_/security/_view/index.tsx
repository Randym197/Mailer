import {
  ActionIcon,
  Box,
  Button,
  CloseButton,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../../../../../utils/api";
import type { OriginMailer } from "@prisma/client";
import { IconCheck, IconEdit, IconTrash } from "@tabler/icons";

type TCreateOriginProps = { mailerId: string; refetch: () => Promise<unknown> };

const CreateOrigin = ({ refetch, mailerId }: TCreateOriginProps) => {
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);
  const addOrigin = api.mailer.addOrigin.useMutation();

  const saveOrigin = async () => {
    setLoading(true);
    await addOrigin.mutateAsync({
      origin,
      mailerId,
    });
    await refetch();
    setLoading(false);
    setOrigin("");
  };
  return (
    <Group>
      <TextInput value={origin} onChange={(e) => setOrigin(e.target.value)} />
      <Button disabled={loading} onClick={() => void saveOrigin()}>
        Add Origin
      </Button>
    </Group>
  );
};

type TOriginEditableProps = OriginMailer & { refetch: () => Promise<unknown> };

const OriginEditable = ({ refetch, ...props }: TOriginEditableProps) => {
  const [originData, setOriginData] = useState(props);
  const [editing, setEditing] = useState(false);

  const editOrigin = api.mailer.editOrigin.useMutation();
  const deleteOrigin = api.mailer.deleteOrigin.useMutation();

  const save = async () => {
    await editOrigin.mutateAsync(originData);
    await refetch();
    setEditing(false);
  };

  const remove = async () => {
    await deleteOrigin.mutateAsync({ id: originData.id });
    setEditing(false);
    await refetch();
  };

  return (
    <Group noWrap={true}>
      <TextInput
        value={originData.origin}
        readOnly={!editing}
        onChange={(e) => {
          setOriginData({ ...originData, origin: e.target.value });
        }}
      />
      {editing ? (
        <>
          <ActionIcon
            variant="filled"
            color="green"
            onClick={() => void save()}
          >
            <IconCheck size={16} />
          </ActionIcon>

          <ActionIcon
            variant="filled"
            color="red"
            onClick={() => void remove()}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </>
      ) : (
        <ActionIcon
          variant="filled"
          color="blue"
          onClick={() => setEditing(true)}
        >
          <IconEdit size={16} />
        </ActionIcon>
      )}
    </Group>
  );
};

export const DashboardMailer_SecurityView = () => {
  const {
    query: { name },
    push,
  } = useRouter();

  const { data: dataMailer, refetch } = api.mailer.getMailer.useQuery({
    name: name as string,
  });

  const { mutateAsync: deleteMailerMutation } =
    api.mailer.deleteMailer.useMutation();

  const deleteMailer = async () => {
    if (dataMailer) {
      await deleteMailerMutation({ id: dataMailer.id });
      await push("/dashboard");
      await refetch();
    }
  };

  return dataMailer ? (
    <Container sx={{ maxWidth: "100%" }}>
      <SimpleGrid cols={2} sx={{ gridTemplateColumns: "auto 1fr" }}>
        <Text weight="bold">ApiKey:</Text>
        <Text sx={{ wordBreak: "break-all" }}>{dataMailer.apiKey}</Text>

        <Text weight="bold">Activate:</Text>
        <Text>{dataMailer.activate ? "enable" : "disable"}</Text>

        <Text weight={"bold"}>Origins:</Text>
        <Stack>
          {dataMailer.originsMailer.length === 0 && (
            <Text>Ninguno registrado</Text>
          )}
          {dataMailer.originsMailer.map((originData) => (
            <OriginEditable
              key={originData.id}
              {...originData}
              refetch={refetch}
            />
          ))}
          <CreateOrigin mailerId={dataMailer.id} refetch={refetch} />
        </Stack>

        <Text weight={"bold"}>Terminate: </Text>
        <Box>
          <Button
            color="red"
            variant="filled"
            onClick={() => void deleteMailer()}
          >
            Eliminar Mailer
          </Button>
        </Box>
      </SimpleGrid>
    </Container>
  ) : null;
};
