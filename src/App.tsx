import { useState } from "react";
import LandingPage from "../assets/LandingPage.png";
import "./App.css";
const endpointUrl = "http://161.35.170.95/api/waiting-list-registration";

const App = () => {
  const [email, setEmail] = useState("");

  const submit = (e: any) => {
    e.preventDefault();

    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };
  return (
    <div className="mx-24 mt-12 flex-col">
      <div className="flex">ECS Pays</div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Meet senders</h1>
          <p className="text-lg">Meet senders</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex justify-between">
              <input
                className="outline-none rounded-full w-[320px] px-4"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="bg-gold ml-4 font-bold hover:bg-black hover:text-white rounded-full px-24 shadow-xl"
                type="button"
                onClick={(e) => submit(e)}
              >
                Join
              </button>
            </div>
          </form>
        </div>

        <img className="ml-2 outline-none h-full w-full" src={LandingPage} />
      </div>

      <div className="flex"></div>
      <div className="flex"></div>
    </div>
  );
};

export default App;
