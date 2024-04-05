import { z } from "zod";
import { columns } from "@/components/Transaction/columns";
import DataTable from "@/components/DataTable/DataTable";
import { transactionSchema, type Transaction } from "@/components/common/schema";
import { promises as fs } from "fs";

async function getTransactions() {
  const data = await fs.readFile(
    "./src/components/Transaction/mock_transactions.json",
    "utf8"
  );
  const tasks = JSON.parse(data.toString());

  return z.array(transactionSchema).parse(tasks);
}

const TransactionsPage = async () => {
  const transactions: Transaction[] = await getTransactions();

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your transactions for this month!
            </p>
          </div>
        </div>
        <DataTable data={transactions} columns={columns} />
      </div>
    </>
  );
};

export default TransactionsPage;
