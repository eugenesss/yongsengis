import React from "react";
import { connect } from "react-redux";
import { show, hide } from "redux-modal";
import BgCard from "Components/Everyday/BgCard";
import EventsTable from "Components/CRM/View/Events/EventsTable";

import AddEventDialog from "Components/Calendar/Dialogs/AddEventDialog";

import { addEvent } from "Actions";

function crm_events_tab(props) {
  const { events, eventableType, eventableId, show, hide } = props;
  function showNewEventDialog() {
    return show("add_event", { eventableType, eventableId });
  }

  const addNewEvent = (event, type) => {
    props.addEvent(event, type);
    hide("add_event");
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <BgCard fullBlock>
            <EventsTable
              title="All Events"
              tableData={events}
              showNewEventDialog={showNewEventDialog}
            />
          </BgCard>
        </div>
      </div>
      <AddEventDialog addEvent={addNewEvent} />
    </React.Fragment>
  );
}

export default connect(
  null,
  { show, hide, addEvent }
)(crm_events_tab);
