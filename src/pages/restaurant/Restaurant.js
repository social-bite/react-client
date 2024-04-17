import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchRestaurantFeed } from "lib/api";

import Post from "pages/feed/Post";

export default function Restaurant() {
  let { id } = useParams();
  const { data: posts, isLoading } = useSWR(
    ["/fetchRestaurantList", id],
    ([url, id]) => fetchRestaurantFeed({ restaurant_id: id })
  );

  console.log(posts);

  return (
    <div className="flex flex-col gap-y-12 h-full relative">
      {isLoading ? "Loading" : 
      (posts.length === 0 ? 
        "There are no posts for this restaurant"
        :
        posts.map((post,i)=> <Post key={i} {...post} />))
      }
    </div>
  );
}
