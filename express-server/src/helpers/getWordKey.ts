const getWordKey = (prefix: string) => {
    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${prefix}-${month}/${day}/${year}`;
    return key;
  };

module.exports = getWordKey;