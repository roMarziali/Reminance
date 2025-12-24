import { SessionMedia } from "./session-media.model"

export interface Work{
  id : number,
  title : string,
  titleAlias? : string[],
  type : string,

  licenses: string[],
  artists : string[],
  publishers: string[],
  genres: string[],

  releaseYear?:number,

  sessions: SessionMedia[]

}
