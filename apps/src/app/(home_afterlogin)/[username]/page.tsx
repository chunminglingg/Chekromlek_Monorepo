import { CreatePostDialog } from "@/components";
import { PostCardList } from "@/components/Organisms";

// app/[username]/page.tsx
interface UserPageProps {
    params: { username: string };
  }
  
  const UserPage: React.FC<UserPageProps> = ({ params }) => {
    const username = params.username;
  
    return (
      <>
        <div className="flex flex-col gap-2">
          <div className="pt-[15%] max-sm:pt-[30%]">
            <CreatePostDialog />
            <PostCardList />
          </div>
        </div>
      </>
    );
  };
  
  export default UserPage;
  