import Head from "next/head";
import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import NotificationContext, {
  NotificationContextProvider,
} from "../store/contexts/notificationContext";
import "../styles/globals.css";
// import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Next Events</title>
          <meta name="description" content="Next js events" />
        </Head>
        ;
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
