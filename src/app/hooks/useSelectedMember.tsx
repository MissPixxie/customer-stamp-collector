import { api } from "stampCollector/trpc/react";
import { useSelectedMemberContext } from "../memberContextProvider";

export const useSelectedMember = () => {
  const { selectedMemberId, setSelectedMemberId } = useSelectedMemberContext();

  const query = api.member.getMember.useQuery(selectedMemberId ?? undefined, {
    enabled: selectedMemberId !== null,
  });

  return {
    selectedMember: query.data ?? null,
    isLoading: query.isLoading,
    refetch: query.refetch,
    setSelectedMemberId,
  };
};
