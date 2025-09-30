import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'bx163y82', // Updated with your actual Sanity project ID
  dataset: 'production',        // Or your dataset name
  useCdn: true
}); 