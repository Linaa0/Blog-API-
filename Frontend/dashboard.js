const API = "http://localhost:5000/api";

// Protect route
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "adminlogin.html";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "adminlogin.html";
});

// Load posts
async function loadPosts() {
    try {
        const res = await fetch(`${API}/posts`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const posts = await res.json();

        document.getElementById("postCount").innerText = posts.length;

        const table = document.getElementById("postsTable");
        table.innerHTML = "";

        posts.forEach(post => {
            table.innerHTML += `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.description || "No description"}</td>
                    <td>
                        <button onclick="deletePost('${post._id}')">Delete</button>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}

// Delete
async function deletePost(id) {
    await fetch(`${API}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    loadPosts();
}

loadPosts();