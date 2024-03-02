import { createPost } from "lib/api";
import { useState } from "react";

export default function CreatePost() {
  const [postData, setPostData] = useState({
    description: "",
  });

  return (
    <div>
      <input
        className="input-minimal"
        type="text"
        name="Description"
        placeholder="Description"
        onChange={(e) =>
          setPostData({
            ...postData,
            description: e.target.value,
          })
        }
      />
      <button className="btn-orange" onClick={createPost}>
        Upload
      </button>
    </div>
  );
}
