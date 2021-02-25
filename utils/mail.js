const contactEmail =
  process.env.contactEmail || "contact@volontaires.fonction-publique.gouv.fr"

exports.contactEmail = contactEmail

const contactCNAVEmail =
  process.env.contactEmail || "candidatureappelsortantassures@cnav.fr"

exports.contactCNAVEmail = contactCNAVEmail

const contactCPAMEmail =
  process.env.contactCPAMEmail || "contact-cpam@volontaires.fonction-publique.gouv.fr"

exports.contactCPAMEmail = contactCPAMEmail

exports.makeMailto = (contactEmail = "", subject = "", body = "") =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
