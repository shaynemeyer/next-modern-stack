import { PageWrapper } from "@/components/shared/page-wrapper";
import { TerminalContent } from "@/components/terminal/terminal-content";
import { type Folder, getFolders } from "@/generated/api";

export default async function TerminalPage() {
  let folders: Folder[] = [];

  try {
    const response = await getFolders();
    folders = response.data;
  } catch (_error) {}

  return (
    <PageWrapper>
      <TerminalContent folders={folders} />
    </PageWrapper>
  );
}
