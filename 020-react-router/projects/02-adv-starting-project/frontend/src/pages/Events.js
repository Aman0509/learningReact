import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData();
  return (
    <>
     return <EventsList events={events} />
    </>
  );
}

export default EventsPage;
