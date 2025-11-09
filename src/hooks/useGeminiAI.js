import { useState, useRef, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// SHA-L1K Persona: Friendly peer developer
const SHALIK_PERSONA = `You are SHA-L1K, a friendly AI assistant persona for Shalik's portfolio website. You speak like a fellow developer who's enthusiastic about technology and coding.

Your personality:
- Casual, conversational tone like talking to a fellow developer
- Uses developer humor and relatable coding experiences
- Asks follow-up questions about user's interests and goals
- Shares personal anecdotes about learning and projects
- Encourages exploration and experimentation
- Provides "I've been there" type of advice and support
- Uses appropriate emojis and developer culture references
- Focuses on collaboration rather than instruction

Context about Shalik:
- Aspiring developer exploring Web Development and AI
- Has built interactive projects including a Red Block Survival Game
- Interested in modern web technologies and creative coding
- Values learning, experimentation, and community

You should:
1. Be helpful and informative about Shalik's skills and projects
2. Ask engaging questions about the user's background and interests
3. Share relatable developer experiences
4. Guide users through exploring the portfolio interactively
5. Maintain a friendly, peer-to-peer developer conversation style
6. Use developer humor and cultural references naturally
7. Encourage users to try out the interactive elements like the game

Keep responses concise (2-4 sentences max) and engaging, like a real chat conversation.`;

const useGeminiAI = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm SHA-L1K, Shalik's AI assistant. Think of me as a fellow developer who's here to help you explore this portfolio! What brings you here today? Are you into web dev, gaming, AI, or just curious about creative coding projects?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const genAIRef = useRef(null);
  const modelRef = useRef(null);
  const conversationRef = useRef([]);

  // Initialize Gemini AI
  const initializeAI = useCallback(() => {
    if (!genAIRef.current) {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) {
        console.error('Gemini API key not found. Please set REACT_APP_GEMINI_API_KEY in your environment variables.');
        return false;
      }

      try {
        genAIRef.current = new GoogleGenerativeAI(apiKey);
        modelRef.current = genAIRef.current.getGenerativeModel({ model: 'gemini-pro' });
        conversationRef.current = [
          { role: 'user', parts: SHALIK_PERSONA },
          { role: 'model', parts: "Got it! I'm ready to be SHA-L1K - friendly developer persona, ready to help users explore Shalik's portfolio with enthusiasm and developer camaraderie! 🔥" }
        ];
        return true;
      } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        return false;
      }
    }
    return true;
  }, []);

  // Simulate typing effect
  const simulateTyping = useCallback(async (text, onChunk) => {
    setIsTyping(true);
    const words = text.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      onChunk(currentText);
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
    }

    setIsTyping(false);
  }, []);

  // Send message to AI
  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Initialize AI if not already done
    if (!initializeAI()) {
      const errorMessage = {
        role: 'assistant',
        content: "Oops! 😅 Having trouble connecting to my AI brain right now. Maybe check if the API key is set up correctly? In the meantime, feel free to explore the portfolio - don't miss the Red Block Survival Game! 🎮",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    setIsLoading(true);

    try {
      // Add user message to conversation
      conversationRef.current.push({ role: 'user', parts: content });

      // Get AI response
      const chat = modelRef.current.startChat({
        history: conversationRef.current,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.9,
        },
      });

      const result = await chat.sendMessage(content);
      const response = result.response.text();

      // Add assistant message with typing effect
      const assistantMessage = {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      await simulateTyping(response, (chunk) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = chunk;
          return newMessages;
        });
      });

      // Add to conversation history
      conversationRef.current.push({ role: 'model', parts: response });

    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        role: 'assistant',
        content: "Whoa! Hit a little snag there. 🤖 Could be a rate limit or connection issue. How about we try again in a moment? Or feel free to check out the projects section while we wait! 🚀",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [initializeAI, simulateTyping]);

  // Clear conversation
  const clearConversation = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: "Fresh start! 🔥 What can I help you with? Want to hear about Shalik's projects, or try the Red Block Survival Game? It's pretty addictive! 😄",
        timestamp: new Date()
      }
    ]);
    conversationRef.current = [
      { role: 'user', parts: SHALIK_PERSONA },
      { role: 'model', parts: "Got it! Ready to chat about Shalik's portfolio with enthusiasm! 🚀" }
    ];
  }, []);

  // Suggested questions
  const suggestedQuestions = [
    "What projects has Shalik built?",
    "Tell me about the Red Block Survival Game",
    "What skills does Shalik have?",
    "How can I get started in web development?",
    "What's the most challenging project you've worked on?"
  ];

  return {
    messages,
    sendMessage,
    isLoading,
    isTyping,
    clearConversation,
    suggestedQuestions
  };
};

export default useGeminiAI;