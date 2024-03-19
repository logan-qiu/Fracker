import { Transaction, columns } from '../../transactions/columns';
import { DataTable } from '../../../components/ui/data-table';

const getData = async() => {
    return [
        {
            amount: 100,
            transaction_date: '11/13/2023',
        },
        {
            amount: 120,
            transaction_date: '11/23/2023'
        }
    ]
};

const DemoPage = async() => {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}

export default DemoPage;