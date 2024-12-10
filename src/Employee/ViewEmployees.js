import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewEmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [isSidebarActive, setIsSidebarActive] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const closeSidebar = () => {
    setIsSidebarActive(false);
  };

  const styles = {
    burgerButton: {
      position: "fixed",
      top: "20px",
      left: "20px",
      background: "#0056b3",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "10px",
      cursor: "pointer",
      zIndex: 1100,
      display: isSidebarActive ? "none" : "block",
    },
    sidebar: {
      position: "fixed",
      top: 0,
      left: isSidebarActive ? "0" : "-100%",
      width: "250px",
      height: "100vh",
      backgroundColor: "#f7f9fc",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      transition: "left 0.3s ease-in-out",
      zIndex: 1000,
    },
    closeSidebarButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
    },
    sidebarHeader: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    sidebarList: {
      listStyle: "none",
      padding: 0,
    },
    sidebarListItem: {
      marginBottom: "10px",
    },
    sidebarLink: {
      textDecoration: "none",
      color: "#555",
      fontSize: "16px",
    },
    sidebarLinkActive: {
      fontWeight: "bold",
      color: "#0056b3",
    },
    mainContent: {
      marginLeft: isSidebarActive && window.innerWidth > 500 ? "250px" : "0",
      padding: "20px",
      transition: "margin-left 0.3s ease-in-out",
    },
    filters: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "20px",
      marginLeft: "40px",
    },
    filterInput: {
      flex: "1 1 calc(50% - 10px)",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    tableContainer: {
      overflowX: "auto",
      whiteSpace: "nowrap",
      height: "calc(100vh - 180px)", // Adjust height dynamically
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
    <div>
      <button style={styles.burgerButton} onClick={toggleSidebar}>
        ☰
      </button>
      <div style={styles.sidebar}>
        <button style={styles.closeSidebarButton} onClick={closeSidebar}>
          X
        </button>
        <h1 style={styles.sidebarHeader}>Dashboard</h1>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarListItem}>
            <a href="/input" style={styles.sidebarLink}>
              Add Employees
            </a>
          </li>
          <li style={styles.sidebarListItem}>
            <a
              href="#"
              style={{ ...styles.sidebarLink, ...styles.sidebarLinkActive }}
            >
              View Employees
            </a>
          </li>
        </ul>
      </div>
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
