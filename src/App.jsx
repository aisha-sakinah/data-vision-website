import { useState } from 'react'
import { NewData } from './NewData'
import { OutputDataList } from './OutputDataList'
import "./style.css"

function App() {
  const[datas, setDatas] = useState([])

  function addNewData(data) {
    setDatas(currentData => {
      return [
        ...currentData, 
        {id: crypto.randomUUID(), data},
      ]
    })
  }


  function deleteData(id) {
    setDatas(currentDatas => {
      return currentDatas.filter(data => data.id !== id)
    })
  }


  return (
    <>
      <header className="header_section">
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html">
            <span>
              DataVision
            </span>
          </a>     
        </div>
      </header>

      <section className="top_section">
        <NewData addNewData={addNewData} />
      </section>

      <section className="mid-section">
        <OutputDataList datas={datas} deleteData={deleteData} />
      </section>


    </>
  )
}

export default App
