import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const { scrollToSection } = useScroll();

  return (
    <section className="relative pt-24 md:pt-32 pb-20 md:pb-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute -top-24 left-0 right-0 h-[400px] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 opacity-30 blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Powered by LangChain & OpenAI
            </span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Transform Your Business with{" "}
            <span className="text-primary">Intelligent AI</span> Solutions
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            CleverAI delivers cutting-edge artificial intelligence tools that streamline workflows,
            enhance customer experiences, and drive business growth through automation.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              onClick={() => scrollToSection("features")}
              className="px-8"
            >
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection("demo")}
              className="px-8"
            >
              Try Demo
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          className="relative mx-auto rounded-xl overflow-hidden shadow-2xl border border-border"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="AI chatbot interface" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 inline-block">
              <h3 className="text-lg font-medium mb-1">
                CleverAI Dashboard
              </h3>
              <p className="text-sm text-muted-foreground">
                Powerful analytics and insights from your AI assistants
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground font-medium">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple" className="h-8" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="h-8" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazon/amazon-original.svg" alt="Amazon" className="h-8" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" alt="Microsoft" className="h-8" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" alt="Slack" className="h-8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
