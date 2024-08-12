import { Outlet } from "react-router-dom"
import useCurrentUser from "./hooks/useCurrentUser"

function App() {
  const { data, isLoading, error } = useCurrentUser();
  
  
  return (
   <div>
      <Outlet />
   </div>
  )
}

export default App
