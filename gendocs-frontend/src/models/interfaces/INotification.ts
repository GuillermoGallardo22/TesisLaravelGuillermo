import { ConfirmationDialogReturnProps } from "hooks/useConfirmationDialog";
import { IConsejo } from "./IConsejo";
import { IMiembro } from "./IConsejoMiembro";

export interface INotificationProps {
  [key: string]: string | number;
}

export type NotificationEmailFormProps = {
  mensaje: string;
};

export type NotificationEmailProps<T> = Pick<
  ConfirmationDialogReturnProps<T>,
  "isVisible" | "closeModal"
> & {
  miembros: IMiembro[];
  consejo: IConsejo;
};
