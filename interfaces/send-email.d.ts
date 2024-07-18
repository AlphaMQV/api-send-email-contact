export interface SendEmailI {
  names: string
  email: string
  phone: string
}

export interface SendEmailResponseI {
  status: 'ok' | 'error'
  message: string
  error?: any
}
