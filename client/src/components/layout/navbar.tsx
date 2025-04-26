import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sparkles, Sun, Moon, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const { scrolled, scrollToSection } = useScroll(50);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [location] = useLocation();
  const isHomePage = location === "/";

  const navLinks = [
    { label: "Features", id: "features" },
    { label: "Integrations", id: "integrations" },
    { label: "Comparison", id: "comparison" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-background/95 backdrop-blur-sm shadow-md"
          : "py-4 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-1.5">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">CleverAI</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          {user ? (
            <Link href="/dashboard">
              <Button className="font-medium">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              {isHomePage && (
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="font-medium"
                >
                  Contact Us
                </Button>
              )}
              <Link href="/auth">
                <Button className="font-medium">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary rounded-lg p-1.5">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl">CleverAI</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="mt-6 flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        scrollToSection(link.id);
                        setIsOpen(false);
                      }}
                      className="text-base font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pt-6 flex flex-col space-y-3">
                  {user ? (
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      {isHomePage && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            scrollToSection("contact");
                            setIsOpen(false);
                          }}
                          className="w-full"
                        >
                          Contact Us
                        </Button>
                      )}
                      <Link href="/auth" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
