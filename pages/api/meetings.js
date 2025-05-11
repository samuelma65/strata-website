export const config = {
  runtime: 'edge'
};

export default function handler(req) {
  return new Response(
    JSON.stringify({ nextMeeting: "April 30, 2025" }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
