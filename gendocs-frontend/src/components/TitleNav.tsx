import { Box, Divider, IconButton } from "@mui/material";
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
          <IconButton onClick={() => navigate(-1)}>
            <Icon icon="arrowBack" />
          </IconButton>
        )}
      </Box>
      <Box>
        <Divider />
      </Box>
    </>
  );
};
