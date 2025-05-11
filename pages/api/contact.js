export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  if (req.method === 'POST') {
    return new Response(null, {
      status: 302,
      headers: { Location: '/thankyou' },
    });
  } else if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ email: "committee@stratabuilding.com" }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Method Not Allowed" }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
