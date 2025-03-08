exports.handler = async (event) => {
  const blockedIps = [
    "::1", // Block localhost for testing
    "127.0.0.1", // Block localhost for testing
    "2001:f70:83e0:6000:1456:87f8:f059:b2c9", // IPv6 address
    "122.219.239.178", // IPv4 address (in case it's used)
  ];

  // Get the user IP address only
  const ipAddress = event.headers["x-nf-client-connection-ip"];

  if (blockedIps.includes(ipAddress)) {
    console.log("Access forbidden :" + ipAddress);
    return {
      statusCode: 403,
      // body: JSON.stringify({ message: "Access forbidden" }),
    };
  }

  // If the IP is not blocked, proceed to serve the site
  console.log("Access granted: " + ipAddress);
  return {
    statusCode: 302,
    headers: {
      Location: "/pages/login.html"
    },
    body: JSON.stringify({ message: "Access granted" }),
  };
};
