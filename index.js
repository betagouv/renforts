const express = require("express")
const path = require("path")

const yaml = require('js-yaml');
const fs = require("fs")

const content = yaml.load(fs.readFileSync('./data/missions.yaml', 'utf8'))

require("dotenv").config()

const { contactEmail, contactCNAVEmail, contactCPAMEmail, makeMailto } = require("./utils/mail")

const appName = "volontaires.fonction-publique.gouv.fr"

const appDescription =
  "Mise à disposition d'agents publics pour renforcer des équipes pendant la crise sanitaire"
const appRepo = "https://github.com/betagouv/renforts"
const port = process.env.PORT || 8080

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use("/static", express.static("static"))
app.use("/documents", express.static("documents"))
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

function getRandomItem(items) {
  var randomIndex = Math.floor(Math.random() * items.length);
  var item = items.splice(randomIndex, 1);
  return item[0];
};

app.get("/", (req, res) => {
  /*const keys = Object.keys(content.offres)
  const randIndex = Math.floor(Math.random() * keys.length)
  const randKey = keys[randIndex]
  const offre = content.offres[randKey]*/
  let offres = []
  let targetOffres = []
  const returnedTarget = Object.assign(targetOffres, content.offres);

  const offre1 = getRandomItem(returnedTarget);
  offres.push(offre1)
  const offre2 = getRandomItem(returnedTarget);
  offres.push(offre2)
  const offre3 = getRandomItem(returnedTarget);
  offres.push(offre3);

  // console.log(offre.id);
  res.render("landing", {
    makeMailto, offres
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
  const applyLink = process.env.APPLY_URL_CPAM
    ? process.env.APPLY_URL_CPAM
    : makeMailto(contactCPAMEmail, subject, body)

  res.render("mission-CPAM", {
    withApplyButton: true,
    missionTitle,
    applyLink,
    contactCPAMEmail,
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
  const applyLink = process.env.APPLY_URL_CNAV
    ? process.env.APPLY_URL_CNAV
    : makeMailto(contactCNAVEmail, subject, body)

  res.render("mission-CNAV", {
    withApplyButton: true,
    missionTitle,
    applyLink,
    makeMailto,
  })
})

app.get("/missions/:id", (req, res) => {
  const missionTitle = "Missions santé"
  const subject = `Je postule à la mission ${missionTitle}`
  const body = `Bonjour,

Je suis intéressé.e par la mission de ${missionTitle}. Pourriez-vous m'en dire plus ?

[Des questions ? Vous voulez vous présenter ? Ecrivez ce que vous voulez !]

Bonne journée,
`
  let offre = null;
  let url = null;

  //content.offres.forEach(function (_offre) {
  for (let i = 0; i < content.offres.length; i++) {

    _offre = content.offres[i];

    if (_offre.id == req.params.id) {
      offre = _offre;
      url = _offre.urlPostuler;
      break;
      /*
      if (_offre.categorie === 'sante') {
        url = process.env.APPLY_URL_SANTE;
      } else if (_offre.categorie === 'ars') {
        url = process.env.APPLY_URL_ARS;
      }*/

    }

  };

  const applyLink = url
    ? url
    : makeMailto(subject, body)

  if (offre !== null) {
    console.log(offre.id);
  } else { console.log('offre is null') }

  res.render("mission-sante", {
    withApplyButton: true,
    missionTitle,
    applyLink,
    makeMailto,
    offre
  })





})

app.get("/autres-missions", (req, res) => {
  res.render("autres-missions", { contactEmail, makeMailto })
});

app.get("/mentions-legales", (req, res) => {
  res.render("legalNotice", {
    contactEmail,
    makeMailto,
  })
})

app.get("/faq", (req, res) => {
  res.render("faq", {
    contactEmail,
    makeMailto,
  })
})

module.exports = app.listen(port, () => {
  console.log(`${appName} listening at http://localhost:${port}`)
})
