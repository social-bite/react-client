import { createPost } from "lib/api";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import useSWR from "swr";
import { fetchRestaurantList } from "lib/api";

export default function CreatePost() {
  const {
    data: restaurants,
    error,
    isLoading,
  } = useSWR("fetchRestaurantList", fetchRestaurantList);

  const [postData, setPostData] = useState({
    restaurant: "",
    description: "",
  });

  const [query, setQuery] = useState("");

  const filteredRestaurants =
    query === ""
      ? restaurants
      : restaurants?.filter((restaurant) => {
          return restaurant.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <Combobox
        value={postData.restaurant}
        onChange={(restaurant) =>
          setPostData({ ...postData, restaurant: restaurant })
        }
      >
        <Combobox.Input
          className="relative"
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
          displayValue={(restaurant) => restaurant.name}
        />
        <Combobox.Options className="overlay-panel fixed max-h-60">
          {filteredRestaurants?.length ? (
            filteredRestaurants?.map((restaurant) => (
              <Combobox.Option key={restaurant.id} value={restaurant}>
                {restaurant.name}
              </Combobox.Option>
            ))
          ) : (
            <span className="text-orange-1">No results found</span>
          )}
        </Combobox.Options>
      </Combobox>
      <input
        className="input-minimal"
        type="text"
        name="Description"
        placeholder="Description"
        onChange={(e) =>
          setPostData({
            ...postData,
            description: e.target.value,
          })
        }
      />
      <button className="btn-orange" onClick={createPost}>
        Upload
      </button>
    </div>
  );
}
