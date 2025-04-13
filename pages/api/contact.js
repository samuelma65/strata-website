export default function handler(req, res) {
    if (req.method === "POST") {
      // Redirect to the thank you page after form submission
      res.writeHead(302, { Location: "/thankyou" });
      res.end();
    } else if (req.method === "GET") {
      res.status(200).json({ email: "committee@stratabuilding.com" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  