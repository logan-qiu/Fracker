import { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminLayout } from "@/components/layout/Admin";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "SaaS Admin Starter",
  description: "Authentication forms built using tailwind, shadcn.",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await auth();
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false;

  console.log({ layout, defaultLayout, collapsed });
  return (
    <AdminLayout
      session={session}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    >
      {children}
    </AdminLayout>
  );
}