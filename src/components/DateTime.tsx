import React, { useMemo } from 'react';
import dayjs from 'dayjs';

type Props = {
  format?: string;
  seconds: number;
  titleFormat?: string;
};

const DateTime: React.FC<Props> = ({
  format = 'DD-MM-YYYY',
  seconds,
  titleFormat = 'DD-MM-YYYY HH:mm:ss'
}) => {
  const parsed = useMemo(() => dayjs.unix(seconds), [seconds]);

  return (
    <time dateTime={parsed.toISOString()} title={parsed.format(titleFormat)}>
      {parsed.format(format)}
    </time>
  );
};

export default DateTime;
