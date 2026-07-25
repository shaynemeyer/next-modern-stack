import { Note } from "@/generated/api";

type Props = {
  note: Note;
};

export function NotePageContent({ note }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{note.id}</h1>
      <p>{note.text}</p>
    </div>
  );
}
