import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://88.198.18.234:5000/api/vms');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const vmNames = ['engine.carryos.com', 'vdscpanel103dceu01p100'];
  const filteredData = data.filter(vm => vmNames.includes(vm.name));

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h3>USER SERVER STATUS</h3>
      <ul>
        {filteredData.map(vm => (
          <li key={vm.vmid}>
            <h4>Name: {vm.name}</h4>
            {/* <p>VMID: {vm.vmid}</p> */}
            <p>Status: {vm.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
