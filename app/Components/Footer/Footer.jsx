"use client";

// SEO Keywords: essay writers, assignment writing service, reviews, testimonials, contact, privacy, service agreement

import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-600 pt-16 pb-8 px-0">
      <div className="max-w-none w-full">
        <div className="w-full mx-auto">
          <div className="relative bg-indigo-600 p-10 w-full">
            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 w-full">
              {/* About ProEssayWorks */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaPencilAlt className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-extrabold text-white tracking-tight">ProEssayWorks</span>
                </div>
                <p className="text-white text-sm mb-4">
                  ProEssayWorks offers writing, editing, and rewriting help for academic assignments. Work with verified experts who deliver top-quality, original work.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs text-white">Remote-first academic solutions</span>
                </div>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/writers", label: "Writers" },
                    { href: "/gethelp", label: "Order Assignment" },
                    { href: "/blog", label: "Blog" },
                    { href: "/reviews", label: "Reviews" },
                    { href: "/contact", label: "Contact" }
                  ].map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white hover:border-b-2 hover:border-white pb-1 transition-all"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "PayPal",
                    "TapTap",
                    "Remitly",
                    "Western Union",
                    "CashApp",
                    "Bank Transfer"
                  ].map(method => (
                    <span
                      key={method}
                      className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:border-b-2 hover:border-white transition-all cursor-pointer"
                    >
                      {method}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <span className="text-xs text-white">100% satisfaction guarantee as per our refund terms</span>
                </div>
              </div>
              {/* Legal & Social */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Legal & Social</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    { href: "/serviceagreement", label: "Service Agreement" },
                    { href: "/privacynotice", label: "Privacy Notice" },
                    { href: "/moneyback", label: "Money-Back" },
                    { href: "/ethics", label: "Ethics Code" }
                  ].map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white hover:border-b-2 hover:border-white pb-1 transition-all"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <Link href="https://twitter.com/" target="_blank" className="group">
                    <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg group-hover:border-b-2 group-hover:border-white transition-all">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99A12.13 12.13 0 0 1 3.15 5.13a4.28 4.28 0 0 0 1.33 5.72c-.7-.02-1.36-.21-1.94-.53v.05c0 2.01 1.43 3.69 3.33 4.07-.35.1-.72.16-1.1.16-.27 0-.53-.03-.78-.07.53 1.65 2.07 2.85 3.89 2.88A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.72 8.72 0 0 0 24 4.59a8.54 8.54 0 0 1-2.54.7z"/></svg>
                    </div>
                  </Link>
                  <Link href="https://instagram.com/" target="_blank" className="group">
                    <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg group-hover:border-b-2 group-hover:border-white transition-all">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="border-t border-white mb-6"></div>
            {/* Copyright & Credits */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
              <p className="text-white text-sm">
                &copy; 2025 <span className="font-semibold text-white">proessayworks.com</span> &mdash; All rights reserved
              </p>
              <div className="flex items-center gap-2 text-xs text-white">
                <span>Designed by</span>
                <Image src="/youvilab.png" width={48} height={64} alt="youvilab" className="w-8 h-8 rounded-full cursor-pointer" />
                <span>| Remote-first academic solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}