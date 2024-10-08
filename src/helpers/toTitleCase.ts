function toTitleCase(str: string): string {
  return str
    .replace(/_/g, " ")
    .replace(/[a-zA-Z\u00C0-\u00FF]\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export default toTitleCase;
