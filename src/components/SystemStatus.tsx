import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function SystemStatus() {
  const [status, setStatus] = React.useState({
    api: true,
    websocket: true,
    database: true,
    storage: true,
  });

  // Simulate status updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        websocket: Math.random() > 0.1,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
      <div className="space-y-4">
        {Object.entries(status).map(([service, isOperational]) => (
          <div key={service} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 capitalize">{service}</p>
              <p className="text-sm text-gray-500">
                {isOperational ? 'Operational' : 'Service Disruption'}
              </p>
            </div>
            {isOperational ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}