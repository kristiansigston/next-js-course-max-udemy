import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummyData";
import EventList from "../../components/events/event-list";

const FILTER_MAX_YEAR = 2030;
const FILTER_MIN_YEAR = 2021;

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const [yearString, monthString] = filterData;
  const numYear = parseInt(yearString);
  const numMonth = parseInt(monthString);

  const isNotANumber = isNaN(yearString) || isNaN(monthString);
  if (
    isNotANumber ||
    numYear > FILTER_MAX_YEAR ||
    numYear < FILTER_MIN_YEAR ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter please adjust your values</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  if (!filteredEvents || !filteredEvents.length) {
    return <p>No events found for the chosen filter</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
