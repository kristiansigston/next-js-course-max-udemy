import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import ResultsTitle from "../../components/results/title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error/alert";
import useSWR from "swr";
import Head from "next/head";

const FILTER_MAX_YEAR = 2030;
const FILTER_MIN_YEAR = 2021;

const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  console.log(loadedEvents);
  const filterData = router.query.slug || [];
  const [yearString, monthString] = filterData;

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://next-js-tutorial-udemy-max-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    let events = [];
    if (data) {
      events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
    }
    setLoadedEvents(events);
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events" />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </Fragment>
    );
  }

  const numYear = parseInt(yearString);

  const numMonth = parseInt(monthString);

  const isNotANumber = isNaN(numYear) || isNaN(numMonth);

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  if (
    isNotANumber ||
    numYear > FILTER_MAX_YEAR ||
    numYear < FILTER_MIN_YEAR ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter please adjust your values</p>;
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }
  console.log("lll", loadedEvents);
  const filteredEvents = loadedEvents.filter((event) => {
    console.log("xxx", event);
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  console.log("fff", filteredEvents);
  if (!filteredEvents || !filteredEvents.length) {
    return (
      <Fragment>
        {pageHeadData}
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
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const filterData = params.slug;

//   if (!filterData) {
//     return <p className="center">Loading...</p>;
//   }

//   const [yearString, monthString] = filterData;
//   const numYear = parseInt(yearString);
//   const numMonth = parseInt(monthString);

//   const isNotANumber = isNaN(yearString) || isNaN(monthString);
//   if (
//     isNotANumber ||
//     numYear > FILTER_MAX_YEAR ||
//     numYear < FILTER_MIN_YEAR ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

export default FilteredEventsPage;
