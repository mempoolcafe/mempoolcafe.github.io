"use client";

import { useState, type FormEvent } from "react";
import { portfolioData } from "@/lib/portfolio-data";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // No backend: submitting composes a draft in the visitor's email client.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-5">
      <div>
        <p>
          Send a message here and it will open a draft in your email client,
          or reach out directly:
        </p>
        <p className="mt-2 font-bold">
          <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
        </p>
        <p className="mt-2">
          {portfolioData.socials
            .filter((social) => social.href.startsWith("http"))
            .map((social) => (
              <span key={social.label} className="mr-2 whitespace-nowrap">
                [{" "}
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>{" "}
                ]
              </span>
            ))}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="box max-w-md space-y-3 bg-[#f4f4f0]">
        <div>
          <label htmlFor="contact-name" className="mb-1 block font-bold">
            Your name:
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Harry Potter"
            className="input-classic"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1 block font-bold">
            Message:
          </label>
          <textarea
            id="contact-message"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Dear Mr. Potter, ..."
            className="input-classic resize-y"
          />
        </div>
        <button type="submit" className="btn-classic">
          Send Message
        </button>
      </form>
    </div>
  );
}
