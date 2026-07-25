import { NotePageContent } from "@/components/notes/note-page-content";
import { PageWrapper } from "@/components/shared/page-wrapper";

export default async function NotesPage() {
  return (
    <PageWrapper>
      <NotePageContent />
    </PageWrapper>
  );
}
