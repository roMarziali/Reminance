import { PartialDate } from "./partial-date.type"
export interface SessionMedia {
  date: PartialDate,
  moods: string[],
  comment: string,
  modalities?: string,
  ended?: string

}
