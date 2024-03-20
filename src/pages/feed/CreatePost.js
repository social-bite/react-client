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

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);


  const [postData, setPostData] = useState({
    restaurant: "",
    description: "",
  });

  console.log(restaurants);

  const [query, setQuery] = useState("");

  const filteredRestaurants =
    query === ""
      ? restaurants
      : restaurants?.filter((restaurant) => {
          return restaurant.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <Combobox value={selectedRestaurant} onChange={setSelectedRestaurant}>
        <Combobox.Input
          className="h-8 rounded-md bg-white text-black font-bold flex w-full justify-between items-center"
          displayValue={(restaurant) => restaurant?.name}
          onChange={(event) => setQuery(event.target.value)}
        />

        <Combobox.Options className="overflow-y-scroll w-full absolute max-h-40 mt-8 bg-black border-2 border-teal-1">
          {filteredRestaurants.length === 0
            ? "No results found"
            : filteredRestaurants?.map((restaurant) => (
                <Combobox.Option key={restaurant.id} value={restaurant}>
                  {restaurant.name}
                </Combobox.Option>
              ))}
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
