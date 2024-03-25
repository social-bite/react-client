import { useLoaderData } from "react-router";
import { Tab } from "@headlessui/react";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Feed() {
  const data = useLoaderData();
  
  return (
    <div className="flex flex-col gap-y-3 h-full relative">

    </div>
  );
}
