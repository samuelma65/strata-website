import Link from 'next/link';

export default function Rules() {
  return (
    <div>
      <Link href="/">
        <button style={{ marginBottom: '1rem' }}>← Back to Home</button>
      </Link>

      <h2>Building Rules</h2>
      <ul>
        <li>No loud noise after 10 PM</li>
        <li>Dispose rubbish correctly</li>
        <li>Pets must be approved</li>
      </ul>
    </div>
  );
}
