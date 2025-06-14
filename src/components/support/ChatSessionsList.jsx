'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/hooks/useChat';
import { ROLES } from '@/constants/roles';
import { toast } from 'sonner';
import { 
  MessageCircle, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  Eye,
  RefreshCw,
  Search
} from 'lucide-react';

/**
 * Chat Sessions List Component
 * Shows all chat sessions for agents to manage
 */
export default function ChatSessionsList({ onSelectSession }) {
  const { user } = useAuth();
  const { getUserChatSessions, getAllChatSessions, assignAgentToSession } = useChat();
  
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const isAgent = user && [ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT].includes(user.role);

  const handleAssignToMe = async (sessionId, e) => {
    e.stopPropagation();

    if (!user || !isAgent) return;

    try {
      await assignAgentToSession(sessionId);
      // Reload sessions to show the update
      loadSessions();
    } catch (error) {
      console.error('Error assigning session:', error);
    }
  };

  const loadSessions = async () => {
    if (!user) return;

    try {
      setRefreshing(true);

      // Check if user is an agent - if so, load all sessions
      const isAgent = [ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT].includes(user.role);

      let userSessions;
      if (isAgent) {
        userSessions = await getAllChatSessions();
      } else {
        userSessions = await getUserChatSessions();
      }

      setSessions(userSessions);
    } catch (error) {
      toast.error('Failed to load chat sessions');
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [user]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        loadSessions();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [loading]);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = !searchTerm || 
      session.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.expand?.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.expand?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || session.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getSessionStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Close':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeSince = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading chat sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Chat Sessions</h2>
          <button
            onClick={loadSessions}
            disabled={refreshing}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="close">Closed</option>
          </select>
        </div>
      </div>

      {/* Sessions List */}
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {filteredSessions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No chat sessions found</p>
            {searchTerm && (
              <p className="text-sm mt-2">Try adjusting your search criteria</p>
            )}
          </div>
        ) : (
          filteredSessions.map((session) => {
            const sessionUser = session.expand?.user || {};
            const sessionAgent = session.expand?.agent || {};
            
            return (
              <div
                key={session.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelectSession && onSelectSession(session)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getSessionStatusIcon(session.status)}
                      <span className="font-medium text-gray-900 truncate">
                        {sessionUser.username || sessionUser.email || 'Unknown User'}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({sessionUser.role || 'Unknown'})
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Session ID: {session.id}</p>
                      <p>Created: {getTimeSince(session.created)}</p>
                      {session.agent ? (
                        <p className="text-green-600">
                          Agent: {sessionAgent.username || 'Assigned'}
                          {session.agent === user?.id && ' (You)'}
                        </p>
                      ) : (
                        <p className="text-orange-600">Unassigned</p>
                      )}
                      {session.status === 'Close' && session.closed_at && (
                        <p>Closed: {getTimeSince(session.closed_at)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      session.status === 'Open'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {session.status}
                    </span>

                    {/* Show assign button for unassigned sessions */}
                    {isAgent && !session.agent && session.status === 'Open' && (
                      <button
                        onClick={(e) => handleAssignToMe(session.id, e)}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        title="Assign to me"
                      >
                        Assign
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectSession) onSelectSession(session);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {filteredSessions.length > 0 && (
        <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
          Showing {filteredSessions.length} of {sessions.length} sessions
        </div>
      )}
    </div>
  );
}
