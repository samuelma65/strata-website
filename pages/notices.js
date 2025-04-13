import Link from 'next/link';

export default function Notices() {
  return (
    <div>
      <Link href="/">
        <button style={{ marginBottom: '1rem' }}>← Back to Home</button>
      </Link>

      <h2>Latest Building Notices</h2>
      <ul>
        <li>Fire safety check on Friday</li>
        <li>AGM next Monday</li>
      </ul>
    </div>
  );
}
