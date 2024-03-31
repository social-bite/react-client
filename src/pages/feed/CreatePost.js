import { createPost, fetchRestaurantMenu } from "lib/api";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import useSWR from "swr";
import { fetchRestaurantList } from "lib/api";
import { ReactComponent as ChevronUpDownIcon } from "assets/chevron-up-down.svg";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR(
    "fetchRestaurantList",
    fetchRestaurantList
  );

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [restaurantQuery, setRestaurantQuery] = useState("");

  const [menu, setMenu] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState(restaurants);
  const [menuQuery, setMenuQuery] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const sendCreatePost = () => {
    createPost({
      restaurant_id: selectedRestaurant.id,
      menu_item_id: selectedMenuItem.id,
      description: description,
      image: image,
    }).then(()=>{

      navigate(0);
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setRestaurants(data);
    }
  }, [isLoading]);

  useEffect(() => {
    setFilteredRestaurants(
      restaurantQuery === ""
        ? restaurants
        : restaurants?.filter((restaurant) => {
            return restaurant.name
              .toLowerCase()
              .includes(restaurantQuery.toLowerCase());
          })
    );
  }, [restaurantQuery, restaurants]);

  useEffect(() => {
    setRestaurantQuery(selectedRestaurant?.name ?? "");
    if (selectedRestaurant) {
      fetchRestaurantMenu(selectedRestaurant.id).then((response) => {
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
  }, [menuQuery, menu]);

  useEffect(() => {
    setMenuQuery(selectedMenuItem?.name ?? "");
  }, [selectedMenuItem]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="font-bold underline">Restaurants</div>
      <Combobox
        as="div"
        className="relative"
        value={selectedRestaurant}
        onChange={setSelectedRestaurant}
      >
        <Combobox.Input
          className="h-8 rounded-md bg-white text-black font-bold flex w-full justify-between items-center px-2"
          displayValue={(restaurant) => restaurant?.name}
          onChange={(event) => setRestaurantQuery(event.target.value)}
          autoComplete="off"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-800"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Combobox.Options className="overflow-y-scroll flex flex-col w-full absolute max-h-40 bg-black border-2 border-teal-1 divide-y-2 z-50">
          {filteredRestaurants.length === 0
            ? "No results found"
            : filteredRestaurants?.map((restaurant) => (
                <Combobox.Option
                  className="gap-y-2 hover:bg-gray-800 cursor-pointer"
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
        <>
          <div className="font-bold underline">Menu Item</div>
          <Combobox
            as="div"
            className="relative"
            value={selectedMenuItem}
            onChange={setSelectedMenuItem}
          >
            <Combobox.Input
              className="h-8 rounded-md bg-white text-black font-bold flex w-full justify-between items-center px-2"
              displayValue={(restaurant) => restaurant?.name}
              onChange={(event) => setMenuQuery(event.target.value)}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-800"
                aria-hidden="true"
              />
            </Combobox.Button>

            <Combobox.Options className="overflow-y-scroll flex flex-col w-full absolute max-h-40 bg-black border-2 border-teal-1 divide-y-2">
              {filteredMenu.length === 0
                ? "No results found"
                : filteredMenu?.map((item) => (
                    <Combobox.Option
                      className="gap-y-2 hover:bg-gray-800 cursor-pointer"
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
        </>
      )}
      <div className="font-bold underline">Description</div>

      <textarea
        className="px-2 py-1 text-black rounded-md"
        type="text"
        name="Description"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={uploadImage} />

      <button
        disabled={!selectedRestaurant || !selectedMenuItem}
        className="btn-orange"
        onClick={sendCreatePost}
      >
        Upload
      </button>
    </div>
  );
}
