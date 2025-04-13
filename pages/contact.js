import Link from 'next/link';

export default function ContactForm() {
  return (
    <div>
      <Link href="/">
        <button style={{ marginBottom: '1rem' }}>← Back to Home</button>
      </Link>

      <h2>Contact the Committee</h2>
      <form method="POST" action="/api/contact">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
