import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/user_context";
import { useContext } from "react";
import HTTPRequester from "../../utility/requester";
export default function UserLogin() {
  const navigate = useNavigate();
  const [userName, setUser] = useState([]);
  const [passWord, setPass] = useState([]);
  const [authState, setAuthState] = useContext(AuthContext);
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed !== null) {
      localStorage.setItem("user_token", dataFeed.results.access);
      setAuthState({
        userLoggedIn: true,
        userData: dataFeed.results.user_data,
      });

      navigate("/");
    }
  }, [dataFeed]);

  let handleSubmit = (event) => {
    getData(`user/login?email=${userName}&password=${passWord}`, "GET");
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
              <div class="loginError">{errorFeed}</div>
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
