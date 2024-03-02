import pb from "./pocketbase";

/**
 *
 * @param {string} username
 * @param {string} password
 * @param {string} passwordConfirm
 */
export const register = async (username, password, passwordConfirm) => {
  await pb.collection("users").create({
    username: username,
    password: password,
    passwordConfirm: passwordConfirm,
  });
};

/**
 *
 * @param {string} username
 * @param {string} password
 */
export const login = async (username, password) => {
  await pb.collection("users").authWithPassword(username, password);
};

export const logout = async () => {
  pb.authStore.clear();
};

export const fetchRestaurantList = async () => {
  const records = await pb.collection("restaurants").getFullList();
  return records;
};

/**
 *
 * @param {string} id - The id of the restaurant
 * @returns
 */
export const fetchRestaurantMenu = async (id) => {
  const records = await pb.collection("menu_items").getFullList({
    filter: `restaurant_id="${id}"`,
  });
  return records;
};

export const fetchFeed = async () => {
  const posts = await pb.collection("posts").getFullList();
  return posts;
};

/**
 *
 * @param {Object} data
 * @param {string} [data.restaurant_id] - Id of the restaurant
 * @param {string} [data.menu_item_id] - Id of the item
 * @param {string} [data.description] - Post description
 * @param {number} [data.price] - Price
 * @param {string} [data.restaurant_name]
 * @param {string} [data.menu_item_name]
 */
export const createPost = async ({
  restaurant_id,
  menu_item_id,
  description,
  price,
  restaurant_name,
  menu_item_name,
}) => {
  const data = {
    user_id: pb.authStore.model.id ?? "",
    restaurant_id: "x779feov2qe4jjw" ?? "",
    menu_item_id: "2lebbedmqa3yg84" ?? "",
    description: description ?? "no description",
    price: 0.0 ?? "",
    restaurant_name: "Ate wendy's chicken blt woo" ?? "",
    menu_item_name: "" ?? "",
  };
  console.log(data);
  await pb.collection("posts").create(data);
};
