import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

interface IBatch {
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

export async function getBatch(batchId: string): Promise<IResponse<IBatch>> {
  try {
    const { data } = await axios.get(`batch/${batchId}`);

    return {
      data,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
