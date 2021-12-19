import EventItem from "../event-item";
import classes from "./event-list.module.css";

const EventList = ({ items }) => {
  const itemsList = items.map((event) => {
    return (
      <EventItem
        key={event.id}
        id={event.id}
        title={event.title}
        location={event.location}
        date={event.date}
        image={event.image}
      />
    );
  });
  return <ul className={classes.list}>{itemsList}</ul>;
};

export default EventList;
