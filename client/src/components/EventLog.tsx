import React from 'react';

interface EventProps {
  events: Array<{
    type: string;
    event_id?: string;
    timestamp?: string;
    [key: string]: any;
  }>;
}

const EventLog = ({ events }: EventProps) => {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No events recorded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {events.map((event, index) => (
        <div key={event.event_id || index} className="bg-gray-100 p-3 rounded-md text-sm">
          <div className="flex justify-between items-start">
            <span className="font-semibold text-xs">{event.type}</span>
            {event.timestamp && (
              <span className="text-xs text-gray-500">{event.timestamp}</span>
            )}
          </div>
          <pre className="mt-1 text-xs overflow-x-auto whitespace-pre-wrap break-words">
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(event).filter(([key]) => !['type', 'timestamp', 'event_id'].includes(key))
              ),
              null,
              2
            )}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default EventLog;
