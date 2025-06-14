import React, { useEffect, useState } from 'react';
import { Search, Download, Eye, Trash, CircleCheckBig, CircleX, } from 'lucide-react';
import Input from '@/components/ui/Input';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import EditForm from './EditForm';
import { toast } from 'sonner';

export default function MobileRequestList() {
  const { data, deleteItem, updateItem, mutation } = useCollection('cfs_orders', {
    expand: 'containers,cfs'
  });
  const { user } = useAuth();
  console.log(data);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const filtered_Orders = data.filter(order => {
        const matchesSearch =
          order?.id?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          order?.consigneeName?.toLowerCase()?.includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
      setFilteredOrders(filtered_Orders);
    }
  }, [data, searchQuery]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (id, status = 'Pending') => {
    try {
      await updateItem(id, {
        status: status,
        golVerified: true,
        golVerifiedBy: user.id
      });
      toast.success('Updated the Order');
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    } finally {
      mutation()
    }
  }

  return (
    <div className="border rounded-xl flex flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <div className="px-4 py-8 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Input
              type="text"
              placeholder="Search by Order ID / Consignee Name"
              className="pl-8 w-full bg-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="px-4 pb-4">
          {filteredOrders.map((request, index) => (
            <div key={index} className="bg-[var(--accent)] rounded-lg p-3 mb-3 shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium"># {request.id}</div>
                <div className='flex gap-2 items-center'>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">Consignee: {request.consigneeName}</div>
              <div className="text-sm text-gray-600 mb-1">CHA: {request.chaName}</div>
              <p className="text-sm text-gray-600 mb-1">IGM:- {request.igmNo}</p>
              <p className="text-sm text-gray-600 mb-1">BL:-{request.blNo}</p>
              <p className="text-sm text-gray-600 mb-1">BOE: {request.boeNo}</p>
              <div className="flex justify-end items-center pt-4">
                <div className='flex gap-2 items-center'>
                  <Eye
                    size={18}
                    className="cursor-pointer text-primary"
                    onClick={() => console.log('View details for', request.id)}
                  />
                  <CircleCheckBig
                    size={18}
                    className="cursor-pointer text-primary"
                    onClick={() => handleStatusUpdate(request.id, request.status)}
                  />
                  <CircleX
                    size={18}
                    className="cursor-pointer text-primary"
                    onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                  />
                  <EditForm info={request} />
                  <Trash
                    size={18}
                    className="cursor-pointer text-primary"
                    onClick={async () => {
                      console.log('Delete details for', row.original.id);
                      const confirmation = confirm('Are you sure you want to delete this entry?');
                      if (confirmation) {
                        await deleteItem(request?.id);
                      }
                    }}
                  />
                  <Download
                    size={18}
                    className="cursor-pointer text-primary"
                    onClick={() => console.log('Download files for', request.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

