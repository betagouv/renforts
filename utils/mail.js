const contactEmail =
  process.env.contactEmail || "echanges-de-competences@beta.gouv.fr"

exports.makeMailto = (subject = "", body = "", titi) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
