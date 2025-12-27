import { PartialDate } from "./partial-date.type"
export interface SessionMedia {
  id: number,
  date: PartialDate,
  modalities?: string,
  comment: string,
  moods: string[],
  ended: "Y" | "N" | "Ongoing",
  endedPrecision?: string
}
