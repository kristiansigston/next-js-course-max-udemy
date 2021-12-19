import { getAllEvents } from "../../dummyData";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react/cjs/react.development";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(selectedYear, selectedMonth) {
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
