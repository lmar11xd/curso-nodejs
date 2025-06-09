import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'https://movies-app.com'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin) || !origin) {
      callback(null, origin) // Allow the request if the origin is accepted
    } else {
      callback(new Error('CORS not allowed'), false) // Reject the request if the origin is not accepted
    }
  }
})