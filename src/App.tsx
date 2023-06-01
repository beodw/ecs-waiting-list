import { useState } from "react";
import LandingPage from "../assets/LandingPage.png";
import "./App.css";
const endpointUrl = "http://161.35.170.95/api/waiting-list-registration";

const App = () => {
  const [email, setEmail] = useState("");
  const [isPhone, setIsPhone] = useState<any>(null);
  const [phone, setPhone] = useState<any>(null);

  const submit = (e: any) => {
    e.preventDefault();

    var payLoad;
    if (phone) {
      payLoad = {
        phone: email,
      };
    } else if (email) {
      payLoad = {
        email: email,
      };
    }

    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
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

  const EmailInput = () => {
    return (
      <>
        <input
          className="outline-none rounded-full w-1/2 lg:w-[320px] px-4"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="bg-gold ml-2 lg:ml-4 font-bold hover:bg-black hover:text-white rounded-full lg:px-24 shadow-xl w-1/2 lg:w-[320px]"
          type="button"
          onClick={(e) => submit(e)}
        >
          Join
        </button>
      </>
    );
  };

  const PhoneInput = () => {
    return (
      <>
        <input
          className="outline-none rounded-full w-1/2 lg:w-[320px] px-4"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          className="bg-gold ml-2 lg:ml-4 font-bold hover:bg-black hover:text-white rounded-full lg:px-24 shadow-xl w-1/2 lg:w-[320px]"
          type="button"
          onClick={(e) => submit(e)}
        >
          Join
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
    <div className="px-2 md:px-12 flex flex-col h-screen w-screen  justify-between">
      <div className="flex font-bold text-lg md:text-2xl">ECS Platform</div>

      <div className="flex md:flex-row flex-col-reverse justify-between items-center w-full grow">
        <div className="flex flex-col w-full px-2 md:w-1/2 text-justify">
          <h1 className="text-4xl lg:text-[60px] md:text-[30px] font-bold mb-4">
            Meet senders
          </h1>
          <h1 className="my-4 text-md md:text-lg lg:text-xl">
            An easy way to meet fellow Africans that can help you get money
            overseas to loved ones.
            <span className="italic font-bold"> It's as simple as 123.</span>
          </h1>
          <p className="text-sm  md:text-sm lg:text-lg mb-4">
            Enter your email or phone below to join the waiting list.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
          <img className="h-full w-full  object-contain" src={LandingPage} />
        </div>
      </div>

      <div className="flex font-medium text-xs">
        @{new Date().getFullYear()} ECS Platform. All rights reserved.
      </div>
    </div>
  );
};

export default App;
