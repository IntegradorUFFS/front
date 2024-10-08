function mappedArray(
  array: any[],
  pKey: string = "id",
  transform: ((params: any) => any) | null = null
) {
  try {
    return array.reduce((obj, item) => {
      obj[String(item[pKey])] = transform ? transform(item) : item;
      return obj;
    }, {});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}

export default mappedArray;
