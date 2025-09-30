
export const API_BASE = 
  window.location.hostname === 'proessayworks.com' || 
  window.location.hostname === 'www.proessayworks.com'
    ? 'https://api.proessayworks.com'
    : 'http://localhost:5000';