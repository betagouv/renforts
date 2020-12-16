const express = require("express")
const path = require("path")

require("dotenv").config()

const { contactEmail, makeMailto } = require("./utils/mail")

const appName = "volontaires.fonction-publique.gouv.fr"

const appDescription =
  "Mise à disposition d'agents publics pour renforcer des équipes pendant la crise sanitaire"
const appRepo = "https://github.com/betagouv/renforts"
const port = process.env.PORT || 8080

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use("/static", express.static("static"))
// Hack for importing css from npm package
app.use("/~", express.static(path.join(__dirname, "node_modules")))
// Populate some variables for all views
app.use(function (req, res, next) {
  res.locals.appName = appName
  res.locals.appDescription = appDescription
  res.locals.appRepo = appRepo
  res.locals.contactEmail = contactEmail
  next()
})

app.get("/", (req, res) => {
  res.render("landing", {
    makeMailto,
  })
})

app.get("/mission-cpam", (req, res) => {
  const missionTitle = "Conseiller contact tracing"
  const subject = `Je postule à la mission ${missionTitle}`
  const body = `Bonjour,

Je suis intéressé.e par la mission de ${missionTitle}. Pourriez-vous m'en dire plus ?

[Des questions ? Vous voulez vous présenter ? Ecrivez ce que vous voulez !]

Bonne journée,
`
  const applyLink = makeMailto(subject, body)

  res.render("mission-CPAM", {
    withApplyButton: true,
    missionTitle,
    applyLink,
    makeMailto,
  })
})

app.get("/mission-CNAV", (req, res) => {
  const missionTitle = "Conseiller maintien du lien social"
  const subject = `Je postule à la mission ${missionTitle}`
  const body = `Bonjour,

Je suis intéressé.e par la mission de ${missionTitle}. Pourriez-vous m'en dire plus ?

[Des questions ? Vous voulez vous présenter ? Ecrivez ce que vous voulez !]

Bonne journée,
`
  const applyLink = makeMailto(subject, body)

  res.render("mission-CNAV", {
    withApplyButton: true,
    missionTitle,
    applyLink,
    makeMailto,
  })
})

app.get("/mentions-legales", (req, res) => {
  res.render("legalNotice", {
    makeMailto,
  })
})

module.exports = app.listen(port, () => {
  console.log(`${appName} listening at http://localhost:${port}`)
})
