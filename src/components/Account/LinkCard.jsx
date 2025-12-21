import { Typography, Button, Box } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import format from "date-fns/format";
import { memo } from "react";

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
    // Firestore Timestamp
    dateValue = createdAt.toDate();
  } else if (createdAt instanceof Date) {
    // JS Date
    dateValue = createdAt;
  } else if (typeof createdAt === "number") {
    // Unix timestamp
    dateValue = new Date(createdAt);
  }
  console.log("Linkcard");
  const shortUrl = `${window.location.host}/${shortCode}`;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="textSecondary" variant="overline">
          CREATED AT {dateValue ? format(dateValue, "d MMM y, HH:mm") : "—"}
        </Typography>
        <Box my={2}>
          <Typography variant="h5"> {name}</Typography>
          <Typography> {longURL}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography color="primary">{shortUrl}</Typography>
          <Box mx={2}>
            <Button
              onClick={() => copyLink(shortUrl)}
              size="small"
              ml={4}
              variant="outlined"
            >
              Copy
            </Button>
          </Box>
          <Button
            size="small"
            color="secondary"
            disableElevation
            variant="contained"
            onClick={() => deleteLink(id)}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Box>
        <Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>{totalClicks}</Typography>
            <ChartIcon />
          </Box>
          <Typography variant="overline">Total Clicks</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(LinkCard);
