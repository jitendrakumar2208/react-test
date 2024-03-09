import { useState ,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);

  const[password, setPassword] = useState("");

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed)str+="!#$&%@^*_~";
    if(numberAllowed)  str+="1234567890";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length +1);

      pass += str.charAt(char);
    }

    setPassword(pass);

  },[length,charAllowed,numberAllowed,setPassword]);

  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

useEffect(()=>{
  passwordGenerator();
},[length,numberAllowed,charAllowed,setPassword]);
  return (
    <>
      <div className='main'>
        <h1 className='title'>Password Generator</h1>
        <div className='input-item'>
          <input type="text" 
          value={password}
          className='input'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div>
          <div>
            <input type="range" min={8} 
            max={100} value={length} 
            onChange={(e)=>setLength(e.target.value)}/>
            <label >Length: {length}</label>
          </div>
          <div>
            <input type="checkbox" 
            defaultChecked = {numberAllowed} 
            onChange={(e)=>setNumberAllowed(prev=> !prev)}/>
            <label >Number</label>
          </div>
          <div>
            <input type="checkbox"
            defaultChecked = {charAllowed} 
            onChange={(e)=>setCharAllowed(prev=> !prev)}/>
            <label >Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
