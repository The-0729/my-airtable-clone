import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Header from "./_components/Header/Header";

import Body from "./_components/Body/Body";
import Tab from "./_components/Tab/Tab";
export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-col h-full">
        <Tab />
        <Body />
        </div>
      </div>
    </HydrateClient>
  );
}
