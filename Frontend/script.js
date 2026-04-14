const API = "http://localhost:5000/api";

// REGISTER
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const res= await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, password })
  });

  const data= await res.json();
  if(!res.ok){
    alert(data.msg || "Registration Failed");
    return;
  }
  window.location.href = "login.html";
}

// LOGIN
async function login() {
    console.log("LOGIN FUNCTION TRIGGERED");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })

  });

  const data = await res.json();

  if(!res.ok){
    alert(data.msg || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);

  const user = parseJwt(data.token);

  if (user.role === "admin") {
    window.location.href = "admindashboard.html";
  } else {
    window.location.href = "dashboard.html";
  }

  console.log("Login clicked");
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// DELETE ACCOUNT
async function deleteAccount() {
  const userId = parseJwt(token).id;

  await fetch(`${API}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  logout();
}

// CREATE POST
async function createPost() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  const title=titleInput.value;
  const content= contentInput.value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ title, content })
  });

  loadPosts();

  titleInput.value="";
  contentInput.value="";
}

// LOAD POSTS
async function loadPosts(isAdmin = false) {
  const res = await fetch(`${API}/posts`);
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="post">
        <strong>${post.title}</strong>
        <p>${post.content}</p>
        <small>Created by ${post.user?.name || "Unknown"}</small>

        <button onclick="deletePost('${post._id}')">Delete</button>
        ${isAdmin ? `<button onclick="updatePost('${post._id}')">Edit</button>` : ""}
      </div>
    `;
  });
}

// DELETE POST
async function deletePost(id) {
    const token= localStorage.getItem("token");

  const res= await fetch(`${API}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data= await res.json();
  if(!res.ok){
    alert(data.msg || "Delete failed");
        return;
    
  }

  loadPosts();
}

// SIMPLE JWT PARSER
function parseJwt(token) {
    if(!token){
        return null;
    }
    try{
         return JSON.parse(atob(token.split('.')[1]));
    }catch (err){
        return null;
    }
 
}

const user= parseJwt(token);

if(user && user.role=== "admin"){
    console.log("You are an admin");
}
