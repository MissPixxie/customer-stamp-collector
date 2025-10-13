import { useState } from "react";
import { useModal } from "../modalContext";
import { useSelectedStampCard } from "./useSelectedStampCard";
import { api } from "stampCollector/trpc/react";

export default function useCreateStamp() {
  const utils = api.useUtils();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { activeModal, closeModal } = useModal();
  const { selectedStampCard, setSelectedStampCardId, refetch } =
    useSelectedStampCard();

  const createStamp = api.stamp.create.useMutation({
    onSuccess: async () => {
      await utils.stampCard.getStampCard.invalidate();
      setMessage("Stamp has been added successfully!");
      closeModal();
    },
    onError: (error) => {
      setMessage(`Error while adding stamp: ${error.message}`);
      setIsLoading(false);
    },
  });

  const createPawStamp = api.pawStamp.create.useMutation({
    onSuccess: async () => {
      await utils.stampCard.getStampCard.invalidate();
      setMessage("Stamp has been added successfully!");
      closeModal();
    },
    onError: (error) => {
      setMessage(`Error while adding stamp: ${error.message}`);
      setIsLoading(false);
    },
  });

  const submitRegularStamp = (stamp: {
    brand: string;
    size: string;
    price: string;
  }) => {
    if (!selectedStampCard) return;
    setIsLoading(true);
    createStamp.mutate({
      stampCardId: selectedStampCard.id,
      stampBrand: stamp.brand,
      stampSize: stamp.size,
      stampPrice: stamp.price,
    });
  };

  const submitPawStamp = () => {
    if (!selectedStampCard) return;
    setIsLoading(true);
    createPawStamp.mutate({
      stampCardId: selectedStampCard.id,
    });
  };

  return {
    submitRegularStamp,
    submitPawStamp,
    isLoading,
    message,
  };
}
