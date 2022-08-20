import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import { format_line } from './conversions';

function App() {
  
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  //State to store the converted values
  const [changedValues, setChangedValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const changedValuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((element) => {
          rowsArray.push(Object.keys(element)); //store names
          valuesArray.push(Object.values(element)); //store values
          changedValuesArray.push(format_line(Object.values(element)));
          return null;
        });

        // Set Filtered Column Names
        setTableRows(rowsArray[0]);

        // Set Filtered Values
        setValues(valuesArray);

        //Set converted data
        setChangedValues(changedValuesArray);
      },
    });
  };

  return (
    <div>

      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />

      {/* Original Table */}
      <table>
      <thead>
        <tr>
          {tableRows.map((rows, index) => {
            return <th key={index}>{rows}</th>; })}
        </tr>
      </thead>

      <tbody>
        {values.map((value, index) => {
          return (
            <tr key={index}>
              {value.map((val, i) => {
                return <td key={i}>{val}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      </table>

      {/*Changed Table */}
      <table>
      <thead>
        <tr>
          {tableRows.map((rows, index) => {
            return <th key={index}>{rows}</th>; })}
        </tr>
      </thead>

      <tbody>
        {changedValues.map((changedValue, index) => {
          return (
            <tr key={index}>
              {changedValue.map((val, i) => {
                return <td key={i}>{val}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      </table>
    </div> 
  );
}

export default App;




