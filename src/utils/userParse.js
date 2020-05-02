const userParse = object => {
  if (object === undefined) return {};
  return {
    _id: object._id,
    name: object.name,
  };
};

export default userParse;
