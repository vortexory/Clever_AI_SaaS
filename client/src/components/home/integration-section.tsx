import { INTEGRATION_ITEMS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SiOpenai, SiHuggingface } from "react-icons/si";
import { Database } from "lucide-react";

const IntegrationSection = () => {
  const getLogo = (logoName: string) => {
    switch (logoName) {
      case "openai-logo":
        return <SiOpenai className="h-6 w-6 text-[#00A67E]" />;
      case "langchain-logo":
        return (
          <div className="flex items-center justify-center bg-[#249567] rounded-full h-6 w-6 text-white font-bold text-xs">
            LC
          </div>
        );
      case "huggingface-logo":
        return <SiHuggingface className="h-6 w-6 text-[#FFD21E]" />;
      case "pinecone-logo":
        return <Database className="h-6 w-6 text-[#3670A0]" />;
      default:
        return null;
    }
  };

  return (
    <section id="integrations" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {INTEGRATION_ITEMS.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/40 hover:border-primary/30 transition-colors hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4">
                        {getLogo(integration.logo)}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Seamless Integrations
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Connect with Your <br className="hidden md:inline" />
                Favorite AI Tools
              </h2>
              
              <p className="text-lg text-muted-foreground">
                CleverAI provides native integration with the most powerful AI technologies in the market. Leverage the capabilities of multiple platforms within a single, unified interface.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/20 text-primary rounded-full p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Access multiple language models through a unified API</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/20 text-primary rounded-full p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Build complex AI chains and workflows with ease</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/20 text-primary rounded-full p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Store and search vector embeddings for context-aware AI</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary/20 text-primary rounded-full p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Fine-tune models on your specific business domain</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
