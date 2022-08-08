import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

export default {
  columns: [
    { name: "Date", align: "left" },
    { name: "open", align: "left" },
    { name: "high", align: "center" },
    { name: "low", align: "center" },
    { name: "close", align: "center" },
  ],

  rows: [
    {
      Date: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          14/09/20
        </VuiTypography>
      ),
      // function: <Function job="Programtor" org="Developer" />,
      open: (
        // <VuiBadge
        //   variant="standard"
        //   badgeContent="Offline"
        //   size="xs"
        //   container
        //   sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
        //     background: "unset",
        //     border: `${borderWidth[1]} solid ${white.main}`,
        //     borderRadius: borderRadius.md,
        //     color: white.main,
        //   })}
        // />
        <VuiTypography variant="caption" color="white" fontWeight="medium">
        9000
      </VuiTypography>
      ),
      high: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          14/09/20
        </VuiTypography>
      ),
      low: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
      close: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Close
        </VuiTypography>
      ),
    },
  ],
};
