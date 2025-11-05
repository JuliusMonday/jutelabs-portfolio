import React, { useRef } from 'react'

export default function Contact() {
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      alert('Thanks — your message was sent.')
      e.target.reset()
    } catch (err) {
      console.error(err)
      alert('Sorry — something went wrong.')
    }
  }

  return (
    <section id="contact" className="py-16 px-6 md:px-20 bg-white text-[#0a192f]">
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
              <strong className="text-[#0a192f]">Email:</strong>{' '}
              juliuschimaobi6@gmail.com
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
        >
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
            className="mt-5 w-full md:w-auto px-6 py-2 bg-[#00ffff] text-[#0a192f] font-semibold rounded-md hover:bg-[#22d39a] transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
