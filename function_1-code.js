exports.handler = async (event) => {
  // TODO implement
  throw new Error('Error premeditado #1')
  const response = {
      statusCode: 200,
      body: JSON.stringify(event),
  };
  return response;
};
