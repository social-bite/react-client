import { useLoaderData } from "react-router";
import { Tab } from "@headlessui/react";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Feed() {
  const posts = useLoaderData();
  console.log(posts);
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Create Post</Tab>
        <Tab>Posts</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <CreatePost />
        </Tab.Panel>
        <Tab.Panel>
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <Post key={i} {...post} />
            ))}
          </div>
          <Post />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
