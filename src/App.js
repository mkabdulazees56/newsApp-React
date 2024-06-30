
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const pageSize = 24;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  return (
    <>
      <NavBar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />

      <Routes>
        <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='general' key="general" />}></Route>
        <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='business' key="business" />}></Route>
        <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='entertainment' key="entertainment" />}></Route>
        <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='health' key="health" />}></Route>
        <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='general' key="general" />}></Route>
        <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='science' key="science" />}></Route>
        <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='sports' key="sports" />}></Route>
        <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='technology' key="technology" />}></Route>
      </Routes>
    </>
  )
}

export default App