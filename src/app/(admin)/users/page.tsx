import React from 'react';
import { promises as fs } from 'fs';
import { User, userSchema } from '@/components/common/schema';
import { z } from 'zod';
import DataTable from '@/components/DataTable/DataTable';
import { columns } from '@/components/Users/columns';

const getUsers = async () => {
  // import the mock data for now
  const data = await fs.readFile(
    './src/components/Users/userData.json',
    'utf-8'
  );
  const users = JSON.parse(data);
  return z.array(userSchema).parse(users);
};

async function UserPage() {
  const data: User[] = await getUsers();
  return (
    <>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Manage associated users here!
            </p>
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}

export default UserPage;
