import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState('')
  console.log(data, typeof data)

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`
    axios
      .get(url)
      .then((response) => {
        setData(response.data.students);
      })
      .catch((error) => {
        console.log("Error in api call: ", error);
      })
  }, [])

  function calculateAverage(grades) {
    let sumOfGrades = 0
    for (let key in grades) {
      sumOfGrades += Number(grades[key])
    }
    return sumOfGrades / grades.length
  }

  function renderData() {
    return (
      Object.keys(data).map((obj) => {
        let studentAvg = calculateAverage(data[obj].grades)
        return (
          <div className='student-data-container'>
            <div> 
              <img src={data[obj].pic} width="150px" height="150px" alt=""></img>
            </div>
            <div>
              <h1>{data[obj].firstName.toUpperCase()} {data[obj].lastName.toUpperCase()}</h1>
              <p>Email: {data[obj].email}</p>
              <p>Company: {data[obj].company}</p>
              <p>Skill: {data[obj].skill}</p>
              <p>Average: {studentAvg}%</p>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <div>
      {data? renderData(): null}
    </div>
  );
}

export default App;
