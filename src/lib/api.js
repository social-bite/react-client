import pb from "./pocketbase";

// /**
//  *
//  * @param {string} username
//  */
// export const checkUsername = async(username) => {
//   try {
//     const record = await pb.collection('users').getFirstListItem(`username="${username}"`);
//     console.log(record.username)
//     return false
//   } catch(error) {
//     return true
//   }
// }

/**
 *
 * @param {string} username
 * @param {string} password
 * @param {string} passwordConfirm
 */
export const register = async (first_name, last_name, username, password, passwordConfirm) => {
  await pb.collection("users").create({
    firstame: first_name,
    lastname: last_name,
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

export const logout = () => {
  pb.authStore.clear();
};

export const fetchRestaurantList = async () => {
  const records = await pb.collection("restaurants").getFullList();
  return {restaurants: records};
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

/**
 * 
 * @returns 
 */

export const fetchFeed = async () => {
  const records = await pb.collection("posts").getFullList({ requestKey: null })
  // Set image to the actual image path.
  for(const record of records){
    record.image = pb.files.getUrl(record, record.image);
    console.log(record.image)
  }
  return {posts: records}
}

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
export const createPost = async ({restaurant_id, menu_item_id, description, price, restaurant_name, menu_item_name}) => {
  const data={
    user_id: pb.authStore.model.id ?? '',
    restaurant_id: 'x779feov2qe4jjw' ?? '',
    menu_item_id: '2lebbedmqa3yg84' ?? '',
    description: description ?? 'no description',
    price: 0.00 ?? '',
    restaurant_name: "Ate wendy's chicken blt woo" ?? '',
    menu_item_name: "" ?? '',
  };
  // console.log(data);
  await pb.collection('posts').create(data)
}

export const fetchUser = async () => {
  let userData = await pb.collection('users').getFullList({ requestKey: null });
  const { avatar } = userData[0];
  const url = pb.files.getUrl(userData[0], avatar);
  return [userData[0], url];
}

export const updateProfile = async (userData) => {
  const { id } = userData;
  await pb.collection('users').update(`${id}`, userData);
}

// export const fetchUserPosts = async () => {
//   let newPosts = [...postData["posts"]]
//   for (let i = 0; i < postData["posts"].length; ++i) {
//     const { image } = postData["posts"][i]
//     const url = pb.files.getUrl(postData["posts"][i], image);
//     newPosts[i] = {...newPosts[i], image: url}
//   }
//   return {"posts": newPosts}
// }