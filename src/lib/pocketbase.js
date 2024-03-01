import PocketBase from "pocketbase";

// const pb = new PocketBase(process.env.REACT_APP_POCKETBASE_URL);
const pb = new PocketBase("https://meals-on-a-budget.pockethost.io");

export default pb;
