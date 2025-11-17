import { type IconType } from "react-icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { api } from "stampCollector/trpc/react";
import { useSelectedMember } from "../hooks/useSelectedMember";
const MyIcon: IconType = FaRegTrashAlt;

export function DeleteMember({ membersNr }: { membersNr: number }) {
  const utils = api.useUtils();
  const { selectedMember, refetch } = useSelectedMember();

  const deleteMember = api.member.delete.useMutation({
    onSuccess: async () => {
      await utils.member.listAllMembers.invalidate();
      await utils.member.getMember.invalidate(selectedMember?.membersNr);
      await refetch();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    deleteMember.mutate(membersNr);
  };
  return (
    <div>
      <FaRegTrashAlt onClick={handleSubmit} />
    </div>
  );
}
