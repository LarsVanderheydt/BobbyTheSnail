export const getFilteredDataBetween = (data, startDate, endDate) => {

  const returnData = [];
  const checkStartDate = new Date(startDate);
  const checkEndDate = new Date(endDate);

  if (!data) {
    return returnData;
  } else {

    if (!startDate && !endDate) {
      return data;

    } else if (startDate && !endDate) {
      for (let i = 0;i < data.length;i ++) {
        const givenDate = new Date(data[i].created);
        if (givenDate >= checkStartDate) {
          returnData.push(data[i]);
        }
      }
      return returnData;
    } else if (!startDate && endDate) {
      for (let i = 0;i < data.length;i ++) {
        const givenDate = new Date(data[i].created);
        if (givenDate < checkEndDate) {
          returnData.push(data[i]);
        }
      }
      return returnData;

    } else if (startDate && endDate) {
      for (let i = 0;i < data.length;i ++) {
        const givenDate = new Date(data[i].created);
        if (givenDate <= checkEndDate && givenDate >= checkStartDate) {
          returnData.push(data[i]);
        }
      }
      return returnData;
    }
  }
};
