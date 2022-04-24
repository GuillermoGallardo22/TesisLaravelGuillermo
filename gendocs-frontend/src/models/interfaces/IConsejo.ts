import { ITipoConsejo } from "./ITipoConsejo";

export interface IConsejo {
  id: number;
  nombre: string;
  fecha: string;
  estado: boolean;
  tipo_consejo: number | ITipoConsejo;
  acta: IConsejoActa | null;
}

interface IConsejoActa extends Omit<IActa, "batch" | "drive"> {
  batch: string;
}

export interface IConsejoForm {
  id: number;
  tipo_consejo: number;
  nombre: string;
  fecha: Date;
}

export interface IActa {
  id: number;
  batch: IBatch;
  outputPath: string;
  consejo_id: number;
  drive: string | null;
}

export interface IBatch {
  id: string;
  name: string;
  totalJobs: number;
  pendingJobs: number;
  processedJobs: number;
  progress: number;
  failedJobs: number;
  options: any[];
  createdAt: string;
  cancelledAt?: any;
  finishedAt?: any;
}
