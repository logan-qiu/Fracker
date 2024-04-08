"use client";

import {
  PanelsTopLeft,
  WalletCards,
  PieChart,
  UsersRound,
  Settings,
  SquareKanban,
  ArrowRightLeft,
} from "lucide-react";
import { Icons } from "@/components/common/Icons";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/layout/Nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Profile } from "./Profile";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Session } from "next-auth";
import Image from "next/image.js";
import { useState } from "react";
import { ColorModeToggle } from "../ColorMode/ColorModeToggleButton";

interface AdminLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  session: Session | null;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  defaultLayout = [226, 1213], // 1440 - 226 - 1
  defaultCollapsed,
  navCollapsedSize,
  session,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    defaultCollapsed ?? false
  );

  // console.log({ defaultLayout });

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          // console.log({ sizes });
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={15}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            "h-screen",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {isCollapsed ? (
              <Icons.logo />
            ) : (
              <>
                <Icons.logo />
                <Image
                  priority
                  src="/icons/Fracker.svg"
                  alt="fracker logo"
                  height={100}
                  width={150}
                />
              </>
            )}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            //TODO: need to change the variant based on the selection
            links={[
              {
                title: "Overview",
                icon: PanelsTopLeft,
                url: "/dashboard",
              },
              {
                title: "Account",
                icon: WalletCards,
              },
              {
                title: "Transaction",
                icon: ArrowRightLeft,
                url: "/transactions",
              },
              {
                title: "Recent",
                icon: PieChart,
              },
              {
                title: "Category",
                icon: SquareKanban,
              },
              {
                title: "Users",
                icon: UsersRound,
                url: '/users'
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Settings",
                icon: Settings,
                url: "/settings",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* minSize={1174} */}
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <div className="border-b">
            <div className="flex h-[52px] items-center px-4">
              <div className="ml-auto flex items-center space-x-4">
                <ColorModeToggle />
                <Profile session={session} />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
