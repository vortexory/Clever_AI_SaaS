import { FeatureItem, PricingTier, FAQItem, IntegrationItem, ComparisonFeature } from "./types";
import {
  MessageSquare,
  Bot,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Languages,
  Workflow,
  Database,
} from "lucide-react";

export const FEATURES: FeatureItem[] = [
  {
    icon: "MessageSquare",
    title: "Advanced Chat Interface",
    description: "State-of-the-art chatbot interface with natural language understanding capabilities."
  },
  {
    icon: "Bot",
    title: "Custom AI Assistants",
    description: "Create personalized AI assistants tailored to your specific business requirements."
  },
  {
    icon: "Zap",
    title: "Instant Responses",
    description: "Ultra-fast response times with optimized AI processing for immediate assistance."
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    description: "Bank-grade security and privacy controls to protect your sensitive data."
  },
  {
    icon: "BarChart3",
    title: "Analytics Dashboard",
    description: "Comprehensive analytics to track performance, usage patterns, and customer satisfaction."
  },
  {
    icon: "Cpu",
    title: "Multi-Model Support",
    description: "Access to multiple AI models to suit different tasks and requirements."
  },
  {
    icon: "Languages",
    title: "Multilingual Support",
    description: "Built-in support for over 100 languages to serve global customers."
  },
  {
    icon: "Workflow",
    title: "Workflow Automation",
    description: "Seamlessly integrate AI into your existing workflows for enhanced productivity."
  },
  {
    icon: "Database",
    title: "Knowledge Base",
    description: "Train your AI on your company's data to provide accurate, domain-specific responses."
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small businesses and individual professionals.",
    features: [
      "1 AI assistant",
      "1,000 queries per month",
      "Basic customization",
      "Email support",
      "Standard response time"
    ],
    buttonText: "Get Started"
  },
  {
    name: "Professional",
    price: "$149",
    description: "Ideal for growing companies and teams.",
    features: [
      "3 AI assistants",
      "10,000 queries per month",
      "Advanced customization",
      "Priority support",
      "Analytics dashboard",
      "API access"
    ],
    buttonText: "Try Professional",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations.",
    features: [
      "Unlimited AI assistants",
      "Custom query limits",
      "Full customization",
      "24/7 dedicated support",
      "Advanced analytics",
      "Custom AI model training",
      "SLA guarantees"
    ],
    buttonText: "Contact Sales"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is CleverAI and how does it work?",
    answer: "CleverAI is a SaaS platform that leverages advanced AI technologies like LangChain and OpenAI to provide intelligent chatbots, assistants, and automation tools for businesses. Our platform processes natural language, understands context, and delivers human-like responses to enhance customer interactions and streamline operations."
  },
  {
    question: "How secure is my data with CleverAI?",
    answer: "Security is our top priority. CleverAI employs bank-grade encryption for all data, both in transit and at rest. We're compliant with major regulations including GDPR, HIPAA, and SOC 2. Your data is never used to train our base models without explicit permission, and you maintain full ownership and control."
  },
  {
    question: "Can I customize the AI to match my brand?",
    answer: "Absolutely! CleverAI offers extensive customization options including brand voice, visual styling, response patterns, and domain-specific knowledge. Our Professional and Enterprise plans include advanced customization features to ensure the AI represents your brand perfectly."
  },
  {
    question: "How does CleverAI integrate with my existing systems?",
    answer: "CleverAI provides seamless integration capabilities through our comprehensive API, pre-built connectors for popular platforms (Salesforce, Zendesk, Slack, etc.), and custom integration services for Enterprise clients. Our team can guide you through the integration process to ensure smooth implementation."
  },
  {
    question: "What languages does CleverAI support?",
    answer: "CleverAI supports over 100 languages with varying levels of proficiency. Major languages (English, Spanish, French, German, Japanese, Chinese, etc.) have the highest accuracy, while we continuously improve our capabilities in other languages. Enterprise clients can request prioritization for specific language enhancement."
  },
  {
    question: "How is pricing structured?",
    answer: "Our pricing is based on usage tiers, measured primarily by the number of AI queries processed monthly. We offer Starter, Professional, and Enterprise plans to accommodate different business needs and scales. Custom pricing is available for organizations with specific requirements."
  }
];

export const INTEGRATION_ITEMS: IntegrationItem[] = [
  {
    logo: "openai-logo",
    name: "OpenAI GPT",
    description: "Access the power of GPT models for natural language processing capabilities."
  },
  {
    logo: "langchain-logo",
    name: "LangChain",
    description: "Create complex AI chains and workflows with LangChain integration."
  },
  {
    logo: "huggingface-logo",
    name: "Hugging Face",
    description: "Tap into thousands of open-source models for specialized tasks."
  },
  {
    logo: "pinecone-logo",
    name: "Pinecone",
    description: "Vector database integration for efficient semantic search capabilities."
  }
];

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    name: "Advanced AI Models",
    cleverAI: true,
    competitor1: true,
    competitor2: true,
    competitor3: false
  },
  {
    name: "Custom Training",
    cleverAI: true,
    competitor1: true,
    competitor2: false,
    competitor3: false
  },
  {
    name: "Multi-LLM Support",
    cleverAI: true,
    competitor1: false,
    competitor2: false,
    competitor3: false
  },
  {
    name: "Enterprise Security",
    cleverAI: true,
    competitor1: true,
    competitor2: true,
    competitor3: true
  },
  {
    name: "Vector Database Integration",
    cleverAI: true,
    competitor1: false,
    competitor2: true,
    competitor3: false
  },
  {
    name: "API Access",
    cleverAI: true,
    competitor1: true,
    competitor2: true,
    competitor3: true
  },
  {
    name: "Workflow Automation",
    cleverAI: true,
    competitor1: false,
    competitor2: true,
    competitor3: false
  },
  {
    name: "Multi-language Support",
    cleverAI: true,
    competitor1: true,
    competitor2: false,
    competitor3: true
  }
];

export const lucideIcons = {
  MessageSquare,
  Bot,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Languages,
  Workflow,
  Database
};
