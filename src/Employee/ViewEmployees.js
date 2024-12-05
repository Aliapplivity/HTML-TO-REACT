import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewEmployees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleEdit = (index) => {
    const employee = employees[index];
    localStorage.setItem("editIndex", index);
    localStorage.setItem("editData", JSON.stringify(employee));
    navigate("/input");
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      const updatedEmployees = [...employees];
      updatedEmployees.splice(index, 1);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      (!nameFilter ||
        employee.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (!ageFilter || employee.age.toString() === ageFilter)
  );

  const styles = {
    sidebar: {
      width: "250px",
      height: "100vh",
      backgroundColor: "#f7f9fc",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      left: "0",
      top: "0",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Arial', sans-serif",
    },
    sidebarHeader: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    sidebarList: {
      listStyle: "none",
      padding: "0",
    },
    sidebarListItem: {
      margin: "15px 0",
    },
    sidebarLink: {
      textDecoration: "none",
      color: "#555",
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
    },
    sidebarLinkActive: {
      fontWeight: "bold",
      color: "#0056b3",
    },
    mainContainer: {
      display: "flex",
    },
    mainContent: {
      marginLeft: "270px",
      padding: "20px",
      width: "100%",
    },
    filters: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    filterInput: {
      padding: "10px",
      width: "48%",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    tableContainer: {
      margin: "20px auto",
      width: "95%",
      background: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f7f7f7",
      borderBottom: "2px solid #eaeaea",
      color: "#333",
      textTransform: "uppercase",
      padding: "15px",
      textAlign: "left",
    },
    tableCell: {
      borderBottom: "1px solid #eaeaea",
      padding: "15px",
      textAlign: "left",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    editButton: {
      padding: "5px 10px",
      background: "#17a2b8",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    deleteButton: {
      padding: "5px 10px",
      background: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.mainContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h1 style={styles.sidebarHeader}>Dashboard</h1>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarListItem}>
            <a href="/input" style={styles.sidebarLink}>
              Add Employees
            </a>
          </li>
          <li style={styles.sidebarListItem}>
            <a href="#" style={{ ...styles.sidebarLink, ...styles.sidebarLinkActive }}>
              View Employees
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            style={styles.filterInput}
          />
          <input
            type="number"
            placeholder="Search by Age"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            style={styles.filterInput}
          />
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Age</th>
                <th style={styles.tableHeader}>Gender</th>
                <th style={styles.tableHeader}>Birth Date</th>
                <th style={styles.tableHeader}>Joining Date</th>
                <th style={styles.tableHeader}>Qualification</th>
                <th style={styles.tableHeader}>Phone Number</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{employee.name}</td>
                  <td style={styles.tableCell}>{employee.age}</td>
                  <td style={styles.tableCell}>{employee.gender}</td>
                  <td style={styles.tableCell}>{employee.birthDate}</td>
                  <td style={styles.tableCell}>{employee.joiningDate}</td>
                  <td style={styles.tableCell}>{employee.qualification}</td>
                  <td style={styles.tableCell}>{employee.phoneNumber}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actions}>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployees;
