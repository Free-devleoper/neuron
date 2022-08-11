import { Card, Icon } from "@mui/material";

import Gifn from "assets/images/white_logo.png";
import React from "react";
import VuiAvatar from "components/VuiAvatar";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import gif from "assets/images/cardimgfree.jpg";

const WelcomeMark = () => {
  return (
    <Card sx={() => ({
      height: "340px",
      py: "32px",
      backgroundImage: `url(${gif})`,
      backgroundSize: "cover",
      backgroundPosition: "50%"
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox>
          <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
            Welcome To,
          </VuiTypography>
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
            NEURON
          </VuiTypography>


          {/* <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            Glad to see you !
          </VuiTypography> */}
        </VuiBox>
        {/* <VuiTypography
          component="a"
          href="#"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          Tap to record
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
        </VuiTypography> */}
        <img src={Gifn} alt="logo" width="35%" />
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
