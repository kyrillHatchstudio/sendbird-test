
interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecommendedService {
  answerCount: number;
  answerSum: number;
  score: number;
  aspect: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  },
  determinant: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  },
  services: Service[];
}
