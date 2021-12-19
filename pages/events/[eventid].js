import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummyData";
import EventLogistics from "../../components/events/event-detail/event-logistics";
import EventSummary from "../../components/events/event-detail/event-summary";
import EventContent from "../../components/events/event-detail/event-content";

const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.eventid;

  if (!eventId) {
    return <p>No event found</p>;
  }

  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found</p>;
  }

  const { title, date, location, image, description } = event;
  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;
