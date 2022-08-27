import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { GoogleType } from "models/enums";
import { useParams, useSearchParams } from "react-router-dom";
import { TitleNav } from "./TitleNav";

const DriveTemplate = () => {
  const { driveId = "" } = useParams<{ driveId: string }>();

  const [params] = useSearchParams();
  const type = params.get("type") || GoogleType.DOCUMENT;

  return (
    <Stack spacing={2}>
      <Box>
        <TitleNav title="" />
      </Box>

      <Box>
        <iframe
          width="100%"
          height="750px"
          src={`https://docs.google.com/${type}/d/${driveId}/edit?embedded=true`}
          allowFullScreen
        />
      </Box>
    </Stack>
  );
};

export default DriveTemplate;
