import { ITipoConsejo } from "./ITipoConsejo";

export interface IConsejo {
  id: number;
  nombre: string;
  fecha: string;
  estado: boolean;
  tipo_consejo: number | ITipoConsejo;
  acta: IActa | null;
}

export interface IConsejoForm {
  id: number;
  tipo_consejo: number;
  nombre: string;
  fecha: Date;
}

export interface IActa {
  id: number;
  batch: string;
  outputPath: string;
  consejo_id: number;
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
