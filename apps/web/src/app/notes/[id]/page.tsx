import { NotePageContent } from "@/components/notes/note-page-content";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { getNoteById } from "@/generated/api";

export default async function NotesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data: note } = await getNoteById(id);

  return (
    <PageWrapper>
      <NotePageContent note={note} />
    </PageWrapper>
  );
}
