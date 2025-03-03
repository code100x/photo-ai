import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/30 bg-background/95 backdrop-blur-md transition-all duration-500 ease-in-out">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:gap-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col space-y-6 transform transition-all duration-700 ease-out animate-in slide-in-from-bottom-10">
            <div className="group flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="font-bold font-mono text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide">
                100xPhoto
              </span>
            </div>

            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed transition-opacity duration-500 hover:opacity-80">
              Transform your photos with AI-powered editing tools. Create stunning visuals with just a few clicks.
            </p>

            <div className="flex gap-4">
              {[
                {
                  href: "https://x.com/100xdevs",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                  label: "Twitter",
                },
                {
                  href: "https://github.com/code100x/photo-ai",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  ),
                  label: "GitHub",
                },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full p-2 overflow-hidden transition-all duration-300 ease-in-out hover:bg-primary/10 hover:scale-110 group"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {[
              {
                title: "Company",
                links: ["About", "Pricing", "Blog", "Careers"],
              },
              {
                title: "Help",
                links: ["FAQ", "Contact", "Privacy", "Terms"],
              },
            ].map((section, index) => (
              <div
                key={index}
                className="space-y-5 transform transition-all duration-700 ease-out animate-in slide-in-from-bottom-10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="font-medium text-foreground uppercase text-sm tracking-wider transition-colors duration-300 hover:text-primary">
                  {section.title}
                </p>
                <nav className="flex flex-col space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href="/"
                      className="relative text-sm text-muted-foreground group overflow-hidden transition-all duration-300 ease-in-out hover:text-foreground"
                    >
                      <span className="relative z-10">{link}</span>
                      <span className="absolute inset-x-0 bottom-0 h-[2px] w-[2rem] bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/30 transform transition-all duration-700 ease-out animate-in slide-in-from-bottom-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-xs text-muted-foreground tracking-wide transition-opacity duration-300 hover:opacity-75">
              © {new Date().getFullYear()} PhotoAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="relative text-xs text-muted-foreground transition-all duration-300 ease-in-out hover:text-foreground hover:bg-transparent group"
                  asChild
                >
                  <Link href="/">
                    <span className="relative z-10">{item}</span>
                    <span className="absolute inset-x-0 bottom-0 h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}