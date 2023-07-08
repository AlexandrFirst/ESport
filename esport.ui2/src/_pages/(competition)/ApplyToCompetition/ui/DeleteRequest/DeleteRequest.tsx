import { FC, useState } from "react";
import { Button, Modal, RegularText, SubTitle } from "@/shared/ui";
import { TrashIcon } from "lucide-react";

export const DeleteRequest: FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowHideModal = (b: boolean) => () => setShowModal(b);

  const handleDeleteRequest = async () => {
    // "TODO: implement me";
    setShowModal(false);
  };

  return (
    <>
      <div className={"flex justify-end mt-6"}>
        <Button
          color={"error"}
          variant={"text"}
          onClick={handleShowHideModal(true)}
        >
          Delete request <TrashIcon className={"ml-4"} />
        </Button>
      </div>
      <Modal lazy isOpen={showModal} onClose={handleShowHideModal(false)}>
        <SubTitle size={"extra-large"} center>
          Are you sure?
        </SubTitle>
        <RegularText className={"my-10 text-center"}>
          You will not be able to revert this changes
        </RegularText>
        <div className={"flex justify-end"}>
          <Button
            color={"error"}
            variant={"text"}
            onClick={handleDeleteRequest}
          >
            Yes, I am sure
          </Button>
        </div>
      </Modal>
    </>
  );
};
