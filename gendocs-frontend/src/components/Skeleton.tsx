import { Box, Skeleton as SkeletonBase, Stack } from "@mui/material";

export function Skeleton() {
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
