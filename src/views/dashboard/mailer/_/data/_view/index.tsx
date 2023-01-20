import {
  Button,
  Container,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Mailer } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../../../../../utils/api";

export const DashboardMailer_DataView = (props: Mailer) => {
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: props,
  });

  const updateMutation = api.mailer.updateMailer.useMutation();

  const onSubmit = async (props: Mailer) => {
    setLoading(true);
    await updateMutation.mutateAsync(props);
    setLoading(false);
    setEditable(true);
    await router.push("/dashboard/mailer/" + props.name + "/data");
  };

  return (
    <>
      <Container>
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
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
            <NumberInput
              label="SMTP_PORT"
              readOnly={!editable}
              {...form.getInputProps("smtpPort")}
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
            <Button
              disabled={editable && loading}
              onClick={() => setEditable(!editable)}
            >
              {editable ? "Guardar" : "Editar"}
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};
