import Agreement from "@/components/authentication/Agreement";
import { UserAuthForm } from "@/components/authentication/Authform";

function page() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log In
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your info below to log into your account
          </p>
        </div>
        <UserAuthForm />
        <Agreement />
      </div>
    </div>
  );
}

export default page;
