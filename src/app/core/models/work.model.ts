import { PartialDate } from "./partial-date.type"
import { SessionMedia } from "./session-media.model"

export interface Work {
  id: number,
  title: string,
  titleAlias?: string[],
  type: string,
  licenses?: string[],
  artists?: string[],
  publishers?: string[],
  genres?: string[],

  releaseDate?: PartialDate,

  lastSessionDate?: PartialDate,
  moods?: string[]

  sessions? : SessionMedia[]
}
