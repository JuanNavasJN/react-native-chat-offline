const userParse = object => {
  return {
    _id: object._id,
    name: object.name,
  };
};

export default userParse;
