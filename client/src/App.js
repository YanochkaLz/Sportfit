import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { check } from "./API/user";
import AppRoutes from "./Routes/AppRoutes";
import { observer } from 'mobx-react-lite';
import NavBar from "./Components/NavBar";
import { BrowserRouter } from "react-router-dom";
import SpinnerComponent from "./Components/SpinnerComponent";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Footer from "./Components/Footer";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let error = false;
    check().then(data => {
      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
      }
    }).catch(e => {
      user.setUser({})
      user.setIsAuth(false)
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
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
})

export default App;
