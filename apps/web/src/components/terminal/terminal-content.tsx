"use client";

import { useState } from "react";
import { Folder } from "@/generated/api";
import { TerminalFolder } from "./terminal-folder";

type Props = {
  folders: Folder[];
};

export function TerminalContent({ folders }: Props) {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="flex">
          <div className="border-r border-gray-700 pr-4">
            <div className="border-b mb-2">Content Filters</div>
            <div className="flex flex-col items-start">
              {folders.map((folder) => (
                <TerminalFolder
                  onClick={() => setSelectedFolder(folder)}
                  key={folder.id}
                  folder={folder}
                  isSelected={selectedFolder?.id === folder.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
