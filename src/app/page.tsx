import { api, HydrateClient } from "stampCollector/trpc/server";
import { CreateMember } from "./_components/createMember";
import SearchBar from "./_components/search";
import { ListMembers } from "./_components/listMembers";
import { SelectedMemberProvider } from "./memberContextProvider";
import { MemberInFocus } from "./_components/memberInFocus";
import CreateStampCardModal from "./_components/createStampCardModal";
import StampCardInFocusModal from "./_components/stampCardInFocusModal";
import { ModalProvider } from "./modalContext";
import LeftMain from "./_components/leftMain";

export default async function Home() {
  //void api.member.listAllMembers.prefetch();

  return (
    <HydrateClient>
      <SelectedMemberProvider>
        <ModalProvider>
          <CreateStampCardModal />
          <StampCardInFocusModal />
          <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#5f0404] to-[#000000] py-17 text-white">
            <h1 className="font-BioRhyme mb-17 text-9xl font-extrabold opacity-70 text-shadow-lg/30">
              Dogman
            </h1>
            <div className="flex w-full flex-row gap-12 bg-white px-4 py-16 md:w-full md:flex-wrap md:gap-0 dark:bg-stone-900">
              <div className="md:order-2 md:mr-2 md:w-95">
                <LeftMain />
              </div>
              <div className="flex w-full max-w-lg flex-col gap-5 rounded-md drop-shadow-xl/50 md:order-3 md:w-90">
                <MemberInFocus />
              </div>
              <div className="drop-shadow-xl/50 md:order-1 md:w-full">
                <CreateMember />
              </div>
            </div>
          </main>
        </ModalProvider>
      </SelectedMemberProvider>
    </HydrateClient>
  );
}
