import { SessionDate } from "./session-date.type"
export interface WorkSummary {
  id: number,
  title: string,
  type: string,
  licenses: string[],
  artists: string[],
  publishers: string[],
  genres: string[],

  releaseYear?: number,
  lastSessionDate?: SessionDate,
  moods?: string[]
}
