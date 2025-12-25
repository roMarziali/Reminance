import { PartialDate } from "./partial-date.type"
export interface SessionMedia {
  id: number,
  date: PartialDate,
  moods: string[],
  comment: string,
  modalities?: string,
  ended: "Y" | "N" | "Ongoing",
  endedPrecision?: string

}
