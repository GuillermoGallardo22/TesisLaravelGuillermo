import { useParams } from "react-router-dom";

const DriveTemplate = () => {
    const { driveId = "" } = useParams<{ driveId: string }>();

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe
                width="100%"
                height="750px"
                src={`https://docs.google.com/document/d/${driveId}/edit?embedded=true`}
                allowFullScreen
            />
        </div>
    );
};

export default DriveTemplate;
