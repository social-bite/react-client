import { Tab } from "@headlessui/react";
import useSWR from "swr";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { fetchFeed } from "lib/api";

export default function Feed() {
  const { data: posts, error, isLoading } = useSWR("fetchFeed", fetchFeed);
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
            {posts?.map((post, i) => (
              <Post key={i} {...post} />
            ))}
          </div>
          <Post />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
