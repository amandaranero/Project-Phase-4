import React from 'react';
import '../AllAgencies.css'; // Import the CSS file

import AgencyContainer from "./AgencyContainer";

function AllAgencies({ agencies }) {
  return (
    <div className="page-container">
      <AgencyContainer agencies={agencies} />
    </div>
  );
}
//Somechanges
export default AllAgencies;

