const username = document.querySelector(".uname") //|| null;
const email = document.querySelector(".email");
const password = document.querySelector(".psw");
const confirmpassword = document.querySelector(".signupbtn").getElementsByClassName(signupbtn);
const submitBtn = document.querySelector(".submitBtn");

const validateData = (data) => {
  if (!data.name) {
    alertBox(data);
  } else {
    sessionStorage.name = data.name;
    sessionStorage.email = data.email;
    location.href = "/";
  }
};

const alertBox = (data) => {
  const alertContainer = document.querySelector(".alert-box");
  const alertMsg = document.querySelector(".alert");
  alertMsg.innerHTML = data;

  alertContainer.style.top = `5%`;
  setTimeout(() => {
    alertContainer.style.top = null;
  }, 5000);
};

//this will check if user is supposed to login or register.
if (username == null) {
  // means login page is open
  submitBtn.addEventListener("click", () => {
    fetch("/login-user", {
      //change login userr
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        validateData(data);
      });
  });
} else {
  // means register page is open and now it will also push data into the database

  submitBtn.addEventListener("click", () => {
    fetch("/register-user", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        confirmpassword: confirmpassword.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        validateData(data);
      });
  });
}
