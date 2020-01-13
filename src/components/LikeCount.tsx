import React from "react";
import { toArray } from "../redux/helpers";

type Props = {
  likes: Record<string, boolean>;
};

const LikeCount: React.FC<Props> = ({ likes }) => {
  const count = toArray(likes).filter(like => like).length;

  return (
    <>
      {count} like{count < 2 ? "" : "s"}
    </>
  );
};

export default LikeCount;
