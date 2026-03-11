const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");

const loginFormFields = loginForm.querySelector("form");
const signupFormFields = signupForm.querySelector("form");

const loginPopup = document.getElementById("loginPopup");
const signupPopup = document.getElementById("signupPopup");

const API_BASE = "http://127.0.0.1:8000/api/auth";


// SWITCH FORMS

showSignupBtn.onclick = () => {
loginForm.classList.add("hidden");
signupForm.classList.remove("hidden");
loginPopup.innerHTML="";
};

showLoginBtn.onclick = () => {
signupForm.classList.add("hidden");
loginForm.classList.remove("hidden");
signupPopup.innerHTML="";
};


// POPUP MESSAGE

function showPopup(element, message, error=false){

element.innerHTML = `
<div class="popup-message ${error ? "error":""}">
${message}
</div>
`;

setTimeout(()=>{
element.innerHTML="";
},3000);

}


// SIGNUP

signupFormFields.addEventListener("submit", async (e)=>{

e.preventDefault();

const first_name = document.getElementById("signupFirstName").value.trim();
const last_name = document.getElementById("signupLastName").value.trim();
const password = document.getElementById("signupPassword").value.trim();

const button = signupFormFields.querySelector("button");

button.disabled=true;
button.textContent="Creating...";


if(!first_name || !last_name || !password){

showPopup(signupPopup,"All fields are required.",true);

button.disabled=false;
button.textContent="Sign Up";

return;
}

if(password.length < 6){

showPopup(signupPopup,"Password must be at least 6 characters.",true);

button.disabled=false;
button.textContent="Sign Up";

return;

}

try{

const res = await fetch(`${API_BASE}/register/`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
first_name,
last_name,
password
})

});

const data = await res.json();

if(res.ok){

localStorage.setItem("access",data.access);
localStorage.setItem("refresh",data.refresh);

showPopup(signupPopup,"Account created successfully!");

signupFormFields.reset();

setTimeout(()=>{

signupForm.classList.add("hidden");
loginForm.classList.remove("hidden");

},1500);

}else{

let errorMsg="Unable to create account.";

if(data.detail) errorMsg=data.detail;

showPopup(signupPopup,errorMsg,true);

}

}catch{

showPopup(signupPopup,"Server connection failed.",true);

}

finally{

button.disabled=false;
button.textContent="Sign Up";

}

});


// LOGIN

loginFormFields.addEventListener("submit", async (e)=>{

e.preventDefault();

const first_name = document.getElementById("loginFirstName").value.trim();
const last_name = document.getElementById("loginLastName").value.trim();
const password = document.getElementById("loginPassword").value.trim();

const button = loginFormFields.querySelector("button");

button.disabled=true;
button.textContent="Signing In...";

if(!first_name || !last_name || !password){

showPopup(loginPopup,"All fields are required.",true);

button.disabled=false;
button.textContent="Sign In";

return;

}

try{

const res = await fetch(`${API_BASE}/login/`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
first_name,
last_name,
password
})

});

const data = await res.json();

if(res.ok){

localStorage.setItem("access",data.access);
localStorage.setItem("refresh",data.refresh);

showPopup(loginPopup,"Login successful!");

loginFormFields.reset();

setTimeout(()=>{
window.location.href="index.html";
},1200);

}else{

let errorMsg="Invalid login details.";

if(data.detail) errorMsg=data.detail;

showPopup(loginPopup,errorMsg,true);

}

}catch{

showPopup(loginPopup,"Cannot connect to server.",true);

}

finally{

button.disabled=false;
button.textContent="Sign In";

}

});