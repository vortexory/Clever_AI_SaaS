import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { chatBubbleAnimation } from "@/lib/animations";
import { Bot, Send, User, RefreshCw } from "lucide-react";

type Message = {
  id: number;
  type: "user" | "bot";
  text: string;
  loading?: boolean;
};

const predefinedResponses = [
  "I'm CleverAI, an advanced AI assistant powered by the latest language models and LangChain technology. How can I help you today?",
  "Based on your industry trends, I recommend focusing on improving customer retention strategies. Would you like me to analyze your existing data and suggest specific approaches?",
  "I've analyzed your quarterly reports and noticed a 15% increase in customer acquisition costs. Here are three strategies to optimize your marketing spend while maintaining growth.",
  "I can help you automate your customer support workflow. By integrating with your existing CRM system, I can handle routine inquiries and escalate complex issues to your team.",
  "Your document has been summarized. The key points are: 1) Market expansion into Asia Pacific, 2) New product launch timeline for Q3, 3) Budget reallocation for digital marketing initiatives.",
];

const suggestedQuestions = [
  "How can AI improve my customer support?",
  "Analyze my recent marketing performance",
  "Summarize this quarterly report",
  "What are the latest trends in my industry?",
  "Generate a social media content plan"
];

const ChatbotDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm CleverAI, your intelligent assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [responseIndex, setResponseIndex] = useState(0);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: input,
    };
    setMessages([...messages, userMessage]);
    setInput("");

    // Add bot response with loading state
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        text: "",
        loading: true,
      };
      setMessages((prev) => [...prev, botMessage]);

      // Simulate typing
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessage.id
              ? {
                  ...msg,
                  text: predefinedResponses[responseIndex % predefinedResponses.length],
                  loading: false,
                }
              : msg
          )
        );
        setResponseIndex(responseIndex + 1);
      }, 1500);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: "bot",
        text: "Hello! I'm CleverAI, your intelligent assistant. How can I help you today?"
      }
    ]);
    setResponseIndex(0);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    
    // Focus the input
    const inputElement = document.getElementById("chat-input");
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <section id="demo" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Interactive Demo
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience the Power of CleverAI
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Try our AI assistant firsthand. Ask questions, request information, or see how it
            can help analyze data and provide insights for your business.
          </motion.p>
        </div>
        
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex space-x-4 mb-6">
            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto py-2 text-sm"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetChat}
              title="Reset conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <Card className="border-border/40 shadow-lg">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="flex items-center text-lg">
                <Bot className="mr-2 h-5 w-5 text-primary" />
                CleverAI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                    variants={chatBubbleAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <Avatar className="mt-1">
                        {message.type === "user" ? (
                          <User className="h-5 w-5" />
                        ) : (
                          <Bot className="h-5 w-5" />
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.loading ? (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 rounded-full bg-primary-foreground/70 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary-foreground/70 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary-foreground/70 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        ) : (
                          <p className="text-sm">{message.text}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-3 border-t">
              <div className="flex w-full space-x-2">
                <Input
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="flex-grow"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!input.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            This is a demo of our conversational AI interface. In the actual product, the model will be connected to your business data and customized to your specific needs.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotDemo;
