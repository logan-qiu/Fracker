import { Separator } from "@/components/ui/separator";
import React from "react";
import ShareDialog from "@/components/Settings/ShareDialog";

function page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">About</h3>
        <p className="text-sm text-muted-foreground">
          This is a web app made by Logan
        </p>
      </div>
      <Separator />
      <div>
        <p className="text-lg text-muted-foreground">
          Thank you for using this app! If you have any questions, please feel
          free to submit a ticket or feedback!
        </p>
      </div>
      <div>
        <p className="text-lg text-muted-foreground mb-6">
          Like this app? Share your love with your friends and family!
        </p>
        <ShareDialog />
      </div>
    </div>
  );
}

export default page;
