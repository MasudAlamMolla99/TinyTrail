import { BarChart as ChartIcon } from "@mui/icons-material";
import format from "date-fns/format";
import React, { memo } from "react";

const LinkCard = ({
  id,
  createdAt,
  name,
  longURL,
  shortCode,
  totalClicks,
  deleteLink,
  copyLink,
}) => {
  let dateValue = null;

  if (createdAt?.toDate instanceof Function) {
    dateValue = createdAt.toDate();
  } else if (createdAt instanceof Date) {
    dateValue = createdAt;
  } else if (typeof createdAt === "number") {
    dateValue = new Date(createdAt);
  }

  const shortUrl = `${window.location.host}/${shortCode}`;

  return (
    <div className="flex flex-col mb-2 sm:flex-row justify-between items-start sm:items-center gap-6 p-6 border border-base-300 rounded-lg bg-base-100">

      {/* Left Side */}
      <div className="flex-1">
        <p className="text-xs uppercase text-base-content/60">
          CREATED AT {dateValue ? format(dateValue, "d MMM y, HH:mm") : "—"}
        </p>

        <div className="my-3">
          <h2 className="text-xl font-semibold">{name}</h2>

          <p className="truncate text-base-content/70 max-w-xl">
            {longURL}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <span className="text-primary font-medium">{shortUrl}</span>

          <button
            onClick={() => copyLink(shortUrl)}
            className="btn btn-outline btn-sm rounded-none"
          >
            Copy
          </button>

          <button
            onClick={() => deleteLink(id)}
            className="btn btn-primary btn-sm rounded-none"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Right Side (Clicks) */}
      <div className="flex flex-col items-center justify-center min-w-[80px]">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>{totalClicks}</span>
          <ChartIcon fontSize="small" />
        </div>

        <p className="text-xs uppercase text-base-content/60 hidden sm:block">
          Total Clicks
        </p>
      </div>
    </div>
  );
};

export default memo(LinkCard);