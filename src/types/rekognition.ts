export interface Label {
    Name: string;
    Confidence: number;
  }
  
  export interface AnalysisResult {
    labels: Label[];
  }  