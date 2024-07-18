import React from 'react';
import { ToDoList, DarkModeProvider } from "./components"





function App() {  

  
  
  return (
   <>
    <div className="flex min-h-screen bg-black text-white ">        
      <DarkModeProvider>
        <ToDoList/>
      </DarkModeProvider>
        
    </div>
   
   
   </> 
   
  )
}

export default App
