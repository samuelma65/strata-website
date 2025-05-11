export const config = {
  runtime: 'edge'
};

export default function handler(req) {
  return new Response(
    JSON.stringify({ message: "No new notices today." }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

  