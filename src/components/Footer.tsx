import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/pkn-logo.png";

const services = [
  { label: "GST Registration", to: "/services/gst" },
  { label: "GST Return Filing", to: "/services/gst" },
  { label: "TDS Return Filing", to: "/services/tds" },
  { label: "Income Tax Filing", to: "/services/income-tax" },
  { label: "Company Registration", to: "/services/company-registration" },
  { label: "Payroll Management", to: "/services/payroll" },
  { label: "Trademark Registration", to: "/services/trademark" },
  { label: "Website Creation", to: "/services/website-creation" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact Us", to: "/contact" },
];

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="PKN Consultancy logo" className="w-10 h-10 rounded-lg object-contain bg-white p-1 shadow-md" />
            <span className="font-display font-bold text-lg">PKN Consultancy</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed mb-6">
            Your one-stop solution for all business, tax, compliance, and digital services in India. We help businesses stay compliant and grow.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/919891192069"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:opacity-90 transition"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="mailto:pknconsultancy06@gmail.com"
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-base mb-4">Our Services</h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.label}>
                <Link to={s.to} className="text-sm opacity-70 hover:opacity-100 transition">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-base mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm opacity-70 hover:opacity-100 transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-base mb-4">Contact Info</h3>
          <ul className="space-y-4 text-sm opacity-70">
            <li className="flex gap-3 items-start">
              <Phone className="w-4 h-4 mt-0.5 shrink-0" />
              <span>+91 98911 92069</span>
            </li>
            <li className="flex gap-3 items-start">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" />
              <span>pknconsultancy06@gmail.com</span>
            </li>
            <li className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>A-345, Pradhan Enclave, Burari, Delhi-110084</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-background/10">
      <div className="container py-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} PKN Consultancy. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
