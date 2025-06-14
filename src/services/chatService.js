import pbclient from '@/lib/db';
import { ROLES } from '@/constants/roles';

/**
 * Simple Chat Service for PocketBase Integration
 * Works without complex rules - handles basic chat functionality
 */
export class ChatService {
  constructor() {
    this.pb = pbclient;
  }

  /**
   * Create a new chat session
   * @param {string} userId - User ID who initiated the chat
   * @param {string} userRole - User role for proper agent assignment
   * @returns {Promise<Object>} Created chat session
   */
  async createChatSession(userId, userRole = null) {
    try {
      // Check if user is authenticated
      if (!this.pb.authStore.isValid || !this.pb.authStore.record) {
        throw new Error('User must be authenticated to create chat session');
      }

      // Verify the user ID matches the authenticated user
      if (this.pb.authStore.record?.id !== userId) {
        throw new Error('User ID mismatch - authentication required');
      }

      const sessionData = {
        user: userId,
        status: 'Open',
        agent: null // Will be assigned later
      };

      console.log('Creating chat session with data:', sessionData);

      // Create the session
      const session = await this.pb.collection('chat_session').create(sessionData);

      // Send initial welcome message
      await this.sendWelcomeMessage(session.id, userId);

      return session;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw new Error(`Failed to create chat session: ${error.message}`);
    }
  }

  /**
   * Send welcome message to new chat session
   */
  async sendWelcomeMessage(sessionId, userId) {
    try {
      const welcomeMessage = {
        chat: sessionId,
        sender: userId,
        content: "Hello! Thank you for contacting Green Ocean Logistics support. A representative will be with you shortly. How can we help you today?"
      };

      await this.pb.collection('messages').create(welcomeMessage);
    } catch (error) {
      console.warn('Could not send welcome message:', error);
      // Don't throw error - this is not critical
    }
  }

  /**
   * Assign an agent to a chat session based on role hierarchy
   * @param {string} sessionId - Chat session ID
   * @param {string} userRole - User role requesting support
   */
  async assignAgent(sessionId, userRole) {
    try {
      // Define agent assignment logic based on user role
      const agentRoles = this.getAgentRolesForUser(userRole);
      
      // Find available agents (this is a simplified version)
      // In production, you'd want to implement proper agent availability tracking
      const availableAgents = await this.pb.collection('users').getList(1, 10, {
        filter: agentRoles.map(role => `role = "${role}"`).join(' || '),
        sort: 'created' // FIFO assignment
      });

      if (availableAgents.items.length > 0) {
        const assignedAgent = availableAgents.items[0];
        
        await this.pb.collection('chat_session').update(sessionId, {
          agent: assignedAgent.id
        });

        // Send initial agent message
        await this.sendMessage(sessionId, assignedAgent.id, 
          `Hello! I'm ${assignedAgent.username}, your support representative. How can I help you today?`
        );
      }
    } catch (error) {
      console.error('Error assigning agent:', error);
    }
  }

  /**
   * Get appropriate agent roles for a user role
   * @param {string} userRole - User role
   * @returns {Array<string>} Array of agent roles that can handle this user
   */
  getAgentRolesForUser(userRole) {
    switch (userRole) {
      case ROLES.CUSTOMER:
        return [ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT];
      case ROLES.MERCHANT:
        return [ROLES.GOL_STAFF, ROLES.GOL_MOD, ROLES.ROOT];
      default:
        return [ROLES.GOL_MOD, ROLES.ROOT];
    }
  }

