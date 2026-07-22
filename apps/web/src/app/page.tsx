import Image from "next/image";
import { PageWrapper } from "./modules/shared/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold">Welcome to our App</h1>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Enter
      </button>
    </PageWrapper>
  );
}
