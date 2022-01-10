import { Fragment } from "react";
import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventLogistics from "../../components/events/event-detail/event-logistics";
import EventSummary from "../../components/events/event-detail/event-summary";
import EventContent from "../../components/events/event-detail/event-content";
import Head from "next/head";
const EventDetailPage = (props) => {
  const event = props.selectedEvent;
  if (!event) {
    return <div className="center">Loading</div>;
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
