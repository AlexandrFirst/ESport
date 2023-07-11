import { FC, useState } from "react";
import { Button, Modal, RegularText, SubTitle } from "@/shared/ui";
import { TrashIcon } from "lucide-react";
import {
  competitionQueryKeys,
  useDeleteRequestById,
} from "@/entities/competition";
import { useSnackbar } from "@/shared/lib";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteRequestProps {
  requestId: number;
}

export const DeleteRequest: FC<DeleteRequestProps> = ({ requestId }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { mutate } = useDeleteRequestById();
  const queryClient = useQueryClient();

  const { showSuccess, showApiError } = useSnackbar();

  const handleShowHideModal = (b: boolean) => () => setIsModalOpened(b);

  const handleDeleteRequest = async () => {
    await mutate(
      { id: requestId },
      {
        async onSuccess() {
          showSuccess("Request deleted successfully");
          await queryClient.invalidateQueries({
            queryKey: competitionQueryKeys.getCompetitorRecordsAll(),
          });
        },
        onError(error) {
          showApiError(error);
        },
      }
    );
    setIsModalOpened(false);
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
      <Modal lazy isOpen={isModalOpened} onClose={handleShowHideModal(false)}>
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
