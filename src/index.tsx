import "bootstrap"
import ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import React, { StrictMode } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"
import "./images/Quicksand/static/Quicksand-Medium.ttf"
import Bundle from "./pages/Bundle"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/store"
import { LoadingProvider } from "./contexts/loadingContext"
let container = document.getElementById("root")
if (!container) {
  const body = document.getElementsByTagName("body")[0]
  container = document.createElement("div")
  container.setAttribute("id", "root")
  body.appendChild(container)
}
const root = createRoot(container)
root.render(
  <StrictMode>
    <Provider store={store}>
      <LoadingProvider>
        <BrowserRouter>
          <Bundle />
        </BrowserRouter>
      </LoadingProvider>
    </Provider>
  </StrictMode>
)
