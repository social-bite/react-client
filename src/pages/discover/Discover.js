import { useEffect, useState } from "react";
import { fetchRestaurantList } from "lib/api";
import Restaurant from "./Restaurant";

export default function Discover() {
  const [restaurants, setRestaurants] = useState([]);

  // On mount, fetch the restaurant information
  useEffect(() => {
    fetchRestaurantList().then((r)=>{
      setRestaurants(r);
    });
  }, []);
  return (
    <div className="">
      {restaurants.map((restaurant) => {
        return <Restaurant key={restaurant.id} {...restaurant} />;
      })}
    </div>
  );
}
