import { Copy } from "lucide-react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import Image from "next/image";

export function HideCard({ onHide }: { onHide: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="">
          <Image
            alt="option"
            src={"/icons/edit.svg"}
            width={20}
            height={20}
            className="hover:shadow-2xl hover:border hover:bg-slate-200 rounded-md "
          />
        </div>
      </DialogTrigger>
      <DialogContent className="items-center max-sm:w-[80%] rounded-md">
        <DialogHeader>
          <DialogTitle>Are Sure to hide this Post?</DialogTitle>
          <DialogDescription>
            {"You won't be able to see this Post "}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="md:justify-end max-sm:items-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={onHide}>
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
