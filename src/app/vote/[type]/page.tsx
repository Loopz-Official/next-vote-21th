import VoteResultTab from "@/components/features/vote/VoteResultTab";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ type: "leader" | "demoday" }>;
}) {
  const { type } = await params;

  const ordinalNumber = type === "leader" ? "22nd" : "21st";
  const headerContent = type === "leader" ? "Team Leader" : "Demo Day";

  return (
    <div className="w-full h-fit pt-21 flex flex-col items-center gap-4 pb-30">
      <header className="text-[40px] en-text flex flex-col items-center">
        CEOS {ordinalNumber} {headerContent} Vote
        <Image src={"/brush.svg"} alt="브러쉬" width={429} height={9} />
      </header>
      <VoteResultTab type={type} />
    </div>
  );
}
