"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUpRight,
  Mail,
  Heart,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { personalInfo, socialLinks as socialData, navItems } from "@/data";

// Map social links with icons
const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
};

const socialLinks = socialData.map((link) => ({
  ...link,
  icon: iconMap[link.name] || Github,
}));

export function Footer() {
  return (
    <footer className="border-t border-(--border) mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="font-bold text-2xl gradient-text mb-4">
                {personalInfo.name}
              </h3>
            </Link>
            <p className="text-(--muted) text-sm leading-relaxed mb-6 max-w-md">
              {personalInfo.bio}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-sm text-(--muted) hover:text-(--accent) transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-(--card) border border-(--border) flex items-center justify-center group-hover:border-(--accent) transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-(--muted)">
                <div className="w-8 h-8 rounded-full bg-(--card) border border-(--border) flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                {personalInfo.location}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-(--muted) hover:text-(--foreground) transition-colors text-sm flex items-center gap-1 group w-fit"
                >
                  {item.name}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-5">Connect With Me</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-(--card) border border-(--border) flex items-center justify-center hover:border-(--accent) hover:text-(--accent) transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-(--muted)">
              Let&apos;s connect and build something amazing together!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-(--border) pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-(--muted) text-sm">
              © {new Date().getFullYear()} {personalInfo.name}. All rights
              reserved.
            </p>
            <p className="text-(--muted) text-sm flex items-center gap-1">
              Made with{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />{" "}
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
