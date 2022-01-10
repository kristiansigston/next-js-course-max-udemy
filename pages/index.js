import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

const HomePage = ({ events = [] }) => {
  return (
    <div>
      <Head>
        <title>This is a title</title>
        <meta
          name="description"
          content="find a lot of great events to enroll in"
        />
      </Head>
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
