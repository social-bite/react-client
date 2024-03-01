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
 * @param {string} id The id of the restaurant
 * @returns
 */
export const fetchRestaurantMenu = async (id) => {
  const records = await pb.collection("menu_items").getFullList({
    filter: `restaurant_id="${id}"`,
  });
  return records;
};
