import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "I've reviewed your itinerary! I noticed you have a 2-hour gap between lunch and the Louvre. Would you like me to add a quick activity there?",
    timestamp: new Date(),
    suggestions: ["Add café stop", "Add shopping", "Leave as free time"],
  },
];

export default function ChatEditor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [, setLocation] = useLocation();

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Great! I've added a 30-minute café break at 2:30 PM. This gives you time to rest before the museum. Shall I adjust anything else?",
        timestamp: new Date(),
        suggestions: ["Add more food stops", "Swap activities", "Show alternatives"],
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground" data-testid="text-heading">
              Refine with AI
            </h1>
            <p className="text-sm text-muted-foreground">
              Chat to perfect your itinerary
            </p>
          </div>
          <Button
            onClick={() => setLocation("/comparison")}
            size="lg"
            data-testid="button-continue"
          >
            View Options
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              data-testid={`message-${message.role}-${message.id}`}
            >
              {message.role === "assistant" && (
                <Avatar className="w-10 h-10 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Sparkles className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`rounded-2xl px-5 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-card-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="cursor-pointer hover-elevate text-xs"
                        onClick={() => handleSuggestion(suggestion)}
                        data-testid={`badge-suggestion-${idx}`}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {message.role === "user" && (
                <Avatar className="w-10 h-10 bg-muted">
                  <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                    U
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex gap-3 mb-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask to add, remove, or swap activities..."
              className="flex-1"
              data-testid="input-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              size="icon"
              data-testid="button-send-message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/comparison")}
              data-testid="button-finish-chat"
            >
              Done Chatting - View Options
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
