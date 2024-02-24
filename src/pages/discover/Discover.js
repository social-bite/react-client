import { useEffect, useState } from "react";
import { API_URL } from "../../utils/utils";
import Restaurant from "./Restaurant";

export default function Discover() {
  const [restaurants, setRestaurants] = useState([]);

  // On mount, fetch the restaurant information
  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(API_URL + "/api/discover/restaurants/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    };
    fetchRestaurants().then((data) => setRestaurants(data.restaurantData));
  }, []);
  return (
    <div className="flex flex-col overflow-y-scroll gap-y-4">
      {restaurants.map((restaurant) => {
        return <Restaurant key={restaurant.id} {...restaurant} />;
      })}
    </div>
  );
}
