import { Button, Modal, ModalProps, Text, TextInput } from "@mantine/core";
import { IActionModal } from "../../utils/types";
import { useMediaQuery } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";
import { editContact, getContactById } from "../../utils/api/phonebookApi";

const EditContactModal = ({
  opened,
  onClose,
  _id,
  name,
  phone,
  onSubmit,
}: ModalProps & IActionModal) => {
  const isMobile = useMediaQuery("(max-width: 62em)");

  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
    },

    validate: {
      name: isNotEmpty("Name is required"),
      phone: isNotEmpty("Phone is required"),
    },
  });

  useEffect(() => {
    if (_id) {
      getContactById(_id).then((res) => {
        console.log(res);
        form.setFieldValue("name", res.name);
        form.setFieldValue("phone", res.phone);
      });
    }
  }, [_id]);
  console.log(_id);

  const handleEdit = () => {
    if (_id && form.values.name && form.values.phone) {
      try {
        editContact(_id, form.values.name, form.values.phone).then((res) => {
          console.log(res);
          onSubmit();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Modal
      radius={"lg"}
      size="35%"
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="1.5rem">
          Edit Contact
        </Text>
      }
      padding={"2rem"}
      fullScreen={isMobile}
      centered
    >
      <form onSubmit={form.onSubmit(() => handleEdit())}>
        <TextInput
          size="md"
          w="100%"
          mb="2.4rem"
          label={<Text fw={700}>Name</Text>}
          labelProps={{ style: { marginBottom: 8 } }}
          {...form.getInputProps("name")}
        />
        <TextInput
          size="md"
          w="100%"
          mb="2.4rem"
          label={<Text fw={700}>Phone</Text>}
          labelProps={{ style: { marginBottom: 8 } }}
          {...form.getInputProps("phone")}
        />
        <Button color="green" w="100%" type="submit">
          Edit
        </Button>
      </form>
    </Modal>
  );
};
export default EditContactModal;
