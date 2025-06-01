import React, { useEffect, useState } from 'react';
import { Search, Download, Eye, Trash, } from 'lucide-react';
import Input from '@/components/ui/Input';
import Form from './Form';
import EditForm from './EditForm';
import { useCollection } from '@/hooks/useCollection';

export default function MobileTable() {
  const { data, deleteItem } = useCollection('containers', {
    expand: 'ownedBy',
  });

  const [filteredData, setFilteredData] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
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
          entry?.containerNo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
      setFilteredContainers(filtered_data);
    }
  }, [data, filteredData, searchQuery])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Free':
        return 'bg-green-100 text-green-800 border-2 border-green-600';
      case 'Broken':
        return 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500';
      case 'Damaged':
        return 'bg-red-100 text-red-800 border-2 border-red-600';
      default:
        return 'bg-gray-100 text-gray-800 border-2 border-gray-500';
    }
  };

  return (
    <div className="border rounded-xl bg-accent flex flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold text-foreground mb-4">Containers</h2>
        <div className="flex justify-end items-center my-4">
          <Form />
        </div>

        <div className="px-4 py-8 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Input
              type="text"
              placeholder="Search by No"
              className="pl-8 w-full bg-accent text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="px-4 pb-4">
          {filteredContainers.map((request, index) => (
            <div key={index} className="border rounded-lg p-3 mb-3 shadow-sm">
              <div className='flex gap-2 items-center'>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <h1 className="font-medium">Container No: {request?.containerNo}</h1>
              <p className="text-sm text-gray-600 mb-1">Owned By:- {request?.expand?.ownedBy?.name}</p>
              <p className="text-sm text-gray-600 mb-1">Size:-{request?.size}</p>
              <p className="text-sm text-gray-600 mb-1">Cargo Type: {request?.cargoType}</p>
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

