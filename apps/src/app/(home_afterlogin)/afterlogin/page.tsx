import { CreatePostDialog } from "@/components";
import { PostCard, PostCardList } from "@/components/Organisms";

const UserPage = () => {

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="pt-[15%] max-sm:pt-[30%]">
          <CreatePostDialog  />
          <PostCardList />
        </div>
      </div>
    </>
  );
};

export default UserPage;
