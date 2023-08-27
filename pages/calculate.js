import React from 'react'

function addAppliances(){
   
}

let id="1";

function remove(id){

}

function tr(id){
    
}

function clear(){


const Calculate = () => {
  return (
    <div className="container">
      <h1>Energy Consumption Calculator</h1>

      <table className="table table-bordered " style={{"text-align" : "center"}} >
      <thead>
        <tr>
          <th>Appliance</th>
          <th>Quantity</th>
          <th>Watts (Volts x Amps)</th>
          <th>Hours On per Day</th>
          <th>Watt Hours per Day</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr id="1">
          <td>
            <select name="appliance" id="appliance1" onClick={tr(id)}>
              <option value="None">Select Appliance</option>
              <option value="Air Conditioner">Air Conditioner</option>
              <option value="Refrigerator">Refrigerator</option>
              <option value="Washing Machine">Washing Machine</option>
              <option value="Dishwasher">Dishwasher</option>
              <option value="TV">TV</option>
              <option value="Computer">Computer</option>
              <option value="Light Bulb (Common)">Light Bulb (Common)</option>
              <option value="None">Other</option>
            </select>
          </td>
          <td><input type="number" name="quantity" id="quantity1" style= {{width : "70px"}} /></td>
          <td><input type="number" name="watts" id="watts1" style= {{width : "70px"}}/></td>
          <td><input type="number" name="hours" id="hours1" style= {{width : "70px"}}/></td>
          <td><input type="number" name="wattHours" id="wattHours1" style= {{width : "70px"}}/></td>
          <td><button type="button" className="btn btn-danger" id="1" onClick={remove(id)}>Delete</button></td>
        </tr>
      </tbody>
      </table>

      <button type="button" className="btn btn-primary mx-4" id="addAppliances" onClick={addAppliances()}>Add Appliances</button> 
      <button type="button" className="btn btn-danger" id="clearAll" onClick={clear()}>Clear All</button>
  </div>
  )
}

export default Calculate