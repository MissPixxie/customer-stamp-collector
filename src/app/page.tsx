import Link from "next/link";
import { LatestPost } from "stampCollector/app/_components/post";
import { api, HydrateClient } from "stampCollector/trpc/server";
import { CreateMember } from "./_components/createMember";
import SearchBar from "./_components/search";
import { ListMembers } from "./_components/listMembers";
import {
  SelectedMemberProvider,
  useSelectedMember,
} from "./memberContextProvider";
import { MemberInFocus } from "./_components/memberInFocus";
import CreateStampCardModal from "./_components/createStampCardModal";
import StampCardInFocusModal from "./_components/stampCardInFocusModal";
import { ModalProvider } from "./modalContext";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <SelectedMemberProvider>
        <ModalProvider>
          <CreateStampCardModal />
          <StampCardInFocusModal />
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#5f0404] to-[#000000] text-white">
            <h1 className="font-BioRhyme mb-4 text-9xl font-extrabold opacity-70 text-shadow-lg/30">
              Dogman
            </h1>
            <div className="flex w-full flex-row gap-12 bg-amber-50 px-4 py-16">
              <div className="flex w-lg flex-col drop-shadow-xl/50">
                <SearchBar />
                <ListMembers />
              </div>
              <div className="flex w-full max-w-lg flex-col gap-5 rounded-md bg-gray-800 drop-shadow-xl/50">
                <MemberInFocus />
              </div>
              <div className="drop-shadow-xl/50">
                <CreateMember />
              </div>
            </div>
          </main>
        </ModalProvider>
      </SelectedMemberProvider>
    </HydrateClient>
  );
}
