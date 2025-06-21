import Link from "next/link";
import { LatestPost } from "stampCollector/app/_components/post";
import { api, HydrateClient } from "stampCollector/trpc/server";
import { CreateCustomer } from "./_components/createCustomer";
import SearchBar from "./_components/search";
import { ListCustomers } from "./_components/listCustomer";
import {
  SelectedMemberProvider,
  useSelectedMember,
} from "./memberContextProvider";
import { MemberInFocus } from "./_components/memberInFocus";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <SelectedMemberProvider>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#5f0404] to-[#000000] text-white">
          <h1 className="font-BioRhyme mb-4 text-9xl font-extrabold opacity-70 text-shadow-lg/30">
            Dogman
          </h1>
          <div className="flex w-full flex-row gap-12 bg-amber-50 px-4 py-16">
            {/* <LatestPost /> */}
            <div className="flex w-lg flex-col drop-shadow-xl/50">
              <SearchBar />
              <ListCustomers />
            </div>
            <div className="flex w-full max-w-lg flex-col gap-5 bg-amber-600">
              <div className="h-full w-full max-w-xs rounded-2xl bg-amber-300">
                <MemberInFocus />
              </div>
              <h1 className="text-white dark:text-black">
                Stämpelkort i fokus
              </h1>
            </div>
            <div className="drop-shadow-xl/50">
              <CreateCustomer />
            </div>
          </div>
        </main>
      </SelectedMemberProvider>
    </HydrateClient>
  );
}
