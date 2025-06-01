import React, { useEffect, useState } from 'react';
import { Search, Download, Eye, Trash, } from 'lucide-react';
import Input from '@/components/ui/Input';
import Form from './Form';
import EditForm from './EditForm';
import { useCollection } from '@/hooks/useCollection';

export default function MobileTable() {
  const { data, deleteItem } = useCollection('cfs_order_movement', {
    expand: 'order'
  });

  const [filteredData, setFilteredData] = useState([]);
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (data?.length > 0) {
      setFilteredData(data)
    }
  }, [data]);


  useEffect(() => {
    if (filteredData?.length > 0) {
      const filtered_data = filteredData.filter(entry => {
        const matchesSearch =
          entry?.order.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
      setFilteredMovements(filtered_data);
    }
  }, [data, filteredData, searchQuery])


  return (
    <div className="border rounded-xl bg-accent flex flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold text-foreground mb-4">Order Movements</h2>
        <div className="flex justify-end items-center my-4">
          <Form />
        </div>

        <div className="px-4 py-8 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Input
              type="text"
              placeholder="Search by Order Id"
              className="pl-8 w-full bg-accent text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="px-4 pb-4">
          {filteredMovements.map((request, index) => (
            <div key={index} className="border rounded-lg p-3 mb-3 shadow-sm">
              <h1 className="font-medium">Order: {request?.order}</h1>
              <p className="text-sm font-semibold text-gray-600 mb-1">Order Status: {request?.status}</p>
              <p className="text-sm text-gray-600 mb-1">
                Date: {
                  new Date(request?.date)?.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                }
              </p>
              <p className="text-sm text-gray-600 mb-1">IGM:- {request?.expand?.order?.igmNo}</p>
              <p className="text-sm text-gray-600 mb-1">BL:-{request?.expand?.order?.blNo}</p>
              <p className="text-sm text-gray-600 mb-1">BOE: {request?.expand?.order?.boeNo}</p>
              <div className="flex justify-end items-center pt-4">
                <div className='flex gap-2 items-center'>
                  <Eye
                    size={18}
                    className="cursor-pointer text-primary"
                    onClick={() => console.log('View details for', row.original.id)}
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
                    onClick={() => console.log('Download files for', row.original.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

