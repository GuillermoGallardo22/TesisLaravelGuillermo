import Typography from "@mui/material/Typography";
import Icon from "./Icon";

type BooleanCellProps = {
  value: boolean;
};
const BooleanCell: React.FunctionComponent<BooleanCellProps> = ({ value }) => {
  return value ? (
    <Typography color={"green"}>
      <Icon icon="check" />
    </Typography>
  ) : (
    <Typography color={"gray"}>
      <Icon icon="close" />
    </Typography>
  );
};

export default BooleanCell;
