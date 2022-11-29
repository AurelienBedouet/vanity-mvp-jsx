import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vanity</title>
        <meta name="description" content="Vanity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-semibold">HomePage</h1>
    </div>
  );
}
