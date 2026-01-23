"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { personalInfo, socialLinks as socialData } from "@/data";

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

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - you can integrate with an email service
    console.log(formData);
    alert("Thanks for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-(--muted) max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;d love to hear
            from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Contact Info */}
          <BentoCard delay={0.1}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-(--accent)/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-(--accent)" />
                    </div>
                    <div>
                      <p className="text-sm text-(--muted)">Email</p>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="font-medium hover:text-(--accent) transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-(--accent)/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-(--accent)" />
                    </div>
                    <div>
                      <p className="text-sm text-(--muted)">Location</p>
                      <p className="font-medium">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-(--muted) mb-3">Find me on</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <MagneticButton key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-(--background) flex items-center justify-center hover:bg-(--accent) hover:text-(--accent-foreground) transition-colors"
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Contact Form */}
          <BentoCard colSpan={2} delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-(--background) border border-(--border) rounded-lg focus:outline-none focus:border-(--accent) transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-(--background) border border-(--border) rounded-lg focus:outline-none focus:border-(--accent) transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 bg-(--background) border border-(--border) rounded-lg focus:outline-none focus:border-(--accent) transition-colors resize-none"
                  placeholder="Hi! I'd like to talk about..."
                  required
                />
              </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-(--accent) text-(--accent-foreground) rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
            </form>
          </BentoCard>

          {/* Availability Card */}
          <BentoCard colSpan={3} delay={0.3}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    Currently Available for Opportunities
                  </h3>
                  <p className="text-(--muted) text-sm">
                    Open to freelance projects, collaborations, and internship
                    opportunities.
                  </p>
                </div>
              </div>
              <MagneticButton>
                <a
                  href="mailto:your@email.com"
                  className="px-6 py-3 bg-(--accent) text-(--accent-foreground) rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Let&apos;s Work Together
                </a>
              </MagneticButton>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
