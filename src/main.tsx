import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ToastProvider } from "./context/ToastContext"
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ToastProvider>
        <Toaster />
        <App />
      </ToastProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
