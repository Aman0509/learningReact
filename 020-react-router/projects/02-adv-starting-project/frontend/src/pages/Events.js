import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  { id: "e1", title: "Event 1" },
  { id: "e2", title: "Event 2" },
  { id: "e3", title: "Event 3" },
];

function EventPage() {
  return (
    <>
      <h1>Event Page</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link to="new">Create New Event</Link>
        <Link to="someId/edit">Home</Link>
      </p>
    </>
  );
}

export default EventPage;
