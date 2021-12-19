import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummyData";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/results/title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error/alert";

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
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter please adjust your values</p>;
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  if (!filteredEvents || !filteredEvents.length) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
