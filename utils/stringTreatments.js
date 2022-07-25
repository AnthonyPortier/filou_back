export const removeAllExeptNumbers = (text)=>{
    return text && text.replace(/(^\d+\.\d+)(.+$)/i, "$1");
}

export const get2Decimals =(number) => {
  return Number.parseFloat(number).toFixed(2);
}