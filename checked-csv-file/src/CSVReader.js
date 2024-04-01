import React from 'react'
import { useState, useRef } from 'react';
import "./App.css"

const CSVReader = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [addresses, setAddresses] = useState([])
    const fileInputRef = useRef(null);


    const handleFileUpload = (e) =>{
        // console.log(e.target.files[0])
        const file = e.target.files[0];
        if(!file){
           return;
            // console.log("file exit")
        }
        const reader = new FileReader();
        reader.onload = (e) =>{
            // console.log(e.target.result)
            const text = e.target.result
            const rows = text.split("\n");
            const headers = rows[0].split(",");
            // console.log(headers);
            const requiredColumns = ['street', 'city', 'state','zip'];

            if(!requiredColumns.every(column => headers.includes(column))){
                setErrorMessage(`missing colums: ${requiredColumns} in ${file.name  }`)
                console.log("no columns found")
                return;
            }
            // else console.log("columns found")

            const uniqueAddresses = new Set();
            for(let i=1; i<rows.length; i++){
                console.log(i)
                const columns = rows[i].split(",");
                const address = requiredColumns.map((columnName)=> columns[headers.indexOf(columnName)]);
                uniqueAddresses.add(address.join(", "))
            }
            setAddresses([...uniqueAddresses])
        }
        reader.onerror = () => {
            setErrorMessage('Error reading the file')
        }
        reader.readAsText(file)
    }

    const handleClearAddress = ()=>{
        setErrorMessage("")
        setAddresses([])
        if (fileInputRef.current) {
            fileInputRef.current.value = null; 
        }
    }

  return (
    <div className='CSVReader'>
        <input type='file' accept='.csv' onChange={handleFileUpload} ref={fileInputRef} multiple/>
        <button onClick={handleClearAddress}>Clear addresses</button>
        {errorMessage && <div>{errorMessage}</div>}
        <ul>
            {addresses.map((address, i)=>(
                <li key={i}>{address}</li>
            ))}
        </ul>
    </div>
  )
}

export default CSVReader