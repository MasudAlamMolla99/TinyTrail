import { Typography, Button, Box } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import format from "date-fns/format";

const LinkCard = ({ id, createdAt, name, longURL, shortCode, totalClicks }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="textSecondary" variant="overline">
          CRETAED AT {format(createdAt, "d MMM y, HH:mm")}
        </Typography>
        <Box my={2}>
          <Typography variant="h5"> {name}</Typography>
          <Typography> {longURL}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography color="primary">
            {window.location.host}/{shortCode}
          </Typography>
          <Box mx={2}>
            <Button size="small" ml={4} variant="outlined">
              Copy
            </Button>
          </Box>
          <Button
            size="small"
            color="secondary"
            disableElevation
            variant="contained">
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

export default LinkCard;
