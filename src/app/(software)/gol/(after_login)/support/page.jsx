'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarProvider';
import { useChat } from '@/hooks/useChat';
import ChatSessionsList from '@/components/support/ChatSessionsList';
import SupportChat from '@/components/support/SupportChat';
import { ROLES } from '@/constants/roles';
import { toast } from 'sonner';
import { 
  MessageSquare, 
  Users, 
  Clock, 
  CheckCircle,
  BarChart3,
  RefreshCw
} from 'lucide-react';

/**
 * Support Dashboard Page for GOL Staff
 * Allows agents to manage and respond to support chats
 */
export default function SupportDashboardPage() {
  const { user } = useAuth();
  const { setTitle } = useSidebar();
  const { getAllChatSessions } = useChat();
  const [selectedSession, setSelectedSession] = useState(null);
  const [stats, setStats] = useState({
    totalSessions: 0,
    openSessions: 0,
    closedSessions: 0,
    myActiveSessions: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Set page title
  useEffect(() => {
    setTitle('Support Dashboard');
  }, [setTitle]);

  // Load statistics
  const loadStats = async () => {
    if (!user) return;

    try {
      setLoadingStats(true);
      const allSessions = await getAllChatSessions();

      const totalSessions = allSessions.length;
      const openSessions = allSessions.filter(s => s.status === 'Open').length;
      const closedSessions = allSessions.filter(s => s.status === 'Close').length;
      const myActiveSessions = allSessions.filter(s => s.agent === user.id && s.status === 'Open').length;

      setStats({
        totalSessions,
        openSessions,
        closedSessions,
        myActiveSessions
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [user]);

  // Check if user has permission to access support dashboard
  useEffect(() => {
    if (user && ![ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT].includes(user.role)) {
      toast.error('Access denied. You do not have permission to access the support dashboard.');
      // Redirect to appropriate dashboard
      window.location.href = '/gol/dashboard';
    }
  }, [user]);

  const handleSelectSession = (session) => {
    setSelectedSession(session);
  };

  const handleCloseSessionView = () => {
    setSelectedSession(null);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (![ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT].includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <MessageSquare className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p>You do not have permission to access the support dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Dashboard</h1>
          <p className="text-gray-600">Manage customer support chat sessions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={loadStats}
            disabled={loadingStats}
            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loadingStats ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Agent: {user.username}</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats ? '...' : stats.totalSessions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats ? '...' : stats.openSessions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Closed Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats ? '...' : stats.closedSessions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {loadingStats ? '...' : stats.myActiveSessions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Sessions List */}
        <div className="lg:col-span-1">
          <ChatSessionsList onSelectSession={handleSelectSession} />
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedSession ? (
            <div className="bg-white rounded-lg shadow h-[600px]">
              <SupportChat 
                sessionId={selectedSession.id} 
                onClose={handleCloseSessionView}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow h-[600px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Chat Selected</h3>
                <p>Select a chat session from the list to start responding to customers.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <BarChart3 className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">View Analytics</h4>
            <p className="text-sm text-gray-600">Check support performance metrics</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <RefreshCw className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Refresh Sessions</h4>
            <p className="text-sm text-gray-600">Update chat sessions list</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Manage FAQs</h4>
            <p className="text-sm text-gray-600">Update frequently asked questions</p>
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Support Agent Guidelines</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>• Respond to customer inquiries promptly and professionally</p>
          <p>• Use the knowledge base to provide accurate information</p>
          <p>• Escalate complex issues to supervisors when needed</p>
          <p>• Close chat sessions when issues are resolved</p>
          <p>• Maintain customer confidentiality at all times</p>
        </div>
      </div>
    </div>
  );
}
