"use client";

import { useState } from 'react';
import { Star, MessageCircle, Mail, Phone, X } from 'lucide-react';
import Head from "next/head";
import Image from "next/image";

const writers = [
  {
    id: 1,
    name: "Cole Raphael",
    rating: 4.9,
    status: "Online now",
    successRate: 98,
    completed: 512,
    reviews: 217,
    degree: "Msc. Computer Science",
    competences: ["Programming", "Artificial Intelligence", "Data Structures"],
    review: {
      userId: "#518333",
      text: "Cole delivered a brilliant analysis of postmodern literature that exceeded all my expectations. The depth of insight was remarkable."
    },
    image: "/cole.jpg",
    email: "cole.raphael@proessayworks.com",
    whatsapp: "+19149016306"
  },
  {
    id: 2,
    name: "Gabriel Whitney",
    rating: 5.0,
    status: "Away",
    successRate: 100,
    completed: 389,
    reviews: 184,
    degree: "M.Sc. in Biological Sciences",
    competences: ["Genetics", "Microbiology", "Ecology"],
    review: {
      userId: "#519844",
      text: "Whitney's research on genetic markers was comprehensive and perfectly formatted. I received an A+ on my thesis proposal."
    },
    image: "/gabriel.jpg",
    email: "gabriel.whitney@proessayworks.com",
    whatsapp: "+12068553599"
  },
  {
    id: 3,
    name: "Darwin Victor",
    rating: 4.8,
    status: "Online now",
    successRate: 97,
    completed: 621,
    reviews: 305,
    degree: "MBA in Finance",
    competences: ["Corporate Finance", "Investment Analysis", "Economic Policy"],
    review: {
      userId: "#520911",
      text: "Victor crafted a flawless financial analysis that impressed my professor. His attention to detail is exceptional."
    },
    image: "/victor.jpg",
    email: "darwin.victor@proessayworks.com",
    whatsapp: "+19852873428"
  },
  {
    id: 4,
    name: "Elvis Ruben",
    rating: 4.9,
    status: "Offline",
    successRate: 99,
    completed: 437,
    reviews: 192,
    degree: "Ph.D. in Physics",
    competences: ["Quantum Mechanics", "Astrophysics", "Material Science"],
    review: {
      userId: "#517422",
      text: "Elvis explained complex quantum concepts with remarkable clarity. My paper was praised for its originality and depth."
    },
    image: "/elvis.jpg",
    email: "elvis.ruben@proessayworks.com",
    whatsapp: "+254702304046"
  },
  {
    id: 5,
    name: "Sophia Chen",
    rating: 5.0,
    status: "Online now",
    successRate: 100,
    completed: 284,
    reviews: 132,
    degree: "M.A. in History",
    competences: ["European History", "Historiography", "Cultural Studies"],
    review: {
      userId: "#521567",
      text: "Sophia's historical analysis was both insightful and engaging. She transformed a dry topic into a fascinating narrative."
    },
    image: "/sophia.jpg",
    email: "sophia.chen@proessayworks.com",
    whatsapp: "+254796871876"
  },
  {
    id: 6,
    name: "Marcus Johnson",
    rating: 4.7,
    status: "Away",
    successRate: 96,
    completed: 398,
    reviews: 187,
    degree: "J.D. in Law",
    competences: ["Constitutional Law", "International Law", "Legal Writing"],
    review: {
      userId: "#522489",
      text: "Marcus crafted a compelling legal argument that was both persuasive and impeccably researched. Highly recommended!"
    },
    image: "/marcus.jpg",
    email: "marcus.johnson@proessayworks.com",
    whatsapp: "+19149016306"
  }
];

