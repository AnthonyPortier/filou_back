
export const findInfosInsideIdentity = async (data) => {
  const filterInfo = data.filter((text) => text.includes("P<FRA"));
  const info = filterInfo.map((text) => {
    const name = text.match(/P<FRA(.*?)</i)[1];
    const firstName = text.match(/<<(.*?)</i)[1];
    return { name, firstName };
  });
  let uniq = {};
  const infoFiltered = info.filter((obj) => !uniq[obj] && (uniq[obj] = true));

  return { ...infoFiltered[0] };
};
