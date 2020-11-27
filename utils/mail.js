const contactEmail =
  process.env.contactEmail || "contact@volontaires.fonction-publique.gouv.fr"

exports.contactEmail = contactEmail

exports.makeMailto = (subject = "", body = "") =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
