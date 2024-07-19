export interface ReceivedDataI {
  origin: string
  client: {
    names: string
    phone: string
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
