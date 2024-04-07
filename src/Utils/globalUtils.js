const _toYear = new Date().getFullYear();
const _fromYear = _toYear - 300;

export const getYearsList = (fromYear = _fromYear, toYear = _toYear) => {
    const list = [];
    for (let x = toYear; x >= fromYear; x--) {
        list.push(x);
    }
    return list;
};