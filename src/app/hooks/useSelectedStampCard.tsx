import { api } from "stampCollector/trpc/react";
import { useSelectedMemberContext } from "../memberContextProvider";
import { skipToken } from "@tanstack/react-query";

export const useSelectedStampCard = () => {
  const {
    selectedMemberId,
    setSelectedMemberId,
    selectedStampCardId,
    setSelectedStampCardId,
  } = useSelectedMemberContext();

  const query = api.stampCard.getSpecificStampCard.useQuery(
    selectedMemberId !== null && selectedStampCardId !== null
      ? { membersNr: selectedMemberId, stampCardId: selectedStampCardId }
      : skipToken,
  );

  return {
    selectedStampCard: query.data ?? null,
    isStampCardLoading: query.isLoading,
    refetch: query.refetch,
    setSelectedStampCardId,
  };
};
