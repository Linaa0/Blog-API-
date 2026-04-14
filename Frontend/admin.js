const API = "http://localhost:5000/api";

async function adminLogin() {
    
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
try{
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg || "Login failed");
    return;
  }

  // save token
  localStorage.setItem("token", data.token);

  // decode token
  const user = parseJwt(data.token);

  if (user.role !== "admin") {
    alert("You are not an admin");
    return;
  }

  console.log("REDIRECTING...");
  // redirect to admin dashboard
  window.location.href = "admindashboard.html";
}catch(err){
    console.error(err);
    alert("Server Error");
}
}


// JWT decode helper
function parseJwt(token) {
    try{
 return JSON.parse(atob(token.split('.')[1]));
    }catch{
        return null;
    }
 
}