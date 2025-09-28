import { createBrowserRouter, RouterProvider } from "react-router";
import routeConfig from "./router";
import { useEffect } from "react";
import eruda from 'eruda';


const showEruda = import.meta.env.VITE_SHOW_ERUDA;
export default function App() {
  const basename = '/';
  const router = createBrowserRouter(routeConfig, {
      basename,
  });
  
  useEffect(() => {
    if (showEruda === 'true') {
      eruda.init();
    }
  }, []);

  return (
   <RouterProvider router={router} />
  )
}