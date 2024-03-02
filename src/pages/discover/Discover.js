import Restaurant from "./Restaurant";
import { fetchRestaurantList } from "lib/api";
import useSWR from "swr";

export default function Discover() {
  const {
    data: restaurants,
    error,
    isLoading,
  } = useSWR("fetchRestaurantList", fetchRestaurantList);
  return (
    <div className="">
      {restaurants?.map((restaurant) => {
        return <Restaurant key={restaurant.id} {...restaurant} />;
      })}
    </div>
  );
}
