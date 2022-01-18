import {useState, useEffect} from "react";
import './App.css';
import React from "react";
import axios from 'axios';

function App() {
  
  // Defining URL 
  const url = "https://quizapi.io/api/v1/questions?apiKey=wI9hXA8YRswCvMAXag5Cp4QGmz5OfCl2S8sfk7OX&limit=10";

  // Setting useState
  const [result, setResults] = useState([{'question':'Why is this not working?', 'answers':Object.keys({1:'None of these'}), 'correct_answer':'none of these'}]);
  const [score, setScore] = useState(0)
  const [quiz, setQuestion] = useState(0)

  // Using effect hook
  useEffect(() => {
    axios.get(url)
    .then((response) => {
      let info = response.data;
      setResults(info);
    });
  }, []);


  let a = Object.values(result.map((posts)=> Object.values(posts.answers)))
  let correctAnswers = Object.values(result.map((posts)=> posts.correct_answer))


  function verify(event) {
    correctAnswers[quiz] === event.target.value ? setScore(score+1) : setScore(score);
    console.log(document.body.root)
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function next() {
    quiz<9? setQuestion(quiz+1) : alert(`You scored ${score}/10`)
  }

  function previous() {
    quiz>0 ? setQuestion(quiz-1) : alert('Invalid option');
  }

  // Standard return the data
  return(
    <div>
      <div className="box"> 
        <h3> Welcome to the Quizzer App </h3>
        <h5> - A product by Shrey </h5>
      </div>
        <div className="quiz-section">
          <div className="header"> <section> Questions </section> </div>
          <div> { <section> {quiz+1}.  {result[quiz].question} <br/> </section> } </div>
          <div>
            { a[quiz].map((opt)=> opt? 
            <div> <button onClick={verify} value={getKeyByValue(result[quiz].answers, opt)} className="button"> {opt} </button> <br/> </div> :
             null) } 
          </div>
          <div className="footer">
            <li> <button onClick={previous} className="button"> Previous </button> </li>
            <li> <button onClick={next} className="button"> Next </button> </li>
          </div>
        </div>
    </div>
  );
}

export default App;
