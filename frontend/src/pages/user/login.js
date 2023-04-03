import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/user_context";
import { useContext } from "react";
export default function UserLogin() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [dataReq, setData] = useState([]);
  const [errorMsg, setError] = useState([""]);
  const [userName, setUser] = useState([]);
  const [passWord, setPass] = useState([]);
  const [authState, setAuthState] = useContext(AuthContext);

  let errorOccured = false;

  let loginRequest = () => {
    fetch(
      "http://localhost:5000/user/login?email=" +
        userName +
        "&password=" +
        passWord,
      { method: "GET" }
    )
      .then((response) => {
        if (!response.ok) {
          errorOccured = true;
        }

        return response.json();
      })
      .then((data) => {
        if (errorOccured == false) {
          setIsLoaded(true);
          setData(data.data);

          localStorage.setItem("user_token", data.results.access);
          setAuthState({
            userLoggedIn: true,
            userData: data.results.user_data,
          });
          navigate("/");
        } else {
          setError(data.error);
        }
      });
  };

  let handleSubmit = (event) => {
    loginRequest();
    event.preventDefault();
  };

  return (
    <>
      {authState.userLoggedIn === true ? (
        navigate("/")
      ) : (
        <>
          <header class="articleHeader" id="p1">
            Login
          </header>
          <p>
            <div class="content">
              <div class="loginError">{errorMsg}</div>
              <form onSubmit={handleSubmit}>
                <label>
                  Email:{" "}
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => setUser(e.target.value)}
                  />
                </label>

                <label>
                  Password:{" "}
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPass(e.target.value)}
                  />
                </label>
                <input value="Login" type="submit" />
              </form>
            </div>
          </p>
        </>
      )}
    </>
  );
}