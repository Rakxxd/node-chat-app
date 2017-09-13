var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdA: new Date().getTime()
  };
};

module.exports = {generateMessage};
