interface EventProps {
  events: any[];
}

const EventLog = ({ events }: EventProps) => {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No events yet. Start a session to see events here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {events.map((event, index) => (
        <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium">{event.type}</span>
            <span className="text-xs text-gray-500">{event.timestamp}</span>
          </div>
          <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
            {JSON.stringify(event, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default EventLog;
