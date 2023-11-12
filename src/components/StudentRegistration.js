import axios from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentRegistration.css'

function StudentRegistration() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState('');
  const [universityCourse, setUniversityCourse] = useState('');
  const [universityName, setUniversityName] = useState('');

  const [errors, setErrors] = useState({
    studentName: false,
    universityCourse: false,
    universityName: false
  });

  async function save(event) {
    event.preventDefault();

    const newErrors = {
      studentName: !studentName,
      universityCourse: !universityCourse,
      universityName: !universityName
    };

    setErrors(newErrors);

    if (!newErrors.studentName && !newErrors.universityCourse && !newErrors.universityName) {
      try {
        await axios.post('http://localhost:8081/v1/api/students', {
          studentName,
          universityCourse,
          universityName,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Student Registration Successful');
        navigate('/dashboard');
        setStudentName('');
        setUniversityCourse('');
        setUniversityName('');
      } catch (err) {
        alert('Student Registration Failed');
      }
    }
  }

  return (
    <div className="student-container mt-4">
      <h1>Add Your Details</h1>
      <form>
        <div className="student-form-group">
          <label className='student-label'>Student Name</label>
          <input
            type="text"
            className={`form-control ${errors.studentName ? 'error' : ''}`}
            placeholder="Enter Student Name"
            value={studentName}
            onChange={(event) => {
              setStudentName(event.target.value);
              setErrors({ ...errors, studentName: false });
            }}
          />
          {errors.studentName && <p className="error-message">This field is required</p>}
        </div>

        <div className='student-form-group'>
          <label className='student-label' >University Course</label>
          <input
            type="text"
            className={`form-control ${errors.universityCourse ? 'error' : ''}`}
            placeholder="Enter University Course"
            value={universityCourse}
            onChange={(event) => {
              setUniversityCourse(event.target.value);
              setErrors({ ...errors, universityCourse: false });
            }}
          />
          {errors.universityCourse && <p className="error-message">This field is required</p>}
        </div>

        <div className="student-form-group">
          <label className='student-label'>University Name</label>
          <input
            type="text"
            className={`form-control ${errors.universityName ? 'error' : ''}`}
            placeholder="Enter University Name"
            value={universityName}
            onChange={(event) => {
              setUniversityName(event.target.value);
              setErrors({ ...errors, universityName: false });
            }}
          />
          {errors.universityName && <p className="error-message">This field is required</p>}
        </div>

        <button className="btn btn-primary mt-4" onClick={save}>
          Student Registration
        </button>
      </form>
    </div>
  );
}

export default StudentRegistration;
