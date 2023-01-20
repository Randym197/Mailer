import { Button, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { Mailer } from "@prisma/client";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { api } from "../../../../../utils/api";

export type TModalCreateMailerProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<unknown>;
};

type TPayloadCreateMailer = Omit<
  Mailer,
  "id" | "activate" | "connected" | "apiKey" | "userIdts" | "userId"
>;

export const ModalCreateMailer = ({
  opened,
  setOpened,
  refetch,
}: TModalCreateMailerProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (props: TPayloadCreateMailer) => {
    setLoading(true);
    await createMutation.mutateAsync(props);
    await refetch();
    await router.push("/dashboard/mailer/" + props.name + "/data");
    setLoading(false);
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Mailer"
    >
      <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
        <Stack>
          <TextInput label="NAME" {...form.getInputProps("name")} />
          <TextInput label="SMTP_HOST" {...form.getInputProps("smtpHost")} />
          <TextInput label="SMTP_USER" {...form.getInputProps("smtpUser")} />
          <TextInput label="SMTP_PASS" {...form.getInputProps("smtpPass")} />
          <NumberInput label="SMTP_PORT" {...form.getInputProps("smtpPort")} />
          <TextInput label="SMTP_NAME" {...form.getInputProps("smtpName")} />
          <Button type="submit" disabled={loading}>
            Create Mailer
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
