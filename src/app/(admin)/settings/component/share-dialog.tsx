"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, CopyCheck } from "lucide-react";
import { MouseEventHandler, useState } from "react";

function ShareDialog() {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText("https://some.url");
    setIsCopied(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <DialogTitle>Share Link</DialogTitle>
            <DialogDescription>
              Anyone with this link caan view this.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue="https://some.url" readOnly />
          </div>
          <Button onClick={handleCopy} size="sm" className="px-3">
            {isCopied ? (
              <>
                <CopyCheck className="h-4 w-4" />
                <span className="ml-1">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="ml-1">Copy</span>
              </>
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
