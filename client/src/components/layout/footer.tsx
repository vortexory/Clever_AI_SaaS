import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScroll } from "@/hooks/use-scroll";
import { Sparkles, Mail, Twitter, Linkedin, Github, Facebook } from "lucide-react";

const Footer = () => {
  const { scrollToSection } = useScroll();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary rounded-lg p-1.5">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">CleverAI</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Transforming businesses with intelligent AI solutions powered by
              cutting-edge technology.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("integrations")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Integrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link href="/changelog">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Changelog
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link href="/partners">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Partners
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest news and updates from our team.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CleverAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </Link>
            <Link href="/security">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
