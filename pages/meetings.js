import Link from 'next/link';


export default function Meetings() {
    return (
      <><div>
             <p>Committee meetings are held <strong>once a month</strong>.</p>
             <p>Next meeting is on <strong>April 30, 2025</strong>.</p>
        </div><div>
                <Link href="/">
                    <button style={{ marginBottom: '1rem' }}>← Back to Home</button>
                </Link>

            </div></>

    );
  }



    