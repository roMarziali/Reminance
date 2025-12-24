import { SessionMedia } from "./session-media.model"
import { SessionDate } from "./session-date.type"
export interface Work {
  id: number,
  title: string,
  titleAlias?: string[],
  type: string,

  licenses: string[],
  artists: string[],
  publishers: string[],
  genres: string[],

  releaseYear?: number,
  lastSessionDate?: SessionDate,

  sessions: SessionMedia[]

}
