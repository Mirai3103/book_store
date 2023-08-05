export function randomUniqueString(): string {
  return Math.random().toString(36).substring(2);
}

export class QueryParamsBuilder {
  private params: string[] = [];

  public addParam(
    key: string,
    value: string | null | number | undefined
  ): QueryParamsBuilder {
    if (value) {
      this.params.push(`${key}=${value}`);
    }
    return this;
  }

  public build(): string {
    return this.params.join('&');
  }
}
