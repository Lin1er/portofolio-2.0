"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { homeContent, personalInfo, socialLinks } from "@/data";

type Status = "idle" | "sending" | "success" | "error";

const EMPTY = { name: "", email: "", message: "", honeypot: "" };

const field =
  "w-full border-2 border-ink bg-concrete px-4 py-3 text-base font-medium text-ink placeholder:text-muted focus:bg-white focus:outline-none";

function ContactForm() {
  const f = homeContent.contact.form;
  const [data, setData] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (key: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bots fill the hidden field: pretend it worked and send nothing.
    if (data.honeypot) {
      setStatus("success");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setData(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 border-t-2 border-ink px-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)_auto] md:items-end md:px-8"
    >
      <p className="label md:col-span-4">{f.title}</p>
      <label className="flex flex-col gap-2">
        <span className="label text-[12px]">{f.name.label}</span>
        <input
          required
          name="name"
          value={data.name}
          onChange={update("name")}
          placeholder={f.name.placeholder}
          className={field}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="label text-[12px]">{f.email.label}</span>
        <input
          required
          type="email"
          name="email"
          value={data.email}
          onChange={update("email")}
          placeholder={f.email.placeholder}
          className={field}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="label text-[12px]">{f.message.label}</span>
        <textarea
          required
          name="message"
          rows={1}
          value={data.message}
          onChange={update("message")}
          placeholder={f.message.placeholder}
          className={`${field} min-h-[52px] resize-y`}
        />
      </label>
      {/* Honeypot: hidden from people, tempting for bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={data.honeypot}
        onChange={update("honeypot")}
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="press label inline-flex h-[52px] items-center justify-center gap-2 border-2 border-ink bg-ink px-7 text-accent hover:bg-concrete hover:text-ink disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {f.sending}
          </>
        ) : (
          f.submit
        )}
      </button>
      {(status === "success" || status === "error") && (
        <p role="status" className="label md:col-span-4">
          {status === "success" ? f.success : f.error}
        </p>
      )}
    </form>
  );
}

export function ContactSection() {
  const c = homeContent.contact;

  return (
    <section id="contact" aria-label={c.index} className="bg-accent text-ink">
      <div className="flex flex-col gap-5 px-5 pt-16 md:px-8">
        <span className="label">{c.index}</span>
        {/* Hover swaps SAY HI. for HIRE ME. */}
        <a
          href={`mailto:${personalInfo.email}`}
          aria-label={`${c.headline} ${personalInfo.email}`}
          className="group block h-[0.8em] overflow-hidden text-[25vw] font-bold leading-[0.8] tracking-[-0.07em]"
        >
          <span className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
            <span>{c.headline}</span>
            <span aria-hidden className="text-concrete">
              {c.hoverHeadline}
            </span>
          </span>
        </a>
      </div>

      <div className="grid border-t-2 border-ink md:grid-cols-[minmax(0,1fr)_repeat(3,minmax(220px,auto))]">
        <a
          href={`mailto:${personalInfo.email}`}
          className="flex flex-col gap-2 border-b-2 border-ink px-5 py-6 transition-colors hover:bg-ink hover:text-accent md:border-b-0 md:border-r-2 md:px-8"
        >
          <span className="label text-[12px]">{c.emailLabel}</span>
          <span className="flex items-center gap-2 break-all text-[clamp(22px,3vw,44px)] font-bold uppercase tracking-[-0.04em]">
            {personalInfo.email}
            <ArrowUpRight className="size-[0.8em] shrink-0" aria-hidden />
          </span>
        </a>
        {socialLinks.map((link, i) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col justify-center gap-2 border-b-2 border-ink px-5 py-6 transition-colors hover:bg-ink hover:text-accent md:border-b-0 md:px-7 ${
              i < socialLinks.length - 1 ? "md:border-r-2" : ""
            }`}
          >
            <span className="label text-[12px]">{link.name}</span>
            <span className="flex items-center gap-1 text-[22px] font-bold uppercase tracking-[-0.02em]">
              {link.username}
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
          </a>
        ))}
      </div>

      <ContactForm />

      <footer className="label flex flex-col gap-2 bg-ink px-5 py-5 text-[12px] text-concrete md:flex-row md:justify-between md:px-8">
        <span>
          © {new Date().getFullYear()} {personalInfo.name}
        </span>
        <span>{homeContent.footer.builtIn}</span>
        <a href="#top" className="text-accent hover:underline">
          {homeContent.footer.backToTop} ↑
        </a>
      </footer>
    </section>
  );
}
