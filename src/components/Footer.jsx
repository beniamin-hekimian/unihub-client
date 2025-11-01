import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border text-muted-foreground py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo / Brand */}
        <Link to="/" className="text-lg font-bold text-primary">
          UniHub
        </Link>
        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} UniHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
