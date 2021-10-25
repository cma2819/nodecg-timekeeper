export class Time {

  readonly display: string;
  readonly rawInSecond: number;

  private constructor(rawInSecond: number) {
    this.rawInSecond = rawInSecond;
    
    const hours = Math.floor(rawInSecond / 3600);
    const minutes = Math.floor((rawInSecond % 3600) / 60);
    const seconds = Math.floor(rawInSecond % 60);

    const display = ((hours > 0) ? hours.toString().padStart(2, ('0')) + ':' : '')
      + `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    this.display = display;
  }

  public static make = (seconds: number): Time => {
    return new this(seconds);
  }
}