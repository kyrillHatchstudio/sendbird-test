
interface WQResultItem {
  score: number;
  futureAnswerSum: number;
  futureScore: number;
  answerCount: number;
  answerSum: number;
  weightSum: number;
}

export type Determinant = {
  [ aspectId: string ]: WQResultItem } &
  { overall: WQResultItem }

export type WQResult =
  { [ detId: string ]: Determinant | WQResultItem } &
  { overall: WQResultItem }
