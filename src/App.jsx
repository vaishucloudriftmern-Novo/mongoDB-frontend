import { useState } from 'react'
import React from "react"
import './App.css'
import axios from "axios"
import * as XLSX from "xlsx"


function App() {
 const [msg,setmsg]=useState("")
 const [status,setstatus]=useState(false)
 const [emailList,setEmailList]=useState([])


 
  function handlemsg(evt)
  {
    setmsg(evt.target.value)
  }
  
  function handlefile(event){
    const file=event.target.files[0]
    console.log(file)

    const reader=new FileReader()
    reader.onload=function(e){
      const data=e.target.result 
      const workbook=XLSX.read(data,{type:'binary'})
      const sheetName=workbook.SheetNames[0]
      const worksheet=workbook.Sheets[sheetName]
      const emailList=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
       const totalemail=emailList.map(function(item){return item.A})
      console.log(totalemail)
      setEmailList(totalemail)
    }
    reader.readAsBinaryString(file)

  }
  function send(){
    setstatus(true)
     axios.post("http://localhost:5000/sendemail",{msg:msg,emailList:emailList})
     .then(function(data){
      if(data.data===true){
        alert("Email sent Successfully")
        setstatus(false)
      }
      else{
        alert("Email sent Successfully")
      }
     })
  }

  return (
    <div className="p-0 m-0 bg-gray-950 min-h-screen">

      
      <div className="w-full bg-gray-900 p-3 text-white text-center">
        <h1 className="m-0 text-2xl font-serif tracking-wide">
          Bulk Mail
        </h1>
      </div>

      
      <div className="w-full bg-gray-800 p-3 text-gray-200 text-center">
        <h1 className="m-0 font-serif">
          We Can Help Your Business With Sending Multiple Emails At Once
        </h1>
      </div>

      
      <div className="w-full bg-gray-700 p-3 text-gray-100 text-center">
        <h1 className="m-0 font-serif">
          Drag and Drop
        </h1>
      </div>

        <div className="bg-gray-600 flex flex-col items-center px-5 py-6 gap-4">

        <textarea onChange={handlemsg} value={msg}
          className="bg-gray-100 text-gray-800 w-[30%] h-20 py-2 px-3 outline-none rounded-md placeholder-gray-500"
          placeholder="Enter the email text"
        />

       
        <div className="bg-gray-600">
          <input
            type="file"
            onChange={handlefile}
            className="
              bg-blue-600 
              text-white 
              border-2 
              border-dashed 
              border-blue-300 
              py-2 
              px-4 
              rounded-md
              file:bg-blue-300
              file:text-white
              file:border-none
              file:px-3
              file:py-1
              file:rounded
              file:mr-3
            "
          />
        </div>

        <p className="text-gray-200">
          Total emails in the file:{emailList.length}
        </p>

        <button onClick={send} className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition">
          Send
        </button>

      </div>
    </div>
  )
}

export default App
