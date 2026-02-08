'use client';

import { useState, useRef, useEffect } from 'react';
import { useConfig } from './useConfig';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const config = useConfig();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                assistantMessage += parsed.text;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantMessage;
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sorry, there was an error processing your request.';
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header - only show when no messages */}
          {messages.length === 0 && (
            <div className="text-center mb-16 mt-8">
              {/* Brand color accent bar */}
              <div
                className="w-20 h-1 mx-auto mb-6 rounded-full"
                style={{ backgroundColor: config.primaryColor }}
              ></div>

              <h1
                className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight"
                style={{ color: config.primaryColor }}
              >
                {config.companyName} messaging helper
              </h1>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                {config.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {config.suggestions.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-opacity-50 cursor-default group relative overflow-hidden"
                    style={{
                      borderColor: `${config.primaryColor}20`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${config.primaryColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${config.primaryColor}20`;
                    }}
                  >
                    {/* Brand color accent corner */}
                    <div
                      className="absolute top-0 right-0 w-0 h-0 transition-all duration-200"
                      style={{
                        borderTop: `40px solid ${config.primaryColor}20`,
                        borderLeft: '40px solid transparent',
                      }}
                    ></div>

                    <div className="text-3xl mb-3 relative z-10">{item.icon}</div>
                    <div
                      className="text-sm font-semibold text-gray-700 mb-1 transition-colors duration-200 relative z-10 group-hover:opacity-80"
                      style={{ color: config.primaryColor }}
                    >
                      {item.text}
                    </div>
                    <div className="text-xs text-gray-500 relative z-10">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compact header when messages exist */}
          {messages.length > 0 && (
            <div
              className="flex items-center justify-between gap-3 mb-8 pb-6 border-b"
              style={{ borderColor: `${config.primaryColor}20` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: config.primaryColor }}
                ></div>
                <h1
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: config.primaryColor }}
                >
                  {config.companyName} messaging helper
                </h1>
              </div>
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                aria-label="Start new conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">New chat</span>
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 sm:gap-6 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg relative text-white`}
                    style={{
                      backgroundColor: message.role === 'user' ? config.primaryColor : '#6b7280'
                    }}
                  >
                    {message.role === 'user' && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: `${config.primaryColor}40` }}
                      ></div>
                    )}
                    <span className="relative z-10">
                      {message.role === 'user' ? config.companyName.charAt(0).toUpperCase() : 'A'}
                    </span>
                  </div>
                </div>

                {/* Message Bubble */}
                <div
                  className={`flex-1 ${
                    message.role === 'user' ? 'max-w-2xl ml-auto' : 'max-w-3xl mr-auto'
                  }`}
                >
                  <div
                    className={`rounded-3xl px-6 py-4 sm:px-7 sm:py-5 transition-all duration-200 relative ${
                      message.role === 'user'
                        ? 'bg-white shadow-md hover:shadow-lg border-2'
                        : 'bg-gray-50 shadow-sm hover:shadow-md border border-gray-100'
                    }`}
                    style={message.role === 'user' ? {
                      borderColor: `${config.primaryColor}50`,
                    } : {}}
                  >
                    <div className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap text-gray-800">
                      {message.content || (
                        <span className="flex items-center gap-2 text-gray-400">
                          <span className="animate-pulse">●</span>
                          <span className="animate-pulse delay-75">●</span>
                          <span className="animate-pulse delay-150">●</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg bg-gray-600 text-white shadow-lg">
                    A
                  </div>
                </div>
                <div className="flex-1 max-w-3xl mr-auto">
                  <div className="rounded-3xl px-6 py-4 sm:px-7 sm:py-5 bg-gray-50 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: config.primaryColor }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: config.primaryColor,
                          animationDelay: '0.15s'
                        }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: config.primaryColor,
                          animationDelay: '0.3s'
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Sticky Bottom */}
      <div
        className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t-2 shadow-2xl"
        style={{ borderColor: `${config.primaryColor}30` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <form onSubmit={handleSubmit} className="relative">
            <div
              className="relative flex items-end gap-3 bg-white rounded-3xl shadow-lg border-2 focus-within:shadow-xl transition-all duration-200 p-2"
              style={{
                borderColor: `${config.primaryColor}30`,
              }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Describe what you need help writing..."
                className="flex-1 resize-none bg-transparent px-4 py-3 text-base sm:text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none min-h-[56px] max-h-[200px]"
                rows={1}
                disabled={isLoading}
                style={{
                  height: 'auto',
                  minHeight: '56px',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 px-6 sm:px-8 py-3 sm:py-3.5 text-white rounded-2xl font-semibold text-base sm:text-lg hover:opacity-90 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: isLoading || !input.trim() ? undefined : config.primaryColor,
                }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Press <kbd
              className="px-2 py-0.5 rounded font-mono border"
              style={{
                backgroundColor: `${config.primaryColor}20`,
                color: config.primaryColor,
                borderColor: `${config.primaryColor}40`
              }}
            >Enter</kbd> to send, <kbd
              className="px-2 py-0.5 rounded font-mono border"
              style={{
                backgroundColor: `${config.primaryColor}20`,
                color: config.primaryColor,
                borderColor: `${config.primaryColor}40`
              }}
            >Shift+Enter</kbd> for new line
          </p>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Built by <a href="https://studio-rhys.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Studio Rhys</a> with Claude Code
          </p>
        </div>
      </div>
    </div>
  );
}
