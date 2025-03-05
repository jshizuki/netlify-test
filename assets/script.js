console.log("Hello from Netlify!");

// Initialize the Netlify Identity Widget
netlifyIdentity.init();

// Optional: Handle login success (redirect or show user info)
netlifyIdentity.on("login", (user) => {
  console.log("User logged in:", user);
  // Redirect user after login to the home page (or any page)
  window.location.href = "/pages/index.html";
});

// Optional: Handle logout (redirect to login page or do something else)
netlifyIdentity.on("logout", () => {
  console.log("User logged out");
  window.location.href = "/pages/login.html"; // Redirect back to login page after logout
});
