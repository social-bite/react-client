import { createPost, fetchRestaurantMenu } from "lib/api";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import useSWR from "swr";
import { fetchRestaurantList } from "lib/api";

export default function CreatePost() {
  const { data, error, isLoading } = useSWR(
    "fetchRestaurantList",
    fetchRestaurantList
  );

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [query, setQuery] = useState("");

  const [menu, setMenu] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState(restaurants);
  const [menuQuery, setMenuQuery] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setRestaurants(data.restaurants);
    }
  }, [isLoading]);

  useEffect(() => {
    setFilteredRestaurants(
      query === ""
        ? restaurants
        : restaurants?.filter((restaurant) => {
            return restaurant.name.toLowerCase().includes(query.toLowerCase());
          })
    );
  }, [query]);

  useEffect(() => {
    setQuery(selectedRestaurant?.name ?? "");
    if (selectedRestaurant) {
      fetchRestaurantMenu(selectedRestaurant.id).then((response) => {
        console.log(response);
        setMenu(response);
      });
    }
  }, [selectedRestaurant]);

  useEffect(() => {
    setFilteredMenu(
      menuQuery === ""
        ? menu
        : menu?.filter((item) => {
            return item.name.toLowerCase().includes(menuQuery.toLowerCase());
          })
    );
  }, [menuQuery]);

  useEffect(() => {
    setMenuQuery(selectedMenuItem?.name ?? "");
  }, [selectedMenuItem]);

  const [postData, setPostData] = useState({
    restaurant: "",
    description: "",
  });

  return (
    <div>
      <Combobox
        as="div"
        className="relative"
        value={selectedRestaurant}
        onChange={setSelectedRestaurant}
      >
        <Combobox.Input
          className="h-8 rounded-md bg-white text-black font-bold flex w-full justify-between items-center"
          displayValue={(restaurant) => restaurant?.name}
          onChange={(event) => setQuery(event.target.value)}
        />

        <Combobox.Options className="overflow-y-scroll flex flex-col w-full absolute max-h-40 bg-black border-2 border-teal-1 divide-y-2 z-50">
          {filteredRestaurants.length === 0
            ? "No results found"
            : filteredRestaurants?.map((restaurant) => (
                <Combobox.Option
                  className="gap-y-2"
                  key={restaurant.id}
                  value={restaurant}
                >
                  <div>{restaurant.name}</div>
                  <div className="text-sm">{restaurant.address}</div>
                </Combobox.Option>
              ))}
        </Combobox.Options>
      </Combobox>
      {selectedRestaurant && (
        <Combobox
          as="div"
          className="relative"
          value={selectedMenuItem}
          onChange={setSelectedMenuItem}
        >
          <Combobox.Input
            className="h-8 rounded-md bg-white text-black font-bold flex w-full justify-between items-center"
            displayValue={(restaurant) => restaurant?.name}
            onChange={(event) => setMenuQuery(event.target.value)}
          />

          <Combobox.Options className="overflow-y-scroll flex flex-col w-full absolute max-h-40 bg-black border-2 border-teal-1 divide-y-2">
            {filteredMenu.length === 0
              ? "No results found"
              : filteredMenu?.map((item) => (
                  <Combobox.Option
                    className="gap-y-2"
                    key={item.id}
                    value={item}
                  >
                    <div>
                      ${item.price} - {item.name}
                    </div>
                  </Combobox.Option>
                ))}
          </Combobox.Options>
        </Combobox>
      )}
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
