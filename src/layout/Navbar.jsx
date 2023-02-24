import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      alignItems="center"
      sx={{
        boxShadow: "0  3px 14px #80808048",
        backgroundColor: "#e0e1fc",
        position: "sticky",
        top: 0,
        paddingInline: 2,
        height: 60,
        zIndex: 99,
      }}
    >
      <Grid item xs={12} md lg alignItems="center">
        <Typography variant="h3" color="#3b4584">
          ASK
        </Typography>
      </Grid>
      <Grid container item xs>
        {data.map((link) => (
          <Grid key={link.path} item xs>
            <Stack
              onClick={() => navigate(link.path)}
              sx={{
                borderRadius: 1,
                cursor: "pointer",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <FontAwesomeIcon
                color="#3b4584"
                icon={`fa-solid fa-${link.icon}`}
              />
              <Typography color="#3b4584" variant="caption">
                {link.label}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Navbar;
