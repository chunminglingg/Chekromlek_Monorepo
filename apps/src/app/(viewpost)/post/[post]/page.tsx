"use client";
import { useRouter } from "next/router";
import ViewPost from "@/components/Molecules/Post/ViewPost/ViewPost";
import { UserCard } from "@/components/Organisms/postCard/UserAnswer/UserCard";
import { useParams } from "next/navigation";

const ViewPostPage = () => {
  const router = useParams();
  const  post  = router.post;
  if (!post || typeof post !== "string") {
    console.log("Loading");
    return <div>Loading...</div>;
  }

  if (!router) {
    console.log("404");
    return <div>Post not found</div>;
  }

  return (
    <div className="max-sm:mt-[8%] sm:mt-[14%] md:mt-[12%] max-md:mt-[10%] lg:mt-[9%] min-lg:mt-[9%]">
      <div className="w-[430px] max-sm:w-[345px] max-sm:mt-[20%] min-sm:mt-[20%] h-auto border rounded-md translate-x-1 max-md:mt-[5%]">
        <div className="flex items-center justify-center mb-1">
          <UserCard
            profile="/imgs/profile.svg"
            hour={2}
            username="Hai Hai"
            caption="China's rise to become the second-largest economy in the world is the result of a combination of factors, including its large population, economic reforms, manufacturing prowess, infrastructure development, global trade integration, government policies, and investments in technology and innovation."
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPostPage;
