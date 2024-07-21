import React, { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

const App = () => {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] =useState(false)
  const [password,setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( ()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}~`"

    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(char)
    }
    setPassword(pass)
    
  }
    ,[length,numberAllowed
  ,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='firstDiv'>
      <div className='secondDiv'>
      <h3>Password Generator</h3>
        <input type='text'
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        >Copy</button>
      
      <div className='secondMain'>
        <div className='divSecond'>
          <input type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='third'>
          <input 
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{setNumberAllowed((prev)=>!prev)}}
          />
           <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='forth'>
          <input 
            type='checkbox'
            defaultChecked={charAllowed}
            id='CharacterInput'
            onChange={()=>{setCharAllowed((prev)=>!prev)}}
          />
           <label htmlFor='CharacterInput'>Characters</label>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
