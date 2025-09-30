import React from 'react'
import Hero from '../../Components/Hero/Hero'
import Benefits from '../../Components/Benefits/Benefits'
import Services from '../../Components/Services/Services'
import Pricing from '../../Components/Pricing/Pricing'
import Testimonials from '../../Components/Testimonial/Testimonial'
import Writers from '../../Components/Writers/Writers'
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ProEssayWorks | Essay Writing Help & Academic Services</title>
        <meta name="description" content="Get expert essay writing help, editing, and rewriting from top academic professionals. ProEssayWorks helps students excel with high-quality, original papers." />
        <meta property="og:title" content="ProEssayWorks | Essay Writing Help & Academic Services" />
        <meta property="og:description" content="Get expert essay writing help, editing, and rewriting from top academic professionals. ProEssayWorks helps students excel with high-quality, original papers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'ProEssayWorks',
            'url': 'https://proessayworks.com/',
            'logo': 'https://proessayworks.com/logo.png',
            'sameAs': [
              'https://proessayworks.com/',
              'https://proessayworks.com/blog'
            ]
          })}
        </script>
      </Helmet>
      <div>
        <Hero/>
        <Writers/>
        <Benefits/>
        <Services/>
        <Pricing/>
        <Testimonials/>
      </div>
    </>
  )
}

export default Home