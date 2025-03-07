exports.handler = async (event) => {

  const blockedIps = [
    "::1", // Block localhost for testing
    "2001:f70:83e0:6000:1456:87f8:f059:b2c9", // IPv6 address
    "122.219.239.178", // IPv4 address (in case it's used)
  ];

  const ipAddress =
    event.headers["x-forwarded-for"] || event.headers["remote-addr"];

  if (blockedIps.includes(ipAddress)) {
    console.log("Access forbidden:" + ipAddress);
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Access forbidden" }),
    };
  }

  // If the IP is not blocked, proceed to serve the site
  console.log("Access granted:" + ipAddress);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Access granted" }),
  };
};
