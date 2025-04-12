export default function Home() {
    return (
        <div>
            <h1>Welcome to {process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME}</h1>
            <p>This website helps owners view notices, documents, and meeting times.</p>
            <img src="/mainpage.jpg" width="300" alt="Strata building" />
        </div>
    );
    }

