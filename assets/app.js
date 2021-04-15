const date = new Date();
const todyDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;

const btn = document.getElementById("generate"); // get button
const nodeDate = document.getElementById("date"); // get Date
const temp = document.getElementById("temp"); // get Tempreture
const content = document.getElementById("content"); // get fellings
const api = "http://api.openweathermap.org/data/2.5/weather?zip="; // api
const key = "&appid=f712d0c8667d04a263f01d521f33c3d0"; // api key

btn.addEventListener("click", (event) => {
  event.preventDefault();
  const zip = document.getElementById("zip").value;
  // async function with chain promise easy handle data
  const asynFlow = fetch(api + zip + key)
    .then((response) => {
      return response.ok ? response.json() : new Error("data not found");
    })
    .then((data) => {
      async function newData(url = "", d = {}) {
        const dataPost = await fetch(url, {
          method: "POST",
          body: JSON.stringify(d),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        });
        try {
          if ((await dataPost).ok) {
            const jsonData = await dataPost.json();
          }
        } catch (e) {
          throw new Error(e);
        }
      }
      const userResponse = document.getElementById("fellings").value;
      // POST data to server
      newData("/add/data", {
        date: todyDate,
        temp: data.main.temp,
        content: userResponse,
      });
      console.log(data);
    });
  // update UI
  UI();
});
// asyncronous function to get and update data depend on /get/data endpoint
function UI() {
  fetch("/get/data")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      console.log(data);
      nodeDate.innerHTML = `Date: ${data.date}`;
      temp.innerHTML = `Temperature: ${data.temp}&#8451;`;
      content.innerHTML = `Fellings: ${data.content}`;
    });
}
