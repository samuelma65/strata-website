import Link from 'next/link';

export default function ThankYou() {
  return (
    <div>
      <h2>Thank you!</h2>
      <p>Your message has been received and will be responded to shortly.</p>

      <Link href="/">
        <button style={{ marginTop: '1rem' }}>← Back to Home</button>
      </Link>
    </div>
  );
}
