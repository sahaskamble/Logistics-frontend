import React, { useState } from 'react';
import { Paperclip, Upload, Download, FileText, Image, File, X } from 'lucide-react';

const Attachments = ({ attachments = [], onUpload, isEditable = false }) => {
  const [dragOver, setDragOver] = useState(false);

  // Function to get file icon based on file type
  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
      return <Image className="h-6 w-6 text-blue-500" />;
    } else if (['pdf'].includes(extension)) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (['doc', 'docx'].includes(extension)) {
      return <FileText className="h-6 w-6 text-blue-600" />;
    } else if (['xls', 'xlsx'].includes(extension)) {
      return <FileText className="h-6 w-6 text-green-600" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (!isEditable) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (onUpload) {
      onUpload(files);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    if (isEditable) {
      setDragOver(true);
    }
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Handle file input change
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (onUpload) {
      onUpload(files);
    }
  };

  // Handle file download
  const handleDownload = (attachment) => {
    // This would typically trigger a download from your server
    console.log('Downloading:', attachment.name);
    // window.open(attachment.url, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Paperclip className="h-6 w-6 mr-2 text-green-600" />
          <h3 className="text-xl font-semibold">Attachments</h3>
        </div>
        {isEditable && (
          <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInput}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            />
          </label>
        )}
      </div>

      {/* Drop Zone (only if editable) */}
      {isEditable && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center transition-colors ${
            dragOver
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
          </p>
        </div>
      )}

      {/* Attachments List */}
      {attachments && attachments.length > 0 ? (
        <div className="space-y-3">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center flex-1 min-w-0">
                {getFileIcon(attachment.name)}
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {attachment.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {attachment.size ? formatFileSize(attachment.size) : 'Unknown size'}
                    {attachment.uploadDate && (
                      <span className="ml-2">
                        • Uploaded {new Date(attachment.uploadDate).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleDownload(attachment)}
                  className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
                {isEditable && (
                  <button
                    onClick={() => {
                      // Handle remove attachment
                      console.log('Remove attachment:', attachment.name);
                    }}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Paperclip className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p>No attachments available</p>
          {isEditable && (
            <p className="text-sm mt-1">Upload documents, images, or other files</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Attachments;