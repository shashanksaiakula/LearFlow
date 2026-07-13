export interface Lesson{
    id : number,
    title : string,
    duration : string,
    completed : boolean,
    videoLink : string,
    thumbnail : string
    videoType: VideoType;
}

export type VideoType =
  | 'youtube'
  | 'video';

