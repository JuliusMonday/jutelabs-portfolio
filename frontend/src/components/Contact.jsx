import React, { useState, useRef } from "react";

// Replace with your encrypted FormSubmit token URL when ready
const FORM_SUBMIT_URL = "https://formsubmit.co/YOUR_UNIQUE_TOKEN_HERE";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const body = String(data.message || "").trim();
    const honey = String(data._honey || "").trim();

    // Honeypot check
    if (honey) {
      setStatus("error");
      setMessage("Spam detected.");
      return;
    }

    // Frontend validation
    if (!name || !email || !body) {
      setStatus("error");
      setMessage("Please fill in name, email, and message.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please provide a valid email address.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("message", body);
      // FormSubmit controls: honeypot and captcha
      payload.append("_honey", "");
      payload.append("_captcha", "true");
      payload.append("_subject", `Portfolio Contact from ${name}`);

      const res = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks — your message was sent.");
        form.reset();
        if (formRef.current) formRef.current.reset();
      } else {
        const json = await res.json().catch(() => null);
        setStatus("error");
        setMessage(json?.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("FormSubmit error:", err);
      setStatus("error");
      setMessage("Unable to send message at this time.");
    }
  }

  return (
    <section
      id="contact"
      className="py-16 px-6 md:px-20 bg-white text-[#0a192f]"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Side - Info */}
        <div>
          <h2 className="text-3xl font-bold text-[#0a192f]">Get in touch</h2>
          <p className="mt-3 text-[#111111]/80">
            I’m open to new opportunities, collaborations, and freelance work.
            Send a message — I’ll reply as soon as I can.
          </p>
          <div className="mt-6 space-y-3 text-sm text-[#111111]/70">
            <div>
              <strong className="text-[#0a192f]">Email:</strong>{" "}
              jutelabsofficial@gmail.com
            </div>
            <div>
              <strong className="text-[#0a192f]">Location:</strong> Nigeria
              (Remote & On-site)
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-6 border border-[#d9e3f0] rounded-xl shadow-sm bg-[#f9fbfd]"
          aria-live="polite"
        >
          {/* Honeypot - hidden from users */}
          <input type="text" name="_honey" style={{ display: "none" }} />
          {/* Enable FormSubmit reCAPTCHA on their side by including this field */}
          <input type="hidden" name="_captcha" value="true" />

          <label className="block">
            <span className="text-sm font-medium text-[#0a192f]">Name</span>
            <input
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-[#d9e3f0] bg-white px-3 py-2 focus:ring-2 focus:ring-[#00ffff] focus:outline-none"
            />
          </label>

          <label className="block mt-3">
            <span className="text-sm font-medium text-[#0a192f]">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-[#d9e3f0] bg-white px-3 py-2 focus:ring-2 focus:ring-[#00ffff] focus:outline-none"
            />
          </label>

          <label className="block mt-3">
            <span className="text-sm font-medium text-[#0a192f]">Message</span>
            <textarea
              name="message"
              rows="4"
              required
              className="mt-1 block w-full rounded-md border border-[#d9e3f0] bg-white px-3 py-2 focus:ring-2 focus:ring-[#00ffff] focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 w-full md:w-auto px-6 py-2 bg-[#00ffff] text-[#0a192f] font-semibold rounded-md hover:bg-[#22d39a] transition-all disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send Message"}
          </button>

          {message && (
            <p
              className={`mt-4 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
