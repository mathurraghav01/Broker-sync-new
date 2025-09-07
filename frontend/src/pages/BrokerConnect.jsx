import { useState } from "react";
import { connectBroker, getProfile } from "../services/api";

export default function BrokerConnect() {
  const [profile, setProfile] = useState(null);

  const handleConnect = async () => {
    const { data } = await connectBroker();
    window.location.href = data.loginUrl;
  };

  const handleProfile = async () => {
    const { data } = await getProfile();
    setProfile(data);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleConnect}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Connect Zerodha
      </button>

      <button
        onClick={handleProfile}
        className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Get Profile
      </button>

      {profile && <pre className="mt-4">{JSON.stringify(profile, null, 2)}</pre>}
    </div>
  );
}
