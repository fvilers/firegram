import React, { useMemo } from "react";
import dayjs from "dayjs";

type Props = {
  format?: string;
  seconds: number;
  titleFormat?: string;
};

const FromNow: React.FC<Props> = ({ seconds }) => {
  const parsed = useMemo(() => dayjs.unix(seconds), [seconds]);

  return <span>{parsed.fromNow()}</span>;
};

export default FromNow;
