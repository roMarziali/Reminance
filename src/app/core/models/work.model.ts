import { PartialDate } from "./partial-date.type"
import { SessionMedia } from "./session-media.model"

export interface Work {
  id: number,
  title: string,
  titleAlias?: string[],
  type: string[], // le tableau ne comprendra normalement qu'une valeur. Choix fait pour que le titre puisse être traité en chip comme les autres string[]
  licenses?: string[],
  artists?: string[],
  publishers?: string[],
  genres?: string[],
  countries?: string[],

  releaseDate?: PartialDate,

  lastSessionDate?: PartialDate,
  moods?: string[]

  sessions?: SessionMedia[]
  expanded?: boolean
}
