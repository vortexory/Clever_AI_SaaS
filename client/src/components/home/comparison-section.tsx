import { COMPARISON_FEATURES } from "@/lib/constants";
import { CheckIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Competitive Advantage
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Choose CleverAI
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            See how CleverAI compares to other platforms in the market and why industry leaders
            choose our solution for their AI needs.
          </motion.p>
        </div>
        
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 border-b border-border font-medium text-muted-foreground">
                  Features
                </th>
                <th className="px-6 py-4 border-b border-border bg-primary/5">
                  <div className="font-bold text-lg text-foreground">CleverAI</div>
                </th>
                <th className="px-6 py-4 border-b border-border">
                  <div className="font-medium text-muted-foreground">Competitor A</div>
                </th>
                <th className="px-6 py-4 border-b border-border">
                  <div className="font-medium text-muted-foreground">Competitor B</div>
                </th>
                <th className="px-6 py-4 border-b border-border">
                  <div className="font-medium text-muted-foreground">Competitor C</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((feature, index) => (
                <tr 
                  key={index}
                  className={index % 2 === 0 ? 'bg-muted/20' : ''}
                >
                  <td className="text-left px-6 py-4 border-b border-border/50 font-medium">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 border-b border-border/50 text-center bg-primary/5">
                    {feature.cleverAI ? (
                      <CheckIcon className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <XIcon className="h-5 w-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-border/50 text-center">
                    {feature.competitor1 ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XIcon className="h-5 w-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-border/50 text-center">
                    {feature.competitor2 ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XIcon className="h-5 w-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-border/50 text-center">
                    {feature.competitor3 ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XIcon className="h-5 w-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        
        <motion.div
          className="mt-12 max-w-3xl mx-auto p-6 border border-primary/30 rounded-lg bg-primary/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="md:flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Unique CleverAI Advantage
              </h3>
              <p className="text-muted-foreground">
                CleverAI is the only platform offering complete multi-LLM support with custom training capabilities, allowing you to leverage the best models for each specific task while maintaining a unified workflow and interface.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
