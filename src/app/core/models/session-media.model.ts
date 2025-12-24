export interface SessionMedia {
  startDate: SessionDate,
  endDate: SessionDate,
  moods: string[],
  comment: string,
  modalities?: string,
  ended? : string

}

export type SessionDate = | `${number}`
  | `${number}-${number}`
  | `${number}-${number}-${number}`;
