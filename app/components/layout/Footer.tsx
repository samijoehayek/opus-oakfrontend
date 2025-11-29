"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "Sofas", href: "/sofas" },
      { label: "Armchairs", href: "/armchairs" },
      { label: "Beds", href: "/beds" },
      { label: "Tables", href: "/tables" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Custom Design", href: "/custom" },
      { label: "Interior Consultation", href: "/consultation" },
      { label: "Trade Program", href: "/trade" },
      { label: "Care & Restoration", href: "/care" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Showrooms", href: "/showrooms" },
    ],
  },
];

const socialLinks = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "Youtube" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <footer className="bg-[var(--color-ink)] text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-sand)]/40 to-transparent" />

      {/* Newsletter */}
      <div className="relative border-b border-white/5">
        <div className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <span className="text-[var(--color-sand)] text-xs tracking-[0.3em] uppercase mb-4 block">
                  Stay Connected
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-4">
                  Join the World of
                  <br />
                  <span className="italic text-[var(--color-sand)]">
                    Opus&amp;Oak
                  </span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Be the first to discover new collections, exclusive offers,
                  and design inspiration curated for the discerning eye.
                </p>
              </div>
              <div>
                <form className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-sand)] transition-colors text-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[var(--color-sand)] hover:text-white transition-colors group"
                  >
                    <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
                <p className="text-white/30 text-xs mt-4">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative w-full px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-[family-name:var(--font-display)] text-4xl">
                Opus&amp;Oak
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              Bespoke furniture crafted with precision, designed for those who
              appreciate the art of refined living.
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:+9611234567"
                className="flex items-center gap-4 text-sm text-white/60 hover:text-[var(--color-sand)] transition-colors group"
              >
                <span className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-sand)]/50 transition-colors">
                  <Phone className="h-4 w-4" />
                </span>
                <span>+961 1 234 567</span>
              </a>
              <a
                href="mailto:hello@opusandoak.com"
                className="flex items-center gap-4 text-sm text-white/60 hover:text-[var(--color-sand)] transition-colors group"
              >
                <span className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-sand)]/50 transition-colors">
                  <Mail className="h-4 w-4" />
                </span>
                <span>hello@opusandoak.com</span>
              </a>
              <Link
                href="/showrooms"
                className="flex items-center gap-4 text-sm text-white/60 hover:text-[var(--color-sand)] transition-colors group"
              >
                <span className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-sand)]/50 transition-colors">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>Visit Our Showroom</span>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-[var(--color-sand)] transition-colors"
                >
                  <social.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links - Desktop */}
          <div className="hidden md:grid lg:col-span-8 grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-[var(--color-sand)] transition-colors inline-block relative group"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-sand)] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Links - Mobile Accordion */}
          <div className="md:hidden space-y-0 border-t border-white/5">
            {footerSections.map((section) => (
              <div key={section.title} className="border-b border-white/5">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full py-4 flex items-center justify-between text-left"
                >
                  <span className="text-sm tracking-wide uppercase text-white/70">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/40 transition-transform duration-300 ${
                      expandedSection === section.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedSection === section.title ? "auto" : 0,
                    opacity: expandedSection === section.title ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="pb-4 space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/50 hover:text-[var(--color-sand)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5">
        <div className="w-full px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 order-2 md:order-1">
              © {new Date().getFullYear()} Opus&amp;Oak. All rights reserved.
            </p>
            <div className="flex items-center gap-8 order-1 md:order-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
