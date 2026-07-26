"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createNote, Folder, Note, updateNote } from "@/generated/api";
import { TerminalFolder } from "./terminal-folder";

type Props = {
  folders: Folder[];
};

function buildColumns(folders: Folder[], path: number[]): Folder[][] {
  const columns: Folder[][] = [folders];

  let current = folders;

  for (const id of path) {
    const selected = current.find((folder) => folder.id === id);

    if (!selected?.children?.length) break;

    columns.push(selected.children || []);
    current = selected.children || [];
  }

  return columns;
}

function getSelectedNotes(folders: Folder[], path: number[]): Note[] {
  let current = folders;
  let selected: Folder | undefined;

  for (const id of path) {
    selected = current.find((folder) => folder.id === id);

    if (!selected) return [];

    current = selected.children || [];
  }

  return selected?.notes || [];
}

function parsePath(path: string): number[] {
  return path.split(",").map(Number).filter(Boolean);
}

function addNoteToFolders(
  folders: Folder[],
  path: number[],
  note: Note,
): Folder[] {
  const [id, ...rest] = path;

  if (id === undefined) return folders;

  return folders.map((folder) => {
    if (folder.id !== id) return folder;

    if (rest.length === 0) {
      return { ...folder, notes: [...folder.notes, note] };
    }

    return {
      ...folder,
      children: addNoteToFolders(folder.children, rest, note),
    };
  });
}

export function TerminalContent({ folders: initialFolders }: Props) {
  const [folders, setFolders] = useState(initialFolders);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const newNoteInputRef = useRef<HTMLInputElement>(null);
  const isSubmittingNoteRef = useRef(false);
  const [folderPath, setFolderPath] = useQueryState("folder", {
    defaultValue: "",
  });

  useEffect(() => {
    if (isAddingNote) newNoteInputRef.current?.focus();
  }, [isAddingNote]);

  const path = parsePath(folderPath);
  const columns = buildColumns(folders, path);
  const notes = getSelectedNotes(folders, path);
  const currentFolderId = path[path.length - 1];

  const handleSelectedFolder = (folderId: number, colIndex: number) => {
    const currPath = parsePath(folderPath);

    if (currPath[colIndex] === folderId) {
      // Deselect if already selected
      const newPath = currPath.slice(0, colIndex);
      setFolderPath(newPath.join(","));
      return;
    }

    const newPath = [...currPath.slice(0, colIndex), folderId];
    setFolderPath(newPath.join(","));
  };

  const handleConfirmNewNote = async () => {
    if (currentFolderId === undefined || isSubmittingNoteRef.current) return;
    isSubmittingNoteRef.current = true;

    const text = newNoteText;
    const { data: note } = await createNote({ folderId: currentFolderId });
    if (text) {
      await updateNote(String(note.id), { text });
      note.text = text;
    }

    setFolders((prev) => addNoteToFolders(prev, path, note));
    setIsAddingNote(false);
    setNewNoteText("");
    isSubmittingNoteRef.current = false;
    toast.success(`note-${note.id}.txt created`);
  };

  const handleNewNoteKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleConfirmNewNote();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsAddingNote(false);
      setNewNoteText("");
    }
  };

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="flex">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="border-r border-gray-700 pr-4 mr-4">
              <div className="border-b mb-2">
                {colIndex === 0 ? "Root" : "Subfolders"}:
              </div>
              <div className="flex flex-col items-start">
                {column.map((folder) => (
                  <TerminalFolder
                    key={folder.id}
                    folder={folder}
                    onClick={() => handleSelectedFolder(folder.id, colIndex)}
                    isSelected={parsePath(folderPath)[colIndex] === folder.id}
                  />
                ))}
              </div>
            </div>
          ))}
          {currentFolderId !== undefined && (
            <div>
              <div className="border-b mb-2">Notes:</div>
              {notes.map((note) => {
                const slug = note.text
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, "-")
                  .slice(0, 20)
                  .replace(/-$/, "");

                return (
                  <Link
                    href={`/notes/${note.id}${folderPath ? `?folder=${folderPath}` : ""}`}
                    key={note.id}
                    className="mb-1 cursor-pointer hover:bg-gray-700 rounded block"
                  >
                    {slug}.txt
                  </Link>
                );
              })}
              <div className="mt-3">
                {isAddingNote ? (
                  <div className="flex items-center">
                    <span className="mr-1">&gt;</span>
                    <input
                      ref={newNoteInputRef}
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      onKeyDown={handleNewNoteKeyDown}
                      onBlur={handleConfirmNewNote}
                      placeholder="note text..."
                      className="bg-transparent border-none outline-none font-mono text-green-500 placeholder:text-green-800 flex-1"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(true)}
                    className="cursor-pointer hover:bg-gray-700 rounded block text-left"
                  >
                    [+] New note
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
