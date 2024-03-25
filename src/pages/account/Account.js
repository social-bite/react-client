import React from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router-dom";
// import Logo from "assets/selfie.jpg";

function Account() {
  const navigate = useNavigate()
  const { avatar, posts, firstname, lastname, id } = useLoaderData();

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
          <div className="mb-4">
            { firstname + " " + lastname }
          </div>
          <button onClick={() => navigate('edit-profile')} className="btn-teal">Edit Profile</button>
        </div>
      </div>
      { posts ? (
          <div className="grid grid-cols-3 gap-4 pt-8">
            { posts.map((ele, index) => {
                if (ele["username"] === id) {
                  return (<img className="flex justify-center items-center w-32 h-32 object-cover" alt="post_img" key={index} src={ele["image"]}></img>)
                }
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
