import React, { useState, useRef, useEffect } from 'react';
import { useRailway } from '../../context/RailwayContext';
import { useAuth } from '../../context/AuthContext';
import { RailwayCopilotService } from '../../services/ai/railwayCopilotService';
import { CopilotMessage } from '../../types/railway';
import {
  Bot,
  Send,
  RotateCcw,
  Sparkles,
  Shield,
  Radio,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface RailwayAICopilotProps {
  onSelectTrain: (num: string) => void;
  onSelectView: (view: string) => void;
}

export const RailwayAICopilot: React.FC<RailwayAICopilotProps> = ({
  onSelectTrain,
  onSelectView
}) => {
  const {
    trainPositions,
    trainDetailsList,
    stations,
    staffList,
    duties,
    attendanceRecords,
    incidents,
    alerts,
    isAuthorizedFeedActive
  } = useRailway();
  const { currentUser, currentRoleDefinition } = useAuth();

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: `Railway AI Operations Copilot active for ${currentUser.name} (${currentRoleDefinition.title}). Query real-time train positions, crew rest status, signal blocks, or incident triage. Zero-Fabrication Rule enforced.`,
      timestamp: new Date().toISOString(),
      isVerifiedRealData: true,
      citations: [
        { dataSource: 'CRIS Telemetry Gateway & PostgreSQL Operational DB' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isProcessing) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toISOString(),
      isVerifiedRealData: true
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    try {
      const response = await RailwayCopilotService.queryCopilot(query, {
        trainPositions,
        trainDetailsList,
        staffList,
        duties,
        attendance: attendanceRecords,
        incidents,
        alerts,
        stations,
        isAuthorizedFeedActive
      });

      setMessages(prev => [...prev, response]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          content: 'I cannot verify the requested railway telemetry because the authorized data stream is temporarily unreachable.',
          timestamp: new Date().toISOString(),
          isVerifiedRealData: false
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const sampleQueries = [
    'Where is train 22436 Vande Bharat right now?',
    'Show me delayed trains on the Delhi-Howrah corridor',
    'Which running staff have exceeded continuous duty or are on leave?',
    'What is the active caution order status?'
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col rounded-2xl bg-[#080808] border border-neutral-800 shadow-2xl overflow-hidden font-mono">
      {/* Copilot Header */}
      <div className="p-4 bg-black border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase font-display tracking-wider">
              Railway Operations AI Copilot
            </h2>
            <p className="text-[10px] text-neutral-400">
              Rule 42 Safety Guardrail • Grounded on Authoritative PostgreSQL Telemetry
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(messages.slice(0, 1))}
          className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition text-xs flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-2xl p-4 rounded-2xl ${
                  isUser
                    ? 'bg-white text-black font-sans font-medium'
                    : 'bg-[#111111] text-neutral-200 border border-neutral-800 font-sans'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>

                {!isUser && msg.citations && msg.citations.length > 0 && msg.citations[0].dataSource && (
                  <div className="mt-3 pt-2 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                    <span>Source: {msg.citations[0].dataSource}</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono p-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Querying authoritative railway telemetry database...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sample Quick Questions */}
      <div className="p-3 border-t border-neutral-800/60 bg-black/60 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
        <span className="text-neutral-500 shrink-0">Suggestions:</span>
        {sampleQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white whitespace-nowrap transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-black border-t border-neutral-800 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask operational questions (e.g. 'Where is train 22436?')..."
          className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isProcessing}
          className="p-2.5 rounded-xl bg-white hover:bg-neutral-200 disabled:opacity-30 text-black transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
