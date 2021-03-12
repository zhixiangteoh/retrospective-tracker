const stubList = {
  greenItems: [
    {
      id: Math.random()
        .toString(16)
        .substr(2),
      body: "0",
    },
    {
      id: Math.random()
        .toString(16)
        .substr(2),
      body: "1",
    },
  ],
  yellowItems: [
    {
      id: Math.random()
        .toString(16)
        .substr(2),
      body: "2",
    },
    {
      id: Math.random()
        .toString(16)
        .substr(2),
      body: "3",
    },
  ],
  redItems: [
    {
      id: Math.random()
        .toString(16)
        .substr(2),
      body: "4",
    },
    {
      id: Math.random()
        .toString(16)
        .substr(2),
      body: "5",
    },
  ],
};

const getStubList = () => {
  return stubList;
};

export default getStubList;
