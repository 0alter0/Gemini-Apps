export interface SimplifiedResult {
  original: string;
  simplified: string;
  removedWordsCount: number;
  stats: {
    originalLength: number;
    simplifiedLength: number;
    percentReduced: number;
  };
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}