import Admin from "../Pages/Admin"
import Auth from "../Pages/Auth"
import Basket from "../Pages/Basket"
import Home from "../Pages/Home"
import ItemPage from "../Pages/ItemPage"
import Shop from "../Pages/Shop"

export const authRoutes = [
    {
        path: '/admin',
        Component: <Admin/>
    },
    {
        path: '/basket',
        Component: <Basket/>
    }
]

export const publicRoutes = [
    {
        path: '/',
        Component: <Home/>
    },
    {
        path: '/item/:id',
        Component: <ItemPage/>
    },
    {
        path: '/shop/:id',
        Component: <Shop/>
    },
    {
        path: '/login',
        Component: <Auth/>
    },
    {
        path: '/registration',
        Component: <Auth/>
    }
]