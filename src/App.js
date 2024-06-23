import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './style.css'
import Base, { loadBase } from "./layouts/Base";
import { logOut, recentDeposits, recentExpenses, recentIncomes, setUsername, recentBases, setPassword } from "./functions";
import MainBoard, { mainboardAct } from "./pages/MainBoard";
import { loadMain } from "./pages/MainBoard";
import ErrorPage from "./pages/ErrorPage";
import RecentExpenses from "./pages/RecentExpenses";
import RecentDeposits from "./pages/RecentDeposits";
import RecentIncomes from "./pages/RecentIncomes";
import EditUsername from "./dropdownElements/EditUsername";
import IncomeBases from "./pages/IncomeBases";
import ChangePassword from "./dropdownElements/ChangePassword";

// Create router, routes and navigations for pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <Base></Base>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: loadBase,
    children: [
      {
        index: true,
        element: <MainBoard></MainBoard>,
        errorElement: <ErrorPage></ErrorPage>,
        loader: loadMain,
        action: mainboardAct,
    },
    {
      path: "logout",
      action: logOut,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "expenses",
      errorElement: <ErrorPage></ErrorPage>,
      element: <RecentExpenses></RecentExpenses>,
      action: recentExpenses,
    },
    {
      path: "deposits",
      element: <RecentDeposits></RecentDeposits>,
      errorElement: <ErrorPage></ErrorPage>,
      action: recentDeposits,
    },
    {
      path: "incomes",
      element: <RecentIncomes></RecentIncomes>,
      errorElement: <ErrorPage></ErrorPage>,
      action: recentIncomes,
    },
    {
      path: "expenses/:id",
      element: <RecentExpenses></RecentExpenses>,
      errorElement: <ErrorPage></ErrorPage>,
      action: recentExpenses,
    },
    {
      path: "deposits/:id",
      element: <RecentDeposits></RecentDeposits>,
      errorElement: <ErrorPage></ErrorPage>,
      action: recentDeposits,
    }, 
    {
      path: "/updateUsername",
      element: <EditUsername></EditUsername>,
      errorElement: <ErrorPage></ErrorPage>,
      action: setUsername,
    }, 
    {
      path: "/changePassword",
      element: <ChangePassword></ChangePassword>,
      errorElement: <ErrorPage></ErrorPage>,
      action: setPassword,
    },
    {
      path: "/bases",
      element: <IncomeBases/>,
      errorElement: <ErrorPage></ErrorPage>,
      action: recentBases,
    }
    ]
  },
  {
    // non-existent pages
    path: "*",
    errorElement: <ErrorPage></ErrorPage>,
    element: <ErrorPage></ErrorPage>,
  },
]);

function App() {
  return (
    <div className="App">
    <RouterProvider router={router}>
    </RouterProvider>
    </div>
  )
}

export default App