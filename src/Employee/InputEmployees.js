import React, { useState, useEffect } from 'react';
import './Style.css';
import { useNavigate } from 'react-router-dom';

const InputEmployees = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    birthDate: '',
    joiningDate: '',
    qualification: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem('editData'));
    if (editData) {
      setFormData(editData);
      localStorage.removeItem('editData');
    }
  }, []);
  
  const validateAgeAndBirthDate = () => {
    const { age, birthDate } = formData;
    const birthDateObj = new Date(birthDate);
    
    if (isNaN(birthDateObj.getTime()) || isNaN(age)) {
      return false; // Invalid birth date or age
    }

    const today = new Date();
    const calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const isBeforeBirthday =
      today.getMonth() < birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() && today.getDate() < birthDateObj.getDate());
    const exactAge = isBeforeBirthday ? calculatedAge - 1 : calculatedAge;

    return exactAge === parseInt(age); // Return true if the age matches
  };

  const validateForm = () => {
    let formErrors = {};
    const { name, age, gender, birthDate, joiningDate, qualification, phoneNumber } = formData;

    if (!name) formErrors.name = 'Name cannot be empty.';
    if (!age || age < 18 || age > 100) formErrors.age = 'Age must be between 18 and 100.';
    if (!gender) formErrors.gender = 'Please select a gender.';
    if (!birthDate || !validateAgeAndBirthDate()) formErrors.birthDate = 'Birth date and age must match.';
    if (!joiningDate) formErrors.joiningDate = 'Joining date cannot be empty.';
    if (!qualification) formErrors.qualification = 'Please select a qualification.';
    
    const phonePattern = /^\+\d{1,3}-\d{3}-\d{7}$/;
    if (!phonePattern.test(phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be in the format +123-456-7890123.';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    const editIndex = localStorage.getItem('editIndex');
    
    if (editIndex !== null) {
      employees[editIndex] = formData;
      localStorage.removeItem('editIndex');
    } else {
      employees.push(formData);
    }

    localStorage.setItem('employees', JSON.stringify(employees));

    alert('Form submitted successfully!');
    setFormData({
      name: '',
      age: '',
      gender: '',
      birthDate: '',
      joiningDate: '',
      qualification: '',
      phoneNumber: ''
    });
    navigate('/view');
  };

  return (
    <div className='allIncluded'>
    <div className="container">
      <div className="left-section">
        <div className="content">
          <h1>Information Form</h1>
          <button className="back-button"><a href="/view">View Information →</a></button>
          <p>Add your information</p>
        </div>
      </div>
      
      <div className="right-section">
        <div className="form-container">
          <h2>Employee Information</h2>
          <form onSubmit={handleSubmit} id="infoForm">
            <div className="name-age">
              <div className='input-name'>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <span className="error-message">{errors.name}</span>
              </div>
              </div>

              <div className='input-age'>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
                <span className="error-message">{errors.age}</span>
              </div>
            </div>
            </div>

            <div className="form-group">
              <label className="radioGroupLabel">Gender:</label>
              <div>
                <div className='radio-h'>
                <div className='gender-male'>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
                Male
                </div>
                <div className='gender-female'>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
                Female
                </div>
                </div>
              </div>
              <span className="error-message">{errors.gender}</span>
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">Birth Date:</label>
              <input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
              <span className="error-message">{errors.birthDate}</span>
            </div>

            <div className="form-group">
              <label htmlFor="joiningDate">Joining Date:</label>
              <input
                type="date"
                id="joiningDate"
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              />
              <span className="error-message">{errors.joiningDate}</span>
            </div>

            <div className="form-group">
              <label htmlFor="qualification">Qualification:</label>
              <select
                id="qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
              <span className="error-message">{errors.qualification}</span>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="+123-456-7890123"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              <span className="error-message">{errors.phoneNumber}</span>
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default InputEmployees;
