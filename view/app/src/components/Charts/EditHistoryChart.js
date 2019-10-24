import React from "react";
import { Table } from "reactstrap";
import BgCard from "Components/BgCard";
import { getDateTime } from "Helpers/helpers";

function EditHistoryChart(props) {
  return (
    <BgCard heading="Edit History Log">
      <div className="row">
        <div className="col-12">
          <Table size="sm">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Field</th>
                <th>Action</th>
                <th>Old Value</th>
                <th>New Value</th>
                <th>Timestamp</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((log, key) => (
                <tr key={key}>
                  <td>{log.name}</td>
                  <td>{log.field}</td>
                  <td>{log.action}</td>
                  <td>{log.old_value}</td>
                  <td>{log.new_value}</td>
                  <td>{getDateTime(log.date_time)}</td>
                  <td>{log.user}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </BgCard>
  );
}

export default EditHistoryChart;
