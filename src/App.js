import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Input from './Input'
import TestScores from './TestScores';

function App() {

  const [data, setData] = useState(null)
  const [searchStr, setsearchStr] = useState('')
  const [toggleData, setToggleData] = useState([])
  const [clickedCardId, setClickedCardId] = useState("")

  const onButton = "https://cdn-icons-png.flaticon.com/512/786/786385.png"
  const offButton = "https://cdn-icons-png.flaticon.com/512/121/121124.png"

  console.log(data, typeof data)
  // console.log(searchStr)
  // console.log(toggleData)
  // console.log(clickedCardId)

  function addToggleToData() {
    console.log('addtoggletodata called')
    let newData = [...data];
    newData.map((item) => {
      item["toggle"] = false;
      return item;
    })
    console.log(newData, 'newdata')
    setData(newData)
  }

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`
    axios
      .get(url)
      .then((response) => {
        setData(response.data.students);
        addToggleToData();
      })
      .catch((error) => {
        console.log("Error in api call: ", error);
      })
  }, [])

  useEffect(() => {
    if (data) setToggleData(Array(data.length).fill(false));
  }, [data])

  function calculateAverage(grades) {
    return grades.reduce((accu, next)=> Number(accu) + Number(next)) / grades.length;
  }

  function handleToggle(idx) {
    // setToggleData(Array(data.length).fill(false));
    let newToggleData = [...toggleData]
    newToggleData[idx] = !newToggleData[idx]
    setToggleData(newToggleData)
  }

  function toggleButton(item, idx) {
    // return toggleData[idx] ? onButton: offButton;
    if (clickedCardId === item.id) return onButton;
    return offButton;
  }

  function handleToggleButtonClick(id) {
    // console.log(id)
    if (clickedCardId === id) setClickedCardId("")
    else setClickedCardId(id)
  }

  function renderData() {
    return (
      data
      .filter((item) => {
        let concat = `${item.firstName.toLowerCase()}` + `${item.lastName.toLowerCase()}`
        return concat.includes(searchStr.toLowerCase())
      })
      .map((i, idx) => {
        let studentAvg = calculateAverage(i.grades)
        return (
          <div className='student-data-container'>
            <div> 
              <img className='student-img' src={i.pic} width="150px" height="150px" alt=""></img>
            </div>
            <div>
              <h1>{i.firstName.toUpperCase()} {i.lastName.toUpperCase()}</h1>
              <p>Email: {i.email}</p>
              <p>Company: {i.company}</p>
              <p>Skill: {i.skill}</p>
              <p>Average: {studentAvg}%</p>
              {clickedCardId === i.id? <TestScores item={i}/> : null}
              {/* {toggleData[idx]? <TestScores item={i}/>: null} */}
            </div>
            <div>
              {/* <button className='toggle-btn-container' onClick={() => handleToggle(idx)}><img className='toggle-btn' src={toggleButton(i, idx)}></img></button> */}
              <button onClick={() => handleToggleButtonClick(i.id)} className='toggle-btn-container'><img className='toggle-btn' src={toggleButton(i, idx)}></img></button>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <div className='section-container'>
      <section>
        <Input searchStr={searchStr} setsearchStr={setsearchStr}/>
        {data? renderData(): "Loading..."}
      </section>
    </div>
  );
}

export default App;
