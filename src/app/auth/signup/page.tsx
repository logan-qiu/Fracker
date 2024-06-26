import Agreement from "@/components/Authentication/Agreement";
import { UserRegisterForm } from "@/components/Authentication/Registerform";

function page() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your info below to create your account
          </p>
        </div>
        <UserRegisterForm />
        <Agreement />
      </div>
    </div>
  );
}

export default page;
