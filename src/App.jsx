import { useState } from "react";
import LandingPage from "../assets/LandingPage.png";
import Approve from "../assets/approve.png";
import "./App.css";
import countries from "./utils/countries";
const endpointUrl = "http://161.35.170.95/api/waiting-list-registration";

const App = () => {
  const [isPhone, setIsPhone] = useState(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revealDone, setRevealDone] = useState(false);
  const [hideMain, setHideMain] = useState(false);
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // var phoneRegex = /^(\+\d{1,3}\s)?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;

  const submit = (e) => {
    e.preventDefault();
    var payLoad;
    if (isPhone) {
      var phone = document.getElementById("phone-input").value;
      var country_code = document.getElementById("country-code").value;
      if (phone == "default") {
        alert("You must select a country");
        return;
      }
      // if (!phoneRegex.test()) {
      //   alert("Invalid phone number");
      //   return;
      // }
      payLoad = {
        whatsapp_number: phone,
        country_code: country_code,
      };
    } else {
      if (!emailRegex.test(document.getElementById("email-input").value)) {
        alert("Invalid email");
        return;
      }

      payLoad = {
        email: document.getElementById("email-input").value,
      };
    }
    setLoading(true);
    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    })
      .then((response) => {
        switch (response.status) {
          // case 302:
          //   alert("sdsdf");
          //   break;
          case 200:
            setHideMain(true);
            setTimeout(() => {
              setDone(true);
              setRevealDone(true);
            }, 800);
            break;
          case 409:
            alert("That email or phone has already signed up.");
            break;
          case 404:
            alert("Invalid email or phone.");
          case 422:
            alert(response.message);
            break;
          default:
            break;
        }
        setLoading(false);
      })
      .catch((status) => {
        setLoading(false);
      });
  };

  const Loader = () => {
    return (
      <div className="flex justify-center w-full">
        <div
          class="bg-black w-2 h-2 rounded-full animate-bounce circleC"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          class="bg-black mx-2 w-2 h-2 rounded-full animate-bounce circleB"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          class="bg-black w-2 h-2 rounded-full animate-bounce circleA"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>
    );
  };

  const EmailInput = () => {
    return (
      <>
        <input
          className="outline-none rounded-full w-1/2 lg:w-[320px] px-4"
          placeholder="Enter email"
          id="email-input"
        />

        <button
          className="bg-gold ml-2 lg:ml-4 font-bold hover:bg-black hover:text-white rounded-full lg:px-24 shadow-xl w-1/2 lg:w-[320px]"
          type="button"
          onClick={(e) => submit(e)}
        >
          {loading ? <Loader /> : "Join"}
        </button>
      </>
    );
  };

  const PhoneInput = () => {
    return (
      <>
        <select id="country-code" className="w-[50px] outline-none">
          <option value={"default"} defaultValue>
            CC
          </option>
          {countries.map((c, i) => (
            <option key={i} value={c.code}>
              {c.code}
            </option>
          ))}
        </select>
        <input
          className="outline-none rounded-full w-1/2 lg:w-[320px] px-4"
          placeholder="e.g. 0501234321"
          id="phone-input"
        />
        <button
          className="bg-gold ml-2 lg:ml-4 font-bold hover:bg-black hover:text-white rounded-full lg:px-24 shadow-xl w-1/2 lg:w-[320px]"
          type="button"
          onClick={(e) => submit(e)}
        >
          {loading ? <Loader /> : "Join"}
        </button>
      </>
    );
  };

  const ChooseContact = () => {
    return (
      <>
        <div className="flex md:py-4 justify-between xs:w-1/2 w-full md:w-fit mt-2">
          <button
            className="bg-gold font-bold hover:bg-black hover:text-white rounded-full px-[45px] sm:px-[90px] md:px-12 lg:px-20 py-2 md:py-4 shadow-xl"
            type="button"
            onClick={() => setIsPhone(false)}
          >
            Email
          </button>
          <button
            className="bg-gold md:ml-4 font-bold hover:bg-black hover:text-white rounded-full px-[45px] sm:px-[90px] py-2 md:py-4 md:px-12 lg:px-20 shadow-xl"
            type="button"
            onClick={() => setIsPhone(true)}
          >
            Phone
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {done ? (
        <div
          className={`${
            revealDone
              ? "opacity-1 transition-opacity ease-in duration-700"
              : "opacity-0"
          } w-screen h-screen flex flex-col items-center justify-center `}
        >
          <img src={Approve} />
          <h1 className="font-bold text-4xl">Congratulations</h1>
          <h4 className="font-bold">
            You have been added to the waiting list.
          </h4>
          <h4 className="font-bold">
            We will contact you when the platform goes live!
          </h4>
        </div>
      ) : (
        <div
          className={`${
            hideMain ? "opacity-0" : "opacity-1"
          } transition-opacity ease-in duration-700 px-2 md:px-12 flex flex-col h-screen w-screen justify-between`}
        >
          <div className="flex font-bold text-lg md:text-2xl">ECS Platform</div>

          <div className="flex md:flex-row flex-col-reverse justify-between items-center w-full grow">
            <div className="flex flex-col w-full px-2 md:w-1/2 text-justify">
              <h1 className="text-4xl lg:text-[60px] md:text-[30px] font-bold mb-4">
                Meet senders
              </h1>
              <h1 className="my-4 text-md md:text-lg lg:text-xl">
                An easy way to meet fellow Africans that can help you get money
                overseas to loved ones.
                <span className="italic font-bold">It's as simple as 123.</span>
              </h1>
              <p className="text-sm  md:text-sm lg:text-lg mb-4">
                Enter your email or phone below to join the waiting list.
              </p>
              <form onSubmit={submit}>
                <div className="flex justify-between">
                  {isPhone === null ? (
                    <ChooseContact />
                  ) : isPhone ? (
                    <PhoneInput />
                  ) : (
                    <EmailInput />
                  )}
                </div>
              </form>
            </div>

            <div className="w-full md:w-1/2 h-full overflow-hidden">
              <img
                className="h-full w-full  object-contain"
                src={LandingPage}
              />
            </div>
          </div>

          <div className="mt-2 flex font-medium text-xs">
            @{new Date().getFullYear()} ECS Platform. All rights reserved.
          </div>
        </div>
      )}
    </>
  );
};

export default App;
