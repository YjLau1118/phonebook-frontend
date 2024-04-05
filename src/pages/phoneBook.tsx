import { useEffect, useState } from "react";
import {
  deleteContact,
  editContact,
  getContactList,
} from "../utils/api/phonebookApi";
import { IContactList } from "../utils/types";
import style from "../styles/phoneBook.module.css";
import {
  Button,
  Card,
  Dialog,
  Flex,
  Group,
  Loader,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";
import DeleteContactModal from "../components/modal/deleteContact";
import EditContactModal from "../components/modal/editContact";
import { useNavigate } from "react-router-dom";
const PhoneBook = () => {
  const defaultData = { _id: "", name: "", phone: "" };

  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [actionDetails, setActionDetails] = useState<IContactList>(defaultData);
  const [phonebookList, setPhonebookList] = useState<IContactList[]>([
    defaultData,
  ]);

  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getContactList().then((res) => {
      setPhonebookList(res);
    });
  }, []);

  const handleDelete = (id: string) => {
    if (id) {
      setIsLoading(true);
      try {
        deleteContact(id).then((res) => {
          console.log(res);
          setOpenDeleteModal(false);
          getContactList().then((updatedList) => {
            setPhonebookList(updatedList);
            setIsLoading(false);
            setDialogDelete(true);
          });
          setTimeout(() => setDialogDelete(false), 5000);
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  const row = phonebookList.map((item) => (
    <>
      <Table.Tr key={item._id}>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.phone}</Table.Td>
        <Table.Td>
          <Flex gap={30}>
            <PencilSimple
              size={20}
              color="green"
              onClick={() => {
                setOpenEditModal(true);
                setActionDetails(item);
              }}
            />
            <Trash
              size={20}
              color="red"
              onClick={() => {
                setOpenDeleteModal(true);
                setActionDetails(item);
              }}
            />
          </Flex>
        </Table.Td>
      </Table.Tr>
    </>
  ));
  return (
    <div className={style.pageContainer}>
      <Stack align="center" mb={"2rem"}>
        <Text size="30px" fw={700}>
          Phonebook List
        </Text>
      </Stack>
      <Card shadow="xl" padding="xl" radius="md" withBorder>
        {isLoading ? (
          <Stack align="center" justify="center">
            <Loader></Loader>
          </Stack>
        ) : (
          <Table.ScrollContainer minWidth={800}>
            <Table
              horizontalSpacing="xl"
              verticalSpacing="md"
              striped
              highlightOnHover
              withTableBorder
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Phone Number</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              {phonebookList.length === 0 ? (
                <Table.Caption>No Contact Now</Table.Caption>
              ) : (
                <Table.Tbody>{row}</Table.Tbody>
              )}
            </Table>
          </Table.ScrollContainer>
        )}
        <Stack mt={"1rem"}>
          <Button color="green" onClick={() => navigate("/addContact")}>
            Add New Contact
          </Button>
        </Stack>
      </Card>
      <DeleteContactModal
        opened={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        _id={actionDetails._id}
        onSubmit={() => handleDelete(actionDetails._id)}
        name={actionDetails.name}
        phone={actionDetails.phone}
      />
      <EditContactModal
        opened={openEditModal}
        onClose={() => setOpenEditModal(false)}
        _id={actionDetails._id}
        onSubmit={() => {
          setOpenEditModal(false);
          getContactList().then((updatedList) => {
            setPhonebookList(updatedList);
            setIsLoading(false);
            setDialogEdit(true);
          });
          setTimeout(() => setDialogEdit(false), 5000);
        }}
        name={actionDetails.name}
        phone={actionDetails.phone}
      />
      {dialogDelete && (
        <Dialog
          opened={dialogDelete}
          withCloseButton
          onClose={() => setDialogDelete(false)}
          size="lg"
          radius="md"
        >
          <Text size="sm" mb="xs" fw={500}>
            Delete Contact
          </Text>
          <Flex align="center" justify="flex-start" gap={10}>
            <Trash size={20} color="green" />
            <Text>Contact is successfully deleted</Text>
          </Flex>
        </Dialog>
      )}
      {dialogEdit && (
        <Dialog
          opened={dialogEdit}
          withCloseButton
          onClose={() => setDialogEdit(false)}
          size="lg"
          radius="md"
        >
          <Text size="sm" mb="xs" fw={500}>
            Edit Contact
          </Text>
          <Flex align="center" justify="flex-start" gap={10}>
            <PencilSimple size={20} color="green" />
            <Text>Contact is successfully edited</Text>
          </Flex>
        </Dialog>
      )}
    </div>
  );
};

export default PhoneBook;
