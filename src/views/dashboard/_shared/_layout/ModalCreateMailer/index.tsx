import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Mailer } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { api } from "../../../../../utils/api";

export type TModalCreateMailerProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

type TPayloadCreateMailer = Omit<
  Mailer,
  "id" | "activate" | "connected" | "apiKey" | "userIdts" | "userId"
>;

export const ModalCreateMailer = ({
  opened,
  setOpened,
}: TModalCreateMailerProps) => {
  const form = useForm({
    initialValues: {
      name: "",
      smtpHost: "",
      smtpUser: "",
      smtpPass: "",
      smtpName: "",
      smtpPort: 587,
    },
  });

  const createMutation = api.mailer.create.useMutation();

  const onSubmit = (props: TPayloadCreateMailer) => {
    console.log(props);
    const result = createMutation.mutate(props);
    console.log(result);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Mailer"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <TextInput label="NAME" {...form.getInputProps("name")} />
          <TextInput label="SMTP_HOST" {...form.getInputProps("smtpHost")} />
          <TextInput label="SMTP_USER" {...form.getInputProps("smtpUser")} />
          <TextInput label="SMTP_PASS" {...form.getInputProps("smtpPass")} />
          <NumberInput label="SMTP_PORT" {...form.getInputProps("smtpPort")} />
          <TextInput label="SMTP_NAME" {...form.getInputProps("smtpName")} />
          <Button type="submit">Crear</Button>
        </Stack>
      </form>
    </Modal>
  );
};
