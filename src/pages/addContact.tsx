import { Button, Card, Stack, Text, TextInput } from "@mantine/core";
import style from "../styles/addContact.module.css";
import { isNotEmpty, useForm } from "@mantine/form";
import { addContact } from "../utils/api/phonebookApi";
import { useNavigate } from "react-router-dom";
const AddContact = () => {
  const navigate = useNavigate();
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

  const handleAddContact = () => {
    if (form.values.name && form.values.phone) {
      try {
        addContact(form.values.name, form.values.phone).then((res) => {
          navigate("/");
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className={style.pageContainer}>
      <Stack align="center" mb={"2rem"}>
        <Text size="30px" fw={700}>
          Add Contact
        </Text>
      </Stack>
      <Card shadow="xl" padding="xl" radius="md" withBorder>
        <form onSubmit={form.onSubmit(() => handleAddContact())}>
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
            Add New Contact
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddContact;
