import Box from "@mui/material/Box";
import SkeletonBase from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Skeleton() {
    return (
        <Stack gap={2}>
            <SkeletonBase variant="text" />
            <Box>
                <SkeletonBase variant="text" />
                <SkeletonBase variant="text" />
                <SkeletonBase variant="text" />
            </Box>
        </Stack>
    );
}
