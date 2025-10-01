let API_BASE;

if (typeof window !== "undefined") {
  API_BASE =
    window.location.hostname === 'proessayworks.com' ||
    window.location.hostname === 'www.proessayworks.com'
      ? 'https://api.proessayworks.com'
      : 'http://localhost:5000';
} else {
  // Use environment variable or default for server-side
  API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';
}

export { API_BASE };