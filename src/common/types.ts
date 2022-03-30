export interface EOTStatus {
  unitId: number,
  brakePipePressure: number,
  motion: boolean,
  timestamp: Date
}

export interface Train {
  eotStatus: EOTStatus,
  defects: []
}
