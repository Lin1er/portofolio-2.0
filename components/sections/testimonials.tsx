"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-(--muted) fill-transparent"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-(--muted) max-w-2xl mx-auto">
            Feedback from clients, colleagues, and workshop participants I&apos;ve had the pleasure to work with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <BentoCard key={testimonial.name} delay={index * 0.1}>
              <div className="flex flex-col h-full">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-(--accent) opacity-50" />
                </div>

                {/* Content */}
                <p className="text-(--muted) leading-relaxed flex-1 mb-6">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-(--border)">
                  <div className="w-10 h-10 rounded-full bg-(--accent)/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-(--accent)">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-(--muted)">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
