import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'projectId': '66ad466e2825ff676fa85fac', 
          'environmentId': '66ad466e2825ff676fa85fad', 
        },
      }
    )
      .then(response => response.json())
      .then(data => setEmployee(data));
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <p><strong>Employee ID:</strong> {employee._id}</p>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Address:</strong> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip_code}</p>
      <p><strong>Contact Methods:</strong></p>
      <ul>
        {employee.contact_methods.map((method, index) => (
          <li key={index}>{method.contact_method}: {method.value}</li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/'}>Back to List</button>
    </div>
  );
};

export default EmployeeDetails;
