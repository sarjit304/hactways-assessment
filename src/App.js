import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Input from './Input'

function App() {

  const [data, setData] = useState(null)
  const [searchStr, setsearchStr] = useState('')
  // console.log(data, typeof data)
  // console.log(searchStr)

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
    return grades.reduce((accu, next)=> Number(accu) + Number(next)) / grades.length;
  }

  function renderData() {
    return (
      data
      .filter((item) => {
        let concat = `${item.firstName.toLowerCase()}` + `${item.lastName.toLowerCase()}`
        return concat.includes(searchStr.toLowerCase())
      })
      .map((i) => {
        let studentAvg = calculateAverage(i.grades)
        return (
          <div className='student-data-container'>
            <div> 
              <img src={i.pic} width="150px" height="150px" alt=""></img>
            </div>
            <div>
              <h1>{i.firstName.toUpperCase()} {i.lastName.toUpperCase()}</h1>
              <p>Email: {i.email}</p>
              <p>Company: {i.company}</p>
              <p>Skill: {i.skill}</p>
              <p>Average: {studentAvg}%</p>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <div>
      <Input searchStr={searchStr} setsearchStr={setsearchStr}/>
      {data? renderData(): "Loading..."}
    </div>
  );
}

export default App;
