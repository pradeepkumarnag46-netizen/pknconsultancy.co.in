import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/pkn-logo.jpg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20 gap-3">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img src={logo} alt="PKN Consultancy logo" className="h-10 md:h-14 w-auto object-contain shrink-0" />
          <div className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="font-display font-bold text-base md:text-lg text-foreground tracking-tight truncate">PKN Consultancy</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase truncate">Business & Tax Solutions</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/919891192069"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium border border-border bg-background hover:bg-muted transition-colors"
            aria-label="WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <Link to="/contact" className="hidden xs:block">
            <Button size="sm" className="text-xs sm:text-sm whitespace-nowrap">
              Free Consultation
            </Button>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-muted"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card pb-4">
          <nav className="container flex flex-col gap-1 pt-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium ${
                  pathname === l.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full">Free Consultation</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
