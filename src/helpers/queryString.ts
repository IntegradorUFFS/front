class QueryString {
  stringify(data: Record<string, any>): string {
    const queryArray: string[] = [];
    for (const key in data) {
      if (data[key] === undefined) continue;

      queryArray.push(`${key}=${encodeURIComponent(data[key])}`);
    }

    return queryArray.join("&");
  }
}

export default new QueryString();
