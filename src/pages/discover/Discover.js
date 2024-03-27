import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Menu } from "@headlessui/react";
import Restaurant from "./Restaurant";

export default function Discover() {
  const { restaurants } = useLoaderData();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setFilteredRestaurants(
      query === ""
        ? restaurants
        : restaurants.filter((restaurant) => {
          return restaurant.name.toLowerCase().includes(query.toLowerCase());
        })
    );
  }, [query, restaurants]);

  useEffect(() => {
    setQuery(selectedRestaurant?.name ?? "")
  }, [selectedRestaurant])

  const getRandomRestaurant = () => {
    let index = Math.floor(Math.random() * restaurants.length);
    setQuery(restaurants[index].name);
    setSelectedRestaurant(restaurants[index]);
  };

  const onUserSelectRestaurant = (value) => {
    setSelectedRestaurant(value);
    setQuery(value.name);
    setIsMenuOpen(false);
  }

  const leaveFocusOnEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
    }
  }

  const onInputBlur = (e) => {
    if (e.relatedTarget) {
      e.preventDefault();
    }
    else {
      setIsMenuOpen(false);
    }
  }

  return (
    <div className="flex flex-col gap-y-3 h-full relative">
      <div className="flex gap-x-2">
        <Menu>
          <input className="h-8 rounded-md bg-white text-black font-bold flex w-full justify-between items-center"
            value={query} onKeyUp={leaveFocusOnEnter} onBlur={onInputBlur} onFocus={() => setIsMenuOpen(true)} onChange={(event) => setQuery(event.target.value)} />
          {isMenuOpen && (
            <Menu.Items static className="overflow-y-scroll w-full absolute max-h-40 mt-8 bg-black border-2 border-teal-1 flex flex-col">
              {
                filteredRestaurants.length === 0
                  ? "No results found"
                  : filteredRestaurants?.map((restaurant) => (
                    <Menu.Item as="button" className="text-left" key={restaurant.id} value={restaurant} onClick={() => onUserSelectRestaurant(restaurant)}>
                      {restaurant.name}
                    </Menu.Item>
                  ))
              }
            </Menu.Items>
          )}

        </Menu>

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
