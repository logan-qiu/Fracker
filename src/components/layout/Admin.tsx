"use client";
import * as React from "react";
import {
  PanelsTopLeft,
  WalletCards,
  PieChart,
  UsersRound,
  Settings,
  Landmark,
  SquareKanban,
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
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(
    defaultCollapsed ?? false
  );

  // console.log({ defaultLayout });

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          // console.log({ sizes });
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className='h-full items-stretch'
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
                <Icons.logo /> <span className='font-bold ml-1'>Fracker</span>
              </>
            )}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Overview",
                icon: PanelsTopLeft,
                variant: "default",
              },
              {
                title: "Account",
                icon: WalletCards,
                variant: "ghost",
              },
              {
                title: "Bank",
                icon: Landmark,
                variant: "ghost",
              },
              {
                title: "Recent",
                icon: PieChart,
                variant: "ghost",
              },
              {
                title: "Category",
                icon: SquareKanban,
                variant: "ghost",
              },
              {
                title: "User",
                icon: UsersRound,
                variant: "ghost",
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
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* minSize={1174} */}
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <div className='border-b'>
            <div className='flex h-[52px] items-center px-4'>
              <div className='ml-auto flex items-center space-x-4'>
                <Profile session={session} />
              </div>
            </div>
          </div>
          <div className='flex-1 space-y-4 p-8 pt-6'>{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};