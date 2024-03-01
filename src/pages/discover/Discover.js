import { useLoaderData } from "react-router";
import Restaurant from "./Restaurant";

export default function Discover() {
  const restaurants  = useLoaderData();
  
  return (
    <div className="">
      {restaurants.map((restaurant) => {
        return <Restaurant key={restaurant.id} {...restaurant} />;
      })}
    </div>
  );
}
