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
      {/* <div className="w-60 h-60 bg-white"></div> */}
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
          <Dialog.Panel className="bg-black text-white p-4 mx-5 rounded max-h-96 max-w-2xl w-full border-teal-2 border-2 flex flex-col">
            <Dialog.Title className="border-b-teal-1 border-b-2 mb-2">
              <div>{name}</div>
              <div>{address}</div>
            </Dialog.Title>

            <div className="overflow-y-scroll">
              {isLoading ? (
                <>Loading...</>
              ) : (
                menu?.map((item) => {
                  return (
                    <div key={item.id}>
                      ${item.price} - {item.name}
                    </div>
                  );
                })
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
