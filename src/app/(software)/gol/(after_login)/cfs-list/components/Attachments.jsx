import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Paperclip, FileText, Upload, X } from 'lucide-react';

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];

// You can replace these with your actual upload methods/icons if needed
const uploadMethods = [
  {
    title: "File Manager",
    description: "Upload from your computer",
    icon: Upload,
  },
  {
    title: "Google Drive",
    description: "Coming soon",
    icon: Upload,
  },
  {
    title: "Dropbox",
    description: "Coming soon",
    icon: Upload,
  },
  {
    title: "OneDrive",
    description: "Coming soon",
    icon: Upload,
  },
];

const Attachments = ({
  attachments = [],
  onUpload,
  onRemove,
  isEditable = false,
  userRole = 'user'
}) => {
  const fileInputRef = useRef(null);
  const canEdit = isEditable && userRole === 'system_administrator';

  // Internal state to manage files for UI display & manipulation
  // Initialize with attachments prop if passed as files
  const [selectedFiles, setSelectedFiles] = useState(attachments);

  // Sync internal selectedFiles when attachments prop changes
  useEffect(() => {
    setSelectedFiles(attachments);
  }, [attachments]);

  // Drag and drop state
  const [dragActive, setDragActive] = useState(false);

  // Validate and add new files
  const addFiles = (files) => {
    const filtered = files.filter(file => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        alert(`File type not supported: ${file.name}`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File too large (max ${MAX_FILE_SIZE_MB}MB): ${file.name}`);
        return false;
      }
      // avoid duplicates by name+size
      if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
        alert(`File already added: ${file.name}`);
        return false;
      }
      return true;
    });
    if (filtered.length === 0) return;
    const updatedFiles = [...selectedFiles, ...filtered];
    setSelectedFiles(updatedFiles);
    if (onUpload) onUpload(filtered);
  };

  // Handle file input change
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
    e.target.value = null; // reset input
  };

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  }, [selectedFiles]);

  // Remove file by index
  const removeFile = (index) => {
    const fileToRemove = selectedFiles[index];
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (onRemove) onRemove(fileToRemove);
  };

  // Clear all files
  const clearAll = () => {
    setSelectedFiles([]);
    if (onRemove) onRemove(null, true); // second arg to mean clear all
  };

  // Click to open file input
  const openFileDialog = () => {
    if (canEdit) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className="border rounded-xl p-6 bg-[var(--accent)] shadow-md shadow-foreground/40"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Paperclip className="h-6 w-6 text-[var(--primary)]" />
          <h1 className="text-xl font-semibold text-[var(--foreground)]">Attachments</h1>
        </div>
        {canEdit && (
          <button
            onClick={openFileDialog}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Upload Files"
            type="button"
          >
            <Upload className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Upload methods grid */}
      {canEdit && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {uploadMethods.map((method, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border cursor-pointer hover:shadow-md"
              onClick={() => {
                if (method.title === "File Manager") {
                  openFileDialog();
                } else {
                  alert(`${method.title} integration coming soon!`);
                }
              }}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <method.icon className="w-8 h-8 text-[var(--primary)]" />
                <h3 className="font-semibold">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drag and Drop zone */}
      {canEdit && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-[var(--primary)] bg-muted" : "border-border bg-background"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Drag and drop files here</h3>
          <p className="text-muted-foreground mb-4">or click below to select files from your computer</p>
          <button
            onClick={openFileDialog}
            className="px-6 py-2 border rounded hover:bg-gray-100 transition-colors"
            type="button"
          >
            Choose Files
          </button>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            ref={fileInputRef}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
          </p>
        </div>
      )}

      {/* File List */}
      {selectedFiles.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Selected Files</h3>
          <div className="space-y-2 max-h-64 overflow-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[var(--background)] border rounded-lg"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
                  <div className="truncate max-w-xs">
                    <p className="font-medium text-[var(--foreground)] truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {canEdit && (
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Remove file"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {canEdit && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onUpload && onUpload(selectedFiles)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                type="button"
              >
                Upload All Files
              </button>
              <button
                onClick={clearAll}
                className="flex-1 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition-colors"
                type="button"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-[var(--secondary)] text-sm mt-6">No attachments uploaded yet.</p>
      )}
    </div>
  );
};

export default Attachments;
