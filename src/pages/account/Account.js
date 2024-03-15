import React, { useEffect, useState } from "react";
import { fetchUser, fetchFeed } from "lib/api";
import pb from "../../lib/pocketbase.js";
// import Logo from "assets/selfie.jpg";

function Account() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar: null,
    posts: null,
  });

  const [links, setLinks] = useState(false);

  async function fetchData() {
    try{
      const userData = await fetchUser();
      const { username, email } = userData[0];
      return {
        username: username,
        email: email,
        avatar: userData[1],
      }
    } catch(error) {
      console.log("fetchData didn't work", error);
    }
  }

  async function fetchPost() {
    try{
      const posts = await fetchFeed();
      return {
        posts: posts,
      }
    } catch(error) {
      console.log("fetchData didn't work", error);
    }
  }

  function fetchPostImg(postData) {
    let newPosts = [...postData["posts"]]
    for (let i = 0; i < postData["posts"].length; ++i) {
      const { image } = postData["posts"][i]
      const url = pb.files.getUrl(postData["posts"][i], image);
      newPosts[i] = {...newPosts[i], image: url}
    }
    return {"posts": newPosts}
  }

  async function loadData() {
    try {
      let postData = await fetchPost()
      const postImg = fetchPostImg(postData)
      const userData = await fetchData()
      setUser({
        ...userData,
        ...postImg,
      })
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div id="basic_info" className="flex mt-[5rem] items-center pl-">
        <div className="w-1/4 mr-[2rem] relative object-cover pt-[25%]">
          {user["avatar"] ? (
            <img className="rounded-full absolute inset-0 w-full h-full object-cover" alt="avatar" src={user["avatar"]} />
          ) : (
            <p> ... Loading</p>
          )}
        </div>
        <div>
          {user["username"]}
        </div>
      </div>
      { user["posts"] ? (
          <div className="grid grid-cols-3 gap-4 pt-8">
            {user["posts"].map((ele, index) => {
              return (<img className="flex justify-center items-center" key={index} src={ele["image"]}></img>)
            })}
          </div>
        ) : (
          <div>
            ... Loading
          </div>
        )
      }
    </div>
  );
}

export default Account;
