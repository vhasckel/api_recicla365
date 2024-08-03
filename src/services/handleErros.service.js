function handleError(response, message, error) {
  console.error(error);
  return response.status(500).json({ message, error: error.message });
}

module.exports = handleError;
