import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import Title from "./Title";

type TitleNavProps = {
  title: string;
  goback?: boolean;
};

export const TitleNav: React.FunctionComponent<TitleNavProps> = ({
  title,
  goback = true,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // border: "1px solid black",
        }}
      >
        <Title>{title}</Title>

        {goback && (
          <Tooltip title="Regresar" arrow>
            <IconButton onClick={() => navigate(-1)}>
              <Icon icon="arrowBack" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box>
        <Divider />
      </Box>
    </>
  );
};
