/* ================================================
   IMANE HADI - Artiste Peintre
   Fichier : script.js
   JavaScript simple pour débutant
   ================================================ */


/* ─────────────────────────────
   1. MENU HAMBURGER (mobile)
   ───────────────────────────── */
var hamburger = document.querySelector('.hamburger');
var navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}


/* ─────────────────────────────
   2. NAVBAR - Change couleur au scroll
   ───────────────────────────── */
var navbar  = document.querySelector('.navbar');
var btnHaut = document.getElementById('back-top');

window.addEventListener('scroll', function() {

  if (navbar) {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (btnHaut) {
    if (window.scrollY > 400) {
      btnHaut.style.opacity    = '1';
      btnHaut.style.visibility = 'visible';
    } else {
      btnHaut.style.opacity    = '0';
      btnHaut.style.visibility = 'hidden';
    }
  }

});


/* ─────────────────────────────
   3. BOUTON RETOUR EN HAUT
   ───────────────────────────── */
if (btnHaut) {
  btnHaut.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}




/* ─────────────────────────────
   5. FILTRES GALERIE
   Afficher/Cacher par catégorie
   ───────────────────────────── */
var btnFiltres = document.querySelectorAll('.btn-filtre');
var oeuvres    = document.querySelectorAll('.item-galerie');

for (var i = 0; i < btnFiltres.length; i++) {
  btnFiltres[i].addEventListener('click', function() {

    // Retirer "actif" de tous les boutons
    for (var j = 0; j < btnFiltres.length; j++) {
      btnFiltres[j].classList.remove('actif');
    }
    this.classList.add('actif');

    var categorie = this.dataset.filtre;

    // Afficher ou masquer les œuvres
    for (var k = 0; k < oeuvres.length; k++) {
      if (categorie === 'tout' || oeuvres[k].dataset.categorie === categorie) {
        oeuvres[k].style.display = 'block';
      } else {
        oeuvres[k].style.display = 'none';
      }
    }
  });
}


/* ─────────────────────────────
   6. LIGHTBOX - Image en grand
   ───────────────────────────── */
var lightbox    = document.getElementById('lightbox');
var lbImg       = document.getElementById('lightbox-img');
var lbCaption   = document.getElementById('lightbox-caption');
var lbFermer    = document.getElementById('lightbox-close');

// Ouvrir au clic sur une œuvre
for (var i = 0; i < oeuvres.length; i++) {
  oeuvres[i].addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-acheter')) return;
    if (!lightbox) return;

    var img   = this.querySelector('img');
    var titre = this.querySelector('.galerie-titre');
    var prix  = this.querySelector('.galerie-prix');

    lbImg.src                = img   ? img.src        : '';
    lbCaption.textContent    = (titre ? titre.textContent : '') + ' — ' + (prix ? prix.textContent : '');
    lightbox.style.display   = 'flex';
    document.body.style.overflow = 'hidden';
  });
}

// Fermer la lightbox
function fermer() {
  if (lightbox) {
    lightbox.style.display   = 'none';
    document.body.style.overflow = '';
  }
}

if (lbFermer) lbFermer.addEventListener('click', fermer);
if (lightbox)  lightbox.addEventListener('click', function(e) { if (e.target === lightbox) fermer(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') fermer(); });


/* ─────────────────────────────
   7. SIMULATEUR DE PRIX
   ───────────────────────────── */
var simType    = document.getElementById('sim-type');
var simTaille  = document.getElementById('sim-taille');
var simSupport = document.getElementById('sim-support');
var simPrix    = document.getElementById('sim-prix');
var simLbl     = document.getElementById('sim-taille-lbl');
var simDesc    = document.getElementById('sim-desc');

var prixBase = { portrait: 2500, paysage: 1800, abstrait: 2000, floral: 1500, calligraphie: 1200 };
var coeffSup = { toile: 1.0, lin: 1.2, bois: 0.95, papier: 0.65 };

function calculerPrix() {
  if (!simType || !simTaille || !simSupport) return;
  var t  = parseInt(simTaille.value);
  var p  = Math.round((prixBase[simType.value] + t * 15) * coeffSup[simSupport.value] / 50) * 50;
  if (simPrix) simPrix.textContent = p.toLocaleString('fr-MA') + ' DH';
  if (simLbl)  simLbl.textContent  = t + ' × ' + t + ' cm';
  if (simDesc) simDesc.textContent = 'Estimation indicative — devis gratuit sur demande.';
}

if (simType)    simType.addEventListener('change', calculerPrix);
if (simTaille)  simTaille.addEventListener('input', calculerPrix);
if (simSupport) simSupport.addEventListener('change', calculerPrix);
calculerPrix();


/* ─────────────────────────────
   8. FORMULAIRE DE CONTACT
   ───────────────────────────── */
var form = document.getElementById('form-contact');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var nom     = document.getElementById('nom').value.trim();
    var email   = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (!nom || !email || !message) {
      alert('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }

    alert('Merci ' + nom + ' ! Votre message a été envoyé avec succès.');
    form.reset();
  });
}


/* ─────────────────────────────
   9. CURSEUR BUDGET
   ───────────────────────────── */
var budget        = document.getElementById('budget');
var budgetAffiche = document.getElementById('budget-affichage');

if (budget && budgetAffiche) {
  budgetAffiche.textContent = parseInt(budget.value).toLocaleString('fr-MA') + ' DH';
  budget.addEventListener('input', function() {
    budgetAffiche.textContent = parseInt(this.value).toLocaleString('fr-MA') + ' DH';
  });
}


/* ─────────────────────────────
   10. BOUTON ACHETER
   ───────────────────────────── */
var boutonsAcheter = document.querySelectorAll('.btn-acheter');

for (var i = 0; i < boutonsAcheter.length; i++) {
  boutonsAcheter[i].addEventListener('click', function(e) {
    e.stopPropagation();
    var nom = this.closest('.item-galerie').querySelector('.galerie-titre').textContent;
    alert('Pour acquérir "' + nom + '", contactez Imane au +212 649 705 858.');
  });
}
