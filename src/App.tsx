import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import { StateType } from "./types/state";
import { initializeApp } from "./redux/app-reducer";
import Login from "./components/Login/Login";
import Profile from "./pages/Profile/Profile";

type AppProps = {
  isInitialized: boolean;
  // is_auth: boolean;
  isProcessLogin: boolean;
  initializeApp(): void;
}

function App(props: AppProps) {
  useEffect(() => {
    // debugger
    props.initializeApp();
  }, []);

  // if (!props.isInitialized) {
  //   return <h1 style={{"position": "absolute", "top": "50%", "left": "50%"}} >LOADING...</h1>;
  // }
  
  return (
    <div className="App">
      {props.isProcessLogin && <Login />}
      <BrowserRouter>
        <Header />
        <Navigation/>
        <Routes>
          <Route path="/" element={<Navigate to={"/main"} />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="id:user_id" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

let mapStateToProps = (state: StateType) => ({
  isInitialized: state.appInitialized.isInitialized,
  // is_auth: state.auth.is_auth,
  isProcessLogin: state.auth.isProcessLogin
});

export default connect(mapStateToProps, { initializeApp })(App);
