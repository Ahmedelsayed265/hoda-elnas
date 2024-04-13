import React, { useEffect } from "react";

const GoogleMeetingView = () => {
  const meetingLink = sessionStorage.getItem("meeting_link");
  useEffect(() => {
    // Create an iframe element
    const iframe = document.createElement("iframe");

    // Set attributes for the iframe
    iframe.src = meetingLink;
    iframe.allow = "camera; microphone; fullscreen";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "none";

    // Append the iframe to the container
    document.getElementById("meet-container").appendChild(iframe);

    // Clean up function
    return () => {
      // Remove the iframe when the component is unmounted
      document.getElementById("meet-container").removeChild(iframe);
    };
  }, [meetingLink]);

  return (
    <div
      id="meet-container"
      style={{ height: "600px", paddingTop: "16px" }}
    ></div>
  );
};

export default GoogleMeetingView;
