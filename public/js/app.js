//
//
//console.log("Client side java script file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("p#message-1");
const messageTwo = document.querySelector("p#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log("location: " + location);
  const url = "http://localhost:3000/weather?address=" + location;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(url).then((response) => {
    //console.log("Response: ", response);
    response.json().then((data) => {
      setTimeout(() => {
        if (data.error) {
          //console.log("error: ", data.error);
          messageOne.textContent = "Error: " + data.error;
          messageTwo.textContent = "";
        } else {
          ///console.log("location: ", data.location);
          //console.log("Forecast: ", data.info);
          messageOne.textContent = "";
          messageTwo.textContent = "Forecast: " + data.info;
        }
      }, 1000);
    });
  });
});

//
//
