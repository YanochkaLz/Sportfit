import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { check } from "./API/user";
import AppRoutes from "./Routes/AppRoutes";
import { observer } from 'mobx-react-lite';
import NavBar from "./Components/NavBar";
import { BrowserRouter } from "react-router-dom";
import SpinnerComponent from "./Components/SpinnerComponent";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
      }
    }).finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <SpinnerComponent />
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
      <ScrollToTop/>
    </BrowserRouter>
  );
})

export default App;
