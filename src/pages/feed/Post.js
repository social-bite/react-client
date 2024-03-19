export default function Post({ description, created }) {
  return (
    <>
      <p>{created}</p>
      <p>{description}</p>
    </>
  );
}
