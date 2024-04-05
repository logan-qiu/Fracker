import { Separator } from '@/components/ui/separator';
import AccountForm from '@/components/Settings/AccountForm';


function page() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Account</h3>
        <p className='text-sm text-muted-foreground'>
          Update your account information here
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}

export default page;
