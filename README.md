Broker Sync

Broker Sync is a full-stack application demonstrating integration with a real stock broker API.
For this project, we used Zerodha Kite Connect as the broker.

The project includes:

Backend: Node.js + Express with a broker adapter

Frontend: React + Vite, communicating with the backend

Authentication flow with Zerodha and fetching live broker data

 Features

Login with Zerodha (via Kite Connect API)

Backend session management after authentication

Fetch user profile from Zerodha (proof of live broker integration)

Clean separation of frontend (UI) and backend (API)

 Tech Stack

Backend: Node.js, Express, KiteConnect SDK

Frontend: React (Vite)

Deployment: Can deploy backend & frontend on Vercel

 Important Note: Paid API Required

This project requires a Zerodha Kite Connect API key & secret to fully function.

Zerodha Kite Connect is paid (₹2000/year) — this is why live login and profile fetch cannot work without it.

The project demonstrates the integration logic, but reviewers will need to provide their own API key to test live functionality.
