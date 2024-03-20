import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Combobox } from "@headlessui/react";
import Restaurant from "./Restaurant";

import { ReactComponent as SearchIcon } from "assets/search.svg";

export default function Discover() {
  const { restaurants } = useLoaderData();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  useEffect(() => {
    setFilteredRestaurants(
      query === ""
        ? restaurants
        : restaurants.filter((restaurant) => {
            return restaurant.name.toLowerCase().includes(query.toLowerCase());
          })
    );
  }, [query]);

  useEffect(()=>{
    setQuery(selectedRestaurant?.name ?? "")
  },[selectedRestaurant])

  const getRandomRestaurant = () => {
    let index = Math.floor(Math.random() * restaurants.length);
    setQuery(restaurants[index].name);
    setSelectedRestaurant(restaurants[index]);
  };

  return (
    <div className="flex flex-col gap-y-3 h-full relative">
      <div className="flex gap-x-2">
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
        <button
          onClick={getRandomRestaurant}
          className="bg-orange-1 rounded-md"
        >
          Random
        </button>
      </div>
      <div className="flex flex-col gap-y-2 shrink overflow-y-scroll h-full">
        {filteredRestaurants?.map((restaurant) => {
          return <Restaurant key={restaurant.id} {...restaurant} />;
        })}
      </div>
    </div>
  );
}
