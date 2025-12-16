import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { handleScroll } from "@/utils/handleScroll";
import { useAuth } from "@/context/AuthContext";
import Avatar from "@/components/Avatar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Statistics", id: "statistics" },
    { name: "Features", id: "features" },
    { name: "Testimonials", id: "testimonials" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-border"
      ref={menuRef}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary">
          <img src="/logo.png" alt="logo" className="h-6" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium cursor-pointer"
              onClick={() => handleScroll(link.id)}
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* CTA / Avatar */}
        <div className="hidden md:block">
          {!user ? (
            <Button asChild className="shadow-primary/20">
              <Link to="/signin">Sign in</Link>
            </Button>
          ) : (
            <Link to={`/${user.role}/dashboard`}>
              <Avatar gender={user.gender} className="h-10 w-10" />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="cursor-pointer"
                onClick={() => {
                  handleScroll(link.id);
                  setOpen(false);
                }}
              >
                {link.name}
              </li>
            ))}
            <li>
              {!user ? (
                <Button>
                  <Link to="/signin">Sign in</Link>
                </Button>
              ) : (
                <Link to={`/${user.role}/dashboard`}>
                  Dashboard
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
