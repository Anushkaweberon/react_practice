import './App.css';
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordref = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "@#$%^!*&"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed,charAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
    alert(`You have copied "${password}"`);
  },[password])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='hover:bg-blue-600 outline-none bg-red-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={15}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}  
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{setNumberAllowed((prev)=> !prev)}}
          />
          <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='characterInput'
            onChange={()=>{setCharAllowed((prev)=> !prev)}}
          />
          <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
