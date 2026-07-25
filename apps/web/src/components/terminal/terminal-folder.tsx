import { Folder } from "@/generated/api";
import { cn } from "@/lib/utils";

type Props = {
  folder: Folder;
  onClick: () => void;
  isSelected: boolean;
};

export function TerminalFolder({ folder, onClick, isSelected }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        isSelected ? "bg-gray-700" : "hover:bg-gray-800 cursor-pointer",
      )}
    >
      <div key={folder.id}>{folder.name}</div>
    </button>
  );
}
