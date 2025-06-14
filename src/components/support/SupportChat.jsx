'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/hooks/useChat';
import { toast } from 'sonner';
import { Send, Paperclip, X, User, Bot, Clock, CheckCircle } from 'lucide-react';

/**
 * Support Chat Component for Human Agents
 * Provides real-time chat interface for customer support
 */
export default function SupportChat({ sessionId, onClose }) {
  const { user } = useAuth();
  const {
    chatSession,
    messages,
    loading,
    error,
    isConnected,
    sendMessage,
    closeChatSession,
    loadChatSession,
    canSendMessage,
    isAgent,
    currentUser
  } = useChat(sessionId);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat session on mount
  useEffect(() => {
    if (sessionId && user) {
      loadChatSession(sessionId);
    }
  }, [sessionId, user, loadChatSession]);

  // Simple fallback if chat session fails to load
  const handleRetryLoad = () => {
    if (sessionId && user) {
      loadChatSession(sessionId);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !attachment) return;

    try {
      await sendMessage(input.trim(), attachment);
      setInput('');
      setAttachment(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setAttachment(file);
      toast.success(`File "${file.name}" selected`);
    }
  };

  const handleCloseChat = async () => {
    if (window.confirm('Are you sure you want to close this chat session?')) {
      try {
        await closeChatSession();
        toast.success('Chat session closed');
        if (onClose) onClose();
      } catch (error) {
        toast.error('Failed to close chat session');
      }
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageSenderInfo = (message) => {
    const sender = message.expand?.sender || message.sender;
    if (typeof sender === 'string') {
      return { id: sender, username: 'User', role: 'Unknown' };
    }
    return {
      id: sender?.id || message.sender,
      username: sender?.username || 'User',
      role: sender?.role || 'Unknown'
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading chat session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-red-600">
          <X className="w-8 h-8 mx-auto mb-2" />
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!chatSession) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-600">
          <User className="w-8 h-8 mx-auto mb-2" />
          <p>Chat session not found</p>
        </div>
      </div>
    );
  }

  const sessionUser = chatSession.expand?.user || chatSession.user;
  const sessionAgent = chatSession.expand?.agent || chatSession.agent;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">
            Support Chat - {sessionUser?.username || 'Customer'}
          </h3>
          <div className="text-sm opacity-90 flex items-center space-x-4">
            <span>Session: {chatSession.id}</span>
            <span className="flex items-center">
              {isConnected ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3 mr-1" />
                  Disconnected
                </>
              )}
            </span>
            <span>Status: {chatSession.status}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isAgent && chatSession.status === 'Open' && (
            <button
              onClick={handleCloseChat}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Close Chat
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => {
          const senderInfo = getMessageSenderInfo(message);
          const isCurrentUser = senderInfo.id === currentUser?.id;
          const isBot = senderInfo.role === 'bot' || message.sender === 'bot';

          return (
            <div
              key={message.id || index}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  isCurrentUser
                    ? 'bg-blue-600 text-white'
                    : isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {/* Sender info */}
                <div className="flex items-center space-x-2 mb-1">
                  {isBot ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium">
                    {isBot ? 'Chatbot' : senderInfo.username}
                  </span>
                  <span className="text-xs opacity-70">
                    {formatMessageTime(message.created || message.timestamp)}
                  </span>
                </div>

                {/* Message content */}
                <div className="whitespace-pre-wrap break-words">
                  {message.content || message.text}
                </div>

                {/* Attachment */}
                {message.attachments && (
                  <div className="mt-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/messages/${message.id}/${message.attachments}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-100 underline text-sm"
                    >
                      📎 {message.attachments}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      {canSendMessage && chatSession.status === 'Open' && (
        <div className="border-t p-4">
          {attachment && (
            <div className="mb-2 p-2 bg-gray-100 rounded flex items-center justify-between">
              <span className="text-sm">📎 {attachment.name}</span>
              <button
                onClick={() => setAttachment(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-end space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() && !attachment}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      )}

      {chatSession.status === 'Close' && (
        <div className="border-t p-4 bg-gray-50 text-center text-gray-600">
          This chat session has been closed.
        </div>
      )}
    </div>
  );
}
