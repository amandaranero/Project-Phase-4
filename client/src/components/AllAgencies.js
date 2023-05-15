import React from 'react';
import '../AllAgencies.css'; // Import the CSS file
import AgencyContainer from "./AgencyContainer";
import {Link} from 'react-router-dom'

function AllAgencies({ agencies }) {
  return (
    <div className="page-container">
        <header>
            <nav>
                <Link to = {'/adopterpage'}>
                    <button>Home</button>
                </Link>
            </nav>
        </header>
      <AgencyContainer agencies={agencies} />
    </div>
  );
}
//Somechanges
export default AllAgencies;