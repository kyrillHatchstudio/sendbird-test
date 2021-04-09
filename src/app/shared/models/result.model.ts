import { WQResult } from './wq-result.model';

export interface Result {
  answerCount: number;
  startDate: Date;
  endDate: Date;
  result: Partial<WQResult>;
}