export default function WritersPage() {
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleHireWriter = (writer) => {
    setSelectedWriter(writer);
    setShowContactModal(true);
  };

  const handleContactMethod = (method) => {
    if (method === 'email') {
      window.location.href = `mailto:${selectedWriter.email}?subject=Writing Assignment Request&body=Hello ${selectedWriter.name},%0D%0A%0D%0AI would like to discuss a writing assignment with you.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you!`;
    } else if (method === 'whatsapp') {
      window.open(`https://wa.me/${selectedWriter.whatsapp.replace('+', '')}?text=Hello ${selectedWriter.name}, I would like to discuss a writing assignment with you.`, '_blank');
    }
    setShowContactModal(false);
  };

  return (
    <>
      <Head>
        <title>Our Writers | ProEssayWorks Academic Experts</title>
        <meta name="description" content="Meet the top essay writers at ProEssayWorks. Our academic experts are ready to help you with any assignment, ensuring quality and originality every time." />
        <meta property="og:title" content="Our Writers | ProEssayWorks Academic Experts" />
        <meta property="og:description" content="Meet the top essay writers at ProEssayWorks. Our academic experts are ready to help you with any assignment, ensuring quality and originality every time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/writers" />
        <meta name="keywords" content="essay writers, professional writers, writing team, scholarship essay writing service, argumentative essay writing service, college essay writing" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'ProEssayWorks',
              'url': 'https://proessayworks.com/',
              'logo': 'https://proessayworks.com/logo.png',
              'description': 'Meet the top essay writers at ProEssayWorks. Our academic experts are ready to help you with any assignment.'
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Only the best writers you can count on
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Our writing team is both qualified and diverse, so you can always find the perfect fit for any assignment. Browse our writers' profiles, chat with them, check reviews—whatever you need to know that your paper is in good hands.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <select className="px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option className='text-black'>Choose subject</option>
                    <option>English Literature</option>
                    <option>History</option>
                    <option>Psychology</option>
                    <option>Business</option>
                    <option>Science</option>
                  </select>
                  <button className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br  rounded-3xl flex items-center justify-center">
                    <Image 
                      src="/writers-hero.png"
                      alt="Professional writer"
                      width={256}
                      height={256}
                      className="w-64 h-64 object-cover rounded-2xl"
                      priority
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-indigo-500">4.8/5</span>
                    </div>
                    <p className="text-sm text-gray-600">Writer rating</p>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="text-2xl font-bold text-indigo-600">478</div>
                    <p className="text-sm text-gray-600">Customer reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Writers Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {writers.map((writer) => (
              <div key={writer.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Image
                      src={writer.image}
                      alt={`${writer.name} - ProEssayWorks academic writer profile photo`}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      writer.status.includes('Online') ? 'bg-green-500' : 
                      writer.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-700">{writer.name}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-500">{writer.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">Based on {writer.reviews} reviews</p>
                    <p className="text-sm text-gray-600 font-medium">{writer.degree}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-2 h-2 rounded-full ${
                        writer.status.includes('Online') ? 'bg-green-500' : 
                        writer.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm text-gray-600">
                        {writer.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Competences:</p>
                  <div className="flex flex-wrap gap-1">
                    {writer.competences.map((competence, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                        {competence}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Orders Completed</span>
                  <span className="font-semibold ml-auto text-green-500">{writer.completed}</span>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Latest Review ({writer.review.userId}):</p>
                  <p className="text-sm text-gray-700 italic">"{writer.review.text}"</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-50 transition-colors">
                    About Writer
                  </button>
                  <button 
                    onClick={() => handleHireWriter(writer)}
                    className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    Hire Writer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && selectedWriter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Contact {selectedWriter.name}</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={selectedWriter.image}
                    alt={`${selectedWriter.name} - ProEssayWorks academic writer profile photo`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{selectedWriter.name}</h4>
                    <p className="text-sm text-gray-600">{selectedWriter.degree}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{selectedWriter.rating} ({selectedWriter.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Choose how you'd like to contact this writer:
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => handleContactMethod('email')}
                  className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-6 h-6 text-indigo-500" />
                  <div className="text-left">
                    <div className="font-medium">Send Email</div>
                    <div className="text-sm text-gray-600">{selectedWriter.email}</div>
                  </div>
                </button>

                <button 
                  onClick={() => handleContactMethod('whatsapp')}
                  className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-6 h-6 text-green-500" />
                  <div className="text-left">
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-gray-600">{selectedWriter.whatsapp}</div>
                  </div>
                </button>
              </div>

              <button 
                onClick={() => setShowContactModal(false)}
                className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}