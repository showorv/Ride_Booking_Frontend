import { Outlet } from "react-router-dom"
import { CommonLayout } from "./components/layout/commonLayout"


function App() {
 

  return (
      <CommonLayout>
        <Outlet />
      </CommonLayout>
  )
}

export default App
