import Head from "next/head";
import Layout from "../components/layout/layout";

import "../styles/globals.css";
// import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

// <Head>
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
// </Head>;
