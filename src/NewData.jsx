import { useState } from "react"

export function NewData({ addNewData }) {
    const[newItem1, setNewItem1] = useState("")
    const[newItem2, setNewItem2] = useState("")
    const[newItem3, setNewItem3] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        // if(newItem === "") return

        addNewData(newItem1 + "\n" + newItem2 + "\n" + newItem3)
        console.log(newItem1 + "\n" + newItem2 + "\n" + newItem3)

        setNewItem1("")
        setNewItem2("")
        setNewItem3("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <label className="form-label">Brand</label>  
                <input value={newItem1} onChange={e => setNewItem1(e.target.value)} type="text" id="item" />
            </div>

            <div className="form-container">
                <label className="form-label">Category</label>  
                <input value={newItem2} onChange={e => setNewItem2(e.target.value)} type="text" id="item" />
            </div>

            <div className="form-container">
                <label className="form-label">Revenue</label>  
                <input value={newItem3} onChange={e => setNewItem3(e.target.value)} type="text" id="item" />
            </div>

            <div className="btn-container">
                <button className="form-btn">Add</button>
            </div>
        </form> 
    )
}



{/* <section class="top_section">
<div class="form-container">
  <label class="form-label">Input 1</label>
  <input type="text" id="item" />
</div>  

<div class="form-container">
  <label class="form-label">Input 2</label>
  <input type="text" id="item" />
</div>  

<div class="form-container">
  <label class="form-label">Input 3</label>
  <input type="text" id="item" />
</div>  

<div class="btn-container">
  <button class="form-btn">Add</button>
</div> 

</section>*/}