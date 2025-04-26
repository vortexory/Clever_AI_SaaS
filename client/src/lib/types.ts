export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface IntegrationItem {
  logo: string;
  name: string;
  description: string;
}

export interface ComparisonFeature {
  name: string;
  cleverAI: boolean;
  competitor1: boolean;
  competitor2: boolean;
  competitor3: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}
