import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { TitleNav } from "./TitleNav";

const DriveTemplate = () => {
  const { driveId = "" } = useParams<{ driveId: string }>();

  return (
    <Stack spacing={2}>
      <Box>
        <TitleNav title="" />
      </Box>

      <Box>
        <iframe
          width="100%"
          height="750px"
          src={`https://docs.google.com/document/d/${driveId}/edit?embedded=true`}
          allowFullScreen
        />
      </Box>
    </Stack>
  );
};

export default DriveTemplate;
