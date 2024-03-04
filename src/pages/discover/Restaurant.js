import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { fetchRestaurantMenu } from "lib/api";
import useSWR from "swr";

export default function Restaurant({
  id,
  name,
  address,
  close_time,
  open_time,
  min_price,
  max_price,
}) {
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: menu,
    error,
    isLoading,
  } = useSWR(isOpen ? `fetchMenu/${id}` : null, () => fetchRestaurantMenu(id));

  const openMenuDialog = async () => {
    setIsOpen(true);
  };

  return (
    <div>
      <p>{name}</p>
      <p>{address ? address : "No address available"}</p>
      <p>
        ${min_price} - ${max_price}
      </p>
      <div className="w-60 h-60 bg-white"></div>
      <button
        className="btn-teal"
        onClick={() => {
          openMenuDialog();
        }}
      >
        See Menu
      </button>
      <Dialog
        className="relative z-50"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-70">
          <Dialog.Panel className="bg-black text-white p-5 mx-5 rounded max-h-96 max-w-2xl w-full border-teal-2 border-2 overflow-y-scroll">
            <Dialog.Title>{name}</Dialog.Title>
            {menu?.map((item) => {
              return (
                <div key={item.id}>
                  ${item.price} - {item.name}
                </div>
              );
            })}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
