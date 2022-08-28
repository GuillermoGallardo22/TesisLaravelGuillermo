export interface IProvincia {
  id: number;
  nombre: string;
}

export interface ICanton {
  id: number;
  nombre: string;
  provincia: IProvincia;
}
