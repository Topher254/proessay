let API_BASE;

if (typeof window !== "undefined") {
  API_BASE =
    window.location.hostname === 'American Academic Consulting Group.com' ||
    window.location.hostname === 'www.American Academic Consulting Group.com'
      ? 'https://api.American Academic Consulting Group.com'
      : 'http://localhost:5000';
} else {
  // Use environment variable or default for server-side
  API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
}

export { API_BASE };