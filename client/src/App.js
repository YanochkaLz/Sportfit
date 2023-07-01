import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { Spinner } from "react-bootstrap"
import { check } from "./API/user";
import AppRoutes from "./Routes/AppRoutes";
import { observer } from 'mobx-react-lite';

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
  }, [])

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner />
      </div>
    )
  }

  return (
    <AppRoutes/>
  );
})

export default App;
