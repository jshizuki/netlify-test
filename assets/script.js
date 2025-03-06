console.log("Script is running on:", window.location.pathname);

// Important: Must initialize Netlify Identity
netlifyIdentity.init();
// console.log("Netlify Identity object:", netlifyIdentity);

// Delay check slightly to ensure Identity is ready
setTimeout(() => {
  const user = netlifyIdentity.currentUser();
  console.log("Manually checking user:", user);

  // Redirect logged-in users away from login page
  if (user && (window.location.pathname === "/" || window.location.pathname === "/pages/login.html")) {
    console.log("Redirecting logged-in user to /pages/index.html");
    window.location.href = "/pages/index.html";
  }

  // Redirect logged-out users trying to access protected pages
  const protectedPages = ["/pages/index.html", "/pages/new-page.html", "/pages/old-page.html"];
  if (!user && protectedPages.includes(window.location.pathname)) {
    console.log("Redirecting logged-out user to /pages/login.html");
    alert("You are not logged in!");
    window.location.href = "/pages/login.html";
  } else {
    document.body.style.display = "block"; // Show body content after checks
  }
}, 500); // Delay 500ms to ensure Identity loads

// Handle login success
netlifyIdentity.on("login", (user) => {
  console.log("User logged in:", user);
  window.location.href = "/pages/index.html";
});

// Handle logout
netlifyIdentity.on("logout", () => {
  console.log("User logged out");
  window.location.href = "/pages/login.html"; // Redirect to login page after logout
});
