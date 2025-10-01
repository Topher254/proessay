"use client";

import Image from "next/image";
import { Star, Edit3, FileText, RefreshCw, ArrowRight } from 'lucide-react';
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleGetHelp = () => {
    router.push('/gethelp');
  };

  return (
    <>
      <Head>
        <title>About ProEssayWorks | Academic Essay Writing Experts</title>
        <meta name="description" content="Learn about ProEssayWorks, your trusted partner for essay writing, editing, and academic help. Meet our expert team and discover our mission to help students succeed." />
        <meta property="og:title" content="About ProEssayWorks | Academic Essay Writing Experts" />
        <meta property="og:description" content="Learn about ProEssayWorks, your trusted partner for essay writing, editing, and academic help. Meet our expert team and discover our mission to help students succeed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/about" />
        <meta name="keywords" content="essay writers, personal statement writing service, rewrite my essay, scholarship essay writing service, speech writing services, edit my essay, literature review writing service, admission essay writing service, analytical essay writing service, college essay writing" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'ProEssayWorks',
              'url': 'https://proessayworks.com/',
              'logo': 'https://proessayworks.com/logo.png',
              'description': 'ProEssayWorks offers writing, editing, and rewriting help for academic assignments.'
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 w-full">
        {/* Hero Section */}
        <section className="w-full px-4 py-16">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="text-indigo-600">ProEssayWorks</span> — Your Academic Success Partner
              </h1>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Struggling with deadlines? Need expert help to ace your assignments? ProEssayWorks connects you with top academic writers, editors, and proofreaders who deliver excellence—every time. Join thousands of students who trust us for fast, reliable, and confidential support.
              </p>
              <button 
                onClick={handleGetHelp}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full cursor-pointer font-bold text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
              >
                Get Help Now <ArrowRight className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="font-bold text-gray-900 text-xl">4.8/5</span>
                  <span className="text-gray-500 text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  <span className="font-bold text-gray-900 text-xl">478+</span>
                  <span className="text-gray-500 text-sm">Reviews</span>
                </div>
              </div>
            </div>
            {/* Right Content - Hero Image */}
            <div className="flex-1 relative max-w-lg w-full flex items-center justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] w-full flex items-center justify-center bg-white">
                <Image
                  src="/writers-hero.png"
                  alt="ProEssayWorks team helping students"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-indigo-600/60 to-transparent w-full h-32 rounded-b-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="w-full px-4 py-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Image src="/confidential.png" alt="Confidentiality" width={48} height={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold text-indigo-700 mb-2">100% Confidential</h3>
              <p className="text-gray-600">Your privacy is our top priority. All orders are handled securely and discreetly.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Image src="/womanbg.png" alt="Fast Delivery" width={48} height={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold text-indigo-700 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Deadlines are sacred. Get your work delivered on time, every time—guaranteed.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Image src="/wobg.png" alt="Quality Guarantee" width={48} height={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold text-indigo-700 mb-2">Quality Assured</h3>
              <p className="text-gray-600">Every assignment is checked for originality and quality by our expert team.</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Get expert help with any academic task. Our team is ready to deliver top-notch work tailored to your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Edit3 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Writing</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Get custom essays, research papers, and more—written by subject experts. Fast turnaround, zero plagiarism.
                </p>
                <button 
                  onClick={handleGetHelp}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition-colors duration-200"
                >
                  Write For Me
                </button>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Editing</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our editors perfect your work—grammar, structure, citations, and formatting. Submit with confidence!
                </p>
                <button 
                  onClick={handleGetHelp}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition-colors duration-200"
                >
                  Edit For Me
                </button>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <RefreshCw className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rewriting</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Need a fresh take? We’ll rewrite your drafts for clarity, originality, and impact.
                </p>
                <button 
                  onClick={handleGetHelp}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition-colors duration-200"
                >
                  Rewrite For Me
                </button>
              </div>
            </div>
          </div>
        </section>

        
        {/* Final CTA */}
        <section className="w-full px-4 py-16">
          <div className="max-w-3xl mx-auto bg-indigo-600 rounded-2xl shadow-xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Succeed?</h2>
            <p className="text-white text-lg mb-8">
              Get expert help with your next assignment. Fast, confidential, and guaranteed quality.
            </p>
            <button 
              onClick={handleGetHelp}
              className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-full cursor-pointer text-lg shadow-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              Get Started <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}