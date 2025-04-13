import Link from 'next/link';

export default function Committee() {
  return (
    <div>
      <Link href="/">
        <button style={{ marginBottom: '1rem' }}>← Back to Home</button>
      </Link>

      <h2>Committee Members</h2>
      <ul>
        <li>Jane Smith (Chair)</li>
        <li>John Doe (Secretary)</li>
        <li>Emily Tan (Treasurer)</li>
      </ul>
    </div>
  );
}
