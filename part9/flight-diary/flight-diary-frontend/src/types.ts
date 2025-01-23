export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }
  
  export interface DiaryEntry {
    id: number;
    date: string;
    weather: string;
    visibility: string;
    comment?: string;
  }
  export interface EntryFormProps {
    addEntry: (entry: DiaryEntry) => void;
  }

  export type NewEntry = Omit<DiaryEntry, 'id'>