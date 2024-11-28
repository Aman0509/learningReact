import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // ...
  } else {
    return response;
  }
}

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      return <EventsList events={events} />
    </>
  );
}

export default EventsPage;
