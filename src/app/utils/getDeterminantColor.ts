import { DeterminantColors } from './determinant-colors.model'

export const getDeterminantColor = (determinantName: string) => {
    return DeterminantColors[determinantName];
}
