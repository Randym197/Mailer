import {
  Button,
  Container,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Mailer } from "@prisma/client";
import { useState } from "react";

export const DashboardMailer_DataView = (props: Mailer) => {
  const [editable, setEditable] = useState(false);
  const form = useForm({
    initialValues: props,
  });

  const onSubmit = (props: Mailer) => {
    console.log(props);
  };

  return (
    <>
      <Container>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="NAME"
              readOnly={!editable}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="SMTP_HOST"
              readOnly={!editable}
              {...form.getInputProps("smtpHost")}
            />
            <TextInput
              label="SMTP_USER"
              readOnly={!editable}
              {...form.getInputProps("smtpUser")}
            />
            <TextInput
              label="SMTP_PASS"
              readOnly={!editable}
              {...form.getInputProps("smtpPass")}
            />
            <TextInput
              label="SMTP_NAME"
              readOnly={!editable}
              {...form.getInputProps("smtpName")}
            />
            <Button onClick={() => setEditable(!editable)}>
              {editable ? "Guardar" : "Editar"}
            </Button>

          </Stack>
        </form>
      </Container>
    </>
  );
};