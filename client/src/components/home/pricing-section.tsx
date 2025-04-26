import { useState } from "react";
import { PRICING_TIERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PricingSection = () => {
  const [annualBilling, setAnnualBilling] = useState(false);

  const getAdjustedPrice = (price: string) => {
    if (price === "Custom") return "Custom";
    
    const numericPrice = parseInt(price.replace(/\D/g, ''));
    const annualPrice = Math.round(numericPrice * 10.8) / 12; // 10% discount
    
    return annualBilling ? `$${annualPrice}` : price;
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pricing Plans
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Transparent Pricing for Every Business
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that works best for your needs. All plans include core features with different
            levels of support and customization options.
          </motion.p>
          
          <motion.div
            className="flex items-center justify-center space-x-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="billing-toggle" className="text-muted-foreground">Monthly Billing</Label>
            <Switch 
              id="billing-toggle" 
              checked={annualBilling} 
              onCheckedChange={setAnnualBilling}
            />
            <Label htmlFor="billing-toggle" className="flex items-center">
              <span className={annualBilling ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                Annual Billing
              </span>
              {annualBilling && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium dark:bg-green-900 dark:text-green-200">
                  Save 10%
                </span>
              )}
            </Label>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card 
                className={`h-full flex flex-col ${
                  tier.popular ? 'border-primary shadow-lg relative' : 'border-border/40'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{getAdjustedPrice(tier.price)}</span>
                    {tier.price !== "Custom" && (
                      <span className="text-muted-foreground ml-1">
                        {annualBilling ? "/mo (billed annually)" : "/month"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <div className="mr-2 mt-1 bg-primary/20 text-primary rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${tier.popular ? '' : 'bg-card hover:bg-card/80 text-card-foreground border border-border/60'}`}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom solution? <a href="#contact" className="text-primary hover:underline">Contact us</a> for enterprise pricing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
