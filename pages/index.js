import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to {process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME || "Sydney Crown Towers"}</h1>
      <p>This website helps owners view notices, documents, and meeting times.</p>
      <img src="/mainpage.jpg" width="300" alt="Strata building" />

      <nav>
        <ul>
          <li><Link href="/notices">Notices</Link></li>
          <li><Link href="/meetings">Meetings</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/rules">Rules</Link></li>
          <li><Link href="/committee">Committee</Link></li>
        </ul>
      </nav>
    </div>
  );
}
