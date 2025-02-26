import 'dotenv/config'

export const {
  PORT = 80,
  API_KEY_RESEND = '',
  EMAIL_RECEIVE = '',
  ACCEPTED_ORIGINS = ''
} = process.env