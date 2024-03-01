import pb from "./pocketbase";

export const login = async (username, password) => {
    await pb.collection("users").authWithPassword(username, password);
}

export const logout = async () => {
    pb.authStore.clear();
}