import { Folder } from "@/generated/api";

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
      className={
        isSelected ? "bg-gray-700" : "hover:bg-gray-800 cursor-pointer"
      }
    >
      <div key={folder.id}>{folder.name}</div>
    </button>
  );
}
