import { Typography } from "../../Atoms/Typography/Typography";
import { Button } from "../../Atoms/Button/Button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

import Image from "next/image";
import Link from "next/link";
import { PostCardList } from "../../Organisms";
import Like from "../../Atoms/Like/Like";

export function Alert() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PostCardList />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <Typography color="primary" fontSize="caption">
            Welcome to Chekromlek
          </Typography>
          <Image
            alt="panel"
            src={"/login/alert.svg"}
            width={154}
            height={133}
            className="max-sm:w-[80px] max-sm:h-[100px]"
          />

          <div>
            <Typography color="secondary" align="center" fontSize="normal">
              Please Sign Up Before you try something{" "}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link href={"/signup/"}>
            <Button colorScheme="primary">
              <Typography color="submit">Sign Up</Typography>
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
