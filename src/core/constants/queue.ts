const queueSettings = {
  defaultJobOptions: {
    backoff: 1000 * 10,
    attempts: 1,
    removeOnFail: false,
    removeOnComplete: false,
  },
  settings: {
    lockDuration: 1000 * 60 * 5,
    retryProcessDelay: 1000 * 60 * 5,
  }
}

export default queueSettings;
