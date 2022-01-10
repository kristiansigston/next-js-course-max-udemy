import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react/cjs/react.development";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  const { events } = props;
  const router = useRouter();

  function findEventsHandler(selectedYear, selectedMonth) {
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All my events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
          key="something different"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
