const logEventToLogSnag = async (event: string, data: any, channel: string, icon: any) => {
  try {
    const res = await fetch('https://api.logsnag.com/v1/log', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOGSNAG_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "project": 'self-represent-ai',
        "channel": `${channel}`,
        "event": `${event}`,
        "description": JSON.stringify(data),
        "icon": `${icon}`
      })
    });
  } catch (err) {
    console.log('Failed to log event to LogSnag', err);
  }
}
export default logEventToLogSnag;