interface StatusProps {
  likes: number | undefined;
  views: number | undefined;
}

const Status = ({ likes, views }: StatusProps) => {
  return (
    <>
      <span>
        {likes} {likes === 1 ? "like" : "likes"}
      </span>
      <span>•</span>
      <span>
        {views} {views === 1 ? "view" : "views"}
      </span>
    </>
  );
};

export default Status;
