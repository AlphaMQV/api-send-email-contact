export interface ReceivedDataI {
  origin: string
  client: {
    names: string
    email: string
  }
}

export interface SendDataI extends ReceivedDataI {
  datetime: string
}

export interface SendEmailResponseI {
  status: 'ok' | 'error'
  message: string
  error?: any
}
