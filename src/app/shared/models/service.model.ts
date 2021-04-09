export interface Service {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    covers: {
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
    }
}