  /**
   * Send a message in a chat session
   * @param {string} chatId - Chat session ID
   * @param {string} senderId - Sender user ID
   * @param {string} content - Message content
   * @param {File} attachment - Optional file attachment
   * @returns {Promise<Object>} Created message
   */
  async sendMessage(chatId, senderId, content, attachment = null) {
    try {
      const messageData = {
        chat: chatId,
        sender: senderId,
        content: content
      };

      // Handle file attachment if provided
      if (attachment) {
        const formData = new FormData();
        Object.keys(messageData).forEach(key => {
          formData.append(key, messageData[key]);
        });
        formData.append('attachments', attachment);

        return await this.pb.collection('messages').create(formData);
      }

      return await this.pb.collection('messages').create(messageData);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Get chat session with messages
   * @param {string} sessionId - Chat session ID
   * @param {string} userId - Current user ID for permission check
   * @returns {Promise<Object>} Chat session with messages
   */
  async getChatSession(sessionId, userId) {
    try {
      // Get session with user and agent details
      const session = await this.pb.collection('chat_session').getOne(sessionId, {
        expand: 'user,agent'
      });

      // Check if user has permission to access this chat
      if (!this.canAccessChat(session, userId)) {
        throw new Error('Access denied to this chat session');
      }

      // Get messages for this session
      const messages = await this.pb.collection('messages').getList(1, 100, {
        filter: `chat = "${sessionId}"`,
        sort: 'created',
        expand: 'sender'
      });

      return {
        session,
        messages: messages.items
      };
    } catch (error) {
      console.error('Error getting chat session:', error);
      throw error;
    }
  }

  /**
   * Check if user can access a chat session
   * @param {Object} session - Chat session object
   * @param {string} userId - User ID to check
   * @returns {boolean} Whether user can access the chat
   */
  canAccessChat(session, userId) {
    // User can access if they are the chat owner or the assigned agent
    return session.user === userId || session.agent === userId;
  }

  /**
   * Get user's chat sessions (simplified version)
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Array of chat sessions
   */
  async getUserChatSessions(userId) {
    try {
      // Simple approach - get all sessions and filter client-side
      const allSessions = await this.pb.collection('chat_session').getFullList({
        sort: '-created',
        expand: 'user,agent'
      });

      // Filter sessions where user is the creator
      const userSessions = allSessions.filter(session => session.user === userId);

      return userSessions;
    } catch (error) {
      console.error('Error getting user chat sessions:', error);
      // Return empty array if there's an error
      return [];
    }
  }

  /**
   * Get all chat sessions for agents
   * @returns {Promise<Array>} Array of all chat sessions
   */
  async getAllChatSessions() {
    try {
      // Get all sessions for agents to manage
      const allSessions = await this.pb.collection('chat_session').getFullList({
        sort: '-created',
        expand: 'user,agent'
      });

      return allSessions;
    } catch (error) {
      console.error('Error getting all chat sessions:', error);
      // Return empty array if there's an error
      return [];
    }
  }

  /**
   * Assign an agent to a chat session
   * @param {string} sessionId - Chat session ID
   * @param {string} agentId - Agent user ID
   * @returns {Promise<Object>} Updated session
   */
  async assignAgentToSession(sessionId, agentId) {
    try {
      const updatedSession = await this.pb.collection('chat_session').update(sessionId, {
        agent: agentId
      });

      // Send a message that agent has joined
      await this.sendMessage(sessionId, agentId,
        "Hello! I'm here to help you. How can I assist you today?"
      );

      return updatedSession;
    } catch (error) {
      console.error('Error assigning agent to session:', error);
      throw error;
    }
  }

  /**
   * Close a chat session
   * @param {string} sessionId - Chat session ID
   * @param {string} userId - User ID requesting closure
   * @returns {Promise<Object>} Updated session
   */
  async closeChatSession(sessionId, userId) {
    try {
      const session = await this.pb.collection('chat_session').getOne(sessionId);

      if (!this.canAccessChat(session, userId)) {
        throw new Error('Access denied to close this chat session');
      }

      return await this.pb.collection('chat_session').update(sessionId, {
        status: 'Close',
        closed_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error closing chat session:', error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time chat updates
   * @param {string} sessionId - Chat session ID
   * @param {Function} onMessage - Callback for new messages
   * @param {Function} onSessionUpdate - Callback for session updates
   */
  subscribeToChat(sessionId, onMessage, onSessionUpdate) {
    try {
      // Subscribe to new messages
      this.pb.collection('messages').subscribe('*', (e) => {
        if (e.record.chat === sessionId) {
          onMessage(e);
        }
      });

      // Subscribe to session updates
      this.pb.collection('chat_session').subscribe(sessionId, (e) => {
        onSessionUpdate(e);
      });
    } catch (error) {
      console.error('Error subscribing to chat updates:', error);
    }
  }

  /**
   * Unsubscribe from chat updates
   */
  unsubscribeFromChat() {
    try {
      this.pb.collection('messages').unsubscribe();
      this.pb.collection('chat_session').unsubscribe();
    } catch (error) {
      console.error('Error unsubscribing from chat updates:', error);
    }
  }

  /**
   * Search FAQs for automated responses
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching FAQs
   */
  async searchFAQs(query) {
    try {
      const faqs = await this.pb.collection('faqs').getList(1, 10, {
        filter: `question ~ "${query}" || answer ~ "${query}"`,
        sort: 'created'
      });

      return faqs.items;
    } catch (error) {
      console.error('Error searching FAQs:', error);
      return [];
    }
  }
}

// Export singleton instance
export const chatService = new ChatService();
