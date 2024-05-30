import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

export function EditCard({onHide}: { onHide: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
            <Image
                alt="option"
                src={"/icons/cancel.svg"}
                width={20}
                height={20}
                className="hover:shadow-2xl hover:border rounded-md "
              />
              </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are Sure to hide this Post?</DialogTitle>
          <DialogDescription>
          { "You won't be able to see this Post "} 
          </DialogDescription>
        </DialogHeader>
      
        <DialogFooter className="sm:justify-end">
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