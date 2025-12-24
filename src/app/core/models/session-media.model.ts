import { SessionDate } from "./session-date.type"
export interface SessionMedia {
  date: SessionDate,
  moods: string[],
  comment: string,
  modalities?: string,
  ended?: string

}
