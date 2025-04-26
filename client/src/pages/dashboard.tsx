import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ChatMessage, getChatCompletion } from "@/lib/openai";
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  SendIcon, 
  Settings2Icon, 
  LogOut, 
  Menu, 
  FileText, 
  Upload, 
  Clock, 
  Loader2, 
  MessageSquare,
  ImageIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "system-1",
      role: "system",
      content: "You are CleverAI, a helpful and intelligent assistant powered by GPT-4o. You are designed to be more helpful, harmless, and honest than other AI assistants.",
    },
    {
      id: "welcome",
      role: "assistant",
      content: `Hello${user?.username ? ` ${user.username}` : ""}! I'm CleverAI, your intelligent assistant. How can I help you today?`,
      createdAt: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: inputValue,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Add placeholder for assistant response
      const assistantPlaceholderId = uuidv4();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantPlaceholderId,
          role: "assistant",
          content: "...",
          createdAt: new Date(),
        },
      ]);

      // Get response from OpenAI API
      const messagesForAPI = [...messages, userMessage].filter(
        (msg) => msg.role !== "system" || msg.id === "system-1"
      );
      const response = await getChatCompletion(messagesForAPI);

      // Replace placeholder with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholderId
            ? {
                id: assistantPlaceholderId,
                role: "assistant",
                content: response,
                createdAt: new Date(),
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Replace placeholder with error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.role === "assistant" && msg.content === "..."
            ? {
                ...msg,
                content:
                  "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would normally process the file (e.g. for image analysis)
    // For now, just create a message with the file name
    setMessages(prev => [
      ...prev, 
      {
        id: uuidv4(),
        role: "user",
        content: `I've uploaded a file: ${file.name}`,
        createdAt: new Date()
      }
    ]);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 z-50 md:hidden p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar - visible on desktop, conditional on mobile */}
      <div
        className={`${
          isMobileSidebarOpen ? "fixed inset-0 z-40 block" : "hidden"
        } md:block md:relative md:w-64 md:flex-shrink-0 bg-muted/30 border-r`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">CleverAI</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <Separator />
          
          <div className="p-4">
            <Button variant="outline" className="w-full justify-start" onClick={() => {
              setMessages([
                {
                  id: "system-1",
                  role: "system",
                  content: "You are CleverAI, a helpful and intelligent assistant powered by GPT-4o. You are designed to be more helpful, harmless, and honest than other AI assistants.",
                },
                {
                  id: uuidv4(),
                  role: "assistant",
                  content: `Hello${user?.username ? ` ${user.username}` : ""}! I'm CleverAI, your intelligent assistant. How can I help you today?`,
                  createdAt: new Date(),
                },
              ]);
            }}>
              <MessageSquare className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <h2 className="text-sm font-medium mb-2">Recent chats</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                <span className="truncate">How to build a website</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                <span className="truncate">Python tutorial</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                <span className="truncate">AI image generation</span>
              </Button>
            </div>
          </div>
          
          <div className="p-4 mt-auto">
            <div className="flex items-center gap-2 mb-4">
              <Avatar>
                <AvatarFallback>
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {user?.username || user?.email || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || ""}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings2Icon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence>
              {messages
                .filter((msg) => msg.role !== "system")
                .map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-3 group">
                      <Avatar className={message.role === "assistant" ? "bg-primary" : ""}>
                        {message.role === "assistant" ? (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            AI
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback>
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium">
                            {message.role === "assistant" ? "CleverAI" : user?.username || "You"}
                          </h3>
                          {message.createdAt && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              {message.createdAt.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          {message.content === "..." ? (
                            <div className="flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Thinking...</span>
                            </div>
                          ) : (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              {message.content.split('\n').map((text, i) => (
                                <p key={i}>{text}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {message.role === "assistant" && message.content !== "..." && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => {
                            navigator.clipboard.writeText(message.content);
                          }}>
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto">
            <Card className="relative">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message CleverAI..."
                className="pr-24 min-h-[80px] resize-none border-0 focus-visible:ring-0"
                disabled={isLoading}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFileUpload}
                  disabled={isLoading}
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </Card>
            <p className="text-xs text-center text-muted-foreground mt-2">
              CleverAI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}