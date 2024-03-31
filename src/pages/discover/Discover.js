import { useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import Restaurant from "./Restaurant";
import useSWR from "swr";
import { fetchRestaurantList } from "lib/api";

export default function Discover() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [filterPriceBy, setFilterPriceBy] = useState("max"); // max or median
  const [tempFilterPriceBy, setTempFilterPriceBy] = useState("max");
  const [price, setPrice] = useState(0);
  const [tempPrice, setTempPrice] = useState(0);

  const { data: restaurants } = useSWR(
    ["/fetchRestaurantList", price, filterPriceBy],
    ([url, price, filterPriceBy]) =>
      fetchRestaurantList(
        filterPriceBy === "max" ? { maxPrice: price } : { medianPrice: price }
      )
  );
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  useEffect(() => {
    setFilteredRestaurants(
      query === ""
        ? restaurants
        : restaurants?.filter((restaurant) => {
            return restaurant.name.toLowerCase().includes(query.toLowerCase());
          })
    );
  }, [query, restaurants]);

  useEffect(() => {
    setQuery(selectedRestaurant?.name ?? "");
  }, [selectedRestaurant]);

  const getRandomRestaurant = () => {
    let index = Math.floor(Math.random() * restaurants?.length);
    setQuery(restaurants[index].name);
    setSelectedRestaurant(restaurants[index]);
  };

  const onUserSelectRestaurant = (value) => {
    setSelectedRestaurant(value);
    setQuery(value.name);
    setIsMenuOpen(false);
  };

  const leaveFocusOnEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.target.blur();
    }
  };

  const onInputBlur = (e) => {
    if (e.relatedTarget) {
      e.preventDefault();
    } else {
      setIsMenuOpen(false);
    }
  };

  const onPriceChange = (e) => {
    setTempPrice(e.target.value);
  };

  const onUpdatePrice = () => {
    setFilterPriceBy(tempFilterPriceBy);
    setPrice(tempPrice);
  };

  return (
    <div className="flex flex-col gap-y-3 h-full relative">
      <div className="flex gap-x-2">
        <Menu>
          <input
            className="h-8 rounded-md bg-white text-black font-bold flex w-full justify-between items-center"
            value={query}
            onKeyUp={leaveFocusOnEnter}
            onBlur={onInputBlur}
            onFocus={() => setIsMenuOpen(true)}
            onChange={(event) => setQuery(event.target.value)}
          />
          {isMenuOpen && (
            <Menu.Items
              static
              className="overflow-y-scroll w-full absolute max-h-40 mt-8 bg-black border-2 border-teal-1 flex flex-col"
            >
              {filteredRestaurants?.length
                ? filteredRestaurants?.map((restaurant) => (
                    <Menu.Item
                      as="button"
                      className="text-left"
                      key={restaurant.id}
                      value={restaurant}
                      onClick={() => onUserSelectRestaurant(restaurant)}
                    >
                      {restaurant.name}
                    </Menu.Item>
                  ))
                : "No results found"}
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
      <Disclosure>
        <Disclosure.Button className="rounded-md block bg-orange-1">
          Filter Options
        </Disclosure.Button>
        <Disclosure.Panel>
          <div className="flex flex-col gap-y-1">
            <div className="flex">
              <button
                onClick={() => setTempFilterPriceBy("max")}
                disabled={tempFilterPriceBy === "max"}
                className="disabled:bg-orange-1 rounded-md p-1 border-2 border-black enabled:hover:border-2 enabled:hover:border-orange-1"
              >
                Max Price
              </button>
              <button
                onClick={() => setTempFilterPriceBy("median")}
                disabled={tempFilterPriceBy === "median"}
                className="disabled:bg-orange-1 rounded-md p-1 border-2 border-black enabled:hover:border-2 enabled:hover:border-orange-1"
              >
                Median Price
              </button>
            </div>
            <input
              className="text-black rounded-md px-2 max-w-24"
              value={tempPrice}
              onChange={onPriceChange}
              type="number"
            />
            <div>
              <button
                disabled={
                  tempPrice === price && tempFilterPriceBy === filterPriceBy
                }
                onClick={onUpdatePrice}
                className="disabled:bg-slate-600 bg-orange-1 rounded-md p-1 hover:bg-orange-2"
              >
                Update
              </button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <div className="flex flex-col gap-y-2 shrink overflow-y-scroll h-full">
        {filteredRestaurants?.map((restaurant) => {
          return <Restaurant key={restaurant.id} {...restaurant} />;
        })}
      </div>
    </div>
  );
}
