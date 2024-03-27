import { useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import Restaurant from "./Restaurant";
import useSWR from 'swr'
import { fetchRestaurantList } from "lib/api";


export default function Discover() {

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(0);
  const [medianPrice, setMedianPrice] = useState(0);
  const [tempMedianPrice, setTempMedianPrice] = useState(0);
  const { data: restaurants } = useSWR(['/fetchRestaurantList', maxPrice, medianPrice], ([url, maxPrice, medianPrice]) => fetchRestaurantList({ maxPrice: maxPrice, medianPrice: medianPrice }));
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
    setQuery(selectedRestaurant?.name ?? "")
  }, [selectedRestaurant])

  const getRandomRestaurant = () => {
    let index = Math.floor(Math.random() * restaurants?.length);
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

  const onMaxPriceChange = e => {
    console.log(e.target.value);
    setTempMaxPrice(e.target.value);
  }

  const onMedianPriceChange = e => {
    console.log(e.target.value);
    setTempMedianPrice(e.target.value);
  }

  const onUpdatePrice = () => {
    setMaxPrice(tempMaxPrice);
    setMedianPrice(tempMedianPrice);
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
                filteredRestaurants?.length
                  ? filteredRestaurants?.map((restaurant) => (
                    <Menu.Item as="button" className="text-left" key={restaurant.id} value={restaurant} onClick={() => onUserSelectRestaurant(restaurant)}>
                      {restaurant.name}
                    </Menu.Item>
                  ))
                  : "No results found"
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
      <Disclosure>
        <Disclosure.Button className="rounded-md block bg-orange-1">
          Filter Options
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          <div className="grid grid-rows-2 grid-flow-col gap-x-4">
            <span>Max Price</span>
            <input className="text-black" value={tempMaxPrice} onChange={onMaxPriceChange} type="number" />

            <span>Median Price</span>
            <input className="text-black" value={tempMedianPrice} onChange={onMedianPriceChange} type="number" />
            <span></span>

            <button
              onClick={onUpdatePrice}
              className="bg-orange-1 rounded-md"
            >
              Update
            </button>

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
