import React from "react";
import { useLoaderData } from "react-router";
// import Logo from "assets/selfie.jpg";

function Account() {
  const {avatar, email, firstname, lastname, posts, url, username} = useLoaderData();

  return (
    <div>
      <div id="basic_info" className="flex mt-[5rem] items-center pl-">
        <div className="w-1/4 mr-[2rem] relative object-cover pt-[25%]">
          {avatar ? (
            <img className="rounded-full absolute inset-0 w-full h-full object-cover" alt="avatar" src={avatar} />
          ) : (
            <p> ... Loading</p>
          )}
        </div>
        <div>
          { username }
        </div>
      </div>
      { posts ? (
          <div className="grid grid-cols-3 gap-4 pt-8">
            { posts.map((ele, index) => {
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
