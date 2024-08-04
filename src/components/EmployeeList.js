import React, { useState, useEffect } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=10&offset=0',
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
      .then(data => {
        const employeeList = data.data || data; 
        console.log(employeeList);
        if (Array.isArray(employeeList)) {
          setEmployees(employeeList);
        } else {
          console.error('Expected data to be an array:', data);
        }
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleDelete = async (emp_id) => {
    try {
        const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${emp_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'projectId': '66ad466e2825ff676fa85fac', 
                'environmentId': '66ad466e2825ff676fa85fad', 
            },
             body: JSON.stringify({  })
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorMessage = await response.text();
            throw new Error(`Error: ${response.status} ${response.statusText} - ${errorMessage}`);
        }

        const data = await response.json();
        setEmployees(employees.filter(emp => emp._id !== emp_id));
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};


  return (
    <div className="container">
      <h1>Employees</h1>
      <button onClick={() => window.location.href = '/add-employee'}>Add Employee</button>
      {employees.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.name}</td>
                <td>
                  <button onClick={() => window.location.href = `/employee-details/${employee._id}`}>View</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
