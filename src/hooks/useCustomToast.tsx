'use client';

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ToastActionProps {
    altText: string;
    children: React.ReactNode;
  }

interface CustomToastProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "default" | "destructive";
  title: string;
  description: string;
  action?: ToastActionProps;
}

export function useCustomToast() {
    const { toast } = useToast();
  
    return {
      showToast: ({
        type = "destructive",
        title,
        description,
        action = {
          altText: "Alt Text",
          children: "Try again",
        },
      }: CustomToastProps) =>
        toast({
          variant: type,
          title: title,
          description: description,
          duration: 3000,
          action: (
            <ToastAction altText={action.altText}>{action.children}</ToastAction>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        }),
    };
  }