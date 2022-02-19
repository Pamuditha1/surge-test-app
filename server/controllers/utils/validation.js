exports.validate = (body, schema) => {
  const result = schema.validate(body);
  return result.error;
};
