import { ReactComponent as UserIcon } from "assets/user.svg";

export default function Post({
  description,
  created,
  image,
  username,
  restaurant_name,
}) {
  const timeElapsed = (Date.now() - Date.parse(created)) / 3600000;
  return (
    <div className="flex flex-col relative gap-y-2">
      <div className="flex items-center gap-x-2">
        <UserIcon className="h-10 w-10 bg-gray-800  text-teal-1 rounded-full" />
        <div className="flex flex-col">
          <p>{username}</p>
          <p className="text-sm">@{restaurant_name}</p>
        </div>
      </div>
      <p>{description}</p>
      {image && (

      <img className="rounded-md max-w-60" src={image} alt="post" />
      )}
    </div>
  );
}
