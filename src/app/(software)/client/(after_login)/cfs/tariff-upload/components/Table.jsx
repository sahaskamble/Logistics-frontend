import { DataTable } from '@/components/ui/Table';
import { Eye, Download, CircleCheckBig, CircleX } from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function RequestTable() {
  const { data, updateItem, mutation } = useCollection('cfs_tariffs_request', {
    expand: 'order,jobOrder,container,type'
  });
  const { user } = useAuth();

  const handleStatusUpdate = async (id, status = 'Pending') => {
    try {
      await updateItem(id, {
        status: status,
        merchantVerified: true,
        merchantVerifiedBy: user?.id
      });
      toast.success('Updated');
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    } finally {
      mutation()
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800 border border-green-500';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-500';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border border-red-500';
      default:
        return 'bg-gray-300 text-gray-800 border border-gray-800';
    }
  };

  const columns = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Entry ID',
      filterable: true,
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      id: 'Order ID',
      accessorKey: 'order',
      header: 'Order No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original.order}</div>,
    },
    {
      id: 'container',
      accessorKey: 'container',
      header: 'Container No.',
      filterable: true,
      cell: ({ row }) => <div>{row.original?.expand?.container?.containerNo}</div>,
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: 'Type',
      filterable: true,
      cell: ({ row }) => <div>{row.original?.type}</div>,
    },
    {
      id: 'fromDate',
      accessorKey: 'fromDate',
      header: 'From Date',
      filterable: true,
      cell: ({ row }) => <div>
        {
          new Date(row.original.fromDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        }
      </div>,
    },
    {
      id: 'toDate',
      accessorKey: 'toDate',
      header: 'To Date',
      filterable: true,
      cell: ({ row }) => <div>
        {
          new Date(row.original.toDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        }
      </div>,
    },
    {
      id: 'remarks',
      accessorKey: 'remarks',
      header: 'Remarks',
      filterable: true,
      cell: ({ row }) => <div>{row.original.remarks}</div>,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      filterable: true,
      cell: ({ row }) => (
        <div className={`px-2 py-1 text-xs rounded-full ${getStatusClass(row.original.status)}`}>
          {row.original.status}
        </div>
      ),
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Actions',
      filterable: false,
      cell: ({ row }) => (
        <div className='flex gap-2 items-center'>
          <Eye
            size={18}
            className="cursor-pointer text-primary"
            onClick={() => console.log('View details for', row.original.id)}
          />
          <CircleCheckBig
            size={18}
            className="cursor-pointer text-primary"
            onClick={() => handleStatusUpdate(row.original.id, 'Accepted')}
          />
          <CircleX
            size={18}
            className="cursor-pointer text-primary"
            onClick={() => handleStatusUpdate(row.original.id, 'Rejected')}
          />
          <Download
            size={18}
            className="cursor-pointer text-primary"
            onClick={() => console.log('Download files for', row.original.id)}
          />
        </div>
      ),
    }
  ];


  return (
    <div className="border-2 bg-accent p-4 rounded-xl mt-8">
      <h1 className="text-lg font-semibold">Requests List</h1>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
};
