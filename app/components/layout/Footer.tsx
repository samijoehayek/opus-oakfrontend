import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";

const footerLinks = {
  shop: [
    { label: "Sofas", href: "/sofas" },
    { label: "Armchairs", href: "/armchairs" },
    { label: "Beds", href: "/beds" },
    { label: "Furniture", href: "/furniture" },
    { label: "Homeware", href: "/homeware" },
    { label: "Clearance", href: "/clearance" },
  ],
  help: [
    { label: "Delivery", href: "/delivery" },
    { label: "Returns", href: "/returns" },
    { label: "FAQs", href: "/faqs" },
    { label: "Care & Cleaning", href: "/care" },
    { label: "Finance Options", href: "/finance" },
    { label: "Contact Us", href: "/contact" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Meet the Makers", href: "/makers" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Showrooms", href: "/showrooms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--color-charcoal)] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-wide py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-3">
              Join the Loaf family
            </h3>
            <p className="text-white/70 mb-6">
              Sign up for exclusive offers, new product launches and a sprinkle
              of interiors inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <Button variant="accent" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="inline-block mb-4">
              <span className="font-[family-name:var(--font-display)] text-3xl font-semibold">
                Loaf
              </span>
            </Link>
            <p className="text-white/70 text-sm mb-6">
              Seriously comfy sofas, beautiful beds and laid-back furniture for
              the whole home.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Help</h4>
            <ul className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+441onal"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>0345 468 0698</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@loaf.com"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>hello@loaf.com</span>
                </a>
              </li>
              <li>
                <Link
                  href="/showrooms"
                  className="flex items-start gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Find your nearest showroom</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© 2024 Loaf. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
