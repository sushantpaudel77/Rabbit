const updateFields = (document, updates, allowedFields = null) => {
  const fieldsToUpdate = allowedFields || Object.keys(updates);

  fieldsToUpdate.forEach((field) => {
    if (updates[field] !== undefined) {
      document[field] = updates[field];
    }
  });

  return document;
};

module.exports = { updateFields };
