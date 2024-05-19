"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import MultiStepForm from "./components/RegistrationForm";

interface Notification {
  message: string;
}

export default function Admin() {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure the code runs only on the client-side
      const socket: Socket = io({
        path: "/api/socket",
      });

      socket.on("notification", (data: Notification) => {
        setNotifications((prev) => [...prev, data.message]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <MultiStepForm />
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}
