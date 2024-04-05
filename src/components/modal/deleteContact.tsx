import { Button, Modal, ModalProps, Text } from "@mantine/core";
import { IActionModal } from "../../utils/types";
import { useMediaQuery } from "@mantine/hooks";

const DeleteContactModal = ({
  opened,
  onClose,
  _id,
  name,
  phone,
  onSubmit,
}: ModalProps & IActionModal) => {
  const isMobile = useMediaQuery("(max-width: 62em)");

  return (
    <Modal
      radius={"lg"}
      size="35%"
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="1.5rem">
          Delete Contact
        </Text>
      }
      padding={"2rem"}
      fullScreen={isMobile}
      centered
    >
      <Text mb={"1rem"}>
        Do you want to delete <b>{name}</b> from your phone book ?
      </Text>
      <Button color="red" w="100%" onClick={onSubmit}>
        Delete
      </Button>
    </Modal>
  );
};
export default DeleteContactModal;
