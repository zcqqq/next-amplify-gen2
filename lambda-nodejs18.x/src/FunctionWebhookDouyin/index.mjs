import verify_webhook from './verify_webhook.mjs';

export const handler = async (event) => {
  console.log('Received event:', event);
  const jsonBody = JSON.parse(event.body);

  switch (jsonBody.event) {
    case 'verify_webhook': return verify_webhook(jsonBody);
  }
}