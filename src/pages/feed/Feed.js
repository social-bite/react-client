import { useLoaderData } from "react-router";
import { Tab } from "@headlessui/react";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Feed() {
  const { posts } = useLoaderData();

  return (
    <div className="flex flex-col gap-y-3 h-full relative">
      <Tab.Group>
        <Tab.List className="gap-x-2 flex">
          <Tab className="ui-selected:border-b-2 border-teal-1 ui-selected:text-teal-1 rounded-sm p-1 ui-not-selected:text-gray-300 ui-not-selected:hover:text-teal-1">Posts</Tab>
          <Tab className="ui-selected:border-b-2 border-teal-1 ui-selected:text-teal-1 rounded-sm p-1  ui-not-selected:text-gray-300 ui-not-selected:hover:text-teal-1">Create Post</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="flex flex-col gap-y-12 mb-12">
              {posts.map((post, i) => (
                <Post key={i} {...post} />
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <CreatePost />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
