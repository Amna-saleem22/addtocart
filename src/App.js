import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route from react-router-dom
 import Checkout from "./component/Checkout"; // Ensure you have a Checkout component
import Cardpage from "./component/Cardpage"; // Import the Cardpage component
import Confirmation from "./component/Confirmation"; // Import the Confirmation component
function App() {
  return (
     <>

   
      
       <Routes>
      <Route path="/" element={<Cardpage />} />
         <Route path="/checkout" element={<Checkout />} /> 
      <Route path="/confirmation" element={<Confirmation />} />
       </Routes>
       </>
     


   
      
  );
}

export default App;
