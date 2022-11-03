import React from 'react';

import { apiFetch } from '@web/lib/typedFetch';

export default function StatusChecker() {
  const [status, setStatus] = React.useState<string>();

  React.useEffect(() => {
    apiFetch<API.AppStatusResponse>('/status').then(({ data }) =>
      setStatus(data.status),
    );
  }, [setStatus]);

  let statusColor: string;

  if (!status) statusColor = 'bg-yellow-500';
  else if (status === 'OK') statusColor = 'bg-green-500';
  else statusColor = 'bg-red-500';

  return (
    <div className="flex justify-center items-center gap-2 p-4">
      <span>API Status:</span>
      <span className={'h-3 w-3 rounded-full ' + statusColor} />
    </div>
  );
}
