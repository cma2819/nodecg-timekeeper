export class Time {

  readonly display: string;
  readonly rawInSecond: number;

  private constructor(rawInSecond: number) {
    this.rawInSecond = rawInSecond;

    const absRawInSecond = Math.abs(rawInSecond);
    const hours = Math.floor(absRawInSecond / 3600);
    const minutes = Math.floor((absRawInSecond % 3600) / 60);
    const seconds = Math.floor(absRawInSecond % 60);

    const display = ((rawInSecond < 0) ? '-' : '')
      + ((hours > 0) ? hours.toString().padStart(2, ('0')) + ':' : '')
      + `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    this.display = display;
  }

  public static make = (seconds: number): Time => {
    return new this(seconds);
  }
}