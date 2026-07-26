"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Note, updateNote } from "@/generated/api";

type Props = {
  note: Note;
};

export function NotePageContent({ note }: Props) {
  const [text, setText] = useState(note.text);
  const textRef = useRef(text);
  textRef.current = text;
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderPath = searchParams.get("folder");
  const backHref = folderPath ? `/terminal?folder=${folderPath}` : "/terminal";

  const saveNote = () => {
    updateNote(String(note.id), { text: textRef.current });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        saveNote();
        router.push(backHref);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, backHref]);

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="border-b mb-2 flex justify-between">
          <span>note-{note.id}.txt:</span>
          <Link
            href={backHref}
            onClick={saveNote}
            className="hover:bg-gray-700 rounded px-1"
          >
            [Q]uit
          </Link>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={saveNote}
          className="min-h-40 overflow-hidden border-none bg-transparent p-0 font-mono text-green-500 outline-none focus-visible:border-none focus-visible:ring-0 resize-none"
        />
      </div>
    </div>
  );
}
