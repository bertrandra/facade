# Journal des modifications

Format [Keep a Changelog 1.1](https://keepachangelog.com/fr/1.1.0/). Les versions les plus récentes en premier. Jusqu'au 10 novembre 2026
l'historique est celui de [Plan](https://github.com/bertrandra/plan) (`outils/facade/`, PR 656).

## [0.1.0] — 2026-11-10

Première version du dépôt : `facade.html` déplacé de Plan, sources dans `src/`, banc dans `banc/`.

### Ajouté

- **`facade.html` : façade redressée, page autonome pour mobile.** Un fichier seul, sans réseau ni
  serveur, et **sans aucune saisie** : on prend ses photos (une, ou plusieurs de gauche à droite),
  la page lit l'objectif dans l'EXIF (grand-angle 0,5× compris ; à défaut, elle l'estime par les
  points de fuite), trouve les verticales et les horizontales de la façade, redresse chaque photo,
  assemble les photos par points homologues et rend le résultat à la résolution des photos (bornée
  à 16 Mpx, limite d'un canevas iOS) ; JPEG, PNG ou partage vers Photos. Elle embarque `src/facade/`
  (EXIF, focale) **sans le modifier** ; le redressement automatique et la fusion sont dans
  `outils/facade/` (`node outils/facade/construire.mjs`, `--verifier` pour le banc synthétique).
  L'application n'est pas touchée.
  Ensuite : la photo s'affiche dès qu'elle est prise ; ordre des photos au doigt ; photos gardées
  sur l'appareil si la page se recharge ; « Ajuster » (coins posés à la main, autre façade d'une
  photo d'angle) ; coutures qui suivent les zones semblables (plus de saillie en double) ;
  assemblage en hauteur ; correction de la distorsion des grands-angles non corrigés ; échelle
  facultative, mesures et barre d'échelle ; calcul en arrière-plan ; journal copiable ; repérage
  facultatif des fenêtres et portes, avec cotes (hors tout de la menuiserie), corrections au doigt
  (le sol, donc les hauteurs d'appui, suit une porte déclarée, recadrée ou retirée à la main) et
  export CSV : trois détecteurs indépendants et un vote, départagés sur un banc de façades annotées
  (`outils/facade/banc/`). Les quatre fichiers ont été relus, vérifiés et corrigés un par un, et le
  vote réécrit (accord par recouvrement, réunion des parties d'une baie, filtre de ce qui est posé
  au sol, sol situé par la porte) : 0,87 sur 1 sur 221 images contre 0,81 pour le premier vote et
  0,34 pour le premier détecteur ; sur la façade de référence, 9 ouvertures sur 9, plus de fausse
  baie dans la balustrade, porte et porte-fenêtre entières, baie vitrée avec ses impostes. Le vote
  a été relu et contrôlé à son tour : sol non annoncé quand le résultat le contredit, temps borné,
  entrées mal formées tolérées ; sur l'élévation que la page tire de trois photos, 36 fausses baies
  → 5 sur treize variantes. Le banc mesure maintenant sur 221 images (boîtes rangées, vote rejoué).
  Le test complet est gardé pour être rejoué ou étendu à un nouveau jeu d'images : méthode, règles de
  décision et résultats de référence dans `outils/facade/banc/PROTOCOLE.md`, annotations des jeux et
  scripts qui les remontent au bit près, résultats image par image (`banc/resultats/`).

### Corrigé

- **Fumée : les points 61 et 114 attendent leur toast, l'installation de Chromium ne bloque plus une tâche.** La fumée de la nuit
  (run 42761089682, main 5a2c9be2) : **61** rouge au bureau en sombre (« toast NON ») et **114** au bureau en clair (toast vide, le cas
  pourtant créé). Les deux lisaient leur toast d'un coup, sans l'attendre : le 61 comptait « Capture terminée » après le clic, qui ne
  revient qu'une fois l'écran des propositions bâti (6,4 s sous un processeur ralenti six fois, quand le toast, paru à 0,8 s, s'efface à
  6,5 s) ; le 114 lisait le sien dès que le serveur simulé avait reçu le cas, avant que la page n'ait sa réponse (avec une réponse
  retardée de 1,5 s, rien ; puis le toast). Ils notent les toasts avant le geste et attendent le leur, au même texte exigé.
  Deux tâches (compact et moyen, clair) n'ont joué aucun point : `apt-get`, pour les dépendances de Chromium, a attendu 2 h 30 un miroir
  d'Ubuntu muet, jusqu'au délai de la tâche. L'installation est maintenant bornée à cinq minutes par essai, reprise trois fois, dans la
  fumée de la nuit comme dans la CI. Aucun défaut de l'application.
- **Fumée : le point 114 suit l'import de photos de la calibration.** Il exigeait un écran de calibration sans aucun champ photo (lot F6),
  règle changée par le propriétaire le 9 novembre 2026 (« Ajouter des photos », « Nouveau cas depuis des photos », #647) : la fumée de la
  nuit (run 42722898224) l'a vu rouge dans les trois classes et les deux thèmes, seul échec. Il vérifie maintenant ce qui reste vrai : la
  calibration n'ouvre jamais la caméra et n'importe que des images, sur la liste des cas comme dans le cas ouvert. Le point 156 (Mode Toit,
  redimensionnement) passe en Économe comme les 142 à 144 : au bureau, sans carte graphique, il approchait son délai (314 s sur 400) sans
  rien vérifier du rendu.

## [5.22.1] — 2026-11-09

Version **corrective** au sens de `MD/RELEASE.md` : en Mode Toit, un mur posé sur une ligne y reste et un corps voisin l'arrête (#652) ;
en calibration, la vérité de l'É7 ne reste plus en attente pour toujours, le refus d'un import se lit, un seul pincement de la façade est
branché à la fois, une poignée ramenée hors de deux obstacles qui se touchent n'entre plus dans l'un d'eux (#651). Rien que des
corrections, sans fonction nouvelle : PATCH (§2.1, « Bug fix with no change to computed values or exported bytes »). Aucune quantité ni
aucun export de la démonstration ne change, les sept témoins ne bougent qu'à leur numéro de version (la date de build reste le
30 octobre 2026 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (16), aucun champ de fichier
nouveau. Le schéma 16 de la 5.19.0 reste à accepter en production : appliquer bertrandra/backprod#255 (migration
`Version20261109090000`) puis `setup.php` **avant** de déposer cette livraison de Plan, si ce n'est pas déjà fait. Requêtes vérifiées sans
la mesure sur main (run 42725702158 : 9 sur 9, 0,031 $ ; prompts et schémas inchangés).

### Corrigé

- **Mode Toit : un mur posé sur une ligne y reste** (second audit du 9 novembre 2026, régression de la 5.21.0). Depuis qu'un pas de 5 cm
  compte à partir du tracé IGN, un mur posé sur le tracé ou sur le mur d'un autre corps s'en décollait au moindre toucher : la taille du
  corps s'arrondissait aux 5 cm, et un corps lu sur l'IGN (taille au centimètre) bougeait de quelques centimètres sans qu'on le tire ; un
  corps déplacé voyait ses coins arrondis à la grille, un corps de biais se déformait ; un mur à 3 cm du tracé ne s'y collait plus.
  Désormais le **déplacement** s'arrondit aux 5 cm, pas la taille ni la place, et un geste de moins de 2,5 cm ne bouge rien ; une ligne
  à quelques centimètres reste où se coller, du côté où va le geste (une ligne derrière lui ne le ramène plus en arrière).
- **Mode Toit : un mur ne traverse plus un corps voisin qui ne se laisse pas emmener.** Le pignon d'une maison en T tiré vers l'aile en
  travers (plus longue que lui), l'aile tirée par son joint vers la maison, le mur haut d'un appentis poussé dans la maison : le mur
  passait dans l'autre corps. Il s'arrête contre lui et le dit (« Le corps voisin empêche d’aller plus loin. ») ; il s'en écarte
  toujours librement (raccourcir une aile par son joint laisse la maison en place). La fumée 156 joue les deux cas.
- **Un cas de calibration dont la vérité de l'É7 ne se reporte pas s'enregistre** (revue du 9 novembre 2026). La vérité portée par
  les photos n'attendait qu'un rejeu qui assemble : si le rejeu allait à son terme sans assemblage (les photos restantes ne
  s'assemblent pas), ou si toutes les photos étaient retirées, « Enregistrer le cas » répondait pour toujours « Rejouez d'abord le
  cas… », même pour le nom ou le statut. Un rejeu mené à son terme sans assemblage la perd maintenant et le dit (« La vérité de l'É7
  (le mur vrai) est retirée… »), comme le retrait de la dernière photo ; un rejeu arrêté par la personne la garde pour le suivant.
  Elle ne quitte l'attente qu'avec le cas qui la porte : un rejeu qui échoue la garde et le dit, et si la mesure contre le mur
  reporté échoue, le mur reste avec le cas (`facade/photosDuCas.ts::issueDeLaVerite`). Le refus d'un import (« Illisible : … »,
  « N photos de trop ») se lit après le rejeu, à côté de son message, au lieu d'être effacé par lui ; et un fichier illisible ne prend
  plus la place d'une photo lisible qui le suit (les fichiers sont lus jusqu'à la limite du cas en photos lues).
- **Vue 3D : le pincement de la façade ne s'accumule plus sur la fenêtre** (revue du 9 novembre 2026). Chaque reconstruction de la
  Vue 3D crée un canevas, et le pincement du mode Toit branchait sur la fenêtre trois écouteurs par canevas sans jamais les retirer :
  autant de jeux que de reconstructions, chacun retenant son ancien canevas. Un seul canevas est branché à la fois, et la démolition
  de la scène le débranche (`three/pincementFacade.ts`).
- **Mode Toit : une poignée ramenée hors de deux obstacles qui se touchent ne tombe plus dans l'un d'eux.** La sortie se cherchait
  obstacle par obstacle, en une passe : sortie du premier, elle pouvait entrer dans le second, et l'inverse. Le point libre le plus
  proche se cherche alors parmi les croisements des bords (`facade/modeToit/poigneesLibres.ts`) ; avec un seul obstacle, la sortie
  est celle d'avant.

## [5.22.0] — 2026-11-09

Version **mineure** au sens de `MD/RELEASE.md` : la séquence des photos d'un cas de calibration se reprend (ajouter, retirer, ordonner,
#646) ; un nouveau cas de calibration se crée depuis des photos importées, et la vérité de l'É7 se reporte quand la séquence change
(#647) ; en Mode Toit, six défauts relevés par l'audit des gestes sont corrigés (#645), un pincement sur une poignée zoome et une poignée
ne se pose plus sous ce qui flotte (#648) ; une annulation ne fait plus de travail inutile, la Vue 3D ne se rebâtit qu'une fois, le trait
du retrait suit le mode corps, un mur photographié au rez-de-chaussée en retrait ne reçoit plus de fenêtres automatiques (#644). Des
fonctions nouvelles offertes par l'interface (Admin › Calibrer la détection) : MINOR (§2.1, « New feature »), pas PATCH. Aucune quantité
ni aucun export de la démonstration ne change, les sept témoins ne bougent qu'à leur numéro de version (la date de build reste le
30 octobre 2026 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (16), aucun champ de fichier
nouveau. Le schéma 16 de la 5.19.0 reste à accepter en production : appliquer bertrandra/backprod#255 (migration
`Version20261109090000`) puis `setup.php` **avant** de déposer cette livraison de Plan, si ce n'est pas déjà fait. Requêtes vérifiées sans
la mesure sur main (run 42711251965 : 9 sur 9, 0,031 $ ; prompts et schémas inchangés).

### Ajouté
- **La séquence des photos d'un cas de calibration se reprend** (demande du propriétaire, 9 novembre 2026 : « Dans calibration je peux
  uploader des photos. Supprimer, ajouter, ordonner la séquence des photos. »). À l'É2 d'un cas (Admin › Calibrer la détection) :
  « Ajouter des photos » importe des fichiers (huit photos au plus par cas, la limite du serveur), préparés comme une photo de l'audit
  (l'EXIF lu avant la réduction à 1 280 px et rangé dans son optique, sans prise de vue) ; « Avancer » et « Reculer » sous chaque
  vignette, ou la vignette glissée sur une autre à la souris, changent l'ordre (la chaîne prend les photos dans cet ordre : la première
  mesure la hauteur, l'assemblage les suit) ; « Retirer » demande confirmation. Chaque photo emporte ses repères et son mur posé à la
  main ; le mur confirmé (V1) suit un déplacement et, comme dans l'audit, est à refaire avec les ouvertures relues (V3) quand une photo
  est retirée ; la vérité de l'É7, posée sur l'assemblage, ne vaut plus (celle d'un étalon se recalcule, ses coins vrais suivent ses
  photos). Après chaque changement, le cas se rejoue en entier par le même enchaînement (`facade/photosDuCas.ts`). La calibration
  n'ouvre toujours pas de caméra : `captureAudit.test.ts` admet l'import d'images dans l'éditeur d'un cas, et lui seul hors de l'audit.
  Rien ne change pour un cas dont on ne touche pas les photos. Fumée : point 157.
- **« Nouveau cas depuis des photos »** (réponse du propriétaire, 9 novembre 2026, à la PR #646). Sur l'écran Admin › Calibrer la
  détection, des photos importées d'un fichier (huit au plus, sans caméra, préparées comme celles de l'audit, EXIF gardé) deviennent un
  cas neuf, dans l'ordre choisi ; l'éditeur s'ouvre et le rejoue. Le cas n'a pas de contexte du plan (ni gabarit, ni corps du toit, ni
  côté du contour, ni origine du repère) : il se rejoue comme un cas d'avant l'audit, mur rectangulaire face au sud, l'É10 sautée, le
  GPS de l'EXIF non projeté ; la largeur et la hauteur du mur se donnent à la main (`facade/photosDuCas.ts::casDepuisLesPhotos`). Le
  champ fichier est celui de l'éditeur (`ChampDesPhotos`) : `captureAudit.test.ts` le vérifie. Fumée : point 158.

### Modifié
- **La vérité de l'É7 d'un cas de calibration se reporte quand la séquence de ses photos change** (réponse du propriétaire,
  9 novembre 2026), au lieu d'être effacée : ses quatre coins, ramenés de l'ancien assemblage sur chaque photo qui les voit (assemblage →
  vue de face → photo), suivent leurs photos, puis se posent sur le nouvel assemblage au rejeu (`veriteSurLesPhotos`, `veriteSuivie`,
  `veriteSurLAssemblage`). Un coin que seules des photos retirées voyaient part seul, et l'écran le dit (« … sans l'égout : il ne se
  voyait que sur des photos retirées… ») ; sans ses deux bouts, la vérité est retirée et l'écran demande de la reposer. Un cas qu'on
  enregistre avant le rejeu qui la reporte est refusé (« Rejouez d'abord le cas »). La vérité d'un étalon se recalcule toujours de ses
  coins vrais. Sur les étalons 17 et 18, la vérité reportée tombe à moins de 1,5 % de la largeur du mur de celle que donnent leurs coins
  vrais sur le nouvel assemblage (`tests/unit/facade/releve/reportVerite.test.ts`). `cas.ts --verite` sert un étalon comme un cas réel
  qui porte sa vérité (point 158).

### Corrigé
- **Un Ctrl+Z ne coûte plus deux sérialisations du plan quand la Vue 3D est fermée.** Depuis #640, chaque restauration du projet
  (Ctrl+Z, « Réinitialiser tout », import, transaction refusée) comparait le plan d'avant et d'après pour la Vue 3D, même fermée : deux
  sérialisations complètes de plus. La comparaison ne se fait plus que si une Vue 3D ouverte la suit (`suitLaRestauration`). Mesuré
  sur la restauration seule (Node, sans DOM) : démo 2 (1 346 objets) 255 → 54 ms, démo 3 (4 001 objets) 382 → 97 ms ; Vue 3D ouverte,
  inchangé (le redessin objet par objet de #640 reste).
- **« Supprimer le voisinage », « Fusionner les doublons » et l'ouverture d'un projet ne rebâtissent plus la Vue 3D deux fois.** La
  restauration la rebâtissait déjà, puis la commande la rebâtissait de nouveau (trois fois pour un projet venu du cadastre). La commande,
  qui la rebâtit après ses retouches (sélection, lieu, soleil, affichage), demande une restauration sans suite (`sansSuite`) ; Vue 3D
  fermée, rien ne change.
- **Le plan ne montre plus le rez-de-chaussée en retrait d'un bâtiment dessiné hors de ses corps.** En toit simple, en volumes ou tel
  que mesuré, la Vue 3D ne pose ni le bow-window ni le recul ; le trait en tirets du plan suit maintenant la même règle.
- **Un mur photographié au rez-de-chaussée en retrait ne reçoit plus de fenêtres automatiques** quand le retrait fait tomber une
  travée d'un mur voisin : le mur reculé se reconnaît par le mur dont il vient, plus par son rang (`cotesDuPiedSurLesCotes`).
- **Mode Toit : six défauts relevés par l'audit des gestes du 9 novembre 2026 (PR #621 à #641).** Rien ne change sans le geste : aucune
  quantité ni aucun export, aucun champ de fichier (schéma 16), AE 101 identique, empreintes golden inchangées.
  - **Tirer un mur ne tourne plus le faîtage d'un corps qui en touche un autre.** Le mur commun d'un corps coupé en deux qui glisse
    rendait une moitié plus large que longue, et son faîtage tournait tout seul : le toit continu devenait deux toits croisés. Le faîtage
    ne se remet plus seul dans la longueur que pour un corps seul (il ne touche aucun autre corps, ni avant ni après le geste) dont le
    faîtage était dans la longueur ; un corps mis « dans la largeur » par « Sens du faîtage » garde ce sens. Un quatre-pans qui tourne
    ainsi garde ses croupes, à la même part du faîtage, au lieu de les perdre.
  - **Raccourcir une aile par son joint ne déplace plus la maison.** Un corps collé au mur tiré n'est emmené que s'il est posé au bout
    (son mur contre lui n'est pas plus long que le mur tiré) ; le corps principal ne l'est jamais, ni la maison sur laquelle s'appuie le
    mur haut d'un appentis qu'on tire.
  - **Le tracé IGN ne retient plus un mur qui est déjà dessus** : un pas de 5 à 25 cm le ramenait à sa place sans rien dire. Le côté
    (ou le mur d'un autre corps) sur lequel le mur est déjà n'attire plus ; il en va de même pour un corps déplacé.
  - **« Sens du faîtage · tout le toit » laisse appuyé un appentis adossé** : quand chaque corps tourne dans son rectangle, un appentis
    dont le mur haut s'appuie sur un autre corps ne tourne pas (il ne s'appuyait plus sur la maison) ; l'aide du groupe le dit.
  - **Un corps carré se retourne avec les deux boutons** : « Faîtage dans la largeur » le tournait, mais le bouton restait « dans la
    longueur » et ne le ramenait plus. Sur un carré, le sens se lit sur le plan (dans la longueur quand le faîtage est plus près de
    l'axe est-ouest), comme pour une composition carrée.
  - **Tout le toit ne tourne plus sous un bow-window glissé sous l'étage quand son mur changerait de tronçon** : le recul du
    rez-de-chaussée, sur tout le mur qui le porte, passait d'un mur de 10 m à un mur de 5 m en silence. Le groupe est grisé avec la raison.
- **Mode Toit au doigt : un pincement dont le second doigt se pose sur une poignée zoome, il ne tire plus la poignée.** Le cas inverse
  (une poignée prise, puis un second doigt) était déjà un pincement ; celui-ci tirait la poignée sous le second doigt : devant une façade
  au téléphone, la poignée « Avancer » (5.20.0) avançait le mur au lieu de rapprocher la vue (point 143 de la fumée, rouge en compact
  depuis la 5.20.0). Le doigt va à la vue (`isPrimary` faux : un doigt était déjà posé), et le pincement de la vue de façade suit les
  déplacements d'un doigt rendu à la vue depuis une poignée.
- **Mode Toit : une poignée ne se pose plus sous ce qui flotte sur la scène.** Sur tablette, la poignée d’un bout du mur, ramenée au
  bord gauche après un zoom, tombait sous le plan des façades déplié (point 143 en moyen) ; au téléphone, la poignée « Hauteur du faîte »
  d'un pignon, écartée vers le haut, tombait sous le choix Plan / 3D / Visionneuse (point 141 en compact). Ni l'une ni l'autre ne se
  prenaient. Le plan des façades et tout élément posé sur la scène qui couvre une poignée sont des obstacles de la partie libre
  (`poigneesLibres.ts`) : la poignée en sort par le bord le plus proche, à une cible tactile, un trait la relie à son point. Rien ne change
  au projet ni aux exports.
- **Fumée de la nuit, point 144 (l'orbite du mode Toit) : il dépassait son délai de 400 s au bureau** (416 à 418 s en large sombre les
  nuits du 7, 8 et 9 novembre 2026, 414 s en large clair le 8, 334 s le 9 ; run 42610777620). Ce n'est pas un défaut de l'application :
  la molette avance d'un pas fixe par cran vers le point visé, et chaque événement du pointeur n'est acquitté qu'à l'image suivante, qui
  coûte 2 à 4 s en qualité Normale sans carte graphique ; le point envoyait 100 crans et 40 déplacements du curseur sur place (166 s pour
  les 40 premiers crans, 155 s pour les 60 suivants, mesurés). Le point passe la Vue 3D en Économe (la préférence de l'appareil, comme le
  point 132 depuis #570 et le lot `ci`) et pose le curseur une fois : 164 à 169 s au bureau, les mêmes mesures (au plus près 5,5 m, au
  plus loin 92 m pour une borne de 95 m). Les points 142 et 143, du même genre et à 277 à 307 s en large sombre la même nuit, passent
  aussi en Économe : 100 à 120 s. Aucune vérification n'est retirée, le délai ne change pas ; le passage en Économe est une fonction
  commune du script (`vue3dEconome`), reprise par le point 132.

## [5.21.0] — 2026-11-09

Version **mineure** au sens de `MD/RELEASE.md` : en mode Toit, un mur commun glisse entre deux corps, deux appentis liés gardent la même
largeur, le mur s'arrête au bord d'un pignon ou d'une travée, le tracé IGN aimante, un bow-window se tire par chacun de ses bords et la vue
de dessus s'ouvre sur toute la maison (#641) ; sous un étage qui avance, la photo du relevé couvre la face avant du bow-window et la
modénature lue suit le mur reculé (#639) ; un Ctrl+Z du projet se voit dans la Vue 3D ouverte (#640, correctif). Des gestes nouveaux
offerts par l'interface : MINOR (§2.1, « New feature »), pas PATCH. Rien ne change sans le geste ni sans rez-de-chaussée en retrait : aucune
quantité ni aucun export de la démonstration ne change, les sept témoins ne bougent qu'à leur numéro de version (la date de build reste le
30 octobre 2026 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (16), aucun champ de fichier
nouveau. Le schéma 16 de la 5.19.0 reste à accepter en production : appliquer bertrandra/backprod#255 (migration
`Version20261109090000`) puis `setup.php` **avant** de déposer cette livraison de Plan, si ce n'est pas déjà fait. Requêtes vérifiées sans
la mesure sur main (run 42644762644 : 9 sur 9, 0,031 $ ; prompts et schémas inchangés).

### Modifié
- **Mode Toit : le redimensionnement d'un corps suit les réponses du propriétaire du 9 novembre 2026.** Rien ne change sans le geste :
  aucune quantité ni aucun export, aucun champ de fichier (schéma 16), AE 101 identique.
  - **Un mur commun glisse entre deux corps.** Quand deux corps partagent un mur (leurs murs se confondent sur au moins 90 % du plus
    long : un corps coupé en deux, les deux moitiés d'un toit en M), tirer ce mur le fait glisser entre eux : l'un grandit, l'autre
    rétrécit d'autant, l'emprise totale ne change pas. Une aile posée au bout (plus courte que le mur), ou un auvent adossé par son mur
    haut, est poussée comme avant. L'autre corps ne descend pas sous 2,50 m (« L'autre corps ne peut pas être plus petit que 2,50 m. »).
  - **Deux appentis liés à l'angle gardent la même largeur** : tirer la rive basse (ou le mur haut) de l'un change la largeur de l'autre,
    et l'arêtier du retour d'angle reste.
  - **Le mur s'arrête au bord d'un pignon ou d'une travée**, au lieu de les faire disparaître, et dit pourquoi (« Le pignon empêche
    d'aller plus loin : retirez-le d'abord. », sous la bulle des cotes puis en notification) ; un pignon ou une travée déjà contre le mur
    tiré le suit, raccourci jusqu'à sa taille minimale (1,40 m, 30 cm), puis le mur s'arrête.
  - **Le tracé IGN aimante** : un mur tiré se colle, à 25 cm près, au côté parallèle du contour du bâtiment, et un corps déplacé s'y
    colle par ses murs (ses coins vont aux coins du tracé). Le côté du tracé s'éclaire et la bulle dit « collé au tracé IGN ».
  - **Un bow-window se tire par chacun de ses bords**, l'autre en place, comme une galerie ou un appentis posés ; les poignées de bord
    sont nommées « Bord gauche » et « Bord droit » vues de dehors. Le champ « Largeur » de l'inspecteur garde le milieu (la position sur
    le mur) et le dit (« autour du milieu »).
  - **La vue de dessus s'ouvre sur toute la maison**, au téléphone aussi : son contour et tous ses corps (une aile qui dépasse, un
    élément posé), débords et hauteur des toits compris, au-dessus de l'indicateur « Modification » ; on zoome ensuite.
- **Sous un étage qui avance, la photo du relevé couvre la face avant du bow-window, et la modénature lue suit le mur reculé**
  (décisions 6 et 7 du propriétaire, 9 novembre 2026 ; suite de #635). Quand un bow-window est glissé sous l'étage et que le mur porte une
  photo de relevé, la part de la photo qui est devant lui se pose sur sa face avant, aux mêmes coordonnées le long de la façade (chaque
  point montre le pixel du mur qu'il cache, vu de face), du sol à son haut ; elle remplace les vitres dessinées de ces faces. Les faces
  avant sont celles qu'une photo prise de face voit, tournées de moins de 60° vers la rue : le fond, les pans coupés courants, l'arc sans
  ses bouts. Un retour d'équerre garde son dessin (couleur du mur, vitres), que la photo ne voit que par la tranche ; le bow-window reste
  sans toit propre sous l'étage (son dessus se ferme de la couleur du mur, ses murs restent sous la photo). Un
  bow-window sur une façade droite garde le dessin d'aujourd'hui. La modénature lue (soubassement, bandeaux, chaînes d'angle,
  encadrements, descentes, store) suit la même règle que la photo : sous le dessous de l'étage, sur le mur reculé ; au-dessus, au nu ;
  derrière le bow-window et à l'entrée du retrait, rien. Une chaîne d'angle ou une descente qui passe le dessous de l'étage se coupe là ;
  un bandeau à cheval sur lui reste entier au nu (il marque le plancher de l'étage). Sans rez-de-chaussée en retrait, rien ne change :
  empreintes, AE 101, banc et chaîne des façades identiques ; pas de champ nouveau dans le fichier (schéma 16). Fumée : point 153.

### Corrigé
- **Un Ctrl+Z du projet se voit dans la Vue 3D ouverte** (signalé par l'agent de la PR #635, 9 novembre 2026). L'annulation rendait la
  donnée (le plan, l'inspecteur, les résultats) mais laissait la scène 3D telle quelle : un toit validé au mode Toit, un bow-window, une
  photo de relevé, une maison déplacée restaient affichés jusqu'à ce qu'on quitte et rouvre la Vue 3D. La restauration du projet
  (`core/historique.ts`) dit maintenant quels objets elle a changés, en comparant le plan d'avant et le plan reposé objet par objet ; la
  Vue 3D ouverte repose ces seuls objets, comme le fait déjà la validation du mode Toit (un bâtiment avec ses toits, saillies, façades et
  photos, un arbre ; la pelouse de la parcelle avec un bâtiment qui bouge, apparaît ou disparaît), et se rebâtit, caméra gardée, quand le
  changement se lit ailleurs que dans leur pose (la terrasse et ses piscines, la parcelle, son relief et sa clôture, le voisinage, un
  objet isolé). Rien ne se refait quand l'annulation ne change qu'une cote. « Réinitialiser tout » en profite aussi. Les préférences
  d'affichage (Filaire, cases de l'explorateur) restent hors de l'annulation. Le point de fumée 155 joue la validation du mode Toit puis
  un déplacement, défaits la Vue 3D ouverte ; le point 153 ne rouvre plus la Vue 3D après son Ctrl+Z. Aucune quantité ni aucun export ne
  change ; AE 101 identique.

## [5.20.0] — 2026-11-09

Version **mineure** au sens de `MD/RELEASE.md` : en mode Toit, un corps se redimensionne de chaque côté, le côté opposé en place
(#636) ; la photo d'un relevé suit le rez-de-chaussée en retrait sous l'étage (#635). Un geste nouveau offert par l'interface : MINOR
(§2.1, « New feature »), pas PATCH. Rien ne change sans le geste ni sans rez-de-chaussée en retrait : aucune quantité ni aucun export de
la démonstration ne change, les sept témoins ne bougent qu'à leur numéro de version (la date de build reste le 30 octobre 2026 ; preuve
forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités, `moteur-piscine-pergola.json` et
`glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (16), aucun champ de fichier nouveau. Le schéma 16 de la 5.19.0
reste à accepter en production : appliquer bertrandra/backprod#255 (migration `Version20261109090000`) puis `setup.php` **avant** de
déposer cette livraison de Plan, si ce n'est pas déjà fait. Requêtes vérifiées sans la mesure sur main (run 42621229388 : 9 sur 9,
0,031 $ ; prompts et schémas inchangés).

### Ajouté
- **Mode Toit : un corps se redimensionne de chaque côté, le côté opposé en place** (demande du propriétaire, 9 novembre 2026 : « Les
  redimensionnements d'un corps doivent pouvoir se faire de chaque côté pour éviter de changer la taille et recaler ensuite. »). Vue de
  dessus, le corps choisi : une poignée au milieu de chacun de ses quatre murs (« Côté sud (le côté nord reste en place) »…), au lieu des
  deux d'avant (la longueur par le bout est, la largeur par le côté nord). Vue de face : les deux bouts de la façade se tirent, chacun
  l'autre restant en place, et une poignée « Avancer ou reculer la façade » la pousse vers la rue ou la rentre, le mur opposé en place ;
  la bulle des cotes dit aussi la profondeur du corps. Ce qui est posé reste à sa place dans le plan : pignons, lucarnes, fenêtres de toit
  et panneaux le long du faîtage, travées et éléments de façade (bow-window, galerie, appentis posés) sur leur mur, cheminées ; ce qui
  est sur le mur tiré le suit ; le faîtage garde sa place relative en travers. Un corps collé contre le mur tiré (une aile posée au
  bout, la moitié d'un corps coupé) est poussé avec lui : le joint reste fermé. Le mur se colle, à 25 cm près, à la ligne d'un mur
  parallèle d'un autre corps (un guide en pointillé de face). Dimension aux 5 cm, entre 2,5 et 30 m ; ce qui ne tient plus est borné au
  corps (une travée de moins de 30 cm, un pignon de moins de 1,4 m s'en vont, comme avec les autres gestes). Un glisser est un pas de
  la session (Ctrl+Z), « Valider » une étape du projet, projet modifié ; au doigt comme à la souris, les poignées se prennent dans les
  trois classes d'écran. Rien ne change sans le geste : aucun champ de fichier nouveau, empreintes et AE 101 identiques. Fumée : point 154.

### Modifié
- **La photo d'une façade suit le rez-de-chaussée en retrait** (décision du propriétaire, 9 novembre 2026 ; suite de #632, qui la laissait
  d'un seul plan). Sur un mur dont le rez-de-chaussée recule sous l'étage, la photo du relevé (ou de l'audit) se coupe en 3D au dessous de
  l'étage (2,70 m par défaut) : la bande du bas se pose sur le mur reculé, celle du haut reste au nu de la façade, aux mêmes coordonnées
  de texture (chaque point du mur montre le même pixel qu'avant, seul le plan change). Derrière le bow-window, rien : il cache ce mur et
  rien ne s'y pose ; le bow-window garde son dessin (ses murs et ses vitres), la photo ne s'y pose pas. Au bout du mur voisin, raccourci
  au pied, la bande sous l'étage est l'entrée du retrait : la photo de ce mur n'y est pas. Les ouvertures du relevé suivent la même règle
  que celles de la disposition automatique : celles du bas sur le mur reculé (volets et coffres avec elles), aucune derrière le bow-window
  ni à cheval sur le dessous de l'étage, celles de l'étage au nu. Le dessous de l'étage et ses retours restent de la couleur du mur. Sans
  rez-de-chaussée en retrait, rien ne change : empreintes, AE 101, banc et chaîne des façades identiques ; pas de champ nouveau dans le
  fichier. Fumée : point 153 (la photo de l'étalon 02, que `photos.ts` rend désormais aussi en élévation).

### Corrigé
- **Mode Toit, vue de face d'un corps choisi** : ses poignées et sa silhouette se posaient sur le mur de derrière, vu au travers (l'œil
  de la caméra de façade était lu au milieu de la scène, la caméra n'étant posée que par sa matrice) ; elles sont sur le mur regardé.
- **Mode Toit, au téléphone** : une poignée ramenée au bord gauche de la scène tombait sous le bouton du plan des façades ; elle se pose
  à sa droite.
- **Mode Toit** : la façade d'un élément de façade (bow-window, galerie, appentis posés) n'offre plus la poignée « Longueur de la
  façade », qui en changeait le rectangle sans sa largeur ; sa largeur et sa saillie se tirent par l'élément. Le faîtage ne se tourne
  plus tout seul de dessus sur un corps qui porte des travées (elles auraient changé de mur).

## [5.19.0] — 2026-11-09

Version **mineure** au sens de `MD/RELEASE.md` : un bow-window peut glisser sous l'étage, dont le rez-de-chaussée recule (#632). Un
geste nouveau et un champ facultatif du fichier, les anciens fichiers s'ouvrant toujours : MINOR (§2.1, « New optional field in the
project JSON, old files still load »), comme les schémas 14 (5.8.0) et 15 (5.10.0). Rien ne change sans le geste : aucune quantité ni
aucun export de la démonstration ne change, les sept témoins ne bougent qu'à leur numéro de version (la date de build reste le 30 octobre
2026 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités, `moteur-piscine-pergola.json`
et `glb-structure.json` sont identiques ; AE 101 identique. **Schéma 16** (migration 15 → 16 identité ; seul un bâtiment qui porte un
rez-de-chaussée en retrait s'écrit au 16), accepté par la plateforme (bertrandra/backprod#255, migration `Version20261109090000`) :
appliquer backprod puis `setup.php` en production **avant** de déposer cette livraison de Plan, sinon l'enregistrement d'un projet au
schéma 16 répond 422. La version ne porte que ce changement (`MD/RELEASE.md` §8.4). Requêtes vérifiées sans la mesure sur main
(run 42601258533 : 9 sur 9, 0,031 $ ; prompts et schémas inchangés).

### Ajouté
- **Bow-window : le rez-de-chaussée en retrait sous l'étage** (demande du propriétaire, 9 novembre 2026 : « je dois décaler le
  rez-de-chaussée pour glisser en dessous une bay window jusqu'au premier étage »). Sur un bow-window, « Rez-de-chaussée en retrait »
  (inspecteur, section des éléments de façade ; Mode Toit, groupe « Rez-de-chaussée ») recule le mur du rez-de-chaussée du corps qui le
  porte, sur toute la largeur de ce mur ; l'étage reste où il est et avance au-dessus. Par défaut le recul est la saillie du bow-window
  (son avant à fleur de l'étage), réglable de 0,10 à 3 m ; le bow-window monte du sol au dessous de l'étage (sa hauteur à l'égout,
  2,70 m par défaut), sans toit propre. Deux bow-windows sur le même mur partagent un seul rez-de-chaussée, le plus grand recul. En 3D,
  le dessous de l'étage est de la couleur du mur ; les ouvertures du bas et le soubassement suivent le mur reculé, celles de l'étage
  restent au nu. Dans le plan, le mur reculé est un trait en tirets sous le contour de l'étage (à l'écran seulement). Ctrl+Z dans la
  session, une étape d'historique à « Valider », projet modifié. Sans ce réglage, rien ne change : empreintes et AE 101 identiques.
  **Schéma 16** (`SaillieFacade.rdcEnRetraitM`, migration 15 → 16 identité) : seul un bâtiment qui en porte un s'écrit au 16 ; la
  migration de la plateforme qui accepte 16 (bertrandra/backprod#255, migration `Version20261109090000`) doit être en production avant
  toute livraison de Plan qui le contient. Fumée : point 152.

## [5.18.0] — 2026-11-08

Version **mineure** au sens de `MD/RELEASE.md` : en mode Toit, « Sens du faîtage » tourne désormais tout le toit d'un bâtiment à
plusieurs corps d'un seul geste, et le mur haut d'un appentis se choisit (#628) ; un projet neuf ne demande plus « Mettre à jour le
modèle ? » à sa création (#629, correctif). Un geste nouveau offert par l'interface : MINOR, pas PATCH. Rien ne change sans le geste :
aucune quantité ni aucun export de la démonstration ne change, les sept témoins ne bougent qu'à leur numéro de version (la date de
build reste le 30 octobre 2026 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (15), aucun champ de fichier
nouveau, rien à déployer côté plateforme. Requêtes vérifiées sans la mesure sur main (run 42536319692 : 9 sur 9, 0,031 $ ;
prompts et schémas inchangés).

### Ajouté
- **Mode Toit : tout le toit tourne d'un coup, et le mur haut d'un appentis se choisit** (réponses du propriétaire, 8 novembre 2026 :
  « oui » aux deux questions). Sur un bâtiment à plusieurs corps, « Bâtiment entier » montre le même groupe « Sens du faîtage », pour
  tout le toit (mêmes boutons, commande `toit.regler`, aucune commande nouvelle). Quand les corps pavent un rectangle (toit en M, deux
  pans décalés, shed), la composition entière tourne d'un quart de tour sur son emprise : un M reste un M, un shed un shed, mêmes corps,
  mêmes hauteurs, même emprise ; ses travées et ses éléments de façade gardent leur place sur le plan, sur le mur qui la porte après le
  tour. Sinon (une maison en L, en T), chaque corps qui a un faîtage le tourne dans son rectangle, l'emprise reste ; un toit plat ou une
  tourelle restent tels quels. Le groupe dit sous ses boutons ce qu'il fera. Quand un corps l'en empêche (un pignon, une lucarne, une
  fenêtre de toit ou un panneau le long d'un faîtage ; une tourelle, une travée ou un élément de façade qui tomberait à cheval sur deux
  corps après le tour d'une composition), le groupe est grisé et la raison s'écrit dessous, nommant le corps : rien ne tourne à moitié.
  Sur un corps à un pan, « Mur haut » choisit lequel des deux murs longs porte le faîtage (nommés par leur orientation) : même
  rectangle, égouts et profils des pans échangés, fenêtres de toit et panneaux suivent leur pan. Ctrl+Z dans la session, une étape
  d'historique à la validation ; un aller-retour rend les corps. Rien ne change sans le geste : moteur des toits, AE 101 et témoins
  golden identiques ; aucun champ de fichier nouveau (l'ordre des sommets et la place du faîtage). Point de fumée 150
  (`facade/modeToit/sens.ts`, `tests/unit/facade/modeToit/sensToit.test.ts`).

### Corrigé
- **Un projet neuf demandait « Mettre à jour le modèle ? »** (signalé par le propriétaire, 8 novembre 2026 : « À la création d'un
  nouveau projet j'ai la question pour mettre à jour la version du projet. »). Un projet s'écrit au plus petit schéma qui le décrit,
  pour rester lisible par les versions précédentes de Plan : la démonstration du premier pas, « Nouveau projet » et l'import cadastre
  écrivaient donc un plan neuf à un schéma ancien (le 5 pour la démonstration), et sa première ouverture le prenait pour un projet
  d'une version précédente. Un projet que cette version crée (ou remplit pour la première fois, le projet neuf de la plateforme) est
  désormais retenu comme gardé tel quel pour le schéma du programme, au même endroit que « Garder tel quel » (`io/modeleGarde.ts`,
  `io/api.ts::apiSave`) : pas de question à son ouverture sur cet appareil, et elle reviendra quand le schéma du programme montera.
  Rien d'autre ne change : le schéma écrit reste le plus petit (la démonstration au 5, `contrat/plan-produit.json` inchangé), « Mettre
  à jour le modèle » reste au menu Fichier, un projet d'une version précédente pose toujours la question et « Garder tel quel » est
  toujours retenu. Point de fumée 151, et le point 12 vérifie le projet créé par l'import (`tests/unit/app/projetNeufModele.test.ts`).

## [5.17.0] — 2026-11-08

Version **mineure** au sens de `MD/RELEASE.md` : en mode Toit, « Sens du faîtage » se choisit désormais sur chaque forme qui a un
faîtage à tourner (Mansart, gambrel, cul de geai, queue de vache, berceau, carène, appentis, asymétrique, papillon, en plus du
deux-pans et du quatre-pans ; #624) ; pdf-lib suit dans la livraison versionnée et le point de fumée 145 date ses gestes (#625). Une
fonction offerte sur des formes où elle ne l'était pas : MINOR, pas PATCH. Rien ne change sans le geste : aucune quantité ni aucun
export de la démonstration ne change, les sept témoins ne bougent qu'à leur numéro de version (la date de build reste le 30 octobre
2026 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (15), aucun champ de fichier
nouveau, rien à déployer côté plateforme. Requêtes vérifiées sans la mesure sur main (run 42529079875 : 9 sur 9, 0,031 $ ;
prompts et schémas inchangés).

### Modifié
- **Mode Toit : le sens du faîtage se choisit sur chaque forme qui en a un** (demande du propriétaire, 8 novembre 2026 : « Sur toit
  2 pans je peux choisir l'axe. Même chose sur les autres types de toit concernés. »). « Sens du faîtage » (dans la longueur, dans la
  largeur) n'était proposé que sur un deux-pans ou un quatre-pans au faîtage centré, sans bouts réglés ni profil : un Mansart, un
  gambrel, un cul de geai, une queue de vache, un berceau, une carène, un appentis, un asymétrique ou un papillon posés depuis le
  catalogue restaient dans le sens du grand côté. Le même groupe, les mêmes boutons et la même donnée (l'ordre des sommets du rectangle
  du corps) valent désormais pour toutes ces formes ; pas pour le toit plat ni pour les toits de révolution, qui n'ont pas de faîtage à
  tourner, ni quand un pignon, une lucarne, une fenêtre de toit ou un panneau se compte le long du faîtage. Le faîtage garde sa place
  relative en travers (au milieu, sur son mur pour un appentis), une croupe ou un cul de geai sa part du faîtage (un pavillon reste un
  pavillon), un berceau sa forme, un brisis ou un coyau sa largeur ; les travées et les éléments de façade posés sur le corps gardent leur
  mur. Un aller-retour rend le corps tel quel (avant, un deux-pans aux égouts différents revenait les égouts inversés). Ctrl+Z dans la
  session, une étape d'historique à la validation, comme les autres réglages. Rien ne change sans le geste : moteur des toits, AE 101 et
  témoins golden identiques ; aucun champ de fichier nouveau. Point de fumée 149 (`elements.ts::sensReglable`, `avecSens` ;
  `tests/unit/facade/modeToit/sensFaitage.test.ts`).

### Corrigé
- **Livraison : pdf-lib n'était pas versionné.** La règle `dist/` de `.gitignore` attrapait aussi
  `livraison/assets/vendor/pdf-lib@1.17.1/dist/pdf-lib.min.js` (pdf-lib range son module sous `dist/`) : une livraison tirée de git
  retombait sur jsDelivr pour l'export PDF. Une exception étroite (`!livraison/assets/vendor/**/dist/`) le fait suivre, et le fichier de
  la livraison 5.16.0 est ajouté tel que le build de f7636f81 le produit (mêmes octets que `node_modules`, même empreinte SRI) ; c'était
  le seul fichier de la livraison absent de git.
- **Fumée, point 145 au bureau** (« toucher bref : pas de façade »). L'application n'était pas en cause : le script envoyait l'appui et
  le lâcher sans leur heure, que le navigateur datait alors à leur réception. Le pointeur posé sur la maison demande une image de la Vue 3D,
  qui prend près de deux secondes en rendu logiciel dans la grande classe ; l'appui n'était acquitté qu'après elle, et un toucher de
  60 ms arrivait daté comme un appui de deux secondes (l'application juge la durée sur `timeStamp`, comme un vrai geste daté par le
  système). L'appui et le lâcher portent maintenant l'heure du geste (`timestamp` des événements CDP), à la souris comme au doigt : le
  clic droit et l'appui long restent refusés, le toucher bref choisit la façade.

## [5.16.0] — 2026-11-08

Version **mineure** au sens de `MD/RELEASE.md` : en mode Toit, l'état « Modification » ou « Insertion » se lit d'un coup d'œil
(indicateur d'état permanent sur la scène, nouvelle commande `toit.quitterInsertion` et son bouton « Annuler », nouveaux jetons de
couleur `insertion`, `on-insertion`, `insertion-bg` et modèles de la palette ; #621). Une commande et des jetons de la palette par
défaut nouveaux : MINOR, pas PATCH. Aucune quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à
leur numéro de version (la date de build reste le 30 octobre 2026 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ;
`projet.json`, les quantités, `moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma
inchangé (15), rien à déployer côté plateforme. Requêtes vérifiées sans la mesure sur main (run 42515479922 : 9 sur 9, 0,036 $ ;
prompts et schémas inchangés).

### Modifié
- **Mode Toit : « Modification » ou « Insertion », d'un coup d'œil** (retour du propriétaire, 8 novembre 2026 : « En mode 3D
  bâtiment j'ai du mal à distinguer si je suis en modif ou insertion »). Avant, rien ne séparait les deux états qu'un message de
  quelques secondes : la vignette « Décroché » armée n'était pas enfoncée, les poignées restaient prenables (un toucher pouvait tirer une
  poignée au lieu de poser la pièce), le curseur et le panneau ne changeaient pas, et la ligne du panneau invitait encore à « toucher un
  mur pour choisir sa façade ». Un indicateur d'état permanent est posé sur la scène, hors du panneau (en haut au bureau, juste au-dessus
  du panneau au téléphone et à la tablette) : « Modification — tirez les poignées de l'élément choisi, ou choisissez une pièce à ajouter »,
  ou, en plein d'une couleur d'insertion propre (nouveaux jetons `insertion`, `on-insertion`, `insertion-bg`, et les modèles de la
  palette), « Insertion : Décroché — touchez l'égout ou le mur à l'endroit du décroché · Échap pour annuler » avec un bouton « Annuler »
  (commande `toit.quitterInsertion`) ; « Placement : <élément> » pour « Choisir le mur dans la 3D ». Pendant l'insertion : la vignette
  armée enfoncée (« · à poser »), un cadre de la couleur d'insertion autour de la scène, le curseur de pose au bureau, les poignées
  estompées que le toucher traverse. Échap, un second appui sur la vignette (ou sur « Choisir le mur dans la 3D ») et « Annuler »
  ramènent à « Modification » ; une pose aussi, comme avant. Le message éphémère qui doublait la consigne est retiré. Rien ne change au
  calcul, à la session ni à l'historique du projet : empreintes golden et AE 101 identiques. Point de fumée 148.

## [5.15.0] — 2026-11-07

Version **mineure** au sens de `MD/RELEASE.md` : façades, une photo sans position du téléphone se place par le GPS de son EXIF (à 8 m
près, ignoré au-delà de 40 m du mur, derrière lui ou sans plan calé ; deux réglages de `regles/facades/enchainement.json`), et un cas de
calibration garde l'origine du plan de l'audit pour le projeter de même (#617) ; chaque étape du groupe Image calcule ce qu'elle montre et
un mur tiré à la main repart de l'É7, un geste de l'audit en est plus rapide (#618, `VERSION_CHAINE_FACADES` 13 → 14). Aucune quantité
ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste celle de
la 5.14.0 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (15) : `origine` est un champ
facultatif des cas de calibration, pas du projet ; rien à déployer côté plateforme. Requêtes vérifiées sans la mesure sur main (run 42386812721 : 9 sur 9, 0,035 $ ; les deux réglages de #617
ne partent pas à Claude, prompts et schémas inchangés).

### Modifié
- **Façades : chaque étape du groupe Image calcule ce qu'elle montre, et tirer le mur repart de l'É7** (audit de la calibration des
  façades, lot D ; « Go » du propriétaire, 7 novembre 2026). Tout se calculait au premier pas du groupe Image (É3) ; la chaîne
  (`facade/releve/chaine.ts`) se fait maintenant en temps, un par étape : É3 le champ de chaque photo, É4 ses coins (calage fin, replis,
  report du mur), É5 sa vue de face, É6 la mosaïque des vues, É7 le mur posé sur elle et son analyse (une action `code` « analyser » de
  plus à l'É7 ; É8 à É12 la lisent). Un mur tiré à la main (V1, « Ajuster l'égout et le sol », et les angles choisis du lot C2) entre à
  l'É7 : les photos où il change s'y redressent par lui sans calage fin, les vues de face et l'assemblage du rejeu précédent restent.
  Dans l'audit, le mur tiré sort de l'empreinte des entrées et devient un geste de l'É7 ; la calibration rejoue « Caler » depuis l'É7.
  Tout repart de l'É4 seulement quand le mur entre dans l'É4 à l'É6 (`chaine.ts::reporterLeMurTire`) : mur retiré d'une photo, report du
  mur sur une photo qu'il ne couvre pas, photo dont la vue de face vient de ses coins ou est lue corrigée de la distorsion, photo qui
  changerait d'assemblage. Un rejeu partiel rend exactement un rejeu complet (`rejeuPartielAudit.test.ts`, `uneOrchestration.test.ts`,
  qui comptent le calage fin, les coins de l'É4, l'assemblage de l'É6 et les mosaïques). Temps d'un geste dans l'audit : 02 (une photo)
  1,18 → 0,85 s, 18 (deux) 3,62 → 2,51 s, 16 (trois) 4,68 → 3,37 s ; le reste est l'analyse du mur posé. Mêmes coins, mêmes images :
  banc des façades et `calage-e5.ts` identiques (seuls les temps varient), AE 101 identique, empreintes golden et plancher de lecture 5.1.0
  inchangés. `VERSION_CHAINE_FACADES` 13 → 14 (ce qu'un rejeu garde a changé de forme) ; les vérités de l'É7 des étalons se reposent seules
  à chaque rejeu, celle d'AE 101 (posée sous la 9) reste telle quelle, comme aux montées précédentes.
- **Une photo de façade sans position du téléphone se place désormais par le GPS de son EXIF** (décision du propriétaire, 7 novembre
  2026 ; c'est voulu). Une seule règle pour l'audit et la calibration (`facade/releve/prisesFacade.ts::positionDeLaPhoto`) : la
  position du téléphone quand la photo en a une, inchangée ; sinon le GPS de l'EXIF, projeté dans le repère du plan comme celle du
  téléphone (même origine du cadastre), à une précision supposée de 8 m (`facades.enchainement.precisionExifM`). Il sert à tout ce que
  sert la position : l'ordre des photos, la distance au mur (seulement au-delà de deux fois la précision, comme pour le téléphone) et le
  cap. Il est ignoré, et la raison dite, derrière le mur, à plus de 40 m du mur (`facades.enchainement.distanceExifMaxM`, nouveau réglage
  de `regles/facades/enchainement.json`) ou sans plan calé sur le cadastre ; son cap ne sert que rapporté au nord vrai (`T`), un cap
  magnétique ou un nord non dit est ignoré et dit. L'É2 dit la provenance (« Photo 2 : position tirée de l’EXIF, à 8 m près. »), dans
  l'audit comme dans la calibration, et la fiche du cas aussi (Admin › Calibration).
- **Un cas de calibration garde l'origine du plan de l'audit** (`origine`, champ facultatif de `CasReel`, tiré de
  `parcelle.origine` du fichier d'audit) : la calibration projette le GPS de l'EXIF comme l'audit. Un cas d'avant ne l'a pas et se rejoue
  comme avant, sans migration ; l'É2 dit alors que ce GPS n'est pas utilisé. Une photo qui a la position du téléphone, ou ni position ni
  GPS dans son EXIF, ne change pas : banc des façades, `calage-e5.ts` (avec et sans capteurs), plancher de lecture 5.1.0, AE 101 et
  empreintes golden identiques à `main`. L'empreinte des objectifs de l'enchaînement (`EMPREINTE_OBJECTIFS`, affichée par la
  calibration) change avec les deux réglages ; elle ne sert à aucune comparaison de réponses enregistrées.

## [5.14.0] — 2026-11-07

Version **mineure** au sens de `MD/RELEASE.md` : façades, l'enchaînement passe à quatorze étapes aux actions typées (#611) ; l'écran
de la calibration se lit « étape → actions → avant/après » (#612) et y permet de choisir Calcul, Claude ou Manuel élément par élément, ou
de forcer Claude, V2 passant à l'É13 (#613, calibration seulement) ; un geste de l'audit ne rejoue plus que la fin de la chaîne (#614) ;
l'optique EXIF de chaque photo est gardée, GPS compris, et une photo sans position du téléphone garde sa focale EXIF (#610). Aucune
quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build
reste celle de la 5.13.1 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (15) : l'optique est un champ
facultatif des fichiers d'audit et des cas de calibration, pas du projet (`VERSION_FICHIER_AUDIT_PARCELLE` inchangée, 1) ; rien à
déployer côté plateforme. Requêtes vérifiées sans la mesure sur main (run 42367661806 : 9 sur 9, 0,031 $ ; #611 ne change que des
commentaires de `regles/facades/enchainement.json`, aucun prompt ni schéma).

### Ajouté
- **Choisir Calcul, Claude ou Manuel, élément par élément, et forcer Claude** (audit de la calibration des façades, lot C2 ; décisions du
  propriétaire du 7 novembre 2026). Dans Admin › Calibration, chaque élément lu par Claude a trois boutons dans l'étape qui le montre et à
  l'É8 : Calcul, Claude, Manuel (Manuel part de la valeur du calcul ou de celle de Claude et se corrige champ par champ) ; l'É12 ajoute une
  ouverture à la main. « Claude pour toute l'É… » dans chaque étape qui lit Claude, « Forcer Claude partout » à l'É8 ; un choix par élément
  l'emporte, un élément que Claude n'a pas lu garde le calcul et le dit. Les boutons passent par deux commandes du registre
  (`facade.choisirSource`, `facade.forcerClaude`, inscrites dans `app/exposition.ts`).
- **L'effet** (`facade/releve/choixSources.ts`, entrées `choix` et `forcages` de `derouler`) : les ouvertures choisies remplacent celles du
  moteur pour l'É12, V3 et le bilan de l'É14 ; les angles choisis posent le mur (É7) ; les pointes, le mot du haut, les autres volumes et
  les éléments du toit choisis vont au diagnostic (É10) et au bilan ; un élément du toit pris de Claude l'est malgré le haut lu, le moteur
  des toits le pose ou le refuse (`EntreesDiagnostic.pris`). Le parement, ses zones, ce qui cache le mur et les appentis : aucune étape ne
  les consomme encore, le choix est rangé et l'écran le dit.
- Rangés dans le cas de calibration (`CasReel.choix`, `.forcages`, facultatifs : un cas d'avant se relit tel quel, aucune migration),
  rejoués, défaits par Ctrl+Z et refaits par Ctrl+Y comme les autres gestes du cas. **Seulement dans la calibration pour l'instant**
  (décision du propriétaire : « Pas encore, je calibre ») : l'audit n'en passe pas et ne change pas, ni son fichier
  (`VERSION_FICHIER_AUDIT_PARCELLE` inchangée) ni le schéma du projet. Le même processus : `uneOrchestration.test.ts` couvre les choix.
- Sans choix ni forçage, rien ne change : banc des façades, `calage-e5.ts`, AE 101, empreintes golden et plancher de lecture 5.1.0
  identiques. Point de fumée 147.
- **L'écran de la calibration des façades est « étape → actions → avant/après »** (audit de la calibration, lot C1 ; décisions du
  propriétaire du 7 novembre 2026). Admin › Calibration montre les quatorze étapes (É1 à É14, É2 Prises et É14 Validation comprises,
  avant même le premier rejeu) ; l'étape ouverte montre ses actions, chacune avec son badge (Code, Claude, Manuel, Mesure), son état, son
  avant et son après (une image déjà faite par le rejeu, des valeurs en clair), et ses éléments un par un
  (`zones/composants/ActionsEtape.tsx`). Ce qui était hors étape va dans son étape : les photos à l'É2 (retirer) et à l'É6, les vignettes
  « avec / sans EXIF » à l'É3, les repères et le mur ajusté de la photo à l'É4 et l'É5, le calage à la main et « Confirmer le mur » à l'É7,
  le panneau de Claude (mode, réponse rejouée, rappel, escalade) à l'É8, la relecture V3 et l'annotation de la vérité des ouvertures à
  l'É12 (deux sections nommées, sans doublon). Restent en en-tête le cas, ses dimensions, « Rejouer » et Ctrl+Z / Ctrl+Y ; en pied « validé »,
  « Enregistrer », « Fermer », « Supprimer ». Les réglages, la mesure de calibration et l'historique ont leur onglet.
- **Chaque élément lu par Claude a la couleur de sa famille** (`FAMILLES_CLAUDE` : angles, pointe, forme, appentis, corps, élément du
  toit, cache, parement, zone, ouverture), dix jetons `--claude-*` (`styles/jetons.ts`, `app.css`, les huit modèles de palette ; une
  famille « Lectures de Claude » dans l'écran de la palette). L'É8 range toute la lecture par famille et dit, pour chacune, l'étape qui la
  montre et celles qui la consomment ; chaque étape qui la consomme la montre à côté du calcul, même couleur, avec son statut, ce qu'elle
  confirme (`vers`), la source retenue (calques : la pose des angles à l'É7, les pointes et volumes à l'É9, les boîtes à l'É12). En lecture
  seulement : aucun choix ne s'y fait encore.
- L'audit lit les mêmes actions (`MesureFacade.etapes[].actions`, dérivées, jamais écrites dans le fichier), filtrées par le mode d'audit
  de l'étape (`discret.ts::actionsDansLAudit` : l'É8 en une ligne, aucune mesure contre la vérité), sous l'étape ouverte depuis la barre,
  dans un pli « Ce que l'É… a fait ». Aucun second aperçu.
- **Aucun calcul ne change** : banc des façades, `calage-e5.ts`, AE 101, empreintes golden et plancher de lecture 5.1.0 identiques.
  Point de fumée 146.
- **L'optique de chaque photo est gardée, avec ou sans position du téléphone** (audit de la calibration des façades, lot A). Dès la
  réduction à 1 280 px, qui efface l'EXIF, la photo d'un cas ou d'un audit range une `optique` (`model/audit.ts::OptiquePhoto`) : la
  focale retenue pour la chaîne (l'EXIF, sinon l'appareil, sinon le défaut), et ce que l'EXIF du fichier d'origine disait
  (`facade/vision/exif.ts` : focale 24×36 et focale réelle, zoom numérique, objectif, marque et modèle, orientation appliquée, date de
  prise de vue et son décalage, position GPS — latitude, longitude, altitude, cap s'il existe), la taille de la source et celle de la
  photo réduite, et l'empreinte SHA-256 du JPEG réduit. De quoi rejouer une prise sans garder l'image d'origine. Le champ est facultatif :
  un fichier d'audit, de promenade ou un cas de calibration d'avant se relit sans rien perdre, le format ne change pas de version, le
  schéma du projet non plus (la photo n'entre pas dans le projet). Les cas de calibration tirés d'un audit la recopient.
- Sous une photo de cas, la fiche montre l'objectif même sans prise de vue, et la position GPS de l'EXIF quand il y en a une.
  **Ce GPS est gardé et montré, il n'est utilisé nulle part** : il ne situe pas la photo et ne remplace pas la position du téléphone.

### Corrigé
- Une réponse de Claude lue sur un autre assemblage que celui du rejeu (une photo retirée, des repères posés depuis) se dit à l'É8 avec
  les deux tailles ; seule la version de la chaîne était comparée.
- **Une photo sans position GPS du téléphone perdait sa focale EXIF** (`app/audit/photo.ts::preparerPhoto` ne rangeait l'optique que dans
  la prise de vue). Au rejeu, elle passait pour « sans EXIF » et se redressait avec le champ lu sur ses points de fuite. La chaîne lit
  maintenant l'objectif de l'optique quand la prise manque (`facade/releve/prisesFacade.ts::objectifRange`), dans l'audit comme dans la
  calibration : le même champ qu'avec GPS (sans prise, seulement une focale lue dans l'EXIF de la photo ; une focale apprise pour le
  téléphone ne s'applique pas à une photo sans prise ni EXIF, souvent importée d'un autre appareil). **Les photos sans GPS prises désormais se redressent donc avec la focale de leur EXIF : c'est
  voulu.** Les photos avec GPS, les étalons, le banc et le plancher de lecture 5.1.0 ne bougent pas ; une photo d'avant, sans optique,
  se relit comme avant.

### Modifié
- **Audit des façades : un geste ne rejoue plus toute la chaîne.** Quand seuls le mur confirmé (V1), les ouvertures relues (V3) ou la
  lecture de Claude changent, la façade repart de l'étape touchée (É7, É12 ou É8) avec les sorties de son rejeu précédent, par le même
  chemin que la calibration (`derouler`, `depuis` et `precedent` ; `mesures.ts::releverFacade`, `departDesGestes`) ; le calage fin, le
  redressement, l'assemblage, la fusion et la détection ne sont pas refaits. Tout autre changement (photos, repères, mur tiré, gabarit,
  version de la chaîne, valeurs calibrées) rejoue tout, comme avant. Sur les scènes du banc (Node), un geste V1 passe de 1,0–5,3 s à
  0,13 s, un geste V3 de 1,0–5,2 s à moins de 5 ms. Les résultats ne changent pas : le rejeu partiel rend les mêmes sorties, états et
  actions qu'un rejeu complet (`tests/unit/facade/releve/rejeuPartielAudit.test.ts`) ; `VERSION_CHAINE_FACADES` inchangée.
- **V2 passe sur l'É13 « Toit »**, là où la coche se fait (décision du propriétaire, 7 novembre 2026) : l'É10 devient un diagnostic pur
  (cachée dans l'audit, sans geste à elle ; elle se montre encore quand elle propose, comme toute étape qui doute), le segment « Toit » de
  la barre porte V2. Quatorze étapes, aucune renumérotation ; aucun calcul ne change.
- **L'É7 lit elle-même les angles de Claude** sur la réponse rejouée, au lieu de lire ce que l'É8 avait écrit après elle ; l'É8 reprend
  cette lecture pour sa vue d'ensemble et la refait seulement si un rejeu repris depuis elle change de réponse. Mêmes fonctions, mêmes
  entrées : rien ne change aux sorties. « Forcer Claude partout » ne couvre pas les angles du mur : poser le mur sur Claude reste un
  choix de l'É7 ; un mur posé sur des angles choisis rend la lecture de Claude périmée, et l'É8 le dit (« rappelez Claude »).
- Une réponse de Claude se rejoue depuis l'É8 (le mode IA, une réponse choisie, rappelée ou escaladée), plus depuis le calage ; un rejeu
  sans réponse ne garde plus rien de la précédente. « Rejouer depuis » l'É6 relance la chaîne depuis l'É3, comme l'É4 et l'É5.

- Façades (audit et calibration) : l'enchaînement d'une façade passe de onze à **quatorze étapes**, numérotées sans « bis » (décision
  du propriétaire du 7 novembre 2026) : É1 Préparation, É2 Prises, **É3 Objectif**, **É4 Coins du mur**, É5 Redressement (ex-É3),
  É6 Assemblage (ex-É4), É7 Calage du mur (ex-É5, V1), **É8 Lecture de Claude**, É9 Silhouette lue (ex-É6), É10 Diagnostic de forme
  (ex-É7, V2), É11 Texture (ex-É8), É12 Ouvertures (ex-É9, V3), É13 Toit (ex-É10), É14 Validation (ex-É11, V4). Chaque étape rend
  ses **actions typées** (code, Claude, manuel, et la vérité d'un cas en mesure, en lecture seule), qui ne sortent que de l'orchestrateur.
  **Aucun calcul ne change** : le groupe Image calcule une fois, dans son premier pas ; la lecture de Claude rejoue la réponse
  enregistrée (« mode déterministe » sans elle) et dit l'image qu'il a lue, l'exception acceptée ; ses textes quittent le calage, la
  silhouette et les ouvertures. Dans l'audit, l'objectif et les coins restent cachés, la lecture de Claude tient en une ligne ; la barre
  garde huit segments (Image : É3 à É6, Mur : É7 et É8), la frise de la calibration montre douze étapes. Les numéros écrits en dur
  viennent du contrat (`libelleEtape`). Un fichier d'audit ne porte aucune étape : rien à migrer. Chaque lecture de Claude est aussi
  une action de l'étape qu'elle concerne (les angles au calage, la forme du haut et les pointes à la silhouette, les éléments du toit
  au diagnostic, le parement et ce qui cache le mur à la texture, les boîtes aux ouvertures), avec le statut décidé par le moteur et
  ce qu'elle confirme ; les boîtes écartées et le lien d'une boîte retrouvée sortent de l'accord, en lecture. Chaque élément de Claude a une clé, une
  famille, les étapes qui le consomment, ses valeurs (calcul, Claude, la personne) et la source retenue ; le choix de la personne et le forçage de Claude
  (une étape, ou toutes) se lisent, sans encore rien changer. L'É3 montre l'optique rangée avec chaque photo.

## [5.13.1] — 2026-11-07

Version **corrective** : l'import depuis une adresse à Paris, Lyon ou Marseille trouve de nouveau ses parcelles (le code de
l'arrondissement est ramené à celui de la commune), et les suggestions d'adresse disent leur niveau en français (#607). Aucune quantité
ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste celle de
la 5.13.0 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (15) : rien à déployer côté
plateforme. Requêtes inchangées depuis la 5.13.0 (ni `deploy/`, ni `regles/`, ni les descriptions des sujets, ni la chaîne des
façades), vérifiées sans la mesure sur main (run 42348548642 : 9 sur 9, 0,035 $).

### Corrigé
- **Import depuis une adresse à Paris, Lyon et Marseille : aucune parcelle trouvée.** La Base Adresse Nationale rend le code de
  l'arrondissement (75119 pour le Zénith de Paris), le cadastre range toutes les parcelles sous celui de la commune (75056, 69123,
  13055). La recherche filtrait sur l'arrondissement et ne ramenait rien, avec ou sans numéro. Le code est ramené à la commune avant
  la recherche (`geo/apiIgn.ts::communeDuCadastre`) : le nom de la rue et la ville suffisent de nouveau.
- Les suggestions d'adresse disaient leur niveau en anglais (« niveau street », « niveau municipality ») : elles disent « rue, sans
  numéro », « commune » ou « lieu-dit ».

## [5.13.0] — 2026-11-06

Version **mineure** au sens de `MD/RELEASE.md` : Mode Toit, « Décrocher ici » et la poignée « Recul du mur » (#602), la vue de façade
qui se rapproche à la molette et au pincement (#602) et cadre toutes ses poignées (#600), la caméra qui tourne autour du bâtiment, bornée,
avec « Recadrer le bâtiment » (#603), et ses gestes (toucher, pincement sur une poignée, poignées cachées, tourner la vue, #604) ; le
raccord d'un pignon qui ne monte pas au faîtage (#601) ; la réparation des chaînes d'une réponse de l'analyse (#599). Aucune quantité ni
aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste celle de la
5.12.0 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités, `moteur-piscine-pergola.json`
et `glb-structure.json` sont identiques ; AE 101 identique. Schéma inchangé (15) : rien à déployer côté plateforme. Le corps des
requêtes à Claude ne change pas (#599 ne touche que la lecture de la réponse, dans `deploy/analyse-fonctions.php`) ; vérifiées sans la mesure
sur main (run 42284594440 : 9 sur 9, 0,031 $).

### Ajouté

- Mode Toit, **le décroché au point** (demande du propriétaire : « je sélectionne un point sur l'égout et je recule à droite ou à gauche
  de x cm, et une poignée pour ajuster »).
  - Dans l'onglet Façade du catalogue, la pièce « Décroché » (commande `toit.decrocher`, « Décrocher ici ») attend un toucher sur l'égout
    ou le mur de la façade regardée (mêmes conditions que la travée). Un petit choix demande la profondeur en centimètres (50 proposés, de
    1 à 300) et le côté : « Reculer à droite » ou « Reculer à gauche ». Valider pose une travée de mur reculée, du point touché jusqu'au
    bout du mur de ce côté, ou jusqu'au bord de la travée ou du pignon voisin. Même modèle (schéma 14, aucune migration) : le toit reste
    continu. Échap (ou le retour du navigateur) lâche le geste ; un pas de Ctrl+Z de la session ; grisée avec sa raison en lecture seule.
  - Une travée de mur a une nouvelle poignée de profondeur (« Recul du mur ») : elle règle le recul au centimètre, aimantée sur les 5 cm
    ronds, de 0 à 3 m, avec sa cote (« recul 0,40 m »). En vue de façade, l'axe de profondeur, presque de bout, s'allonge à l'écran pour
    rester réglable au doigt.
  - Le groupe « Recul » de l'inspecteur du mode garde ses valeurs rapides et montre en plus la valeur libre courante quand elle n'en fait pas partie.
  - Les dialogues de choix peuvent porter un champ numérique (`DialogueChoix.nombre`, `data-controle="dialogue.nombre"`).
  - Point de fumée 142 (un décroché de 40 cm à droite puis à gauche, sur la démonstration et AE 101, la poignée tirée à 0,40 m, Ctrl+Z).
- Mode Toit, **la vue de façade se rapproche au pincement et à la molette** (décision du propriétaire, 6 novembre 2026 : le cadre de la
  façade et de ses poignées reste, sans bouton « Zoomer sur l'élément »). Devant une façade, l'orbite est suspendue : la molette déplaçait
  la caméra de l'orbite, cachée, sans rien changer à l'image, et le pincement ne faisait rien. Ils zooment maintenant la caméra de façade
  autour du point visé (les boutons +/− et le zoom au glisser autour du milieu), sans s'éloigner au-delà du cadre de départ ni s'approcher
  en deçà d'environ 1 m de façade dans la partie libre (`three/poseFacade.ts::zoomerAutour`, `three/pincementFacade.ts`). Les deux doigts
  font aussi glisser l'image ; un pincement ne touche rien. Le zoom n'est ni dans le projet ni dans la session : un Ctrl+Z ne le défait pas,
  un recadrage devant le même mur le garde, une autre façade repart du cadre. Les poignées suivent et s'écartent de nouveau. Point de
  fumée 143 (pincement au doigt, molette à la souris).

### Corrigé

- Mode Toit, **la caméra tourne autour du bâtiment et ne se perd plus** (audit de la caméra, 6 novembre 2026).
  - La cible de l'orbite est le centre du bâtiment (ou du corps choisi) : c'est l'image qui se décale vers la partie que le panneau laisse
    libre (`setViewOffset`, `three/orbiteModeToit.ts`), plus la cible. Elle était à 8 m de la maison (11 m à la tablette), et 7 à 13 m
    sous le sol au téléphone : une orbite d'un doigt de 120 px faisait glisser la maison de 100 px, et un pincement emmenait sous la terre.
    Replier ou déplier le panneau recentre la maison sans bouger la caméra.
  - Pendant une session, l'orbite est bornée : jamais sous l'horizon (85°), jamais à moins de 3 m de la cible ni au-delà de quatre fois
    le bâtiment (un cadrage du mode qui demande plus de recul est admis) ; la cible reste au-dessus du sol et près du bâtiment, le glisser
    à deux doigts (ou au bouton droit) se déplace dans le plan du sol ; le pincement retrouve la sensibilité d'origine (il emmenait de
    64 m à 5 m d'un geste). La molette et les boutons + et − s'arrêtent à la borne. Hors du mode, la Vue 3D ne change pas.
  - « Recadrer le bâtiment », dans la barre de la session : la caméra revient sur le bâtiment entier (en 3D libre, de la même direction ;
    de dessus, la vue de dessus). La maison de la démonstration, sans corps, n'avait aucun moyen de revenir.
  - À la tablette, la barre de la session tient en deux colonnes à gauche du panneau : en une seule, ses boutons faisaient la hauteur
    du panneau et prenaient la scène (la scène gagne environ 170 px de haut).
  - Ctrl+Z et Ctrl+Y de la session ne rendent la caméra que si la vue, la façade ou l'élément choisi changent (décision du propriétaire) :
    sinon elle reste où vous l'avez mise.
  - Point de fumée 144. Ni le toit, ni Ctrl+Z du projet, ni « projet modifié », ni aucune quantité ou export ne changent.
- Mode Toit, **les gestes de la caméra** (audit de la caméra, 6 novembre 2026, second lot).
  - Le toucher qui choisit une façade (ou pose un élément, ou un décroché) est celui de la sélection au toucher : bref (450 ms),
    immobile (6 px), d'un seul doigt ou du bouton principal (`selection3d.ts::ecouterLesTouchers`). Un clic droit bref (qui déplace la
    vue), un appui long ou un pincement choisissaient une façade et faisaient sauter la caméra.
  - Un second doigt posé pendant qu'une poignée est tirée en fait un pincement : le glisser est annulé (le toit revient à l'état de la
    pile) et les deux doigts vont à l'orbite. Un pincement commencé près d'une poignée retouchait le toit.
  - Une poignée qu'une surface du bâtiment cache (un rayon de l'œil vers elle, `three/occultation.ts`) s'estompe et ne se prend plus :
    elle se dessinait par-dessus le toit qui la cache. Une poignée que le panneau couvre se ramène au bord de la partie libre, un trait
    pointillé vers son point.
  - Les poignées et l'indice suivent l'image même (`etat3d.ts::abonnerImage`, appelé après chaque rendu) : un minuteur de 100 ms les
    faisait traîner derrière la caméra.
  - « Tourner la vue à gauche » et « … à droite » (15°) dans la colonne de la caméra, et les flèches gauche et droite du clavier sur la
    Vue 3D : la vue ne se pilotait pas au clavier. Les boutons qui tournent un corps disent « Tourner le corps à gauche / à droite » et
    ont leur icône.
  - Au téléphone, pendant une session, la colonne des boutons de la caméra s'arrête au-dessus du panneau et défile : les derniers
    passaient sous lui.
  - Pendant une session, la focale ne suit plus la hauteur de la caméra (45° en l'air, 55° près du sol) : en tournant autour du
    bâtiment, l'impression de zoom changeait en descendant.
  - Pas d'inertie (décision du propriétaire : l'orbite s'arrête net au lâcher). En vue de façade, la molette et les boutons + et − sont
    ceux du zoom de la façade (#602).
  - Point de fumée 145. Ni le toit, ni Ctrl+Z du projet, ni « projet modifié », ni aucune quantité ou export ne changent.
- **Un dialogue ouvert par un toucher ne se referme plus aussitôt au doigt** : le clic d'un toucher arrive après sa levée, à l'endroit du
  doigt, et tombait sur le voile du dialogue qui venait de s'ouvrir (le point d'un décroché, au téléphone). Le voile ne ferme plus que
  sur un toucher commencé sur lui.
- Barre d'outils : « Annuler » se redessine à l'ouverture et à la fermeture d'une session du mode Toit (sa clé de version ignorait la
  session ; la garde des zones le signalait).
- Mode Toit, vue de façade (retour du propriétaire sur la 5.12.0 : « le zoom est trop fort, je ne peux pas atteindre une poignée, trop
  de décalage dans la perspective »).
  - Le cadre tient la façade du corps regardé (ou de celui qui porte l'élément choisi) et toutes les poignées de ce que l'on tire, à
    64 px au moins des bords libres et du panneau, dans les trois classes d'écran. Un élément choisi (pignon, fenêtre de toit…) ne
    remplit plus l'écran : il se zoomait seul, et les poignées du mur sortaient de l'image. Une seule règle,
    `facade/modeToit/poignees.ts::pointsDuCadreDeFacade`, une seule caméra, `three/poseFacade.ts::cadreOblique` (au moins 5 m de côté).
  - Le glissement de la vue oblique est divisé par deux (0,19 et 0,11 au lieu de 0,38 et 0,22 de la maquette) : le faîtage et ses
    poignées ne glissent plus de plusieurs mètres loin du mur ; la Vue 3D libre ne change pas.
  - Les poignées qui se recouvrent à l'écran (un mur court, un toit plat : faîtage, égout et longueur au même endroit) s'écartent
    jusqu'à deux zones de saisie, dans la partie libre de l'image : chacune se prend au doigt.
  - Au téléphone, un petit élément du toit choisi se voit donc plus petit qu'avant (une fenêtre de toit de 0,8 m fait une quinzaine de
    pixels sur une façade de 12 m), mais ses poignées et celles du mur sont toutes atteignables.
  - Point de fumée 141 (chaque poignée de chaque façade d'AE 101 atteignable) ; le point 124 suit (il mesurait le zoom sur l'élément).
- Mode Toit, **un pignon qui ne monte pas au faîtage** se raccorde au pan du corps (retour du propriétaire, 6 novembre 2026 : « mauvais
  raccord toit corps et pignon s'il n'est pas au faîtage ») : ses deux noues s'arrêtent là où son faîtage rencontre le pan (l'intersection
  des plans), et le pan n'est entaillé que jusque-là ; il était entaillé jusqu'au faîtage du corps et laissait un trou au-dessus du
  pignon. Un pignon au faîtage sort à l'identique ; AE 101 identique. Fumée : point 140 (un pignon rabaissé à mi-pan).
- **Analyse d'une maison : une réponse de Claude n'est plus refusée pour un guillemet dans un texte libre** (`deploy/analyse-fonctions.php`).
  L'analyse ne demande pas la sortie structurée (sa grammaire dépasse la limite de l'API) ; Haiku écrit alors parfois, dans un texte
  libre (`vu`, `ecart`, `observe`…), un guillemet droit non échappé (`"un toit "deux-pans" probable"`), un retour à la ligne brut ou un
  échappement que JSON ne connaît pas (`\'`), et tout l'objet était refusé (« Sortie non JSON. », vérification de l'API, run 42229208319).
  En dernier recours, ces chaînes sont réparées avant la lecture : un guillemet ne ferme la chaîne que s'il est suivi de ce qui suit une
  chaîne en JSON. Rien n'est deviné hors des chaînes (objet tronqué, clé sans guillemets, virgule manquante : toujours illisibles), et
  la réponse passe ensuite par le schéma comme avant. Une sortie illisible donne aussi la fin de son texte (`fin`), que
  `verifier-api-claude.mjs` imprime : le défaut d'une réponse est souvent après ses 400 premiers caractères. Le corps des requêtes ne change pas.

## [5.12.0] — 2026-11-06

Version **mineure** au sens de `MD/RELEASE.md` : en Vue 3D, toucher un bâtiment de la parcelle, une terrasse, une pergola, un carport ou une
piscine le sélectionne, et toucher dans le vide, ou sur une maison voisine, désélectionne (#595, #597). Aucune quantité ni aucun export de la démonstration ne change : les sept
témoins ne bougent qu'à leur numéro de version (la date de build reste celle de la 5.11.1 ; preuve forte, sept sur sept) ; `projet.json`,
les quantités, `moteur-piscine-pergola.json` et `glb-structure.json` sont identiques, et le `.glb` du point 24 l'est à la 5.11.1 (géométrie
et JSON au bit près, mêmes images ; la surbrillance de la sélection n'y entre pas ; `tests/fixtures/golden/EMPREINTES.md`). Schéma
inchangé (15) : rien à déployer côté plateforme. Requêtes inchangées depuis la 5.11.1 (ni `deploy/`, ni `regles/`, ni les descriptions
des sujets, ni la chaîne des façades), vérifiées sans la mesure sur main (run 42229356914 : 9 sur 9, 0,030 $ ; le premier passage, run 42229208319, s'était arrêté sur une réponse de l'analyse que le serveur n'a pas pu lire, « Sortie non JSON », sans requête changée depuis la 5.10.0 ; relancé une fois).

### Ajouté

- Vue 3D : toucher un objet le choisit (demande du propriétaire, 6 novembre 2026). Un toucher ou un clic bref, sans glisser, sur un
  bâtiment de la parcelle (ou une annexe), une terrasse, une pergola, un carport ou une piscine le sélectionne : la même sélection que dans le plan.
  L'inspecteur, l'explorateur et « Modifier la toiture » la suivent (le bouton s'allume pour un bâtiment de la parcelle). Ce n'est pas
  une modification : ni Ctrl+Z, ni « projet modifié », et c'est permis en lecture seule.
  - Un arbre ou un parasol devant l'objet laisse passer le toucher. Un toucher dans le vide (sol, ciel) ou sur un objet qui ne se
    choisit pas en 3D (clôture, chemin, massif, mobilier) lâche la sélection, comme un clic dans le vide du plan (décision du
    propriétaire). Une maison voisine (le voisinage importé, un bâtiment de l'IGN hors de la parcelle du projet) vaut le vide : seuls les
    bâtiments et annexes de la parcelle du projet se choisissent (décision du propriétaire) ; ce qui fait « chez un voisin » n'est écrit
    qu'une fois, `model/fonctions.ts::estChezUnVoisin`, que le mode Toit lit aussi.
  - Un glisser (l'orbite), un pincement, un appui long ou le bouton droit ne choisissent rien. Le mode Toit, l'audit (promenade et
    audit de la parcelle), l'avant / après et la promenade de la Vue 3D gardent leurs propres touchers.
  - L'objet choisi se voit dans la scène : le trait renforcé de l'audit sur ses arêtes ; la terrasse courante, dont le platelage
    n'est pas un objet de la scène, a son contour surligné.
  - L'explorateur, quand il se remonte (la tablette le refait en quittant la Vue 3D), s'ouvre sur la famille de l'objet choisi.
  - Point de fumée 139.

## [5.11.1] — 2026-11-06

Version **corrective** : la navigation du Mode Toit, d'après l'audit du 6 novembre 2026 (session sûre #590, cadrage #591, finitions #592).
Ce qui change à l'écran : retoucher une pastille enfoncée la lâche (au doigt, seul Échap le faisait) ; pendant une session, au
téléphone et à la tablette, les messages passent en haut de l'écran et laissent le panneau utilisable ; « Modifier la toiture » reste
visible, grisé avec sa raison, quand aucun bâtiment n'est choisi (il s'effaçait) ; une entrée « Modifier la toiture en 3D… » s'ajoute
dans l'inspecteur d'un bâtiment. Aucune quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur
numéro de version (la date de build reste celle de la 5.11.0 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ;
`projet.json`, les quantités, `moteur-piscine-pergola.json` et `glb-structure.json` sont identiques. Schéma inchangé (15) : rien à
déployer côté plateforme. Requêtes inchangées depuis la 5.11.0 (ni `deploy/`, ni `regles/`, ni les descriptions des sujets, ni la chaîne
des façades), vérifiées sans la mesure sur main (run 42213217158 : 9 sur 9, 0,035 $).

### Modifié

- Mode Toit, les finitions de la navigation (audit du 6 novembre 2026, lot C).
  - Une entrée « Modifier la toiture en 3D » dans l'inspecteur d'un bâtiment (section « Façades et toit ») : elle ouvre la Vue 3D, puis le
    mode Toit sur ce bâtiment. Le mode ne s'ouvrait que depuis un bouton de la Vue 3D, qui s'effaçait sans bâtiment choisi.
  - Le bouton « Modifier la toiture » de la Vue 3D reste visible quand il ne peut pas servir, grisé avec sa raison (dans l'infobulle,
    et au doigt dans un message) : aucun bâtiment choisi, un bâtiment voisin, la lecture seule. En lecture seule, il s'effaçait.
  - À la sortie du mode (Valider, Abandonner, Échap), le focus revient au bouton « Modifier la toiture ».
  - « Choisir le mur dans la 3D » est dans le panneau du mode, sur l'élément de façade choisi (bow-window, galerie, appentis) ; son
    bouton de l'inspecteur du plan, toujours grisé (l'inspecteur n'est pas montré en Vue 3D), est retiré.
  - Les pastilles se distinguent : « Pignon sud », « Pignon nord », et sur un bâtiment à plusieurs corps « Pignon sud · corps 2 » ;
    deux noms encore égaux se numérotent. Chaque groupe de réglages dit ce qu'il règle au-dessus de ses boutons (« Pente », « Débord à
    l'égout »…) : au doigt, il n'y avait que les images.
  - Une icône par commande : « Tourner » n'a plus celle d'« Annuler », « Vue de dessus » plus celle du plein écran, « Voir le toit du
    projet » plus celle de « Modifier la toiture ».
  - Le plan des façades dessine un mur commun à deux corps une seule fois (il était dessiné deux fois, et le dessus prenait tous les
    touchers) ; ses murs et ses corps se prennent au clavier (Tab, puis Entrée), chacun nommé (« Corps 2, façade sud »).
  - Au téléphone et à la tablette, la raison qui grise des vignettes du catalogue s'écrit sous lui (l'infobulle n'existe pas au doigt).
  - Point de fumée 138.

### Modifié

- Mode Toit : on voit et on sait sur quoi l'on travaille (audit de la navigation, 6 novembre 2026, lot B).
  - À l'entrée, la caméra se cadre sur la maison, dans la partie de la scène que le panneau laisse libre, vue de la même direction
    qu'avant ; la sortie rend la caméra d'avant le mode. La maison était souvent minuscule, ou cachée sous le panneau à la tablette.
  - Choisir un corps (sa pastille) cadre la caméra sur lui en 3D libre, ou passe devant sa façade la plus visible en vue de façade.
  - Une seule ligne dit ce qui est en cours, « Corps 2 · façade ouest · 6,50 m » ; le plan des façades met en évidence le même corps.
    Choisir une façade d'un autre corps fait de lui le corps choisi : la façade regardée, la ligne, les poignées et les gestes
    désignent toujours le même corps.
  - Une pastille « Bâtiment entier » revient au bâtiment entier, et retoucher la pastille enfoncée d'un élément le lâche : au doigt,
    seul Échap le faisait.
  - Au téléphone, la barre de la session (Retour, Annuler, Valider) reste en haut du panneau quand il défile ; pendant une session, au
    téléphone et à la tablette, les messages passent en haut de l'écran, au lieu de couvrir le panneau. Le message d'entrée
    « Touchez un mur… » est retiré : la ligne du panneau le dit.
  - Ctrl+Z et Ctrl+Y de la session rendent la vue du pas (la façade, l'élément choisi, la caméra) : la sélection est celle de l'état où
    elle a été prise, jamais un rang qui désignerait un autre élément après l'annulation.
  - Point de fumée 137 ; les points 98 et 134 suivent (la ligne du corps choisi, une pastille déjà enfoncée n'est pas retouchée).

### Corrigé

- Mode Toit : une session ne se perd plus sans qu'on le demande (audit de la navigation, 6 novembre 2026).
  - « Annuler » du projet (le bouton de la barre comme Ctrl+Z, même depuis une liste ou un champ) annule le dernier geste de la
    session ; il défaisait l'étape du projet d'avant la session, sous elle, et « Valider » écrivait ensuite un mélange des deux. Sans
    geste à annuler dans la session, il est grisé.
  - Seule la scène compte comme un toucher de la scène : toucher le panneau du mode, le plan des façades ou les boutons de la Vue 3D
    au-dessus de la maison choisissait aussi la façade qu'ils couvraient, avant le geste demandé.
  - Quitter la Vue 3D (« Plan », « Visionneuse ») ou choisir un autre objet pendant une session modifiée pose d'abord la question :
    « Valider », « Abandonner » ou « Rester ». La session était abandonnée en silence, avec un simple message. Sans changement, elle
    se ferme sans rien demander, comme avant.
  - Le bouton retour du navigateur ou du téléphone vaut Échap pendant une session : il ne quitte plus Plan.
  - Échap a un seul effet : l'élément choisi, puis la façade, puis la question « Abandonner les changements ? », qui reste ouverte (elle
    s'ouvrait et se refermait sur la même touche) ; Échap sur une question la referme sans rien faire d'autre ; en plein écran, la
    dernière marche est la sortie du plein écran.
  - Point de fumée 136.

## [5.11.0] — 2026-11-05

Version **mineure** au sens de `MD/RELEASE.md` : le cul de geai se raccorde aux pans voisins (#585) ; la Vue 3D ne se redessine plus que
quand quelque chose change (#586), et le vent des arbres est plafonné à 30 images par seconde (#587) ; la fumée corrige ses points 93,
95 et 121 (#583, #584). Aucune quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de
version (la date de build reste celle de la 5.10.0 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`,
les quantités, `moteur-piscine-pergola.json` et `glb-structure.json` sont identiques. Schéma inchangé (15) : aucun ordre de la plateforme
au-delà de celui de la 5.10.0 (backprod#254 et `setup.php`). Requêtes inchangées depuis la 5.10.0 (ni `deploy/`, ni `regles/`, ni les
descriptions des sujets, ni la chaîne des façades), vérifiées sans la mesure sur main (run 42132341865 : 9 sur 9, 0,031 $).

### Modifié

- Vue 3D : le vent dans les arbres est plafonné à 30 images par seconde (décision du propriétaire, 5 novembre 2026). Il reste
  coché par défaut ; avec des arbres visibles, la vue ne redessine plus à chaque image du navigateur, mais une image sur deux à
  60 Hz. Les gestes, la caméra et tout autre changement restent à pleine cadence. Le plafond est un seul réglage,
  `IMAGES_PAR_SECONDE_VENT` (`three/renduDemande.ts`). Mesure (démonstration avec trois arbres EZ-tree, dessin neutralisé pour lire
  ce que la boucle demande) : 60 → 30 images par seconde. Le point de fumée 135 vérifie le plafond.
- Vue 3D : rendu à la demande (demande du propriétaire, 5 novembre 2026). Une vue immobile ne redessine plus à chaque image : la
  boucle ne rend que quand la caméra bouge (amortissement compris), que la scène change, qu'un geste a lieu, qu'une animation tourne
  (promenade, vent dans des arbres visibles) ou qu'un code le demande (`demanderRendu`). Un seul mécanisme, `three/renduDemande.ts`,
  qui reprend celui de l'avant / après de l'audit ; une veille sur three.js (objets ajoutés ou retirés, matériaux, textures et tampons
  marqués) et une empreinte de la scène toutes les 250 ms rattrapent ce qu'aucun chemin ne signale. Mesure (bureau, Chromium sans
  écran, démonstration, vue immobile 10 s) : de 4 images par seconde et un cœur saturé à 0 image et 2 à 4 % de CPU. Aucune image ne
  change ; seul le moment où elle est rendue. Nouveau point de fumée 135.

### Corrigé

- Fumée, point 121 (textes du dossier) : la carte de situation (DP1) est servie fixe pendant le point. Elle vient du WMS de l'IGN à
  chaque export et n'entre au dossier que s'il répond en moins de 10 s : le nombre de pages suivait donc le réseau, et « la notice
  ajoute une page » échouait une fois sur trois (19 → 19 quand la carte manquait au second export, 18 → 20 quand elle manquait au
  premier ; Fumée de la nuit des 4 et 5 novembre 2026). La notice validée, elle, était toujours imprimée. Rien ne change dans
  l'application ; le point exige en plus que la carte ait été demandée aux deux exports.
- Fumée, points 93 et 95 (Admin › Règles et Admin › « De l'IGN à ma maison ») : le point 93 lit la version du prompt livré et attend
  celle-là plus un après une édition, au lieu de 10 écrit en dur (le prompt livré est passé de 9 à 10 avec #580) ; le point 95 attend
  les formes du catalogue sous leurs noms d'aujourd'hui, « Cul de geai » et « Queue de vache (coyau) » (#577). Ils échouaient dans les
  six couples de la Fumée de la nuit de la 5.10.0. Rien ne change dans l'application.

## [5.10.0] — 2026-11-05

Version **mineure** au sens de `MD/RELEASE.md` : le Mode Toit dessine le cul de geai et la queue de vache (#577), que l'audit découvre
(LiDAR, É7 et Claude, en propositions décochées, #578) et que Claude lit sous leurs synonymes (#580 : prompts de l'analyse 9 → 10 et de
la façade 2 → 3) ; l'É5 pose le gabarit bas sur bas, à l'échelle de la largeur (#573), et ne prend plus le bas d'un bandeau peint sous
le pignon pour l'égout (#576) ; l'É6 ne lit plus le haut du mur dans un arbre ni au droit d'un poteau (#574, #575) ; la fumée coche une
proposition après la mesure (#579). Aucune quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à
leur numéro de version, d'un octet plus long (à numéro inchangé, sept sur sept au bit près ; au nouveau numéro, l'ancien remis, les
fichiers texte au bit près et les PDF identiques une fois les décalages neutralisés ; `tests/fixtures/golden/EMPREINTES.md`) ;
`projet.json`, les quantités, `moteur-piscine-pergola.json` et `glb-structure.json` sont identiques. **Schéma 15** (migration 14 → 15
identité), accepté par la plateforme (bertrandra/backprod#254, migration `Version20261105090000`) : appliquer backprod puis `setup.php`
en production **avant** de déposer cette livraison de Plan. Fumée complète lancée en parallèle (Fumée de la nuit, run 42036871759),
livraison sans l'attendre par décision du propriétaire ; un point rouge donnera une 5.10.1. Requêtes vérifiées contre l'API Claude avec
la mesure des façades et les dix demandes de l'assistant, les prompts ayant changé (run 42036876498 : 9 sur 9, garde-fou de la lecture vert après sa relance unique (à la première passe, les carreaux justes ×3 au total 2 → 0, bruit déjà vu ; la relance seule : genre porte-fenêtre ×1 au total 6 → 5 et les pointes de la scène 28 1 → 0, dites à part), dix listes justes sur dix, 0,65 $ relance comprise ; planchers des étalons 27, 28 et 29 figés à cette première passe dans `scenes-ajoutees.json`).
Résultat de cette fumée : 566 passés sur 582 joués. Rouges : les points 93 et 95 dans les six couples, deux attentes du script laissées en
arrière par #580 (version du prompt livré écrite en dur) et #577 (formes du catalogue renommées « Cul de geai » et « Queue de vache
(coyau) »), corrigées par `claude/fumee-93-95` ; le point 121 en compact sombre, moyen clair et large clair (la carte de situation du
WMS de l'IGN, sans témoin, présente ou non selon le réseau : `claude/fumee-121-carte`) ; le point 114 une fois, en large sombre (machine
lente). Aucun défaut de l'application.

### Ajouté
- Ce que lit Claude : la **demi-croupe** dit ses autres noms (cul de geai, nez de veau, bout rabattu, croupette ; décision du propriétaire,
  5 novembre 2026), son faîtage qui peut déborder le pignon, et la pointe d'un pignon de façade coupée de même. L'identifiant reste
  `demi-croupe`. Prompt de l'analyse version 10, run d'une façade version 3 (`deploy/prompt-analyse.md`, `deploy/prompt-facade.md`
  régénérés) ; vérification sur la vraie API à la version suivante.

- Mode Toit : **le cul de geai** (demande du propriétaire, 5 novembre 2026 ; aussi nez de veau, bout rabattu, croupette, demi-croupe) et
  **la queue de vache** (un coyau qui déborde), dessinés sur un corps existant avec les mêmes boutons-images que les autres réglages :
  - chaque bout du faîtage d'un corps à deux pans se choisit **pignon, croupe ou cul de geai** (« Bout nord », « Bout sud »…) ; un cul de
    geai règle la **part du pignon coupée** (le quart, le tiers, la moitié) et le **débord du faîtage** au-delà du mur (0, 0,5 ou 1 m) :
    à 0, le petit pan se pose sur le pignon tronqué en trapèze ; au-delà de la rive, le faîtage porte la croupe en avant (un capuchon)
    **raccordé à l'égout** (retour du propriétaire, 5 novembre 2026) : la rive de chaque long pan descend en ligne du coin du pied de la
    croupe jusqu'au coin de l'égout, débord compris, sans marche ni sous-face horizontale à part ; le dessous de cette rive débordante est
    la sous-face, et le mur pignon monte sous le toit ; même raccord à la pointe d'un pignon ; le débord d'égout du corps prolonge les
    pans et la croupe à leur pente ;
  - la **pointe d'un pignon** (élément pignon d'une façade) se coupe de même : en triangle ou en cul de geai, avec sa part et son débord ;
  - la **queue de vache** d'un pan : un débord de l'égout de 0,6, 0,9 ou 1,2 m, à la **pente adoucie** (10 à 25°, la cassure à 0,8 m du
    mur au plus), sous-face fermée ; elle se pose sur un corps dont les bouts sont des pignons. La vignette « Coyau » du catalogue
    s'appelle « Queue de vache (coyau) » et déborde de 0,9 m ; « Demi-croupe » s'appelle « Cul de geai » ;
  - les pans d'un corps à cul de geai sont entaillés sous ses pignons traversants (comme ceux d'un deux-pans), un pan en coyau aussi ;
  - tout se fait dans la session du Mode Toit (Ctrl+Z, « Valider » fige le toit), et rien du moteur ne change : AE 101 identique.
  Schéma 15 (une seule montée, bertrandra/backprod à déployer d'abord) : `debordFaitageM` d'un bout en demi-croupe, `pointe` d'un pignon,
  `debordM` d'un pan en coyau. Seul un bâtiment qui en porte s'écrit au 15. Fumée : point 134.
- Découverte du **cul de geai** (demi-croupe), en propositions décochées, jamais un changement silencieux du moteur (AE 101 identique) :
  - **LiDAR** : la coupe du faîtage se lit au bout de chaque corps et au faîtage de chaque pignon traversant (`facade/toits/culDeGeai.ts`,
    aux seuils de la lecture des formes) ; l'audit la propose sur ce corps ou ce pignon, et le moteur des toits la relit ;
  - **É7** (diagnostic de forme) : sur un mur de bout en pignon, un cul de geai quand la pointe se lit coupée (jugé sur le tiers haut du
    pignon) ; sur un long pan, la pointe d'un pignon coupée ; Claude qui dit « demi-croupe » le propose aussi, sans haut lu ou quand le
    haut lu ne le contredit pas. Une croupe proposée hier le reste. Le moteur relit la coupe sur la mesure (`boutsDesMurs`
    « demi-croupe », `pointesDesMurs`) ;
  - **étalons 28 et 29** (cul de geai en enduit ; en brique, faîtage débordant, de biais) : l'É7 propose le cul de geai sur le 28 ; le 29
    reste le cas difficile (mur à confirmer, il ne se propose qu'avec Claude). Bancs des façades inchangés sur les étalons d'avant.

### Corrigé

- Fumée, cocher une proposition de l'audit (points 117 à 119 et ceux qui cochent une ligne) : le script attend la fin de la mesure des
  façades, que la lecture de Claude relance après l'accord, avant de chercher la ligne. Cherchée pendant la mesure, la liste se refaisait
  sous elle et la recherche des niveaux à ouvrir restait suspendue 30 s (point 119, Fumée de la nuit de la 5.9.0, run 41916988940,
  moyen clair ; reproduit en local une fois sur deux). Aucun délai allongé, aucune vérification retirée ; rien ne change dans
  l'application.
- Façades, É6 (silhouette lue), suites de la végétation :
  - le haut lu ne plonge plus au droit d'un poteau peint en haut du mur (le colombage vert du pignon gauche d'AE 101) : un creux de cinq
    colonnes au plus, plus bas que ses deux voisines de 5 % de la largeur, n'est pas lu (un haut de mur n'a pas de tel creux) ;
  - le bord d'un aplat peint (un poteau sur l'enduit) n'est plus pris pour du feuillage : le feuillage change d'une rangée à l'autre,
    le bord d'un aplat non ;
  - la couronne d'un arbre ne se lit plus comme un toit dans la bande au-dessus de l'égout (étalon 27 : « une seule rampe » devient
    « triangle ») ; une bande sans végétation garde sa lecture, et le toit proposé par l'audit avec elle.
- Façades, É5 (calage du mur) : l'égout ne se pose plus sur le bord bas d'une bande peinte sous le pignon (étalon 27 : 25 cm trop
  bas, avec l'arbre comme sans lui). Le calage fin écarte un égout que surmonte une bande d'une autre teinte, mince, puis de nouveau
  le mur ; il juge celui qui a cette bande juste sous lui là où le mur reprend.

### Modifié

- Façades, É5 (calage du mur) : **le gabarit se pose bas sur bas, à l'échelle de la largeur** (décision du propriétaire, 4 novembre
  2026 : « le positionnement du gabarit ne fonctionne pas »). Son sol sur le sol trouvé, ses bouts sur les bouts trouvés, une seule
  échelle tirée de la largeur, la même en hauteur ; il ne se tend plus entre l'égout et le sol trouvés, ce qui faisait de la hauteur
  du mur le levier de tout le haut (à AE 101, l'égout de l'appentis à 2,4 m, les pointes des pignons à 7,5 m : l'égout trouvé sur la
  gouttière, 80 cm trop haut, montait la pointe de droite de 2,4 m). La même pose partout : l'image de l'É5 et des photos, la silhouette
  que lit la détection, le toit par la silhouette, les parties basses, le diagnostic de forme (É7), le bilan et le geste « Ajuster
  l'égout et le sol ». Son égout ne pose plus rien : il **contrôle l'égout trouvé**, l'écart se dit à l'É5 en centimètres, et l'É5 est
  à confirmer au-delà de 3 % de la largeur. Banc : poses de l'É5 inchangées (43/49 justes, 344/344 fausses refusées, 83/86 justes à
  2 %), une É5 « ok » sur un mur faux (13, repères) devenue à confirmer ; silhouette posée à 2 % 40/46 → 39/46 (pignons 11, 22 et 24
  gagnés quand l'égout est trouvé à 1 ou 2 % près ; perdus 11, 13 et 15, assemblages étirés par une focale supposée ou une distorsion,
  et 19, un bout faux : `MD/spec-facade-calage-audit.md` §4 É5).

### Corrigé

- Façades, É6 (silhouette lue) : le haut lu ne monte plus dans un arbre. Des feuilles et des trous de ciel mêlés ont en moyenne la teinte
  d'un enduit clair, et le haut lu grimpait dans le feuillage devant le pignon (façade sud d'AE 101). Une case de cinq pixels verte et
  texturée est du feuillage ; une colonne dont le haut est sous du feuillage n'est pas lue (elle compte contre `silhouetteColonnesMin`),
  l'É6 dit « Haut masqué par la végétation sur n % des colonnes », l'É7 et le bilan gardent le gabarit là. Une peinture verte
  (colombages, volets, rives) est un aplat : elle reste du mur. Nouveau réglage `facades.enchainement.vegetationPartMin` (0,5).

### Ajouté

- Étalon 27 (`27-arbre-devant-pignon`) : un pignon derrière un arbre dont la couronne, trouée de ciel, couvre le haut du pignon, avec
  bandeaux et volets peints en vert foncé. Le générateur sait peindre un arbre (`type: 'arbre'`) ; les 27 autres scènes ne bougent pas.

## [5.9.0] — 2026-11-04

Version **mineure** au sens de `MD/RELEASE.md` : une travée ouverte, ses poteaux et son garde-corps se posent aussi sur un corps fermé
(#569) ; le point 132 de la fumée est accéléré, sans toucher au code de l'application (#570). Aucune quantité ni aucun export de la
démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste celle de la 5.8.0 ; preuve
forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités, `moteur-piscine-pergola.json` et
`glb-structure.json` sont identiques. Schéma inchangé (14) : aucun ordre de la plateforme au-delà de celui de la 5.8.0 (backprod#253 et
`setup.php`). Fumée complète lancée en parallèle (Fumée de la nuit, run 41916988940), livraison sans l'attendre par décision du
propriétaire ; un point rouge donnera une 5.9.1 ; requêtes inchangées depuis la 5.8.0 (ni `deploy/` ni les descriptions des sujets, ni
l'image envoyée à Claude : #569 ne touche que le Mode Toit et la Vue 3D), vérifiées sans la mesure (run 41916992945 : 9 sur 9, 0,030 $).
Résultat de cette fumée : 575 passés sur 576 joués ; seul le point 119, en moyen et thème clair, a échoué (« cocher » au-delà de
30 s) : une course du script de fumée, pas un défaut de l'application, corrigée par `claude/fumee-119-attente`.

### Modifié

- Fumée, point 132 (AE 101 au Mode Toit) : de 465 s à 83 s au bureau (large, clair, sans carte graphique). La mesure
  (`FUMEE_TEMPS=1`) montre que le code de chaque geste reste court (13 à 100 ms, « Valider » 150 à 250 ms) et que le temps part
  dans les images de la Vue 3D en qualité Normale, rendues par le processeur : chaque geste en attend une, chaque glisser autant que
  de pas. Le point passe la Vue 3D en Économe (la préférence de l'appareil, comme le lot `ci`) et place le bow-window d'un seul
  glisser mesuré au lieu de six ; aucune vérification n'est retirée, le délai ne change pas.

### Ajouté

- Mode Toit, travées : **une travée ouverte agit aussi sur un corps fermé** (décision du propriétaire, 4 novembre 2026 : « un garage
  dont on retire la porte pour en faire un abri ouvert »). Sur une travée « Ouvert, sur poteaux », « Poteaux et garde-corps » ou
  « Ouvert, sans rien », la partie de mur disparaît ; des poteaux portent le toit à ses bouts et à entraxe (un garde-corps entre eux s'il
  en a un), un plafond ferme le dessous du toit, le sol couvert reste. Le relevé de façade, ses baies, les fenêtres et le soubassement ne
  se posent pas sur la partie ouverte. Sans champ nouveau (schéma 14). Un corps sans travée ouverte se dessine comme avant.
- Fumée : point 133 (le garage de l'étalon 25 ouvert sur poteaux sur la rue, validé, Ctrl+Z).

## [5.8.0] — 2026-11-04

Version **mineure** au sens de `MD/RELEASE.md` : l'É3 dit l'objectif de chaque photo, EXIF ou non (#564) ; le Mode Toit modifie
l'existant (appentis ouvert, pente, faîtage, débord, couper et réunir des corps, lucarnes, pans ; #565) ; un mur se pose en travées
avec recul, un bow-window peut n'avoir pas de toit propre, un retour d'angle et des pignons replacés (#566). Aucune quantité ni aucun
export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste celle de la
5.7.0 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités,
`moteur-piscine-pergola.json` et `glb-structure.json` sont identiques. **Schéma 14** (migration 13 → 14 identité), accepté par la
plateforme (bertrandra/backprod#253, migration `Version20261104090000`) : appliquer backprod puis `setup.php` en production **avant** de
déposer cette livraison de Plan. Fumée complète lancée en parallèle (Fumée de la nuit, run 41892042656), livraison sans l'attendre par
décision du propriétaire ; un point rouge donnera une 5.8.1 ; requêtes inchangées depuis la 5.7.0 (ni `deploy/` ni les descriptions des
sujets, ni l'image envoyée à Claude : #564 ne change que ce que l'É3 dit), vérifiées sans la mesure (run 41892046252 : 9 sur 9, 0,036 $).
Résultat de cette fumée : 569 passés sur 570 joués ; seul le point 132 (Mode Toit), en large et thème sombre, a dépassé son délai de
400 s (trop lent au bureau, sans défaut de fonction : il passait dans les cinq autres couples), accéléré par #570 (5.9.0).

**Schéma 14** : la plateforme doit l'accepter **avant** la livraison de Plan qui l'écrit (bertrandra/backprod#253, migration
`Version20261104090000`, à appliquer en production d'abord). Un document n'est écrit au 14 que s'il porte une travée ou un bow-window sans
toit propre ; la migration 13 → 14 est l'identité (un ancien fichier s'ouvre identique).

### Ajouté

- Mode Toit (Vue 3D), schéma 14 : **un mur en travées**. « Travée » (onglet « Façade ») pose sur le mur regardé d'un corps un tronçon
  qui a sa nature (mur plein, ouvert sur poteaux, poteaux et garde-corps, ouvert sans rien) et, pour un mur plein, son recul sous le toit
  (0,25 à 1 m) : le toit reste continu, son débord grandit d'autant, le pied du corps, ses fenêtres et ses pignons reculent avec le mur.
  Sur la rive basse d'un appentis, une travée pose un garde-corps (deux lisses, des barreaux) entre les poteaux. Une travée se choisit par
  sa pastille, se règle dans le même panneau, ses deux bords se tirent à la poignée, elle se retire.
- Mode Toit : **le retour d'un auvent à l'angle** (« Retour d'angle », à gauche ou à droite) : un second appentis lié, en équerre,
  même largeur, même égout, même faîtage ; les deux pans se coupent en arêtier sur la diagonale, la rive basse est continue, un poteau
  porte l'angle. Sans champ nouveau : deux corps liés se reconnaissent à leurs murs hauts qui se rejoignent.
- Mode Toit, schéma 14 : **un bow-window sans toit propre** (« Sans toit propre (sous un auvent) ») : ses murs se ferment à leur
  hauteur, le toit de l'auvent le couvre.
- Changer la forme d'un corps garde ses pignons à leur place relative le long de leur mur quand le corps change de dimensions sans
  tourner (ils étaient perdus).

- Mode Toit (Vue 3D) : **modifier ce qui existe avec les gestes de l'ajout** (demande du propriétaire, 4 novembre 2026). Un corps, même
  seul, se choisit par sa pastille et se règle dans le même panneau : ouvert sur poteaux ou fermé, et le retrait des poteaux ou du mur,
  pour un corps à un pan (préau, abri, garage en carport) ; pente ; sens du faîtage ; débord à l'égout. L'onglet « Toit » dit la forme
  en place (vignette enfoncée). Une lucarne change de type sur les vignettes qui la posent ; lucarne, fenêtre de toit et panneau
  changent de pan. Changer la forme d'un corps garde ce qui est posé dessus quand cela tient (pignons, même sur un toit plat ; souches ;
  lucarnes, fenêtres et panneaux sur un toit en pente). « Couper le corps en deux » (au bord d'un pignon, le volume du pignon restant
  entier, sinon au milieu ; les deux parties gardent le même toit, bord à bord) et « Réunir avec le corps voisin ». Chaque réglage est un
  pas de la session (Ctrl+Z), interdit en lecture seule, et fige le toit : la lecture automatique ne
  l'écrase plus. Le moteur des toits ne change pas (AE 101 identique) ; aucun champ nouveau, schéma inchangé (13).
- Fumée : points 131 (le garage de l'étalon 25 passé en carport, Ctrl+Z et Ctrl+Y, validé) et 132 (AE 101 retouché : corps principal en toit
  plat sous ses deux pignons, auvent ouvert, bow-window dessous qui le porte, retour du porche) ; `FUMEE_ECHELLE` règle la densité des captures.
- Façades, É3 (redressement) : chaque photo dit si elle a une focale EXIF ou non, d'après ce que la chaîne a réellement pris (l'EXIF ;
  sinon le champ lu sur les points de fuite, noté pour l'appareil, ou supposé à 67°). Dans Admin › Calibrer la détection, la vignette de
  la photo et l'É3 ouverte disent « Avec EXIF (focale 26 mm éq.) » ou avertissent « Sans EXIF : focale supposée (67°). Le redressement
  par les points de fuite peut être faux ; posez quatre repères » (une photo redressée par ses repères n'a que l'information). Quand l'É3
  n'atteint pas son objectif, son résumé le dit pour chaque photo sans EXIF. Aucun calcul ne change.

### Corrigé

- Vue 3D : sous un appentis ouvert, la photo d'un relevé, ses baies et le soubassement ne se posent plus dans le vide (un garage passé en
  carport gardait sa porte peinte sur un mur absent) ; pas de poteau devant un bow-window que le toit de l'appentis couvre, ni entre lui et le bout de l'appentis
  qu'il approche à moins d'un entraxe (il porte ce bout). Sur un toit plat, un pignon se ferme sous ses noues (il restait ouvert par-derrière). Le débord
  d'un corps lu ou réglé (`bords.debordEgoutM`, `saillieRiveM`) est enfin dessiné ; sans lui, le dessin d'avant (35 cm, 20 cm).

## [5.7.0] — 2026-11-04

Version **mineure** au sens de `MD/RELEASE.md` : les étalons des façades entrent dans Admin › Calibration (#558), avec leurs projets de
démonstration et la vérité de l'É5 (#559) ; la fumée et les tests passent sur les étalons (#560) ; l'É5 est « à confirmer » quand le mur
continue sous le sol posé (#561, nouvel objectif `facades.enchainement.murSousLeSolMax`). Aucune quantité ni aucun export de la
démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste celle de la 5.6.0 ; preuve
forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités, `moteur-piscine-pergola.json` et
`glb-structure.json` sont identiques. Schéma inchangé (13) : aucun ordre de la plateforme au-delà de celui de la 5.6.0. Fumée complète
lancée en parallèle (Fumée de la nuit, run 41798971397), livraison sans l'attendre par décision du propriétaire ; un point rouge donnera
une 5.7.1 ; requêtes inchangées depuis la 5.6.0 (ni `deploy/` ni les descriptions des sujets, ni l'image envoyée à
Claude : #561 ne change que le verdict de l'É5), vérifiées sans la mesure (run 41798975466 : 9 sur 9, 0,037 $).

### Corrigé

- Façades, É5 (calage du mur) : une pose dont le sol tombe dans le mur (la matière du mur continue sous lui, sur l'appui des fenêtres
  par exemple) est à confirmer, avec « le mur continue sous le sol posé : le pied est plus bas, tirez le sol ». L'étalon 00 (photo sans
  EXIF au téléobjectif, sol à 13 % de la largeur) se disait « fait ». Nouvel objectif `facades.enchainement.murSousLeSolMax` (0,5),
  posé sur les 27 étalons avec et sans capteurs ; seul l'étalon 00 change d'état, le banc, `calage-e5.ts` (avec et sans capteurs) et
  `egout-sol.ts` sont identiques.

### Modifié

- Tests et fumée : les cas de calibration des points 100, 101, 103, 126 et 127 et la maison photographiée de
  `facadesAutomatiques.test.ts` viennent du catalogue des étalons (`casEtalon`, `etalonPourLAudit`) au lieu d'être écrits ou peints à la
  main : un gabarit recopié, une photo et une maison de moins à tenir. Aucun comportement de Plan ne change.

### Ajouté

- Admin › Calibrer la détection, étalons de synthèse : **« Créer le projet de démonstration »** pour huit étalons (02, 07, 16, 20, 22,
  23, 25, 26). Le bâtiment se pose autour du mur photographié selon une règle fixe (deux pans à 40°, faîtage parallèle au mur, 9 m de
  profondeur ; un mur pignon garde son pignon, une rampe devient un appentis ; une partie basse est un appentis adossé à la partie haute,
  sa rive basse côté rue, sa rive haute sous l'égout haut, et devient son volume) ; un projet de synthèse, sans lieu (ni orthophoto, ni LiDAR) ; la façade
  se mesure par le chemin de l'audit et s'écrit par sa validation V4. Le projet s'enregistre dans les démos de l'admin (sous le nom de
  l'étalon, un seul par étalon) et s'ouvre dans l'atelier : plan, Vue 3D, relevé. Rien n'est ajouté au dépôt.
- Étalons de synthèse : la vérité de l'É5 (le mur vrai sur l'assemblage) se calcule à chaque rejeu, depuis les coins vrais des photos,
  par le même chemin que la chaîne ; l'É5 d'un étalon se dit juste ou faux contre elle (sauf les objectifs déformants 13 et 14).

### Ajouté

- Admin › Calibrer la détection : les **étalons de synthèse**. Les 27 scènes du banc des façades (celles sur lesquelles Plan juge le
  calage, les étapes É1 à É11 et la lecture de Claude) sont listées à part des cas réels, avec ce que chacune éprouve (étapes, pignon,
  parties basses, biais, vues). Une scène s'ouvre comme un cas : ses photos se dessinent dans le navigateur (les pixels du banc, au bit
  près), et elle se déroule de É1 à É11 comme dans l'audit (GPS, boussole et EXIF d'un téléphone). Rien ne s'enregistre : ni le cas, ni sa
  validation ; un étalon ne compte pas dans « Mesurer et calibrer ». Le paquet ne porte que les descriptions des scènes, chargées avec
  l'écran de calibration.
- Le catalogue des étalons (`npx tsx .claude/skills/facades/scripts/etalons.ts [mots]`) : la fiche de chaque scène, lue d'elle, pour
  choisir un étalon existant avant de fabriquer une scène ou un projet de test (règle écrite dans `CLAUDE.md` et le skill `facades`).

### Modifié

- Le générateur des façades de synthèse passe de `tests/banc/facades/synthese.ts` à `src/facade/banc/synthese.ts`, sans changer une
  ligne de calcul : le banc, `calage-e5.ts` (avec et sans capteurs) et `egout-sol.ts` donnent les mêmes tableaux, colonne des temps
  exceptée. Aucune quantité ni aucun export ne change.

## [5.6.0] — 2026-11-03

Version **mineure** au sens de `MD/RELEASE.md` : un mur peut porter plusieurs parties basses, au bout comme au milieu (#543, #546) ;
le calage fin ne prend plus l'ombre du débord pour l'égout (#547) ; la revue des étapes É1 à É11 des façades (#544, #548 à #554) donne
« Confirmer le mur » (V1), le doute du mur qui se transmet, Ctrl+Z et Ctrl+Y sur les gestes de la façade avant V4, les ouvertures
relues avant V4 (V3), la lecture de Claude par l'enchaînement de l'audit, « Revenir au mur cherché » et la fin du faux désaccord de
Claude à l'É5. Aucune quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version
(la date de build reste celle de la 5.5.0 ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les
quantités, `moteur-piscine-pergola.json` et `glb-structure.json` sont identiques. **Schéma 13** (migration 12 → 13 identité), accepté
par la plateforme (bertrandra/backprod#252, migration `Version20261103090000`) : appliquer backprod puis `setup.php` en production
**avant** de déposer cette livraison de Plan. Fumée complète (Fumée de la nuit, run 41711980343) ; requêtes vérifiées contre l'API Claude
avec la mesure des façades et les dix demandes de l'assistant (run 41707163657 : 9 sur 9, garde-fou de la lecture vert après sa relance
unique, totaux jugés sur le corpus de référence et scènes 24 à 26 contre leur propre plancher, #556 ; dix listes justes sur dix, 0,60 $
relance comprise).

### Ajouté

- Façades (calibration) : « Revenir au mur cherché ». Un mur posé à la main sur une photo (et sur les photos de son assemblage)
  s'en va d'un geste, que Ctrl+Z défait ; au rejeu, la chaîne cherche le mur de nouveau. Avant, seuls « Retirer les repères » ou
  fermer sans enregistrer le permettaient. Aucune quantité ni aucun export ne change.
- Façades (audit et calibration) : Ctrl+Z défait un geste sur la façade avant sa validation (V4), et Ctrl+Y le refait : « Confirmer
  le mur » et son retrait, mais aussi les quatre repères, le mur tiré, l'échelle et « Revenir à l'automatique ». La façade se rejoue,
  rien n'entre dans le projet ni ne le marque modifié. Les boutons « Annuler le geste » et « Rétablir » sous la barre de la façade font
  de même au doigt. Sans geste à défaire, ou hors de l'écran de la façade, Ctrl+Z reste celui du projet ; après la validation, il
  défait la validation, comme avant. Aucune quantité ni aucun export ne change.
- Façades (audit et calibration), point V1 : « Confirmer le mur ». Le mur que la chaîne a posé se confirme d'un geste, sur la ligne
  du mur de l'audit comme dans l'étape É5 ouverte de la calibration (la même commande) : l'étape É5 dit alors « confirmé par vous »,
  un état à part de « faite », et ce que la silhouette en disait reste écrit en note. La confirmation survit au rejeu de la façade, tant
  que le mur est le même, et s'écrit avec la façade à sa validation (V4), dans le même pas d'historique (Ctrl+Z défait les deux). Le
  même bouton la retire. Aucune quantité ni aucun export ne change.

### Modifié

- Workflow « Vérifier l'API Claude », garde-fou de la lecture des façades : les totaux se jugent sur les 22 scènes du corpus de
  référence, celles où leurs planchers ont été fixés ; une scène entrée au banc ensuite (24, 25, 26) se juge par scène contre son propre
  plancher, figé à sa première mesure (`tests/fixtures/facades/lecture-5.1.0/scenes-ajoutees.json`), et sa lecture ×1 est dite à part.
  La scène 26, nouvelle, faisait passer la précision ×1 au total sous son plancher (97,9 %) quand les 22 scènes du corpus étaient à
  100 % (run 41699049779). Aucune requête, aucune quantité ni aucun export ne change.
- Façades (audit) : « Revenir à l'automatique » garde la largeur réelle tapée pour l'échelle ; les repères et le mur tiré s'en vont
  comme avant. Elle se perdait sans que rien ne le dise. Façades : les textes de l'écran de calibration (« Rejouer » nomme aussi l'É7
  et l'É10, le mode « IA » ne promet plus une pose candidate ni des zones de colombage qui n'agissent pas) et le contrat de l'É5 (l'arbitre
  des poses ne tourne que sur l'assemblage des repères) disent ce que fait le code. Aucune quantité ni aucun export ne change.
- Façades (audit et calibration), états des étapes (revue des étapes, lot 5) : l'É6 se juge sur le haut qu'elle rend, celui que l'É7
  lit (lu sur au moins la moitié des colonnes), et plus sur le mot de la bande au-dessus de l'égout, qui reste une information ; un
  pignon ombré par un arbre, dont le haut est lu, n'est plus dit « hors cadre ». L'É2 ne compte que les photos lisibles : une photo
  illisible seule la laisse à confirmer, et l'É3 conseille alors de retirer ou de reprendre la photo plutôt que d'y poser des repères.
  Sans photo, l'enchaînement de l'audit se déroule aussi (l'É2 le dit). L'É3 montre chaque photo redressée comme l'assemblage la prend
  (ses repères, sinon ses points de fuite). Quatre seuils quittent le code pour les réglages de l'enchaînement
  (`regles/facades/enchainement.json` : verticales de l'É3, colonnes et bande de l'É6, masque de la fusion à l'É8), sans changer de
  valeur. L'objectif de l'É10 dit ce que l'étape vérifie : elle compte les propositions du diagnostic (sautée sans proposition, à
  confirmer sinon) ; le moteur des toits les relit à l'avant/après. Aucune quantité ni aucun export ne change.
- Façades (audit) : la lecture de Claude passe par le même enchaînement que dans la calibration. À son arrivée, la façade se mesure de
  nouveau avec elle et sa barre se refait : l'étape É5 dit la pose que Claude lit, l'É7 le diagnostic avec ses pointes, l'É9 l'accord de
  ses boîtes avec la détection. La validation (V4) écrit ce que la barre montre : les ouvertures de cet accord (les détails lus par
  Claude compris) et la forme du bilan, ses pointes comprises. Avant, l'audit refaisait ces calculs à part, sur d'autres entrées, et sa
  barre restait celle d'avant Claude. Aucune quantité ni aucun export ne change.
- Façades (audit et calibration), point V3 : les ouvertures trouvées se relisent toujours avant de valider la façade. « Relire les
  ouvertures » ouvre l'éditeur du mur sur ce que la détection a trouvé : gardez, corrigez, ajoutez, retirez, puis « Garder ces
  ouvertures ». L'étape É9 n'est faite qu'après ce regard, tant que la détection rend les mêmes ouvertures ; la validation (V4) écrit
  celles que vous avez gardées. Ctrl+Z défait la relecture avant V4. En calibration, la vérité d'un cas ne se remplit plus de la
  détection d'elle-même (« Partir de la détection » le fait d'un geste) : l'É9 ne se compare plus à sa propre sortie. Aucune quantité
  ni aucun export ne change.
- Façades (audit et calibration) : le doute du mur se transmet. Tant que l'étape É5 est à confirmer, les étapes qui lisent le mur
  (silhouette, forme, texture, ouvertures, toit, bilan) et qui atteignent leur objectif sont à confirmer elles aussi, avec « Dépend du
  mur à confirmer (É5) » ; dans l'audit, leur ligne renvoie au mur. Le mur confirmé, elles retrouvent leur propre verdict. Avant, une
  façade posée sur un mur faux de plusieurs mètres montrait une barre presque verte.
- Façades (audit et calibration) : le calage fin ne prend plus la limite de l'ombre d'un débord pour l'égout. Sur un mur dont la
  partie haute est plus étroite que ses parties basses, l'égout était posé au bord de l'ombre, 25 cm trop bas, et l'étape É5 le disait
  « fait » ; un égout qui borde, là où il longe le mur, une bande du même mur plus sombre au-dessus de lui est maintenant écarté. Banc
  des façades : la scène `26-partie-haute-au-milieu` retrouve l'ombre de son débord (coins à 3 cm au plus, É5 « faite » à 0,99), les
  26 autres identiques au bit près. Aucune quantité ni aucun export ne change.
- Façades : une partie basse au milieu d'un mur (un corps bas entre deux corps hauts, lue sur la silhouette du plan et du LiDAR) est
  un volume à part, sur toute la profondeur du bâtiment, d'équerre à la façade : la partie haute se coupe en deux, chacune avec son
  toit et son débord, et les fenêtres automatiques, le plan et la Vue 3D suivent ces volumes. Elle ne découpait pas le bâtiment.
  L'éditeur de la façade dit qu'elle va sur toute la profondeur. Un mur en L et un mur à une partie basse à chaque bout gardent leurs
  volumes au bit près. Schéma inchangé (13). Aucune quantité ni aucun export ne change.
- Façades (audit et calibration) : un mur dont la partie haute est au milieu, avec une partie basse à chaque bout (une maison entre
  un garage et un appentis), s'écrit avec ses deux parties basses, lues sur la silhouette du plan et du LiDAR. Il s'écrivait sans
  aucune : le relevé ne connaissait qu'une partie basse, à un bout. Une partie basse au milieu du mur se lit aussi, quand la silhouette
  y descend. La surface du mur retire chacune, la Vue 3D pose la photo sur le mur à deux marches et coupe le bâtiment en trois volumes
  (sans les corps du toit), les baies dans le vide au-dessus d'elles ne sont pas posées, et l'éditeur de la façade corrige chacune
  (décrochement, égout bas). L'étape É5 lit la teinte du mur sous le haut de chaque bout quand aucun ne monte à l'égout, et juge
  l'égout aussi sur la seule partie haute (et, sans bout à l'égout, sur chaque partie basse) : une pose juste est « faite », un égout
  décalé de 5 % est refusé, et le garage pris pour le mur entier par la calibration sans capteurs n'est plus dit « fait » mais « à
  confirmer ». **Schéma 13** : seul un
  fichier qui porte un mur à plusieurs parties basses s'y écrit ; un mur en L s'écrit comme avant (`partieBasse`), et un fichier
  d'avant s'ouvre avec les mêmes nombres (migration 12 → 13 identité). La plateforme doit accepter le schéma 13
  (bertrandra/backprod, `project_schema_versions`) et être déployée **avant** une livraison de Plan qui l'écrit. Banc des façades :
  scène `26-partie-haute-au-milieu` ajoutée, les 26 autres identiques au bit près. Aucune quantité ni aucun export ne change.

### Corrigé

- Façades (audit), étape É5 : la lecture de Claude ne dit plus que « les deux chemins divergent » quand il pose le mur là où la chaîne
  l'a posé. Dans l'audit, Claude lit le mur déjà redressé et cadré (ses angles aux bords de l'image) ; ses angles se lisaient pourtant
  en parts de l'assemblage, ce qui posait le mur sur toute sa largeur (de 39 à 95 % d'écart sur les scènes du banc). Ils reviennent
  maintenant sur l'assemblage par le mur que l'image cadrait et l'égout qu'elle porte. Les boîtes des ouvertures (É9), dans le repère
  du mur, n'avaient pas ce défaut. Aucune image ni requête envoyée à Claude ne change, aucune quantité ni aucun export.

### Retiré

- Façades : la pose de Claude et ses zones de colombage ne sont plus des candidates de l'arbitre du calage (décision du propriétaire,
  3 novembre 2026) : dans l'audit, Claude lit le mur retenu, et son accord se mesure dans ce cadre. Aucun appelant ne les passait ; la
  règle du colombage et ses deux réglages (`facades.ia.colombagePartMax`, `facades.ia.colombageTolerancePart`) partent avec elles, ce
  qui change l'empreinte des réglages du run d'une façade. Le contrat des étapes perd deux options manuelles jamais écrites :
  « désigner les pointes sur l'image » (É6) et « recadrer » (É8). Aucune quantité ni aucun export ne change.

## [5.5.0] — 2026-11-03

Version **mineure** au sens de `MD/RELEASE.md` : la détection des ouvertures lit la façade fusionnée entière, pignons compris (#533) ;
la calibration et l'audit ne font plus qu'une orchestration, dans un cadre fait de la silhouette du mur plus 3 % (#534) ; les étapes
s'appellent É1 à É11 (#535) ; en Mode Toit, les objets du toit ont leurs vignettes et la caméra se cadre sur l'élément choisi (#536) ;
l'étape É5 se cale sur les pignons (#537) ; la vue de la façade se dessine au téléphone (#538) ; une fenêtre sous le pignon d'un corps
voisin va sur la façade de ce mur (#539) ; un mur en L s'écrit avec sa partie basse (#540). Aucune quantité ni aucun export de la
démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste celle de la 5.4.1 ; preuve
forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités et `glb-structure.json` sont identiques.
Schéma inchangé (12). Fumée complète (Fumée de la nuit, run 41601785149).

### Modifié

- Façades (audit et calibration) : un mur en L (une partie basse, garage ou extension, dans l'alignement du mur) s'écrit avec sa partie
  basse, lue sur la silhouette du plan et du LiDAR : la position du décrochement et l'égout bas, corrigeables dans l'éditeur comme
  avant. Elle s'écrivait toujours vide depuis que la photo ne la posait plus. L'étape É5 lit chaque angle sous le haut de la silhouette
  à ce bout : un mur en L posé juste n'est plus dit « à confirmer ». En Vue 3D, une fenêtre au-dessus de la partie basse, dans le vide,
  n'est plus posée. Banc des façades : scène `25-mur-en-l-garage` ajoutée. Aucune quantité ni aucun export ne change.
- Façades (audit et calibration) : une fenêtre lue sous le pignon d'un corps voisin qui prolonge la façade va, à la validation (V4),
  sur la façade du mur de ce corps quand il en a une : dans son repère, comme détectée, sans rien changer d'autre à cette façade, et
  dans le même pas que la façade validée (Ctrl+Z défait les deux). La Vue 3D la pose alors sur ce mur. Quand ce mur n'a pas de façade,
  la fenêtre reste sur la façade photographiée et l'étape É9 le dit : « sur le pignon du corps voisin — pas de façade sur ce mur :
  relevez-le pour les y poser » ; aucune façade n'est créée (elle effacerait les fenêtres automatiques du mur). Aucune quantité ni aucun
  export ne change.
- Façades : les étapes s'appellent désormais É1 à É11, sans « bis » (É1 Préparation, É2 Prises, É3 Redressement, É4 Assemblage,
  É5 Calage du mur, É6 Silhouette lue, É7 Diagnostic de forme, É8 Texture, É9 Ouvertures, É10 Toit, É11 Validation), dans
  l'orchestrateur et à l'écran : la frise et chaque étape ouverte de la calibration, la barre de progression (« É5 Mur », « É3–É4
  Image ») et les lignes de l'audit (« É5 Mur posé : … »), où une étape cachée garde son numéro. Les points de validation V1 à V4
  gardent leur nom.
- Façades : la calibration et l'audit sont le même code et la même orchestration ; l'audit n'en cache qu'une part (décision du
  propriétaire). Admin › Calibrer la détection rejoue un cas exactement comme l'audit traite ses photos : mêmes entrées (les prises de vue
  de l'audit, les repères et le mur posés à la main), même redressement, même assemblage, même gabarit, même lecture du haut du mur, même
  détection, dans le même cadre. Un résultat de calibration dit donc ce que fera l'audit. Ne diffèrent que d'où viennent les photos, la
  mesure contre la vérité (en plus, sans rien changer), la fin (l'audit écrit la Façade à la validation, la calibration n'écrit rien) et
  ce qui s'affiche. Le résultat de l'audit ne change pas.
  - Admin › Calibration : « Rejouer » cherche les coins comme l'audit (un mur posé à la main reste) ; le bouton « Retrouver le mur sur
    toutes les photos » disparaît, il faisait ce que fait désormais « Rejouer ». L'étape É5 montre le mur retenu par la chaîne de l'audit
    et ce qu'il explique de l'image ; la recherche du mur propre à la calibration et son arbitre s'en vont. La pose des angles de Claude
    s'y mesure sans changer le mur ni l'état de l'étape.
  - Un cas tiré d'un audit garde le côté du contour, le contour et la prise de vue de chaque photo, pour être rejoué tel que l'audit l'a
    lu ; un cas d'avant se rejoue comme des photos importées. Un mur vrai ou une réponse de Claude enregistrés sur l'ancienne chaîne
    (version 10) le disent au rejeu.
- Façades (audit et calibration) : la détection lit la façade dans un cadre fait de la silhouette entière du mur, avec une marge de 3 %
  de sa largeur de chaque côté, et non plus le mur entre ses deux bouts. Le pignon d'un corps voisin qui prolonge la façade au-delà d'un
  de ses bouts est lu, ses fenêtres comprises ; rien n'est cherché hors de la silhouette. La texture, la Façade écrite et la Vue 3D ne
  changent pas ; une baie retrouvée au bout d'un mur peut s'ajouter. L'étape É9 et la toile d'annotation montrent ce cadre.

### Corrigé

- Façades (audit et calibration), étape É5 : quatre repères posés sur une photo ne rendent plus le mur « posé à la main ». Ils
  redressent la photo ; le mur que la chaîne cherche ensuite sur leur assemblage est jugé comme un mur trouvé seul : une pose supposée
  d'après le plan, un égout ou un sol non lus, ou une silhouette qui ne l'explique pas le laissent « à confirmer » (« Mur cherché sur
  l'assemblage de vos repères… »). Avant, ouvrir « Placer 4 repères » puis « Appliquer » suffisait à rendre faite une É5 sur un mur faux
  de plusieurs mètres. Un mur tiré à la main que sa silhouette n'explique pas est désormais « à confirmer », sa raison dite, au lieu de
  « fait ». Dans l'audit, « Appliquer » n'écrit les repères que si vous les avez déplacés. Aucune quantité ni aucun export ne change.
- Fumée, point 91 (arbres d'EZ-tree) : la mesure « été » se prenait à la date par défaut de la Vue 3D, celle du jour ; un caduc
  étant nu de novembre à mars, le point échouait dans toutes les classes depuis le 1er novembre (Fumée de la nuit des 1er, 2 et
  3 novembre). Elle se prend désormais au 21 juin, posé avant la mesure ; la mesure « hiver » pose déjà le 15 janvier. Rien ne change
  à l'application.
- Vue 3D, « Modifier la toiture », au téléphone : dès que le panneau du mode débordait (un élément posé, son inspecteur), la vue de
  la façade restait vide au-dessus de lui, poignées flottant sur le fond ; replié, le panneau la laissait voir. Un bloc qui défile, au
  fond opaque, posé sur la scène, est composé à part par le navigateur et tenu pour opaque : la scène 3D qu'il recouvrait en partie
  était écartée de l'image entière. Le panneau garde son fond et ne défile plus ; ce qui défile est dedans, transparent. Le point 124
  de la fumée vérifie que la scène est dessinée panneau ouvert. Rien ne change au projet, aux quantités ni aux exports.
- Vue 3D, « Modifier la toiture » : les objets posés sur le toit étaient trop petits pour se voir et se toucher. Les vignettes de
  l'onglet « Sur le toit » montraient la maison entière, où une fenêtre de toit, un panneau solaire ou une jacobine ne faisaient que
  quelques pixels ; elles sont désormais cadrées de près sur l'élément, chacune la sienne (le pignon et la cheminée avaient le même
  pictogramme), toujours dessinées par le code de la 3D. Choisir un élément (sa pastille, un toucher sur la scène, ou le poser) cadre
  la caméra sur lui devant la façade qui le porte, avec un peu de toit autour ; le lâcher (Échap) rend la façade entière, « Vue 3D »
  la caméra d'avant. Au téléphone, une fenêtre de toit choisie fait 52 px de large au lieu de 16.
  - Les poignées d'une fenêtre de toit et d'un panneau solaire flottaient hors du toit, sous l'élément à l'écran : elles sont sur lui.
  - Fumée : point 124 (vignettes de « Sur le toit » et cadrage sur l'élément choisi). Ni le toit, ni Ctrl+Z, ni « projet modifié », ni
    aucune quantité ou export ne changent : le cadrage est un réglage de caméra.

- Façades (calibration, audit de la parcelle, relevé) : la détection des ouvertures lisait le mur coupé au sol et à l'égout, et ne
  voyait jamais une baie de pignon (fenêtre de comble, oculus). Elle lit désormais la façade redressée entière, fusionnée quand
  plusieurs vues se fondent, et cherche dans la silhouette du mur (le gabarit du plan et du LiDAR, pignons compris) : rien dans le ciel
  à côté des rampants ni dans le mur d'un voisin. Une baie de pignon garde sa place dans le repère du mur, au-dessus de l'égout, et la
  Vue 3D la pose quand les corps du toit disent le pignon (elle l'omettait). Sous un mur rectangulaire, rien ne change.
  - Admin › Calibration : l'étape É9 et la toile d'annotation montrent la façade que lit la détection, entière et fusionnée, avec sa
    silhouette par-dessus (la toile montrait le mur coupé à l'égout) ; une baie de pignon s'y annote.
  - Banc des façades : scène `24-pignon-baie-dans-le-pignon` ajoutée (trouvée 6 sur 6, contre 5 sur 6 avant) ; le banc pose le gabarit
    vrai de chaque scène, comme le LiDAR. Aucune quantité ni aucun export ne change.
- Admin › Calibration : les repères posés sur une photo s'enregistrent au dixième de pixel, comme dans l'audit (le même geste donnait
  une entrée différente) ; un cas tiré d'une façade dont la largeur a été corrigée à la main dans l'audit garde cette largeur (il
  reprenait celle du plan, et le rejeu ne mesurait pas le même mur).
- Façades (audit et calibration) : l'étape É4 disait « Fusionnée » pour l'assemblage des photos alors que l'étape É8 pouvait dire
  qu'une vue n'était pas fusionnée ; elle dit désormais « Assemblée » (ou « Assemblage partiel »), et laisse la fusion à l'É8.
- Vue 3D : une ouverture qui commence à gauche du mur n'était pas écartée, contrairement à celle qui dépasse à droite ; elle ne se pose
  plus à cheval sur l'angle.
- Admin › Calibration : « Appliquer le calage et rejouer » rejoue le cas entier ; repris depuis l'É5, il gardait le mur d'avant.
- Façades (audit et calibration), É5 Calage du mur sur un pignon : l'égout d'un pignon n'est plus pris sur les linteaux de l'étage (il
  tombait 48 cm trop bas sur la scène 24 du banc), ni sur la droite qui joint le bas et le haut d'une rampe (le coin haut droit de la
  scène 23 tombait 1,8 m trop haut). Les coins trouvés sans geste par le calage fin passent de 87 à 92 sur 92 au banc des façades ; les
  autres scènes ne bougent pas. Les coins d'un pignon peuvent changer au rejeu (version de la chaîne 13).
- Façades (audit et calibration), É5 : le mur retenu se juge désormais sur la silhouette du gabarit qu'il pose. L'égout se lit tout le
  long de cette silhouette et doit atteindre son seuil : un égout faux ne passe plus « ok » (sur le banc, 176 poses fausses sur 176
  refusées, 87 sur 160 avant ; aucune pose juste refusée). Quand le pignon d'un corps voisin prolonge la façade au-delà d'un de ses
  bouts, l'angle se lit au bout de la silhouette : un mur posé juste n'est plus dit « à confirmer » (score 0,52 → 1). La légende de
  l'É5 dit « Score d’explication par la silhouette ». La recherche du mur, elle, se fait toujours sans le gabarit.

## [5.4.1] — 2026-10-30

Version **corrective** au sens de `MD/RELEASE.md` : un mot hors catalogue lu dans un fichier (pergola et carport, clôture, murs en 3D,
audit reçu, puis piscine) ne fait plus planter l'écran ni n'écrit « undefined » ou le libellé d'un défaut dans un export, il est signalé
et écrit tel quel ; « Ajuster l'égout et le sol » montre la façade assemblée, l'image prise pour la suite ; le plafond conseillé du
workflow « Vérifier l'API Claude » passe à 0,50 $. Aucune quantité ni aucun export de la démonstration ne change : les sept témoins ne
bougent qu'à leur numéro de version (la date de build reste celle de la 5.4.0, le même jour ; preuve forte, sept sur sept,
`tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités et `glb-structure.json` sont identiques. Schéma inchangé (12). Fumée complète (Fumée de la nuit, run 41126779479).

### Modifié

- Workflow « Vérifier l'API Claude » : le plafond conseillé pour la mesure des façades et l'assistant passe de 0,25 à 0,50 $ (une passe coûte environ 0,27 $ depuis la 5.2.0, la relance du garde-fou compte à part).

### Corrigé

- Un mot hors catalogue lu dans un fichier (écrit par une version plus récente, ou abîmé) ne fait plus planter l'écran ni n'écrit
  « undefined » dans un export, comme la couverture de toit en 5.4.0 : Plan le remplace par la valeur d'un objet neuf et le signale une
  fois par mot et par session ; la valeur reste telle quelle dans l'objet et le fichier (ni migration, ni « projet modifié », ni historique).
  - Pergola et carport : un matériau ou un toit inconnu se calcule en bois ou avec le toit de l'ouvrage (« Matériau inconnu (« … »),
    calculé en bois ») ; le CERFA écrit le mot lu, la note de calcul aussi avec ce sur quoi elle est calculée, et l'inspecteur le montre.
  - Clôture : un type inconnu se dessine en palissade (plan, Vue 3D, clôtures du voisinage) ; l'inspecteur le montre, les résumés et le
    dossier de la mairie écrivent le mot lu (comme un parement, une essence de haie ou une ouverture de portail inconnus).
  - Murs en 3D : un matériau vu sur place inconnu se dessine en enduit.
  - Audit reçu (Admin › Audits) : l'origine et la décision d'une proposition s'écrivent telles quelles ; un effet inconnu ne dérange
    plus l'ordre d'écriture des autres ; une ouverture d'un type inconnu reste sans les détails de la façade au lieu de faire planter la
    validation. Les libellés des ouvertures d'un relevé ne disent plus « undefined ».
  Le socle commun est `shell/motsInconnus.ts`, que la couverture de toit utilise désormais aussi.
- Piscine : un réglage hors catalogue (implantation, structure, revêtement, fond, plage, essence de la plage, traitement, chauffage,
  sécurité, local technique) se calculait déjà sur sa valeur par défaut, mais en silence, et la note de calcul, le chiffrage et le
  dossier de mairie écrivaient le libellé de ce défaut. Plan le signale désormais une fois par mot (« Structure inconnue (« … »),
  calculée en coque polyester »), les exports écrivent « mot (inconnu, calculé en … ») et l'inspecteur montre le mot lu ; la valeur
  reste dans l'objet et le fichier.
- Audit de la parcelle et calibration, « Ajuster l'égout et le sol » (geste « quatre repères ») : avec plusieurs photos d'une façade
  assemblées, le geste montrait une seule photo redressée, et le mur tiré ne valait que pour elle, alors que la suite (texture, toit,
  détection) part de l'assemblage. Il montre désormais l'assemblage des photos, l'image prise pour la suite, avec le mur là où la
  chaîne l'y a posé ; le mur tiré revient sur chaque photo assemblée (le même chemin que « Appliquer le calage et rejouer » de la
  calibration) et le rejeu le reprend tel quel. « Revenir à l'automatique » retire aussi ce mur des autres photos. Avec une photo
  seule, ou une photo restée hors de l'assemblage, rien ne change. Ni quantité ni export ne bougent.

## [5.4.0] — 2026-10-30

Version **mineure** au sens de `MD/RELEASE.md` : les textes et la relecture du dossier (lot L5 : pièces écrites rédigées par Claude,
corrigées et validées, « Vérifier avant l'export », photographies DP7 et DP8) et l'assistant en langue naturelle (lot L6). Aucune
quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build
reste celle de la 5.3.0, le même jour ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les
quantités et `glb-structure.json` sont identiques, et le dossier d'un projet sans texte validé aussi. Le schéma des projets passe de 11 à
12 (le champ `dossier` de la parcelle), par une migration identité, et un projet s'écrit toujours au plus petit schéma qui le décrit ; la
plateforme accepte déjà les schémas 7 à 12. Trois corrections y entrent aussi : une couverture hors catalogue dessinée en tuile au lieu
de planter, la question « Mettre à jour le modèle ? » bornée à l'écran, et « Appliquer la liste » de l'assistant soumise au droit
d'écrire le projet.

### Ajouté

- **Assistant en langue naturelle, lot L6** (`MD/spec-lecture-ia-elargie.md` §3.4, §4.7, §5.5, §12.5). Menu Aide › « Demander à
  l'assistant… » (feuille du projet au téléphone) ouvre un dialogue (Z8) : la personne écrit une demande, Claude la traduit en une
  **liste d'étapes** prises dans un **catalogue généré** à l'instant par Plan (les commandes que leur déclaration ouvre à
  l'assistant et que la classe d'écran expose, avec leur état ; les objets du projet ; les champs de l'objet sélectionné, leur valeur,
  leurs bornes et leurs options). Claude propose, le registre exécute : chaque étape est relue contre `commandes.etat` et grisée avec
  sa raison (droits, état du plan, valeur hors bornes, autre objet, lecture seule) ; « Appliquer » exécute les étapes utilisables en
  **une** transaction de l'historique, et un Ctrl+Z rend le projet à l'identique. En lecture seule, seules les préférences
  d'affichage s'appliquent. Rien ne s'enregistre dans le projet ; le schéma ne change pas.
- Usage `assistant` du serveur : ses prompt et schéma générés (`npm run regles:generer`), en sortie structurée, le catalogue mis en
  cache ; au modèle rapide par défaut, réglable dans Réglages › Modèles, compté à part au tableau de la consommation (« Assistant »).
  Les corps des autres requêtes ne changent pas d'un octet.
- Les dix demandes de référence (`tests/fixtures/assistant/`), rejouées hors ligne sur les réponses enregistrées de l'API : dix listes
  justes sur dix (environ 0,0003 $ la demande). Le workflow « Vérifier l'API Claude » sait jouer l'usage `assistant` (neuf requêtes avec le texte du dossier) et,
  case « assistant », les dix demandes, chaque liste jugée.
- `historique.transaction` : plusieurs gestes, une seule étape d'annulation, tout défait si un geste est refusé en route.
- Point de fumée **122** (une demande, sa liste, une étape grisée avec sa raison, « Appliquer », Ctrl+Z).
- **Textes et relecture, lot L5** (`MD/spec-lecture-ia-elargie.md` §3.4, §4.6, §5.4, §12.4). La déclaration préalable (Exporter ›
  « Déclaration préalable… ») gagne ses pièces écrites : la description du cerfa, la notice descriptive et le texte d'insertion
  paysagère. « Rédiger avec Claude » envoie les faits du projet (le terrain, les ouvrages déclarés, l'existant, la clôture, la zone du
  PLU et ses seules règles vérifiées, les protections ; rien du déclarant) par un usage nouveau du serveur, `texte` (une requête, ses
  prompt et schéma générés, en sortie structurée, Haiku par défaut) ; le brouillon revient avec ce que Claude n'a pas pu dire, à côté des
  faits qui l'ont nourri. Vous le corrigez et le validez : **seul un texte validé entre dans le dossier**, à l'identique à chaque export
  (la case C2ZD1 du cerfa, une page « Notice descriptive du projet »). Sans texte validé, le cerfa garde la description calculée et le
  dossier n'a pas de page de notice. Un brouillon rédigé sur un projet qui a changé depuis est dit périmé ; un texte validé ne se
  réécrit jamais seul.
- **« Vérifier avant l'export »** : la relecture du dossier, déterministe et sans Claude, dans le dialogue de la déclaration (et
  résumée par le message de l'export) : ce que le formulaire demande encore, les pièces sans image (DP6, DP7, DP8), un ouvrage en
  limite dont le DP2 ne cote pas la distance, un brouillon périmé ou non validé, un texte validé sur un projet qui a changé, les règles
  du PLU lues et pas vérifiées, les écarts aux règles vérifiées, un projet qui relève du permis. Chaque point dit sa gravité et, quand il
  en a un, le geste qui le règle.
- Les photographies **DP7** (environnement proche) et **DP8** (paysage lointain) : une par pièce, choisie parmi les photos de l'audit de
  la parcelle gardées sur l'appareil (question 2 de la spec) ; elles entrent au dossier et cochent leur case du bordereau. Comme
  l'élévation d'un relevé, elles sortent du document vers l'appareil quand le projet part à la plateforme.
- Le champ `dossier` de la parcelle (textes, brouillons, photographies) : le schéma des projets passe à **12** (migration 11 → 12
  identité ; la plateforme accepte déjà 7 à 12).
- Le serveur, la vérification de l'API (huit requêtes), le réglage du modèle de chaque usage et le tableau de la consommation
  connaissent l'usage `texte` (« Textes du dossier »).
- Point de fumée **121** (rédiger, corriger, valider, exporter ; la relecture, un brouillon périmé).

### Modifié

- Le message de l'export de la déclaration préalable cite les points de la relecture que le formulaire demande (les mêmes phrases
  qu'avant), et dit combien d'autres points elle relève.

### Supprimé

- La liste `manques` du remplissage du cerfa (`export/cerfa13703.ts`) : elle est déplacée dans la relecture avant l'export
  (`export/relecture.ts`), mêmes phrases, même ordre.

### Corrigé

- Une couverture de toit hors du catalogue (fichier écrit par une version plus récente, ou mot inconnu) faisait planter la Vue 3D et
  l'avant / après d'un audit (« … is not a function »). Elle se dessine désormais en tuile, et Plan le signale une fois par mot et par
  session : « Couverture inconnue (« … »), dessinée en tuile ». La valeur reste telle quelle dans l'objet et dans le fichier enregistré
  (ni migration, ni « projet modifié », ni historique) ; l'inspecteur la montre dans « Matériau » au lieu d'afficher « Automatique ».
  Le repli tient dans `three/couverture.ts` (dessin, texture, matière), par où passent la Vue 3D, l'export `.glb` et le relevé.
- **« Mettre à jour le modèle ? » sortait de l'écran.** La question posée à l'ouverture d'un projet enregistré à un schéma ancien
  liste ce qu'apporte chaque migration ; au schéma 12, la liste dépassait la hauteur d'un écran de bureau (900 px) et la boîte,
  centrée, perdait son haut et ses deux boutons hors de la vue, sans défilement (points 85, 86, 109 et 114 de la fumée, en large).
  Une boîte de dialogue tient désormais dans l'écran : la liste défile entre le texte et les boutons, qui restent visibles
  (`.dialogueBoite`, `styles/app.css`) ; au téléphone, la feuille du bas fait de même.
- **« Appliquer la liste » de l'assistant demande le droit d'écrire le projet** (décision du propriétaire du 30 octobre 2026,
  question 24 de `MD/spec-lecture-ia-elargie.md`). Elle se déclarait écriture du projet sans permission : un compte en lecture seule
  pouvait l'exécuter, et Admin › Contrôleurs la rangeait parmi les écritures sans contrôle des droits (point 53 de la fumée). Elle
  porte désormais `projects.write` : sans ce droit, elle est grisée avec sa raison. Un projet en lecture seule pour une autre raison
  n'applique toujours que les préférences d'affichage d'une liste.
- Les prompts de la lecture enrichie d'une façade, du toit lu et de la lecture du jardin restaient lisibles par une adresse directe : le
  modèle `.htaccess` ne refusait que `prompt-analyse.md`, `prompt-facade.md` et `prompt-plu.md`. Il refuse désormais tous les prompts que
  le serveur lit, celui des textes du dossier compris.

## [5.3.0] — 2026-10-30

Version **mineure** au sens de `MD/RELEASE.md` : le toit enrichi (lot L2 : la couverture et sa pose, le débord, le faîtage, la
gouttière, les fenêtres de toit et panneaux lus sur la façade par une troisième requête sur la même image, et proposés au moteur). Aucune
quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la date de build reste
celle de la 5.2.0, le même jour ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités et
`glb-structure.json` sont identiques. Le schéma des projets passe de 10 à 11 ; la migration relit la grande ardoise en losange comme une
ardoise posée en losange (même texture, même `.glb`), et un projet s'écrit toujours au plus petit schéma qui le décrit ; la plateforme
accepte déjà les schémas 7 à 12.

### Ajouté

- **Toit enrichi, lot L2** (`MD/spec-lecture-ia-elargie.md` §3.2, §4.1, §4.3, §12.3). Chaque façade lue par Claude l'est par une
  **troisième requête** sur la même image (usage `facade-toit`, ses prompt et schéma générés, en sortie structurée), trois passes
  votées : la couverture et son motif de pose (droite, losange, écaille), le débord, ce qui couvre le faîtage, la gouttière, et les
  fenêtres de toit et panneaux solaires vus sur le pan. Ajoutés à la lecture enrichie, ces champs faisaient refuser sa sortie structurée
  par l'API (« The compiled grammar is too large ») : le run (5.1.0) et la lecture enrichie (L1) restent à l'octet près. Son échec
  laisse les deux autres intacts, avec un signal sur l'écran de la façade.
- Claude propose, le moteur tranche : la couverture lue sur la façade passe devant l'analyse d'une maison et les fichiers fonciers
  (la plus proche l'emporte, une règle prioritaire de `regles/reconciliation.json`), décochée ; le débord lu ne fait qu'une alerte ; une
  fenêtre de toit ou un panneau se pose sur le pan du mur par le moteur des toits (`corpsSousContrainte`), décochée ; le faîtage et la
  gouttière vont aux bords du corps, décochés.
- `Toit.pose` (droite, losange, écaille), les couvertures `bac-acier`, `membrane` et `vegetale`, `bords.faitage` et `bords.gouttiere`.
  Le schéma des projets passe à **11** ; la migration relit la grande ardoise en losange comme une ardoise posée en losange (même
  texture, même `.glb`). La 3D dessine l'écaille (ardoise, tuile plate), le bac acier, la membrane, la toiture végétale, la gouttière et
  le faîtage ; l'inspecteur gagne « Pose ». Une table unique des mots de couverture (`model/couvertureLue.ts`) remplace les traductions
  locales.
- Le serveur, la vérification de l'API (sept requêtes), la mesure du banc, le réglage du modèle de chaque usage et le tableau de la
  consommation connaissent l'usage `facade-toit`.
- Points de fumée **118** (une couverture en écaille lue, dessinée) et **119** (une fenêtre de toit posée par le moteur).

### Modifié

- L'analyse d'une maison qui lit une membrane, un bac acier ou une toiture végétale le propose désormais (la 3D sait les dessiner) ;
  `tuile-mecanique` reste la tuile (mécanique) d'avant.
- Coût mesuré d'une façade lue en production : environ 0,0090 $ (le run, la lecture enrichie, et le toit lu, environ 0,0010 $),
  contre 0,0080 $ en 5.2.0.
- Le workflow « Vérifier l'API Claude » a 45 minutes (trois requêtes par façade à la mesure, et sa relance unique).

### Supprimé

- L'écriture de `ardoise-losange` comme matériau de couverture (relu `ardoise` + pose `losange`) ; les traductions locales des mots de
  couverture (sujet `couverture`, arbitrage, contrôle du PLU), remplacées par la table de `model/couvertureLue.ts`.

### Corrigé

- **Point 116 de la fumée** (la façade enrichie lue, validée, dessinée) : son API simulée ne répondait pas à la troisième requête
  (`facade-toit`, lot L2) ; l'écran disait donc, à raison, que la lecture du toit n'avait rien rendu, et ce second signal faisait échouer
  le point, qui compte celui de la fissure seul (trois classes, à l'identique au calme). Le point reçoit une lecture du toit qui ne voit
  rien (`scripts/fumee.mjs`) ; l'application ne change pas.

## [5.2.0] — 2026-10-30

Version **mineure** au sens de `MD/RELEASE.md` : la façade enrichie (lot L1 : menuiseries, garde-corps, saillies, modénature, ce qui est
posé contre le mur, état du bâti, lus par une seconde requête sur la même image), le garde-fou de la lecture des façades et le banc des
modèles. Aucune quantité ni aucun export de la démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version (la
date de build reste celle de la 5.1.0, le même jour ; preuve forte, sept sur sept, `tests/fixtures/golden/EMPREINTES.md`) ;
`projet.json`, les quantités et `glb-structure.json` sont identiques. Le schéma des projets passe de 9 à 10 (la façade enrichie), par une
migration identité, et un projet s'écrit toujours au plus petit schéma qui le décrit ; la plateforme accepte déjà les schémas 7 à 12.

### Ajouté

- **Façade enrichie, lot L1** (`MD/spec-lecture-ia-elargie.md` §4.1, §4.2, §12.2). Chaque façade lue par Claude l'est par **deux
  requêtes sur la même image** (décision du propriétaire du 30 octobre 2026, qui remplace pour L1 la décision 3) : le **run**, identique
  à la 5.1.0 à l'octet près, et la **lecture enrichie** (usage `facade-enrichie`, ses prompt et schéma générés, en sortie structurée
  acceptée par l'API), trois passes votées. Elle lit la menuiserie de chaque baie (matière, couleur), la couleur de ses volets et son
  garde-corps (type, hauteur, couleur), dans une palette fermée de mots tenue en réglage (`regles/facades/reglages.json`, `palette`) ;
  les saillies (bow-window, galerie, auvent, appentis) et les décrochés ; la modénature (égout, génoise, bandeaux, chaînes,
  encadrements, soubassement, descentes) ; ce qui est posé contre le mur (perron, store, unité extérieure, boîte aux lettres) ; l'état du
  mur. Une baie de la lecture enrichie donne ses détails à l'ouverture du run qu'elle recouvre, et rien d'autre du run ne change ; son
  échec laisse la façade proposée sans ses champs, avec un signal. Dans l'audit, elle part dans le même batch, avec la place que les
  runs laissent ; dans la calibration, en même temps que le run, l'image encodée une fois (une seule image gardée, lot L0).
- Claude propose, le moteur tranche : quatre modules de règles (menuiseries, modénature, saillies, état). Une saillie n'est posée que
  par le moteur des toits (`corpsSousContrainte`), par une proposition **décochée**, à la profondeur de son genre, **un réglage**
  (`regles/facades/reglages.json`, `saillies.profondeursM`, aux valeurs d'une saillie posée au Mode Toit) ; un décroché est dit, jamais
  proposé ; une descente n'est retenue que si la détection voit une verticale à sa place ; l'état du bâti est un signal, sans case ni
  export.
- La Façade validée gagne `modenature`, `appendices` et `etat`, l'ouverture `menuiserie` et `gardeCorps` ; une saillie peut être un
  `auvent` ; l'équipement gagne `perron`, `unite-exterieure` et `boite-aux-lettres`, qui ne chargent rien. Le schéma des projets passe à
  **10** (migration identité ; un projet s'écrit toujours au plus petit schéma qui le décrit). La 3D dessine les menuiseries colorées,
  les garde-corps par type, la modénature lue, le store, l'auvent sur consoles et les équipements de la façade ; un fichier sans champ
  nouveau se dessine à l'identique.
- Le serveur, la vérification de l'API (six requêtes), la mesure du banc (le coût de la lecture enrichie s'ajoute au tableau), le
  réglage du modèle de chaque usage et le tableau de la consommation connaissent l'usage `facade-enrichie`. Le serveur remplit un
  nombre manquant de la valeur `default` que son schéma lui donne.
- Points de fumée **116** (une façade enrichie lue, validée, dessinée) et **117** (un bow-window proposé, accepté, posé par le moteur).
- **Garde-fou de la lecture des façades** (`MD/RELEASE.md` §8.2 bis, skill `facades` §5 quater). Ce que la lecture des façades par
  Claude savait faire en 5.1.0 ne peut plus se perdre sans que cela se voie. La référence garde trois mesures de main au même code de
  lecture (runs 40998593930, 41012308826 et 41014104555 de « Vérifier l'API Claude ») et le **plancher** de chaque ligne, le pire des
  trois : en ×3, par scène les baies, genres, pointes et parement, au total toutes les lignes (angles et carreaux au total seulement) ;
  en ×1, au total seulement ; et l'escalade. Le coût n'y est qu'une information. Le workflow, case « mesure des façades » cochée, relance
  une fois les scènes dont une ligne passe sous le plancher, finit rouge si elle y reste, et montre la table plancher / mesure au résumé.
  À chaque PR, sans appel : les **vraies réponses** du run 40998593930 rejouées dans le chemin du jour (vote, règles, façade proposée), à
  l'identique ; l'**inventaire figé** des champs du schéma du run, de l'escalade et de la Façade, qu'un lot ne peut réduire qu'en
  modifiant le test ; un **projet 5.1.0 à façades validées** relu et réécrit sans perte.
- **Banc des modèles sur la lecture des façades** (`MD/banc-modeles-facades.md`) : la lecture 5.1.0 mesurée sur les 22 scènes du banc,
  ×1 et ×3, avec Haiku (trois runs au code de lecture de main), Sonnet et Opus (deux runs chacun, sur une branche de mesure jamais fusionnée) : baies,
  genres, carreaux, angles, pointes, parement, coût et durée par façade, scènes qui divergent, et comment refaire la mesure. Rien ne
  change en production : le modèle du run d'une façade reste Haiku.

### Modifié

- Coût mesuré d'une façade lue en production : environ 0,0079 $ (le run, environ 0,0046 $, et la lecture enrichie, environ
  0,0034 $), contre 0,0047 $ en 5.1.0 ; accepté par le propriétaire.
- La modénature lue se dessine sur le mur relevé, où la maçonnerie déduite de l'époque ne se posait déjà pas ; les murs sans relevé
  gardent la maçonnerie de leur époque. Le garde-corps d'avant, codé en constantes, devient le type `barreaux`, aux mêmes cotes.
- **« Vérifier l'API Claude » avec un autre modèle** : quand l'entrée `modele` est remplie (un banc des modèles), le garde-fou de la
  lecture ne juge pas la mesure, puisque ses planchers sont ceux de Haiku. Il ne relance aucune scène et ne fait pas finir le job en
  rouge. Avec `modele` vide, rien ne change.

## [5.1.0] — 2026-10-30

Version **mineure** au sens de `MD/RELEASE.md` : façades (lots F0 à F8 : calage, run de Claude en trois passes et escalade, diagnostic
de forme, objet Façade, photos dans l'audit, cheminées et lucarnes, carreaux en 3D), lecture du PLU (L4), jardin (L3), trace de toute
requête Claude et export des données d'analyse (L0), pause du rendu 3D sous la liste de l'audit. Aucune quantité ni aucun export de la
démonstration ne change : les sept témoins ne bougent qu'à leur numéro de version et à leur date de build (preuve forte, sept sur sept,
`tests/fixtures/golden/EMPREINTES.md`) ; `projet.json`, les quantités et `glb-structure.json` sont identiques. Le schéma des projets
passe de 6 à 9 (7 : la Façade validée ; 8 : le règlement du PLU ; 9 : le jardin), chaque fois par une migration identité, et un projet
s'écrit toujours au plus petit schéma qui le décrit ; la plateforme accepte déjà les schémas 7 à 12.

### Ajouté

- **Façades, lot F7 : les éléments découverts** (`MD/spec-facade-calage-audit.md` §4 É8, §5 bis, §5 quater, §9). Une **bosse plus
  étroite qu'un pignon** sur la ligne du haut d'une façade (lue sur la photo, à la matière du mur) est une **cheminée** quand elle
  monte au faîtage du corps (une souche le dépasse), une **lucarne** sinon ; une cheminée ou une lucarne que **Claude** voit lui donne
  son mot (« des deux ») ; sans haut lu, Claude seul propose ; ce qu'il est seul à voir là où la photo ne montre rien est dit, sans
  proposition. L'É5 bis la propose **sur le corps du tronçon** (désigné par son mur) ; dans l'avant/après de l'audit, la ligne « Toit
  de …, corps n » arrive **décochée** (« Un élément du toit lu sur la photo se confirme toujours … ») ; cochée et validée, **le moteur
  des toits la pose** (`corpsSousContrainte`, `facade/regles/toits/elementsDesMurs.ts`) : une souche sur le faîtage (dans le mur
  d'un bout de corps), une lucarne sur le pan du mur ; les hauteurs du corps ne bougent pas, et **ce que le toit porte déjà ne bouge
  jamais** (un élément du même genre à moins d'un mètre n'est ni proposé de nouveau ni déplacé ; posés à la main, les éléments du toit
  font dire à la ligne ce qu'elle compléterait). **Un élément n'a qu'un endroit** : la fenêtre d'une lucarne (une ouverture au-dessus
  de l'égout, sous ses bords) quitte la façade objet quand la lucarne se pose, et la validation d'une façade (V4) ne la reprend pas.
  Validée avec une forme de toit proposée dans le même audit, la cheminée se repose par le moteur sur le corps qui porte son mur. La
  calibration dit les éléments proposés à l'É5 bis et à l'É8, et les juge contre les cheminées et lucarnes vraies d'un cas. Un
  objectif de plus : `facades.enchainement.diagnosticElementLargeurMinM` (0,2 m, la plus étroite des souches). Rien ne change
  sans une proposition cochée : la démonstration, ses empreintes et son GLB sont identiques ; AE 101 aussi.
- **L'audit montre à Claude le haut de la façade, et ses formes complètent les décisions** (lot F7, décision du propriétaire). L'image
  du run d'une façade n'est plus le mur seul coupé à l'égout : c'est la photo du relevé, redressée dans le plan du mur du sol jusqu'au
  haut de la façade (le gabarit, le faîtage des corps, plus un mètre ; ce qu'aucune photo ne montre en gris ; sous 1 024 px), et le
  texte du run dit où est l'égout. Les pointes, la silhouette, les cheminées et les lucarnes que Claude y lit (trois passes votées, et
  l'escalade si vous la demandez) complètent le diagnostic de forme de l'audit, par le moteur, comme dans la calibration : une
  proposition qu'il confirme vient « des deux », ce qu'il est seul à voir là où la photo se lit n'est pas proposé, les hauteurs
  restent celles du LiDAR. Environ 1 700 tokens d'entrée de plus par façade (trois passes), soit environ 0,0002 $. Un audit enregistré
  se relit comme avant.
- Fumée : point 106 (une cheminée peinte sur la photo de la façade sud, proposée décochée sur le corps 1, cochée et validée : une
  souche sur son faîtage, dessinée en 3D, rien d'autre ne bouge ; Ctrl+Z).

- **Façades, lot F6 : les photos dans l'audit** (`MD/spec-facade-calage-audit.md` §6, §7.1, §9, décision 6). Les photos d'une
  façade se prennent, se redressent, s'assemblent et se rangent **dans l'audit de la parcelle, et nulle part ailleurs**. Dans
  l'inspecteur, section « Façades et toit », « **Photographier** » sur la ligne d'un mur (commande `facade.photographier`, dans les
  trois classes d'écran) ouvre l'audit sur l'écran de prise, la façade choisie (la vue de prise d'une façade choisie) ; « Photographier
  les façades… », sans mur, ouvre l'écran de prise qui suit la position. Grisé avec sa raison sans parcelle cadastrale, ou pour un
  bâtiment hors de la parcelle.
- **L'éditeur d'une façade relevée** (`zones/Releve.tsx`, commande `facade.modifier`, « **Modifier** » sur la ligne d'un mur relevé) :
  l'élévation et ses ouvertures, à corriger (nature, cotes au centimètre, « Ajouter dans la grille », « Même taille pour la travée »,
  « Même hauteur pour le niveau », retrait, une baie devinée rendue au pointillé ou gardée), **une ouverture vérifiée d'une case**
  (« Vérifiée sur la photo » : plus aucun rejeu de l'audit ne la déplace ; décochée, la date part), la partie basse d'un mur en L.
  « **Valider la façade** » écrit l'édition en une étape d'historique : les corrections se tracent contre le relevé (une retouche
  devient `corrigee`, un ajout `ajoutee`), la grille se recalcule, une ouverture nouvelle d'une façade validée reçoit son identifiant ;
  tout le reste du relevé (photo, calage, Façade validée, seuils de la détection) est gardé ; rien ne s'écrit quand rien n'a changé.
- **« Créer un cas depuis cette façade »** (commande `facade.creerCas`, sous la barre d'une façade photographiée de l'audit, pour
  l'administrateur) : ses photos, ses dimensions du plan (largeur du cadastre, hauteur du LiDAR), son gabarit, les corps de son toit
  et les repères posés deviennent un cas de calibration, rangé sur le serveur (`admin/calibration-cas`), à ouvrir dans Admin ›
  Calibrer la détection.
- Un test tient la décision : **aucun écran de capture hors de l'audit** (`tests/unit/architecture/captureAudit.test.ts` : une
  caméra, un champ fichier qui la demande ou qui prend une image n'existent que dans les écrans de l'audit).
- Fumée : points 112 (de « Photographier » dans l'inspecteur à l'éditeur, deux Ctrl+Z), 113 (deux vues du même mur fondues dans
  l'audit), 114 (« Créer un cas depuis cette façade », lu et rejoué par la calibration).

- **Lecture IA élargie, lot L4 : le règlement du PLU** (`MD/spec-lecture-ia-elargie.md` §L4). Dans l'onglet PLU du tiroir,
  « **Lire le règlement de la zone avec Claude** » (commande `plu.lireReglement`, capacité `plu`, dans les trois classes d'écran ;
  grisée, avec sa raison, tant que la zone n'est pas connue) va chercher le règlement écrit de la zone au **Géoportail de
  l'urbanisme** (la zone relue au point, le PDF sur `data.geopf.fr`, la page du chapitre de la zone), en envoie un extrait de
  25 pages au plus à Claude (usage `plu`, Haiku par défaut, appel immédiat, sortie structurée et repli sur un exemple, `refusFormat`,
  coût au journal), et range sur la parcelle les règles qu'il relève : hauteurs (égout, faîtage, absolue, annexes), reculs (voie,
  limites séparatives), emprise au sol, espaces verts, stationnement, pentes et couvertures de toit, couleurs, clôtures et annexes,
  **chacune avec son article, sa citation mot pour mot et sa page**. Elles arrivent **proposées, décochées** : une ligne sans article
  ou sans citation n'en devient pas une, un nombre hors de ce qu'un PLU peut dire perd sa valeur, et seules les règles que la personne
  **coche** (`plu.validerFait`, Ctrl+Z la défait) contrôlent le projet. « **Conformité PLU** » compare alors les ouvrages du projet
  (bâtiment, annexe, pergola, carport dessinés ; l'existant compte dans l'emprise) aux règles retenues — hauteurs, reculs (la voie
  est le côté que la clôture dit « sur rue »), emprise, part libre de la parcelle, pente et couverture, hauteur de clôture — en
  **avertissements** qui citent l'article, jamais un blocage, et laisse « à vérifier » ce qui ne se mesure pas. Ce qui a été lu reste
  relisible : l'adresse du règlement, les pages envoyées, l'empreinte SHA-256 de l'extrait et du document, la réponse brute, le
  modèle, les versions du prompt et du schéma, le coût. Le moteur de règles a un dossier de plus : `regles/plu/reglages.json` (les
  seuils), `src/regles/plu/` (les faits, la lecture, le lecteur de la réponse), `src/engine/regles/plu/conformite.ts` (les règles) ;
  `deploy/prompt-plu.md` et `deploy/schema-plu.json` sont générés (`npm run regles:generer`).
- **Schéma de projet 8** : la parcelle peut porter `reglementPlu` (le règlement lu et ses règles). Un projet sans lecture du PLU
  s'écrit toujours au plus petit schéma qui le décrit ; la migration 7 → 8 est l'identité ; la plateforme accepte déjà 7 à 12.
  La démonstration et les témoins ne bougent pas.
- Serveur (`deploy/analyse-fonctions.php`) : l'usage `plu`, un bloc `document` (un PDF en base64, un seul) admis pour lui seul,
  le texte brut du modèle rendu à la page (`brut`, jamais au journal), la consigne du repli lue dans le fichier de schéma de l'usage.
  `scripts/verifier-api-claude.mjs` envoie une requête `plu` sur un extrait public de trois pages du règlement de Chatou
  (`tests/fixtures/plu/chatou-ul-extrait.pdf`).
- Fumée : point 120 (le zonage du point 15, puis la lecture du règlement par une réponse **synthétique**, deux règles cochées, la
  conformité, Ctrl+Z, le projet exporté au schéma 8).
- **Jardin, lot L3 de la lecture IA élargie : plate-bande, regard, et la lecture du jardin par Claude.** Un **massif** se règle
  dans une section « Plantation » de l'inspecteur : **plate-bande** (au ras du sol, 12 cm) ou **massif planté**, ses plantes
  (fleurs, arbustes, vivaces, mixte, potager), un **mini-arbre** pris parmi les petits arbres de la bibliothèque d'essences. Sa
  **végétation basse se dessine par défaut dans la Vue 3D** : des plantes et des fleurs en instances (deux appels de dessin par
  massif), semées dans le contour et tirées de la clé de l'objet (elles ne bougent jamais d'une ouverture à l'autre), plus ou moins
  denses selon le niveau de qualité à l'écran, à la densité de référence dans le `.glb` ; la case « Plantes en 3D » les retire ; une plantation `haie` reste un volume vert. Un
  massif d'avant (ceux de la démonstration, les haies de l'IGN) reste le bloc d'avant : **la démonstration et son `.glb` ne bougent
  pas** (l'interrupteur `VEGETATION_POUR_TOUS_LES_MASSIFS` de `model/jardin.ts`, éteint, attend la décision du propriétaire). Un
  **équipement** peut être un **regard** (un carré de 60 cm sur le plan, une plaque de fonte au ras du sol en 3D), un **éclairage**
  ou un **robinet** : aucun ne charge la terrasse sous lui, à la différence d'un spa. Un ouvrage **existant** (une piscine, une
  terrasse, un chemin lus sur la photo) situe le projet sans qu'aucune quantité ne le compte (dossier, piscine, équipements d'une
  terrasse). Les champs sont ceux de `MD/spec-lecture-ia-elargie.md` §4.4 (`plantation`, `vegetation3d`, `nature`, `existant`).
  **Schéma 9** (migration 8 → 9 identité ; le 8 est celui du lot L4, `reglementPlu` ; la plateforme accepte déjà 7 à 12).
- **La lecture du jardin par Claude** : quand l'analyse de l'audit part, une requête de plus lit le jardin sur l'**orthophoto
  recadrée sur la parcelle** (et les photos de la clôture et du portail), au modèle rapide (usage `jardin`, prompt et schéma
  générés : `deploy/prompt-jardin.md`, `deploy/schema-jardin.json`). Claude dit les arbres (genre dans une liste fermée, taille),
  haies, clôtures, portails, murets, bordures, chemins, terrasse et piscine déjà là, potager, plates-bandes, regards, éclairages et
  robinets, à leur place sur l'image ; **le moteur décide** (`facade/regles/jardin.ts`, seuils dans `regles/jardin/reglages.json`) :
  certitude, hors parcelle, déjà dans le plan, position en mètres par le géo-référencement de l'image, essence la plus proche de la
  bibliothèque, ce qui va sur la clôture d'un côté. Ses propositions arrivent **décochées** dans l'avant/après (niveau « Jardin » de
  la parcelle), se montrent dans « Après » seulement, et n'entrent dans le plan qu'à « Valider » (Ctrl+Z les défait). La lecture est
  enregistrée avec la réponse brute, les versions, le modèle, le coût et l'image exacte envoyée.
- `scripts/verifier-api-claude.mjs` vérifie aussi la requête du jardin, sur une orthophoto de synthèse du dépôt
  (`tests/fixtures/jardin-ia/`, réponse de test SYNTHÉTIQUE).
- Fumée : points 110 (plate-bande et sa végétation en 3D), 111 (regard), 115 (lecture du jardin acceptée dans l'avant/après).

- **Lecture élargie par l'IA, lot L0 : tout garder** (`MD/spec-lecture-ia-elargie.md` §4.8, §12.1, décision 7). **Toute requête à
  Claude laisse une trace sur le serveur** : ce qui est parti (le texte complet, chaque requête, les images par empreinte) et ce qui
  est revenu (le texte brut, la sortie ramenée au schéma, les tokens, le coût, le refus de la sortie structurée, les versions). Une
  requête qui nomme son audit se range dans son dossier, comme avant, les escalades de l'audit comprises ; toutes les autres
  (« Rappeler Claude », l'aide du relevé, une analyse dont le dépôt a été retiré) sous `claude/analyses/sans-depot/<organisation>/<mois>/`,
  gardées 24 mois. **L'image exacte envoyée** (le JPEG que Claude a vu) est gardée une fois par empreinte : trois passes et une
  escalade d'une façade, un fichier ; la réponse enregistrée d'un run la référence (`image.sha256`, `image.octets`), une réponse
  d'avant se relit telle quelle. Le journal gagne les empreintes de l'image et de la réponse, et la trace ; toujours ni photo ni
  réponse. **Rejouer une façade depuis son image gardée** (Admin › Audits, sur une analyse ouverte ; `POST admin/claude/rejouer`) :
  les mêmes octets et le même texte, avec le prompt et le modèle d'aujourd'hui, comptés en rejeu. **Exporter les données
  d'analyse** (Admin › Audits ; `GET admin/claude/donnees-analyse`, administrateur seul) : pour une période, un usage et un modèle,
  chaque requête de tous les audits et hors audit, et chaque proposition des audits reçus avec sa décision, la décision du moteur et
  l'accord de Claude, en JSON (complet) ou en CSV (tableur français) ; les images par empreinte seulement
  (`GET admin/claude/images/<sha256>.<ext>`). Le fichier du projet ne change pas (schéma 7) ; aucun export du projet ne bouge.
- Fumée : point 109 (l'export « données d'analyse » en CSV et en JSON, et le rejeu d'une façade depuis son image gardée).

- **Spec de la lecture élargie par l'IA** (`MD/spec-lecture-ia-elargie.md`, documentation seule, aucun code). Le périmètre lancé par
  le propriétaire le 29 octobre 2026 — la façade (menuiseries, garde-corps, bow-window, auvents, décrochés, modénature, perron, store,
  unité extérieure, boîte aux lettres, état du bâti en signal), le toit (couverture et motif de pose, fenêtres de toit, panneaux solaires,
  débords, faîtage, gouttières), le jardin (plates-bandes à végétation basse en 3D, arbres et leur essence, regards, haies, allées,
  existant), les règles de zone du PLU lues dans son règlement, les textes de la déclaration préalable et la relecture avant l'export,
  l'assistant en langue naturelle — classé contre ce que Plan sait déjà (8 éléments existent, 23 sont à étendre, 17 à créer), avec le
  modèle cible, le déroulé, les coûts par usage (Haiku par défaut, Sonnet à la demande) et sept lots : L0 (tout garder : l'image exacte
  envoyée, une trace pour toute requête, l'export « données d'analyse » à travers les audits), L1 façade et L2 toit dans le run d'une
  façade (après F7), L3 jardin et L4 PLU en parallèle, L5 textes et relecture, L6 assistant. Pointeur dans `MD/roadmap.md` §5.7.

- **Façades, lot F8 : les carreaux en 3D** (`MD/spec-facade-calage-audit.md` §3.3, §9). Une ouverture d'une façade validée dont
  la façade objet porte ses **carreaux** (`details.carreaux`, lus par Claude ou dits au doigt) les montre dans la Vue 3D : le
  **meneau** entre les vantaux, la **traverse de l'imposte** et sa grille sur toute la largeur, les **petits bois** de chaque
  vantail (colonnes × rangées, fins ou épais), et la vitre selon le vitrage lu (clair, dépoli, teinté, vitrail) quand le mur n'a
  pas de photo. Le dessin suit le vocabulaire enregistré et lui seul : ce qu'il ne dit pas ne se dessine pas. Une maille par
  ouverture, deux triangles par barre, dans son groupe `ouverture:<id>` ; en Normale et en Soignée, l'écran les montre en relief
  (hors export), le `.glb` garde les barres à plat à tous les niveaux. **Un fichier sans carreaux se dessine exactement comme
  avant** : empreinte `glb-structure.json` inchangée (`three/carreaux3d.ts`, `three/releve3d.ts`).
- Fumée : point 108 (une façade validée à carreaux, ceux de la fenêtre d'AE 101 sud : ses barres dans la Vue 3D, à plat en
  Économe, en relief aux autres niveaux).

- **Façades, lot F5 : la Façade et la façade objet** (`MD/spec-facade-calage-audit.md` §3.2 à §3.4, §4 É9, §9). Une façade
  **validée** garde ce que la photo a servi à vérifier : ses **dimensions** (le plan et le LiDAR, et leur source ; l'écart que la
  photo constate, dit en alerte au-delà de 10 %, jamais une correction), sa **forme** (le gabarit du toit calculé, le haut lu, les
  pointes lues, les corps qu'elle porte), son **parement** (lu par Claude), la **pose de sa texture** (sa précision, le mur sur
  l'image) et ses **ouvertures en objets** : un identifiant stable, une date de vérification, et leurs **carreaux** (vantaux, grille,
  petits bois, imposte, vitrage) lus par Claude, rangés maintenant, dessinés en 3D plus tard (lot F8). L'É9 de l'enchaînement n'est
  plus sautée : elle fait le **bilan** de la façade ; dans l'audit, « **Valider la façade** » (sous la barre, commande
  `facade.valider`, dans les trois classes d'écran) l'écrit dans le projet en une étape d'historique (Ctrl+Z la défait), et l'É9 est
  faite. **Un rejeu ne déplace plus une ouverture vérifiée** : la mesure suivante ne s'écrit plus d'office sur une façade validée,
  et écrite (la ligne cochée), elle garde à leur place les ouvertures vérifiées, corrigées ou ajoutées, sans les doubler. La
  **3D** pose chaque ouverture validée comme un objet nommé (`ouverture:o3`), l'**inspecteur** dit la Façade et les ouvertures par
  niveau sur la ligne du mur, le **plan** met en tirets une ouverture pas encore vérifiée, le **Mode Toit** marque le mur vu sur la
  photo et dit ce qu'elle en lit. Qui l'emporte : quatre groupes nouveaux dans `model/protections.ts` (`facadeDimensions`,
  `facadeForme`, `facadeTexture`, `facadeOuvertures`).
- Fumée : point 105 (le bilan à confirmer, « Valider la façade », la Façade écrite et lue par la 3D et l'inspecteur, Ctrl+Z).

- **Façades, lot F4 : le diagnostic de forme et le toit par corps** (`MD/spec-facade-calage-audit.md` §4 É5 bis et É8, §5 bis,
  §5 ter, §9). La silhouette d'une façade dérive du toit : son écart avec la photo est un diagnostic **du toit calculé**, corps par
  corps. La façade se **découpe en tronçons de corps** (`silhouetteDesCorps.ts::tronconsDeFace` : la silhouette de face dit
  désormais quel mur de corps porte chaque part de son haut). L'**É5 bis** (`facade/regles/facades/diagnosticForme.ts`) compare le
  haut du mur lu sur la photo (à la matière du mur, comme l'É5 de la calibration ; l'analyse le rend aussi à l'audit, `hautLu`) au
  gabarit, tronçon par tronçon, et essaie un petit nombre de variantes du toit **de ce corps**, faites par le moteur des toits : un
  pignon de plus, de moins, déplacé ou élargi sur un long pan, une croupe à la place d'un pignon (ou l'inverse) sur un mur de bout ;
  une variante n'est proposée que si elle explique mieux l'image (objectifs `diagnosticEcartMin`, `diagnosticGainMin`,
  `diagnosticReliefMin` de `regles/facades/enchainement.json`). La lecture de Claude (ses pointes) dit la provenance (« le haut lu »,
  « Claude seul », « les deux ») ; sans haut lu, Claude seul propose, et une pointe qu'il est seul à voir quand le haut lu ne la
  confirme pas n'est pas proposée. Une pointe vue plus haute ou plus basse est une **alerte**, jamais une correction : le LiDAR garde
  la hauteur (décision 12). Ce que le moteur ne sait pas encore poser (une bosse étroite : cheminée ou lucarne, lot F7) est dit sans
  proposition. Chaque proposition porte son corps **par son mur** (`murDuCorps`) et l'observation que le moteur relira.
- **L'audit propose ces corrections de toit dans l'avant/après** (`app/audit/parcelle/formeFacades.ts`) : une ligne par corps
  diagnostiqué (« Toit de Maison, corps 1 (vu sur la façade sud …) »), **toujours décochée** (décision 10 : « Une forme de toit lue
  sur la photo se confirme toujours »), le corps concerné en surbrillance. Cochée et validée, le **moteur des toits** la relit
  (`corpsSousContrainte`) sur la mesure LiDAR, sur le corps que désigne le mur, et rien d'autre ; les hauteurs du corps restent
  celles du LiDAR ; le fait du bâtiment l'emporte (`corpsProposesSousFait`) ; un toit figé ou saisi le dit. L'**É8** dit les
  propositions à confirmer ; É5 bis et É8 ne sont plus « sautées ». La calibration montre l'É5 bis sur l'image (tronçons de corps,
  gabarit de chaque proposition, gain) et la mesure contre la vraie forme du toit du cas ; un cas tiré d'un audit garde les corps du
  toit qui font son gabarit (`CasReel.toit`).
- **Le moteur des toits pose des pignons sur n'importe quel corps** (`facade/regles/toits/pignons.ts`) : une observation désigne le
  corps par son mur (`PignonsFait.mur`), dit exactement les pignons que ce mur montre (`position: 'places'` : un de plus, un de moins,
  déplacé, élargi ; chacun monte au faîtage du corps, le pan n'est pas relu) ou le bout que montre un mur de bout
  (`ObservationFait.boutsDesMurs`). Le vocabulaire de `regles/toits/faits.json` ne change pas.
- Fumée : point 104 (une façade photographiée, sa proposition de toit sur le corps 1, décochée, cochée dans l'avant/après, le pignon
  posé par le moteur, hauteurs inchangées, Ctrl+Z).

- **Façades : une escalade, à la demande** (décision du propriétaire du 29 octobre 2026, `MD/spec-facade-calage-audit.md` §8,
  décision 14). Sous la barre d'une façade, dans l'audit et dans le rejeu de la calibration, « Escalader vers … (≈ … $) » (commande
  `facade.escalader`, dans les trois classes d'écran) envoie **une** requête de plus, la même image et le même texte, au modèle de
  l'usage `escalade` (Réglages › Modèles) ; jamais automatique, une par lecture, son coût annoncé sur le bouton (une passe aux prix du
  jour, que l'état du serveur donne : `escaladeFacade`). Sa réponse est gardée avec le run (capture de l'audit, cas de la calibration)
  et se rejoue sans réseau. Le moteur la pèse contre le vote des passes (`escaladerObservations`, réglage
  `facades.ia.escaladeEcartPart`) : elle l'emporte sur le calage, la forme et le parement là où elle s'en écarte, ses ouvertures en
  plus s'ajoutent marquées et ne sont cochées que si la détection les retrouve. L'É4 dit ce qu'elle a tranché. Dans l'audit, une
  ligne sous chaque façade dit sa lecture et son coût.

- **Façades, lot F3 : l'audit sur l'orchestrateur, en mode discret** (`MD/spec-facade-calage-audit.md` §4 ter.3, §4 ter.5, §6, §9).
  Une façade photographiée dans l'audit se calcule par l'orchestrateur de l'enchaînement (`facade/releve/enchainement.ts`, mode
  `audit` : la chaîne de l'audit, appelée telle quelle), à **résultat identique** (68 cas comparés au pixel près : scènes du banc à
  prise par caméra, sans correction, avec quatre repères, avec le mur posé à la main, et les cas des tests de l'audit). L'audit porte
  **la même barre de progression** que la calibration (`BarreProgressionFacade`, un seul composant), sur la façade dépliée de la liste
  et en tête de l'écran de prise dès la première photo : elle avance étape par étape pendant le calcul, « Arrêter » l'interrompt.
  **Mode discret** (`app/audit/parcelle/discret.ts`) : une étape cachée qui a réussi ne se montre pas ; une étape qui échoue ou doute
  apparaît aussitôt, en une ligne, avec son geste de repli (quatre repères sur la photo choisie) ; le mur et les ouvertures tiennent
  en une ligne ; seuls les points de validation (V1 à V4) et ce qui doute s'ouvrent depuis la barre (commande `facade.etape`).
  **« Rejouer la façade »** (et « Rejouer les façades ») rejoue l'orchestrateur ; photos et corrections ne bougent pas.
- **L'audit lit chaque façade par le run de Claude** (lot F3) : trois lectures votées par façade mesurée (voir « Modifié »), dans le batch de l'analyse, sur
  l'élévation du mur (usage `facade`, le prompt et le schéma du lot F2). Sa réponse est **enregistrée** avec ses propres versions, son
  modèle, ses tokens et son coût (`analyse.resultats.runs`), et le moteur de règles l'accorde avec la détection de la façade
  (`accorderOuvertures`) : une boîte retrouvée confirme, une baie devinée qu'elle recouvre est confirmée, une boîte seule reste
  proposée en pointillé, décochée. Le serveur rend désormais le modèle et les versions d'une requête d'un autre usage que son batch.

- **Façades, lot F2 : un run de Claude par façade, décidé par le moteur de règles** (`MD/spec-facade-calage-audit.md` §5, §8, §9).
  Une seule requête par façade, sur l'image prise pour la suite (l'assemblage), rend tout : le calage (les deux angles du mur, les
  pointes des pignons, les appentis, les autres volumes, ce qui cache le mur), la forme du haut, les éléments du toit, **le parement du
  mur** (vocabulaire fermé : `enduit`, `pierre`, `brique`, `colombage`, `bardage-bois`, `bardage-metal`, `beton`, `mixte`, et les
  zones d'un autre parement, en part du mur, avec leur confiance), les ouvertures, leurs détails et **leurs carreaux** (vantaux,
  carreaux par vantail, petits bois, imposte, vitrage). Le texte lui donne ce que le plan attend du haut et le parement déjà connu
  (vu sur place, sinon la BD TOPO). Prompt et schéma **générés** (`npm run regles:generer` : `deploy/prompt-facade.md`,
  `deploy/schema-facade.json`, version 1, depuis `src/regles/sujets/descriptions/facadesRun.ts`), servis par le serveur PHP sous
  l'usage `facade` (`deploy/analyse-fonctions.php`, comptes du journal `comptesFacade`). **L'IA alimente le moteur de règles** :
  sa réponse devient des **observations** (`src/regles/facades/observations.ts`), et les **règles** de `facade/regles/facades/ia.ts`
  en tirent les décisions que la chaîne lit — ses deux angles sont une pose candidate de plus pour l'arbitre de l'É4 ; une **zone de
  colombage** écarte les poses du mur qui tiennent dedans (leurs bouts suivent les bois, pas les angles : le défaut d'AE 101) et la
  teinte du mur se lit hors d'elle ; une pointe vue ailleurs ou plus haut que le plan est un diagnostic ou une alerte, jamais une
  correction ; une boîte n'est cochée que si la détection (ou une baie devinée par la grille) la retrouve, seule elle reste décochée.
  Leurs seuils sont des réglages (`regles/facades/ia.json`), édités et recalculés dans Admin › Règles, qui montre aussi le run (ses
  règles, son prompt et son schéma). Les observations de toit sont enregistrées, pas appliquées (lot F4, `corpsSousContrainte`).
- **Calibration : le mode « IA » du rejeu et « Rappeler Claude »** (×1, et ×3 voté pour mesurer). La réponse est **enregistrée** avec
  le cas (date, modèle, versions du prompt et du schéma, tokens, coût), à côté des précédentes ; le mode « IA » la rejoue sans réseau
  ni coût. L'É4 montre la pose des deux angles de Claude, ses pointes, ses zones de colombage et les poses qu'elles écartent, et dit
  l'accord ou la divergence ; l'É7 montre ses boîtes (pleines : retrouvées, cochées ; en tirets : seules) et, au toucher, la division
  du vitrage. Coût et versions affichés.
- **La mesure ×1 contre ×3** : `.claude/skills/facades/scripts/ia-x1-x3.ts` (préparer les scènes de synthèse, évaluer) et
  `scripts/verifier-api-claude.mjs --facades` ; le workflow « Vérifier l'API Claude » envoie aussi une requête `facade` sur une image
  de synthèse du dépôt (`tests/fixtures/facades-ia/facade-test.jpg`) et, case « mesure des façades » cochée, joue la mesure entière.

- **Façades, lot F1 : le calage du mur par ses ancres** (`MD/spec-facade-calage-audit.md` §4 É4, §5, §9). Le mur cherché sur
  l'assemblage se juge maintenant **sans le toit** : un score d'explication (`facade/releve/calageAncres.ts`) dit si ses deux angles
  sont des bords de la matière du mur (de l'enduit d'un côté, autre chose de l'autre, et une verticale qui les longe), si l'égout et le
  sol en sont le haut et la fin, et si ses proportions sont celles du plan. Le rectangle des arêtes est gardé s'il explique la photo
  (score et chaque angle au seuil, `regles/facades/enchainement.json`) ; sinon, l'arbitre prend parmi les autres murs que les arêtes
  dessinent celui qui l'explique, et l'étape est « à confirmer » ; sinon la pose du plan seul, centrée, **supposée** : l'étape est en
  échec et demande les deux angles, l'égout et le sol. Les drapeaux « trouvé » (égout, sol, bouts) ne valent plus que d'une pose qui
  passe le test : sur la façade sud d'AE 101, ils étaient vrais pour un bloc de pignon de 302 px. L'É4 de la calibration montre le
  score de la pose retenue et, en tirets, la pose des arêtes écartée. Sur l'assemblage d'AE 101 refait en synthèse depuis son étalon
  (`tests/banc/facades/ae101.ts`), les arêtes seules retiennent le même bloc ; le calage par les ancres retrouve le mur à 0,7 et 1 %
  de la largeur, ou, l'angle gauche caché par un arbre, se dit supposé. Banc de synthèse inchangé (égout 44/44, sol 43/44,
  silhouette à 2 % 39/44, les 44 poses expliquées). Fumée : point 100.

### Modifié

- **Le relevé de façade devient un éditeur** (lot F6) : il n'a plus de capture ; il s'ouvre sur un mur déjà relevé (« Modifier »), et
  la photo d'un mur se prend dans l'audit. Un relevé d'avant (posé par l'audit ou fait par l'ancienne capture, sa photo restée sur
  l'appareil comprise) se rouvre, s'édite et se relit sans rien perdre ; F6 ne touche pas au schéma (un relevé sans Façade validée reste au 6).
  Le toit lu sur la façade ne remplace plus le toit du bâtiment depuis le relevé : la forme lue sur la photo passe par le diagnostic de
  l'audit et le moteur (lot F4), ou par le Mode Toit.
- **La calibration lit les façades de l'audit** (lot F6, décision 6) : un cas naît d'une façade de l'audit (« Créer un cas depuis cette
  façade », ou un audit reçu) ; l'écran ne prend plus de photos et n'ajoute plus de photo à un cas (on peut en retirer une). La
  détection propose les ouvertures d'un cas encore sans annotation à chaque rejeu (la case « Automatique », qui ne réglait plus que
  cela, part avec l'ajout de photos).
- **La conclusion d'un audit sur le serveur** (`decisions.json`) passe en version 2 (lot L0) : chaque proposition y dit sa cible, son
  effet, sa réserve, la décision du moteur et l'accord de Claude ; une conclusion d'avant se refait depuis le fichier de l'audit à
  l'export. Les escalades d'un audit sauvegardé portent son dépôt et se rangent avec son analyse.

- **Schéma du projet : 7** (lot F5). Un projet dont une façade est validée s'écrit au schéma 7 (un lecteur 6 perdrait sa Façade à la
  première réécriture du mur) ; les autres restent au plus petit schéma qui les décrit (la démonstration au 5). La migration 6 → 7
  est l'identité ; un fichier ancien se relit à l'identique. **La plateforme doit accepter le schéma 7 avant le dépôt**
  (`contrat/plan-produit.json`, `project_schema_versions` de backprod).
- **Les carreaux que Claude lit sur une ouverture** se rangent dans ses détails (lot F5) : une boîte retrouvée par la détection qui
  les apporte compte « 1 détail ajouté », et la ligne « avec l'aide de Claude » se propose, décochée comme avant.

- **L'escalade d'une façade (et d'une maison) part par défaut sur Sonnet** (`claude-sonnet-5-5`, décision du propriétaire du
  29 octobre 2026) ; tous les autres usages restent sur `claude-haiku-5-5`. Depuis le lot F3, une façade est lue trois fois par
  Haiku et votée : avec Haiku pour défaut, l'escalade (`facade.escalader`, une par lecture) n'était qu'une quatrième lecture du même
  modèle. L'administrateur le change toujours dans Réglages › Modèles (`admin/claude/modeles`). La vérification contre la vraie API
  (`npm run verifier:api-claude`) envoie désormais aussi l'escalade d'une façade comme la page (demande `escalade`, requête du run
  d'une façade : son prompt, sa sortie structurée, le modèle de l'escalade), en dernier ; une seule requête Sonnet, sous le plafond
  de 0,05 $.
- **Façades : trois lectures votées par façade** (décision du propriétaire du 29 octobre 2026, sur la mesure de la vraie API, run
  40903934070 : ×1 rappel 92,9 %, précision 98,3 %, carreaux 0/16, 0,00153 $ par façade ; ×3 99,2 %, 100 %, 10/21, 0,00464 $). L'audit
  (dans le batch de l'analyse), l'aide du relevé et « Rappeler Claude » de la calibration lisent chaque façade trois fois, et le moteur
  vote. Le nombre est un réglage (`facades.ia.passes` dans `regles/facades/ia.json`), pas une constante ; « Une passe (pour mesurer) »
  reste dans la calibration. Le vote ne coche toujours rien seul : la détection décide des boîtes. Une façade coûte environ trois
  fois plus (0,0046 $ au tarif de `claude-haiku-5-5`).

- **Un seul geste « quatre repères »** (lot F3) : l'audit et la calibration posent les repères par le même composant
  (`zones/releve/PoserReperes.tsx` : la consigne, les quatre repères, « Ajuster l'égout et le sol ») ; chaque écran n'y ajoute que ses
  gestes (l'échelle et « Appliquer » dans l'audit, « Retirer les repères » dans la calibration).
- **L'audit mesure une façade dès sa première photo** (lot F3), en silence (la barre le montre), et non plus à la deuxième pour
  vérifier la fusion : l'échec d'une étape (une photo qui ne se redresse pas, des photos qui ne s'assemblent pas) se dit sur place,
  pendant qu'on peut reprendre la façade.

- **L'aide de Claude au relevé passe par le run d'une façade** (lot F2) : une requête au lieu de trois passes de renfort, sur la
  photo à l'étape des coins (ses deux angles deviennent des graines, recalées sur les arêtes), sur l'élévation redressée à la
  vérification (ce qu'aucune photo ne montre en gris ; ses boîtes s'accordent avec la détection). Claude ne retire plus une baie
  détectée : une boîte seule reste décochée. Le renfort à trois passes ne reste qu'à l'audit, jusqu'au lot F3.

- **Le gabarit ne pose plus le mur** (lot F1). Il vient du toit calculé, que la photo met en question : `murSurLAssemblage` et
  `affinerEgoutEtSol` ne le reçoivent plus, il ne se pose qu'une fois le mur calé. La chaîne des façades passe à la version 10 (un
  mur qui n'explique pas la photo n'est plus compté trouvé ; ses coins restent prédits). L'option manuelle de l'É4 de la calibration
  est le même composant que la reprise du mur de l'audit (`zones/releve/AjusterMur.tsx`), sur l'assemblage : les deux bouts, l'égout
  et le sol se tirent librement, « Appliquer le calage et rejouer ».

### Corrigé

- **Tablette : le résumé du tiroir replié suit la terrasse qu'on redessine.** Sur tablette, tiroir replié, la barre des résultats
  montre les chiffres clés de la terrasse (appuis, lames, bois porteur, surface, estimation) ; sa clé ne suivait que les attributs des
  objets, pas leur forme, si bien que tirer un sommet ou une arête laissait, dans le paquet livré, le résumé d'avant le geste (le
  garde-fou `[cle de version]` le disait en développement, points 1, 2, 9 et 99 de la fumée en classe moyenne). La clé suit
  maintenant la forme des objets (`cleEtatEtObjets`, `zones/Resultats.tsx`), comme les tuiles et le pied de la feuille Chiffrage du
  téléphone, qui lisent le même chiffrage.

- **La liste des cas de calibration tient sur un téléphone** : le nom d'un cas tiré de l'audit (« Maison · façade nord
  (78650000AE0101) ») se coupe dans sa cellule au lieu d'élargir la page.
- **La liste de l'audit de la parcelle ne se fige plus derrière la Vue 3D** : la boucle de rendu de la 3D redessinait la scène à
  chaque trame, même cachée par la liste (un dialogue modal) ; sur un appareil lent, ou le navigateur sans carte graphique de la
  fumée, une image plein cadre coûte près d'une seconde, et un toucher dans la liste attendait plusieurs secondes (fumée 104 et 106
  en large : le clic d'un segment de la barre prenait jusqu'à 9 s, 77 ms maintenant). La boucle se tait tant que la liste est à
  l'écran (`vue3d.renduCouvert`, posé par `app/audit/parcelle/commande.ts`, qui suit le parcours ouvert et l'écran de sa session) et
  repart à l'écran de prise, aux propositions (l'avant/après) et à la fermeture ; les rendus de l'audit depuis une prise de vue et les
  captures ne passent pas par elle. Reste à faire : ne rendre que quand quelque chose change.
- **L'escalade d'une maison (D20) prend le modèle de l'escalade** (`deploy/analyse-fonctions.php`) : ses requêtes portent l'usage
  `analyse` (pour son prompt), et le serveur leur donnait le modèle de l'analyse ; dans une demande `escalade`, une requête garde le
  prompt de son usage et prend le modèle de l'escalade, et se compte en escalade au journal.
- **Le prix de l'escalade d'une façade arrive jusqu'au bouton** : le client de l'analyse lit `escaladeFacade` de l'état du serveur
  (vu par la fumée 103, que les tests unitaires, qui simulaient l'état, ne voyaient pas).
- **Admin › Calibrer la détection tient dans l'écran d'un téléphone** (`app.css`, `.calChamp select`) : le choix de la réponse de
  Claude rejouée prenait la largeur de son option la plus longue (« réponse synthétique (pas de Claude), 2026-10-29, une passe… »),
  la page s'élargissait à 910 px sur 390 et le navigateur la dézoomait : « Rejouer » se touchait à côté (fumée 101 en échec en compact et
  en moyen depuis le lot F2). Le choix tient maintenant dans sa colonne, l'option se coupe.
- **Le prompt du run d'une façade ne se sert plus en clair** (`deploy/htaccess.template`) : la règle qui garde les prompts lus par
  `analyse.php` nommait encore celui du renfort ; elle nomme maintenant `prompt-facade.md` (lot F2).
- **Le run d'une façade se lit sur la vraie API** (lot F2). La vérification de l'API Claude du 29 octobre 2026 (run 40887362801) a
  refusé la requête `facade` : réponse rendue (`end_turn`), mais « Sortie non JSON ». Comme les autres usages, elle partait sans sortie
  structurée, le schéma en simple consigne du prompt, et le serveur cherchait l'objet « de la première accolade à la dernière ». Le
  run d'une façade demande maintenant la sortie structurée (`output_config.format`, son schéma, à l'appel immédiat), et repart une fois
  sans elle si l'API refusait le schéma. Le texte d'une réponse libre se lit mieux : dernier bloc de code, dernier objet équilibré, et
  sans virgule finale en dernier recours. Pour une sortie illisible, le serveur rend le début du texte (400 caractères), et
  `verifier-api-claude.mjs` imprime l'arrêt, les tokens de sortie, si la sortie structurée était demandée et ce début de texte. Le faux
  Anthropic des tests rend désormais cette forme de réponse quand le format manque : la CI aurait pris l'erreur.

- **Le run d'une façade ne montre plus son schéma à Claude en texte** (lot F2, prompt et schéma du run en version 2). La mesure
  ×1 contre ×3 sur la vraie API (run 40896695970) a montré que l'API avait refusé la sortie structurée à chaque requête, le repli
  partant avec le schéma en texte ; Haiku le recopiait et logeait ses valeurs dedans (`{"type":"object",…,"gauche":{"x":0.22,…`), une
  fois `egout: 258` (des pixels). Avec la sortie structurée, le schéma ne part plus dans le prompt ; sans elle, le prompt montre un
  **exemple** de réponse (une façade inventée, `exemple` de `deploy/schema-facade.json`, généré). Le refus de l'API est gardé avec son
  message (`refusFormat`, résultat et journal) et imprimé par le vérificateur. Le schéma recopié n'est plus pris pour une réponse vide
  (« Sortie hors du schéma »). Les observations bornent leurs nombres : une part de l'image ou du mur hors de 0 à 1 (au-delà d'un
  débord d'arrondi de 0,05, ramené au bord) ou une hauteur hors de 0 à 6 hauteurs d'égout écarte l'objet qui la porte. Le prompt dit
  que tous les nombres sont des parts. La mesure compte à part les passes illisibles et compare ×1 et ×3 sur les façades lues dans les
  deux modes.

### Supprimé

- **Les constats « rien n'est proposé avant le lot F7 »** de l'É5 bis (une bosse étroite, un élément vu par Claude) : remplacés par
  les propositions d'éléments du lot F7.
- **La capture du relevé de façade** (lot F6, `MD/spec-facade-calage-audit.md` §8 bis.2) : le parcours de `zones/Releve.tsx` (choix
  du mur et sa boussole, méthode, photos de rue Panoramax, visée et caméra guidée avec la distance en réalité augmentée, le niveau et
  le grand-angle, les quatre coins du mur et le mur en L posés au doigt, l'analyse, la vérification de la hauteur et du toit lu),
  `zones/releve/Visee.tsx`, `ChoixMethode.tsx`, `PhotosRue.tsx`, `ChoixMur.tsx`, `EtapeCoins.tsx`, `capteurs.ts`, l'aide de Claude au
  relevé (`AideClaude.tsx`, `AideEtapes.tsx`, `aide.ts`, `facade/detection/signaux.ts`, `aideReleveDuNavigateur`), le masque
  hachuré de la vérification (`facade/releve/masque.ts`), la caméra du navigateur et ses objectifs (`ui/releve/camera.ts` : flux,
  grand-angle ; `ui/releve/profondeur.ts`, `ui/releve/panoramax.ts`, `facade/vision/objectifs.ts`, `facade/vision/panorama.ts`), les
  consignes de la visée (`facade/vision/cadrage.ts` : distance par cadrage, aplomb, consigne de prise), le mur proposé
  (`priseDeVue.ts::murPropose`, `facadeFaceAuCap`), les photos de rue face au mur (`geo/panoramax.ts::classerFaceAuMur`), la glue
  de l'analyse du relevé (`chaine.ts::analyserSansRien`, `morceauRedresse`, `analyseSerie.ts::etirerEnHauteur`, l'avis de l'analyse),
  ce que seule la visée posait sur une prise (les repères sur les bords du mur, le plan de prise, les morceaux d'une série), le
  recalage des coins de Claude (`recalageIa.ts::recalerCoins`, `ia.ts::coinsDeLIa`), `hauteurPignon`, `positionGpsCourante`, la
  commande `facade.relever` et ses vingt-six contrôles de capture, leurs règles CSS et leurs tests.
- **Les cas de calibration faits à part** (lot F6) : « Nouveau cas (photos) », le champ photo de l'éditeur d'un cas, et les cas tirés
  d'une façade relevée d'un projet ou d'un fichier de projet (`app/releve/casDeReleve.ts`), et leurs sept contrôles ; un cas naît d'une façade de l'audit.
- Fumée : points 54, 58, 59, 65, 67, 68, 71, 80, 81 et 82 (la capture du relevé), remplacés par 112 à 114 et les tests de l'éditeur
  (`tests/CHECKLIST-FUMEE.md`, « Points retirés au lot F6 »).
- **L'analyse « sans trace »** (lot L0) : une analyse dont le dépôt a été retiré, ou un appel immédiat, n'est plus envoyée sans rien
  garder ; sa trace va sous l'organisation (`claude/analyses/sans-depot/`).

- **L'écart du contour dans le calage d'un relevé** (lot F5) : `calage.contourDecaleM`, que rien ne lisait ; l'écart de la largeur
  vue va dans les dimensions de la façade validée (`dimensions.ecartPhoto`, en part). Un fichier d'avant le garde tel quel. Et le
  `lot` des étapes de l'enchaînement : plus aucune n'attend son lot.

- **L'unique corps principal codé en dur des pignons d'un fait** (`facade/regles/toits/pignons.ts::avecPignons`, `pignonsManquants`) :
  les pignons se posent sur le corps qui porte la façade (son mur désigné, sinon le côté en façade du contour qui regarde vers
  l'azimut du fait, le plus long, comme pour un appentis). AE 101 identique (`identite.ts` : « corps identiques »).

- **Le renfort de Claude à trois passes votées** (lot F3), dans l'audit et au serveur : `app/audit/parcelle/entreesRenfort.ts`, le
  vote et le schéma de `facade/detection/renfort.ts` (ses signaux, que le relevé lit encore, deviennent `facade/detection/signaux.ts`),
  l'application des avis de `renfortRecalage.ts` (le recalage des graines reste, `facade/detection/recalageIa.ts`), les deux images à
  grille de repères et graduée (`render/imagesRenfort.ts`, devenu `render/imageFacade.ts`), l'usage `renfort` du serveur PHP et ses
  fichiers (`deploy/prompt-renfort.md`, `deploy/schema-renfort.json`), sa section du banc des façades (`tests/banc/facades/renfort.ts`,
  `--sans-renfort`, les réponses simulées de `tests/fixtures/facades/claude/`, `simuler-claude.ts`). Une ligne `renfort` du journal de
  consommation se lit toujours ; un réglage des modèles qui la nomme est ignoré.
- **Les indicateurs d'étape propres à l'audit** (lot F3) : le statut du redressement et de la fusion (`app/audit/parcelle/redressement.ts`,
  « Rejouer redressement + fusion »), l'avertissement de fusion de l'écran de prise (`avertissementPrise`), la glue de `mesures.ts`
  (les appels directs à `redresserEtFusionner`, `analyserSerie`, `calageDeSerie`, `releveDuMur`) et le composant des repères de
  l'audit (`zones/parcours/CoinsPhotoAudit.tsx`) : la barre de progression, l'orchestrateur et le geste partagé les remplacent.

- **`app/releve/renfortReleve.ts`** (lot F2) : `creerAideReleve` à trois passes, `fabriqueImagesRenfortNavigateur` (la photo à grille
  et l'élévation graduée du relevé), `reponsesRenfort`, `DemandeAide`, `ReponseAide`, `FabriqueImagesRenfort`, `ContexteAide` ;
  `contenuRenfort` et `requetesRenfort` vont à l'audit, leur seul appelant (`app/audit/parcelle/entreesRenfort.ts`). Et ce que seul le
  relevé lisait : `grainesDeCoins` (`facade/detection/renfortRecalage.ts`) et `depuisGrille` (`facade/detection/renfort.ts`), gardés par
  le banc du renfort.

- **Le second composant du calage à la main** (lot F1) : `zones/CalageSilhouette.tsx` (la silhouette aux proportions verrouillées et
  l'étirement de la photo en hauteur) et `facade/calage/calageSilhouette.ts` (`calageDe`, `egoutDuCalage`, `bouger`, `coinsDuCalage`),
  avec leurs deux tests et les règles `.calCalage.prise` : `AjusterMur.tsx` les absorbe, l'égout tiré librement faisant le travail de
  l'étirement. Et la silhouette posée avant le calage : le paramètre `gabarit` de `murSurLAssemblage`, `affinerEgoutEtSol`,
  `coinsAutoDeSerie` et `murDeLaSerie`.

## [5.0.0] — 2026-10-29

Version **majeure** au sens de `MD/RELEASE.md` §2.1 : le `.glb` exporté change pour des projets déjà enregistrés.

### Changements de nombres et d'exports (version majeure)

- **Vue 3D et `.glb` : plus de cheminée d'office.** Un toit simple ou en volumes en pente de plus de 40 m² recevait une souche
  qu'aucune source n'avait vue ; elle est retirée (détail plus bas, « Corrigé »). Le `.glb` d'un tel projet perd une maille par
  bâtiment : sur la démonstration, la Maison (`glb-structure.json` mesuré par le point 24 : 1 143 nœuds, 955 mailles, 1 454
  matériaux, 3 954 accesseurs, 3 970 vues tampon, 11 709 376 octets).
- **Couleur des murs des annexes** : une annexe dont la photo de rue (Panoramax) donne une lecture concluante prend cette teinte en
  3D, dans le `.glb` et la DP6, comme un bâtiment (projets géolocalisés seulement).
- Les exports du plan de démonstration ne bougent qu'à leur numéro de version et à la date de build (preuve forte, sept sur sept,
  `tests/fixtures/golden/EMPREINTES.md`). Le schéma des projets reste 6 : rien à faire côté plateforme.

### Ajouté

- **Façades, lot F0 : l'orchestrateur et la barre de progression, la calibration pour premier consommateur** (`MD/spec-facade-calage-audit.md`
  §4 ter, §7.3, §9). Les étapes d'une façade (É0 préparation à É9 validation) sont un contrat écrit une fois (`model/etapeFacade.ts`) ;
  l'orchestrateur `facade/releve/enchainement.ts::derouler` les déroule dans l'ordre, calcule l'état de chacune (faite, à confirmer, en échec,
  sautée) contre ses objectifs, rangés en réglages (`regles/facades/enchainement.json`), mesure le calage et les ouvertures contre la vérité
  d'un cas, reprend depuis une étape et s'arrête à la demande ; il appelle la chaîne telle quelle (sur six scènes du banc, l'éditeur et la
  mesure rendent les mêmes images et les mêmes cotes au bit près). Admin › Calibrer la détection montre en haut de l'éditeur d'un cas la
  **barre de progression** de la façade (`zones/composants/BarreProgressionFacade.tsx`, huit segments, un état en mot et en forme, un ruban
  au téléphone, « Arrêter » pendant le calcul ; la même servira l'audit) et une **frise des étapes**, chacune avec sa vignette, qui s'ouvre
  en grand avec ses calques, son contrat et « Rejouer depuis cette étape » (commande `facade.etape`). Le cas d'étalon d'AE 101 sud
  (deux pignons et l'appentis, la pose constatée de 302 px au lieu d'environ 610) est posé au corpus réel avec la vraie forme de son toit
  corps par corps (`tests/fixtures/facades-reel/etalons/`, `reel.ts etalon`). Le cliquet des orphelins de la migration est posé
  (`tests/unit/architecture/orphelins.test.ts`). Fumée : point 100.

- **Mode Toit : la poignée « Hauteur à l'égout » de chaque corps.** De face, à côté de « Hauteur du faîtage », elle corrige une
  hauteur mal lue (l'IGN dit 3,5 m, le LiDAR lit 8 m sur un arbre ou un toit voisin) : le corps entier monte ou descend, égouts,
  faîtage, pignons, lucarnes et souches ensemble, la pente gardée ; l'égout reste entre 1,5 et 40 m, au pas de 5 cm, et ce qui est
  posé sur ses murs suit. Sur le corps principal, l'élévation du bâtiment suit et se dit choisie (`egoutChoisi: 'saisie'`, comme le
  champ « Élévation »). Comme tout geste du mode, le toit est figé (niveau 1 de `model/protections.ts`) : la relecture LiDAR et
  l'actualisation IGN n'y reviennent pas, et « Valider » en fait une seule étape d'historique. La 3D, la DP2 (« Existant H ») et
  l'inspecteur lisent les nouvelles hauteurs. Fumée : point 97.

### Modifié

- **Admin › Calibrer la détection rejoue un cas par l'enchaînement de la façade.** « Redresser le mur » devient « Rejouer » (le cas tel
  qu'il est enregistré, étape par étape) ; « Retrouver le mur sur toutes les photos » cherche de nouveau les coins puis rejoue. Le calage
  de la silhouette est l'option manuelle de l'étape du calage (É4) et rejoue depuis elle. La mesure des cas validés et le banc du corpus
  réel préparent leurs cas par l'orchestrateur (`preparerPourLaMesure`), aux mêmes nombres. Le moteur de redressement, d'assemblage et
  de fusion ne bouge pas (banc « chaîne du relevé » et « fusion » identiques, `egout-sol.ts` identique, AE 101 identique, empreintes
  inchangées).
- **Le zoom du plan ne redessine plus les objets.** Les objets se dessinent en mètres dans un calque qui porte la transformation du
  repère du dessin (`render/objects.ts`, `app/assemblage/surface.ts`) : un cran de zoom ne change qu'elle. Ce qui se mesure en
  pixels garde ses coordonnées et porte la transformation inverse : le nom d'un objet, le tracé d'un chemin, les poignées et les
  cotes de l'objet sélectionné. Les traits gardent leur épaisseur et leurs tirets à l'écran (`non-scaling-stroke`). La clôture et
  les ouvertures relevées se dessinent aussi en mètres (`render/repere.ts`) ; seule la poignée d'un accès lit l'échelle. Le frein
  du zoom se juge maintenant sur l'image entière, ce que le navigateur repeint compris (`app/boot/rendu.ts`). Au bureau, le zoom
  se dessine donc en direct pendant le geste. Au téléphone, l'aperçu suit le geste et le rendu au repos coûte moitié moins de
  script. Banc de production à 600 objets, avant → après : téléphone 87–150 ms (dont plan 73–94) → 87–108 ms (dont plan 34–38) ;
  bureau 28–47 ms (dont plan 17–23) → 7–18 ms (dont plan 6–7). Le banc mesure aussi l'image (`image`) et le geste réel
  (`geste`). Au repos, le plan est le même à l'anticrénelage près ; aucune empreinte ne bouge.
- **L'heure du soleil est l'heure légale du lieu du projet.** La date et l'heure tapées (inspecteur du parasol, Vue 3D,
  visionneuse) se lisaient toujours à l'heure française, quel que soit le lieu : à La Réunion, « midi » tombait à 14 h sur place.
  Le fuseau se déduit maintenant de la latitude et de la longitude de la parcelle, sans réseau (`geo/fuseau.ts`) : la France
  métropolitaine et la Corse (Europe/Paris), la Guadeloupe, Saint-Martin et Saint-Barthélemy, la Martinique, la Guyane,
  Saint-Pierre-et-Miquelon, La Réunion, Mayotte, la Polynésie (Tahiti, Marquises, Gambier), la Nouvelle-Calédonie,
  Wallis-et-Futuna, et les voisins (Belgique, Luxembourg, Suisse, Monaco, Andorre, Allemagne, Italie, Espagne, Canaries) ;
  ailleurs, l'heure de Paris, et l'interface le dit. Le décalage est celui de l'instant même (`Intl.DateTimeFormat`,
  `shortOffset` ; sans les fuseaux d'ICU, la règle écrite) : la nuit d'un changement d'heure, les heures d'avant le changement
  gardent l'ancien décalage, au lieu de celui de midi pour toute la journée. Sous le curseur de l'heure de l'inspecteur et dans
  l'infobulle de l'heure des vues 3D : « Heure légale de … (zone) ». Un projet en France métropolitaine garde son soleil au bit
  près (hors ces nuits, soleil couché) ; aucune empreinte ne bouge, le fichier ne change pas de forme.

### Corrigé

- **Les poignées de la sélection restent à leur place quand l'empilement les remonte.** Depuis que les objets se dessinent en mètres dans leur
  calque, une poignée y porte la transformation inverse du repère (`render/objects.ts`). Recréée dans le calque pendant un
  rendu, puis remontée devant tout au rendu suivant, elle gardait cette transformation sans que son objet se replace. Elle se
  dessinait alors décalée, et le garde-fou `[cle de version]` faisait échouer les points 97 et 98 de la fumée en classe
  compacte. L'empilement replace maintenant l'objet dont il sort un élément du calque ou l'y ramène
  (`app/assemblage/dessin.ts`).
- **La Vue 3D ne pose plus de cheminée que personne n'a vue — changement d'export (version majeure).** Sur un toit simple ou en
  volumes en pente de plus de 40 m², la 3D dessinait d'office une cheminée au tiers du faîtage, qu'aucune source n'avait vue : elle
  disparaissait quand le LiDAR arrivait, et l'audit comptait zéro cheminée là où la 3D en montrait une. Une souche ne se dessine
  plus que depuis les données du bâtiment (LiDAR, règles, audit, Mode Toit ; le geste « Cheminée » du Mode Toit sur un toit simple
  crée le corps qui la porte). Le `.glb` exporté perd une maille par bâtiment concerné : sur la démonstration, la Maison, d'où le
  témoin `glb-structure.json` à 1 143 nœuds, 955 mailles, 1 454 matériaux, 3 954 accesseurs et 3 970 vues tampon (calculé, à
  refermer par le point 24 sous `RECAPTURER_GLB=1` ; `tests/fixtures/golden/EMPREINTES.md`, « Version suivante »). Les autres
  exports et les quantités ne bougent pas. `MD/spec-flux-batiment.md`, point 12.

- **Mode Toit : un corps choisi montre son mur le plus visible.** Sa silhouette et ses poignées se posaient sur son mur le plus tourné
  vers la caméra, qui peut être caché derrière l'autre corps d'une maison à deux corps (le pignon de « Corps 2 », contre le corps
  principal). C'est maintenant le mur que l'on voit le mieux : tourné vers la caméra et le moins caché par les autres corps (des
  points du pied au haut du mur, dont la vue vers la caméra passe ou non dans le volume d'un autre corps) ; à visibilité égale, le
  plus tourné vers la caméra, et un mur vu de chant ne l'emporte pas (`facade/modeToit/poignees.ts::murLePlusVisible`,
  `partVisibleDuMur`). Sans rien qui cache, le choix ne change pas. Toucher un corps dans le navigateur des façades suit la même
  règle. Le dessin et la couleur de la silhouette ne changent pas.
- **Une session du Mode Toit ne s'enregistre plus avant « Valider ».** Les gestes du mode écrivent le bâtiment en place (la 3D les
  montre) sans marquer le projet ; l'enregistrement seul de la lecture des toits en fond, qui part quand tout ce qui attend vient
  d'elle, sérialisait alors le bâtiment tel que la session le laissait. Vérifié en exécution (démonstration, panneau solaire posé
  sans valider, un bâtiment lu en fond : le projet enregistré portait le panneau et le toit figé). Ce qui s'enregistre pendant une
  session — l'enregistrement seul comme Ctrl+S — porte maintenant le bâtiment à son départ (`app/toits/modeToit.ts::objetsHorsSession`,
  lu par la sérialisation du projet, `app/projet.ts`) : abandonnée, la session ne laisse aucune trace ; validée, elle
  marque le projet à enregistrer, comme avant.
- **Le Mode Toit ne s'ouvre plus sur la maison d'un voisin, et s'ouvre toujours sur la maison verrouillée du projet.** Il refusait
  le seul voisinage importé (`voisinage`) : la maison d'une parcelle mitoyenne posée par l'import cadastre (`bdtopo`, hors de la
  parcelle du projet) se retouchait et se figeait. `locked` n'est pas le critère : il protège le contour (ni déplacé, ni supprimé),
  pas le toit, et la maison du projet est verrouillée à l'import. Le critère est la parcelle : un bâtiment importé hors de la parcelle
  du projet, ou du voisinage, est « chez un voisin » (`app/toits/modeToit.ts::estRetouchable`, `raisonNonRetouchable`) ; un bâtiment
  dessiné reste celui de la personne. Le bouton « Modifier la toiture » de la Vue 3D se grise alors et dit pourquoi (infobulle, et
  message au toucher), par `commandes.etat` (`raisonInactive`).
- **La silhouette des façades de la calibration, du relevé et de l'audit est celle du Mode Toit.** Le gabarit du mur
  (`facade/gabaritMur.ts`) se lisait le long du seul côté du contour, par une marche en profondeur à lui : le pignon d'une maison en L
  s'y coupait au coin de l'aile (un demi-triangle étiré sur toute la façade), et un mur de quelques dizaines de centimètres prenait
  des pointes. Il est maintenant fait de la silhouette que trace le Mode Toit en 3D, corps par corps (`silhouetteDuCorps`, la même que
  `silhouetteVersLOeil`), projetée sur le plan du mur et vue de face, le plus haut l'emportant
  (`facade/regles/toits/silhouetteDesCorps.ts::silhouetteDeFace`) ; le mur d'un corps dans le plan de la façade se voit entier, même
  au-delà du côté du contour (`u` hors de 0..1). Il vient toujours du plan et du LiDAR, jamais de la photo, et seule son échelle
  suit l'égout, le sol et les bouts. « Ajuster l'égout et le sol », le calage de la silhouette, la façade complète, l'image posée et
  la vue 3D de la calibration ferment son contour sous ses propres bouts (`contourDuGabarit`). La détection, le calage et les
  empreintes ne bougent pas (banc des façades identique), AE 101 non plus.

- **Mode Toit : les poignées sont sur le corps choisi.** De face, choisir un autre corps que celui de la façade regardée traçait sa
  silhouette sur lui mais laissait poignées et cotes sur la façade de l'autre corps : elles tiraient la maison quand on croyait
  régler l'aile. Les poignées et la bulle suivent maintenant la silhouette (même mur, celui du corps choisi le plus tourné vers la
  caméra ; `poignees.ts::cibleDesPoignees`), qui garde son dessin et sa couleur. De dessus, rien ne change.

### Modifié

- **La couleur des murs lue sur les photos de rue (Panoramax) passe par `model/protections.ts`, et lit aussi les annexes.** Sa
  case, `couleurMurs.photo`, a son propre groupe (`photoMurs`), à part de la couleur retenue (groupe `murs`) qu'elle n'écrit
  jamais ; l'écrivain `panoramax` est de niveau 4, une mesure sur une photo, comme la couleur du toit sur l'orthophoto. La source
  choisie, « photo » comprise, ne l'arrête pas : la personne qui a choisi la photo reçoit toujours la lecture à jour. Seule une
  couleur vue sur place (audit validé, `terrain`) occupe la case : sous elle, la photo n'est plus lue ni téléchargée (elle n'était
  déjà plus montrée, la couleur vue passant avant). La lecture prend le bâti entier (`model/fonctions.ts::estBati`) : une annexe
  lue prend en 3D (GLB, DP6) la teinte de sa photo plutôt que la couleur du plan, comme un bâtiment, et cache les murs derrière
  elle sur une photo. Empreintes inchangées (aucune ne porte de couleur des murs).

- **Une écriture ne refait que ce qui lit l'objet écrit, et un déplacement de la vue ne redessine plus le plan** (feuille de
  route, étapes 6.5 et 2.3 ; aucun changement visible, empreintes inchangées). Le plan se dessine dans un repère gardé tant que
  l'échelle et la taille ne changent pas (`render/repere.ts`) : un déplacement de la vue ne change plus que le `viewBox`, et
  seuls les objets qui entrent dans la vue ou en sortent se redessinent. Le contrôleur des objets distingue une écriture de forme
  seule (`toucherForme` : le glisser, la nomenclature calculée), qui laisse en place ce qui ne lit que les attributs des objets
  (explorateur, barres, surimpression), et garde chaque calcul sur la version des seuls objets qu'il lit (`cleDesLus`, lecteurs de
  `core/lectures.ts`) : calques du dessus, trous des terrasses, chiffrage, cotes, panneaux du tiroir par onglet, doublons, schéma à
  écrire, emprise des terrains. L'historique reçoit les objets écrits (`pushHistory(obj)`, `markDirty(obj)`), et les gestes, les
  champs de l'inspecteur, le tiroir, les sommets, l'alignement, le relief, le mode Toit et les commandes d'objet les nomment ; une
  écriture qui ajoute ou retire un objet garde le repli « tout est neuf ». La Vue 3D affichée ne suit plus chaque rendu du plan.
  Au banc de production, à 600 objets (médiane de 21 images, deux passages) : glisser un objet au bureau 31 → 10–11 ms, au
  téléphone 73–90 → 37–54 ms ; déplacer la vue au bureau 51–79 → 12–13 ms, au téléphone 194–206 → 55 ms (dessin du plan 111–126
  → 12 ms) ; un rendu sans changement au téléphone 7–16 → 5–7 ms. Le zoom redessine toujours tout ce qui dépend de l'échelle
  (190–220 ms au téléphone) : le frein `RENDU_LENT_MS` reste, jaugé à part pour le zoom et pour le déplacement. Le banc mesure
  ces gestes (`BANC_SCENARIOS=rendu,glisser,terrasse,zoom,pan`).

- **Le flux de construction d'un bâtiment a son propre document** (`MD/spec-flux-batiment.md`), sorti de `MD/spec-ouvrages.md`
  avec tout son texte et son historique, et un schéma du flux (naissance, lecture LiDAR, gestes de la personne, relevé, audit,
  actualisation IGN, sorties, avec les questions posées à `model/protections.ts`). Les deux documents sont mis à jour à la 4.0.0 :
  annexes lues au LiDAR, schéma 6, « Rendre au calcul », références qui suivent un contour déformé, couleur du toit sous le
  module des protections, étapes 6.3, 6.4, 6.6 et 6.7. Documentation seulement : rien ne change à l'écran ni dans les fichiers.

### Supprimé

- **L'enchaînement propre à la calibration** : `facade/releve/casCalibration.ts` (`coinsDeSerie`, `preparerSurLAssemblage`,
  `assemblageDeLaSerie`, `facadeSurLAssemblage`, `etapesDe`, `versLesPhotos`, `casCale`, `avisDuCas`) et son test, la glue de
  `zones/EditeurCasCalibration.tsx` (le redressement et la recherche des coins écrits dans l'écran, les neuf figures numérotées « 1. » à « 9. »
  de `EtapesDuCas`), `preparerCas` de `facade/corpusReel.ts`, et les indicateurs d'étape propres à la calibration (les titres « 5. » et
  « 6. » du calage de la silhouette, l'avis de la fusion à part) : l'orchestrateur, la barre et la frise les remplacent. Les contrôles
  `calibration.redresser`, `calibration.etapes` et `calibration.avisFusion` partent avec eux.

## [4.0.0] — 2026-10-28

Version **majeure** au sens de `MD/RELEASE.md` §2.1 : des nombres exportés changent pour certains projets déjà enregistrés.

### Changements de nombres et d'exports (version majeure)

- **Chemins** : un chemin sans largeur écrite mesure 1 m partout (le dossier PDF et le dossier piscine lisaient 0,5 m), et la
  surface d'un chemin se compte sur le tracé dessiné, la courbe d'un chemin courbe. Bougent la surface et la longueur totale au
  résumé, la page des surfaces du PDF du plan, la surface et le trait au dossier PDF, le trait au dossier piscine.
- **DP2** : « Existant H » donne la hauteur au point le plus haut (toit compris) et non plus la hauteur à l'égout, pour tout
  bâtiment qui porte un toit en pente.
- **Annexes lues au LiDAR** : toit, hauteur à l'égout et recalage du contour, y compris dans les projets enregistrés (lus une
  fois à la prochaine ouverture). Bougent la Vue 3D et le `.glb`, la DP2 (« Existant H »), la DP6 et le dossier PDF de tout
  projet géolocalisé qui porte une annexe.
- **Note de calcul d'une piscine** : elle dit qu'une terrasse est percée avec la définition de la terrasse (le bord des
  margelles, dans les deux sens), et non plus seulement quand un sommet du plan d'eau tombe dans la terrasse : le texte change
  pour une piscine dont la margelle seule chevauche une terrasse.
- **Vue 3D et `.glb` d'un bâtiment relevé lu en corps et pignons** : un mur relevé « en L » garde les corps du toit (ils
  disparaissaient), et un mur relevé ne reçoit plus, par-dessus sa photo, la grille des fenêtres automatiques.
- Le soleil d'un projet sans soleil choisi devient le jour même à 15 h (le plan le prenait au 21 juin, la Vue 3D à midi UTC) :
  l'ombre des parasols à l'écran et l'éclairage de la Vue 3D changent ; aucun export chiffré ne le lit.
- **Schéma des projets 6** (ci-dessous) : la plateforme doit accepter 6 avant le dépôt (bertrandra/backprod#242, migration de
  base appliquée par `setup.php` en production).
- Les exports du plan de démonstration ne bougent qu'à leur numéro de version et à la date de build, en plus des nombres des
  chemins déjà recapturés (preuve forte dans `tests/fixtures/golden/EMPREINTES.md`).

### Ajouté

- **« Rendre au calcul » la hauteur à l'égout d'un bâtiment.** Saisie dans « Élévation » ou validée par l'audit, la hauteur à
  l'égout n'est plus réécrite par aucune lecture. Un bouton sous le champ la rend à la lecture du LiDAR : la marque tombe, le
  toit se relit en tâche de fond et reprend la hauteur mesurée ; Ctrl+Z défait le geste. Il ne se montre que si une lecture peut
  la reprendre (ni bâtiment dessiné, ni toit réglé à la main, vérifié sur place ou lu sur une photo).

- **Retoucher la forme d'un objet de l'IGN, après un avertissement** (décision du 27 octobre 2026). Une parcelle du cadastre, un
  bâtiment ou un élément de l'IGN ne se déplace ni ne tourne, mais sa forme peut être fausse à l'IGN : tirer un sommet, un côté
  ou le rayon, ajouter ou retirer un sommet, saisir un angle ou une longueur, le mode rectangle demandent d'abord « « Maison »
  vient de l'IGN. La retoucher à la main la détache de l'IGN… Continuer ? ». Confirmé, l'objet garde un marque enregistré dans
  le fichier (`retoucheMain`) et la question ne revient plus ; annulé, rien ne se passe. À l'actualisation IGN (« Actualiser
  depuis l'IGN » comme « Actualiser le projet »), un objet retouché est gardé tel quel ; une case décochée par objet,
  « Reprendre la version de l'IGN pour « X », retouché à la main le JJ/MM/AAAA », le remplace par sa source et retire le marque.
  Sans objet retouché, les dialogues ne changent pas.

- **La fumée complète, chaque nuit** (`.github/workflows/fumee-nuit.yml`, feuille de route, étape 0.1). La CI ne joue que les douze
  points du lot `ci`, au bureau et en thème clair. Ce workflow joue tous les points, dans les trois classes d'écran et les deux
  thèmes, avec le réseau témoin : une tâche par couple, de 12 à 30 min, chaque nuit à 3 h 17 UTC, et à la demande. Un échec fait
  échouer l'exécution, ce dont GitHub prévient le propriétaire du dépôt. Le résumé liste les points rouges, et le journal et les
  captures restent téléchargeables quatorze jours. Le premier passage a trouvé sept points toujours rouges, déjà rouges avant ce
  jour (69, 70, 74, 76, 82, 93 et, en compact, 10) et deux instables (23, 75). Ils sont l'étape 0.4 de la feuille de route.
- **Le banc du rendu du plan** (`scripts/banc-rendu.mjs`, feuille de route, étape 0.2). Il duplique la démonstration jusqu'à
  147, 300 et 600 objets et mesure un rendu complet au bureau et au téléphone (processeur ralenti ×4) ; `BANC_PROFIL=1` montre ce
  qui coûte. Premier résultat : le dessin SVG du plan tient (10,7 ms à 600 objets au bureau). Ce qui ne tient pas, ce sont les
  calculs que les zones refont à chaque notification : la hauteur des appuis et le sol sous l'emprise dans l'inspecteur, la
  recherche des doublons dans le menu. Un rendu complet coûte ainsi 82 ms au bureau et 506 ms au téléphone à 147 objets. La
  phase 2 de la feuille de route est réécrite sur ces chiffres. `window.__plan` (développement seulement) gagne `rendre()` et
  `dessinerObjet()`.

- **Une feuille de route des points faibles de l'architecture** (`MD/roadmap-architecture.md`). Elle part d'une revue de `main`
  et classe sept points faibles, du plus risqué au moins risqué : des nombres d'anciens projets qui peuvent bouger, des
  entrées de session lues par des couches pures, le plan redessiné en entier, `app/` sans domaines, la complexité du métier
  des toits, une interface surtout vérifiée à la main, une exploitation qui dépend de gestes manuels. Elle les range en six
  phases, chacune utile seule : filets, reproductibilité, performance, structure, modèle, exploitation. Les phases 0 et 1
  sont engagées.

- **La fumée pilotée jouée à chaque PR** (job `fumee` de la CI, en parallèle de `verifier`). Un lot de douze points du cœur
  (`node scripts/fumee.mjs URL ci`) : glisser un sommet, inspecteur, nomenclature chiffrée, débit, implantation, dossier PDF,
  fichier du projet exporté puis rouvert (point 99, nouveau), ouverture de la Vue 3D et mode Toit, import par adresse et
  orthophoto sur le réseau témoin, audit de la parcelle, Admin › Consommation. Au bureau, thème clair, Vue 3D en Économe
  (`FUMEE_QUALITE_3D`), chaque point borné à 150 s (`FUMEE_DELAI_POINT`) : un point qui pend échoue sous son nom. En cas
  d'échec, la page de chaque point raté et le journal sont téléversés (`FUMEE_CAPTURES`). Le témoin du réseau rend
  l'origine de la requête dans l'autorisation CORS, comme l'IGN : les points 12 à 15 se jouent sur n'importe quel port.

- **Vérification des requêtes du serveur contre la vraie API Claude** (`npm run verifier:api-claude`, avant chaque livraison).
  Tous les tests passent par un faux Anthropic qui accepte n’importe quel corps : le refus « compiled grammar is too large »
  n’avait été vu qu’en production. Le script lance le vrai serveur PHP du dépôt (`deploy/analyse.php`, `deploy/admin.php`)
  sous `php -S`, ouvre la session d’administrateur et envoie par l’appel immédiat une requête minimale (une photo de test)
  par prompt, schéma et modèle servis : l’analyse (qui couvre l’escalade, les cas candidats et le rejeu, mêmes prompt, schéma
  et corps) et le renfort. Il échoue au premier refus, avec le message d’Anthropic, ou à une sortie hors schéma, et dit le coût
  journalisé. La clé se lit dans `ANTHROPIC_API_KEY` et ne s’écrit que dans une configuration temporaire supprimée à la fin ;
  le serveur lui-même plafonne la dépense (0,05 $ par défaut, `--plafond`). `--modele` essaie un autre modèle admis. Un
  workflow manuel (`verifier-api.yml`, secret `ANTHROPIC_API_KEY_TEST`) le lance depuis GitHub.

- **Une sauvegarde des données en un clic** (Admin › « Télécharger une sauvegarde des données »). `GET admin/sauvegarde`
  (`deploy/admin.php`, session admin) rend une archive `plan-data-AAAA-MM-JJ-HHMM.zip` de tout le dossier des données : démos,
  audits et analyses par Claude, journal et réglages de Claude, palette, contrôleurs, arbres, conformité, avec un manifeste
  `sauvegarde.json`. Rien hors du dossier : ni la configuration, ni la clé d'API, ni la cible d'un lien symbolique. L'archive se
  construit dans un fichier temporaire et se sert par morceaux ; sans l'extension PHP `zip`, la route répond 501 et dit où
  l'activer. La notice de déploiement gagne un paragraphe « Sauvegarde » : vérifier la sauvegarde automatique de l'hébergeur
  (SiteGround : Site Tools › Security › Backups) et télécharger l'archive avant chaque mise à jour.

- **Le toit à trois pans dans le catalogue du mode Toit.** Sous la vignette « Quatre pans » (onglet « Toit »), deux options :
  « Croupe au début » et « Croupe à la fin ». Le corps prend le quatre-pans du catalogue avec une seule croupe, au bout du
  faîtage demandé, et un pignon à l'autre bout (`croupes` à `[h, 0]` ou `[0, h]`, que la 3D dessinait déjà). Comme toute forme,
  elle ne change que le corps choisi, ou le bâtiment entier sans choix. Au doigt, les options sont des cibles de 44 px.

### Modifié

- **Les annexes sont lues au LiDAR, comme les bâtiments — changement de version majeure** (`MD/RELEASE.md` §2.1, décision du
  28 octobre 2026). Le toit d'un abri de jardin est réel : la mesure bat le défaut et la BD TOPO. Une annexe reçoit désormais le
  toit lu au LiDAR HD (forme, corps et pignons), sa hauteur à l'égout mesurée et, posée sur la parcelle du projet ou une
  mitoyenne, le recalage de son contour, au niveau 4 de la hiérarchie (`model/protections.ts`) et sous les mêmes marques qu'un
  bâtiment : « Règles » coupées, toit saisi ou lu sur une photo, hauteur choisie, contour retouché à la main ou dessiné, vérifié
  sur place. L'ouvrage le déclare (`Ouvrage.toitLuAuLidar`, `model/fonctions.ts::toitLuAuLidar`) ; la lecture, les mitoyens et
  la question du toit à cheval le demandent. **Les projets enregistrés aussi** : une annexe sans marque de lecture est lue une
  fois, en tâche de fond, à la prochaine ouverture du projet. Le toit lu se dessine comme celui d'un bâtiment : Vue 3D et
  `.glb`, DP2 (« Existant H », la hauteur au point le plus haut), DP6, dossier PDF. **Le nombre change dans la DP2 de tout projet
  géolocalisé qui porte une annexe, là où le LiDAR HD couvre**, et la 3D et le `.glb` la montrent avec son toit. Aucune empreinte de
  `tests/fixtures/golden/` ne bouge (le témoin n'est pas géolocalisé). Au passage, une hauteur posée sur une annexe ou un
  bâtiment dessiné n'est plus réécrite à l'actualisation IGN : la lecture demandait le droit d'écrire la hauteur après avoir
  marqué le bâtiment lu, ce qui la faisait passer pour une mesure (la tâche de fond, elle, la gardait déjà).
- **Le dessin, la 3D, les exports et le fichier lisent la fonction d'un objet dans le registre des ouvrages** (feuille de route,
  étape 6.4 ; interne). Les comparaisons écrites à la main (`fonction === '…'`) passent de 63 à 13 : un objet se reconnaît par son
  ouvrage (`estOuvrage`, `estTerrain`, `estTerrasse`, `estPointDeVue`), le bâti des exports par sa famille (`estBati`), et ce qui
  est propre à un ouvrage se déclare une fois. Dans le modèle (`model/ouvrages/`) : ce que le dossier piscine dessine autour du
  bassin (`dossierPiscine`), les réglages qu'un objet du voisinage ne garde au fichier que pour son ouvrage (`reglagesAuFichier`),
  le nom de l'inspecteur qui suit la fonction (`nommeParSaFonction`). Dans le plan, un registre à lui (`render/ouvrages/`) :
  la flèche du point de vue, le pointillé de la limite. Exports, fichier, 3D et zones n'en ont plus aucune ; il en reste dix dans
  `app/toits/` et `app/audit/parcelle/`, deux dans `render/couleurMurPhoto.ts` et une dans `ui/champs/objet.ts`, que le cliquet
  du test d'architecture garde. Aucun nombre, aucun export ne change (empreintes inchangées).
- **Chaque ouvrage indépendant des autres** (feuille de route, étape 6.6 ; interne). Un ouvrage ne lit plus d'un autre que ce que
  leur lien déclare : les liens « plage » et « percer » entre la terrasse et la piscine sont nommés une fois
  (`engine/ouvrages/liens.ts`), et chaque ouvrage publie ce que les autres lisent (`engine/ouvrages/terrasse.ts` : sa forme trouée,
  sa surface nette ; `engine/ouvrages/piscine.ts` : le bord du bassin, son emprise, la création de sa plage). Le bois partagé a
  son nom (`engine/bois/` : débit, essences, portées, règles du platelage) ; la géométrie qui vivait chez un ouvrage passe dans
  `geometry/` (`cotesVusDeDehors.ts`, ex-`facade/geometrie.ts` ; `triangulation.ts` ; `safeOffset` et `aireCommune` dans
  `polygon.ts`) ; la note de calcul et le calcul de l'abri sous `engine/abri/` ; la 3D a un module par ouvrage
  (`three/ouvrages/`) ; la section Parasol de l'inspecteur est au parasol (`ui/champs/parasol.ts`) ; les décisions de l'audit et
  l'import du cadastre écrivent la clôture par ses gestes (`model/cloture.ts`). `tests/unit/architecture.test.ts` interdit à un
  module d'ouvrage d'importer les internes d'un autre : dix-neuf couplages au départ, zéro à l'arrivée. Aucune empreinte ne
  bouge. Un seul effet visible : la note de calcul d'une piscine dit qu'une terrasse est percée avec la définition de la terrasse
  (le bord des margelles, dans les deux sens), et non plus seulement quand un sommet du plan d'eau tombe dans la terrasse.

- **Un seul soleil pour le plan, la Vue 3D et la visionneuse, enregistré avec le projet** (feuille de route, étape 6.7 ;
  décision du 28 octobre 2026). Il y en avait trois, avec trois défauts : l'ombre des parasols sur le plan (le 21 juin, 15 h), la
  Vue 3D et la visionneuse (la date UTC du jour, midi) ; le même parasol n'avait pas la même ombre sur le plan et en 3D, et un
  projet rouvert ne retrouvait pas son soleil. La date et l'heure sont maintenant celles du projet (`core/soleil.ts`,
  `model/soleilProjet.ts`) : les régler dans l'inspecteur du parasol (« Soleil — date », « Soleil — heure »), dans les réglages de
  la Vue 3D ou de la visionneuse, ou par « Heure dorée », change les trois vues à la fois. L'intensité et la lumière d'appoint
  restent propres à chaque vue. Le soleil s'enregistre sur la parcelle (`soleil`, seulement une fois choisi) et revient à la
  réouverture ; le changer reste un réglage d'affichage — ni Ctrl+Z, permis en lecture seule — qui marque pourtant le projet à
  enregistrer, comme « Relief ». Un projet qui n'en a pas (tous les fichiers d'avant) prend aujourd'hui, en date locale, à
  15 h. La carte des heures d'ombre garde sa fenêtre — toute la saison, et non la date choisie — et le dit maintenant sous sa
  case : « Toute la saison, mai à septembre, 12 h – 18 h, pas la date choisie ». Les seuils de hauteur du soleil (ombre du
  parasol, extinction et plancher de la lampe) sont rangés au même endroit ; le commentaire qui attribuait la formule du soleil
  à la NOAA est corrigé. Aucune empreinte ne bouge : un fichier sans soleil choisi garde sa forme au bit près.
- **Un rendu du plan sans changement ne redessine plus ni les zones ni les calques du dessus** (feuille de route, étapes 2.2 et
  6.5). Chaque zone de l'interface s'abonne à ce qu'elle montre — une clé faite de la version des objets, de l'état d'interface du
  plan, de l'état de ses commandes et des outils (`zones/composants/abonnement.ts`, `useCle`) — au lieu de se redessiner à chaque
  rendu du plan ; une entrée de menu ou un bouton de commande suit sa seule commande. Les calques du dessus du plan (ombres des
  parasols, piscines, pergolas, relevés et clôture, cotes, échelle, nord, couches) gardent la clé de leur dernier dessin
  (`render/calquesGardes.ts`), l'empilement ne déplace plus rien s'il est déjà dans l'ordre (`poserEnQueue`), et la photo aérienne
  n'écrit que les attributs qui changent. En développement, une zone ou un calque sauté est quand même redessiné et comparé : un
  écart s'écrit `[cle de version]`, que la fumée fait échouer. Une écriture d'un champ de l'inspecteur et la nomenclature écrite dans
  la terrasse touchent désormais leur objet. Au banc de production, à 600 objets, un rendu sans changement passe au téléphone de
  73–78 ms à 7,5–27,6 ms (seuil 33 ms), au bureau de 30 ms à 1,2–1,5 ms. Rien ne change à l'écran ni dans les fichiers.
  `scripts/banc-rendu.mjs` gagne `BANC_ZONES=1` (les zones redessinées, en développement) et `BANC_ESSAIS=n`.

- **Une seule hiérarchie décide qui l'emporte sur un bâtiment** (décision du 28 octobre 2026) : la personne, puis ce qui a été vu
  sur place, le fait du moteur de règles, la mesure LiDAR, la BD TOPO, le défaut. Un écrivain automatique n'écrit plus qu'une
  valeur de son niveau ou d'un niveau plus faible (`model/protections.ts`). Ce qui change : **le LiDAR bat l'IGN** — l'actualisation
  IGN garde la hauteur à l'égout, le toit et le contour (recalage compris) lus au LiDAR, et ne prend le contour du jour que si
  l'IGN en a changé la forme (le LiDAR le relit alors, la hauteur mesurée reste) ; elle garde aussi la couverture choisie d'un toit
  qu'elle recalcule. Un bâtiment dessiné n'est plus recalé sur le LiDAR, et sa hauteur posée n'est plus réécrite. Dans l'audit,
  les cheminées, lucarnes et appentis d'un toit aux « Règles » coupées, et la couleur des murs dont la source est choisie, arrivent
  décochés ; un matériau des murs déjà validé par un audit se repropose coché (même niveau : le dernier gagne).

- **Une seule règle dit qui peut écrire quoi sur un bâtiment** (`model/protections.ts`). La lecture LiDAR, son recalage, le moteur
  de règles, l'actualisation IGN et l'audit de la parcelle demandent tous au même module s'ils peuvent écrire le contour, la
  hauteur à l'égout, le toit, ce qui est posé dessus, sa couverture, les murs ou les façades, au lieu de lire chacun une partie
  des marques (`toitFige`, `verifieSurPlace`, `retoucheMain`, `toit.source`) ; le tableau complet est dans `MD/spec-ouvrages.md`
  (« Qui l'emporte ») et un test l'épingle case par case.

- **La DP2 donne au bâti existant sa hauteur au point le plus haut** (`export/piecesDP.ts`). « Existant H » portait la hauteur
  à l'égout (`elevation`), alors que la légende de la pièce dit « H : hauteur au point le plus haut » : sur une maison à deux
  pans, il manquait toute la hauteur du toit, dans une pièce qui part en mairie. La hauteur est maintenant celle du toit que la
  Vue 3D montre (`model/volumesToit.ts::hauteurAuPointLePlusHaut`) : le faîtage le plus haut des corps (acrotère et édicules
  d'une toiture-terrasse compris), le faîte de la surface mesurée, le plus haut des volumes, sinon l'égout plus la hauteur du
  toit unique ; les cheminées n'y sont pas. **Le nombre change dans la DP2 de tout projet dont un bâtiment porte un toit en
  pente** : c'est une correction d'un nombre exporté, à compter dans la prochaine version majeure (`MD/RELEASE.md`). Aucune
  empreinte de `tests/fixtures/golden/` ne bouge (aucun témoin ne porte de DP2 avec un toit).

- **« Actualiser le projet » garde la clé d'un bâtiment refait** : le bâtiment recréé depuis la BD TOPO reprend la clé de
  l'ancien qui portait le même identifiant (cotes, audit et réglages qui s'y rapportent restent attachés). Il en prenait souvent
  une autre quand la clé n'était pas celle d'un import (`bati-…`). Un bâtiment sans correspondant prend une clé libre, comme avant.

- **L'inspecteur ne montre que ce qui sert à concevoir chaque ouvrage** (`MD/spec-ouvrages.md`, « Décidé, ouvrage par
  ouvrage », étape 6.4). Le propriétaire a tranché chaque proposition ; l'inspecteur règle, il n'affiche plus de résultat.
  - **Tous les objets** : « Matière » (que seul l'export SVG recopiait), « Priorité d'affichage » (le geste « Reculer » la
    remplace) et la section « Alignement par rotation » sont retirées. L'outil « Aligner » de la palette va désormais jusqu'au
    bout : le côté cible désigné, l'objet sélectionné pivote. Les textures se replient sous « Textures », les côtés et les coins
    restent repliés.
  - **Parcelle** : le lieu, le cadastre, la clôture et les portails restent ouverts. La déclaration préalable devient un dialogue
    du menu Exporter (« Déclaration préalable… »), avec les mêmes champs et le bouton du dossier. Le voisinage 3D rejoint les
    réglages de la Vue 3D (groupe « Voisinage »). « Relief » et « Courbes de niveau » ne sont plus que dans le menu Affichage ;
    la grille, le maillage secondaire, les points max et le zéro du plan se replient sous « Réglages techniques », « Actualiser »
    reste à portée. La clôture côté par côté se replie, le réglage général reste ouvert.
  - **Terrasse** : les étapes restent, une ouverte à la fois, les paramètres de calcul repliés ; l'optimisation de la structure
    part dans un onglet « Optimisation » du tiroir, à côté de la nomenclature ; la lame de rive côté par côté se replie.
  - **Piscine** : les cinq étapes restent ; le métrage, le chiffrage et les prix partent dans un onglet « Piscine » du tiroir,
    avec le volume d'eau, les distances aux limites et la taxe d'aménagement. Un rappel court reste sous l'étape (le volume ;
    la limite la plus proche et la taxe de base).
  - **Pergola, carport** : matériau, toit, hauteur, côté de référence, adossé, débord, poteaux et poutres restent ouverts ;
    contrefiches et chevrons, couleurs et longueurs achetables se replient, comme les hypothèses et les vérifications de la note
    de calcul, dont le bouton du PDF reste en vue. Le métrage et les prix partent dans un onglet du tiroir, qui porte le nom de
    l'ouvrage (« Pergola » ou « Carport »).
  - **Bâtiment, annexe** : « Façades et toit » reste, « Fenêtres (3D) » est repliée ; un bâtiment importé de l'IGN et verrouillé
    ne montre plus ses côtés ni ses coins (dessiné à la main, il les garde, repliés).
  - **Parasol** : la terrasse rattachée, le mât, « Afficher l'ombre » et « Meilleure position » restent ouverts ; la date,
    l'heure et la carte des heures d'ombre se replient.
  - **Chemin** : longueur, largeur et courbe restent ouvertes, les points et segments repliés.

  Un pli de champs est un mécanisme générique des descripteurs (`repli` dans `ui/champs/types.ts`), et les champs se rendent
  par un seul composant (`zones/composants/Champs.tsx`), que l'inspecteur, le tiroir, le dialogue de la déclaration et les
  réglages 3D partagent. **Aucune donnée ne se perd et aucun nombre ne bouge** : retirer un champ de l'inspecteur ne retire
  rien de l'objet ni du fichier (la matière, la priorité, la déclaration, le voisinage restent rangés où ils étaient), les
  exports et les empreintes de `tests/fixtures/golden/` sont inchangés. Un test fixe l'inventaire décidé, ouvrage par ouvrage
  (`tests/unit/ui/inventaireInspecteur.test.ts`).

- **Ce qui vient du cadastre ou de l'IGN reste à sa place réelle.** Une parcelle du cadastre, un bâtiment ou un élément de
  l'IGN (`estPoseSurLeTerrain`) ne se déplace plus à la souris ni ne tourne avec l'outil « Aligner » ; l'outil avertissait puis
  tournait la parcelle. Le refus se dit. L'actualisation IGN, la lecture des toits au LiDAR, la photo aérienne, le relief, les
  rues, le PLU, le soleil, le voisinage et l'audit sur place les lisent à leur place ; un décalage se corrige par le recalage.
- **L'outil « Aligner » reprend la distance au trait.** Quand il est actif, son bandeau porte un champ « à … m du trait » : vide,
  l'objet tourne pour devenir parallèle au côté désigné ; rempli, il se pose aussi à cette distance (une terrasse à 50 cm de la
  façade). C'était l'option « Distance au segment » de la section retirée de l'inspecteur.
- **Le plan ne redessine que l'objet qui change** (`MD/spec-ouvrages.md`, étapes 6.1 et 6.5). Un contrôleur des objets
  (`core/controleurObjets.ts`) tient une version par objet : le glisser touche l'objet glissé à chaque image, l'explorateur
  l'objet qu'il masque, un parasol posé sur le bord de sa terrasse quand elle bouge ; toute écriture qui passe par l'historique
  sans nommer son objet rend tout neuf, le repli sûr. Le dessin du plan saute un objet dont rien n'a changé ; le chiffrage, les
  cotes et la recherche des doublons se gardent tant que rien n'est écrit. **Garde-fou** : en développement (le serveur que
  joue la fumée), un objet sauté est redessiné quand même et une clé reprise est vérifiée contre le plan sérialisé ; tout écart
  s'écrit `[cle de version]` dans la console, et la fumée échoue. Au banc de production, à 600 objets : au téléphone, rendu
  complet 212 ms → 73 à 97 ms, dont le dessin du plan 77 → 20 à 26 ms ; au bureau, 38 à 47 ms → 30 ms. Aucun nombre ne change.
- **Les ouvrages du plan, déclarés une fois** (`model/ouvrages/`, étape 6.2). Chaque fonction d'objet (terrasse, pergola,
  chemin…) se déclare dans le module de sa famille : libellé, formes admises, sections, hauteur par défaut, place au menu
  « Fonction », emprise au sol. Les tables d'avant en dérivent à l'identique (testé contre leurs valeurs). Le modèle, le moteur,
  `geo/` et `facade/` ne comparent plus la fonction à la main ; un cliquet du test d'architecture compte ces comparaisons par
  couche. La spécification (`MD/spec-ouvrages.md`) décrit chaque ouvrage jusqu'à la géométrie, leurs dépendances, et ce qui
  reste à corriger (références par numéro de côté, suppression sans nettoyage, couplages entre ouvrages).
- **Chemins : une largeur par défaut et une surface sur la courbe dessinée — changement de version majeure** (`MD/RELEASE.md`
  §2.1, décision du 27 octobre 2026). Un chemin sans largeur écrite (un ancien fichier, un tracé importé d'un SVG) mesure
  désormais **1 m partout** : le dossier PDF et le dossier piscine lisaient 0,5 m quand l'inspecteur, le résumé, le PDF du plan et
  la Vue 3D lisaient 1 m (`model/ouvrages/surfaces.ts::largeurChemin`). La **surface d'un chemin** (longueur × largeur) se
  compte sur le **tracé dessiné** — la courbe d'un chemin courbe — et non plus sur ses segments droits (`surfaceChemin`) ; la
  longueur totale de l'inspecteur, de la feuille de sélection et du résumé suit. Pour un projet existant, un nombre peut donc
  changer dans le **résumé** (surface et longueur totale d'un chemin courbe, emprise totale), le **PDF du plan** (page des
  surfaces) et le **dossier PDF** (surface d'un chemin courbe ou sans largeur compté parmi les objets posés sur une terrasse, épaisseur
  du trait d'un chemin sans largeur au plan de masse), ainsi que l'épaisseur
  du trait d'un chemin sans largeur au **dossier piscine**. Sur la démonstration, le Chemin Arrière passe de 26,84 à 27,37 m²
  et l'emprise totale de 408,4 à 409,1 m² ; `resume.txt`, `quantites-demo.txt` et `plan.pdf` sont recapturés, le détail est
  dans `tests/fixtures/golden/EMPREINTES.md`.
- **La courbe des chemins n'est plus écrite qu'une fois** (`geometry/courbe.ts`, et le ruban dans `geometry/ruban.ts`). Le plan à
  l'écran, l'export SVG, le PDF du plan et la Vue 3D en avaient chacun leur copie ; ils lisent maintenant la même, et dessinent
  exactement ce qu'ils dessinaient (`plan.svg` inchangé, anciennes copies gardées comme oracle dans
  `tests/unit/geometry/courbe.test.ts`).
- **Un rendu du plan ne sérialise plus tout le plan** (feuille de route, étape 2.2). La clé qui gardait le chiffrage, les cotes et
  la recherche des doublons d'un rendu à l'autre était le plan entier en JSON : à 600 objets, 800 Ko et 78 ms au téléphone, à
  chaque rendu, plus que les calculs qu'elle évitait. Elle n'est plus qu'un jeton de tâche (`ui/clePlan.ts`) : les appels d'un
  même rendu partagent leur résultat, le rendu suivant le refait. La recherche des doublons ne se fait plus qu'à l'ouverture du
  menu qui la propose : une entrée d'un menu fermé garde l'état lu et le relit à l'ouverture, le clic revérifie toujours. Le
  tableau des cotes posées ne se recalcule que tiroir visible ; les boutons du panneau restent vivants. Au banc de production, à
  600 objets : au bureau 140 à 169 ms → 38 à 47 ms, au téléphone 364 à 391 ms → 212 à 217 ms. Aucun nombre ne change.
- **Le plan ne réécrit plus ce qui n'a pas changé** (feuille de route, étape 2.2, fin). Les cotes du tiroir (et leur dénivelé sur le
  relief) et la recherche des doublons du menu se reprennent tant que le plan n'a pas changé (`ui/clePlan.ts`, la clé que le
  chiffrage calculait déjà) ; le panneau de la Vue 3D ne suit plus le plan quand il est caché ; le dessin du plan ne réécrit plus
  un attribut SVG égal à celui déjà posé. Au banc de production, à 600 objets : dessin du plan au téléphone 127 et 134 ms → 73 et
  62 ms, rendu complet 389 et 431 ms → 252 et 228 ms ; au bureau, dessin 26 et 22 ms → 13 et 15 ms. Le seuil de 33 ms au téléphone
  n'est pas atteint : le reste est le rendu des zones par React. Le frein `RENDU_LENT_MS` reste (étape 2.3, gardée par décision).
- **Plus aucun carrefour dans `app/`** (feuille de route, étape 3.3). `boot/plan.ts` (23 imports) passe le tiroir des résultats à
  `boot/resultatsDuPlan.ts` (19) ; le test d'architecture n'admet plus aucun module de `app/` au-delà de vingt imports.

- **Schéma 6 des projets.** Trois champs venus après la première livraison du schéma 5 s'écrivaient au 5, qu'un lecteur 5
  d'avant aurait effacés au premier enregistrement : la retouche à la main d'un objet de l'IGN (`retoucheMain`), la hauteur à
  l'égout choisie d'un bâtiment (`egoutChoisi`) et le soleil du projet, sur la parcelle (`soleil`). Ils s'écrivent au 6
  (`model/migrations.ts`, `CHAMPS_DEPUIS`) ; un document 5 se lit tel quel (migration 5 → 6 sans transformation, témoin
  `tests/fixtures/migrations/schema-5.json`), et « Mettre à jour le modèle » le propose. Un projet qui ne porte aucun des trois
  s'écrit toujours au plus petit schéma qui le décrit : la démonstration et les démos livrées restent au 5.
  `contrat/plan-produit.json` passe à `schema_versions` 1 à 6. **La plateforme doit accepter 6 avant le dépôt** : backprod
  l'accepte depuis bertrandra/backprod#242, par une migration de base que `setup.php` applique ; **à appliquer en production
  avant de déployer cette version**, sinon chaque enregistrement d'un projet qui porte l'un de ces champs répond 422.
- **Schéma 5 des projets.** La piscine, la pergola, la clôture, les corps et volumes mesurés du toit, le toit mesuré, les
  fenêtres et le voisinage en 3D, et les rues s'écrivaient au schéma 4, qu'un lecteur 4 aurait effacés au premier
  enregistrement. Ils s'écrivent au 5 ; un document 4 se lit tel quel (migration 4 → 5 sans transformation), et « Mettre à jour
  le modèle » le propose. Les démos livrées passent au 5. **La plateforme doit accepter 5 avant le dépôt** : backprod
  l'accepte depuis bertrandra/backprod#242, par une migration de base que `setup.php` applique ; à appliquer en production avant de
  déployer cette version, sinon chaque enregistrement de ces projets répond 422.
- **Un relevé de façade garde la calibration qui l'a produit** (feuille de route, étape 1.4). Chaque relevé écrit désormais les
  seuils de détection que la calibration de l'admin avait posés à ce moment (`calibration`, vide quand ce sont les valeurs
  livrées) ; `reglagesDuReleve` (`facade/regles/facades/rejeuReleve.ts`) rend les seuils pour rejouer sa détection, ceux du relevé
  et jamais la calibration du jour. Un relevé qui porte ce champ s'écrit au schéma 5 ; un relevé d'avant ne dit rien et se rejoue
  avec les seuils du moment.
- **Les champs propres à une fonction rangés dans un sous-objet** (feuille de route, étape 4.3). En mémoire, le toit et les façades
  d'un bâtiment vivent dans `batiment`, le diamètre et l'essence d'un arbre dans `arbre`, le pied d'un parasol dans `parasol`
  (`model/typesFonctions.ts`) ; la clôture, la pergola et la piscine ont chacune leur fichier de types, et `model/types.ts` passe
  sous 600 lignes. **Le fichier de projet ne change pas** : la normalisation range les champs à la lecture, la sérialisation les
  remet à plat (`model/champsFonction.ts`), et aucune empreinte ne bouge. Les interfaces qui décrivaient un bâtiment à plat (lecture
  LiDAR des toits, comparaison d'un bâtiment vérifié, couleur des murs et des toits) lisent le sous-objet ; les propositions de
  l'audit recopient le sous-objet avant d'y écrire, pour que l'aperçu ne touche pas au projet.
- **Une zone que l'on ne voit pas ne se redessine plus** (feuille de route, étape 2.2). La règle est la même pour les trois classes
  d'écran ; seule change la façon dont une zone se cache : au téléphone, dans sa feuille fermée ; sur tablette et au bureau, repliée.
  L'inspecteur, l'explorateur et la palette gardent ce qu'ils montraient et se redessinent dès qu'ils redeviennent visibles, avec
  l'état du moment (`zones/composants/versionVisible.ts`). Le tiroir des résultats n'en fait pas partie : ses boutons de cotes servent
  feuille fermée, et son chiffrage se relit pendant qu'on règle la terrasse. Au banc de production, au téléphone, deux passages
  chacun contre `main` : à 150 objets 513 et 370 ms → 177 et 196 ms ; à 300 objets 267 et 290 ms → 176 et 193 ms ; à 600 objets
  440 et 451 ms → 379 et 310 ms. Le bureau ne bouge pas, au bruit près.

- **Le rendu au téléphone, environ deux fois plus court** (feuille de route, étape 2.2, en partie). Trois coûts ôtés d'un rendu
  où rien n'a changé :
  - le bandeau de chiffrage sérialisait le plan entier, grilles du relief comprises, à chacun de ses cinq appels par rendu. La clé
    est désormais calculée une fois par tâche, et une grille du relief y entre par son identité : elle est remplacée, jamais
    modifiée en place ;
  - chaque ligne de l'explorateur se redessinait. Elle ne le fait plus que si son nom, son état ou ses cases changent ;
  - les poignées, étiquettes et cotes déjà cachées étaient relues à chaque rendu, sommet par sommet.

  Au banc de production, à 600 objets au téléphone (processeur ×4), deux passages chacun : 640 et 572 ms avant, 336 et 446 ms
  après ; le bureau ne bouge pas, au bruit près. Le seuil de l'étape, 33 ms, reste loin : le reste est le rendu des zones
  (inspecteur, cotes, barre d'application) et le travail du navigateur sur 6 000 nœuds SVG. Aucun nombre ni export ne change.
  `BANC_PROFIL_APPAREIL=téléphone` profile le téléphone au lieu du bureau.

- **Les carrefours de `app/` allégés** (feuille de route, étape 3.3). Cinq des six modules qui importaient plus de vingt modules
  passent sous la limite, chacun découpé par sujet : `audit/controleur.ts` 32 → 13, `cadastre/actualisationIgn.ts` 26 → 19,
  `boot/branchements.ts` 25 → 19, `audit/parcelle/constats.ts` 23 → 13, `boot.ts` 22 → 17 ; `boot/plan.ts` passe de 29 à 23
  (le rendu sort dans `boot/rendu.ts`). Le code est déplacé tel quel : chaque module réexporte les mêmes noms publics, et
  l'ordre dans lequel les écouteurs s'enregistrent ne change pas. Le cliquet n'a plus qu'une ligne.

- **Le banc du rendu mesure le paquet de production** (feuille de route, étape 2.1, terminée). `vite build --mode banc` donne un
  paquet de production qui garde les poignées de mesure (`window.__plan`) ; le paquet livré ne les porte toujours pas
  (`scripts/banc-rendu.mjs` dit comment l'utiliser). La recherche des doublons ne sérialise plus que les objets qui partagent leur
  forme : 3,0 → 1,2 ms sur la démonstration, même résultat. Rendu complet à 147 objets, paquet de production : 16,7 ms au bureau,
  154 ms au téléphone (processeur ralenti ×4), dont 26 ms de dessin du plan.
- **La lecture des toits se lit par morceaux** (feuille de route, étape 4.1). `facade/toits/toitCorps.ts` (1 057 lignes) garde la
  reconstruction des corps et réexporte trois morceaux de `facade/toits/toitCorps/` :
  - `ajustement.ts` : le toit d'un corps, ses pignons, sa coupe ;
  - `recalage.ts` : le contour mis à l'équerre et recalé ;
  - `reprise.ts` : le contour de biais, le secours, la complétion.
  `facade/toits/toit.ts` réexporte de même `toit/estimation.ts` (le toit estimé sur une photo). Aucun fichier de `facade/toits/`
  ne dépasse plus 500 lignes. Le code est déplacé tel quel, les noms publics sont les mêmes, et AE 101 est identique au centimètre.

- **Les modules carrefours de `app/` ne grossissent plus** (feuille de route, étape 3.3). Le test d'architecture refuse qu'un
  module de `app/` importe plus de 20 modules (imports de valeur). Six carrefours dépassent encore : ils sont listés avec leur
  compte, ne peuvent plus grossir, et leur plafond descend avec eux. Dix imports qui ne portaient que des types sont écrits
  `import type`, ce qui fait passer `boot/plan.ts` de 33 à 29 et `boot/panneaux.ts` sous la limite.

- **three.js, EZ-tree et pdf-lib viennent de la livraison, plus du CDN** (feuille de route, étape 5.2). Le build les copie de
  `node_modules` dans `assets/vendor/<paquet>@<version>/` (`deploy/bibliotheques.mjs`), avec les modules qu'ils importent. Ce sont
  les mêmes octets que jsDelivr, sous les mêmes empreintes SRI. La Vue 3D, les arbres et le PDF ne dépendent plus de jsDelivr :
  - three.js se charge de la livraison seulement. La table d'import ne nomme qu'une adresse, et un secours chargerait une seconde
    instance de la bibliothèque.
  - EZ-tree et pdf-lib retombent sur jsDelivr si leur copie ne se charge pas.
  - model-viewer, qui n'est pas une dépendance du paquet, reste au CDN.
  La livraison grossit de 6,9 Mo, chargés à la demande seulement. Ces fichiers se gardent en cache sans limite, leur version
  étant dans le chemin. En développement, Vite sert les mêmes chemins depuis `node_modules`.

- **`app/` est rangé par domaine** (feuille de route, étapes 3.1 et 3.2). Trente et un modules quittent la racine de `app/`
  pour un dossier par domaine : `administration/` (écrans d'admin, arbre des contrôleurs, inventaire), `cadastre/` (import,
  actualisation IGN, valeurs par défaut), `toits/` (lectures de fond, LiDAR, toits à cheval, mode Toit, candidats Panoramax) et
  `releve/`. La racine garde le cœur (magasin, commandes, modes, projet). Le dossier s'appelle `administration/` et non `admin/` :
  la fumée simule les routes `admin/…` du serveur par leur adresse, et prenait les modules servis depuis `/src/app/admin/` pour des
  requêtes. Le test d'architecture tient la table des flèches admises entre domaines : une flèche nouvelle est une décision écrite
  dans la table. Seuls des chemins changent ; tests, fumée du lot `ci` et AE 101 inchangés.

- **Le moteur de la piscine se lit par morceaux** (`engine/piscine/`, feuille de route, étape 4.2). Les 957 lignes de
  `engine/piscine.ts` sont rangées en cinq fichiers, un par étape : réglages, géométrie, calcul, chiffrage, note de calcul.
  `engine/piscine.ts` les réexporte, si bien que rien d'autre ne change d'import. Le code est déplacé tel quel ; les empreintes et
  les tests ne bougent pas.

- **Les entrées de session des couches pures sont fermées et gardées** (feuille de route, étape 1.3 ; AD-15). Les couches pures
  n'ont que trois registres de session : la calibration de la détection, les faits de toit essayés par l'administrateur et la
  bibliothèque d'essences. Aucun ne change un nombre enregistré dans un projet. Le test d'architecture refuse désormais tout
  autre état de module (`let`) dans `util`, `geometry`, `model`, `regles`, `engine`, `geo` et `facade`. Il refuse aussi qu'un
  de ces registres se pose ailleurs que depuis `app/` ou `io/`. L'étape 1.4 (garder avec un relevé la calibration qui l'a
  produit) attend un rejeu qui en ait besoin : c'est un champ de schéma.

- **Le plan suit mieux le geste : les zones ne refont plus à chaque rendu ce qu'elles avaient déjà** (feuille de route, étape 2.1).
  - **Inspecteur** : chaque champ de la construction (sa note, sa visibilité, son état) relisait toute la terrasse : grille des
    vis, zones de spa, surface, et hauteur de chaque appui sur le relief. Cela faisait des dizaines de lectures par rendu ; il
    n'en reste qu'une (`ui/champs/construction.ts`). Une empreinte (contour, construction, nombre d'objets) fait qu'une écriture
    relit des valeurs à jour.
  - **Menu, « Fusionner les doublons »** : l'entrée se grise sans doublon, et le calcul se refaisait à chaque rendu en sérialisant
    tout le projet. La parcelle, jamais un doublon, n'y passe plus avec sa grille du relief. La signature complète ne se calcule
    que pour les objets qui partagent leur forme au centimètre : 13,7 → 3,7 ms, même résultat (test sur la démonstration).
  - Au banc, à 147 objets : 82 → 38 ms par rendu au bureau, 506 → 343 ms au téléphone.

- **Les nombres d'un ancien projet ne suivent plus le code d'aujourd'hui** (feuille de route, étapes 1.1 et 1.2 ; AD-19). Deux
  chemins donnaient des nombres à un ancien fichier sans numéro de schéma, et un témoin cassait seulement s'ils bougeaient.
  - **Le remplissage** : ce qu'un projet reçoit quand un réglage de construction lui manque lit maintenant une table de valeurs
    figées (`engine/remplissageFige.ts`, raideur des essences comprise), qui n'importe aucune constante du moteur. Un réglage
    par défaut d'aujourd'hui change désormais dans `constructionTerrasseNeuve` seulement.
  - **La migration 2 → 3** : le toit qu'elle donne à un bâtiment BD TOPO vient d'une copie figée au schéma 3 des règles du toit,
    du rectangle orienté et du squelette (`model/fige/toitSchema3.ts`). L'algorithme des toits peut donc évoluer sans changer un
    ancien fichier.
  Le test d'architecture interdit à ces modules d'importer une valeur, et à quiconque d'autre que la migration d'importer la copie
  figée. Aucune empreinte ne bouge.

- **Le jeu de démonstration ne se télécharge plus à l'ouverture** (AD-10, sixième coupure). Le plan de démonstration
  (`model/demo-projet.json` et `model/demo.ts`) pesait plus que tout le relevé de façade, chargé par tout le monde alors qu'il
  ne sert qu'à la première visite. Il se lit maintenant à la demande : en choisissant « Démonstration », quand l'API ne répond
  pas sur un navigateur neuf, dans la vitrine et pour la découverte des contrôleurs. Un projet du serveur s'ouvre sans lui.
  `chargerProjetInitial` reçoit une fonction qui lit la démonstration au lieu des données elles-mêmes, et `graineVitrine`
  devient asynchrone. À l'ouverture, le programme passe de 1 998 Ko à 1 722 Ko ; la démonstration apporte 276 Ko quand on la
  choisit. `essayer-paquet` sépare l'ouverture de la démonstration.

- **Le relevé de façade et les PDF ne se téléchargent plus à l'ouverture** (AD-10, étape 2b, quatrième et cinquième
  coupures). Le parcours du relevé (`zones/Releve.tsx`) et ce qu'il atteint (analyse des façades, calage, caméra) se
  chargent quand un relevé s'ouvre : une coquille (`zones/ReleveALaDemande.tsx`) attend l'ouverture. Les PDF (plan à
  l'échelle, dossier des terrasses, dossier de mairie de la piscine, note de calcul, déclaration préalable) se construisent
  dans un module chargé au premier export (`export/moteurPdf.ts`) ; leurs commandes sont donc asynchrones, comme l'était
  déjà la déclaration préalable, et une erreur se dit de la même façon. Savoir si une note de calcul s'exporte se décide
  sans le PDF (`noteExportable` passe dans `engine/noteCalcul.ts`). À l'ouverture, le programme passe de 2 172 Ko à
  1 998 Ko ; le premier PDF apporte 62 Ko. L'audit de la parcelle, qui partage l'analyse des façades avec le relevé, en
  apporte maintenant 363 Ko à son ouverture. `essayer-paquet` exporte aussi le PDF du plan.

- **Le mode Toit et le catalogue des toits ne se téléchargent plus à l'ouverture** (AD-10, étape 2b, troisième coupure). Le
  panneau du mode Toit (`zones/vue3d/ModeToit.tsx` et ses vues) et le catalogue des toits (`three/gestesToits.ts`, avec le
  dessin des corps et des couvertures) se chargent quand la Vue 3D s'ouvre. « Modifier la toiture » attend le catalogue
  avant d'ouvrir la session (tout de suite s'il est déjà là) ; un échec s'affiche, et le geste suivant réessaie. Le bouton
  qui ouvre le mode sort dans son propre fichier (`zones/vue3d/BoutonModifierToit.tsx`). À l'ouverture, le programme passe de
  2 265 Ko à 2 172 Ko ; la Vue 3D en apporte 227 Ko, mode Toit compris.

- **Le moteur de la Vue 3D ne se télécharge plus à l'ouverture** (AD-10, étape 2b, deuxième coupure). La scène, la visionneuse,
  la navigation, l'export `.glb` et la capture (`three/moteur3d.ts`) se chargent au premier besoin : ouvrir la Vue 3D ou la
  visionneuse, exporter le modèle, aller à un point de vue. Un seul accès (`three/demande3d.ts`) : avant ce chargement, aucune
  scène n'existe, donc ce qui agit sur la scène ouverte (la rebâtir après une modification, l'épurer, viser un objet) ne fait
  rien. La façon dont l'application parle à la Vue 3D (`app/assemblage/vues3d.ts`) ne change pas pour ses appelants. Revenir au
  plan pendant le chargement n'ouvre plus une scène derrière lui. Un échec du chargement s'affiche, et le geste suivant
  réessaie. À l'ouverture, le programme passe de 2 388 Ko à 2 265 Ko ; la Vue 3D en apporte 129 Ko, en 4 morceaux. Les
  panneaux de la Vue 3D et le mode Toit restent chargés au démarrage : ce sera la coupure suivante.

- **L'audit ne se télécharge plus à l'ouverture** (AD-10, étape 2b, première coupure). Ses écrans (`zones/parcours/Audit*`), sa session
  et ce qu'elle atteint (analyse des façades comprise) se chargent au premier geste : « Auditer la parcelle… », « Importer un audit
  de parcelle… », Admin › Audits, ou l'adresse `?mode=audit`. Les commandes restent déclarées dès le démarrage (elles grisent et
  disent leur raison comme avant) ; le doigt sur la Vue 3D et le contrôleur courant sortent dans deux petits modules
  (`app/audit/doigt.ts`, `app/audit/courant.ts`). L'autorisation de la boussole se demande toujours dans le geste même, avant le
  chargement : Safari la refuserait après. À l'ouverture, le programme passe de 2 729 Ko à 2 388 Ko ; l'audit en apporte 304 Ko,
  en 18 morceaux, quand on l'ouvre.

- **Le programme livré n'est plus un fichier unique** (audit d'architecture, AD-10, étapes 1 et 2a). `vite-plugin-singlefile` mettait
  tout dans un seul `assets/plan-<empreinte>.js` de 2,9 Mo, y compris ce qui est derrière un `import()` : l'admin, la vitrine, les
  écrans à la demande. Le programme est maintenant en morceaux `assets/plan-<empreinte>.js` (60 environ), avec sa feuille de style
  `assets/plan-<empreinte>.css` ; la page ne pèse plus que 8 Ko. Les noms gardent seize chiffres hexadécimaux : le `.htaccess` les
  garde en cache sans limite (la feuille de style aussi). `verifier-paquet` lit désormais tous les morceaux, ceux chargés à la
  demande compris, et le budget de 5 Mo de la CI les compte avec la feuille de style. **À la mise en ligne, le dossier `assets/`
  complet doit accompagner `index.html`** (le LISEZMOI le dit). Rien ne change à l'écran : la plupart des morceaux se chargent encore
  à l'ouverture, parce que `app/boot.ts` atteint presque tout ; les coupures viennent ensuite (audit, 3D, analyse des façades, PDF).
  Deux outils : `npm run carte-paquet` écrit `MD/carte-paquet.md` (poids par dossier et par morceau, imports entre dossiers) ;
  `npm run essayer-paquet` ouvre le vrai `dist/` dans un navigateur (démonstration, Vue 3D, retour au plan), dit les morceaux reçus à
  chaque étape et échoue à la première erreur de la page.

- **Vue de dessus du mode Toit : les silhouettes des corps collent au nu extérieur des façades.** La caméra est en
  perspective, et chaque corps se projetait au sol : son contour se dessinait en retrait, plus petit que le bâtiment vu de
  dessus. Il se projette maintenant à la hauteur de son égout, le haut de ses façades ; le faîtage à sa hauteur, les marqueurs
  (pignon, lucarne, cheminée) à celle du toit sous eux. Les poignées qui étirent un corps sont sur ses bords à la même hauteur ;
  celle qui le déplace reste au milieu du faîtage.

- **Le second serveur, en Node, est retiré : `buildsg/` n'existe plus** (revue du dépôt). Il n'était plus déployé (sa copie
  datait de la 2.2.0) et chaque route devait s'écrire deux fois, en PHP et en Node ; les deux s'écartaient. Le seul serveur est
  celui de `deploy/`, livré dans `livraison/`. Ses constantes et ses fonctions passent dans `deploy/analyse-fonctions.php`, inclus
  par `analyse.php` et livré avec lui (à déposer avec les autres fichiers PHP). Les tests unitaires du calcul (coûts, plafonds,
  forme de la réponse, comptes, consommation, audits), qui n'existaient que côté Node, sont portés sur les fonctions PHP
  (`tests/unit/deploy/analyseFonctions.test.ts`, par `tests/fixtures/deploy/appel-analyse.php`) ; les cas candidats d'un village
  se jouent contre `analyse.php`. La CI vérifie que PHP est présent : les tests du serveur ne sautent plus en silence.
  `npm run buildsg` et `npm run build:siteground` disparaissent. Rien ne change pour la page ni pour les exports.

- **Les trois plus gros modules découpés par sujet** (audit d'architecture, lot N). `three/scene.ts` garde le montage et la
  construction de la Vue 3D ; la terrasse, les objets du plan et ce que l'on fait d'une scène déjà bâtie (remplacer, comparer,
  surligner, épurer, viser) ont chacun leur module. `app/audit/parcelle/controleur.ts` garde la session de l'audit ; les capteurs,
  le brouillon, les étapes, la façade visée et la vue 3D sortent. `app/boot.ts` garde `boot()` ; ses étapes passent dans
  `app/boot/`. Chaque ancien module réexporte ce qu'il exportait. Rien ne change à l'écran ni dans les exports.

- **`app/` et `zones/` dans un seul sens** (audit d'architecture, lot M). Les zones lisent l'application ; l'application ne prend aux
  zones que des écrans à monter et leurs types. La recherche des coins du relevé et son worker passent dans `app/releve/`, la sonde
  de la plateforme (pastille de la porte) dans `io/sondePlateforme.ts`, testée. Le test d'architecture tient les deux règles, et
  interdit à `zones/` tout appel direct au réseau et tout worker. Rien ne change à l'écran.

- **L'état de la Vue 3D n'a plus qu'un propriétaire** (audit d'architecture, lot L). Hors de `three/`, chaque écriture passe par
  une fonction nommée de `three/etat3d.ts` (`reglerVue3d`, `reglerGlb`, `reglerSoleilVue3d`, `poserAffichage3d`, `poserHote3d`) ;
  les réglages du soleil reçoivent la leur. Le fond de la visionneuse se remplace dans `three/glbViewer.ts`. Le test
  d'architecture refuse toute affectation directe ailleurs. Rien ne change à l'écran.

### Modifié

- **La couleur du toit lue sur l'orthophoto et le relevé posé par l'audit demandent la hiérarchie des décisions**
  (`model/protections.ts`, étape 6.3). La couleur du toit devient un groupe (`couleurToit`) et l'orthophoto un écrivain (`ortho`,
  la mesure) : une couleur choisie ou celle d'un bâtiment vérifié sur place ne se relit pas, sauf « Recalculer aussi ». Le
  relevé posé d'office par l'audit demande si le mur porte un relevé fait à la main au lieu de lire la marque `depuisAudit`.
  Même comportement ; seul le bilan de l'actualisation ne compte plus les toits des bâtiments vérifiés gardés, qui n'étaient lus
  que pour être remis. La couleur des murs lue sur Panoramax reste hors du module : elle n'écrit que sa lecture, rangée à part.

- **Plus aucun cycle d'import, même par les types** (audit d'architecture, lot K). Les dix cycles qui ne passaient que par des
  imports de type sont cassés : chaque type partagé descend dans le module le plus bas, ou dans un module à lui
  (`geo/geojson.ts`, `model/clotureVue.ts`, `app/optionsActualisation.ts`, `app/typesControleurs.ts`). Le test d'architecture les
  interdit désormais tous. La règle « rien n'importe `legacy.ts` », sans objet depuis la 1.1.0, est retirée. Rien ne change à
  l'écran ni dans les exports.

### Corrigé

- **« Règles allumées » en Mode Toit relit vraiment le toit.** Valider la session refigeait le toit (« Règles » coupées) quoi
  qu'ait fait la personne : rallumer les règles effaçait les corps, puis le toit restait simple et figé. La validation ne fige plus
  rien d'elle-même (chaque geste le fait) et, les règles rallumées, relance tout de suite la lecture en tâche de fond ; le message
  dit « le toit sera relu quand vous validerez ».
- **L'actualisation dit les bâtiments au toit réglé à la main.** Elle les garde tels quels mais les comptait « vérifiés sur
  place » ; le bilan les nomme maintenant à part, et le dialogue d'« Actualiser le projet » a un point pour eux.

- **Valider la forme du toit proposée par l'audit garde les bow-windows, galeries et appentis posés sur un mur.** Une forme du
  catalogue (Mansart, demi-croupe…) rangeait le corps relu en dernier : l'élément posé sur son mur désignait alors un autre corps.
  La validation repose maintenant ces éléments sur le mur qui reste, comme la relecture LiDAR (`corpsAvecCeQuIlsPortaient`).

- **Ce qui est rangé par côté suit un contour retouché, pour tous les ouvrages** (étape 6.3). Un sommet ajouté ou retiré, un
  côté tiré ou raccourci, l'actualisation IGN faisaient glisser au côté voisin, ou laissaient hors du côté : le portail et le
  portillon (qui restent maintenant à leur place sur la limite, bornés au côté, sur la part où ils tombent d'un côté coupé), les
  côtés de clôture réglés à part (les deux parts d'un côté coupé gardent son réglage), le côté qui donne le sens des lames d'une
  terrasse et ses côtés sans rive (les lames tournaient, la nomenclature et le prix changeaient sans rien dire), le côté de
  référence et le côté adossé d'une pergola ou d'un carport, le côté du petit bain d'une piscine (volume d'eau et prix). Sur un
  mur raccourci ou allongé, un relevé de façade suit en proportion (ouvertures, partie basse, grille : la photo est étirée sur
  le mur) et une fenêtre réglée une par une garde sa place. Chaque ouvrage déclare ces références (`Ouvrage.suivreDeformation`,
  `model/referencesContour.ts`). Supprimer un objet emporte les cotes qui s'y appuient, et ce qui le tenait par sa clé l'oublie
  (la plage d'une piscine, la terrasse rattachée d'un parasol, la parcelle sous un toit à cheval) ; de même pour « Supprimer le
  voisinage ». Aucun nombre d'un fichier enregistré ne change : seuls les gestes à venir en tiennent compte.

- **Le toit et les relevés suivent un contour retouché.** Tirer un sommet, un côté ou un coin de rectangle, ajouter ou retirer un
  sommet, saisir une longueur ou un angle laissaient les corps du toit sur l'ancien contour, et les relevés de façade, les
  fenêtres réglées une par une et les cotes glissaient au mur voisin quand un sommet s'ajoutait. Le toit lu au LiDAR se relit
  sur le nouveau contour (en gardant ce qui est posé dessus) ; un toit réglé à la main reste, et un message le dit. Les relevés,
  fenêtres et cotes gardent leur mur, à la retouche comme à l'actualisation IGN.

- **La hauteur à l'égout choisie reste.** Saisie dans « Élévation » sur un bâtiment, ou validée par l'audit de la parcelle, elle
  était réécrite sans prévenir par la relecture LiDAR suivante et, toujours, par l'actualisation IGN. Elle est désormais marquée
  comme choisie (`egoutChoisi`, enregistré avec le projet) : ni le LiDAR, ni un fait du moteur, ni l'actualisation ne la
  remplacent, « Actualiser le projet » la garde sur le bâtiment recréé, et l'audit propose une autre hauteur décochée.

- **Une relecture des toits garde ce qui est posé dessus.** Quand un réglage des toits change (les toits déjà lus se relisent), ou
  qu'un fait du moteur s'applique, les corps lus remplaçaient les anciens en bloc : cheminées, lucarnes, fenêtres de toit et
  panneaux, toiture-terrasse, appentis ouvert, bow-windows et galeries d'un bâtiment non figé disparaissaient. Ils sont reportés
  sur les corps neufs, là où ils tiennent encore (même pan, même emprise, un mur à moins de 80 cm pour un bow-window).

- **Un mur relevé « en L » n'efface plus les corps du toit dans la Vue 3D** (`three/sceneObjets.ts`). Un seul relevé de façade
  avec une partie basse forçait le bâtiment en toit simple : les corps lus au LiDAR, les cheminées et les lucarnes posées dessus
  ne se dessinaient plus, alors que l'inspecteur disait toujours « Corps et pignons ». Les corps restent ; la photo du mur et ses
  ouvertures se posent dessus comme sur tout mur relevé. En toit simple, le mur en L coupe toujours le bâtiment en deux volumes.

- **Deux réglages du toit dans l'inspecteur ne se perdent plus à la relecture** (`ui/champs/facade.ts`). La direction du faîtage
  s'écrivait sans passer le toit en « saisi », là où la forme et la hauteur le font : la relecture LiDAR et l'actualisation la
  recalculaient. « Appentis : ouvert / fermé » écrivait les corps sans figer le toit, là où les éléments de façade le figent :
  la relecture suivante refaisait les corps sans le réglage. Les deux posent maintenant la même marque que leurs voisins.

- **L'actualisation IGN garde le matériau de couverture choisi** (`model/toitBdTopo.ts::toitActualise`). Un toit BD TOPO ou
  LiDAR recalculé à l'actualisation ne gardait que sa couleur : l'ardoise ou le zinc choisis dans l'inspecteur, ou retenus par
  l'audit, disparaissaient et la Vue 3D revenait au matériau déduit. Le matériau choisi suit maintenant le toit recalculé, comme
  la couleur ; sans choix, rien n'est posé.

- **En corps et pignons, un mur relevé ne reçoit plus les fenêtres automatiques** (`three/detailsBatiment.ts`). Les ouvertures
  d'un bâtiment en corps se posent corps par corps, et la liste des murs relevés (désignés par leur côté du contour) était
  remplacée par celle des murs communs entre corps : sur la photo du mur et ses ouvertures se posait en plus la grille des
  fenêtres automatiques, sur tout bâtiment lu au LiDAR. Chaque corps écarte maintenant ses murs qui doublent un côté relevé du
  contour, à 60 cm et 10° près (`geometry/facadeExterieure.ts::cotesSurLesCotes`), fenêtres de pignon comprises.

- **Un relevé de façade n'arrête plus en silence la lecture LiDAR de son bâtiment** (`zones/Releve.tsx`, `app/releve/releve.ts`).
  La case « Remplacer le toit du bâtiment par celui-ci » était cochée d'office : le toit lu sur la photo (`source: 'photo'`)
  remplaçait celui du bâtiment, et le LiDAR ne relisait plus jamais ce bâtiment, alors que la Vue 3D, qui montre les corps lus
  au LiDAR, ne changeait pas. Sur un toit en corps et pignons (ou en volumes), la case n'est plus cochée d'office ; elle dit ce
  qu'elle remplace (« le toit lu au LiDAR », « le toit lu à l'IGN ») et, dessous, que cochée le LiDAR ne relit plus le toit.
  Cochée sur un toit en corps, le toit de la photo se montre (mode « un seul toit ») ; les corps restent dans l'objet et le menu
  du mode de toit les rend. Un bâtiment au toit simple garde la case cochée d'office : le remplacement s'y voit.

- **Un toit validé par l'audit de la parcelle reste celui qu'on a validé** (`MD/spec-ouvrages.md`, « Les toits dans l'audit de la
  parcelle », point 1). La validation écrivait les corps du toit sans les protéger : la relecture du LiDAR suivante (une nouvelle
  version des règles, une actualisation) les remplaçait en silence, avec les cheminées, lucarnes et appentis posés dessus. Un
  bâtiment dont la validation écrit le toit (forme, corps, hauteur, cheminées, lucarnes, appentis, toiture-terrasse) a désormais
  ses « Règles » coupées, comme après le mode Toit : ni la relecture ni l'actualisation IGN ne le touchent, et rallumer les
  « Règles » le rend à la lecture automatique. La couverture seule ne coupe rien (la relecture la garde déjà). Une relecture
  partie avant la validation ne se pose plus par-dessus : ce qui la rend caduque compte maintenant les corps, la hauteur et les
  marques du bâtiment, plus seulement son contour et son toit simple.
- **L'audit respecte un toit réglé à la main en mode Toit** (point 2). Seul un toit saisi dans l'inspecteur comptait comme un
  choix : une forme proposée pour un bâtiment aux « Règles » coupées arrivait cochée et remplaçait le travail du mode Toit. Elle
  arrive maintenant décochée, avec « Remplace votre choix : forme du toit saisie ».
- **Valider la forme du toit garde ce que portait le toit** (point 3). Le corps relu par le moteur sortait neuf : ses cheminées,
  lucarnes, toiture-terrasse et l'appentis ouvert disparaissaient. Ils passent sur le corps relu là où ils tiennent encore
  (cheminée dans son emprise, lucarne sur un pan dans le même sens, terrasse sur un toit plat, ouvert sur un appentis), à la
  hauteur du corps neuf ; ce qui ne tient plus n'est pas écrit. Les cheminées, lucarnes, terrasse et appentis validés en même
  temps que la forme se posent sur les corps neufs, plus sur ceux d'avant. La forme reste celle du moteur.
- **Un contour retouché à la main ne bouge plus à la relecture du LiDAR, et les façades de l'audit suivent leur mur** (point 4).
  La relecture recalait (déplaçait) le contour d'un bâtiment retouché de la parcelle ou d'un mitoyen : elle lit maintenant son
  toit sur le contour de la personne, sans le déplacer. Les façades notées dans l'audit (photos, corrections, « inaccessible »)
  sont rangées par rang de côté : un sommet ajouté ou retiré les envoyait au mur voisin. La capture garde le contour sur lequel
  ses rangs sont comptés et, à la réouverture de l'audit, chaque façade retrouve son mur par la géométrie ; un Ctrl+Z les ramène
  de même. Une analyse par Claude faite avant le changement se dit alors « à relancer ».
- **L'aperçu de l'audit ne modifie plus le projet** (point 5). Cocher une ligne de détails d'ouvertures (volets, vitrage) écrivait
  dans le relevé du plan dès l'aperçu « Après », sans Ctrl+Z ni « projet modifié », y compris dans la consultation en lecture
  seule d'Admin › Audits. L'aperçu travaille sur sa copie ; seul « Valider » écrit, en un pas d'annulation, et nomme les
  objets écrits au contrôleur des objets.
- **Le toit suit son bâtiment quand on le déplace ou le tourne** (`MD/spec-ouvrages.md`, étape 6.3). Glisser un bâtiment, l'aligner
  par rotation ou le remettre à sa place de départ laissait son toit à l'ancienne place dans la Vue 3D : les corps du toit, les
  cheminées, les édicules d'une toiture-terrasse et les volumes sont en coordonnées absolues, et aucun geste ne les faisait suivre.
  Quand le contour bouge d'un bloc (`geometry/deplacement.ts`), l'ouvrage fait suivre ce qu'il porte (`model/ouvrages/bati.ts`) ;
  la direction du faîtage tourne avec lui. La grille du toit mesuré se translate ; tournée, elle partirait de travers et
  disparaît (les corps tournés restent). Un contour déformé (un sommet tiré) ne fait rien suivre.
- **La fumée complète repasse : les neuf points rouges trouvés par la première nuit** (feuille de route, étape 0.4). Aucun n'était
  un défaut de l'application ; tous venaient d'un script resté en retard sur elle.
  - **69, 70** : depuis que le moteur arbitre les sources (lot G), la couverture que Claude voit n'est plus une ligne à part.
    C'est une source de la ligne « Couverture », écartée quand la couverture vue sur place l'emporte. Le script la cherche là.
  - **74** : la sauvegarde de la capture (§15, marque `sauvegarde`) passait pour un partage. Le serveur simulé la compte à part,
    et le retrait du partage se lit par l'adresse de son dépôt.
  - **76** : le nombre d'attributs de « Accord de Claude » se lit dans `ATTRIBUTS_CLAUDE` (6 depuis la forme du toit), au
    lieu d'un 5 écrit en dur.
  - **82** : les deux vues de synthèse étaient des aplats, sans un point commun à apparier. L'assemblage écartait donc la
    seconde vue, et le masque d'occlusion ne se calculait pas. Le mur reçoit un crépi déterministe : le point passe, en 11 s
    au lieu de 103 s.
  - **93** : la version de lecture des toits attendue est la dernière de `LECTURES_TOITS` plus un (8), plus un 5 écrit en dur.
  - **10, en compact** : un toast (l'avertissement de l'administrateur) couvrait le bouton « Aligner par rotation ». Le
    toucher fermait le toast. Le script ferme les toasts d'abord, comme la personne le ferait.
  - **23, au bureau** : le rappel d'un point de vue se juge sur la caméra (position et point visé), qui revient au millimètre.
    L'image d'une même caméra pouvait encore changer pendant que la scène finissait de se charger.
  - **75, au bureau** : il prend deux minutes, le canevas 3D y est grand. La fumée de la nuit borne maintenant un point à
    400 s au lieu de 240.

- **Deux écritures simultanées de l'admin ne perdent plus rien** (`deploy/admin.php`, feuille de route, étape 5.1). Deux démos
  ajoutées au même instant cherchaient le même numéro libre : la seconde écrasait la première (11 démos sur 12 gardées, une fois
  sur trois, dans le test). Le numéro se cherche et se prend désormais sous un verrou du dossier, et toute écriture d'un document
  (démo, palette, arbres, contrôleurs, calibration, cas de calibration) passe sous le verrou de son fichier, si bien que la copie
  `.bak` est bien la version d'avant. Les documents entiers restent au dernier qui écrit, comme avant. Test : douze ajouts
  simultanés sur `php -S` à quatre processus.
- **Le point 90 de la fumée (l'avant et l'après en deux vues) repasse partout.** Il échouait dans toutes les classes d'écran,
  sur `main` aussi : l'écran des propositions est devenu un accordéon (un seul niveau ouvert par groupe), et le script
  décochait « la première case cochée » sans ouvrir son niveau, la couverture de la maison restait dans « Toit », replié. Les
  niveaux d'une case s'ouvrent maintenant avant de la décocher, comme le faisait déjà `cocherLigne` (aide commune
  `ouvrirSesNiveaux`). Le seuil « murs recochés » se mesure contre le bruit des vues identiques (« tout décoché »), et non plus
  dans l'absolu : au téléphone, chaque vue fait 390 × 215 et la maison y couvre moins de pixels, l'écart moyen y vaut 0,8 contre
  1,7 et plus ailleurs, pour un bruit de 0,0 à 0,1.

- **Mode Toit sur téléphone : le catalogue est de nouveau à portée du doigt.** Dans la feuille du panneau, bornée en hauteur, le
  catalogue des pièces se réduisait à rien sous les onglets (« Corps », « Toit », « Sur le toit », « Façade ») : on ne pouvait
  rien poser. Les blocs du panneau gardent leur hauteur et la feuille défile. Le point 98 de la fumée passe de nouveau en classe
  compact.

## [3.0.0] — 2026-10-25

Version **majeure** au sens de `MD/RELEASE.md` §2.1 : des quantités changent pour certains projets.

- **Projets avec relief** : les plots, poteaux, fouilles et remblais suivent le sol en pente (phase 2
  du relief, ci-dessous). Un projet sans relief garde exactement ses nombres.
- **Terrasses sur dalle béton à couler**, sans niveau fini imposé : un décaissement de pose de la
  hauteur du plot entre au BOM et au chantier, et la hauteur finie baisse d'autant.
- Le schéma des projets reste à 4 : la plateforme n'a rien à changer pour cette version.
- Les exports du plan de démonstration ne bougent qu'à leur numéro de version et à la date de build
  (preuve forte dans `tests/fixtures/golden/EMPREINTES.md`).

### Ajouté

- **Intégrité des scripts chargés depuis le CDN.** three.js et ses exemples, EZ-tree, model-viewer et pdf-lib se chargent avec leur empreinte (SRI, sha384) : un CDN compromis ne peut plus servir autre chose (`util/integriteCdn.ts`, champ `integrity` de la table d’import, attribut de la balise de pdf-lib). Un navigateur qui ne connaît pas l’intégrité de la table d’import l’ignore. Un test recalcule les empreintes depuis `node_modules` et exige celle de chaque adresse chargée : monter une version demande de les recalculer.
- **Deux témoins de ce que devient un ancien fichier.** Les valeurs par défaut que le moteur pose quand un champ de construction manque, et le toit que la migration 2 → 3 donne à un bâtiment BD TOPO, changeaient les nombres d’un ancien fichier sans numéro de schéma : ils sont figés (`defauts-construction.json`, `migration-2-3.json`) ; tout changement fait échouer un test et devient un événement de version.

- **Empreintes pour la piscine, la pergola et la note de calcul.** Le dossier de mairie d’une piscine, la note de calcul d’un abri et les calculs de la piscine et de la pergola n’étaient gardés par aucun témoin : trois nouveaux (`tests/fixtures/golden/`, `empreintesPiscinePergola.test.ts`). `quantites-demo.txt`, le fichier qu’`EMPREINTES.md` dit de regarder en premier, est maintenant vérifié ligne à ligne contre le résumé régénéré, et la table des empreintes est relevée sur les tests.

- **Mode Toit : le plan, le toit du projet et les petits écrans.** De dessus, chaque corps montre sa ligne de faîtage (raccourcie par les croupes, tiretée pour la noue d'un papillon, un point pour un pavillon, rien pour un toit plat) et un marqueur par élément posé (pignon, lucarne, cheminée, fenêtre de toit, solaire) ; la bulle d'un corps donne aussi son angle de rotation. Un bouton « Voir le toit du projet » montre le toit tel qu'il est avant la session ; le moindre geste, annuler compris, ramène la session, et valider écrit toujours la session. Sur téléphone, le panneau est une feuille qui se replie sur sa barre et le plan des façades se replie en un bouton ; sur tablette, la barre de la session est un rail vertical à gauche du panneau.
- **Mode Toit : conformité à la spec.** Le plateau porte son titre « Ajouter un élément » ; Suppr et Retour arrière suppriment l'élément choisi (jamais le corps principal) ; une galerie ou un appentis a deux poignées de bord (gauche et droit, chacune laisse l'autre en place) et une poignée de retrait du mur, avec sa cote ; le pignon se pose sur la façade choisie (du côté de son mur) et se grise avec « Pas de pignon sur cette façade. » sur un côté court ou sur un toit plat, papillon ou pavillon.
- **Mode Toit : la saillie d'un pignon.** Un pignon peut avancer au-delà du mur, jusqu'à 2,5 m : son triangle, ses deux murs de côté et son égout sortent d'autant, les pans du pignon gardent leurs plans. L'inspecteur propose « Au nu du mur », 0,5, 1 et 1,5 m ; une poignée « Saillie » sur la face avancée règle toute la plage, et la bulle de cotes la donne. Absente ou nulle, la saillie n'est pas écrite : un fichier sans saillie est inchangé.
- **Mode Toit : finitions et petits écrans (étape 6).** Un indice « main » pulse sur la scène tant que la personne n'a fait aucun geste (il respecte la réduction des animations) ; sur téléphone le navigateur de façades se réduit et le panneau prend la largeur de l'écran (au plus la moitié de la hauteur), sur tablette il laisse la colonne des outils libre. « Toit validé. » s'affiche à la validation. Nouveau point 97 de la fumée pilotée (`tests/CHECKLIST-FUMEE.md`).
- **Mode Toit : les corps et le mode Plan (étape 5).** Un onglet « Corps » pose une **aile** (un pan, 3 × 5 m, contre le mur de bout), un **retour** (deux pans, en équerre à l'arrière, qui entre dans le toit) ou une **aile biaisée** (deux pans, tournée de 35° devant), à la première place libre ; les corps **se superposent** librement. De dessus (le bouton « Vue de dessus »), chaque corps se choisit d'un toucher sur son polygone ; ses poignées le **déplacent** dans le plan, **étirent** sa longueur (le sens du faîtage) et sa largeur ; l'inspecteur le **tourne** de 15° à gauche ou à droite autour de son centre et le **supprime** (jamais le corps principal). Ce qui est posé sur un corps (bow-window, galerie, appentis) le suit ; le faîtage se remet tout seul dans le sens de la longueur quand rien ne s'y oppose (ni pignon, ni élément posé, ni appentis). Les corps sont aussi des pastilles de la barre du mode dès qu'il y en a plusieurs.
- **Mode Toit : les poignées sur la façade (étape 4).** L'élément choisi (ou, sans élément, le corps de la façade) porte des poignées posées sur la scène : on les attrape et on glisse. Bow-window : position, largeur, saillie, hauteur à l'égout ; galerie et appentis de même ; pignon : position, largeur, hauteur du faîte ; lucarne : position, largeur, hauteur ; cheminée : position dans le plan ; fenêtre de toit et solaire : position sur le pan et taille ; corps : hauteur du faîtage et longueur de la façade (ce qui est posé dessus reste sur son mur). Les bords se collent aux bords voisins à 25 cm près (un guide en pointillé le dit), sinon la valeur est arrondie à 5 cm. Une bulle donne les cotes pendant le geste (largeur, saillie, hauteur, angle d'un pignon). Un glisser est **une seule étape** de la session, Échap l'annule. La scène se reconstruit à un rythme borné pendant le glisser, et la poignée ne fait pas tourner la vue.
- **Mode Toit : le choix d'un élément, l'inspecteur en images, la fenêtre de toit et le solaire (étape 3).** Chaque élément du bâtiment (bow-window, galerie, appentis, pignon, lucarne, cheminée, fenêtre de toit, panneau solaire) est une pastille de la barre du mode ; on le choisit par la pastille, par un toucher dessus dans la 3D, ou parce qu'on vient de le poser. L'inspecteur ne montre que ce qui est choisi, en boutons-images à choix exclusif : forme d'un bow-window (pans coupés, rectangle, arc, arrondi — « pans coupés » est nouveau), niveau, toit propre ; galerie sur poteaux ou fermée, retrait 0 / ½ / 1 m (le mur d'un appentis fermé se recule aussi) ; hauteur d'un pignon (au faîtage ou plus bas) ; puis taille − +, dupliquer (à côté, là où il y a de la place) et supprimer. Deux éléments de toit nouveaux, dessinés sur le pan : **fenêtre de toit** et **panneau solaire** (`elementsToit` du corps, relus à l'identique, absents des anciens fichiers). Le bow-window n'a plus qu'une vignette dans l'onglet « Façade » (sa forme se règle ensuite) ; une galerie neuve recule ses poteaux de 0,5 m.
- **Mode Toit : le navigateur de façades, les vues, les contours en pointillé (étape 2).** Un plan du bâtiment en petit (sous l'horloge de la Vue 3D) : chaque corps est un polygone, chaque mur une arête qu'on touche pour choisir la façade ; toucher l'intérieur d'un corps prend sa façade la plus tournée vers la caméra ; la façade courante est en évidence, avec un triangle qui dit d'où l'on regarde. Quatre boutons de vue dans la barre de session : 3D libre, façade (la dernière choisie), dessus, et « Isoler ce corps » (les autres corps du bâtiment disparaissent, ce qui est posé sur le corps reste). Un bâtiment du voisinage qui cache celui qu'on retouche perd son volume et ne garde que son **contour en pointillé** (recalculé quand la caméra bouge) ; le bâtiment retouché reste touchable à travers lui. Aucun de ces réglages n'entre dans le projet.
- **Vue 3D : le mode Toit (étape 1).** Un bouton « Modifier la toiture » sur un bâtiment du projet ouvre une session : on touche un mur pour choisir sa façade (la caméra se place en élévation devant lui, façade de biais comprise), on pose un geste du catalogue (formes, éléments du toit, bow-window, galerie, appentis) et on active ou coupe les « Règles », dans un panneau sur le bas de la scène. Annuler, rétablir et « revenir au départ » sont ceux de la session (Ctrl+Z, Ctrl+Maj+Z) ; « Valider » écrit le toit dans le projet en **une seule étape d’historique**, « Retour » rend le toit d’avant après une question (« Abandonner les changements ? »). « Isoler » masque le voisinage. Quitter la Vue 3D ou choisir un autre objet abandonne la session. Le groupe « Toit » **quitte la palette du plan** : l’outil n’existe qu’en 3D. Spec : `MD/spec-mode-toit-3d.md`.
- **Bow-window : sa hauteur propre, son débord de toit, ses fenêtres, et le choix du mur d’un toucher dans la 3D.** La hauteur d’un bow-window se règle (« Hauteur à l’égout ») ou suit un niveau : « Un étage » ou « Jusqu’à l’égout de la maison » ; choisir un niveau efface la hauteur réglée. Son toit déborde de 20 cm de ses murs, et chaque facade (un arc entier compris) reçoit des fenêtres. Un élément de façade posé depuis la palette est armé : le toucher suivant sur un mur du bâtiment, dans la vue 3D, l’y déplace (le mur le plus proche, à l’endroit touché ; Échap pour annuler) ; le bouton « Choisir le mur dans la 3D » de sa ligne de l’inspecteur fait de même. Un glisser qui fait tourner la vue ne compte pas pour un toucher.
- **Éléments de façade : bow-window (rectangle, arc, congé), galerie et appentis neufs, réglés dans l’inspecteur.** L’onglet « Façade » du groupe « Toit » pose un élément sur un mur libre du corps principal ; chacun est un corps du toit qui porte sa `saillie` (mur, position, largeur, saillie, forme, niveau « sous le 1er étage » ou « jusqu’au toit », toit propre : un pan, quatre pans ou plat). Un bow-window se dessine en 3D à la forme de son plan (`three/toitCorps3d.ts`, `facade/regles/toits/saillies.ts`) ; une galerie a un retrait de poteaux réglable (`retraitM`, absent : le dessin d’avant). La section « Façades et toit » de l’inspecteur a une ligne par élément (mur, forme, niveau, toit, largeur, saillie, position, retrait, Retirer), annulable par Ctrl+Z. Sur un contour en L ou en U sans corps, les gestes qui s’ajoutent au toit demandent d’abord sa forme au lieu de le remplacer par son rectangle englobant. Les vignettes de l’onglet sont calculées par les mêmes fonctions que la 3D. Aucune empreinte ni AE 101 ne bouge.
- **Palette : le groupe « Toit » (catalogue en images) et l’interrupteur « Règles ».** Avec un bâtiment ou la parcelle sélectionnés, la palette montre l’interrupteur « Règles » (lecture automatique du toit : allumée, Plan relit le LiDAR, les faits et les profils ; coupée, le bâtiment reste comme vous l’avez réglé) puis trois onglets, « Toit » (formes du catalogue), « Sur le toit » (pignon, cheminée, lucarnes) et « Façade » (galerie, appentis fermé), en vignettes calculées par le même code que la 3D. Un geste posé remet le corps de référence à l’échelle du bâtiment, coupe les Règles pour lui (`toitFige`, enregistré dans le fichier) et s’annule par Ctrl+Z ; rallumer les Règles reprend la lecture et remplace ce qui avait été réglé. Aucune empreinte des fixtures n’est touchée.
- **Catalogue 3D : l’avant-corps à pignon (pignon depuis le faîtage).** Un petit toit à deux pans perpendiculaire au faîtage, qui monte jusqu’au faîtage du corps et entaille le grand pan (les deux pignons de la façade sud d’AE 101) rejoint le vocabulaire (`MD/spec-regles-toits.md` §2.3) et le catalogue des vignettes d’Admin › Chaîne, dessiné par le même code que la Vue 3D (`facettesCorps`). Le catalogue des vignettes passe de `facade/` à `three/catalogueToits.ts` : il dessine avec la 3D, et la couche `facade` n’importe pas la 3D. Aucun toit, quantité ni export ne change.
- **Toits : la bay window.** Une avancée de façade que le cadastre porte dans le contour (plan rectangle, arc ou angles arrondis ; toit propre, ou couverte par un appentis voisin ; sous le premier étage ou sur toute la hauteur) se décrit au catalogue (`MD/spec-regles-toits.md` §2.3, §3.3, §3.4, §5.3), se repère sur le contour (`saillies`, le banc les compte sans leur poser de toit) et se pose par un fait (`observation.baies`) en petit corps que la Vue 3D dessine comme les autres. Premier fait : AE 101, face est-nord-est (2,3 × 0,7 m, toit plat à 4,1 m lu sur le LiDAR, plan rectangle et pose sous le premier étage supposés, à confirmer) ; la seconde, sous l’appentis de la galerie, n’a pas de toit à elle. La référence d’AE 101 change une fois (cinq corps au lieu de quatre), le calcul seul ne bouge pas ; les toits déjà lus seront relus à l’ouverture. Une bay window traversante se dit mais n’est pas encore dessinée.
- **Propositions de l’audit : la règle « un seul détail à la fois » vaut pour tout l’écran.** Les arbitrages (dans « Sources » comme sous une ligne de proposition) étaient des détails indépendants, que l’on pouvait ouvrir ensemble : désormais en ouvrir un referme celui qui était ouvert, le choisit (sa zone se surligne dans la Vue 3D) et le refermer le désélectionne. Les niveaux de l’arbre (bâtiment, type d’objet) suivaient déjà la règle. Un arbitrage « À arbitrer » ne s’ouvre plus tout seul : son titre le dit.
- **Audit : la façade nommée se montre avec sa vraie silhouette, ses ouvertures, au lieu d’un rectangle.** Quand une proposition, une observation de Claude ou un arbitrage de « Sources » nomme une façade, la Vue 3D cerne en gras la silhouette que les corps du toit dessinent au-dessus du mur (pignon en triangle, trapèze, rampe, marches, plusieurs sommets), pose un voile sur toute sa surface et cerne chaque ouverture du relevé. Sans corps de toit lu, le mur jusqu’à l’égout (`surbrillance.ts::murNomme`, `three/scene.ts::surlignerDans3d`). Dans les tableaux de « Sources », chaque silhouette (triangle, trapèze, rampe, marches, plusieurs sommets) s’affiche aussi avec un petit dessin de sa forme à côté du mot.
- **Propositions de l’audit : une façade nommée dans la liste porte son point cardinal et le numéro de son côté.** « Façade sud (côté 3) de Maison » dans les lignes de proposition, les indices (« Mesurée sur la façade nord-est (côté 2) »), les observations de Claude et les arbitrages de « Sources » (« Silhouette de la façade · sud (côté 3) »), au lieu du seul point cardinal qui prêtait à confusion quand deux murs regardent la même direction. Les huit points cardinaux du contour (`facade/geometrie.ts::nomFacade`) ; le numéro est celui du côté dans le contour, le même que dans le tiroir. Les étiquettes envoyées à Claude et la clé de son vote ne changent pas.
- **Propositions de l’audit : « Sources » sélectionnables, façade nommée au contour en gras, sélection visible sur un niveau replié.** Un arbitrage de « Sources, bâtiment par bâtiment » se touche comme une proposition : il est surligné, sa zone (le toit, les murs, ou le mur nommé) se montre dans la Vue 3D, et la décision se change dans la même ligne (retenir une source, forcer une valeur). Quand une façade est nommée, son mur est cerné d’un cadre en gras (`three/scene.ts`). Un niveau replié qui contient la ligne choisie le dit (● et fond coloré) ; ouvrir un autre niveau désélectionne la ligne.
- **Propositions de l’audit : « Je confirme » devient une case à cocher, qu’on peut décocher.** Sur une observation de Claude, la case cochée dit « Confirmé par vous : noté dans « Ce que je vois » » ; la décocher rend à « Ce que je vois » la valeur qu’il avait avant, sans toucher aux autres confirmations. Un bouton « Réinitialiser mes confirmations » en bas de « Vu par Claude » les défait toutes, et « Réinitialiser mes décisions » les compte parmi les décisions qu’il défait (`validation.ts::confirmationsDe`).
- **Propositions de l’audit : un seul niveau ouvert à la fois, et la ligne touchée se voit sur le plan.** À chaque niveau de l’arbre (bâtiment, type d’objet, Sources, « Vu par Claude »), ouvrir un niveau referme ses frères. Toucher une ligne (une proposition ou une observation de Claude) la surligne et montre sa zone d’impact dans la Vue 3D, la caméra la cadre ; une seule ligne est choisie à la fois (`surbrillance.ts::surbrillanceObservation`). « Réinitialiser mes décisions » défait aussi les « Je confirme » faits sur les observations de Claude (`validation.ts::confirmationsDe`).
- **Fusionner les doublons (menu Fichier et menu Admin).** Une option globale du projet trouve les objets identiques à un autre (même forme au centimètre, mêmes réglages ; l’identifiant, le nom, le verrou et la visibilité ne comptent pas, la parcelle n’est jamais un doublon), demande confirmation, ne garde que l’objet verrouillé ou le premier de chaque groupe, et reporte leurs cotes sur lui. Un pas d’annulation, droit d’écriture requis (`io/doublons.ts`, `app/ecouteurs/doublons.ts`).
- **Propositions de l’audit : tout ce qui est coché est marqué dans la Vue 3D.** Plus besoin de cliquer l’œil pour comprendre l’action : chaque ligne cochée surligne en orange (voile et trait) le mur, le corps de toit ou le contour qu’elle vise, dans « Avant » comme dans « Après », et suit les cases, les choix d’arbitrage et le sélecteur Avant / Après. L’œil garde la caméra qui se tourne vers la ligne (`validation.ts::selectionDe`, `three/scene.ts::surlignerDans3d`).
- **Propositions de l’audit : le marquage se concentre sur la zone touchée, et la liste devient un arbre.** Un mur, un pan de toit, une souche de cheminée ou un côté de clôture est surligné seul (plus le bâtiment entier), et la caméra cadre cette zone. La liste « à valider » se range par objet puis par type (Façades, Toit, Murs, Clôture et portail), comme un bâtiment : chaque niveau s’ouvre et se ferme sans refermer les autres ; « Vu par Claude » suit le même arbre. Un bouton « Réinitialiser mes décisions » défait les cases et les choix de sources (`validation.reinitialiser`).
- **Audit de la parcelle : chaque photo de façade redressée est gardée dans le fichier, avec la version de la chaîne.** Le fichier d’un audit gardait déjà les photos (réduites à 1 280 px), leurs coins, les corrections et le mur fusionné ; il garde maintenant aussi chaque photo redressée seule (JPEG, 1 024 px au plus, entre les coins retenus, sur l’image corrigée du grand-angle) et la version de la chaîne des façades qui les a faites (`VERSION_CHAINE_FACADES`, `zones/releve/chaine.ts`). Quand la chaîne évolue, un rejeu repart des photos et des corrections, et les images d’origine disent ce qui a changé. Environ 100 Ko de plus par photo de façade, loin de la limite de 25 Mo d’un fichier d’audit. Les fichiers d’avant se relisent tels quels. Aucune quantité ni aucun export ne change.

- **Admin › Calibrer la détection : chaque étape en image, et un cas tiré d’un bâtiment.** Après « Redresser le mur », l’éditeur d’un cas montre ce que chaque étape a donné, en images (les neuf étapes d’aujourd’hui : « Admin › Calibration : neuf étapes, de la photo à la 3D », plus bas). Un cas se crée aussi depuis une façade relevée d’un bâtiment : celle d’un projet du serveur, ou d’un fichier de projet (« Exporter le projet (JSON) ») ; il reprend le mur redressé, ses dimensions et les ouvertures validées au relevé, comme point de départ de la vérité (`app/casDeReleve.ts`). L’import depuis un audit reste à côté. Aucune quantité ni aucun export ne change.

- **Vue 3D : les façades sans les ombres de la photo.** La photo plaquée sur une façade relevée portait les ombres de l’heure où elle avait été prise (débord du toit, balcon, arbre), et la Vue 3D posait ensuite les siennes, à l’heure choisie : des ombres en double, souvent contraires. La nouvelle case « Façades sans ombres » (Vue 3D › Scène, cochée par défaut, sous « Textures ») les estompe : l’éclairage du mur se lit sur le mur seul, baies mises de côté, et chaque zone à l’ombre est éclaircie vers le mur au soleil, en gardant sa teinte (`facade/sansOmbres.ts`, huit réglages nommés `facades.texture.*`). Un autre parement (soubassement en pierre, bandeau) n’est pas pris pour une ombre, un pixel n’est jamais porté au-delà du mur au soleil (pas de liseré au bord des ombres), et le toit au-dessus de l’égout ne bouge pas. Mesuré sur le banc des façades : l’écart au mur sans ombre passe, dans les ombres, de 34 à 14 % (débord et balcon) et de 35 à 15 % (arbre) ; un mur sans ombre change de moins de 1 % (meulière, brique, soubassement) ; environ 100 ms par façade, une fois par photo. C’est une préférence d’affichage, comme « Vent » : ni Ctrl+Z ni « projet modifié » ; la photo enregistrée, la détection, les cotes et l’export .glb (qui emporte la photo telle qu’elle a été relevée) ne changent pas. Aucune quantité ni aucun export ne change.

- **Propositions de l’audit : « Voir dans la 3D » sur chaque ligne.** Le bouton œil d’une ligne surligne en orange ce qu’elle vise, dans « Avant » comme dans « Après » : le mur d’une façade (avec un voile sur sa face), le corps de toit qu’une ligne relit seul, ou le contour du bâtiment ; la caméra se tourne vers lui (de face pour un mur). La ligne choisie se montre aussi dans « Après » même décochée : la photo d’une façade dont le relevé arrive décoché (les coins du mur n’ont pas été trouvés, la photo est seule) se juge sur le mur avant de la cocher. Un second clic, la fermeture de l’écran ou « Valider » effacent la surbrillance ; rien n’est écrit pour une ligne seulement vue (`app/audit/parcelle/surbrillance.ts`, `three/scene.ts::surlignerDans3d`).
- **Audit : deux triangles sur deux murs voisins d’un même corps, un pignon traversant.** Un corps ne peut pas avoir son faîtage perpendiculaire à deux murs voisins : le mur le plus large dit le sens du faîtage, le triangle de l’autre devient un pignon traversant qui coupe son pan et monte au faîtage du corps (décision de l’utilisateur, 19 octobre 2026 ; `facade/regles/toits/pignons.ts::pignonTraversant`, `silhouettes.ts` : `traversants`). Sur AE 101, l’aile nord-est prend un pignon sur sa façade est (côté 14, l’œil-de-bœuf) sous le faîtage que dit la façade nord. La proposition « Forme du toit » le dit, explique comment le changer, et porte sous elle la silhouette de chaque mur de ce corps : forcer « ligne droite » sur la façade du pignon le retire ; la forcer sur le mur le plus large fait tourner le faîtage, s’il tient sur la mesure LiDAR (sinon rien n’est proposé, le choix reste dans « Sources »).
- **Audit : la silhouette de chaque façade se réconcilie, la photo gagne sur le LiDAR, et le toit suit.** Le LiDAR dit maintenant, mur par mur, la silhouette que ses corps montrent au-dessus du mur (triangle d’un pignon, ligne droite d’un long pan, rampe, marches, plusieurs sommets), lue sur le corps qui porte le mur : une saillie devant un pignon montre le pignon (AE 101, côté 3 : un triangle, plus une ligne droite à 3,4 m). Cette silhouette s’arbitre contre celle de la photo et celle de Claude ; la photo et Claude l’emportent (`regles/reconciliation.json`, `silhouetteFacade` prioritaire, décision automatique dès un score de 1). La forme, les bouts et le sens du faîtage de chaque corps se déduisent ensuite des silhouettes **retenues** (`constatsReconcilies`), et non plus source par source : une silhouette de photo qui a perdu contre celle de Claude ne parle plus du toit. La proposition « Forme du toit » montre, sous elle, l’arbitrage de la silhouette de chaque mur de ce corps (`facade/regles/toits/silhouetteDesCorps.ts`, `app/audit/parcelle/constats.ts`). Aucune quantité ni aucun export ne change ; AE 101 identique.
- **Vue 3D : la photo d’une façade épouse la silhouette du mur, à l’échelle.** Sur un bâtiment dont le toit est connu corps par corps, la photo plaquée ne s’arrête plus à l’égout en rectangle : elle suit le haut du mur sous les corps (triangle d’un pignon jusqu’au faîtage, marches de deux corps de hauteurs différentes), coupée là où la photo s’arrête. Les mètres de la photo restent ceux du mur (`facade/profil.ts::silhouetteDuMur`, `facade/toitCorps.ts::hauteurDuToitEn`). Aucune quantité ni aucun export ne change.

- **Audit : quatre coins posés au doigt sur une photo valent pour toutes les photos du mur.** Les photos d’une même façade sont redressées par leurs points de fuite et assemblées ; les coins posés sur l’une sont reportés sur les autres, puis chaque côté se cale sur l’arête qu’il longe dans la photo (`zones/releve/coinsAuto.ts::reporterCoins`, `caleSurLesAretes`). Toutes montrent alors le même mur et se croisent à la fusion (vote des ouvertures). Banc, scènes à plusieurs vues : 0 à 1 cm sur les coins vus, 7 à 17 cm sur un coin caché par une voiture ; un pied caché par une haie haute reste où le report le met (56 à 65 cm), et la fusion refuse une paire qui ne s’accorde pas. Le report ne part pas d’un mur « trouvé » sur les arêtes : sur AE 101, un tel mur s’arrêtait à un poteau du pan de bois, et le report le recopiait.

- **Calibrer la détection : un cas depuis un audit de parcelle, sans mètre.** Le bouton « Créer un cas depuis un audit » liste les audits de parcelle reçus, puis leurs façades photographiées ; la façade choisie devient un cas brouillon avec ses photos, la largeur du côté du cadastre et la hauteur du mur sous le toit lue par le LiDAR (relue sur le cas figé du bâtiment, même pour un ancien fichier). L’éditeur cherche aussitôt les coins sur l’assemblage des photos redressées, à la proportion du mur du plan (`app/audit/parcelle/casDeCalibration.ts`, `facade/mosaiqueFuites.ts::rectangleSurLesAretes`).

- **Relevé de façade : une baie en retrait garde toute sa largeur.** Dans un mur épais (pierre, meulière), la menuiserie est au fond de la baie, et une photo prise de biais montre, d’un côté, la face de l’ébrasement entre le nu du mur et la vitre. La détection la prenait pour une ombre (même teinte, autre luminosité) et rendait la vitre seule : une baie trop étroite de la largeur de l’ébrasement visible. Elle reconnaît maintenant cette face (une bande unie, de la teinte du mur, collée à un seul côté de la baie) et étend la baie jusqu’au nu du mur (`facade/detectionEbrasements.ts`, cinq seuils nommés `facades.detection.ebrasement*`). Le banc des façades gagne la profondeur des baies (rendu en lancer de rayons) et la scène `21-ebrasements-profonds-biais` (pierre, retrait de 40 cm, prise à 35°) : cotes de 11,5 → 4 cm, corrections de 6 → 4, aucune fausse baie ; les 21 autres scènes restent identiques. La même scène montre que les points de fuite lus sur les fenêtres restent justes malgré les arêtes des ébrasements (azimut à 0°). Aucune quantité ni aucun export ne change.

- **Vue 3D : du vent dans les arbres, et `?fps=on` pour lire la perf de l’affichage.** Les arbres se balancent (le tronc et les branches d’autant plus qu’ils sont hauts, chaque arbre à sa phase, une rafale lente) et leurs feuilles frémissent ; un résineux est plus raide qu’un feuillu. C’est une préférence d’affichage « Vent » (Vue 3D › Scène), cochée par défaut : ni Ctrl+Z ni « projet modifié », sans effet sur l’export .glb ni sur les ombres portées. Avec `?fps=on` dans l’adresse, un bandeau en bas à gauche du canevas donne les images par seconde, le temps de rendu côté processeur, les appels de dessin et les triangles (« au repos » quand rien ne se redessine) ; sans le paramètre, aucun compteur n’est touché.

- **Une bibliothèque de quarante essences, dix par taille, dans un fichier de données.** `data/admin/arbres.json` (celui que l’écran Admin › Arbres lit et enregistre déjà) livre petits (jusqu’à 6 m : buis, hortensia, lilas, pommier, pêcher…), moyens (6 à 12 m : olivier, cerisier à fleurs, if, houx…), grands (12 à 20 m : pin sylvestre, charme, bouleau, saule pleureur, pin parasol, cyprès de Provence…) et très grands (plus de 20 m : chêne, hêtre, platane, épicéa, cèdre du Liban, séquoia, peuplier d’Italie…), avec des silhouettes qui leur ressemblent (saule qui retombe, peuplier qui se dresse, cèdre étagé). L’écran admin range sa liste par taille, et le choix « Essence » de l’inspecteur présente la sienne de même. La taille se déduit de la hauteur proposée.

- **Les formes du catalogue se lisent sur le LiDAR pour tous les toits, sans audit.** Jusqu’ici, un Mansart, un gambrel, un berceau, une carène, un papillon, une demi-croupe ou un toit de révolution (cône, pyramide, dôme, impériale, flèche) n’était reconnu qu’à l’audit d’une parcelle, quand Claude ou vous le disiez. La lecture des toits les pose désormais d’elle-même quand la mesure les porte nettement mieux que les pentes droites (écart sous 0,4 m et au plus 0,6 fois celui des formes simples, `regles/toits/formes.json`), avant le fait du bâtiment et les garde-fous (`facade/regles/toits/catalogue.ts`). Deux exceptions, nées du banc : le **coyau** attend qu’on le demande, parce que le lissage de la surface imite son pied adouci ; et un **toit de révolution dont l’égout passe la hauteur BD TOPO de plus d’un mètre** est un arbre (`DEPASSEMENT_REVOLUTION_M`, un cône lu sur une couronne au Vésinet). Banc sur six villages (Le Vésinet, Hucqueliers, Gordes, Versailles, Eguisheim, Beuvron-en-Auge) : trois bâtiments changent, tous en demi-croupes, aucun nouveau suspect ; AE 101 identique. Aucun Mansart n’est encore reconnu à Versailles : les toits supposés tels n’ont pas de brisis visible dans la mesure (chantier ouvert). Les seuils des formes entrent dans la version de lecture (`formes` dans `LECTURES_TOITS`, version 4) : **les toits déjà lus seront relus à l’ouverture**, sauf ceux vérifiés sur place. Aucune quantité ni aucun export ne change.

- **Ce que Claude dit d’une maison sert davantage au projet (prompt version 9, schéma version 5).** Une analyse de l’audit a été passée au crible, champ par champ : la moitié de sa sortie n’était qu’une ligne « Vu par Claude ». Désormais, toujours décoché tant que le taux d’accord n’est pas mesuré :
  - **la teinte des murs** : Claude la nomme sur les photos (`teinteMurs` : blanc, crème, beige, ocre, rose, gris clair, gris foncé, brun, rouge brique) et la ligne « Murs de … » propose sa couleur quand celle du projet est d’une autre famille ; la couleur lue sur les pixels de vos photos, plus juste, l’emporte et efface la ligne de Claude. Son **décor** (`decorMurs` : colombages, chaînages de brique, bandeaux) se dit en observation ;
  - **la toiture-terrasse** se complète : une couverture de toit plat vue (gravillons, membrane, végétale) devient son revêtement et suffit à proposer la terrasse quand les passes ne la nient pas ; l’acrotère vu parmi les éléments du toit compte quand le champ de la terrasse ne le dit pas ; un garde-corps vu, sur une terrasse accessible ;
  - **les fenêtres, les portes et les volets se reconnaissent par type** : pour chaque façade, Claude dit le vitrage (verre plein, petits carreaux, verre plein sous une imposte à petits carreaux), l’ouvrant (à la française, coulissant, à guillotine, à soufflet, fixe), la porte d’entrée (pleine, vitrée, semi-vitrée), la porte de garage (sectionnelle, basculante, à battants, enroulable), les volets (battants, roulants, persiennes, un coffre qui dit un volet roulant) et leur couleur (blanc, crème, gris clair ou foncé, bleu, vert, rouge, brun, bois naturel, noir), et les baies cintrées. La ligne « Ouvertures de la façade … » les écrit par un effet nouveau (`detailsOuvertures`) sur le relevé coché au moment de l’écriture, mesure ou renfort : chaque ouverture reçoit ce qui vaut pour son type (pas de petits bois sur une porte, pas de couleur de volets sans volets, pas de guillotine sur une porte-fenêtre) et qu’elle n’a pas déjà ; le renfort, ouverture par ouverture, l’emporte. La Vue 3D les dessine de près : petits bois ou vantaux seuls selon le vitrage et l’ouvrant vus (sinon l’époque, comme avant), traverse d’une guillotine, imposte à petits bois, vitre d’une porte vitrée ou semi-vitrée, panneau lisse, joint ou lames fines d’un garage, volets à leur couleur. Une ouverture sans ces détails se dessine exactement comme avant ;
  - **les ouvertures par niveau** sont votées et dites en observation (« 2 niveaux d’ouvertures (3 + 2) ») ; sur un long pan, elles mettent une réserve sur une hauteur à l’égout qui ne les loge pas (au moins `HAUTEUR_NIVEAU_MIN_M` par niveau, le seuil de la disposition des fenêtres) ;
  - **les images hors sujet** (`imagesHorsSujet`) : Claude donne le numéro des photos qui ne montrent pas le bâtiment (la maison voisine prise pour l’abri de jardin), et la liste de contrôle dit de les reprendre ;
  - **la confiance de Claude** : quand il se dit peu sûr (`faible`), chacune de ses lignes le dit dans sa réserve.

  Les analyses d’avant restent lisibles : un champ qu’aucune passe ne donne ne compte pas comme un désaccord et ne déclenche pas d’escalade. Restent à faire : les formes du catalogue (Mansart, demi-croupe, coyau, toits de révolution, pignon à redents) que Claude voit mais que le moteur des toits ne sait pas encore relire sur la mesure. Aucune quantité ni aucun export ne change.

- **Inspecteur : régler un appentis ouvert ou fermé directement sur un bâtiment.** Quand le toit est en « Corps et pignons (LiDAR) » et qu’un corps est un appentis (galerie, porche), la section « Facades et toit » gagne le choix « Appentis » : sans indication, ouvert (poteaux, pas de mur extérieur) ou fermé (murs jusqu’au sol). Il s’écrit sur tous les appentis du bâtiment, avec Ctrl+Z, comme la ligne « Appentis de … » de l’avant / après, sans passer par l’audit. Aucune quantité ni aucun export ne change ; un bâtiment sans réglage garde son dessin.

- **Audit, avant / après : la ligne d’une façade relevée dit ce qu’elle compte.** Au lieu de « 6 ouvertures relevées, texture de la photo », elle détaille les types et les volets lus : « 6 ouvertures relevées (4 fenêtres, 1 porte-fenêtre, 1 porte ; volets sur 4), texture de la photo ». Le dessin 3D ne change pas.

- **Audit : à la prise de vue, un message dit quand la fusion des photos d’une façade est impossible.** Dès la deuxième photo d’une façade, Plan la redresse et tente la fusion sur place ; si elle échoue (ou ne recale pas une photo), l’écran de prise affiche « Fusion des photos impossible : reprenez la façade avec des chevauchements entre les photos » (en nommant la photo quand la fusion n’est que partielle), pendant qu’on peut encore la reprendre. Le message s’efface à la photo suivante, le temps du nouveau calcul.

- **Calibration admin : l’automatique est la valeur par défaut, ouvertures comprises.** Ajouter une photo à un cas cherche les coins, redresse, fusionne et part de la détection pour les ouvertures (un cas déjà annoté n’est jamais écrasé) ; une case « Automatique » la désactive pour retrouver la pose des coins à la main. Les ouvertures proposées sont à relire avant de marquer le cas « relu sur la photo ».

- **Admin › « Calibrer la détection » : ajouter des photos les redresse et les fusionne tout seul.** Chaque photo ajoutée à un cas voit ses quatre coins cherchés sur les arêtes du mur (le calage fin du relevé, sans capteurs : cadre à 70 % de la largeur, puis arêtes), puis le mur est redressé, les photos sont fusionnées dès la deuxième et la détection propose ses ouvertures, sans passer par la pose des coins. Quand l’automatique doute, la photo est gardée : sa vignette dit « coins devinés, à vérifier » (ou « coins trouvés », « posés à la main » après une correction au doigt) et un message dit quelle vue n’est pas fusionnée, et pourquoi, ou quelle part du mur reste cachée. « Redresser le mur » rejoue le tout après une correction. Retirer une photo ne décale plus les dimensions et l’origine des coins des suivantes. Rien ne change pour l’utilisateur final : ni quantité, ni export, ni empreinte.

- **Audit : « Je confirme » sur ce que Claude a vu du toit, et ses silhouettes de façade enfin lues à l’écran.** Les silhouettes que Claude lit au-dessus de l’égout de chaque façade (pignon, trapèze, rampe…) servaient déjà à l’arbitrage, mais ne laissaient aucune ligne à l’écran : sur l’audit du bac à sable, Claude voyait des pignons sur six murs de la maison et l’écran « Vu par Claude » n’en disait rien. Une ligne « Toit lu sur les silhouettes des façades » dit maintenant ce que chaque mur montre, ce qu’il ferme (bouts, sens du faîtage) et la contradiction éventuelle entre murs. Les lignes sur le toit (forme, bouts, silhouettes) portent un bouton « Je confirme » : il note l’observation dans « Ce que je vois », celle de la personne, qui l’emporte sur Claude ; le moteur des toits la relit alors sur la mesure LiDAR et, s’il sait la dessiner, une proposition arrive à cocher. Rien n’est écrit dans le projet avant « Valider ». Sans mesure LiDAR sur le bâtiment, la ligne le dit d’avance (la confirmation est gardée avec l’audit, le toit ne se redessine pas) ; une contradiction entre murs se lit mais ne se confirme pas. En consultation (lecture seule), on lit sans confirmer.

- **Admin › « Calibrer la détection » (`?admin&ecran=calibration`) : photographier des façades, annoter leurs ouvertures, et laisser Plan chercher les réglages qui font le mieux.** Un cas est une façade : une à quatre photos prises ou choisies sur place, les quatre coins placés sur chacune, la largeur et la hauteur réelles ; le mur redressé montre ce que la détection propose, on retire les fausses ouvertures, on trace les manquées au doigt, on ajuste les cotes, puis on marque le cas « relu sur la photo ». Sur les cas validés, l’écran mesure précision, rappel, cotes et fiabilité de la confiance, puis la calibration essaie, réglage par réglage (les 8 plus décisifs par défaut, les 50 au choix, de la moitié au double de la valeur livrée), des valeurs voisines et ne garde que ce qui fait monter le score d’au moins 0,01 (F1, moins un peu de Brier). Le redressement est fait une seule fois ; seule la détection se rejoue. « Appliquer » enregistre les réglages sur le serveur, dans `data/admin/calibration.json` (les photos annotées dans `data/admin/calibration-cas/`) ; chaque page les lit au démarrage et la détection s’en sert. Les valeurs livrées restent la base : « Revenir aux valeurs livrées » les remet, l’historique est gardé. Sous 20 cas validés l’écran prévient que les propositions sont indicatives (un réglage ajusté sur si peu de façades surapprend). Les routes sont les mêmes en PHP et en Node : `admin/calibration` (lecture sans session, écriture avec) et `admin/calibration-cas` (avec session). Rien ne change tant qu’aucune calibration n’est appliquée : ni quantité, ni export, ni empreinte.

- **Audit de la parcelle : placer les quatre coins à la main quand le redressement se trompe, et corriger l’échelle.** Chaque photo de la façade dépliée a un bouton « Placer les 4 coins » (mis en avant quand le redressement a échoué) : les quatre poignées partent des coins calculés, une loupe aide au doigt, et un champ donne la largeur réelle du mur pour l’échelle. « Appliquer » écrit la correction dans la capture puis rejoue la façade ; elle prime sur le calcul et survit à tout rejeu. « Revenir à l’automatique » la retire. Pas d’accroche automatique aux arêtes pour l’instant.

- **Les baies d’une façade fusionnée sont jugées par un vote entre les vues.** Chaque photo redressée du groupe est aussi lue seule : une baie que plusieurs photos voient mais que peu retrouvent (une haie, une voiture) perd de la confiance et n’est plus cochée d’office ; une baie retrouvée par toutes en gagne un peu ; une baie que plusieurs photos voient et que la fusion a ratée est ajoutée. Sur le banc de synthèse rien ne change (il n’y reste aucun faux positif à retirer) : le gain se mesurera sur le corpus réel.

- **Un corpus de façades réelles et sa mesure.** `tests/fixtures/facades-reel/` reçoit des photos réelles annotées ; `reel.ts extraire` tire des brouillons d’un fichier d’audit (à relire sur la photo avant de les passer à « valide »), `reel.ts mesurer` donne précision, rappel, cotes, et la **fiabilité de la confiance** (courbe, écart de calibration, Brier), avec et sans fusion + vote. Aucune photo réelle annotée n’est encore dans le dépôt : le corpus est à constituer. Premier constat sur le banc de synthèse : les baies de confiance 0,6–0,8 (surtout devinées) ne sont justes que dans 38 % des cas.

- **Audit de la parcelle : toutes les photos d’une façade sont redressées, puis fusionnées, et un bouton « Rejouer redressement + fusion » refait le tout.** Chaque photo est redressée par calcul (aucun appel à Claude) : les coins sont cherchés sur les arêtes, les verticales du mur redressé doivent tenir sous 0,5° ; sinon les quatre coins calculés d’après la prise de vue prennent le relais, puis la photo est marquée « échec » avec son motif (« placez les quatre coins à la main »). Chaque photo porte son statut — redressée automatiquement, avec vos points, ou échec. À partir de deux photos redressées, la façade est fusionnée par des points ORB et un recalage RANSAC (critères nommés dans `CRITERES_FUSION`) : fusionnée, partielle (le plus grand groupe recalable, les autres restent seules) ou photos indépendantes, avec le motif. Une photo n’est jamais supprimée : si la fusion échoue, elle reste redressée seule. Les photos d’origine ne changent jamais, et vos corrections (les quatre coins, la largeur réelle du mur pour l’échelle) priment sur le calcul et survivent au rejeu, tout comme dans le fichier d’audit. Le bouton se trouve dans la liste de contrôle, pour tout l’audit ou pour une façade dépliée, et ne remplace que les images dérivées ; rejoué deux fois, il donne le même résultat. Pas encore d’écran pour poser les coins du doigt avec accroche : seules les données et le calcul les prennent en compte.

- **La grande ardoise posée en losange est une couverture de plus, partout où une couverture se choisit.** Se choisit dans l’inspecteur (Couverture › « Grande ardoise en losange »), se note dans « Ce que je vois » (Matériaux), s’arbitre comme toute couverture (valeur de la réconciliation, ligne de l’avant/après) et se dessine en 3D avec sa propre texture : des ardoises carrées posées sur la pointe, des losanges de 50 cm de diagonale, deux par mètre, des rangs décalés d’une demi-diagonale, des joints en diagonale, chaque ardoise de sa nuance et la pointe du haut ombrée par le recouvrement ; mate comme l’ardoise, et grise comme elle pour la cheminée et la brillance. Claude la reconnaît : le schéma de l’analyse admet `ardoise-losange` et le prompt la décrit (prompt version 8, schéma version 4) ; les analyses d’avant restent lisibles. Aucune quantité ni aucun export ne change ; un toit déjà enregistré garde sa couverture.

- **Un appentis est ouvert ou fermé : une option de l’avant/après, pour les galeries et les porches (maisons de type colonial).** Un appentis ouvert n’a pas de mur extérieur : des poteaux (14 cm, tous les 2,5 m au plus) le portent le long de son égout, sans mur de bout ; fermé, ses murs descendent jusqu’au sol, au bout comme sous l’égout. Sans indication, le dessin reste celui d’avant (`CorpsToit.ouvert`, absent). « Ce que je vois » gagne la ligne « Appentis (galerie, porche) » ; la ligne « Appentis de … » de l’avant/après écrit l’option sur tous les appentis du bâtiment, et on peut la forcer depuis le panneau « Sources » même quand personne ne l’a notée. Ni le LiDAR ni la photo de rue ne le disent : Claude n’est pas encore une source de cette option. Pour un contour de biais, un appentis hors du contour n’est pas dessiné (limite d’avant). Aucune quantité ni aucun export ne change.

- **Admin › « Les principes de Plan » (`?admin&ecran=principes`) explique tout le fonctionnement, principe par principe.** Quinze principes en cinq familles (les bases, d’où viennent les nombres, l’audit sur place, le plan et la 3D, travailler sur Plan) : la reproductibilité, les couches du code, règle/réglage/fait, l’arbitrage des sources, la lecture du toit sur le LiDAR, les formes dessinées par le code, l’audit, Claude analyste, qui décide, les façades, le plan et la 3D, préférence ou donnée, l’interface, l’administration, la livraison. Chacun se lit sous trois angles : le **processus** (les étapes numérotées), les **actions** (qui fait quoi — vous, Plan, Claude ou l’administrateur — et ce que cela déclenche, avec un lien vers l’écran quand il existe) et ce qui se **passe derrière** (le fichier du dépôt ou la donnée). Un sommaire par famille, un choix de l’angle à montrer, une recherche sans accents, des renvois entre principes. La liste est à plat (`model/principes.ts`) ; un test refuse un renvoi inconnu et un fichier cité qui n’existe plus. Aucune quantité ni aucun export ne change.

- **Les lucarnes se proposent dans l’avant/après, et les poids de la réconciliation se règlent à l’écran.** Le LiDAR ne voit pas les lucarnes (une cellule de 50 cm est plus large qu’elles) : leur nombre s’arbitre entre ce que vous avez vu sur place et ce que Claude voit, comme les cheminées, et la ligne « Lucarnes de … » écrit des lucarnes posées à égale distance sur le pan dit (rue, jardin, les deux), du type vu par Claude. Leur place exacte et leur largeur sont celles de leur type : la ligne arrive toujours décochée et le dit, à ajuster dans l’inspecteur. Admin › Règles › « Réglages et faits » › Réconciliation des sources gagne un tableau des poids : un champ par source et par attribut qui n’écrit que sa ligne du fichier, et un recalage sur des audits reçus (fichiers téléchargés d’Admin › Audits) : pour chaque source et chaque attribut, la part des fois où sa valeur est celle que la personne a gardée ; une source souvent juste pèse plus, une source souvent écartée pèse moins (au plus de moitié, huit décisions au moins), ce que la personne a vu sur place n’est jamais recalé. Les poids proposés s’appliquent un à un ou tous ensemble au brouillon, que l’on télécharge pour le poser dans le dépôt. Aucune quantité ni aucun export ne change.

- **La lecture du LiDAR reconnaît la carène et le nombre de faces d’une pyramide.** Un pan bombé dont les bouts sont fermés par un pan est une carène : la 3D dessine maintenant ces croupes courbes (`facade/toitSpeciaux.ts`, facettes en triangles sur une grille ; avant, la carène du catalogue se dessinait comme un berceau) et la lecture essaie plusieurs profondeurs de croupe contre la mesure. Un toit sur plan carré se lit pyramide à 5, 6 ou 8 faces (4 si elle est élancée : une flèche), la hauteur d’un toit à n faces se mesurant à l’apothème de la face. Carène et polygonal rejoignent les valeurs que l’arbitrage de la forme connaît. Le LiDAR seul ne décide toujours pas de la forme. Les lucarnes restent hors de portée du LiDAR (une cellule de 50 cm est plus large qu’une lucarne) : elles viennent de Claude et de la personne. Aucune toiture déjà lue ne change.

- **L’arbitrage décide aussi des cheminées et des ouvertures de façade.** Le nombre de cheminées se tranche entre ce que vous avez vu sur place et ce que Claude voit ; ce qui s’écrit, ce sont les souches (position, matériau) du constat retenu, posées sur le plus grand corps en pente, et vous pouvez forcer un nombre. Le relevé des ouvertures d’une façade se tranche entre les contours de la photo et le relevé renforcé par Claude : la photo seule décide (score 2, comme pour une ouverture que personne ne conteste), Claude la corrobore ou la contredit, un relevé fait à la main est un veto qui laisse la décision à la personne, et le relevé écrit est celui du constat retenu, texture comprise. La ligne « avec l’aide de Claude » reste proposée, décochée, pour ce que Claude affine (types, détails). Le moteur gagne une notion : les sources admises seules, par attribut (`seules` dans `regles/reconciliation.json`). Le constat porte désormais une charge (`Constat.charge`) que le moteur ignore et que la proposition écrit. Aucune quantité ni aucun export ne change.

- **Toutes les formes de toit du catalogue sont dessinées, nommées, et lues sur le LiDAR quand il les porte.** Papillon (deux pans qui descendent vers une noue), coyau, berceau, carène, toits de révolution (conique, polygonal, flèche, dôme, impériale), et, par les corps accolés, shed, toit en M, deux pans décalés ; l’asymétrique et le pavillon sont nommés (`facade/toitSpeciaux.ts`, `model/formeToit.ts`). Trois lucarnes de plus : œil-de-bœuf, outeau, lanterneau ; et l’acrotère des toits-terrasses. Le catalogue de l’écran « De l’IGN à ma maison » compte vingt-neuf vignettes calculées par le code de la 3D, et le modèle reconnaît chacune sous son nom. La lecture des formes (`facade/lectureFormes.ts`, seuils dans `regles/toits/formes.json`, visibles dans Admin › Règles) cherche sur la surface mesurée un profil qui se brise, s’adoucit ou se courbe, un milieu plus bas que les bords, un faîtage qui baisse à un bout, un cône ou un dôme sur plan carré ; chaque forme est dessinée par le code de la 3D et n’est gardée que si elle colle à la mesure bien mieux que le corps des formes simples. Elle devient un constat LiDAR de l’audit, puis la proposition qui écrit le corps. Aucun faux positif sur les quatorze bâtiments réels du corpus ; aucune toiture déjà lue ne change.
- **L’arbitrage décide aussi du matériau des murs, de la couverture et de la hauteur totale.** La valeur notée sur place l’emporte par son poids (D21), Claude n’est qu’un constat de plus, la personne peut retenir ou forcer l’une des valeurs, et les lignes sont rangées par bâtiment. La hauteur totale d’un bâtiment sans corps se tranche entre l’IGN et le LiDAR. `scripts/taux-automatique.ts` dit, sur des audits reçus, combien de décisions le moteur a tranchées seul, combien la personne en a refusées, et pourquoi les autres ont attendu. Le tri d’une promenade propose un fait candidat depuis « Ce que je vois » et la photo du cas, avec ce qu’il suppose et ce qu’un fait ne sait pas dire.

- **L’écran « De l’IGN à ma maison » se lit en direct dans les données.** Les poids des sources, les seuils de la réconciliation et ceux de `regles/toits/reglages.json` (valeur, unité, pourquoi), les versions du prompt et du schéma, la lecture des toits et les empreintes viennent des fichiers et des registres, plus du texte écrit à la main (`app/chaineVivante.ts`). Une source, un attribut arbitré, une étape de lecture du LiDAR, un sujet de l’audit ou une forme du catalogue ajouté aux données y apparaît tout seul (« Lu des données »). Ce qui ne se lit plus (un seuil retiré, une forme sortie du catalogue) est dit sur l’écran, et les tests refusent qu’une ligne cite un fichier qui n’existe plus.

- **Admin › « De l’IGN à ma maison » : le schéma de bout en bout (`?admin&ecran=chaine`).** Sept étapes en flèche (sources, polygone, découpage du toit en corps, objets 3D, textures, réconciliation, processus d’audit), chacune détaillée : ce que chaque ligne est, si elle se décide seule, à la main ou aux deux (filtre par mode), où elle vit dans le code, un lien vers l’écran qui la règle quand il existe, et un renvoi vers la ligne liée. La chaîne est une liste à plat de nœuds (identifiant, parent, genre, mode, écran, renvoi) dont l’arbre se déduit (`model/chaine.ts`) : ajouter ou déplacer une branche ne touche qu’une ligne, et `verifierChaine` refuse l’identifiant répété, le parent ou le renvoi inconnu, le cycle. Un catalogue de douze vignettes isométriques (`facade/catalogueToits.ts`) montre les formes que la 3D dessine, calculées par le même code que la 3D : deux pans, quatre pans, un pan, plat, demi-croupe (croupe meunière), gambrel, Mansart, et les lucarnes jacobine, capucine, chien-assis, rampante et meunière. Rien ne change pour l’utilisateur final ni pour les exports.

- **Les sources se réconcilient : un moteur de règles et de décision arbitre IGN, LiDAR, photos de façade, Claude et ce que vous voyez, attribut par attribut.** Pour chaque bâtiment (hauteur à l'égout, forme du toit, bouts, sens du faîtage, silhouette des façades…), chaque source dit sa valeur avec sa confiance et la règle qui l'a lue ; les valeurs qui s'accordent forment un groupe, pesé par le poids de la source (`regles/reconciliation.json`, seuils `SCORE_AUTO_MIN`, `MARGE_AUTO_MIN`). Le moteur décide seul quand c'est sûr, sinon il vous laisse décider et dit pourquoi. L'écran des propositions montre les sources de chaque décision (Retenu / Écarté, avec le seuil de la règle LiDAR) et un panneau « Sources » par bâtiment : « Retenir » un groupe, « Forcer » une valeur, « Reprendre le choix du moteur » ; décider coche la proposition, rien n'est écrit avant « Valider ». Une ligne dit combien de décisions sont automatiques. Admin › Règles › « Sources et arbitrage » montre les poids, les seuils et les règles LiDAR. Spécification : `MD/spec-reconciliation.md`. Aucun export ni aucune quantité ne change.

- **La 3D dessine le Mansart, le gambrel, la demi-croupe et les lucarnes, et les intègre à la toiture.** Un corps qui porte un `profil` brisé (brisis raide puis terrasson), des bouts en `brisis` ou en `demi-croupe`, ou des `lucarnes` (jacobine, capucine, chien-assis, rampante, meunière) se dessine en facettes planes, avec le débord de l'égout, et la hauteur du toit en un point (donc les murs et les fenêtres) suit les mêmes plans (`facade/toitFormes.ts`, `three/toitCorps3d.ts`) ; sur un contour de biais, les facettes sont découpées comme les autres, et les faces et joues des lucarnes se posent sur le toit. Un corps sans ces champs garde le dessin d'avant à l'identique (AE 101 inchangé, aucune empreinte ne bouge). Aucune règle ne produit encore ces champs : les lire sur le LiDAR ou depuis les propositions de Claude (lots G4, G5, G7) reste à faire.

- **L’audit dit quand les photos partent à l’analyse, et Admin › Audits les relance.** À l’écran des propositions, le toast annonce « Photos soumises à l’analyse des façades à HH:MM : n photo(s) sur m façade(s) », puis « Analyse des photos terminée à HH:MM : … coins trouvés sur … » (l’envoi à Claude garde son propre toast). Dans le détail d’un audit reçu, un bouton « Relancer l’analyse des photos » se tient à côté de « Rejouer l’analyse » : il ouvre l’audit dans le projet (même parcelle, écriture permise) sans ses mesures ni ses décisions, si bien que ses photos repassent par les mesures d’aujourd’hui (relevé des façades, silhouettes, toit) et se poussent sur les façades du projet, annulable par Ctrl+Z. « Rejouer l’analyse » ne change pas : il ne renvoie que l’analyse de Claude.

- **La silhouette des façades dit le sens du faîtage et la forme du toit, dans les mots de Claude.** Chaque façade porte `silhouette` (`triangle`, `trapeze`, `rampe`, `ligne-droite`, `marches`, `plusieurs-sommets`, les mots de « Lire les pignons d’abord ») et `bout` (`pignon`, `croupe`, `demi-croupe`, `brisis`, `sans-objet`, le même `bout` que `bouts.gauche`) : prompt version 7, schéma version 3. Plan mesure aussi la silhouette sur la photo (silhouette au-dessus de l’égout). Le moteur des toits (`facade/regles/toits/silhouettes.ts`) en tire le **sens du faîtage** (perpendiculaire à un mur de bout, parallèle à un long pan ; le sens que soutiennent les murs les plus larges) et les **bouts** (un mur de bout l’emporte sur un long pan : un trapèze dit des croupes, une ligne droite des pignons), puis la toiture se **recalcule** sur la mesure LiDAR avec ces paramètres (`corpsSousContrainte`, fait en contrainte `faitage` par azimut + `bouts` + `forme`) : un faîtage qui tourne de 90° refait le toit dans l’autre sens. Une demi-croupe ou un brisis donnent le sens, jamais les bouts (le moteur ne sait pas les produire). La ligne « Forme du toit » arrive sur l’écran des propositions avec son avant/après dans la Vue 3D, décochée avec ses raisons ; quand les murs et la vue d’ensemble de Claude divergent, les murs l’emportent et la ligne le dit. Les seuils (tolérance d’un mur de bout, part d’un second sens) et la table de lecture (silhouette + bout → rôle du mur et ce qu’il dit) sont une donnée du moteur de règles, `regles/toits/silhouettes.json`, lue par `src/regles/toits/silhouettes.ts` et montrée et éditable dans Admin › Règles › « Réglages et faits » (un fichier de plus : il ne change aucune toiture déjà lue, donc aucune ligne de version de lecture).

- **Les photos de l’audit alimentent les façades toutes seules.** Dès que la mesure d’une photo de façade est prête (coins trouvés, confiance suffisante, aucune réserve), son relevé (ouvertures et texture) est écrit sur la façade du projet, sans « Valider », en un seul pas d’historique que Ctrl+Z défait. Un relevé fait à la main n’est jamais écrasé : la ligne reste une proposition décochée. Le relevé posé par l’audit porte la marque `depuisAudit` ; une mesure plus récente le remplace, un relevé refait à la main la fait tomber.

- **Conformité des façades (lot G13).** Sur chaque façade relevée d'un audit reçu, la disposition automatique des
  fenêtres est posée sur le même mur (`ouverturesDUnMur`, extrait de `ouverturesAutomatiques` sans en changer un
  résultat) et comparée au relevé : baies à ± 1, part vitrée à ± 20 %, hauteur des niveaux à 30 cm. Admin ›
  Conformité montre le taux (tuile, colonne « Façades » par région, onglet « Façades » avec le relevé et la
  disposition côte à côte, historique) et la mesure rangée sur le serveur le porte. C'est une mesure : elle ne change
  aucune valeur produite par Plan, et dit où un profil de façades (G14) servirait.
- **Un modèle plus fin départage les passes de Claude qui se désaccordent (D20).** Quand les trois passes ne
  s'accordent pas sur un attribut d'un bâtiment, ce bâtiment repart seul (première passe, mêmes images) par l'appel
  immédiat, usage `escalade`, sous les plafonds de l'organisation. La réponse ne tranche que les attributs sans
  unanimité ; la ligne arrive décochée et le dit (« un modèle plus fin a tranché : à vérifier »). Un plafond atteint ou
  un échec garde le vote des trois passes. Le modèle est celui réglé pour « Escalade » (Haiku par défaut : à passer à
  un modèle plus fin dans les réglages pour que l'escalade serve à quelque chose).
- **La valeur notée sur place l'emporte sur celle de Claude (D21).** Sur le matériau des murs, la couverture, les
  cheminées et le toit-terrasse, la ligne de Claude arrive décochée avec la raison, et cocher l'une décoche l'autre.

- **Admin › Règles : le brouillon s'essaie avant la PR.** « Enregistrer sur le serveur » garde le prompt, le
  schéma et l'état de l'éditeur côté serveur (`admin/claude/regles`, PHP et Node, administrateur seul) ;
  « Reprendre celui du serveur » le rouvre d'un autre navigateur. Il ne remplace jamais le prompt livré : seule une
  demande de l'administrateur qui le nomme (`essai: "brouillon"`) le lit. **`?regles=local`** (le mode d'essai des
  faits) fait partir l'analyse de l'audit avec le prompt du brouillon, et le dit ; le batch garde une copie du texte
  envoyé (la réponse se ramène à *son* schéma, même si le brouillon change ensuite), et le journal, la fiche et la
  trace portent la marque d'essai.
- **Admin › Audits : rejouer un audit avec le prompt édité, et comparer les réponses.** Case « Avec le brouillon
  des règles (vN) » à côté du modèle du rejeu ; la liste des analyses dit « brouillon 6 » dans la colonne du prompt.
  Une analyse ouverte se compare à une autre du même audit : le vote des trois passes de chaque bâtiment, attribut
  par attribut (forme, bouts, lucarnes, couverture, façades, champs des sujets ajoutés…), ne montre que ce qui change,
  avec l'accord de chaque côté.
- **Admin › Règles édite aussi les réglages et les faits** (onglet « Réglages et faits ») : un seuil change de valeur ou
  de raison sans reformater le fichier (le diff d'une PR montre sa ligne), le lecteur du code contrôle le texte, et
  l'écran dit si l'empreinte change (les toits déjà lus seront relus) en donnant la ligne de version à ajouter à
  `LECTURES_TOITS` ou `LECTURES_FACADES`. Un fichier que le moteur refuserait ne se télécharge pas ; les faits
  (`regles/toits/faits.json`) s'éditent en texte, avec la liste de leurs bâtiments.
- **Le vote des passes lit les sujets ajoutés.** Un champ `{ indices, valeur }` ou `{ indices, nombre }` déclaré
  par une description est lu et voté sans code propre (`VoteAnalyse.simples`, `src/regles/sujets/vote.ts`) ; un
  champ mal formé refuse la passe, un champ absent d'une réponse gardée d'avant le sujet est ignoré. Un sujet
  ajouté depuis Admin › Règles se dit aussi en observation (« Chiens-assis vu : 2 ») sans module.

- **Admin › Règles (`?admin&ecran=regles`) : le prompt et le schéma de Claude, composés par les sujets, en
  direct.** Chaque sujet de l'audit a une description (ce que Claude lit, comment il répond, son vocabulaire,
  ses confusions) ; `deploy/prompt-analyse.md` et `deploy/schema-analyse.json` sont désormais **générés** depuis
  elles (`npm run regles:generer`, `regles:verifier`), à l'octet identiques à ceux d'avant (prompt version 4, schéma
  version 1). L'écran montre les sujets (ce qu'ils proposent au projet et ce qu'ils écrivent, l'accord mesuré de
  Claude), laisse en exclure un du prompt, éditer ses textes et son schéma, ou **ajouter un sujet en brouillon**
  (un chien-assis, un objet du jardin) : le prompt et le schéma se recalculent à chaque frappe, avec les lignes qui
  changent par rapport au livré, la version à poser et les contrôles (schéma fermé, une consigne par champ, termes
  définis, rangs uniques). On télécharge le module du sujet et les deux fichiers ; rien n'est écrit sur le serveur,
  le brouillon reste dans le navigateur. Un texte changé sous la même version est refusé par un test.

- **Audit : la forme du toit vue par Claude devient une proposition à décider.** Ce que Claude lit sur
  les pignons et les croupes (forme, bouts) est relu sur la mesure LiDAR par le même mécanisme que les
  faits (`corpsSousContrainte`) : le corps principal est relu parmi les seules formes vues, les autres
  corps ne bougent pas. La ligne « Forme du toit de … » montre l'avant (la forme lue aujourd'hui) et
  l'après, l'écart à la mesure avec cette forme (aujourd'hui / après) et les écarts que Claude a relevés
  entre le rendu et la photo ; elle arrive décochée. Rien n'est fabriqué : une forme que Plan ne sait pas
  lire (Mansart, demi-croupe…), des bouts qui se contredisent, un écart au-delà de 0,8 m ou l'absence de
  mesure LiDAR laissent la ligne dans « Vu par Claude ». Cochée et validée, elle remplace les corps du
  bâtiment (Ctrl+Z). « Forme du toit » est un cinquième attribut dont le taux d'accord se mesurera.

- **Claude lit les pignons d'abord** (prompt d'analyse, version 4) : la silhouette du haut de chaque
  façade (triangle, trapèze, rampe, marches) dit la forme du toit et ses bouts, et chaque désaccord
  entre le rendu et la photo va dans les écarts. Le schéma de la réponse ne change pas.
- **Contour noir sur le rendu de la façade pour Claude** : arêtes des murs, du pignon et du toit,
  épaissies, pour que la limite façade / pignon / toit se lise sans hésiter.

- **Les arbres sont générés par EZ-tree, depuis une bibliothèque d'essences que l'administrateur crée**
  (`MD/spec-arbres-3d.md` 2.0). Nouvel écran Admin › Arbres (`?admin&ecran=arbres`) : on y crée des
  essences (un nom, caduc ou persistant, des dimensions, les réglages d'EZ-tree à partir des quinze modèles
  ou d'un arbre vierge) avec un aperçu 3D, ses triangles et le temps de génération. La bibliothèque vit sur le
  serveur (`admin/arbres`, lisible sans session, PHP et Node). L'inspecteur d'un arbre ne propose plus qu'une
  liste « Essence », avec le diamètre du feuillage ; choisir une essence propose sa hauteur et son diamètre.
  Les arbres d'une même essence se dessinent en `InstancedMesh`. EZ-tree (4 Mo) ne se charge que si la
  bibliothèque n'est pas vide ; sans lui ni essence, l'arbre est un tronc et une boule.

- **Une bibliothèque d'essences livrée avec Plan : 145 arbres, arbustes et haies** (`MD/spec-arbres-3d.md`
  §2.1). Feuillus caducs (chênes, hêtres, érables, tilleuls, platane, bouleaux, saules, peupliers…),
  fruitiers, ornement, conifères (pins, épicéas, sapins, cèdres, cyprès, thuyas, if, mélèze…), persistants
  (chêne vert, olivier, lauriers, houx, buis…) et haies. Elle sert tant que le serveur n'a enregistré aucune
  bibliothèque ; une bibliothèque enregistrée la remplace. L'import du cadastre propose l'essence d'après la
  nature de la zone (verger : pommier, conifères : pin sylvestre, haie : charme…). Admin › Arbres : bouton
  « Reprendre les essences par défaut » pour les retoucher ; le serveur accepte désormais 200 essences et
  512 Ko. EZ-tree (4 Mo) se charge donc à l'ouverture de la Vue 3D même sans bibliothèque du serveur.

### Modifié

- **Découpage : `facade/` par domaine, une seule algèbre linéaire, une seule médiane, `model/types.ts` allégé.** Les 18 000 lignes de `facade/` se rangent en sous-dossiers (`vision/`, `detection/`, `toits/`, `calage/`, à côté de `releve/`, `modeToit/` et `regles/`), leurs tests suivent (`tests/unit/facade/<dossier>/`), et les chemins cités dans la documentation et les skills sont mis à jour. Les deux pivots de Gauss (homographie, moindres carrés du toit) deviennent un seul (`geometry/lineaire.ts`), cinq copies de la médiane une seule (`util/stats.ts`). `model/types.ts` passe de 1 474 à environ 900 lignes : les points, le relevé d’une façade, le toit et les hypothèses de calcul ont leur fichier, ré-exporté par lui (aucun import ne change). Aucun nombre ne change : empreintes identiques, AE 101 identique.

- **Couplage : l’état d’interface quitte le moteur, un cycle de moins, un hôte d’écran unique.** La façade et l’élément de façade désignés avant une commande (`designerFacade`, `viserSaillie`) vivaient dans `facade/`, la couche du calcul, écrits par l’interface : ils passent dans `interaction/` (`choixFacade.ts`, `choixSaillie.ts`). Les types d’un débit sortent dans `engine/typesDebit.ts`, ce qui casse le cycle `prix` → `debit` → `prix` du moteur ; un cliquet compte les cycles qui ne passent que par des imports de type (dix aujourd’hui, le nombre ne peut que baisser). Les onze écrans montés à part (admin, porte, premier pas) prennent leur élément d’accueil par `shell/dom.ts::hoteDeZone`. Les entrées d’ambiance que lisent les couches pures (surcharges de calibration, faits essayés, bibliothèque d’arbres, encres du thème) sont listées dans `MD/architecture.md` §5.2.4, et ce qui reste du couplage (état 3D écrit de plusieurs couches, `app/` ↔ `zones/`, gros modules) est inscrit au registre des dettes (AD-14 à AD-18).

- **Documentation et garde-fous remis d’accord avec le code (lot H de l’audit d’architecture).** Le budget de 5 Mo de la CI (FF-5) mesurait `dist/index.html` seul, environ 200 Ko, depuis que le programme est sorti de la page : il additionne maintenant la page et `dist/assets/*.js` (environ 3,1 Mo) et affiche chaque taille. `MD/architecture.md` dit les couches telles que le test les impose (`facade/`, `regles/`, `plateforme/`, `zones/`), ajoute une carte des modules du 25 octobre 2026 tirée de l’arbre (§5.2.6), complète l’arbre du moteur de règles et corrige les noms de tests déplacés, marque pour chaque fonction d’aptitude (§9) si elle tourne, si elle relève de backprod ou si rien ne la vérifie, déclare ADR-4 (fichier unique) remplacée, ADR-3 amendée (le serveur de ce dépôt est en PHP, `deploy/*.php`, et en Node dans `buildsg/`) et les décisions de backprod comme telles, et inscrit au registre les dettes trouvées (`three/**` non découpé, code de l’éditeur du Mode Toit rangé sous `facade/regles/toits/`, aucune empreinte SRI sur les scripts du CDN) ainsi que celle payée le 24 octobre (la chaîne des façades descendue dans `facade/releve/`). `MD/RELEASE.md` et `README.md` : fusion par commit de fusion et non par écrasement, aucun contrôle du format des commits en CI, `SCHEMA_VERSION` dans `src/model/version.ts`, livraison en un dossier avec ses scripts PHP, organisation du dépôt complétée. `CLAUDE.md` cite ce que la CI lance en plus (build, `verifier-paquet`, budget). Les références à `legacy.ts`, supprimé depuis la `1.1.0`, quittent `eslint.config.js` et `vitest.config.ts`. Aucun nombre ni aucun export ne change. Garde-fous ajoutés : un cliquet sur les commentaires accentués du code (`tests/unit/conventions.test.ts`, qui ne peut que baisser), le cliquet du typage couvre aussi `zones/`, `regles/`, `plateforme/` et `styles/`, et sept fichiers de test rejoignent le dossier qui suit leur module (`tests/unit/<couche>/`).
- **Moteur de règles : chaque chose dans son dossier.** L’éditeur du mode Toit (poignées, session, saillies, corps neufs, plan des corps, façades des corps) sort de `facade/regles/toits/`, réservé aux règles, pour `facade/modeToit/`. Les réglages des façades (détection, structure, texture : 61 valeurs) et trois seuils de la silhouette des corps passent du code aux fichiers de `regles/` (`regles/facades/{detection,structure,texture}.json`, `regles/toits/silhouettes.json`), sans changer de valeur. Les éléments de toit vus (souches, terrasse, lucarnes) se posent dans le moteur (`facade/regles/toits/elementsVus.ts`) : les sujets du moteur n’importent plus l’audit pour cela. Le seuil de 0,8 m de l’audit, homonyme de celui des formes du catalogue (0,4 m), devient `ECART_FORME_SIMPLE_MAX_M`. Aucun toit ni aucune quantité ne change ; AE 101 identique.

- **Façades : la chaîne descend dans `facade/releve/`.** L’enchaînement de la chaîne des façades (la série de photos, le mur cherché sur l’assemblage, le redressement et la fusion, les calculs de l’écran de calibration) vivait dans `zones/releve/`, au-dessus du moteur qu’il appelle : l’audit (`app/`) importait un module d’écran, et la calibration avait dû en recalculer des morceaux. Il est maintenant dans la couche du moteur, pur (`facade/releve/chaine.ts`, `coinsAuto.ts`, `serie.ts`, `analyseSerie.ts`, `masque.ts`, `casCalibration.ts`), avec les types d’une prise de vue (`facade/releve/prise.ts`, que la caméra, les capteurs et la visée re-exportent). Les tests suivent (`tests/unit/facade/releve/`). Rien ne change à l’écran ni dans les nombres.

- **Banc des façades : il mesure la chaîne de production, et une photo seule redevient nette.** Le banc rejouait `analyserReleve` (une photo) et `analyserVues` (plusieurs vues), que l’audit, le relevé et la calibration n’appellent plus depuis le passage par l’assemblage : ses chiffres ne disaient rien de ce qui sert. Il joue maintenant `analyserLeMur` (`tests/banc/facades/banc.ts`). Mesurée ainsi, la chaîne faisait un peu moins bien sur une photo seule (précision 93 → 92 %, une fausse baie de plus sur la scène 12, des cotes de 1 à 7 cm plus larges sur quatre scènes, dont la baie en retrait vue de biais) : la photo passait par son assemblage déjà rééchantillonné. Une photo seule se redresse maintenant en une passe depuis la photo d’origine, le mur posé par les mêmes coins (`facade/analyseMur.ts`) : le banc retrouve, scène par scène, les chiffres d’avant (précision 93 %, rappel 91 %, cotes médianes 1 cm). La fusion de vues ne change pas. La chaîne des façades passe en version 9. Aucune quantité ni aucun export ne change.

- **Façades : plusieurs vues du mur se fondent de nouveau, avec le vote des baies et les occultations.** Depuis que l’audit, le relevé et la calibration passent par l’assemblage, plusieurs vues d’un mur étaient seulement cousues : une voiture ou une haie visible sur une vue restait dans la texture et faisait de fausses baies. L’assemblage pose toujours le mur ; l’image du mur se compose maintenant par la fusion de ces mêmes photos (`facade/analyseMur.ts::fondreLesVues`) : la vue la mieux vue pixel par pixel, la médiane à trois vues, ce qui est devant le mur écarté par la parallaxe et hachuré au relevé quand il le cache sur toutes, les baies votées entre les vues. Même cadre qu’avant (le mur et la bande au-dessus de l’égout). Sur les quatre scènes du banc à vues (16 à 19) : précision des baies de 63–83 % à 86–100 %, rappel de 67–83 % à 100 %. Une photo seule ne change pas. La chaîne des façades passe en version 8. Aucune quantité ni aucun export ne change.

- **Façades et calibration : les calculs sortent des écrans.** Ce que l’éditeur d’un cas calcule (coins de la série, assemblage pris tel quel, façade complète, calage ramené sur chaque photo, images des étapes) vit dans `zones/releve/casCalibration.ts`, sans React. Les calculs du calage de la silhouette sont dans `facade/calageSilhouette.ts`, la scène 3D de la dernière étape dans `three/vueFacade3d.ts`, et le Douglas-Peucker n’existe plus qu’une fois (`geometry/simplifierLigne.ts`). En mode Toit, le corps sur lequel agit un geste et le mur tracé autour du corps choisi se calculent par les fonctions du moteur (`rangDuCorpsChoisi`, `silhouetteVersLOeil`) : le texte d’aide ne peut plus dire autre chose que le geste. L’assemblage de l’étape 3 n’est plus encodé deux fois en JPEG. Une vue 3D fermée avant l’arrivée de sa photo ne se rend plus. Rien ne change à l’écran ni dans les nombres.

- **Audit : quatre repères redressent la photo entière, l'égout et le sol se cherchent ensuite.** « Placer 4 repères » remplace « Placer les 4 coins ». Les points sont n'importe quel rectangle du mur (une fenêtre, une porte, le mur) : deux en haut sur une horizontale, deux en bas. Ils ne servent qu'à redresser les verticales et les horizontales, sur la photo **entière** : l'image n'est plus réduite au mur, et l'échelle ne se fixe pas à cette étape (la largeur vient de la parcelle, la hauteur à l'égout du LiDAR ou du dessin). Les photos redressées s'assemblent, puis l'égout, le sol et les bouts du mur sont cherchés automatiquement sur l'assemblage et reportés dans chaque photo. Les photos redressées que garde l'audit sont entières. La chaîne des façades passe en version 2 ; les anciens audits relisent leurs coins tels quels. L'égout et le sol se cherchent sur l'assemblage (voir ci-dessous), et se reprennent à la main (`MD/spec-releve-facade.md` §6.1 bis).
- **Façades : l'égout et le sol se trouvent sur l'assemblage, et se reprennent à la main.**
  - **La recherche.** Elle prenait le haut de la bande de tuiles pour l'égout, et un bandeau d'étage pour le sol quand une haie ou une voiture cachait le pied. Les deux bords s'affinent désormais par la teinte du mur, lue le long de ses bouts. Le sol se cherche près de la hauteur donnée par le plan ; s'il est caché, il tombe à cette hauteur. Sur les 20 scènes du banc, prises par points de fuite et par repères, l'égout est juste (à 2 % de la largeur du mur) dans 37 cas sur 40, au lieu de 8, et le sol dans 37 cas sur 40, au lieu de 24.
  - **La reprise à la main.** « Ajuster l'égout et le sol » (audit, calibration) montre la photo redressée entière avec quatre lignes à tirer : l'égout, le sol et les deux bouts. Le mur ainsi ajusté l'emporte et se reporte sur les autres photos du mur.
  - **La mesure.** Le script `.claude/skills/facades/scripts/egout-sol.ts` mesure la recherche.
- **Mode Toit : le corps choisi.**
  - Un geste du catalogue (forme, corps, élément du toit ou de façade) n'agit que sur le corps choisi. Une forme ne remplace que ce corps, à son emprise et à ses hauteurs. Le panneau dit sur quel corps vont les gestes. Sans choix, la façade regardée, comme avant.
  - Un corps choisi montre sa silhouette sur la scène, en trait épais sur un halo clair.
  - La poignée qui déplace l'élément choisi est un carré à quatre flèches, distinct des poignées rondes qui étirent ou montent.
  - Nouveau point 98 de la fumée.
- **Admin › Calibration : les photos de chaque façade en vignettes.** Dans « Créer un cas depuis un audit », chaque façade montre ses photos en vignettes au bout de sa ligne.
- **Façades : la silhouette du mur vient du plan et du LiDAR, et dit le toit.**
  - **Le gabarit.** La silhouette du haut du mur ne se lit pas sur la photo : c'est celle des corps du toit lus sur le LiDAR (pignon, rampe, marches), à la largeur du cadastre, tous corps derrière la façade compris (avancée, nu, retrait), le plus haut l'emportant ; ses hauteurs sont ramenées à la hauteur du mur ; sans corps, un rectangle (`facade/gabaritMur.ts`). Elle se pose sur l'image redressée entre l'égout, le sol et les bouts trouvés, et seule son échelle suit : les repères ne disent que les directions, la dimension vient de ce calage. Sur AE 101, la façade ouest ne monte plus à 2,4 fois sa hauteur, et la façade nord montre le grand corps au-dessus de l'annexe.
  - **Le toit.** Quand la silhouette a une forme (un pignon, une rampe), la forme et la hauteur du toit déduites de la façade sont les siennes, à l'échelle du mur ; une silhouette plate (mur gouttereau) laisse la bande au-dessus de l'égout lire le toit qu'on voit derrière. Un pignon décentré est reconnu (il passait pour une croupe). Sur les trois pignons du banc : 3 justes sur 3 au lieu d'un (forme, hauteur à 10 %). L'avis de la photo que l'audit arbitre reste la lecture de la bande (voir Corrigé).
  - **L'assemblage partout.** Une photo seule ou des vues du mur entier passent par l'assemblage des photos redressées entières : le mur, la détection, la texture et le toit en partent, dans l'audit et le relevé comme dans la calibration (`facade/analyseMur.ts::analyserLeMur`). Un mur à deux hauteurs d'égout et des morceaux d'un long mur gardent leur analyse.
  - **La reprise à la main.** « Ajuster l'égout et le sol » (audit, calibration) a quatre lignes à tirer (égout, sol, deux bouts) ; la silhouette les suit sans changer de forme.
  - **Les chiffres.** Sur les 22 scènes du banc, égout 44/44 et sol 43/44. La chaîne des façades est passée en version 3 avec l'affinage de l'égout et du sol, 4 avec la lecture de la silhouette, 5 quand elle dit le toit, 6 avec le gabarit, 7 avec l'assemblage partout.
- **Admin › Calibration : neuf étapes, de la photo à la 3D.** Sur chaque photo, on pose au besoin quatre repères (« Retirer les repères » les enlève), et « Retrouver le mur sur toutes les photos » refait la chaîne de l'audit. Les étapes, chacune en image : 1. les repères, ou les points de fuite ; 2. chaque photo redressée entière ; 3. l'assemblage, avec l'égout, le sol et les bouts du mur cherchés dessus — l'image prise pour toute la suite, faite une fois ; 4. la façade complète, la silhouette à son échelle ; 5. caler la silhouette (déplacer, tirer ses bouts et son sol, proportions verrouillées : sa hauteur suit sa largeur au rapport du plan) ; 6. ajuster la hauteur de la photo (une poignée en haut l'étire autour du sol, en direct) ; 7. les ouvertures proposées, les devinées en pointillé franc ; 8. l'image posée sur la façade, avec et sans les ombres ; 9. le mur en 3D à la forme de sa silhouette, la photo sur sa face, vu de face à mi-hauteur. « Appliquer le calage et redresser » pose le mur calé sur chaque photo, comme un mur posé à la main. Un cas importé d'un audit garde le gabarit de son bâtiment ; un cas enregistré garde ses repères (`reperes` d'une photo, facultatif). Une photo restée hors de l'assemblage est signalée.
- **Façades : une seule chaîne de redressement, de fusion et de cotes pour l’audit, le relevé et la calibration.** Les calculs étaient déjà communs (`src/facade/`), mais chaque écran les enchaînait à sa façon : les replis de l’audit (champ de l’objectif lu sur les points de fuite sans EXIF, coins de la prise de vue quand les verticales penchent, côtés ramenés sur les verticales, report du mur posé au doigt sur les autres photos) n’existaient ni au relevé ni à la calibration, et la calibration cherchait ses coins par une autre méthode. Tous passent maintenant par `zones/releve/chaine.ts` et `facade/analyseMur.ts`. Le relevé gagne les replis de l’audit, sans jamais toucher un coin posé au doigt, et des coins qui ne forment pas un mur cèdent la place à ceux de la prise de vue plutôt que de ne rien rendre. La calibration trouve ses coins comme l’audit (et lit encore le mur sur l’assemblage des vues pour les photos sans prise de vue). Les essais de coins se jugent sur une élévation réduite (512 px) : l’analyse, seule coûteuse, ne se fait qu’une fois. Mesuré sur les 22 scènes du banc : l’audit rend les mêmes relevés, 10 % plus vite (médiane 489 → 462 ms) ; la calibration trouve des coins égaux ou meilleurs (scènes 13, 14, 16, 17, 19 : de 14–600 % de la largeur d’écart à 2–11 %), pour 30 ms de plus en médiane ; le relevé paie 28 ms par photo pour ses replis. Aucune quantité ni aucun export ne change.

- **Audit : la silhouette des façades décide de la forme du toit.** Pour la forme du toit, ses bouts et le sens du faîtage, ce que disent les silhouettes des murs (photo de façade, Claude ; `regles/toits/silhouettes.json`) l’emporte sur le LiDAR, quel que soit son poids : seules les silhouettes, et ce qui a été vu sur place, se départagent (`prioritaires` dans `regles/reconciliation.json`, `facade/regles/reconciliation.ts`). La forme que Claude tire des silhouettes remplace aussi celle qu’il donne pour l’ensemble, sauf quand seules des lignes droites de longs pans la disent (le haut d’un deux-pans comme d’un appentis : l’abri d’AE 101 serait passé en deux pans). Une source qui n’a pas le droit d’être seule (Claude, la photo) laisse encore la décision à la personne, la silhouette proposée. Le LiDAR garde les hauteurs. **Corps par corps** : chaque façade est rattachée au corps du toit qui la porte (le côté de corps qui longe le mur, à 1 m près et sur la moitié de sa largeur : `facade/regles/toits/murDuCorps.ts`, seuils `MUR_CORPS_*` de `regles/toits/silhouettes.json`) ; ses silhouettes ne parlent que de lui. Le corps principal garde les lignes d’arbitrage du bâtiment ; chaque autre corps a les siennes (forme, bouts, sens, contre sa lecture LiDAR), et une proposition qui ne relit que lui (effet `corpsDuToit`, les autres corps ne bougent pas). Sur AE 101 (quatre corps, pignons à l’est et au nord), le bâtiment entier voyait « deux sens de faîtage » ; corps par corps, les silhouettes de Claude confirment chacune le sens lu par le LiDAR (74° le corps principal, 164° les ailes) et rien n’est proposé : le modèle reste. Aucune toiture déjà lue ne change : ce sont les propositions de l’audit.

- **Photos sans EXIF : la focale se lit sur les points de fuite.** Les photos de l’audit d’AE 101 (octobre 2026) étaient prises à l’ultra grand-angle (0,5x) : une focale moitié de celle supposée (67°), qui faussait le redressement par les fuites, ses proportions, et l’inclinaison lue sur les verticales. La verticale et l’horizontale du mur sont orthogonales : leurs deux points de fuite donnent la focale (`facade/redressementFuites.ts::focaleDesFuites`), quand la photo est prise vers le haut et de biais ; sinon (photo d’aplomb, de face), la focale d’un téléphone, comme avant. Le relevé de l’audit la prend quand la photo n’a pas d’EXIF (`priseDeLaPhoto`). Sur AE 101 : l’assemblage par les fuites (calibration, report des coins) relie 4 paires de photos sur 4 (3 avant) ; dans l’audit, le mur est trouvé sur 5 façades sur 12 (3 avant), le mur ouest n’empiète plus sur le toit, et 19 ouvertures sont relevées (15 avant). Les deux façades est gagnées ne montrent pas un mur net : le calage des photos prises de loin reste à faire. Banc des façades inchangé.

- **Relevé de façade : les fenêtres d’un étage sous le même linteau, une travée sur le même axe.** La régularisation égalisait déjà les largeurs (travée) et les hauteurs (rangée) ; elle aligne maintenant les places, à 5 cm au plus et à partir de trois baies (la médiane de deux est leur moyenne, qui tirerait la bonne vers l’autre), sans jamais déplacer un bord de plus de 10 cm (`facade/structure.ts::regulariser`). Banc inchangé (les baies y sont déjà au centimètre) ; c’est pour les quelques centimètres d’écart d’une photo réelle.

- **Audit de parcelle : la hauteur du mur est celle du LiDAR.** Le relevé des façades et le fichier de l’audit prenaient la hauteur du prisme (3,4 m) ; ils prennent maintenant celle du mur sous le toit lue par le LiDAR, comme la liste des façades. Le calage sur l’assemblage des photos reste coupé dans l’audit (`SERIE_DANS_L_AUDIT`) : sur des photos prises de loin, il cadrait une fenêtre ou un pan de bois plutôt que le mur. Aucune quantité ni aucun export ne change.

- **Admin › Calibrer la détection : les coins se lisent sur l’assemblage des photos redressées par leurs points de fuite.** Sur les cas du bac à sable (Hardencourt, 16 photos), les coins du mur n’étaient trouvés que sur une photo : les photos réelles montrent rarement le mur entier, et le calage par les coins y prenait une fenêtre ou un volet pour le mur ; aucune fusion ne tenait. Chaque photo est maintenant redressée par ses seuls points de fuite (`facade/redressementFuites.ts` : verticales et horizontales du mur, focale d’un téléphone supposée), les vues redressées s’assemblent en mosaïque par points communs à échelle libre (`facade/mosaiqueFuites.ts`), le mur y est lu de l’égout au pied, puis ses coins sont reportés dans chaque photo, même hors du cadre. Sur les quatre cas : 16 photos redressées sur 16, deux cas entièrement fusionnés (3 photos sur 3), un en partie ; la hauteur du mur suit les proportions lues, à la largeur donnée. Les coins posés à la main, et ceux trouvés sur les arêtes d’une photo qui montre le mur entier, ne sont pas repris ; un quadrilatère croisé n’est plus pris pour un mur. Nouveau bouton « Retrouver les coins sur toutes les photos », pour les cas déjà enregistrés. L’audit de la parcelle et le relevé ne changent pas.

- **Audit : huit photos partout.** Une promenade garde jusqu’à huit photos par cas (six auparavant) ; l’audit de la parcelle, huit pour le toit d’un bâtiment, la clôture et le portail (quatre auparavant), comme pour une façade et dans l’éditeur de calibration. Huit photos d’un cas pèsent environ 3,2 Mo.

- **Admin › Calibrer la détection : jusqu’à huit photos par façade** (quatre auparavant), comme l’audit de la parcelle et le serveur, qui les acceptaient déjà.
- **Admin › Audits : « Rejouer l’analyse » demande une confirmation.** Le rejeu renvoie les photos de l’audit à Claude (un appel facturé qui s’ajoute aux analyses gardées) : le bouton ouvre d’abord, sur la carte, une question qui dit le modèle et le prompt (livré ou brouillon des règles), avec « Confirmer le rejeu » et « Annuler », comme pour le retrait d’un audit. Rien ne part avant la confirmation. « Relancer l’analyse des photos », qui est locale et gratuite, ne demande rien.

- **Le code n’a plus aucune essence d’arbre.** Les 145 essences de `model/especesParDefaut.ts` (et les presets de base) sont retirées : sans fichier sur le serveur (`data/admin/arbres.json`), les arbres se dessinent en tronc et boule. La livraison pose le fichier dans `data/admin/` ; une installation qui a déjà un `data/` copie ce seul fichier. Un arbre dont l’essence n’est plus dans la bibliothèque suit la première (le chêne pédonculé). Le bouton « Reprendre les essences par défaut » disparaît de l’écran admin. Aucune quantité ni aucun export ne change ; les témoins se capturent sans bibliothèque.

- **La fusion de plusieurs vues d’une façade recale par ORB + RANSAC.** L’ancien recalage en deux dimensions (corrélation sur une grille de décalages) est remplacé par une similitude trouvée sur des points ORB (`facade/orb.ts`, `facade/ransac.ts`, `facade/recalageOrb.ts`), acceptée seulement si elle tient des critères nommés et une corrélation de contrôle. Le banc de façades retrouve les chiffres d’avant (rappel 80 % → 100 %, précision 80 % → 96 %, 0,3 correction par façade). L’effacement des obstacles par la parallaxe et la composition par qualité sont gardés : sans eux le rappel tombait de 1,0 à 0,83. L’assemblage en morceaux côte à côte (`mosaique.ts`) est inchangé.

- **Prompt d'analyse version 5 : les termes du schéma que le texte ne définissait pas le sont.** Les contrôles
  d'Admin › Règles signalaient trois alertes : les matériaux de couverture (`tuile-plate`, `tuile-canal`,
  `tuile-mecanique`, `ardoise`, `zinc`, `bac-acier`, `membrane`, `gravillons`, `vegetale`), le sens du faîtage
  (`parallele-rue`, `perpendiculaire-rue`, `sans-faitage`) et `chassis-eclairage` n'étaient définis nulle part, et
  Claude les devinait de son vocabulaire. Le schéma ne change pas (version 1). **Le texte envoyé à Claude change** :
  ses réponses sur la couverture, le faîtage et les châssis peuvent changer, donc les propositions d'un rejeu aussi
  (le rejeu avec le brouillon d'Admin › Règles est fait pour le mesurer) ; aucun calcul de Plan ne bouge.
- **Les sujets de l'audit portent le même identifiant côté description et côté module.** La description disait
  `attributs`, le module `id` : le module reprend l'id de sa description (`materiau` devient `facades`, attribut
  `materiauMurs`), son nom à l'écran est celui de la description, et l'attribut dont l'accord se mesure est
  `Sujet.attribut`. Les observations sont dites par le registre (`Sujet.observer`, comme `proposer`) : lucarnes,
  éléments du toit et écarts y entrent, et `observationsClaude.ts` ne code plus la forme, les bouts, les lucarnes ni
  les éléments. Les lignes montrées et leurs identifiants sont inchangés.

- **Le moteur de règles est rangé en un seul endroit, nommé `regles/`** (`MD/architecture.md` §5.2.4,
  `CLAUDE.md`) : un dossier par couche, `src/regles/` (réglages, profils, faits, décisions, conformité),
  `src/facade/regles/` (appliquer un fait ou un profil, garde-fous, rejeu) et `src/app/regles/sujets/`
  (ce que l'audit sait proposer, un module par sujet, un registre `SUJETS`). Les modules ont été déplacés
  et leurs imports réécrits, sans changer une ligne de calcul : AE 101 et les empreintes golden sont
  identiques. Ajouter un sujet (chien-assis, objet du jardin) = un module, une ligne du registre, son
  effet et son attribut ; la liste est dans l'architecture.

- **Rendu de la façade pour Claude : la façade seule.** Trois plans de coupe retirent ce qui avance
  devant le mur (une dépendance du même bâtiment, un corps bas) et ce qui dépasse de ses bouts.
- **Audit, vue de la façade choisie : à hauteur d'homme.** La caméra descend à 1,7 m au lieu de la
  mi-hauteur du bâtiment, le regard reste horizontal et la distance garde le haut du mur dans l'image.

- **Les anciens dessins d'arbres sont supprimés** (lobes, dôme, touffes, taillé, maquette d'architecte,
  feuilles instanciées, port, essence caduc/persistant, texture du feuillage), sans correspondance : un
  ancien plan dessine ses arbres avec la première essence de la bibliothèque. La hauteur d'un arbre est
  maintenant celle de l'arbre entier. L'export GLB emporte les arbres en instances
  (`EXT_mesh_gpu_instancing`) ; `glb-structure.json` et `cadastre-objets.json` recapturés
  (`tests/fixtures/golden/EMPREINTES.md`).

- **three.js passe de la r128 à la 0.186.1** (la dernière). Les builds UMD et `examples/js` n'existent plus : la
  bibliothèque arrive en modules ES depuis jsDelivr (`src/three/bibliotheque.ts`), par une table d'import
  inline dans `index.html` ; elle reste non empaquetée et ne se charge qu'à l'ouverture de la Vue 3D. La
  politique de contenu ne nomme plus que `cdn.jsdelivr.net` (cdnjs est retiré, ainsi que des origines de la
  capacité `plan.3d`) ; la table d'import entre dans `script-src` par son empreinte.
  - **Le rendu est inchangé**, vérifié au banc visuel d'AE 101 (écart au bruit de compression, en Normale
    comme en Soignée) : gestion des couleurs coupée, sortie linéaire, lumières × π (les lumières sont
    physiques depuis la r165), courbe de film conservée ; en Soignée, l'occlusion passe par une passe de rendu,
    la SSAO puis une passe de sortie qui laisse le ciel sans courbe, comme avant.
  - **Le .glb téléchargé change d'octets, pas de contenu utile** (`tests/fixtures/golden/EMPREINTES.md`) : les
    mailles à plusieurs matériaux sont désormais indexées par groupe (la r128 faisait dessiner à chaque
    matériau toute la maille), l'extension `EXT_materials_bump` apparaît, et les images JPEG restent des JPEG.
    Nœuds, mailles, matériaux, textures et images inchangés ; `glb-structure.json` recapturé. Les six empreintes
    des exports de chiffrage ne bougent pas.
  - Outillage : `servirThreeLocal` sert les modules depuis `node_modules/three` quelle que soit la version ;
    `BANC_QUALITE_VUES=soignee` rend les images du banc à ce niveau.

### Corrigé

- **Fumée : les points 53 et 86 passent de nouveau.** Le point 53 (Admin › Contrôleurs) n’admettait qu’une écriture sans annulation, d’avant l’import direct du cadastre : les deux créations de projet depuis le cadastre (qui remplacent le projet, rien à défaire) sont maintenant admises par leur nom, et toute autre est nommée dans le message. Le point 86 (Admin › Audits) ne confirmait pas le rejeu d’une analyse, qui se confirme depuis qu’il est un appel facturé : il clique « Confirmer le rejeu » et vérifie que rien ne part sans confirmation.

- **Audit : une proposition de toit ne passe plus outre le fait enregistré pour le bâtiment.** Les propositions de forme, de corps et de pignon traversant de l’audit ne consultaient jamais `regles/toits/faits.json` : elles pouvaient récrire le toit d’un bâtiment dont le fait le fixe. Elles passent maintenant toutes par une même porte du moteur (`facade/regles/toits/faits.ts::corpsProposesSousFait`) : un fait en remplacement fixe le toit, rien ne se propose ; un fait en contrainte fait tomber la proposition qui ne le tient pas. Sans fait, rien ne change.

- **Dossier de mairie d’une piscine : les montants de 1 000 € et plus s’impriment.** Ses chiffres passaient par `toLocaleString('fr-FR')`, qui sépare les milliers par une espace fine insécable (U+202F) que la police du PDF n’a pas, et dont le résultat variait selon la machine. Ils s’écrivent maintenant sans les données de langue du navigateur (`util/format.ts::chiffreFrGroupe`, une espace simple), et le dossier translittère ces espaces au besoin.
- **Un fichier projet avec une piscine, une pergola, une clôture ou des corps de toit ne s’écrit plus en schéma 1.** Le schéma écrit ne regardait que le relevé, les croupes et le relief : un client plus ancien ouvrait ces fichiers sans prévenir et effaçait leurs champs au premier enregistrement. Il se tire maintenant d’une table champ → schéma (`model/migrations.ts::CHAMPS_DEPUIS`) : ces champs comptent au schéma 4, que la plateforme accepte déjà. Un schéma 5 qui les distinguerait demande d’abord que la plateforme l’accepte (`contrat/SOURCE-PRODUIT.md`).
- **Les exports reçoivent l’heure en paramètre, et le calcul ne lit plus l’horloge.** Le plan PDF, le dossier, le dossier piscine et la note de calcul prennent leur version, leur build et leur heure de ce qu’on leur passe (le dictionnaire `/Info` lisait ceux du programme) ; les dates s’écrivent sans les données de langue (`dateFr`). Le placement des parasols échantillonne le soleil d’une année de référence au lieu de l’année courante. Les cotes importées d’un SVG prennent leur identifiant à la source commune (`idMesure`). Le coût d’un débit somme ses longueurs dans un ordre fixe. Un test interdit désormais l’horloge (hors valeur par défaut), le hasard, `toLocale*` et le réseau dans `engine/` et `export/`. Aucune empreinte ne bouge.

- **Audit : l’écran des repères d’une photo de façade affiche la largeur que donne le plan.** L’indication « le plan donne … m » à côté de la largeur réelle du mur ne s’affichait jamais : la largeur de la façade n’était pas transmise.
- **Calibration : l’en-tête « Ouvrir » de la liste des cas est de nouveau masqué à l’écran** (il reste lu par les lecteurs d’écran).
- **Façades : la silhouette du haut du mur ne se lit plus jamais sur la photo.** Sans gabarit, la chaîne lisait encore une silhouette sur la photo redressée, contre la décision « un gabarit tiré du plan et du LiDAR, jamais lu sur la photo » ; sans gabarit, la bande au-dessus de l’égout lit le toit. La silhouette ajustée à la main n’est plus écrite dans les corrections d’un audit (le gabarit s’y repose), ni la silhouette en pixels dans le bilan ; les anciens fichiers se relisent tels quels. Code mort retiré (`silhouetteSurLaPhoto`, `silhouetteSurLaVue`, `lireSilhouette`, `hauteurEn`, quatre classes CSS), libellés et numéros d’étapes de la calibration remis à jour, et trois contrôles de la calibration (vignette d’une photo, réglages à chercher, « Écarter ») portent leur clé `data-controle`.
- **Audit : l’avis de la photo sur le toit d’une façade vient de nouveau de la photo seule.** Depuis que le gabarit (plan + LiDAR) dessine le toit d’une façade, c’est lui qui donnait aussi la silhouette que l’audit comptait comme « photo » : le LiDAR votait deux fois, une fois sous le nom de la photo. L’avis de la photo est maintenant la seule lecture de la bande au-dessus de l’égout (`toitLu`, `facade/analyse.ts`), qui ne voit pas le gabarit ; le toit proposé suit toujours le gabarit. Les audits rejoués peuvent changer de verdict sur la silhouette d’une façade ; aucune quantité ni aucun export ne change.
- **Calibration : un mur dont un corps descend sous l’égout garde son gabarit dans le cas créé depuis un audit.** Le relief d’un gabarit ne comptait que ce qui monte au-dessus de l’égout (`relief`, `facade/gabaritMur.ts`) : un appentis ou un corps plus bas passait pour un rectangle et le cas perdait sa silhouette.
- **La chaîne des façades passe en version 7.** Le passage de l’audit et du relevé par l’assemblage n’avait pas monté la version : les images d’origine gardées dans un audit ne disaient pas de quelle chaîne elles venaient.

- **Mode Toit : la vue de façade reprend la spec (écran B de la maquette v8).** Le mode passait le bâtiment retouché à la scène **comme s'il était la terrasse** : la maison disparaissait, remplacée par un platelage, et la caméra « de façade », en perspective, se posait au milieu du jardin, derrière la clôture et les arbres, les poignées du pignon flottant dans le vide. Désormais la scène reste construite autour de la vraie terrasse et seul le bâtiment retouché se redessine ; devant une façade, la Vue 3D ne montre que ce bâtiment (ni terrasse, ni clôture, ni arbres, ni voisins), vu par une **caméra oblique alignée sur le mur** : le mur de face, à l'échelle, sans fuite, le toit et le côté visibles en biais ; une façade de biais se présente de face comme les autres, et la vue ne tourne pas tant qu'on y travaille. Un pignon se pose sur **la façade regardée** (refusé sur un bout de faîtage ou un toit plat : « Pas de pignon sur cette façade »), un bow-window, un appentis ou une galerie sur son mur ; la pose ouvre la vue de cette façade. Les poignées suivent le relief du sol et ne se montrent que devant la façade de l'élément. « Isoler » masque le reste de la scène sans passer par l'isolement d'une terrasse.
- **Une propriété de plusieurs parcelles reste un seul terrain, avec une seule clôture.** À l’import, les parcelles cochées « propriété » sont bien fusionnées en un seul terrain ; mais toute relecture du voisinage qui suivait (Actualiser depuis l’IGN avec le voisinage, le chargement autour de vous dans l’audit) ne reconnaissait que la parcelle principale, et reposait les autres parcelles de la propriété en voisines par-dessus le terrain. Elles sont maintenant reconnues comme déjà dans le plan (`model/cadastre.ts`), et une actualisation retire celles qu’une relecture d’avant avait posées. La fusion elle-même accepte aussi deux parcelles dont l’une a un sommet à quelques centimètres du coin commun (Gordes, BK 154 + BK 158, refusées jusqu’ici). Sur trois communes (Le Vésinet, Versailles, Gordes), toutes les paires et tous les triplets mitoyens fusionnent, sauf ceux qui ne se touchent que par un coin ou qui entourent une autre parcelle. Aucune quantité ni aucun export ne change.

- **Appentis ouvert (galerie, porche) : plus de mur ni de fenêtres, et le toit s’arrête au nu des murs de la maison.** Un appentis réglé « ouvert » gardait un prisme plein du sol à son égout, devant le mur de la maison, et les fenêtres de ce mur : ses poteaux étaient dessinés, mais la galerie restait une boîte fermée. Il n’a plus ni prisme ni fenêtres : sous lui, on voit le mur et les fenêtres du corps qui le porte. Un appentis adossé à un autre corps n’a plus de rive aux bouts ni de débord au-delà de son mur haut : sur AE 101 (Le Vésinet), le toit de la galerie sud dépassait le coin de la maison. Une première correction, qui coupait la galerie au mur du contour, l’arrêtait 85 cm avant le coin du mur dessiné : elle est retirée, la référence d’AE 101 est revenue à celle du 14 octobre, et les toits déjà lus seront relus à l’ouverture.

- **Audit de la parcelle : les photos de façade se redressent sur leurs verticales.** Sur l’audit d’AE 101 (18 octobre), une photo sur deux échouait au contrôle des verticales et aucune façade n’avait ses coins trouvés : trois causes. L’attitude du téléphone (inclinaison, roulis) est lue au retour de l’appareil photo, téléphone baissé, pas au déclenchement (−17 à −48° pour des photos prises vers le haut) : elle n’est plus reprise, le calage la lit sur la photo. Les coins prédits n’étaient plus ramenés au bord du cadre pour le calcul (ils ne décrivaient plus le mur). La distance tirée du GPS (2,7 m pour un pignon vu en entier, à 5 m près) n’est gardée que si elle dépasse deux fois la précision annoncée. Enfin, quand les arêtes du mur restent introuvables, les côtés du cadre prédit passent par le point de fuite des verticales lues sur la photo (`facade/verticales.ts`). Sur cet audit : 16 photos redressées sur 17 (8 avant), 3 façades aux coins trouvés sur 12 (aucune avant). La fusion des paires reste refusée : sans arêtes trouvées, les photos d’un même mur ne sont pas à la même échelle, et le relevé reste proposé décoché (« coins prédits »).
- **Admin › Audits : un rejeu ne part plus sans un bâtiment de l’audit.** Le 18 octobre, sur le bac à sable (AE 101), un rejeu est parti avec le seul abri de jardin : le projet ouvert ne reconnaissait pas la maison comme bâtiment de la parcelle (3 requêtes au lieu de 6, 15 images au lieu de 111), et l’analyse, facturée, n’avait aucune ligne pour elle, sans un mot. Le rejeu compare maintenant les bâtiments qui ont des photos dans l’audit à ceux du projet ouvert : s’il en manque un, il refuse de partir et dit lequel (« « Maison » (12 photos) n’est pas reconnu comme bâtiment de la parcelle… »), en demandant de vérifier qu’il est posé sur la parcelle et qu’il n’est pas marqué voisin.

- **Calibrer la détection sur téléphone.** La barre d’état collée en bas recouvrait le formulaire : elle défile maintenant avec la page. Les champs font 16 px au moins (le navigateur du téléphone ne zoome plus la page au focus). Le mur redressé ne bloque plus le défilement du doigt : on tape « Tracer une ouverture » pour dessiner un rectangle, et le tracé coupé laisse le doigt faire défiler. « Calcul… » s’affiche avant que le redressement n’occupe le fil. Parcours rejoué dans Chromium en émulation iPhone 13 (390 px, tactile) : prise d’une photo de 12 Mpx, pose des coins, redressement, annotation, enregistrement.

- **Écran de prise : une façade choisie se voit de face.** À la sélection (touchée ou prise dans la liste),
  la caméra arrive en élévation, comme le rendu pour Claude : perpendiculaire au mur, à mi-hauteur,
  regard horizontal, la façade entière dans la partie visible au-dessus de l'écran de prise. L'inclinaison
  est figée ; la vue pivote sur l'axe vertical du bâtiment choisi (pas autour de lui ou doigt), à la
  distance de l'arrivée.
- **Le rendu du modèle que reçoit Claude est l'élévation de la façade, de face et sans obstacle** (audit
  de la parcelle, relevé du 16 octobre sur AE 101 : le rendu montrait la façade de biais ou de très loin,
  sous la façade surlignée, le point GPS et le trait renforcé, avec une annexe ou le relief devant le mur).
  La caméra se pose sur la normale du mur, en son milieu, à l'horizontale et à mi-hauteur : les verticales
  restent verticales et les ouvertures gardent leur forme. Pendant l'image, les repères de l'audit sont
  cachés et seul le bâtiment visé reste avec le sol (plus d'autre bâtiment de la parcelle). La pose ne
  dépend plus de la position ni du cap de la photo. Les analyses déjà faites gardent leurs anciens
  rendus ; « Rejouer l'analyse » les redessine.

- **Analyse par Claude : ce que le rejeu d'AE 101 a montré** (`MD/spec-audit.md` §13.2). Quatre
  corrections, lues dans le fichier du rejeu (Haiku 5.5, 2 bâtiments, 6 requêtes, 0,011 $) :
  - **Une passe perdue** : la maison de huit murs a dépassé `max_tokens` (8 000) à la deuxième passe, et
    son vote s'est fait sur deux passes (28 % de la facture pour rien). Le plafond passe à 16 000 ;
    on ne paie que ce que le modèle écrit (`deploy/analyse.php`, `buildsg/analyseAdmin.mjs`).
  - **Un rendu du modèle cité sans avoir été reçu** : aucune des 66 images n'était un rendu, et Haiku
    écrivait « le rendu du modèle ne montre pas le colombage ». Le texte de la requête dit maintenant
    « Aucun rendu du modèle n'est joint » quand c'est le cas, et le prompt (version 3) interdit d'en
    citer un. Quand la prise de vue permettait d'en joindre un et que le dessin a échoué, un message
    le dit à la personne avant l'envoi.
  - **Trois murs « est » en une seule réponse** : les étiquettes des façades étaient l'orientation
    seule, et le vote regroupe par étiquette. Un bâtiment qui a plusieurs murs de même orientation les
    nomme avec le numéro de leur côté dans le polygone (« est (côté 3) », comme « Côté 3 » de
    l'inspecteur) ; les autres gardent leur nom simple. Photos, modèle JSON, mesures et renfort s'en
    servent.

- **Admin › « Audits » : l'avant et l'après d'un audit reçu** (`MD/spec-audit.md` 15.4). Le bouton
  « Avant / Après » de la carte d'un audit de parcelle ouvre, sur la Vue 3D du projet (même parcelle),
  l'écran des propositions de l'audit : les mêmes deux vues « Avant » et « Après », les mêmes lignes,
  avec la décision de l'audit sur chacune (validée, refusée, en attente), en lecture seule. C'est la
  base des décisions à venir. Un seul code : la consultation est une session d'audit à part, dont la
  validation est figée sur les propositions du fichier ; l'aperçu est celui de l'audit. Le projet et
  l'audit en cours ne sont pas touchés.
- **« Fermer » sur la prise et sur les propositions de l'audit** (`MD/spec-audit.md` §12.1). La liste
  était le seul endroit pour sortir de l'audit : le bouton est maintenant à droite du titre des deux
  écrans posés sur la Vue 3D.
- **Une façade choisie fixe la vue de prise** (audit de la parcelle, `MD/spec-audit.md` §12.1).
  Toucher une façade dans la Vue 3D, ou la prendre dans la liste, fige la position : la caméra se tient
  à distance fixe du bâtiment, qu'elle montre en entier, face à la façade choisie, et ne suit plus le
  GPS. Seule tourne la rotation sur l'axe vertical du bâtiment, pour voir défiler ses façades : avec
  vos pas autour de lui, ou au doigt quand il n'y a pas de GPS ou qu'il est trop imprécis (au-delà de
  12 m). Ni zoom, ni déplacement, ni inclinaison pendant les photos de cette façade. « Suivre ma
  position » ou « Ce n'est pas cette façade » rendent la vue.
- **Verrouiller un bâtiment pour la prise** (audit de la parcelle, `MD/spec-audit.md` §12.2). Quand la
  parcelle porte une annexe à côté de la maison, l'écran de prise propose un bouton par bâtiment
  (« Verrouiller : Maison, Annexe »). C'est un geste volontaire : verrouillé, seul ce bâtiment est
  reconnu devant vous et touché dans la Vue 3D, qui ne montre que lui. Toucher le bouton verrouillé
  rend la main ; choisir une façade d'un autre bâtiment dans la liste déplace le verrou. Il ne vaut que
  sur l'écran de prise, et tombe à la fermeture de l'audit.
- **L'avant et l'après des propositions d'un audit, en deux vues 3D** (`MD/spec-audit.md` §14 ;
  `three/comparaison3d.ts`). L'écran des propositions s'ouvre désormais sur « Les deux » : la Vue 3D
  montre côte à côte « Avant », le projet tel qu'il est, et « Après », avec les propositions cochées
  (l'une au-dessus de l'autre au téléphone), dans la part de l'écran que la liste laisse libre — la
  carte du bas au doigt, le panneau de droite sur un écran en largeur, et la caméra cadre la maison
  à la forme de l'une des vues. Les deux vues tournent, zooment et se déplacent ensemble :
  c'est la même caméra, rendue deux fois dans un seul contexte WebGL. Cocher ou décocher une ligne,
  ou l'arrivée des propositions de Claude, met « Après » à jour ; la clôture proposée s'y voit aussi.
  « Avant » et « Après » seuls restent proposés. Rien n'est écrit avant « Valider » ; à l'arrêt, la
  vue ne se redessine que quand la caméra bouge. Point de fumée 90.
- **Admin › « Audits » : l'outil du bureau après les audits** (`MD/spec-audit.md` 15.4 et 15.5).
  L'ancien « Audits de parcelle » regroupe, en deux sections, les audits de parcelle et les
  promenades des toits (que l'administrateur dépose par « Ajouter un fichier d'audit… »). Chaque carte
  dit sa conclusion (propositions de Claude et des mesures : validées, refusées, en attente ; cas par
  statut) ; « Détails » montre les photos, le tableau des propositions et leur décision, et pour un
  audit de parcelle ses analyses par Claude et leurs rejeux côte à côte (modèle, versions du prompt
  et du schéma, réussies, vides, ouvertures, pignons, lucarnes, écarts, déterminés, coût, durée ;
  export CSV). Une analyse s'ouvre en entier : ce qui est parti chez Claude (le texte du prompt
  envoyé, chaque requête, ses textes et ses images) et ce qu'il a rendu (la réponse brute, la sortie
  remise en forme, l'erreur, les tokens, le coût) ; export JSON. **« Rejouer l'analyse »** renvoie
  l'analyse d'un audit stocké avec le prompt et le schéma actuels et le modèle choisi, sur le projet
  ouvert de la même parcelle, sans refaire la visite : usage `rejeu`, sous les mêmes plafonds qu'une
  analyse, réservé à l'administrateur. Le serveur garde l'entrant et le sortant de chaque analyse et
  rejeu dans le dossier de l'audit ; le journal de Claude, lui, ne garde toujours ni photo ni réponse.
  Après « Valider », l'audit repart au serveur avec ses décisions.
- **La caméra et la présentation de la Vue 3D** (`MD/roadmap-realisme-3d.md`, R6 ;
  `three/presentation.ts`). À hauteur d'homme, la focale s'ouvre à 55°, celle d'un œil qui regarde
  devant lui ; elle revient en douceur aux 45° de la vue d'ensemble en prenant de la hauteur (la prise
  de vue de l'audit garde la sienne). Un groupe « Présentation » dans les réglages de la vue 3D :
  « Heure dorée » place le soleil cinquante minutes avant son coucher, au jour choisi ; « Promenade »
  enchaîne les points de vue enregistrés d'un mouvement doux, et un geste sur la vue l'arrête ;
  « Capture HD » télécharge la vue à trois fois la définition de l'écran, pour le client. Ni
  annulation, ni « projet modifié » ; aucun export touché.
- **Objets d'échelle dans la Vue 3D** (`MD/roadmap-realisme-3d.md`, R5 ; `three/objetsEchelle.ts`). Une
  case « Objets d'échelle » dans les réglages de la vue 3D (groupe « Scène »), décochée par défaut :
  une voiture garée côté rue (le bord de la parcelle qu'aucune voisine ne borde) et une silhouette de
  1,75 m dans la parcelle. Ils donnent la taille des choses d'un coup d'œil, et ne partent jamais dans
  le .glb. Le banc visuel les montre avec `BANC_ECHELLE=1`.
- **Les matériaux vivants** (`MD/roadmap-realisme-3d.md`, R3 ; `three/materiauxVivants.ts`,
  `three/vieillissement.ts`). Les textures dessinées des murs (brique, pierre, meulière, béton, enduit,
  bois) et des couvertures prennent du relief : une carte de normales tirée de leur dessin, joints en
  creux, tuiles qui se recouvrent, que la lumière rasante fait vivre. Les murs proches vieillissent :
  une coulure sous chaque appui, une salissure au-dessus du soubassement, deux descentes d'eau
  pluviale aux bouts du plus long mur. Hors qualité Économe, à l'écran seulement : le relief est retiré
  le temps d'un export, les voiles et les descentes ne partent pas dans le .glb (empreinte inchangée).
- **Les façades de près** (`MD/roadmap-realisme-3d.md`, R2 ; `three/fenetresRelief.ts`). Sur la
  parcelle du projet et ses abords (45 m), hors qualité Économe, les baies se creusent : encadrement en
  pierre claire saillant (tableaux et linteau), appui qui déborde, menuiserie et vitre au nu du mur ;
  petits bois selon l'époque (BD TOPO : deux vantaux à trois carreaux avant 1950, deux vantaux sans
  carreaux jusqu'en 1975). La porte d'entrée a deux panneaux en relief (et une imposte vitrée si elle
  est haute), la porte de garage ses lames. La maçonnerie suit l'époque : corniche sous l'égout avant
  1975, bandeaux d'étage avant 1950 (interrompus au droit des baies), chaînes d'angle en harpe avant
  1930. **Le .glb garde les baies à plat d'avant** : le relief et la maçonnerie sont propres à l'écran,
  l'empreinte `glb-structure.json` ne bouge pas (point 24).
- **La lumière de la Vue 3D** (`MD/roadmap-realisme-3d.md`, R1 ; `three/rendu.ts`). Une courbe de
  film (ACES) : les blancs ne brûlent plus, les ombres gardent du détail. Un ciel dégradé qui suit
  l'heure du soleil — bleu le jour, doré au couchant, nuit profonde — avec une lueur autour du soleil ;
  une brume légère qui fond le voisinage lointain dans l'horizon. En Normale et Soignée, le ciel éclaire
  aussi la scène (les faces tournées vers lui en prennent le bleu, et les vitres le refléteront) ; en
  Soignée, l'occlusion ambiante assombrit les coins et le pied des murs, de près. La carte d'ombre est
  resserrée sur la parcelle du projet : les ombres sont nettes au pied des murs. **Rien ne change dans
  les exports** : les couleurs des matériaux ne sont pas touchées (la courbe agit au rendu), le ciel
  reste hors du .glb, et l'empreinte `glb-structure.json` est identique (point 24 de la fumée).
- **Réglage « Qualité » de la Vue 3D** (`MD/roadmap-realisme-3d.md`, R0 ; `three/qualite.ts`). Dans
  les réglages de la vue 3D (groupe « Scène ») : Économe, Normale ou Soignée. C'est une préférence de
  l'appareil, rangée dans le navigateur et jamais dans le projet : Économe est proposée d'office sur un
  appareil tactile modeste (quatre cœurs ou 2 Go au plus), Normale ailleurs ; Soignée se demande.
  Normale est la Vue 3D d'avant, à l'identique. Économe coupe le lissage des arêtes et les ombres par
  défaut, et réduit la carte d'ombre ; Soignée suit la pleine définition de l'écran et affine les
  ombres. Choisir un niveau remet la case « Ombres » à ce qu'il propose.
- **Banc visuel de la Vue 3D** (`scripts/banc-visuel.mjs`, R0). Les mêmes vues d'AE 101 et de sa rue
  (aérienne, depuis la rue, depuis le jardin), à 390 et 1 440 px, en clair et en sombre, et le coût de
  la scène par niveau de qualité (construction, temps d'une image, triangles) ; références dans
  `tests/fixtures/visuel/`. Le réseau de l'IGN y est rejoué depuis des données témoin, comme pour la
  fumée.
- **Le modèle de chaque usage, choisi par l'administrateur** (`MD/spec-audit.md` §13.2 et §13.3,
  demande de l'utilisateur). Dans le tableau de bord de la consommation (`?admin&ecran=consommation`),
  l'onglet « Réglages » (l'ancien « Tarifs et plafonds ») commence par une section « Modèles » : une
  liste déroulante par usage (« Analyse des audits », « Renfort des façades », « Aide immédiate »,
  « Escalade », « Cas candidats »), qui ne propose que les modèles admis par le serveur, avec leur nom
  et leur prix d'entrée et de sortie au million de tokens. « Enregistrer les modèles » l'envoie au
  serveur (`GET|PUT admin/claude/modeles`, nouveau, dans `deploy/analyse.php` et
  `buildsg/analyseAdmin.mjs`) ; il le garde dans `claude/modeles.json`, version précédente en `.bak`,
  et refuse un modèle hors de sa liste. Le message rappelle que les analyses déjà lancées gardent leur
  modèle. Une demande qui nomme son modèle le garde, comme avant.
- **« Par modèle » dans le tableau de bord** : les modèles comparés sur la période et les filtres
  choisis. La part des réponses vides d'abord, en barres ; puis requêtes, batchs, appels immédiats,
  images, tokens, coût, coût par façade et échecs ; puis ce que les réponses contiennent
  (ouvertures, manquées signalées, en trop, pignons et croupes, lucarnes, éléments de toit, écarts au
  modèle, coins situés, attributs tranchés), en total ou par réponse lue. « Exporter en CSV » rend
  cette vue. Pour cela, le journal du serveur garde désormais, à chaque réponse qu'il relit, ces comptes
  (champ `trouve`, jamais la réponse elle-même) et l'identifiant du batch ; une ligne d'avant reste
  lisible, ses réponses sont dites « sans comptes » et laissées hors du calcul.

- **L'audit de parcelle sauvegardé sur le serveur pendant la capture, et catalogué par
  l'administrateur** (`MD/spec-audit.md` §15). Le brouillon de l'appareil se perdait avec le
  téléphone ; désormais, quand une session admin ou le jeton de la plateforme le permettent :
  - l'audit part sur le serveur de Plan **cinq secondes après la dernière photo rangée** (un envoi
    par rafale), à « Lancer l'analyse », et à la demande, par la commande « Envoyer l'audit au
    serveur » de la liste de contrôle, qui dit où il en est (« Envoyé à 17:42 », « En attente de
    réseau, nouvel essai à 17:45 », l'erreur en clair, ou la taille quand il dépasse les 48 Mo du
    serveur) ; hors ligne, il réessaie de plus en plus espacé, et dès que le réseau revient, sans
    jamais bloquer la capture ;
  - chaque envoi **remplace le même dépôt** (`PUT admin/audits/<id>`, nouveau, par son secret de
    retrait ou la session admin), gardé avec la capture comme celui du corpus ;
  - le dépôt est **marqué `sauvegarde`** (en-tête `X-Plan-Depot`) ; le partage « pour améliorer
    Plan » reste un dépôt `corpus` à part, cochable et retirable (décision D7). Le format du fichier
    ne change pas. Un utilisateur qui décoche le partage retire aussi sa sauvegarde, et sans son
    accord rien ne part de soi-même ; l'administrateur garde toujours la sienne. L'écran Conformité
    ignore les sauvegardes ;
  - **Admin › « Audits de parcelle »** (à côté de « Conformité », admin des démos) liste les audits
    reçus : date, parcelle, adresse, photos, phase (capture ou analyse), sauvegarde ou partage ; pour
    chacun, « Ouvrir dans ce projet » (même IDU ; reprend l'audit par le chemin de l'import, à la
    phase où il en était, en capture s'il n'était pas fini, avec la question de remplacement),
    « Télécharger » le fichier tel qu'il est arrivé, et « Retirer », confirmé sur la carte ;
  - l'import d'un fichier dont la capture n'était pas terminée le reprend sur la liste de contrôle ;
  - côté serveur (`deploy/analyse.php` et `buildsg/analyseAdmin.mjs`, même contrat) : la fiche d'un
    audit dit sa marque, ses photos, sa phase et le début de la visite ; si PHP a jeté le corps d'un
    audit, la réponse nomme `post_max_size` au lieu de « JSON illisible ». Sur un hébergement PHP,
    porter `memory_limit` à 256M (un audit de 40 Mo en demande environ 120) et `post_max_size` à 64M.

- **Les pignons d'une façade, dits par un fait de toit** (`MD/spec-regles-toits.md` §5.2) :
  `pignons: [{ facade: { azimutDeg }, position: "bouts", haut: "faitage" }]` tient un pignon
  traversant à chaque bout du pan de cette façade, jusqu'au point haut du faîtage, à la largeur
  donnée (`largeurM`) ou, sans elle, à celle que lit la mesure. Premier cas : **AE 101**, « deux
  pignons à gauche et à droite de la façade sud, de 3,7 m environ, qui montent au faîtage » (le
  propriétaire, 14 octobre 2026). La lecture LiDAR que sert l'IGN pour cette maison a changé
  l'après-midi même, et le calcul seul n'y trouvait plus que le pignon ouest : le toit sud était
  cassé. La référence d'AE 101 sous ses faits change (pignons de 3,7 m au faîtage, pan relu sans
  eux) ; le calcul seul ne change pas, ni aucun autre bâtiment. Les toits déjà lus seront relus à
  l'ouverture.

- **Un appentis adossé le long d'une façade, dit par un fait de toit** (`MD/spec-regles-toits.md`
  §5.1). Un porche, une galerie couverte, un auvent que le contour BD TOPO ne contient pas se
  décrivent dans `regles/toits/faits.json` : `appentis: [{ facade: { azimutDeg }, longueur: "toute" }]`,
  la façade nommée par sa normale (180 : la façade sud). Plan ajoute un pan d'appentis contre ce côté
  du bâtiment, sur toute sa longueur, et en lit la profondeur, la hauteur contre le mur et l'égout sur
  le LiDAR quand le fait ne les donne pas ; sans mesure ni cotes, il n'invente rien. Premier fait :
  **AE 101 (2 allée des Limites, Le Vésinet)**, la galerie de la façade sud que le propriétaire a vue
  le 14 octobre 2026 (1,25 m, 3,2 m contre le mur, égout 2,4 m). La référence d'AE 101 change une
  fois, par sa décision ; le calcul des toits lui-même ne change pas, ni aucun autre bâtiment. Les
  toits déjà lus seront relus à l'ouverture.

- **Roadmap du réalisme 3D, étape R5 bis : orthophoto haute résolution.**
  - Le point de départ : la BD ORTHO, prise à environ 20 cm par pixel et agrandie au zoom 20.
  - Les sources plus fines : orthophoto haute résolution de l'IGN, PCRS image des collectivités.
  - Ce qui serait fait, et huit questions de pertinence à trancher avant de décider (O1 à O8) :
    couverture, gain visible, date, calage, coût, apport aux lectures automatiques, licence,
    exports.
  - Une nouvelle décision, V7.

- **Roadmap du réalisme de la Vue 3D** (`MD/roadmap-realisme-3d.md`), en sept étapes de R0 à R6 :
  - R0 : banc visuel et réglage Qualité ;
  - R1 : lumière (tone mapping, ciel, ombres, occlusion, brume) ;
  - R2 : fenêtres en creux et maçonnerie ;
  - R3 : matériaux vivants ;
  - R4 : photos de l'audit en texture sur la parcelle ;
  - R5 : abords ;
  - R6 : caméra et présentation.

  Les règles du chantier : rien ne change dans les exports, poids et fluidité sous contrôle. Les
  décisions V1 à V6 sont prises avec leur défaut.

- **Les cas candidats Panoramax** (lot G3 bis de la vague 3, `MD/plan-vague-3-generaliser.md`,
  `MD/spec-regles-toits.md` §13.3 phase 4 et §14.5, usage 3 de Claude analyste). Un script du skill
  `regles-toits` (`scripts/candidats.ts`) parcourt les photos de rue Panoramax d'un village relevé
  par `village.mjs` : pour chaque bâtiment, les photos qui voient son toit (même choix que la couleur
  des murs, avec du recul et le faîte dans le cadre), trois passes de Claude par les routes de
  l'analyse et leur vote, puis les bâtiments qui ont probablement une forme que Plan ne sait pas
  encore faire (Mansart, gambrel, demi-croupes, lucarnes…). Ils entrent au corpus
  (`tests/fixtures/toits/candidats/<village>.json`) au statut « proposé », avec la forme visée dans
  le vocabulaire du modèle de toit, le vote et les photos qui en sont la preuve, à trier sur images ;
  un candidat trié n'est plus jamais réécrit. Rien ne s'applique au calcul : AE 101, le banc des
  villages et les empreintes n'ont pas bougé. `--essai` liste sans appeler Claude ce qui serait
  envoyé. `village.mjs` écrit désormais l'origine du repère du plan dans le fichier du village.
- **Un usage « Cas candidats » pour l'analyse par Claude** (`deploy/analyse.php`,
  `buildsg/analyseAdmin.mjs`) : mêmes plafonds, même prompt et même schéma que l'analyse d'une
  maison, mais une ligne de journal à part ; l'écran « Consommation » en montre le coût dans la
  répartition par usage.

- **Le modèle de toit étendu** (lot G1 de la vague 3, `MD/plan-vague-3-generaliser.md`,
  `MD/spec-regles-toits.md` §4). Un corps de toit peut porter, tous facultatifs, son **profil** en
  travers (droit, brisé, à coyau, courbe), ce qui ferme ses **bouts** (pignon, croupe, demi-croupe,
  brisis, redents), ses **lucarnes** et ses **bords** observés (débord, saillie de rive, coyau, queue
  de vache). Ils se relisent vérifiés (un champ mal formé est retiré, le corps reste) et ne
  s'écrivent que s'ils disent autre chose que leur absence (`model/corpsToitEtendu.ts`). La forme
  d'ensemble d'un toit gagne les formes du catalogue (demi-croupes, pavillon, Mansart, gambrel,
  asymétrique, deux pans décalés, en M, papillon, coyau, shed, berceau, carène, conique, polygonal,
  flèche, dôme, impériale), **déduite des corps** par `model/formeToit.ts` et écrite dans le même
  vocabulaire que « Ce que je vois ». Aucun calcul ne les produit encore et la 3D dessine à leur
  place la forme simple la plus proche ; les menus de l'inspecteur et du relevé ne proposent que les
  formes simples. Un fichier ancien se relit et se réécrit à l'identique ; AE 101, le banc des
  villages et les empreintes n'ont pas bougé.

- **Le moteur des profils de toits** (lot G15 de `MD/plan-vague-3-generaliser.md`,
  `MD/spec-regles-toits.md` §6 et §9.1). Un profil de `regles/toits/reglages.json` change quelques
  seuils de la lecture des toits pour les bâtiments qui remplissent toutes ses conditions.
  - **Un vocabulaire fermé** (`model/profilsToits.ts`) : département (tiré du code INSEE ou de l'IDU
    de la parcelle du projet), latitude, matériau des murs ou de la toiture (fichiers fonciers),
    hauteur, surface, mitoyenneté (part du contour collée à un autre bâtiment : aucune, partielle,
    forte), forme du contour (rectangle, composée, trapèze, biais), époque. Jamais une adresse ni un
    bâtiment : une condition hors du vocabulaire, un seuil inconnu, un profil sans condition ou qui
    ne cite pas deux cas font refuser le fichier.
  - **Le plus précis l'emporte**, seuil par seuil (le plus de conditions) ; deux profils de même
    précision sur le même seuil, qui peuvent toucher le même bâtiment, font refuser le fichier, et
    la CI le dit (`tests/unit/model/reglagesToits.test.ts`).
  - **Appliqué partout où un toit se lit** (`facade/profilsToits.ts`) : à l'import et en tâche de
    fond (`app/toitsLidar.ts`, recalage compris), à la réponse « un toit par parcelle », au rejeu
    des cas d'audit et au banc des villages (`banc.ts --profils <fichier>` essaie des profils avant
    de les écrire). Les modules de la lecture lisent leurs seuils à chaque appel
    (`SEUILS_TOITS`), plus une copie prise au chargement : un test le vérifie.
  - **Le fichier livré ne contient aucun profil** : AE 101, le banc des cinq villages (corps au bit
    près) et les empreintes golden sont identiques, l'empreinte des réglages et la version de
    lecture des toits (1) aussi ; rien n'est relu. L'empreinte des profils (conditions, surcharges,
    bornes du vocabulaire) entre dans `VERSION_LECTURE_TOITS` dès le premier profil.

- **Profils de façades** (lot G12 de la vague 3, `MD/spec-facades-calage-detection.md` §15.2,
  décisions D18 et D19). Les dimensions et les seuils de la disposition automatique des ouvertures
  (fenêtre de 1,00 × 1,20 m à 0,90 m d'appui, porte de 0,90 × 2,10 m, entraxe de 2,40 m, au plus
  8 fenêtres par niveau, niveaux de 2,7 m, rien sous 2,2 m de niveau ni sur un mur de moins de 2 m,
  fenêtre de pignon à partir de 1,8 m) sortent du code dans `regles/facades/reglages.json`, compilé
  dans le fichier livré comme les réglages des toits. Ils forment le **profil par défaut**, seul
  profil livré : rien ne change dans la 3D, l'export GLB ni les empreintes. Un profil se déclenche
  sur un vocabulaire fermé (département tiré de l'IDU, époque `date_d_apparition`, usage
  `usage_1`, nombre d'étages, mitoyenneté) ; le plus précis l'emporte, deux profils de même
  précision qui peuvent tomber sur le même bâtiment font refuser le fichier
  (`model/reglagesFacades.ts`, `facade/profilsFacades.ts`). Le profil retenu se range sur le
  bâtiment avec la version de lecture (`VERSION_LECTURE_FACADES`, où entre l'empreinte du fichier) :
  un profil ajouté ou changé fait rechoisir les profils en tâche de fond
  (`app/profilsFacadesFond.ts`), jamais sur la parcelle du projet ni sur un bâtiment vérifié sur
  place. Les dimensions réglées par l'utilisateur (inspecteur, apparence du voisinage) l'emportent
  sur le profil.
- **Mesurer une façade relevée** (lot G11 de la vague 3, `MD/spec-facades-calage-detection.md`
  §15.1). `model/mesureFacade.ts` lit un relevé (ouvertures, grille, largeur, hauteur) et en tire la
  largeur, la hauteur et l'appui des fenêtres (médianes, l'appui depuis le plancher de leur niveau),
  l'entraxe, la part vitrée, les baies par niveau, la hauteur d'un niveau, la place de la porte, le
  garage, et le type de la façade (sur rue, arrière, pignon, côté voisin) quand le contexte le dit
  (`facade/contexteFacade.ts` : toit du cas figé, voisins, photo de rue). Le script
  `.claude/skills/facades/scripts/mesures.ts` les donne sur le banc de façades (vérité → relevé :
  1 cm d'écart médian sur les fenêtres) et sur les audits de parcelle ; le rejeu des audits du skill
  `toits` mesure aussi les façades d'un fichier `plan-audit-parcelle`. Rien de ce que Plan calcule ne
  change : ces mesures préparent les profils de façades (G12) et le taux de conformité (G13).

- **Le banc des formes de toit** (lot G2 de `MD/plan-vague-3-generaliser.md`, `MD/spec-regles-toits.md`
  §8.2, décision D16). Outil de développement : rien ne change dans ce que Plan calcule.
  - `banc.ts` (skill `toits`) compte, par village, les formes produites (catalogue §3.1 : plat,
    appentis, deux pans, croupes, pavillon…), par bâtiment (la forme de son corps principal) et par
    corps. La forme se déduit des corps par `model/formeToit.ts` dès que le lot G1 est là, sinon par
    sa copie locale (`tests/banc/toits/formes.ts`), vérifiée identique sur les 646 corps des cinq
    villages et par un test qui s'active avec G1.
  - `--enregistrer` écrit une référence (formes de chaque bâtiment, compteurs) ; `--reference` liste
    ensuite les compteurs qui ont bougé, les bâtiments dont la forme change (« appentis ->
    deux-pans »), ceux dont seul un corps change, et dessine la planche de leurs cartes
    (`rendu.py --montage`, la forme écrite dans la légende). Les lignes d'avant restent les mêmes,
    pour comparer les listes d'hier par `diff`.
  - Les villages de D16 : `villages.json` (Versailles quartier Notre-Dame, Eguisheim, Beuvron-en-Auge ;
    Riquewihr et Lyons-la-Forêt en réserve) et `couverture.ts`, qui géocode chaque adresse, vérifie
    la couverture LiDAR HD par `dallesLidarSur` et écrit la commande `village.mjs` qui le capture.
    Les cinq sont couverts ; les trois retenus ont été capturés et mesurés (98, 327 et 119
    bâtiments). Le tableau du skill `toits` (§5) gagne Le Vésinet, ces trois villages et les
    colonnes des formes.

- **Les indicateurs de conformité et l'écran Admin › « Conformité »** (lot G3 du plan de la vague 3,
  `MD/spec-regles-toits.md` §13.5, `MD/spec-facades-calage-detection.md` §15.3).
  - **Le jugement d'un cas** (`model/conformite.ts`, `facade/conformite.ts`) : un cas observé est
    conforme quand le calcul d'aujourd'hui satisfait ce que vous avez vu — son attendu validé (corps
    au centimètre, couleur et source des murs, comme le test du corpus) et « Ce que je vois » (forme,
    bouts, lucarnes, cheminées, toit-terrasse ; le sens du faîtage, dit par rapport à la rue, et les
    matériaux sont notés mais ne se comparent pas au calcul). Une forme que Plan ne calcule pas
    encore (Mansart, gambrel, demi-croupe…), des lucarnes ou des cheminées vues comptent « hors
    calcul ». Un cas qui ne note que des problèmes est non conforme tant que le rejeu redonne ce que
    le terrain a donné, « à revoir » si le calcul a changé depuis. Les taux se lisent par forme, par
    région (le département tiré de l'IDU, `model/departements.ts`) et par problème.
  - **Le corpus du dépôt** est rejoué par `npx tsx .claude/skills/toits/scripts/conformite.ts`
    (`--ecrire` réécrit `regles/conformite.json`, qu'un test garde à jour : une PR qui change le taux
    le montre dans son diff). **Taux de départ sur les deux promenades de démonstration : 50 %** (AE
    101 conforme ; le pavillon de la longère d'Hucqueliers, toujours découpé en morceaux, non).
  - **L'écran** (`?admin&ecran=conformite`, menu Admin › Conformité, à côté de la consommation de
    Claude) : le corpus et les audits de parcelle partagés reçus sur le serveur, rejoués dans la page
    un à un ; le taux, le critère de la phase 1 (50 cas observés, dont 10 hors calcul) ; six
    onglets : par forme, par région, par problème, les cas un à un avec ce qui ne tient pas, l'accord
    de Claude par attribut et l'historique. Le taux de conformité des façades (lot G13) et l'accord
    de Claude (lot G18) ont leur place, marquée « À venir ». Un audit illisible est nommé sans
    arrêter les autres.
  - **Les mesures sur le serveur de Plan** : « Enregistrer la mesure » range ce que l'écran montre
    (`POST admin/conformite`, `deploy/analyse.php` et `buildsg/analyseAdmin.mjs`, même contrat,
    administrateur seul), dans `conformite/mesures.json` avec les données de l'admin ; le serveur
    garde les 200 dernières. Aucune valeur calculée ne change : AE 101, le banc et les empreintes
    golden sont identiques.

- **Les détails des ouvertures, en 3D et au banc des façades** (lot G17 du plan de la vague 3,
  `MD/plan-vague-3-generaliser.md` ; `MD/spec-facades-calage-detection.md` §11 ; suite du lot L15).
  - **En 3D** (`three/detailsOuvertures.ts`) : ce que le relevé a reconnu sur une ouverture se
    dessine sur son mur. Volets battants : deux vantaux d'une demi-baie, ouverts contre le mur de
    part et d'autre du cadre, ou fermés devant la vitre ; persiennes : les mêmes, à lames
    inclinées ; volet roulant : le coffre au-dessus du linteau, et le tablier baissé s'il est
    fermé ; balcon : une dalle au niveau de l'appui qui déborde des tableaux, et son garde-corps
    sur trois côtés ; garde-corps seul : devant la baie, à hauteur d'appui ; baie cintrée (plein
    cintre, ou arc surbaissé sur une baie basse) et œil-de-bœuf : le cadre et la vitre suivent
    leur contour, sur le mur photographié comme sur la disposition réglée une par une. Les cotes
    des détails sont les proportions courantes, pas des mesures. **Une ouverture sans détails se
    dessine exactement comme avant** : la démonstration garde son GLB au nœud près (point 24).
  - **Au banc** (skill `facades`) : une section « Détails des ouvertures » compte, pour les
    volets, l'allège et la forme, les détails lus justes, manqués et lus à tort, sur l'élévation,
    la chaîne du relevé et la fusion. La vérité vient de la scène (`detailsVrais` : son rendu, ses
    balcons, la forme de ses baies) ; le générateur peint maintenant les baies cintrées et rondes,
    les persiennes ouvertes et fermées, et le garde-corps sans dalle. Une scène de plus,
    `20-details-cintres-persiennes-garde-corps`. Chaîne du relevé, sur les 21 scènes : volets
    11/16 (aucun volet roulant ton sur ton lu, scène 06), allège 1/3, forme 2/2.
  - **La baie devinée en pointillé se joue au navigateur** (point de fumée 68) : les deux photos de
    synthèse de la scène 19 du banc (une haie haute qui cache une fenêtre sur les deux vues),
    rendues en PNG par `.claude/skills/facades/scripts/photos.ts`, importées dans le relevé. Points
    80 et 81 : les détails de la scène 20 dans la fiche des ouvertures, puis en 3D.

- **Le masque d'occlusion hachuré dans l'élévation du relevé** (lot G20 de
  `MD/plan-vague-3-generaliser.md`, partie sans corpus ; `MD/spec-facades-calage-detection.md` §8 et
  §12 bis). Quand plusieurs vues d'un même mur sont fondues (« Vues du mur entier »), ce qui reste
  caché sur toutes les photos (une voiture, une haie) se hachure à l'étape « Vérifier », sous les
  ouvertures, qui restent à saisir, avec une légende courte (« Hachuré : caché sur toutes les photos
  par ce qui est devant le mur (voiture, haie…), 17 % du mur. »). Les couleurs passent par les jetons
  du relevé (`--camera-bg`, `--camera-alerte`), le motif porte l'information avec les mots
  (`zones/releve/masque.ts`, `Elevation.tsx`).
  - **« Demander de l'aide » est proposé aussi sur plusieurs vues** : jusqu'ici, il ne l'était que
    sur une photo seule. Claude reçoit la vue de référence de la fusion (la mieux définie) et
    l'élévation fondue, le masque hachuré dessus (le prompt du renfort dit déjà de ne rien inventer
    dans une zone hachurée). L'aide est proposée dès qu'un signal est levé, et dès que le masque
    couvre un dixième du mur (`MASQUE_NOTABLE`, `zones/releve/aide.ts`) : la note le dit telle
    quelle (« 17 % du mur caché sur toutes les photos »). Rien ne change pour l'audit, ni pour des
    morceaux côte à côte. `RENFORT_A_CHAQUE_FACADE` et les taux d'accord, qui attendent le corpus,
    ne bougent pas.
  - L'avis « La photo couvrait … % du mur ; le reste est complété à la teinte du mur » ne compte plus
    le masque d'une fusion, que la texture montre tel quel (« Les photos couvraient … »).
  - L'élévation de la vérification ne se tasse plus au téléphone : dans la colonne du relevé, qui
    défile, elle était écrasée à quelques dizaines de pixels sous les cartes de la hauteur et du toit.
  - Aucune valeur calculée ne change : banc des façades identique. Point de fumée 82.

- **Le fichier de l'audit de parcelle, son import et son partage pour le corpus** (lot L21 du plan
  de mise en œuvre, `MD/spec-audit.md` §15, décision D7).
  - **Le fichier** `plan-audit-parcelle` version 1 (`model/fichierAuditParcelle.ts`) : la parcelle
    (IDU, adresse, origine), les versions du code et des règles, pour chaque bâtiment un cas figé
    (contour, BD TOPO, voisins, grille LiDAR relue à l'écriture, sorties du jour), « Ce que je
    vois », et pour chaque façade ses photos avec leur prise de vue, ses mesures (relevé avec son
    calage, couleur, hauteur) ; la clôture et le portail ; chaque proposition avec ses indices et sa
    décision, validée ou refusée. Il recopie sans recalculer : relu, il redonne le même audit.
    L'administrateur le partage ou le télécharge depuis l'écran des propositions (« Fichier de
    l'audit »).
  - **Fichier › Importer un audit de parcelle…** reprend un fichier de la même parcelle à l'étape des
    propositions : un fichier d'une autre parcelle est refusé et le dit ; les bâtiments d'un autre
    projet de la même parcelle sont retrouvés par leur identifiant BD TOPO ; les mesures du fichier
    tiennent lieu de calcul ; les cases suivent ses décisions, sans jamais cocher une ligne qui
    remplacerait un choix fait à la main ; un audit en cours sur l'appareil n'est remplacé qu'après
    confirmation. Rien n'entre dans le projet avant « Valider », que Ctrl+Z défait en un pas.
  - **« Partager cet audit pour améliorer Plan »**, sur l'écran des propositions : **cochée par
    défaut** (décision de l'utilisateur du 13 octobre), révocable. À chaque validation, le fichier,
    photos comprises, part sur le serveur de Plan et remplace le précédent ; décocher le retire. La
    case n'est montrée qu'avec une session admin ou un jeton de la plateforme : sans eux, rien ne
    quitte l'appareil.
  - **Le serveur** : `admin/audits` dans `deploy/analyse.php` et `buildsg/analyseAdmin.mjs` (même
    contrat), par la session admin ou le jeton de la plateforme vérifié auprès d'elle
    (`plateformeUrl` de la configuration, `BACKPROD_API_URL` sous Node). Les audits se rangent tels
    qu'ils sont arrivés dans `audits/` du dossier des données de l'admin ; l'envoi rend un secret de
    retrait dont le serveur ne garde que l'empreinte ; la liste et la lecture sont à
    l'administrateur. `.htaccess` passe l'en-tête `Authorization` à PHP.
  - Une validation garde les propositions telles qu'elles étaient : une fois écrites, elles ne se
    proposent plus, et le fichier doit les redire. Points de fumée 74 et 75.

- **Plan de la vague 3, « Généraliser »** (`MD/plan-vague-3-generaliser.md`) : les formes de toit
  nouvelles (lucarnes, Mansart et gambrel, demi-croupe, cheminées lues sur le LiDAR, asymétrique),
  les profils de façades du voisinage, les profils de toits régionaux et les suites des lots L15,
  L17 et L18, découpés en lots G1 à G20 ; ce qui peut avancer sans audits réels (vague 3a) et ce qui
  les attend (vagues 3b et 3c) ; décisions D15 à D23 avec leur défaut.

- **Claude en renfort du calage et de la détection des façades** (lot L18 du plan de mise en œuvre,
  `MD/spec-facades-calage-detection.md` §12 bis). Claude aide quand l'algorithme n'est pas sûr de
  lui, jamais à sa place : il propose, Plan recale et mesure, vous validez.
  - **Signaux** (`facade/renfort.ts`) : coins non trouvés (note du calage fin sous 0,5, ou plus d'un
    coin prédit), façade cachée à plus de 30 %, détection peu sûre (moins de 70 % des ouvertures à
    0,7 de confiance, ou une baie devinée en pointillé), ton sur ton (mur de plus de 4 m sans
    ouverture, ou confiance médiane sous 0,55), désaccord avec le nombre attendu, volets fermés.
  - **Ce que Claude reçoit** (`render/imagesRenfort.ts`) : la photo réduite avec une grille de repères
    numérotée de 0 à 10 et le quadrilatère du mur (plein si les coins ont été trouvés, en tirets
    sinon), l'élévation graduée en mètres avec les ouvertures détectées numérotées, et ce que Plan
    sait du mur. **Ce qu'il rend** : un nouveau schéma versionné (`deploy/schema-renfort.json`,
    `deploy/prompt-renfort.md`, version 1) — coins en repères de la grille, avis sur chaque
    ouverture (garder, retirer et pourquoi, type, volets, coffre, balcon, forme), ouvertures
    manquées en boîtes en mètres, `indetermine` partout. Trois passes et un vote.
  - **Des graines, jamais des cotes** (`facade/renfortRecalage.ts`) : un coin proposé est rattaché au
    croisement de deux longs segments de la photo (au plus un demi-repère de la graine, chaque
    segment à moins de 30 cm du croisement) ; une boîte est ajustée sur les profils de contours de
    l'élévation (chaque bord à moins de 30 cm), puis régularisée par la structure. Soutenue sur au
    moins trois côtés, elle est proposée cochée ; sur un ou deux, en pointillé ; sur aucun, rejetée.
    Claude ne retire qu'une baie déjà peu sûre (elle reste proposée, décochée), ne touche jamais à ce
    que le doigt a posé, et confirme une baie devinée du même type au même endroit. Origine marquée :
    `source: 'claude'` (puis `corrigee` si vous la retouchez), coins « proposé par Claude, recalé sur
    la photo ».
  - **Dans le relevé** : un bouton « Demander de l'aide » à l'étape des coins et à la vérification,
    proposé seulement quand un signal est levé et que le serveur de l'analyse est joignable ; appel
    immédiat, trois passes au tarif normal ; le premier appel demande l'accord d'envoyer la photo
    pour ce projet (le même que celui de l'audit, « partager » coché par défaut). Seuls les coins
    prédits sont remplacés ; les ajouts de Claude entrent dans la proposition, pour que les
    corrections tracées à la validation restent les vôtres.
  - **Dans l'audit de la parcelle** : pendant les premiers audits, chaque façade relevée par les
    mesures reçoit le renfort, signal ou non, pour mesurer son apport (décision D11) : trois
    requêtes par façade dans le batch de l'analyse, sans délai de plus, et seulement dans la place
    que l'analyse des maisons laisse (60 requêtes par batch). À la lecture des résultats, les
    graines sont recalées sur l'élévation (texture du relevé) ; le relevé renforcé est proposé,
    décoché tant que le taux d'accord de Claude sur les façades n'est pas mesuré.
  - **Serveur** (`deploy/analyse.php`, `buildsg/analyseAdmin.mjs`, mêmes routes) : une requête peut
    porter son usage (`renfort`) dans un batch, avec son prompt, son schéma et son modèle ; le journal
    l'inscrit sous son usage ; nouvelle route `POST admin/claude/messages`, l'appel immédiat (trois
    requêtes au plus, en parallèle, mêmes plafonds, coût sans la remise Batch, une ligne de journal
    par requête) ; `etat` dit les versions du renfort.
  - **Banc** (skill `facades`) : l'algorithme seul, puis avec des réponses de Claude **simulées**
    (`tests/fixtures/facades/claude/`, écrites par `simuler-claude.ts` : erreurs typiques imitées de
    façon déterministe, en attendant les vraies réponses des audits). Sur les 20 scènes : rappel
    89 % → 96 %, précision 93 % → 96 %, corrections 1,8 → 1,4 par façade ; 7 boîtes ajoutées cochées,
    toutes vraies, la fenêtre inventée par deux passes sur trois rejetée faute d'arête ; graines de
    coins à 27 cm (médiane) recalées à 0,3 cm (64 sur 80 rattachées). La détection et le calage de
    l'algorithme ne changent pas : leur tableau est identique.

- **Relevé de façade : la structure et le classement des ouvertures** (lot L15 du plan de mise en
  œuvre, `MD/spec-facades-calage-detection.md` §10 à §13).
  - **Niveaux et travées** (`facade/structure.ts`) : les ouvertures se rangent en rangées (appui et
    linteau de leurs fenêtres) et en travées (centres à 10 cm près) ; la façade est dite symétrique,
    les hauteurs d'étage contrôlées (2,5 à 3,2 m). Une baie à 5 cm de la médiane de sa travée
    (largeur) ou de son niveau (hauteur), à type égal, en prend la valeur, sans jamais bouger un bord
    de plus de 10 cm de sa mesure.
  - **Complétion devinée** : un croisement de la grille sans baie, caché sur toutes les vues ou peu
    sûr, reçoit une baie devinée, jamais dans un mur vu et net. Sûre, elle est proposée cochée, en
    pointillé ; peu sûre, elle reste en pointillé et décochée : une touche la garde, la case
    « Garder cette baie devinée » la rend au pointillé.
  - **Détails des ouvertures** (`facade/classement.ts`, `OuvertureFacade.details`) : volets battants
    fusionnés dans la baie, coffre de volet roulant retiré de sa hauteur, persiennes fermées, balcon
    ou garde-corps (une haute baie d'étage au-dessus d'un balcon est une porte-fenêtre), grande baie
    au sol vitrée (porte-fenêtre, pas garage), haut cintré ou œil-de-bœuf. Chaque lecture est
    prudente : sur une brique, une pierre, un bandeau qui court sur la façade ou une haie, elle ne
    dit rien. Les seuils sont des réglages nommés (`facades.structure.*`, `facades.classement.*`).
  - **Confiance et source** de chaque ouverture (`detectee`, `devinee`, `ajoutee`, `corrigee`) :
    pleine à 0,7 et plus, en pointillé en dessous ; retouchée au doigt, elle est vérifiée et redevient
    pleine. La fiche de l'ouverture dit d'où elle vient et ce qui a été reconnu.
  - **Gestes en une touche** : « Même taille pour la travée », « Même hauteur pour le niveau »
    (grisés, avec leur raison, quand il n'y a rien à égaliser), « Ajouter dans la grille » (la baie
    au croisement libre le plus proche, à la taille de sa travée et de son niveau).
  - **Ce qui est enregistré** : la grille recalculée sur les ouvertures retenues
    (`ReleveFacade.grille`), la rangée et la travée de chaque ouverture, et les corrections tracées
    par rapport à la proposition de l'analyse (`ReleveFacade.corrections` : ajout, retrait,
    déplacement avec l'écart, changement de type) ; c'est ce qui mesurera le détecteur sur les
    audits. Champs facultatifs : un relevé d'avant garde exactement son sens. L'audit de la parcelle
    garde lui aussi confiance, source et détails des ouvertures qu'il propose.
  - **Banc** : une scène de plus (`19-vues-haie-haute-baie-cachee`, une baie cachée sur les deux
    vues). Avant / après sur le corpus de 20 scènes, chaîne du relevé : précision 93 % et rappel
    89 % inchangés, erreur médiane des cotes 1 cm, types justes 100/102 → 102/102, corrections par
    façade 2 → 1,8 ; fusion de plusieurs vues : rappel 96 % → 100 %, corrections 0,5 → 0,3 par
    façade. Aucune scène ne perd. Point de fumée 67.

- **Audit de la parcelle, phases 2 et 3 sans Claude : propositions et validation** (lot L11 du
  plan de mise en œuvre, `MD/spec-audit.md` §13.1 et §14). « Lancer l'analyse » ouvre maintenant les
  propositions, posées sur la Vue 3D ; une capture terminée y revient par « Voir les propositions ».
  - **Les mesures du téléphone** (`app/audit/parcelle/mesures.ts`), sans serveur : pour chaque
    façade photographiée, le relevé (coins prédits par la prise de vue puis cherchés sur la photo,
    lots L6 à L8 ; redressement, ouvertures, texture), la hauteur à l'égout mesurée quand les coins
    ont été trouvés, la couleur du mur lue sur les photos prises à la boussole (lot L3).
  - **Les propositions** (`model/propositions.ts`, `app/audit/parcelle/propositions.ts`) : le relevé
    de chaque façade, la hauteur à l'égout (médiane des façades mesurées), la couleur des murs lue
    sur vos photos, le matériau des murs et de la couverture vus, les cheminées vues (posées dans le
    plus grand corps en pente, au faîtage, à mi-pan, dans le pignon ou adossées, 40 cm au-dessus du
    faîtage) et la toiture-terrasse vue (sur le plus grand corps plat, édicules compris), la clôture
    côté rue et le portail. Chacune dit son avant, son après et son origine ; la structure porte
    déjà la source (`mesure` ou `claude`), les indices et la confiance pour les propositions de
    Claude (lot L17).
  - **Cases à cocher** : une valeur choisie à la main (source des murs, couverture, relevé déjà fait,
    côté de clôture réglé, portail à une autre largeur, hauteur saisie) n'est jamais remplacée en
    silence : sa ligne arrive décochée et dit « Remplace votre choix : … ». Un relevé dont les coins
    n'ont pas été trouvés arrive décoché, comme une proposition de faible confiance.
  - **Avant / Après** : la Vue 3D montre les bâtiments avec les propositions cochées, sur des copies
    (`three/scene.ts::remplacerObjets3d` accepte d'autres objets que ceux du plan) ; le projet n'est
    pas touché tant qu'on ne valide pas, ni par l'aperçu, ni par l'enregistrement.
  - **Valider** écrit tout ce qui est coché en un seul pas d'historique : Ctrl+Z le défait, le projet
    est marqué modifié. La décision (acceptées, refusées) est gardée avec la capture pour le
    fichier de l'audit (lot L21).
  - **Vérifié sur place** : un bâtiment dont toutes les façades ont été photographiées (ou sont
    mitoyennes ou inaccessibles), dont le toit a été vu et dont toutes les propositions sont cochées
    est marqué `verifieSurPlace` avec la date ; l'inspecteur le dit (Apparence). Champ facultatif :
    un projet sans audit garde sa forme d'avant.
  - **Couleur des murs** : `couleurMurs.terrain` (la couleur lue sur vos photos, validée) passe avant
    la photo de rue, et `couleurMurs.materiau` (le matériau vu sur place) avant celui des fichiers
    fonciers ; une relecture Panoramax ne les touche pas. Les toits ne changent pas : AE 101 et les
    empreintes sont identiques. Points de fumée 62 et 63.

- **Analyse de l'audit de la parcelle par Claude** (lot L17 du plan de mise en œuvre,
  `MD/spec-audit.md` §13.2, `MD/spec-regles-toits.md` §14 ; décisions D1, D2 et D7).
  - **L'accord** : à la fin de la capture, l'écran des propositions demande l'accord d'envoyer les
    photos (« Envoyer mes photos à l'analyse » ou « Seulement les mesures »), avec la case « Partager
    cet audit pour améliorer Plan », cochée par défaut (lue par le fichier de l'audit, lot L21).
    L'accord vaut pour le projet, est gardé sur l'appareil (pas dans le projet, qui ne devient pas
    « modifié »), est rappelé par un toast à chaque envoi et se retire par « Retirer l'accord » : plus
    rien ne part, et les propositions de Claude disparaissent. Sans accord, sans réseau ou sans compte
    de la plateforme, seules les mesures deviennent des propositions, et l'écran le dit.
  - **Les entrées préparées** (`app/audit/parcelle/entreesAnalyse.ts`) : par bâtiment photographié,
    chaque photo réduite à 1 024 px avec sa prise de vue (« prise à 8 m, vers 245° »), le rendu du
    modèle depuis la même prise de vue (Vue 3D hors écran, `three/renduPrise.ts`), les photos du toit,
    l'orthophoto recadrée sur le contour et la carte des hauteurs LiDAR (`render/imagesAnalyse.ts`),
    puis les indices LiDAR chiffrés (montée, bande raide aux bords, sommets, creux, corps), le modèle
    actuel en JSON compact, les mesures du téléphone et « Ce que je vois ».
  - **Trois passes et un vote** (`model/analyseClaude.ts`) : trois requêtes identiques par bâtiment,
    envoyées par les routes batches de `analyse.php` ; le vote retient, attribut par attribut, la
    valeur donnée par plus de la moitié des passes, sinon `indetermine`, et le contrôle croisé
    confronte la réponse aux indices LiDAR (toit plat qui monte, Mansart sans bande raide…).
  - **Les propositions de Claude** (`app/audit/parcelle/propositionsClaude.ts`), source `claude`,
    ajoutées à la liste après celles des mesures : couverture, cheminées, toiture-terrasse et matériau
    des murs (le parement lu sur les façades), chacune avec ses indices (quelle image, ce qu'il y a
    vu) et la part des passes d'accord. Tant que le taux d'accord de Claude n'est pas mesuré à 95 %
    sur un attribut (corpus, lots L19 à L21), elles arrivent décochées et le disent ; une
    contradiction avec le LiDAR aussi. Le schéma de sortie, version 1, couvre aussi les façades
    (ouvertures manquées ou en trop, volets, coffre, balcon, forme, matériau) ; ses écarts restent
    des indices. Une proposition de Claude laissée décochée alors qu'une autre, cochée, écrit le
    même attribut (l'ardoise notée sur place contre le zinc vu par Claude) a été tranchée : elle ne
    retient pas le bâtiment hors du « vérifié sur place ».
  - **Le suivi** : le batch est relu toutes les vingt secondes, et survit à un rechargement (il vit
    dans le brouillon de la capture) ; un toast, et une notification du navigateur quand l'onglet est
    en arrière-plan, disent quand les propositions sont prêtes. Des photos changées depuis l'envoi
    font proposer « Relancer l'analyse ».
  - **Côté serveur** (`deploy/analyse.php`, `buildsg/analyseAdmin.mjs`) : ouvert aux utilisateurs
    de la plateforme par leur jeton, vérifié auprès d'elle (`/api/v1/me/context`, droit d'écrire les
    projets) ; l'organisation de la plateforme est celle des plafonds et du journal, et ne lit que ses
    batches ; tarifs, plafonds et consommation restent à l'administrateur. Le journal compte les
    façades de chaque requête, et le tableau de bord montre le coût par façade de chaque parcelle.
    Points de fumée 69 et 70.

- **Le 100 % protégé** (lot L12 du plan de mise en œuvre, `MD/spec-regles-toits.md` §1,
  `MD/spec-audit.md` §14.5) : un bâtiment marqué « vérifié sur place » par un audit de la parcelle
  n'est plus recalculé par Plan (`model/toitVerifie.ts`).
  - **La relecture des toits** en tâche de fond (`VERSION_LECTURE_TOITS`, `app/toitsFond.ts`) le
    saute : sa copie est lue avec les règles du jour et comparée à ce qui est dans le plan (contour,
    hauteur à l'égout, forme, corps un à un, au décimètre), mais rien ne s'écrit que la marque de
    lecture. Le bilan de fin dit seulement si « le nouveau calcul serait d'accord » ou « différent » :
    c'est la mesure d'une règle, sans toucher au projet. La lecture LiDAR d'un import ou d'une
    actualisation (`app/toitsLidar.ts`, option `verifies`) l'écarte de même.
  - **Fichier › Actualiser le projet** le conserve tel quel : ni supprimé et recréé depuis la
    BD TOPO, ni relu (contour, toit, LiDAR, couleur des toits et des murs), ni ramené aux valeurs par
    défaut ; le bâtiment frais qui porte son identifiant n'est pas ajouté à côté. La question le dit
    (un point de plus) et propose une case, décochée, « Recalculer aussi « Maison », vérifié sur
    place le 13/10/2026 » (ou « les n bâtiments vérifiés sur place ») : cochée, il est actualisé
    comme les autres. L'actualisation IGN (Fichier › Actualiser depuis l'IGN) le conserve aussi, sans
    case pour l'instant. Le bilan compte les bâtiments conservés.
  - Un dialogue de choix (`shell/dialogues.ts`) peut porter une case à cocher (`case`), dessinée
    sous ses points (`dialogue.case`). AE 101 et les empreintes sont identiques. Point de fumée 64.

- **Faits des toits et skill `regles-toits`** (lot L20 du plan de mise en œuvre,
  `MD/spec-regles-toits.md` §5, §9 et §10).
  - **`regles/toits/faits.json`** : une vérité observée sur un bâtiment, rangée par sa clé BD TOPO
    (`cleabs`), qui vaut dans tous les projets qui le contiennent. En **contrainte** (par défaut), le
    corps principal qui ne dit pas ce que l'on a vu (forme, sens du faîtage, bouts, nombre de corps
    au plus, fourchettes de hauteur) est relu sur la mesure parmi les seules formes admises ; la
    mesure donne les hauteurs, et un toit déjà d'accord ne bouge pas. En **remplacement**, le fait
    donne aussi les dimensions : un corps sur la boîte orientée du contour, sans lecture, même sans
    LiDAR. L'ordre est celui de la spec : calcul, fait, garde-fous de vraisemblance. Le fichier est
    vérifié (vocabulaire fermé, `model/faitsToits.ts`), compilé dans le fichier livré, et appliqué à
    l'import, en tâche de fond et au rejeu des cas d'audit (`facade/faitsToits.ts`). Son empreinte
    entre dans `VERSION_LECTURE_TOITS` : un fait ajouté demande une version de lecture nouvelle, et la
    CI le rappelle. Le fichier est livré **vide** : aucun toit ne change, la version de lecture reste 1.
  - **Mode d'essai `?regles=local`** (administrateur) : menu Admin › « Essayer des faits de toits… »
    charge un fichier de faits depuis votre poste, à la place de celui du dépôt, le temps de la page.
    Les toits concernés sont relus en tâche de fond ; rien n'est enregistré, et à la prochaine
    ouverture ils sont relus avec les faits livrés. Les réglages ne s'essaient pas encore ainsi.
  - **Skill `.claude/skills/regles-toits/`** : traiter un fichier de promenade de bout en bout (tri des
    cas : hors toit, fait, réglage, règle, question ; attendu ; images avant et après ; PR), en
    s'appuyant sur le skill `toits`. Scripts : `trier.ts` (premier tri, seuils en jeu, squelette de
    fait), `faits.ts` (faits comptés par forme, signal au-delà de cinq faits qui disent la même chose,
    ligne de version de lecture à ajouter) ; `audit.ts --faits` rejoue avec les faits proposés pour
    les cartes d'après. Premier passage sur le corpus : le cas d'Hucqueliers est classé « règle »
    (chantier ouvert des ailes recouvertes), sans fait.
  - AE 101 identique, banc des quatre villages identique, empreintes golden inchangées.

- **Audit de la parcelle, phase 1 : la capture** (lot L9 du plan de mise en œuvre,
  `MD/spec-audit.md` §11, §12 et §8.1). Dans un projet, Fichier › « Auditer la parcelle… »
  (feuille du projet au doigt) ouvre la visite sur place, téléphone en main. La commande demande le
  droit d'écrire le projet ; sans parcelle cadastrale, elle est grisée : « Importez d'abord la
  parcelle depuis son adresse. »
  - **La liste de contrôle**, plein écran : pour chaque bâtiment de la parcelle puis des mitoyens,
    chaque façade (à photographier, photographiée avec son nombre de photos, inaccessible d'une
    touche ; mitoyenne, collée à un autre bâtiment ou posée sur une limite voisine, rien à
    photographier ; celle d'un mitoyen qui donne chez un autre voisin, supposée inaccessible), le
    toit, les cheminées, la toiture-terrasse s'il y en a une, les matériaux ; puis la clôture côté
    rue (type, hauteur, soubassement, photo) et le portail (nature, position, largeur, photo). Un
    compteur dit ce qui reste (« 7 façades sur 9, toit vu, clôture à faire »), et la liste de ce qui
    manque, sans bloquer.
  - **Photographier en marchant** : l'écran de prise se pose sur la Vue 3D. Le GPS et la boussole
    reconnaissent la façade que vous avez devant vous parmi celles de la liste (lot L2), elle est
    surlignée dans la scène et nommée (« Vous êtes devant la façade sud de Maison, 9,2 m — 0 photo »),
    avec le plan de prise (« une photo suffit », « 3 photos, de gauche à droite ») ; la photo située
    (lot L1) s'y range d'elle-même. « Ce n'est pas cette façade » propose la suivante ; sans
    position, « Photographier » sur la ligne d'une façade la choisit.
  - **« Ce que je vois »** : un composant partagé (forme parmi le catalogue des toits, sens du
    faîtage, bouts, lucarnes, cheminées une à une, toiture-terrasse, matériaux des murs et de la
    couverture). Toucher un choix retenu le retire : on n'écrit que ce que l'on a vu. La fiche de la
    promenade le montre aussi, en section facultative, et l'écrit dans le cas (`vu`).
  - **Rien n'entre dans le projet** à cette phase : la capture vit dans le brouillon de l'appareil
    (table `parcelles`, à côté des promenades), se reprend à la réouverture (« Reprendre l'audit du
    … » ou « Le jeter »), et « Lancer l'analyse », proposé dès qu'une façade est photographiée,
    termine la capture pour l'analyse qui viendra (lot L11). Points de fumée 60 et 61.
  - Une commande grisée peut dire ce qu'il faut faire d'abord (`raisonInactive` du registre) ; au
    doigt, la raison s'écrit sous l'entrée du menu.

- **Corpus d'audit et réglages des toits** (lot L19 du plan de mise en œuvre, `MD/spec-audit.md`
  §21 à §23, `MD/spec-regles-toits.md` §6 et §8).
  - **Rejeu d'une promenade** : `.claude/skills/toits/scripts/audit.ts <fichier | dossier>` relit un
    fichier de promenade (version 1 ou 2), rejoue chaque cas sans réseau avec le code courant, et le
    compare à ce que le code avait produit sur le terrain et à l'attendu validé. Il écrit un tableau et
    les fichiers de `rendu.py` (rejeu et terrain côte à côte). Il propose `facade.couleur`, sans le
    cocher, quand une façade lue sur une photo du cas s'écarte de la couleur des murs retenue de plus
    que le seuil de `model/couleurMur.ts` (§18.4). Le calcul pur est dans `facade/audit.ts` ; les
    garde-fous de végétation et d'égout passent dans `facade/vraisemblance.ts`, partagés avec
    l'import (aucun changement de règle).
  - **Corpus** `tests/fixtures/audit/` et test `tests/unit/facade/audit.test.ts` : chaque cas
    `valide` est rejoué en CI (corps au centimètre, couleur et source des murs) ; les cas `a_corriger`
    et `corrige` sont listés en `it.todo`. Deux premiers fichiers, reconstitués depuis des relevés
    réels (pas encore une promenade) : AE 101, la maison de référence, validée (format version 1), et
    le pavillon est de la longère d'Hucqueliers, à corriger (format version 2).
  - **Réglages des toits** : les 74 seuils de la lecture des toits (surface mesurée, rectangles,
    formes simples, corps et pignons, recalage, complétion, végétation, bâtiments à cheval) sortent
    du code dans `regles/toits/reglages.json`, avec leur unité, leur raison et les cas qui les
    justifient, **sans changer une seule valeur**. Le fichier est compilé dans le fichier livré
    (`model/reglagesToits.ts`) ; son empreinte entre dans `VERSION_LECTURE_TOITS`
    (`LECTURES_TOITS`) : une valeur changée sans nouvelle version de lecture fait échouer la CI, et
    relit de toute façon les toits déjà lus. La version de lecture reste 1 : rien n'est relu. Le
    fichier de promenade note l'empreinte des réglages (`promenade.regles.reglagesToits`). Banc des
    quatre villages et AE 101 identiques au bit près ; empreintes golden inchangées.

- **Fusion de plusieurs vues d'une façade** (lot L13 du plan de mise en œuvre,
  `MD/spec-facades-calage-detection.md` §8). Une voiture, une haie ou un poteau cachent une baie sur
  une photo, pas sur une autre prise d'ailleurs : le relevé sait maintenant fondre des vues du mur
  entier, de face et de biais, en plus de la mosaïque de morceaux côte à côte.
  - `facade/fusion.ts` : chaque photo est redressée par ses propres coins dans le même repère de
    l'élévation, avec une carte de qualité par pixel (résolution de la photo source au mur dans le sens
    le moins bien vu, incidence, surexposition) ; un recalage fin par corrélation normalisée, en deux
    dimensions, sur 30 cm au plus, repris sur chaque tiers du mur ; les occlusions par la parallaxe
    (le centre optique de chaque vue se tire de son homographie : ce qui est devant le mur se retrouve
    sur l'autre vue à un recul de 15 cm à 3 m, vérifié dans les deux sens, puis étendu à l'obstacle
    entier) ; la composition par la vue de meilleure qualité hors obstacle, la médiane à partir de
    trois vues libres. Ce qui reste caché partout forme le masque d'occlusion : aucune ouverture n'y
    est cherchée.
  - **Relevé** : avec deux photos ou plus, un choix « Morceaux côte à côte / Vues du mur entier ».
    En vues, chaque photo reçoit les coins du mur entier (cherchés par le calage fin), la consigne le
    dit, l'analyse fond les vues, et un avis signale une vue qui se raccorde mal ou une part du mur
    cachée partout. Le calage garde la résolution de chaque vue. Point de fumée 65.
  - **Banc de façades** : des vues de plus dans le générateur (`synthese.vues`, coins décalés de
    quelques pixels), la vérité des occlusions (`cacheDepuis`), trois scènes (`16` à `18` : voiture,
    haie, deux vues seulement) et une section « une vue → fusion ». Sur ces trois scènes : rappel de
    74 à 100 %, précision de 82 à 95 %, corrections de 2,7 à 0,3 par façade ; le mur caché sur la vue
    principale rendu à 69 % au lieu de 12 %. Les seize scènes d'avant ne bougent pas.

- **Distorsion du grand-angle corrigée** (lot L8 du plan de mise en œuvre,
  `MD/spec-facades-calage-detection.md` §4). Une photo prise à l'ultra grand-angle (focale
  équivalente sous 20 mm) que le téléphone n'a pas redressée courbe les arêtes du mur, ce que le
  calage et le redressement, qui supposent un sténopé, ne savent pas lire.
  - `facade/distorsion.ts` estime un coefficient radial (forme « division ») sur les arêtes presque
    verticales de la photo, qu'il doit rendre droites, et ne corrige que si le gain est net : une photo
    déjà corrigée, ou sans arêtes, reste telle quelle. Au-delà de 20 mm, rien n'est fait. L'image
    corrigée garde sa taille et ses quatre coins ; la focale suit. `facade/segments.ts` rend aussi les
    traces de gradient, courbes comprises (`detecterTraces`), sans changer ses segments.
  - **Relevé** : la correction se fait dans le worker du calage fin, juste avant la recherche des
    coins, et pour chaque photo d'une série prise au grand-angle. La photo montrée devient la photo
    corrigée, les coins déjà posés y sont ramenés, et une note le dit.
  - **Banc de façades** : la distorsion de l'objectif dans le générateur (forme polynomiale, exprès
    différente de celle de la correction), trois scènes (`13` à `15`, dont un témoin déjà corrigé) et
    une section « avant → après ». Sur un 13 mm en barillet de 15 % : cotes de 6 à 1 cm, coins du
    calage fin de 167 cm au pire à 2 cm ; le témoin et les treize scènes d'avant ne bougent pas.
    Point de fumée 59.

- **Calage fin des photos de façade : les coins trouvés sur la photo** (lot L7 du plan de mise en
  œuvre, `MD/spec-facades-calage-detection.md` §6). Les coins ne sont plus seulement prédits par la
  prise de vue : ils sont cherchés sur les arêtes de la photo.
  - `facade/segments.ts` détecte les segments de droite sur le gradient de couleur (du type LSD) ;
    `facade/pointsFuite.ts` lit le point de fuite vertical, qui corrige l'inclinaison et le roulis
    dans les bornes de l'accéléromètre, et le point de fuite horizontal du mur, qui corrige l'azimut
    dans celles de la boussole (le calage de la boussole) ; `facade/calageFin.ts` cherche les côtés,
    l'égout et le pied du mur dans les zones de recherche du calage grossier, et note chaque
    hypothèse : soutien des segments, contraste et teinte de chaque côté, accord avec la largeur du
    plan et la hauteur à 25 % près, accord avec la prise de vue, hauteur de l'objectif qu'elle
    suppose. Sous le seuil, les coins prédits restent. Le pied caché (haie, voiture) est prédit
    d'après la hauteur du téléphone, et marqué comme tel.
  - **Relevé** : dans l'éditeur des coins, un coin trouvé est un rond plein, un coin prédit un rond
    en pointillé, un coin déplacé au doigt l'est pour de bon (la recherche ne le reprend pas) ; la
    loupe reste. Une note dit ce qui a été trouvé. Le calcul tourne dans un worker, inclus dans le
    fichier livré : l'écran ne gèle pas. Le relevé garde la source de chaque coin, l'azimut corrigé et
    la note du calage (`ReleveFacade.calage`, facultatif).
  - **Contour décalé** : quand une distance mesurée (réalité augmentée, photo de rue) le permet, la
    largeur vue sur la photo est comparée à celle du plan ; au-delà de 0,5 m, un avis dit que le
    contour du bâtiment est sans doute décalé, et la façade garde la largeur du plan.
  - **Banc de façades** : une section « Calage fin », depuis le relevé et depuis l'audit, et une scène
    `12-haie-pied-cache-roulis`. Coins proposés par le relevé à 10 cm au plus : de 4 sur 44 (médiane
    38 cm) à **44 sur 44** (médiane 0,5 cm), dont 40 trouvés sur la photo et 4 prédits ; calage de
    l'audit avec des capteurs typiques : de 0 à 44 sur 44. Les détections d'ouvertures ne changent
    pas. Point de fumée 58.

- **Tableau de bord de la consommation de Claude** (lot L16 bis, `MD/spec-audit.md` §13.3).
  Admin › Consommation de Claude (`?admin&ecran=consommation`), pour l'administrateur seulement,
  ouvert par une commande du registre (`admin.consommation`) inscrite dans les trois classes
  d'écran. Il relit le journal d'`analyse.php` par une nouvelle route, `GET admin/consommation`
  (Apache et Node, même réponse), filtrée par période, organisation, modèle, usage et parcelle :
  - dans le temps : tokens ou dollars par jour, semaine ou mois, en aires empilées par modèle,
    avec une infobulle au survol ou au doigt et le tableau des valeurs ;
  - par parcelle (tableau trié sur chaque colonne), par usage (part du coût, part du Batch), par
    organisation (jour et mois face aux plafonds) ;
  - chiffres clés : coût, tokens, coût moyen par parcelle face à l'estimation de 1 à 2 centimes,
    part de l'escalade, part lue en cache, taux d'échec ;
  - alertes sur les sept derniers jours : organisation à 80 % de son plafond du jour ou du mois,
    coût moyen par parcelle au-delà de deux fois l'estimation, plus de 5 % d'échecs ;
  - export CSV de la vue affichée (point-virgule, virgule décimale, formules neutralisées) ;
  - tarifs et plafonds réglés depuis l'écran : un tarif s'ajoute daté d'aujourd'hui ou plus tard,
    seule une ligne à venir se retire.

  Graphiques en SVG dessinés par la page, avec trois nouveaux jetons de couleur (`--serie-1` à
  `--serie-3`, un par modèle, validés pour les daltoniens en clair et en sombre), chaque couleur
  nommée à côté. Les modèles de palette les reprennent tels quels.

- **Audit, la couleur de la façade sur la photo** (lot L3 du plan de mise en œuvre,
  `MD/spec-audit.md` §6.2 et §18.4). Chaque photo jointe à la fiche d'un bâtiment marqué est lue en
  tâche de fond : Plan retrouve la façade de ce bâtiment devant la prise de vue (lot L2), pose ses
  points sur la photo par la géométrie de la prise (position, boussole, focale, inclinaison et
  roulis du téléphone) et en lit la teinte avec la règle de Panoramax (`model/couleurMur.ts`) :
  - seule la **moitié centrale du mur** est lue, pour absorber l'erreur de la boussole ;
  - une **clôture** en limite de parcelle est écartée : pas de ligne de vue sous 2,5 m à une
    limite ; le ciel, le feuillage, les fenêtres et les ombres aussi.

  Sous la photo, la fiche dit « Façade sud : #C9B49A, lue sur la photo », avec une pastille de la
  teinte. Quand la lecture ne conclut pas, ou que la direction vient du sens de la marche, elle
  demande « **Touchez la façade sur la photo** » : la photo s'affiche en entier, et la teinte est
  lue autour du doigt. Les fenêtres et les ombres y sont écartées par l'écart à la médiane, comme
  dans le relevé. « Plus tard » range la demande ; « Toucher la façade » la rappelle.
  Sans direction de prise de vue, ou sans façade du bâtiment devant elle (3 à 40 m, de face), la
  photo reste une photo. La couleur lue se range dans le cas (`lectures.facades` : mur, couleur,
  source `automatique` ou `toucher`, rang de la photo, pixels lus) et part dans le fichier de la
  promenade : une vérité terrain pour la lecture Panoramax, rien n'est changé sur le bâtiment
  (`render/couleurPhotoAudit.ts`, `app/audit/couleurFacade.ts`).

- **Calage grossier des photos de façade** (lot L6 du plan de mise en œuvre,
  `MD/spec-facades-calage-detection.md` §4 et §5). `facade/calage.ts` projette les coins du mur dans
  la photo par un sténopé, depuis la prise de vue (position, azimut, inclinaison, roulis, focale,
  objectif à 1,5 m). Aux bornes de l'incertitude, il donne une **zone de recherche** par coin :
  précision du GPS, 15° pour la boussole, 25° pour le sens de la marche, quelques degrés d'attitude,
  ±50 % de focale quand elle est estimée. Ces zones serviront au calage fin (lot L7).
  - **Relevé** : les coins proposés tiennent compte de l'inclinaison et du roulis du téléphone au
    déclenchement, et du biais que donne la boussole. Avant, le mur était supposé centré et le
    téléphone d'aplomb. Au banc, l'erreur médiane des coins proposés passe de 146 à 36 cm.
  - **Audit** : les coins d'une photo située sont prédits par sa prise de vue
    (`coinsDeLaPhoto`), centrés sans azimut. La photo garde la taille de sa source, avant
    réduction.
  - **Précision annoncée** : l'écran de vérification du relevé dit la précision des cotes, un pixel
    de la photo au mur (« Cotes précises à environ 2,5 cm : la photo ne voyait le mur qu'à 40 pixels
    par mètre »). Le relevé garde les coins et les pixels par mètre de chaque photo
    (`ReleveFacade.calage`, facultatif).
  - **Banc de façades** : il mesure aussi le calage grossier, avec des capteurs exacts (36 coins
    sur 40 à moins de 10 cm) et typiques (tous les coins vrais dans leur zone de recherche).

- **Audit, la façade devant vous** (lot L2 du plan de mise en œuvre, `MD/spec-audit.md` §6.1 et
  §12.2). En mode audit, Plan reconnaît en direct la façade que vous avez devant vous : celle dont
  vous voyez le côté extérieur, à 3 à 40 m, sans autre bâtiment entre vous et elle, puis, parmi
  celles-là, celle que désigne la boussole (à 50° près ; à égalité, la plus proche). Sans boussole,
  c'est la plus proche devant laquelle vous êtes. Elle est **surlignée en ambre dans la Vue 3D** et
  nommée en tête de la barre d'audit : « Vous êtes devant la façade sud, 9,2 m ».
  Le relevé d'une façade s'en sert aussi : quand votre position est suivie (« Ma position (3D) »),
  il propose le mur devant lequel vous vous tenez, avec sa distance ; sinon, comme avant, celui qui
  fait face au cap de la boussole (`facade/priseDeVue.ts`).

- **Décisions D1, D2 et D13 tranchées** (`MD/plan-mise-en-oeuvre-audit.md`, specs, aucun code) :
  - l'analyse par Claude passe par `analyse.php`, sur le serveur de Plan, d'abord pour l'admin ;
  - l'accord pour envoyer les photos est donné une fois par projet, et révocable ;
  - les réglages et les faits des toits vivent dans le dépôt.

  Les lots L17 et L19 sont débloqués.

- **Cheminées et toits-terrasses dans les corps de toit, et en Vue 3D** (lot L10 de
  `MD/plan-mise-en-oeuvre-audit.md`, `MD/spec-regles-toits.md` §2.6, §2.7, §4). Un corps
  (`CorpsToit`) peut porter des souches (`cheminees` : centre, section, hauteur du débouché au-dessus
  du sol, position faîtage, pan, pignon ou façade, conduits, matériau, couronnement, source) et, s'il
  est plat, sa toiture-terrasse (`terrasse` : accessible, revêtement, acrotère, garde-corps,
  édicules, source). Les deux champs sont facultatifs : un fichier ancien garde son sens, et
  l'enregistrement les écrit tels quels (une liste vide de cheminées ne s'écrit pas).
  - En 3D (`three/cheminees3d.ts`) : la souche part du pan, le pied de chaque face à la hauteur du
    toit sous ses coins ; au faîtage, elle est centrée sur sa ligne ; dans un pignon, au nu du mur
    de bout ; adossée, elle monte du sol jusqu'à son sommet, contre le mur extérieur le plus proche.
    En haut, une dalle de couronnement qui déborde de 5 cm, et des mitrons, un par conduit, quand
    ils ont été vus. Couleur du matériau (brique, pierre, métal), sinon celle des murs.
  - En 3D (`three/terrasse3d.ts`) : l'acrotère en liseré sur les façades seulement (pas contre un
    autre corps), coupé d'onglet aux angles ; les édicules, de la terrasse à leur sommet, à toit plat
    en gravillons.
  - L'inspecteur le dit après le corps : « 2 cheminées », « terrasse accessible, acrotère de
    0,60 m, un édicule ».
  - Ces données ne viennent que d'une observation : aucune détection LiDAR, aucun bâtiment existant
    ne change (AE 101 identique, empreintes inchangées, GLB de la démonstration identique).

- **Serveur de l'analyse par Claude** (lot L16, `MD/spec-audit.md` §13.2 et §13.3, aucun écran).
  `deploy/analyse.php`, à côté d'`admin.php`, et son équivalent Node pour le serveur SiteGround
  (`buildsg/analyseAdmin.mjs`) relaient l'API Message Batches d'Anthropic sous `admin/claude/…`,
  pour l'administrateur seulement pour l'instant :
  - créer un batch (Claude Haiku 5.5, Claude Sonnet 5.5 en escalade), suivre son état, lire ses
    résultats ;
  - la clé (`anthropicCle`, ou `ANTHROPIC_API_KEY` sous Node) ne quitte jamais le serveur, et la
    page n'envoie que les images et le texte de la maison : le prompt, le schéma de sortie et
    l'effort sont fixés par le serveur ;
  - plafonds par organisation, par jour et par mois, qui comptent aussi les batches encore en
    cours (`claude/plafonds.json`) ;
  - une ligne de journal par appel (`claude/journal-AAAA-MM.jsonl`) : parcelle, modèle, usage,
    passe, tokens renvoyés par l'API, nombre d'images, coût et statut, sans photo ni réponse ;
  - table des tarifs datée (`claude/tarifs.json`), posée au premier usage depuis
    `deploy/claude-tarifs.json`, prix vérifiés sur la page officielle le 13 octobre 2026 ; un tarif
    passé ne se réécrit pas.

  Le prompt « béton » (version 0, `deploy/prompt-analyse.md`) et son schéma de sortie structurée
  (`deploy/schema-analyse.json`) sont versionnés, et leurs versions suivent chaque ligne du journal.

- **Audit, photo située complète** (lot L1 du plan de mise en œuvre, `MD/spec-audit.md` §5 et §19).
  La fiche d'un bâtiment marqué garde **jusqu'à six photos**, en vignettes, chacune avec
  « Retirer » et le texte de sa prise de vue. Chaque photo garde en plus :
  - la **focale équivalente 24×36 et le modèle d'appareil**, lus dans l'EXIF avant la réduction
    qui l'efface. Si l'EXIF n'a pas de focale, Plan reprend celle déjà lue pour ce modèle sur ce
    navigateur ; sinon il retient le champ par défaut du relevé (67°), annoncé « estimé » ;
  - l'**inclinaison** de la visée et le **roulis** de l'image, lus sur l'orientation du téléphone
    au retour de l'appareil photo.

  Le fichier de la promenade passe en **version 2** (`constat.photos[]`). Un fichier de version 1 se
  relit tel quel : sa photo unique devient la première de la liste (`lireFichierPromenade`).

- **Audit, brouillon local de la promenade** (lot L4, `MD/spec-audit.md` §10). Les marques, les cas
  figés et leurs photos sont écrits au fur et à mesure dans le téléphone (IndexedDB,
  `io/brouillonAudit.ts`), et tout de suite quand l'écran se verrouille ou que l'onglet passe en
  arrière-plan : un onglet tué par le système ne fait plus perdre la visite.
  - À la réouverture de `?mode=audit`, un dialogue propose « Reprendre l'audit du … » ou « Le
    jeter ». Le départ attend la réponse : un audit repris repart de sa propre parcelle, pour que
    les contours déjà figés restent dans le même repère. La grille LiDAR ou l'adresse qui manquaient
    à un cas sont relues quand son bâtiment revient dans le plan.
  - Après le partage (ou le téléchargement) du fichier, Plan propose « Effacer le brouillon » ;
    rien n'est effacé sans cette confirmation.
  - Navigation privée, stockage bloqué ou téléphone plein : l'audit continue, et un message dit une
    fois qu'il faut partager le fichier avant de fermer l'onglet.

- **Banc de façades** (lot L5 du plan de mise en œuvre, `MD/spec-facades-calage-detection.md`
  §14). Il est monté avant toute modification de la détection des ouvertures, qui ne change pas :
  - un générateur de façades de synthèse difficiles (`tests/banc/facades/`) : brique, soubassement
    en pierre, meulière, ombres de débord, de balcon et d'arbre, volets battants, coffres et tabliers
    de volets roulants, voiture ou haie devant, prise de biais, focale inconnue ;
  - un corpus de douze scènes (`tests/fixtures/facades/`), dont la vérité donne les ouvertures et
    les coins. Les deux images des tests d'origine en font partie et restent justes à 1 ou 2 cm ;
  - un script de mesure (`npx tsx .claude/skills/facades/scripts/banc.ts`). Il rejoue
    `facade/detection.ts` et `facade/analyse.ts` tels qu'ils sont, et mesure la précision, le
    rappel (recouvrement de plus de 50 %), l'erreur médiane des cotes, les corrections par façade et
    l'erreur des coins proposés ;
  - le skill `facades`, qui dit comment lancer le banc et lire son tableau. Il donne les chiffres
    de départ : rappel 65 %, précision 78 %, cotes à 1 cm, 4,2 corrections par façade, aucun coin
    proposé à moins de 10 cm.

- **Audit, photo située complète** (lot L1 du plan de mise en œuvre, `MD/spec-audit.md` §5 et §19).
  La fiche d'un bâtiment marqué garde **jusqu'à six photos**, en vignettes, chacune avec
  « Retirer » et le texte de sa prise de vue. Chaque photo garde en plus :
  - la **focale équivalente 24×36 et le modèle d'appareil**, lus dans l'EXIF avant la réduction
    qui l'efface. Si l'EXIF n'a pas de focale, Plan reprend celle déjà lue pour ce modèle sur ce
    navigateur ; sinon il retient le champ par défaut du relevé (67°), annoncé « estimé » ;
  - l'**inclinaison** de la visée et le **roulis** de l'image, lus sur l'orientation du téléphone
    au retour de l'appareil photo.

  Le fichier de la promenade passe en **version 2** (`constat.photos[]`). Un fichier de version 1 se
  relit tel quel : sa photo unique devient la première de la liste (`lireFichierPromenade`).

- **Spec : tableau de bord de la consommation de Claude** (`MD/spec-audit.md` §13.3, aucun code).
  `analyse.php` journalise chaque appel : parcelle, modèle, usage, tokens renvoyés par l'API, coût
  calculé avec une table des tarifs datée. Journal, tarifs et plafonds sont des JSON stockés sur le
  serveur de Plan, comme la palette. L'écran Admin › Consommation Claude montre :
  - les tokens et le coût dans le temps, par modèle ;
  - le détail par parcelle, par usage et par organisation ;
  - les chiffres clés, à côté du taux d'accord.

  Il émet aussi des alertes de plafond et de dérive, et exporte en CSV. Il est ajouté au plan de
  mise en œuvre (lot L16 bis).

- **Plan de mise en œuvre de l'audit, des façades et des règles des toits**
  (`MD/plan-mise-en-oeuvre-audit.md`, aucun code). Il découpe les trois specs en 21 lots, une PR
  chacun, regroupés en jalons :
  - socle commun : photo située, façade reconnue, couleur sur photo, brouillon ;
  - calage des photos ;
  - audit de la parcelle sans Claude ;
  - détection des ouvertures ;
  - analyse par Claude ;
  - corpus et règles ;
  - généralisation.

  Il donne leurs dépendances, ce que chacun doit prouver, les décisions qui bloquent et les défauts
  retenus en attendant, les risques et le premier pas.

- **Spec de l'audit : deux processus, les mêmes outils ; calage et détection des façades**
  (`MD/spec-audit.md` réorganisée, `MD/spec-facades-calage-detection.md` nouvelle, aucun code).
  - L'audit de la parcelle principale (tout utilisateur, dans son projet) et la promenade
    (administrateur) partagent leurs outils : Vue 3D qui suit, photo située, façade reconnue à la prise
    de vue, couleur lue sur la photo, relevé, « Ce que je vois », cas figé, brouillon.
  - L'audit de parcelle se fait en trois phases : capture (photos rangées d'elles-mêmes sur la façade
    que l'on a devant soi, observations), analyse (mesures dans le téléphone, puis batch Claude qui
    rédige les propositions), validation des propositions dans la Vue 3D, avant et après, qui met le
    projet à jour en un seul pas d'annulation.
  - Le calage des photos et la détection des ouvertures sont repris pour en faire le moteur des
    façades : coins trouvés par les points de fuite et cap corrigé, fusion de plusieurs vues pour voir
    derrière une voiture ou une haie, teinte locale et profils de contours, filtre d'ombre, structure en
    niveaux et travées, volets et coffres reconnus, confiance montrée, corrections tracées, banc de
    mesure. Claude aide quand l'algorithme n'est pas sûr ; ses propositions sont recalées sur l'image.
  - Les façades relevées règlent ensuite, par profil, les fenêtres automatiques du voisinage.

- **Spec des toits : deux exigences, cheminées et toits-terrasses** (`MD/spec-regles-toits.md`,
  `MD/spec-audit.md`, aucun code).
  - Le voisinage vise le modèle automatique le plus juste possible, calibré par l'audit, mais pas à
    100 %. La parcelle principale, et très probablement les mitoyens, visent le 100 % : faits, relevés
    et audit de la parcelle, figés dans le projet. Un changement de règle ne les recalcule plus.
  - La cheminée est décrite en détail : souche, conduits, couronnement, positions (faîtage, pan,
    pignon, adossée en façade), dimensions vraisemblables, ce que le LiDAR, l'orthophoto et la photo
    en voient, modèle de données et assertions.
  - La toiture-terrasse aussi : inaccessible, accessible, végétalisée, technique ; acrotère,
    garde-corps, édicules, lanterneaux ; terrasse partielle ; modèle de données et assertions.
  - Deux problèmes à cocher de plus dans l'audit : `toit.cheminee` et `toit.terrasse`.
  - L'audit de la parcelle principale est ouvert à tout utilisateur, dans son projet. Il propose des
    changements (ouvertures, hauteurs, couleur, cheminées, terrasse, clôture) ; ceux que l'utilisateur
    accepte mettent à jour le modèle en un seul pas d'annulation. La promenade reste réservée à
    l'administrateur.

- **Spec du mode audit : captures opportunistes et audit de la parcelle principale** (`MD/spec-audit.md`
  §12 et §13, aucun code). Chaque photo d'un cas est exploitée au maximum :
  - plusieurs photos par cas, chacune avec position GPS, azimut, focale et inclinaison ;
  - le mur photographié proposé sur la photo ;
  - la couleur de la façade lue, automatiquement ou d'un toucher ;
  - sur la parcelle principale, le relevé de la façade : texture redressée, ouvertures réelles,
    hauteur mesurée.

  Un mode à part, l'audit de la parcelle principale, fait le tour d'une maison avec une liste de
  contrôle : toutes les façades, le toit, les matériaux, la clôture et le portail. Il produit un
  fichier qui nourrit le corpus et peut s'importer dans le projet de la même parcelle.

- **Spécification des règles des toits** (`MD/spec-regles-toits.md`, aucun code). Elle couvre :
  - le vocabulaire complet du toit (versants, croupe et demi-croupe, brisis et terrasson, arêtier, noue, ligne de bris, rives, lucarnes, cheminées, débords), avec ce que le LiDAR peut voir de chacun ;
  - le catalogue de 21 formes, du plus simple au plus rare (plat, monopente, deux pans, croupe, pavillon, demi-croupe, Mansart, asymétrique, toit en M, papillon, gambrel, coyau, shed, berceau, carène, conique, dôme, impériale…), avec leurs confusions ;
  - les trois niveaux d'une observation de terrain : fait sur un bâtiment, réglage par profil (JSON), règle dans le code ;
  - l'attendu testable écrit depuis ce que l'on a vu ;
  - le corpus de non-régression et le skill qui formalise un cas d'audit ;
  - l'analyse assistée par Claude (photo, rendu du modèle au même point de vue, orthophoto, LiDAR) : réponse fermée, vote à trois passes, contrôle croisé, taux d'accord mesuré, statut « proposé », et un coût estimé à environ un demi-centime par maison avec Claude Haiku 5.5 ;
  - une roadmap de transformation en six phases (observer, mesurer sans changer, corriger par les faits, généraliser les formes puis les profils, régime de croisière), avec ses critères de passage et ses indicateurs ; à chaque phase, le rôle de Claude Code (le développeur) et de Claude analyste (en ombre, mesuré, en service, sur Panoramax, puis systématique).

- **Mode audit : boussole, vue à 70 m, photo située.** Dans la Vue 3D, le centre de rotation et de zoom
  est votre position : il vous suit à chaque pas, et la caméra garde le zoom et la rotation que vous
  lui avez donnés. « Me suivre » recadre derrière vous, dans l'axe de votre cap, pour voir 70 m
  devant, et tourne avec la boussole du téléphone (à défaut, avec le sens de la marche). Tourner la
  vue d'un doigt lâche le cap, le pincement non. Les bâtiments sont lus jusqu'à 70 m (40 m avant).
  La photo d'un cas garde sa position GPS et son azimut, que la fiche affiche.

- **Menu Admin › Mode audit (promenade)** : le mode audit s'ouvre depuis l'écran, sans taper
  d'adresse. L'entrée est proposée en admin des démos (`?admin&mode=audit`, sans enregistrement sur les
  démos) et à l'administrateur de la plateforme, qui ne voit qu'elle dans le menu Admin.

- **Mode audit, étape 1** (`?mode=audit`, administrateur seulement ; `MD/spec-audit.md`). Une
  promenade pour noter les toits et les façades que Plan calcule mal. La Vue 3D suit votre position
  GPS (caméra « drone », « Me suivre » après un glisser) et charge tout ce qui est à moins de 40 m,
  relu à chaque pas de plus de 10 m ; chaque toit y est calculé en entier (recalage, coupes), les
  murs prennent la couleur de leur matériau BD TOPO. Toucher un bâtiment le marque en rouge (le
  retoucher retire la marque) ; un appui long ouvre sa fiche : catégorie, problèmes à cocher (sens
  du faîtage, pignon manquant, arbre pris pour le toit…), note, photo réduite à 300 Ko. « Cas
  notés » montre la liste, à revoir, puis partage un seul fichier pour toute la promenade par le
  partage du téléphone (téléchargé sur un ordinateur). Chaque cas y garde ce qu'il faut pour être
  rejoué sans réseau : contour, BD TOPO, grille LiDAR, et ce que Plan en avait fait. Rien n'est
  enregistré : aucun projet n'est créé ni modifié. `&depart=<adresse>` part d'une adresse au lieu du
  GPS, la position se déplaçant au doigt : pour essayer sans sortir.

- **Vue 3D : votre position GPS** (menu Affichage, « Ma position (3D) », décochée par défaut). Un
  point bleu, toujours visible, suit votre position pendant que vous marchez, avec au sol un disque de
  la précision annoncée par l'appareil. Chaque nouvelle position déplace seulement le point : rien
  n'est recalculé, la scène n'est pas reconstruite. Comme « Filaire », c'est une préférence
  d'affichage : ni Ctrl+Z, ni « projet modifié », permise en lecture seule, et elle ne s'enregistre
  pas avec le projet. Elle demande un projet calé sur le cadastre ; loin du projet, un message le dit.
  Le point n'entre pas dans l'export GLB.

- **La couleur des murs se lit plus prudemment sur les photos de rue, et plus en tâche de fond.**
  Une façade en partie cachée (une haie devant) se lit sur ce qui en reste. Un mur dont trop de
  points tombent sur le ciel n'est pas lu : la photo ne le montre pas là où on le croit. Une teinte
  froide n'est pas prise pour une façade. Ainsi, un nuage au-dessus d'une haie ne devient plus une
  façade blanche. La lecture de tout le voisinage en tâche de fond existe, mais elle est arrêtée : sur
  les photos disponibles, elle ne concluait que pour quelques bâtiments (2 sur 31 au Vésinet) pour des
  centaines de mégaoctets téléchargés. Elle reprendra quand la lecture conclura plus souvent. L'import
  lit toujours les murs des 150 bâtiments les plus proches.

- **Modes de diagnostic `?mode=devroof` et `?mode=devwall`** (dans l'adresse). Chaque bâtiment est
  peint, sur le plan et dans la Vue 3D, selon l'origine de son toit ou de ses murs ; la barre d'état
  donne la légende et les comptes. Rien n'est modifié dans le projet ni dans les exports.
  - devroof : rouge, non traité ; vert, toit lu sur le LiDAR ; orange, toit par défaut faute de
    LiDAR ; bleu, autres cas (toit saisi, relevé sur une photo de façade).
  - devwall : rouge, couleur par défaut ; orange, couleur et texture des fichiers fonciers ; vert,
    photo de rue Panoramax.

- **La couleur des toits du voisinage, lue elle aussi en tâche de fond.** Chaque lot lit la forme des
  toits qui n'en ont pas, puis la couleur de ceux qui n'en ont pas, sur la photo aérienne. Sans
  dalle LiDAR sur le secteur, les couleurs se lisent quand même.

- **Fin de la lecture des toits : un bilan, les questions en attente, et l'enregistrement.** Un message
  dit combien de toits et de couleurs ont été lus ; les toits « à cheval sur deux parcelles » que la
  lecture a découverts posent leur question. Le projet s'enregistre seul toutes les 5 minutes et à
  la fin, seulement si tout ce qui attend d'être enregistré vient de la lecture : jamais une de vos
  modifications à votre insu. Un enregistrement refusé (projet trop lourd) arrête ces essais pour la
  séance.

- **Les toits de tout le voisinage, lus sur le LiDAR en tâche de fond** (`app/toitsFond.ts`). À
  l'import et à l'actualisation, seuls les 30 bâtiments les plus proches (au lieu de 150) sont lus
  avant que le plan s'ouvre ; les autres le sont ensuite, par lots, du plus proche au plus loin, sans
  bloquer le plan. Chaque lot se dessine dès qu'il est lu (la Vue 3D ouverte suit au plus toutes les
  10 s). Chaque bâtiment lu est marqué (`toitLidarLu`, enregistré) : il n'est pas relu à la
  réouverture, et la lecture reprend où elle s'était arrêtée. Un bâtiment que vous modifiez pendant
  la lecture n'est pas écrasé. La barre d'état compte « Toits LiDAR : 120 / 2 400 », et
  Fichier › Suspendre (ou Reprendre) la lecture des toits l'arrête ou la relance. Un service muet
  l'arrête après trois lots sans réponse. La suite du chantier est dans `MD/roadmap-toits-fond.md`.

- **Choisir le matériau de la couverture** (section Façades et toit, « Matériau »). Automatique, le
  défaut, garde le matériau que Plan déduit des fichiers fonciers, de la couleur et de la pente, et
  le nomme entre parenthèses. Tuile romane, plate ou canal, ardoise ou zinc l'emportent en 3D sur
  ce relevé, dans tous les modes de toit. « Actualiser le projet » revient à l'automatique ; la
  relecture LiDAR des toits garde le choix.

- **Affichage › Noms des rues**. La même bascule que la case de la section Voisinage de la parcelle ;
  la première fois, les rues sont lues à l'IGN.

- **Affichage › Recharger la photo aérienne**. Une photo mal chargée ne se réparait pas en éteignant
  puis rallumant le fond : les tuiles restaient en cache. La commande oublie tout et relit tout. Une
  tuile qui échoue est maintenant redemandée une fois avant d'être abandonnée.

- **La photo aérienne couvre tout le voisinage**, jusqu'au bout du relief du paysage. Une seconde
  couche, à un niveau de détail plus grossier, se pose sous la photo fine des parcelles. Avant, la
  vallée restait verte au-delà de la dernière parcelle importée.

- **Une roue qui tourne, sans message, pendant l'ouverture** (`shell/chargement.ts`, `index.html`).
  Un plan lourd (le voisinage de 5 km : 4 000 objets) met plusieurs secondes à s'ouvrir, et la page
  montrait pendant ce temps des zones vides. La roue est posée par la page elle-même, avant que le
  programme ne soit chargé ; elle s'efface devant la connexion, le premier pas ou une erreur, revient
  pendant la lecture du projet et disparaît dès que le plan est dessiné. À l'import d'un projet JSON,
  la même roue tourne le temps de le lire et de le poser.

- **Cinq dessins d'arbres en 3D, au choix** (section Arbre de l'inspecteur, « Dessin (3D) »). Le
  choix vaut pour tous les arbres du plan, voisinage compris ; un arbre ajouté ensuite suit les
  autres.
  - **A — Lobes** : le dessin d'avant, tel quel.
  - **B — Dôme**, le défaut : les mêmes lobes, sans le toupet qui dépassait en haut du houppier ni
    de bosse sur l'épaule, plus lisses, sans les fentes qui s'ouvraient à la couture des sphères.
  - **C — Touffes** : vingt à quarante petites touffes de nuances différentes autour d'un cœur
    sombre, en une seule maille par arbre.
  - **D — Taillé** : trois à cinq volumes à facettes.
  - **E — Maquette d'architecte** : un seul volume lisse, d'un vert doux tiré de la couleur du
    feuillage, sur un tronc fin.
  Pour B à E, le tronc est à l'échelle du houppier : un rayon de 9 % de son diamètre (5 % pour la
  maquette), jamais plus que le cercle dessiné sur le plan.
  L'emprise, la hauteur et l'ombre de l'arbre ne dépendent pas du dessin. C'est une préférence
  d'affichage (ni Ctrl+Z, ni « projet modifié », permise en lecture seule), enregistrée avec le
  projet. Le GLB de la démonstration change de taille, pas de structure (`EMPREINTES.md`).

- **Une troisième démo : Peyrusse-le-Roc, horizon de cinq kilomètres** (`plan-demos/3.json`, source
  `deploy/plan-demos/3.json`, 4,3 Mo). La place des Treize Vents avec le voisinage étendu au maximum :
  4 001 objets, dont les 2 000 parcelles les plus proches (jusqu'à 1,5 km environ) et 2 000 bâtiments
  (jusqu'à presque 5 km), le relief fin de la parcelle au pas de 0,5 m et la vallée en relief sur 10 km
  de côté au pas de 20 m. La livraison la copie à côté de `1.json` et `2.json`.

- **Une seconde démo : Peyrusse-le-Roc, horizon d'un kilomètre** (`plan-demos/2.json`, source
  `deploy/plan-demos/2.json`). La place des Treize Vents avec un voisinage étendu à 1 000 m : 1 346
  objets, dont 1 065 parcelles et 280 bâtiments (142 avec leurs toits relus au LiDAR), le relief fin de
  la parcelle au pas de 0,5 m et le maillage secondaire de la vallée au pas de 5 m. La livraison copie
  le fichier à côté de `1.json` ; il s'ouvre comme l'autre démo.

- **« Fichier › Actualiser le projet… »** (`app/actualiserProjet.ts`). Met un projet à niveau d'un
  geste, comme s'il était importé aujourd'hui.
  - **Relu à l'IGN et recalculé** avec la version en cours : la parcelle, les bâtiments de la parcelle
    et du voisinage déjà présent, la végétation, la forme des toits (LiDAR), la couleur des toits et
    des murs, le relief (sur toutes les parcelles quand le plan a un voisinage) et le PLU.
  - **Remis aux valeurs par défaut** pour les objets importés : leurs couleurs, leurs textures, le
    gazon en 3D, la couleur des murs choisie, le mode de toit, l'apparence du voisinage et l'affichage
    du relief.
  - **Conservés** : les objets dessinés à la main, les noms et le masquage des objets importés, la
    clôture et ses portails, les réponses aux questions sur les toits à cheval, le plafond de points
    du relief.
  - Un dialogue dit ce qui va être fait avant de le faire, et Ctrl+Z rend le projet d'avant.
  - Les apparences d'import sont désormais définies à un seul endroit (`APPARENCES_IGN`, dans
    `geo/cadastreObjets.ts`) : l'import, l'actualisation du voisinage et cette commande les lisent.

- **Une pelouse sur la parcelle du projet en 3D** (`three/gazon.ts`). Par défaut, la parcelle est
  couverte d'un gazon dessiné, sans téléchargement : des milliers de brins de nuances différentes, plus
  sombres à la base et plus clairs à la pointe, quelques brins secs, une sous-couche de terre là où ils
  s'écartent, et un léger relief sous le soleil. Des variations lentes de teinte, tous les dix mètres
  environ, empêchent de voir la texture se répéter. Le gazon épouse exactement le contour de la
  parcelle et suit le relief maille par maille, au pas de la grille du sol. Il passe au-dessus de la
  photo aérienne sur la parcelle, sous les terrasses, les bâtiments et les chemins, et laisse passer un
  bassin. La case « Gazon (3D) » (section Apparence de la parcelle) le retire ; une texture horizontale
  choisie l'emporte sur lui. L'export GLB l'emporte avec sa texture.

- **De nouvelles couvertures en 3D** (`three/couverture.ts`, `MD/spec-toit-ign.md` §6.2) : tuiles
  plates sur les toits raides, tuiles canal sur les toits peu pentus du Midi, zinc à joints debout,
  gravillons sur les toits-terrasses, en plus des tuiles romanes et des ardoises. Le matériau de
  toiture des fichiers fonciers (BD TOPO) choisit d'abord : ardoise, zinc ou tuile, même quand la photo
  voyait la tuile grise. La pente choisit ensuite le modèle de tuile. Les facettes plates d'un bâtiment
  en corps ont leur propre toit-terrasse, et le zinc brille un peu.

- **Des textures pour les matériaux des murs** (`three/textureMur.ts`, `MD/spec-toit-ign.md` §6.6).
  Brique, pierre, meulière, béton, enduit et bois sont dessinés sans réseau, à l'échelle réelle et sans
  couture, puis teintés par la couleur des murs. Ils se posent en 3D et dans l'export GLB sur les murs
  dont la BD TOPO donne le matériau, pignons compris. Une texture choisie dans l'inspecteur l'emporte ;
  « Couleur du plan » et la case « Texture » les retirent.

- **La couleur réelle des murs** (`model/couleurMur.ts`, `render/couleurMurPhoto.ts`,
  `MD/spec-toit-ign.md` §6.5). Les murs prennent la teinte de leur façade lue sur une photo de rue
  Panoramax, quand une photo la montre sans clôture, haie, ombre ou autre bâtiment devant. Sinon, le
  matériau des fichiers fonciers donné par la BD TOPO s'applique à tous les bâtiments, à toute
  distance : pierre, meulière, brique, béton, enduit, bois. Dans « Apparence », le champ « Murs en 3D »
  permet de choisir à la main la photo, le matériau ou la couleur du plan, et dit d'où vient chaque
  couleur. Le matériau de la toiture départage aussi le repli d'un toit que l'orthophoto ne lit pas
  (ardoise et zinc gris, tuile vieillie brune).

- **Une question sur la toiture d'un bâtiment à cheval sur deux parcelles** (`model/aCheval.ts`,
  `app/toitsACheval.ts`, `MD/spec-toit-ign.md` §13.8). Quand le contour BD TOPO d'un bâtiment du
  projet ou d'une maison mitoyenne franchit une limite de parcelle, et qu'un toit lu sur le LiDAR
  passe par-dessus, Plan ne sait pas s'il voit un seul toit ou deux maisons mitoyennes. Il le demande :
  « Un toit ou deux ? », avec le bâtiment sélectionné sur le plan, les deux parcelles et leurs parts.
  « Un seul toit » garde le toit lu ; « Un toit par parcelle » relit un toit de chaque côté, arrêté à
  la limite. La réponse est mémorisée et réappliquée aux actualisations ; Ctrl+Z la défait ; Échap
  remet la question à la prochaine ouverture.

- **Les toits du voisinage en corps et pignons** (`MD/spec-toit-ign.md` §13.6) : une case « Toits en
  corps et pignons », cochée par défaut, dans la section « Voisinage (3D) ». À l'import et à
  l'actualisation IGN, les maisons voisines reçoivent elles aussi leurs corps, faîtages et pignons
  reconstruits sur le LiDAR : le calcul entier sur les parcelles mitoyennes (avec leur carte des
  hauteurs), une version allégée, dix fois plus rapide et sans garder la grille, au-delà ; un toit
  voisin sans corps lisibles (sous les arbres) garde sa forme simple ; décochée, la 3D revient aux
  formes simples.

- **La Vue 3D cadre par défaut la parcelle du projet et ses mitoyennes** (`model/mitoyennete.ts`) :
  avec un voisinage importé de 100 m, la caméra reculait au point de ne plus voir la maison ; elle
  se pose désormais au plus près de ce qui compte, la vue plongeante prise en compte, et le reste du
  voisinage se voit en reculant.

- **Les toits à croupes, et les maisons au contour de biais ou décalé** (`MD/spec-toit-ign.md`
  §13.7). Une maison dont le contour BD TOPO a un côté de biais n'avait pas de corps : la 3D
  montrait alors la surface brute du LiDAR. Son contour est maintenant mis à l'équerre (le biais
  devient une marche, au droit d'un autre sommet), coupé en tranches, et chaque tranche est lue par
  l'ajustement des formes simples, qui sait les **croupes** : deux pans, quatre pans, appentis,
  plat. En 3D, le bâtiment garde exactement la forme du plan, ses toits découpés sur lui. Un
  bâtiment dont le contour tombe à côté de son toit (plus de 12 % de non bâti dessous) est
  **recalé d'un bloc** sur le LiDAR, sur le plan comme en 3D, sans changer sa forme. Au 2 allée des
  Limites, parcelle AE 103 : deux toits à quatre pans (7,9 m et 6,3 m) et un toit plat à 3,5 m
  entre eux, la maison recalée d'un mètre vers l'ouest et de 1,75 m vers le sud. Les contours qui
  se découpaient déjà gardent leurs corps au centimètre près (AE 101, vérifié sur le relevé réel).

### Modifié

- **Les maisons voisines sortent de l'audit de la parcelle** (`MD/spec-audit.md` §12.1). La liste, le
  compteur, « Ce qui manque », la reconnaissance et l'analyse de Claude ne regardent plus que les
  bâtiments de la parcelle du projet ; la section « Bâtiments voisins, facultatif » disparaît. Les
  maisons voisines restent dans la scène comme obstacles à la vue. Une photo rangée chez un voisin par un
  ancien brouillon n'entre plus dans l'analyse.
- **Le rendu que Claude reçoit montre la façade entière**, du pied du mur au haut du pignon ou du pan
  (`three/renduPrise.ts`). Il était pris depuis la position de la photo, à 1,5 m, dans l'axe du
  téléphone : trop zoomé, il coupait le haut du mur et le toit. La caméra reste du même côté que la
  photo et recule (45 m au plus) jusqu'à ce que les quatre coins tiennent dans l'image ; la
  consigne de l'analyse (`deploy/prompt-analyse.md`) le dit, et précise que le rendu ne montre que les
  bâtiments de la parcelle et le sol (la scène épurée de l'audit : ni arbres, ni clôtures, ni voisins).
  `BANC_CLAUDE=1` les produit sur AE 101.
- **L'audit de la parcelle ne montre que le bâtiment** (`MD/spec-audit.md` §12.2 ; demande de
  l'utilisateur du 15 octobre, AE 101 au téléphone). Pendant tout l'audit, la Vue 3D est épurée : les
  bâtiments de la parcelle (et celui d'un mitoyen choisi dans sa ligne, le temps de le photographier)
  et le sol, avec les voiles rouge et vert des façades et votre position. Arbres, maisons voisines,
  clôtures de la parcelle et du voisinage, terrasse et objets d'échelle sont masqués, et reviennent à
  la fermeture de l'audit (`three/scene.ts::epurerVue3d`, un simple drapeau d'affichage : ni « projet
  modifié », ni Ctrl+Z, le projet n'est pas touché). Le doigt ne touche plus un objet masqué.
- **Une vue d'ensemble en grand angle pour choisir une façade** (`app/audit/parcelle/vuePrise.ts`).
  Tant que rien n'est visé depuis votre position (position en attente ou refusée, aucune façade
  devant vous), la Vue 3D montre tout le bâtiment audité, d'un peu haut, en grand angle (60°), dans ce
  que l'écran de prise laisse voir : chaque façade s'y touche. Ni la boussole ni le toucher ne la
  déplacent ensuite ; le doigt la tourne librement. La vue à hauteur d'homme reste celle de la prise
  (une position et une façade visée) : son champ s'élargit jusqu'à 75° pour que la façade visée y
  tienne en entier, et elle regarde la façade choisie, ou celle à laquelle vous tournez le dos. Une
  façade reconnue qui se perd garde cette vue 2,5 s, pour ne pas sauter à chaque pas. Une façade
  choisie sans position ne se montre plus depuis 8 m devant elle, trop près : la vue d'ensemble se
  tourne vers elle.
- **De près, le trait de la façade se renforce** (`three/traitDePres.ts`, `MD/spec-audit.md` §12.2 ;
  demande de l'utilisateur du 15 octobre). Pendant la prise, à moins de 4 m de la façade visée (ou
  quand elle déborde du champ le plus large), les arêtes du bâtiment visé (angles, bas et haut des
  murs, contours des ouvertures, rives et faîtage) se dessinent en traits épais et sombres, par-dessus
  le voile rouge ou vert sans le cacher ; le trait s'atténue en reculant et disparaît à 9 m. Couleur
  par le jeton `--trait-3d` (clair et sombre, modèles de palette compris) ; épaisseur en pixels par
  les lignes épaisses de three.js r128, chargées à la demande, un trait fin hors ligne. Jamais exporté.
- **Toutes les données du serveur dans `data/`, à côté de `public_html/`** (`deploy/donnees.php`,
  `buildsg/donnees.mjs` ; `MD/spec-demos-admin.md`). Démos (`data/demo/`, celles de la vitrine
  `?mode=demo` comprises), réglages de l'admin (`data/admin/` : palette, contrôleurs, échecs de
  connexion), journal et réglages de Claude (`data/claude/`), audits (`data/audits/`), conformité
  (`data/conformite/`) : un seul dossier, hors de la racine web, réglé par `dossierDonnees` (Node :
  `DATA_DIR`). Chaque audit a son dossier, classé pour s'y retrouver à la main :
  `data/audits/parcelle/<IDU>/<id>/` et `data/audits/promenade/<commune>/<id>/` (fichier tel qu'il est
  arrivé, fiche, conclusion lisible, analyses, images), avec un index qui se reconstruit. Une
  configuration d'avant (`dossierDemos` seul) garde l'ancienne disposition ; avec `dossierDonnees`,
  l'ancien `plan-demos/` est déplacé dans `data/` au premier passage, sans rien écraser
  (`data/migration.json`), et les audits rangés à plat sont classés. La livraison porte `data/demo/`
  et `donnees.php` ; la notice dit la marche à suivre (étape 2.e).
- **La fumée pilotée va plus vite et se règle** (`scripts/fumee.mjs`). Les parties se jouent à
  plusieurs à la fois (`FUMEE_PARALLELE`, par défaut une par tranche de quatre cœurs, quatre au plus) ; un passage
  peut se limiter à des classes d'écran et des thèmes (`FUMEE_CLASSES=large`, `FUMEE_THEMES=light`).
  Les longues attentes fixes (20 s, 18 s, 8 s, 3,5 s, 2,5 s) attendent désormais ce qu'elles
  attendaient : le voisinage importé, les tuiles posées, le zonage rangé, l'image 3D immobile.
- **Les points 12 à 15 de la fumée rejouent des données témoin sans réseau**
  (`scripts/fumee-reseau.mjs`, `tests/fixtures/fumee-reseau/`) : quand `data.geopf.fr` ne répond
  pas, les réponses enregistrées de la BAN, d'`apicarto` et de la Géoplateforme sont servies à sa
  place. `FUMEE_RESEAU=temoin|direct|enregistrer` force le mode. Le rejeu est fidèle à ce que le
  navigateur a reçu : l'enregistrement écoute sans intercepter, les échecs et l'autorisation CORS se
  rejouent tels quels, chaque réponse arrive après sa durée enregistrée (`FUMEE_LATENCE=0` l'ignore),
  et une requête sans témoin part sur le vrai réseau au lieu d'être inventée. Sans cela, la démo
  recevait en mode témoin des tuiles que l'IGN lui refuse, et le .glb du point 24 s'écartait du golden.
- **Un export .glb n'est plus disputé par le rendu** (`three/exportGlb.ts`) : la boucle d'animation de
  la Vue 3D se tait le temps de l'export. Sur un appareil lent, l'exporteur manquait son délai.
- **L'analyse des audits, le renfort des façades et l'aide immédiate passent par défaut au modèle
  plus fin (Sonnet)** au lieu du modèle rapide (Haiku), qui ne trouvait rien sur les photos d'un vrai
  audit (`MD/spec-audit.md` §13.2). L'escalade reste au plus fin des modèles admis, les cas candidats
  au modèle rapide. Le coût d'une parcelle passe de 1 à 2 centimes à **20 à 40 centimes** environ :
  les plafonds par défaut (1 $ par jour, 10 $ par mois) et l'estimation par requête sont à relever dans
  « Réglages ». L'administrateur peut revenir au modèle rapide usage par usage. *Défaut abandonné
  le 15 octobre 2026, voir l'entrée suivante.*
- **Tous les usages de l'analyse par Claude repassent par défaut au modèle rapide (Haiku)**
  (décision de l'utilisateur, 15 octobre 2026) : analyse des audits, escalade, renfort des façades,
  aide immédiate et cas candidats (`MODELE_PAR_USAGE` de `deploy/analyse.php` et
  `buildsg/analyseAdmin.mjs`). Le « rien trouvé » des audits venait du schéma que l'API refusait, pas
  du modèle (voir « Corrigé »). Le coût d'une parcelle revient à 1 à 2 centimes environ, dans les
  plafonds par défaut. L'administrateur passe un usage au modèle plus fin (Sonnet) dans « Réglages »
  › « Modèles » s'il le faut ; un réglage déjà posé garde son choix.

- **Audit de la parcelle, « Photographier en marchant »** (`MD/spec-audit.md` §12.2, demande de
  l'utilisateur) :
  - **Vue 3D qui suit** : la vue est à hauteur d'homme (1,7 m), 6 m derrière vous, le regard un peu
    vers le haut pour voir la façade entière. Elle suit votre position et votre cap : ce n'est plus
    une image fixe. Un doigt qui la fait tourner la garde 6 s, puis le suivi reprend.
  - **Façade visée en rouge** ; les façades déjà photographiées passent au vert. Elles restent
    reconnues et touchables, pour refaire une prise.
  - **Toucher une façade dans la Vue 3D la choisit** quand l'automatisme se trompe. Les messages
    sans position le proposent.
  - La promenade d'audit garde l'ambre pour la façade devant vous : son rouge est celui des
    bâtiments marqués.

- **Détection des ouvertures : les candidats** (lot L14 du plan de mise en œuvre,
  `MD/spec-facades-calage-detection.md` §9). L'écart à une seule teinte de mur ne suffisait pas : un
  soubassement en pierre, l'ombre du débord, des volets battants, la brique ou la meulière faisaient
  manquer des baies ou en inventaient. Sur le banc des façades, chaîne du relevé : rappel de 71 à
  90 %, précision de 84 à 93 %, corrections de 3,2 à 1,9 par façade ; les images d'origine restent
  justes au centimètre.
  - **Fond local** (`facade/detectionFond.ts`) : les objets nets mis de côté, un fond de rang (une
    bande de 50 cm sur toute la largeur : soubassement, bandeau, ombre du débord deviennent le fond de
    leur rang), puis un fond local par médiane glissante sur 1,5 m de large ; le seuil
    `max(28, 3 × écart médian)` se calcule zone par zone, et l'écart de teinte seule (chromaticité) a
    le sien, pour la pierre dont le grain relève le seuil.
  - **Filtre d'ombre** : un pixel plus sombre que son fond, de même chromaticité, n'est pas une baie ;
    une tache qui n'est qu'ombre n'est gardée que si ses tableaux sont des arêtes franches.
  - **Profils de contours** (`facade/detectionIndices.ts`) : soutien des arêtes sur les quatre côtés,
    baie séparée de ses volets battants par le profil de ses colonnes, affinage des bords sur le profil
    quand l'écart au fond ne dit rien.
  - **Fusion des indices et confiance** : une tache est gardée si elle remplit sa boîte, ou si ses
    quatre arêtes sont nettes ; sous 0,4 m², il faut les arêtes. La confiance de chaque ouverture
    combine remplissage, rectangularité, soutien des arêtes et part vue sur la photo.
  - **Réglages nommés** (`facade/reglagesDetection.ts`) : les filtres de taille et les seuils
    deviennent `facades.detection.*`, chacun avec sa raison, surchargeables pour le banc.

- **La grille du plan est masquée par défaut.** Le bouton « Grille » (menu Affichage) la montre, et
  le choix s'enregistre avec le projet. Un projet qui l'avait affichée en l'enregistrant la retrouve.

- **Vue 3D : le zoom suit la règle du plan 2D.** Chaque mouvement de molette rapproche ou éloigne
  du même rapport que sur le plan, quelle que soit sa taille. Au pavé tactile et à la souris à
  défilement libre, le zoom faiblissait à chaque pas (les petits pas de fin de geste ne zoomaient
  presque plus) ; un seul geste traverse maintenant le voisinage. Un clic sur + ou − divise ou
  double la distance (×0,8 et ×1,25 auparavant), et le pincement à deux doigts zoome deux fois plus.
  Le zoom arrière s'arrête avant que la scène ne sorte du champ.

- **Le rayon du voisinage va jusqu'à 1,5 km** (5 km auparavant), à la création d'un projet depuis
  une adresse comme à l'actualisation d'un projet existant. Au-delà, le plan, la Vue 3D et
  l'enregistrement s'alourdissaient pour un voisinage qu'on ne regarde pas ; à 1,5 km, le plafond de
  20 000 objets par famille ne joue plus que dans une ville très dense.

- **Vue 3D : la molette zoome vers ce que montre le curseur.** Elle rapprochait toujours du centre
  de la parcelle : sur un grand voisinage, impossible d'aller voir une maison au loin, et l'on finissait
  dans la pelouse du centre. Le point visé (un toit, un mur, le sol) reste maintenant sous le curseur ;
  on ne s'en approche pas à moins de 50 cm. Le centre de rotation reste au niveau du sol. Les boutons
  + et − et le pincement à deux doigts ne changent pas.

- **Le voisinage d'un import va jusqu'à 20 000 parcelles et autant de bâtiments** (10 000
  auparavant), les plus proches d'abord : sur un grand rayon en ville, il s'arrêtait avant le rayon
  demandé. Mesuré au Vésinet sur 2 km : 12 315 parcelles et 15 448 bâtiments, tout le disque, compte
  en 30 à 40 secondes, projet créé en 1 minute 40, 23,6 Mo avant la lecture des toits (environ 30 Mo
  une fois tous lus, sous la limite de 50 Mo de la plateforme). L'affichage et la Vue 3D sont plus
  lents sur un tel voisinage.

- **La lecture de fond s'efface devant vous.** Plan mesure en continu à quel point l'écran est
  occupé. Pendant que vous travaillez (un geste depuis moins d'une seconde et demie), une seule
  lecture de toit à la fois, avec au moins une image entre deux bâtiments. Au repos, la lecture
  reprend toute sa vitesse, et ralentit d'elle-même sur un poste lent ou quand la Vue 3D est chargée.
  L'enregistrement automatique attend que vous ayez fini votre geste.

- **Le zoom et le déplacement restent fluides sur un grand voisinage.** Pendant le geste, le plan
  déjà dessiné suit la molette ou les doigts ; il est redessiné au propre dès que vous vous arrêtez.
  Sur un voisinage d'un kilomètre (9 000 objets), une image sur vingt prenait plus de 3 secondes
  pendant un zoom ; elle en prend 33 millisecondes. Les objets hors de la vue et les poignées des
  objets non sélectionnés ne sont plus dessinés.

- **Sur grand écran, le plan prend toute la largeur libre.** Sa largeur est celle que la palette,
  l'explorateur et l'inspecteur laissent, mesurée, sans plafond à 1 600 pixels ; elle suit le
  redimensionnement de la fenêtre et l'ouverture ou la fermeture des panneaux. La marge autour de la
  parcelle à l'ouverture est proportionnée à la taille du plan.

- **Les toits du voisinage se lisent quatre fois plus vite en tâche de fond.** Sur un voisinage d'un
  kilomètre au Vésinet (5 240 bâtiments), forme et couleur sont lues en 9 minutes au lieu d'environ
  35. Chaque lecture prend le bâtiment suivant dès qu'elle a fini, sans attendre la plus lente d'un
  lot, et le plan se redessine toujours par paquets de 12. Quand la Géoplateforme répond qu'elle est
  trop sollicitée (quota par adresse IP), Plan attend le délai qu'elle demande et redemande, au lieu
  de mettre la lecture en pause 30 secondes.

- **Un projet avec un grand voisinage pèse environ 13 % de moins.** Les parcelles et bâtiments du
  voisinage n'écrivent plus les réglages d'un autre genre d'objet, posés par défaut à leur création
  (hauteur et couleur de clôture, hauteur de parasol, diamètre et couleur d'arbre), ni les attributs
  BD TOPO faux ; un corps de toit sans pignon n'écrit plus sa liste vide. Mesuré sur un voisinage d'un
  kilomètre : environ 1,3 Mo sur 9,8 Mo. Les projets d'avant se lisent comme avant.

- **Lecture des toits en tâche de fond, sans à-coups et presque deux fois plus rapide.** Mesuré sur
  un voisinage d'un kilomètre au Vésinet (5 240 bâtiments) : chaque lot redessinait tout le plan et
  toutes les zones, ce qui figeait l'écran 3 à 6 secondes et ramenait la lecture à 1,5 bâtiment par
  seconde. Seuls les bâtiments lus se redessinent maintenant, sur le plan et dans la Vue 3D (sans la
  rebâtir) ; la barre d'état et le menu suivent la progression sans redessiner le reste. L'écran ne
  se fige plus au-delà d'un à deux dixièmes de seconde (une seconde à chaque enregistrement
  automatique d'un projet de 9 Mo), et la lecture va à 2,5 bâtiments par seconde, couleurs comprises.

- **Vue 3D : l'heure et la date sous l'horloge, les réglages dans un tiroir.** Un clic sur
  l'horloge du canevas, maintenant toujours affichée, ouvre dessous le curseur d'heure et la date ; un
  second clic ou Échap les referme. Sur bureau, les autres réglages sont un tiroir replié sur une
  ligne de titre (« Réglages de la vue 3D ») ; ouvert, il glisse par-dessus le haut de la scène sans
  la redimensionner, et la scène gagne encore environ 90 px. Le cadre Terrasse (filaire, translucide,
  sol en coupe) ne s'affiche que si une terrasse est sélectionnée. Au doigt, la feuille des réglages
  garde ses thèmes.

- **Voisinage : jusqu'à 10 000 objets par famille** (parcelles, bâtiments…), au lieu de 2 000, les
  plus proches de la parcelle. La lecture prend au plus le double (20 000 entités par famille) pour
  garder les plus proches. Un plan aussi lourd s'affiche plus lentement et peut dépasser la taille
  qu'accepte la plateforme à l'enregistrement : l'avertissement du curseur le dit déjà.

- **Inspecteur : le titre nomme la fonction de l'objet** (« Bâtiment — Maison », pas « Polygone »).
  La ligne « Type » disparaît.

- **Vue 3D : les réglages tiennent sur une bande**, en quatre cadres par thème : Terrasse (filaire,
  translucide, sol en coupe), Scène (tous les objets, opaques, textures, ombres), Soleil, Points de
  vue. Le titre « Vue 3D » est retiré et « Plein écran » rejoint les boutons de caméra. Le détail de
  chaque case est dans son infobulle. La scène gagne environ 90 px de haut. Au doigt, la feuille
  des réglages garde les mêmes thèmes.

- **Affichage : l'entrée « Sections de l'inspecteur repliées » est retirée**. L'inspecteur ouvre
  toujours sa première section.

- **Voisinage masqué : tout le voisinage s'en va**. Les courbes de niveau et le sol 3D du paysage,
  les noms des rues (plan et 3D) et la photo du paysage suivent les parcelles et les bâtiments. Le
  sol 3D revient à la parcelle et à son calque.

- **« Actualiser le projet » recrée les bâtiments de la parcelle du projet.** Tous les bâtiments posés
  sur la parcelle, importés ou dessinés à la main, sont supprimés puis recréés depuis la BD TOPO, comme
  à un import d'aujourd'hui : contour, nom, hauteur, apparence, toit relu sur le LiDAR, couleur des
  murs. Un voisin que la BD TOPO rattache désormais à la parcelle devient l'un d'eux. La réponse à la
  question du toit à cheval suit le bâtiment. Si la BD TOPO ne répond pas, les bâtiments restent tels
  quels. Le dialogue l'annonce en premier, et Ctrl+Z rend le projet d'avant.

- **Voisinage étendu jusqu'à 5 km** (au lieu de 1 km), à l'import depuis une adresse comme à
  l'actualisation. Le disque se lit par paliers (200 m, 500 m, 1 km, 2 km, 5 km).
  - Au-delà d'un kilomètre, chaque famille (parcelles, bâtiments, végétation) se lit en disques
    croissants et s'arrête au premier qui atteint le plafond de 2 000 objets : on garde les plus
    proches, sans trou près de la parcelle.
  - **Le relief du paysage va jusqu'au rayon choisi**, même là où les objets se sont arrêtés au
    plafond. Une relecture du relief garde cet horizon. Cinq kilomètres tiennent au pas de 20 m sous
    le plafond de 400 000 points.
  - La Vue 3D voit le paysage jusqu'à son coin opposé : le plan lointain de la caméra suit le relief,
    plus seulement les parcelles affichées.
  - Au-delà d'un kilomètre, la note sous le curseur le dit.
  - Essai réel à Peyrusse-le-Roc à 5 km : 2 000 parcelles (jusqu'à 1,5 km environ), 2 000 bâtiments
    (jusqu'à presque 5 km), un relief de 501 × 501 points au pas de 20 m, en 45 s ; le fichier pèse
    7,3 Mo.

- **La démo (`1.json` et le projet de démonstration de l'application) est actualisée** comme l'est un
  projet par « Fichier › Actualiser le projet », et son voisinage est étendu à 100 m : 147 objets, dont
  112 parcelles et bâtiments voisins (56 avec leurs toits en corps), le relief LiDAR au pas de 0,5 m sur
  la parcelle et un maillage secondaire au pas de 2 m alentour, le gazon et les couleurs d'import par
  défaut. Les objets dessinés sont inchangés. Le chiffrage de la terrasse de la démo tient maintenant
  compte du relief (lambourdes 94 ml au lieu de 93, lames 269,4 ml au lieu de 267,5). Le témoin figé des
  empreintes (`DEMO_TEMOIN_OBJECTS`) ne bouge pas : `tests/fixtures/golden/` reste identique.

- **Relief : une grille fine sur la parcelle, un maillage secondaire pour le voisinage**
  (`geo/relief.ts`, `three/relief3d.ts`, `MD/spec-relief.md` §3.1). Avec « relief sur toutes les
  parcelles », la parcelle garde sa grille à son pas fin (0,5 m en LiDAR HD) au lieu de partager le pas
  du voisinage (5 m à Peyrusse-le-Roc) : la pente, le dénivelé et les hauteurs de plots restent
  précis. Le voisinage est lu dans une seconde grille, plus large, qui ne porte que le sol de la Vue 3D
  et les courbes du plan au-delà de la parcelle. Dans la section Relief de l'inspecteur, « Maillage
  secondaire » dit s'il est actif, avec son pas et son nombre de points ; la ligne « Grille » donne
  toujours le nombre de points ; « Points max » règle le plafond de points de chaque grille, appliqué
  à « Actualiser le relief » et à l'actualisation IGN. Le message d'un projet refusé pour sa taille
  propose de baisser « Points max ».

- **Relief sur un grand voisinage** (`model/relief.ts`, `MD/spec-relief.md` §3.1). La grille de relief
  monte à 400 000 points au lieu de 40 000, et son pas peut s'élargir jusqu'à 30 m au lieu de 5 m.
  Un voisinage de 500 m tient désormais au pas de 5 m : la vallée autour d'un village (Peyrusse-le-Roc)
  a son relief en 3D au lieu d'un sol plat. Au-delà de 30 m, la grille revient à la parcelle seule,
  comme avant au-delà de 5 m. Les grilles déjà enregistrées ne changent pas ; une nouvelle lecture
  d'une grande parcelle peut être plus fine qu'avant. La grille des hauteurs des toits garde son pas
  maximal de 5 m. Dans la section Relief de l'inspecteur, une ligne « Grille » dit le pas, le nombre de
  points, l'étendue couverte et la règle, et prévient quand le sol 3D est plat au-delà de la parcelle.

- **Inspecteur : une seule section ouverte à la fois** (`zones/Inspecteur.tsx`). Ouvrir une section
  replie les autres ; à l'ouverture, seule la première est dépliée (aucune avec la préférence
  « Sections de l'inspecteur repliées »). Le titre de l'inspecteur replie la section ouverte, ou
  rouvre la première. Passer d'un objet à l'autre garde la section laissée ouverte, ou ouvre la
  première de l'objet suivant s'il ne l'a pas.

- **Relief et courbes de niveau séparés** (`MD/spec-relief.md` §8). Le menu Affichage a maintenant
  deux entrées, « Relief » (le sol en relief de la Vue 3D) et « Courbes de niveau » (sur le plan), au
  lieu d'une bascule unique. La section « Relief » de l'inspecteur les présente dans le même ordre ;
  l'équidistance ne se montre qu'avec les courbes. Par défaut, le relief est montré et les courbes
  sont cachées. Le plan exporté (`plan.svg`) garde les courbes tant qu'elles n'ont pas été décochées
  explicitement : un export d'hier reste identique.

### Corrigé

- **Le rendu pour Claude ne dépend plus de l'inclinaison du capteur** (« le paramètre incliné ne
  fonctionne pas »). Cette inclinaison est celle que le capteur donne au retour de l'appareil photo,
  c'est-à-dire le téléphone retourné dans la main, pas au moment de la photo : elle n'est pas fiable
  (cause probable, non vérifiée sur un téléphone). L'inclinaison du rendu se déduit de la géométrie :
  la caméra vise le milieu de la façade, du pied du mur au haut du toit. La valeur du capteur reste
  notée avec la photo (« inclinée de … ° »), pour Claude comme avant.
- **L'écran des propositions de l'audit cachait la parcelle** (`zones/parcours/PropositionsAudit.tsx`,
  `MD/spec-audit.md` §14). Au doigt, une carte en bas haute au plus de 46 % de l'écran : le titre, le
  compte, « Avant / Après » et les boutons restent en place, la liste défile entre eux, et « Replier »
  la range. Sur un écran en largeur (bureau, tablette, téléphone couché), l'écran des propositions et
  celui de la prise deviennent un panneau à droite, qui ne couvre plus la barre du haut. La Vue 3D,
  épurée, cadre la parcelle et ses bâtiments dans ce que l'écran laisse voir (au-dessus d'une carte,
  à gauche d'un panneau).
- **Le plein écran de la Vue 3D laissait voir le titre de la parcelle à droite** (bureau). Le panneau
  plein écran gardait la largeur des panneaux (98 % de la fenêtre) : une bande restait à droite, où
  passait la fin du titre « Plan interactif — Parcelle … » et du lieu. Il couvre désormais toute la
  fenêtre, la visionneuse aussi, et la scène prend toute la hauteur sous le titre des réglages au lieu
  de laisser une bande vide en bas.
- **Le portail neuf se pose côté rue sur tous les chemins de création, plus sur un côté mitoyen**
  (AE 101, 2 allée des Limites : le portail tombait sur le côté de 39,5 m, mitoyen d'AE 100, au lieu
  de l'allée). Une seule règle (`geo/coteRue.ts::coteDuNouvelAcces`, `MD/spec-cloture.md` §2.1) sert
  désormais l'import, les boutons « Ajouter un portail / un portillon » et le portail vu sur place par
  l'audit de la parcelle : le côté dit sur rue ; sinon, parmi les côtés sans voisine, le plus proche
  du point d'adresse, puis celui que longe une rue lue (celle de l'adresse d'abord), puis le plus
  long ; sinon le plus long côté, comme avant, en évitant ceux dits séparatifs. Un côté est mitoyen
  dès 1 m de limite commune avec une voisine, ses coins mis à part (la règle de
  `model/mitoyennete.ts`) ; ce que vous avez dit d'un côté l'emporte. Trois chemins se trompaient :
  l'import depuis votre position, qui rangeait le point de l'appareil (dans le jardin) au lieu de
  celui de l'adresse la plus proche, et ignorait les mitoyennes non cochées ; l'audit de la parcelle,
  qui posait clôture et portail sur le plus long côté d'un projet sans portail ; le mode audit, sans
  voisines. L'explication du bouton dit le côté retenu et pourquoi. Un accès déjà posé ne bouge pas ;
  les empreintes ne changent pas.
- **Audit de la parcelle : l'analyse par Claude était refusée avant même de lire les photos**
  (AE 101, 15 octobre 2026 : « The compiled grammar is too large… » ; seules les mesures étaient
  proposées). Le schéma de la réponse partait en sortie structurée (`output_config.format`), que l'API
  compile en grammaire ; celle de l'analyse d'une maison dépasse sa limite, et chaque requête
  échouait. Le schéma part désormais à la suite du prompt, dans le même bloc en cache, et le serveur
  (`deploy/analyse.php`, `buildsg/analyseAdmin.mjs`, même règle) ramène la réponse à sa forme : le
  texte autour et un bloc de code sont laissés, les termes sont lus sans accents ni majuscules, un
  terme hors vocabulaire devient `indetermine`, un champ absent prend `indetermine` ou le vide de
  son type. Rien n'est inventé : un élément de liste à qui manque un nombre (numéro d'ouverture,
  cote, image) ou un terme sans `indetermine` est écarté, et une confiance absente est `faible`. La
  page reçoit la même forme qu'avant ; le renfort des façades suit la même voie. Les prompts passent
  en version 2 (le journal le dit pour chaque réponse). Relancer l'analyse d'un audit déjà fait.

- **Vue 3D, après le réalisme (R1 à R6) : les lames, le chemin, l'herbe et la promenade.**
  - *Les lames de la terrasse se voient à nouveau* (`three/scene.ts`, `ombrerSousLePlatelage`).
    L'éclairage par le ciel (R1) allumait les chants des lames, au fond des joints de 6 mm, aussi
    clair que leur dessus : le platelage se lisait comme une planche unie, avec un quadrillage pâle
    aux abouts. Les chants et la structure sous le platelage (solives, lambourdes, appuis) ne
    reçoivent plus qu'une petite part du ciel, comme en vrai. Réglage d'écran, absent du .glb.
  - *Le chemin passe au-dessus de la pelouse* (`three/primitives.ts`, `geometrieRubanDrape`). Sur un
    sol en relief, le ruban d'un chemin ne tenait le sol qu'à ses sommets, et ses triangles couraient
    sur plusieurs mètres : sur une bosse, l'herbe passait par-dessus. À l'écran, il est drapé sur le
    sol par mailles d'un demi-mètre, 2 cm au-dessus de l'herbe.
  - *Plus d'herbe dans la piscine, ni sous les objets* (`three/gazon.ts`, `empreintesAuSol` ;
    `model/fonctions.ts`, `occupeLeSol`). Le gazon de la parcelle passait sous tout et ne comptait
    que sur le tampon de gabarit pour s'effacer du bassin ; en qualité Soignée, l'occlusion rend la
    scène dans une cible sans gabarit, et la pelouse remplissait l'eau. Le gazon est maintenant
    percé de l'empreinte de chaque objet qui occupe le sol, par une seule règle : piscine (bassin,
    margelles, plage), terrasse, chemin, bâtiment, annexe, pergola, massif, dalle — pas l'arbre, le
    parasol ni le point de vue. Et la cible de l'occlusion garde son gabarit (`three/rendu.ts`) : le
    sol et la photo aérienne s'effacent aussi du bassin en Soignée.
  - *La promenade est plus longue et fait le tour de la maison* (`three/presentation.ts`). Chaque
    trajet durait 2,6 s, quelle que soit sa longueur : six points de vue faisaient vingt secondes.
    La caméra marche maintenant au pas (1,2 m/s, 4 s au moins par trajet, 2,5 s d'arrêt) ; après les
    points de vue enregistrés, elle fait le tour de la maison à hauteur d'homme au-dessus du sol en
    relief, à 3 m des murs (1,20 m au plus près), sans sortir de la parcelle ni entrer dans un autre
    bâtiment, le regard devant soi tourné vers la façade ; une maison collée à une limite est longée
    sur la part accessible. Entre deux points de vue que la ligne droite ferait passer à travers la
    maison, elle la contourne. La promenade marche aussi sans point de vue enregistré.
  - Aucun export ne change : le .glb garde le gazon entier et le ruban plat d'avant (ils ne partent
    plus qu'avec l'export, `EXPORT_SEULEMENT`), et les empreintes de `tests/fixtures/golden/` sont
    identiques. La marque `EXPORT_SEULEMENT` est retirée le temps de l'export : l'exporteur glTF
    écrit `userData` dans les `extras` des nœuds, et depuis les baies en creux (R2), le .glb d'un
    ordinateur portait dix-sept « exportSeulement » de plus que celui d'avant (comptes inchangés,
    580 octets de plus sur la démonstration).
- **Points 13, 14 et 15 de la fumée** : ils visaient une interface disparue (« Ajouter les parcelles
  adjacentes », `#pluInterrogerBtn`), et le 14 éteignait le fond orthophoto, allumé par défaut
  depuis la 2.2.0, en croyant l'allumer ; leur échec se confondait avec celui du réseau. Ils suivent
  la boîte « Actualiser depuis l'IGN » et la commande `plu.interroger` d'aujourd'hui, jouent sur les deux opacités de l'orthophoto, et comptent à
  part le voisinage dessiné (sur téléphone, une partie tombe hors du cadre).
- **Audit de la parcelle, l'analyse par Claude « ne trouvait rien »** (essai sur téléphone ;
  `MD/spec-audit.md` §13.2 et §14) :
  - **Ce que Claude voit sans que le projet sache l'écrire se lit enfin** : sous les propositions,
    bâtiment par bâtiment, en lignes d'information sans case (rien n'est écrit dans le projet) — la
    forme du toit vue face à celle du modèle, les pignons ou croupes aux bouts du faîtage, les
    lucarnes, les éléments (fenêtre de toit, garde-corps…), les volets et balcons de chaque façade,
    les ouvertures non détectées ou en trop, les écarts au modèle, et ce que le renfort a fait des
    ouvertures, par type (« 1 porte ajoutée, 1 fenêtre en pointillé »). Chaque ligne dit sur quelle
    image Claude l'a vue et la part des passes d'accord. Le vote les calculait puis les jetait.
  - **« Propositions de Claude prêtes » dit combien** : « 2 propositions et 7 observations », ou
    « Claude a répondu, mais n'a rien vu à proposer ni à signaler » au lieu d'un « prêtes » sur une
    liste vide.
  - **Le renfort des façades n'est plus perdu à la reprise d'un brouillon** : quand l'onglet est
    déchargé (le cas courant sur téléphone), le batch était souvent fini avant les mesures des
    photos, et un renfort vide restait noté pour toujours. Les réponses brutes du renfort sont
    gardées dans la capture, et chaque façade est recalée quand sa mesure est faite ; un brouillon
    déjà touché relit le batch au serveur une fois.
  - **Les ouvertures que Claude ajoute en pointillé sont proposées**, sur une ligne à part, décochée,
    qui dit « vue par Claude, non confirmée sur la photo » ; elles étaient calculées puis jamais
    montrées. Les baies devinées du relevé passent au renfort, qui les confirme au lieu d'en ajouter
    une seconde par-dessus.
  - **Plus de 40 images par requête, plus de batch refusé** : le serveur refuse toute la demande
    au-delà de 40 images ; la page s'arrête à 40 et garde d'abord l'orthophoto et la carte LiDAR, la
    meilleure photo de chaque façade (prise à la boussole) et son rendu, puis les autres. Un refus du
    serveur s'affiche avec son message (« Trop d'images dans une requête… ») au lieu de « répondu de
    travers ».
  - Le fichier de l'audit ne porte pas ces observations : son format n'a pas de place pour elles, et
    il n'a pas changé.

- **Audit de la parcelle, ce que l'essai sur le terrain d'AE 101 a montré** (`MD/spec-audit.md`
  §12.1 et §12.2) :
  - **La maison d'à côté n'est plus proposée** : la liste mettait votre maison et six mitoyens à
    égalité (33 façades, dont 19 chez les voisins). Seuls les bâtiments de la parcelle du projet
    comptent et sont reconnus ; les mitoyens sont rangés à part, repliés, facultatifs, et se
    photographient depuis leur ligne ou en touchant leur façade dans la Vue 3D.
  - **Les décrochés ne sont plus des façades** : les bouts de mur de moins de 1,5 m (14 « façades »
    pour la seule maison d'AE 101, dont des murs de 0,6 m) sont sur la photo du mur qu'ils décrochent.
  - **La position est lissée**, selon la précision annoncée par le GPS, et **ramenée sur la parcelle**
    quand elle tombe dans le jardin d'un voisin à portée de l'erreur.
  - **La boussole, téléphone debout** (Chrome Android) donne le cap de l'appareil photo, calculé sur
    les trois angles de l'orientation : le cap du haut du téléphone pouvait s'en écarter de plusieurs
    dizaines de degrés.
  - **La Vue 3D cadre la partie visible** au-dessus de l'écran de prise, qui cachait la moitié de la
    façade ; elle vise le milieu de la façade, ne recule plus au travers d'un mur ni derrière la
    clôture, et glisse d'une position à l'autre au lieu de sauter. Sans position encore, une façade
    choisie se montre depuis huit mètres devant elle.
  - **Le voile monte jusque sous le toit**, étage compris, et suit le haut du mur (une aile basse,
    puis l'étage). **Une façade photographiée est verte, même visée** : rouge sur vert donnait du
    brun ; le rouge ne dit plus que « à photographier ».

- **Audit de la parcelle, « Ce qui manque »** (lot G18 bis) : deux façades de même orientation
  (« façade est de Maison : pas de photo » deux fois, sur une maison en L) ne donnent plus deux
  lignes de même clé React. Chaque ligne a pour clé ce qui manque (bâtiment et côté pour une
  façade), et non son texte ; la console reste propre.
- **Déploiement SiteGround** (lot G18 bis) : `buildsg/` est resynchronisé par `npm run buildsg`.
  Son `htaccess.template` avait perdu les routes de l'analyse par Claude, des audits partagés et de
  la consommation, et le passage du jeton de la plateforme ; le prompt et le schéma de l'analyse
  étaient en retard. Un test (`tests/unit/buildsg/synchro.test.ts`) compare désormais chaque
  fichier de `deploy/` recopié dans `buildsg/deploy/` à son original.

- **Une baie posée sur une haie plus large qu'elle n'est plus lue « cintrée »** (lot G17). La
  détection prenait la tache en T (le haut plat de la haie, puis la fenêtre au-dessus) pour un arc :
  un arc ne fait de marche franche que tout près des tableaux (`facades.classement.cintreBordPart`,
  `cintreMarcheMaxPart`). Les faux « cintre » des scènes 07 et 17 du banc disparaissent ; aucune autre
  valeur du banc ne bouge, et les deux vraies baies de forme de la scène 20 restent lues.
- **Au téléphone, l'élévation du relevé garde sa hauteur quand la fiche d'une ouverture s'ouvre.**
  Elle se retrécissait dans la colonne qui défile jusqu'à zéro de haut : plus aucune ouverture ne se
  touchait sans refermer la fiche.

- **Sur tablette, les entrées du panneau Projet se touchent de nouveau.** Le voile transparent qui
  referme le panneau au toucher ailleurs passait au-dessus de lui : toucher « Actualiser le
  projet… » ou toute autre entrée refermait le panneau sans rien faire. La barre haute passe
  au-dessus du voile, comme au téléphone.

- **Relevé** : dans la colonne du relevé, le bandeau des photos et les choix segmentés ne se tassent
  plus quand la photo remplit l'écran (ils étaient écrasés à 1 440 px).
- **Relevé** : une photo déjà corrigée de la distorsion du grand-angle n'est plus corrigée une seconde
  fois quand la recherche des coins est relancée.

- **L'enregistrement ne fige plus l'écran sur un grand projet.** Sur un voisinage d'un kilomètre
  (8 Mo), chaque enregistrement bloquait l'interface en une tâche de 0,5 à 0,8 s, suivie de deux
  autres d'environ 0,2 s : le projet était sérialisé deux fois et écrit en texte deux fois, d'un
  seul tenant. Il l'est désormais une seule fois, par paquets de 400 objets, en rendant la main
  entre deux, et part tel quel au serveur. Il reste une seule tâche d'environ 0,1 s. Une
  modification faite pendant l'enregistrement laisse le projet « à enregistrer ».

- **Fumée pilotée : les gestes sur la terrasse de démonstration se rejouent.** La démonstration
  s'ouvre sur tout son voisinage, où les poignées se superposent : les points 1 à 5, 10 et 11
  échouaient dans les trois classes d'écran sans que l'application soit en cause. Le script cadre
  désormais l'objet visé, ou la parcelle quand le point vise deux objets (`scripts/fumee.mjs`). Le
  point 12 (import depuis une adresse) attend que la création se termine, 12 à 24 secondes avec la
  lecture des premiers toits, au lieu de relire l'état au bout de 5 secondes.

- **Après « Actualiser le projet » ou une actualisation IGN, l'écran se met à jour**. Le plan, la
  Vue 3D ouverte et la photo aérienne sont redessinés ; il fallait cliquer sur 2D ou 3D.

- **Un faîtage posé en travers du toit** (`facade/toitCorps.ts`, règle `GAIN_SENS`), vu sur AD 128 au
  Vésinet : deux pans sur la longueur, le toit relevé pour deux fenêtres d'étage. Le calcul des corps
  écartait ce qui dépasse le pan, prenait le vrai toit pour deux pignons et posait un toit écrasé à
  7,3 m en travers. Quand la lecture des formes voit le faîtage dans l'autre sens et explique
  nettement mieux la mesure, elle l'emporte : AD 128 a maintenant son faîtage à 8,9 m dans la
  longueur, au milieu, de près comme de loin (voisin complet ou allégé). Sur les villages de référence,
  deux ailes d'Hucqueliers et deux corps de Saint-Rémy changent aussi, rien à Gordes ; AE 101 ne bouge
  pas.

- **Toits en corps sur un contour de biais : plus de trous** (`three/toitCorps3d.ts`,
  `facade/toit.ts`), vus sur AE 103, le voisin d'AE 101.
  - Les croupes perdaient des morceaux : un sommet posé sur le contour sortait deux fois de la coupe,
    et la triangulation retirait alors un sommet au hasard. Le petit quatre-pans perdait 15 m² de
    toit ; on voyait le dessus du prisme à travers.
  - Entre un corps haut et un toit plus bas (le grand quatre-pans, égout à 4,9 m, contre la terrasse
    à 3,7 m), le mur manquait : on voyait le vide sous l'égout. Les murs entre corps montent
    maintenant de l'un à l'autre.
  - Sur les démos (56, 142 et 142 bâtiments en corps), AE 103 était le seul touché ; plus aucun pan
    incomplet.

- **Voisinage étendu : plus de bâtiment en double sur la parcelle du projet.** Le bâti posé sur la
  parcelle (importé avec elle ou dessiné) n'est plus repris comme voisin.
- **Actualisation : plus d'objets « absents » au-delà de 80 par couche.** La relecture de la BD TOPO
  pagine toujours ; un plan de 58 bâtiments voisins perdait les derniers à chaque actualisation.

- **« Impossible de créer le projet : Maximum call stack size exceeded »** avec un grand voisinage
  et le relief (2 allée des Limites, 490 m). Le maillage secondaire du relief dépassait 120 000
  points, et la plus petite altitude se cherchait par `Math.min(...valeurs)`, qui passe chaque valeur
  en argument et fait déborder la pile. Les minimums et maximums des grilles se cherchent maintenant
  par une boucle (`util/tableaux.ts`, `minimum`, `maximum`), comme le cadrage sur tout le plan.

- **« Utiliser ma position » à l'import** : le champ affichait « Position 48.904964, 2.132627 », que
  Rechercher ne comprenait pas. L'API Adresse (`api-adresse.data.gouv.fr`), dépréciée depuis le
  31 janvier 2026, refusait par intermittence le géocodage inverse au navigateur (pas d'en-tête CORS).
  L'adresse et la recherche passent désormais par le géocodage de la Géoplateforme
  (`data.geopf.fr/geocodage`), même format. Sans adresse connue, la parcelle se cherche quand même
  sous le point, et Rechercher comprend les coordonnées précédées d'un mot (« Position … »).

- **Les boutons « Relief » et « Courbes de niveau » sont enregistrés avec le projet**
  (`MD/spec-relief.md` §4). Ils restaient sans effet sur le fichier enregistré : en préférences
  d'affichage pures, ils ne marquaient pas le projet modifié, et le réglage se perdait si rien d'autre
  n'était enregistré. Ils marquent maintenant le projet à enregistrer (toujours sans Ctrl+Z, et
  permis en lecture seule, où rien n'est enregistré), comme l'équidistance. Les courbes de niveau
  ont aussi un liseré clair : sur la photo aérienne, le trait brun fin se perdait.

- **Plus de pignons en double sur les pavillons d'une longère** (`facade/toitCorps.ts`, Hucqueliers) :
  une aile presque entièrement sous un rectangle plus grand du contour n'est plus coupée en bandes de
  2 m aux pentes du toit qui la couvre, tant que son toit entier tient la mesure ; une bande de moins
  de 3 m recouverte à plus de 90 % par les autres corps est retirée. Sur quatre villages, 4 à 12 % de
  corps en moins, sans toit perdu. AE 101 est inchangé.

- **Un toit complété sur le contour ne déborde plus sur la cour ni sur une annexe** (`facade/toitCorps.ts`,
  village d'Hucqueliers) : un toit n'avance que sur une bande de bâtiment vraiment sans toit (10 % au
  moins), pas sur la lisière qu'une aile de biais laisse le long de sa voisine, suivie jusque-là sur 5 m
  avec un égout à −1,3 m ; il s'arrête avant qu'un égout ne passe sous 2 m, et ne couvre pas une partie
  mesurée à plus d'un mètre sous son égout (l'annexe basse d'une maison garde son appentis). AE 101 est
  inchangé.

- **Les toits de Provence** (`MD/spec-toit-ign.md` §13.7). Revue de trois quartiers : le centre ancien
  de Gordes, une entrée de ville de Saint-Rémy-de-Provence et un quartier d'Aix-en-Provence. Les
  maisons de village aux angles non droits, qui ne se découpent pas en rectangles, reçoivent un toit
  lu sur le rectangle qui les englobe et découpé sur leur contour. Le toit à un pan y est admis en
  dernier recours quand il explique nettement mieux la mesure qu'un toit à faîtage. Gordes : 52
  bâtiments sans toit construit avant, 13 après (dont 9 sans assez de mesures). Sans corps, la 3D
  montre désormais un toit construit plutôt que la surface brute du LiDAR (le château de Gordes
  n'est plus un relief en vagues) ; « Tel que mesuré » reste proposé. Un appentis n'a plus de pignon
  « depuis le faîtage ». AE 101 ne change pas.
- **Un toit n'est plus coupé en morceaux par la pente de ses pans** (`MD/spec-toit-ign.md` §13.2) :
  la coupe aux marches de hauteur prenait la pente forte d'un pan pour une marche. Le bloc principal
  d'AE 98 devenait un deux-pans à 8,4 m d'égout et un appentis de 2,3 m à pignon ; sa voisine
  mitoyenne, un pavillon coupé en trois bandes de 1,5 à 2,6 m. Un seul toit, lu par les formes
  simples sur le rectangle entier, l'emporte quand il explique la mesure presque aussi bien (et plus
  largement quand un morceau fait moins de 3 m de large). AE 98 : un deux-pans à 9,6 m et l'appentis
  de son annexe ; sa voisine, un deux-pans à 9,8 m. AE 101 ne change pas. Puis la règle passe à la
  continuité de la couverture : quand le saut au côté commun de deux blocs n'est que la pente d'un pan
  (moins de 60 cm d'une cellule à l'autre), c'est le même toit. Revue des 57 maisons du voisinage
  d'AE 101 : 117 corps avant, 105 après, plus de grand toit débité en bandes.
- **Les toits à un pan** (`MD/spec-toit-ign.md` §13.2) : la reconstruction lit deux pans, quatre
  pans, un pan et plat, à une seule règle pour ce qui est plat (moins de 30 cm de montée ou de 3°).
  Un appentis n'a plus de faux petit pan de 25 cm contre son mur haut. Un appentis de 6 à 10° n'est
  plus aplati par la lecture des formes simples (qui suivait la règle de la BD TOPO, plat sous 10°).
  Il déborde aussi au-delà de son mur haut. Et une maison que le modèle des corps ne lit pas garde
  la lecture des formes.
- **Les toits à quatre pans des maisons au contour droit** (`MD/spec-toit-ign.md` §13.2) : le modèle
  des corps n'a que des pignons de bout, et lisait un quatre-pans en appentis presque plat (AE 100 :
  5,5 m au lieu de 7,7 m). Chaque corps sans pignon est maintenant comparé à la lecture des formes
  simples, qui sait les croupes ; elle l'emporte quand elle explique la mesure nettement mieux
  (écart symétrique tombé aux quatre cinquièmes). AE 100 : quatre pans, faîtage 7,7 m, égouts
  4,6 m ; AE 101 ne change pas. Et un bâtiment dont toute la mesure est la cime d'un arbre (plus de
  3 m au-dessus de sa hauteur BD TOPO) ne garde ni surface mesurée ni hauteur tirée d'elle.
- **Plus de tour au milieu du voisinage** (`MD/spec-toit-ign.md` §13.6) : un abri de jardin de 11 m²
  (2,70 m dans la BD TOPO), à côté d'AE 101, était sous un grand arbre ; le LiDAR mesurait la cime,
  et ses corps montaient à 15 m. Un corps dont l'égout dépasse de plus de 3 m la hauteur BD TOPO du
  bâtiment est maintenant écarté : c'est un houppier, pas un toit. Sans corps restant, le bâtiment
  garde sa forme simple.
- **Plus de bout de maison sans toit le long d'un côté de biais** (`MD/spec-toit-ign.md` §13.7) : la
  marche qui remplace le biais laissait, d'un côté, un triangle du bâtiment qu'aucun corps ne
  couvrait (AE 103, à côté de l'aile à 6,3 m). Chaque corps s'étend maintenant jusqu'à couvrir ce que
  le contour a de libre, le plus haut d'abord, en gardant sa forme et ses pentes (le faîtage
  s'allonge, croupes et hauteurs restent) ; le dessin le découpe sur le contour.

- **Une roue d'attente au centre de l'écran** pendant la création d'un plan depuis une adresse et
  pendant l'actualisation IGN, avec l'étape en cours (« Forme des toits sur le LiDAR HD… »,
  « Actualisation IGN : la couleur des toits sur l'orthophoto… ») : ces travaux durent plusieurs
  dizaines de secondes, et rien ne disait qu'ils avançaient une fois le dialogue refermé. Elle ne
  bloque rien (le pointeur la traverse) et ne tourne pas quand le système demande moins de
  mouvement (`shell/attente.ts`, `zones/Attente.tsx`).
- **Corps et pignons, reconstruits sur le LiDAR** (`MD/spec-toit-ign.md` §13), le nouveau toit par
  défaut des bâtiments de la parcelle du projet : la surface mesurée est lue comme un couvreur la
  lirait — des corps (coupés aux marches de la couverture, dès 80 cm, et là où deux toits expliquent
  nettement mieux la mesure qu'un seul), chacun son faîtage placé où la mesure le met, deux pans qui
  ont chacun leur égout aux hauteurs de leurs murs, et les **pignons qui partent du faîtage** pour
  venir dresser leur triangle sur la façade. Au 2 allée des Limites : un corps principal à 7,6 m et
  ses deux pignons sur la façade sud-est, l'annexe à 4,3 m, l'aile à 4,5 m. Le grand pan est entaillé
  le long des noues des pignons ; les débords n'existent que sur les façades ; les fenêtres suivent
  la hauteur de chaque mur, avec une fenêtre dans chaque pignon. « Tel que mesuré » reste proposé.
- **La carte des hauteurs** dans la section « Façades et toit », sous « Toit en 3D » : ce que le
  LiDAR a vu, du bleu au rouge, dans l'axe du bâtiment, et par-dessus les corps, leurs faîtages et
  les pignons, avec une légende.

- **Le toit tel que le LiDAR le mesure** (`MD/spec-toit-ign.md` §12) : pour les bâtiments de la
  parcelle du projet, la grille du MNH LiDAR HD (50 cm) est gardée, nettoyée des arbres, des
  cheminées et des trous, et la Vue 3D la dessine en surface, posée sur les murs à l'égout de chaque
  corps, avec une rehausse en couleur de mur là où un pignon ou un dessus plat monte au-dessus de
  l'égout. Un toit compliqué — un pan raide et un dessus presque plat, une aile basse à un pan, un
  faîtage décentré — ressemble enfin à la maison. Les formes simples restent pour le voisinage et
  comme repli sans LiDAR. Le bilan de l'import les compte (« gardé(s) tel(s) que mesuré(s) »).
- **Un toit par corps de bâtiment** (§11) : sur la parcelle du projet, un contour en L, en T ou en U
  est découpé en corps (rectangles maximaux, à l'équerre, décrochés de moins de 1,2 m lissés),
  chacun son toit simple, son égout et son débord ; après la lecture LiDAR, chaque corps est ajusté
  sur les mesures qui tombent dedans. Sans LiDAR, c'est ce que la 3D montre par défaut.
- **Des blocs par les hauteurs mesurées, et des murs qui n'ont pas tous la même hauteur** (§11.2) :
  avec la surface LiDAR, chaque rectangle — même le seul d'une maison rectangulaire — est recoupé
  là où la couverture fait une marche d'au moins 1,5 m (un corps à deux niveaux et une annexe à un
  seul, un toit-terrasse accolé à un toit en pente), et chaque bloc prend l'égout et la hauteur de
  chacun de ses murs là où la couverture le rejoint. Les fenêtres montent avec leur mur : deux rangs
  sur le mur qui va jusqu'au dessus plat, un seul sous le pan ; l'inspecteur dit « murs de 3,9 à
  7,2 m ». La surface mesurée est ombrée par facettes : un pignon qui avance depuis le faîtage se
  lit comme des pans, non comme une bosse.
- **« Toit en 3D »** dans la section « Façades et toit » de l'inspecteur : « Tel que mesuré
  (LiDAR) », « Un toit par corps », « Un seul toit » — avec une ligne qui décrit la mesure (égout,
  faîte, grille) ou chaque corps. Les réglages du toit unique ne se montrent qu'en « Un seul toit ».

- **Nom des rues** (`MD/spec-rues.md`) : une case « Nom des rues » dans la section « Voisinage
  (3D) » de la parcelle. Cochée, le nom des rues voisines s'écrit le long de chaque voie sur le plan,
  et au sol de la Vue 3D. La première fois, les rues sont lues à l'IGN (BD TOPO, noms de la Base
  Adresse Nationale, 250 m autour de la parcelle) et enregistrées dans le projet, en un pas
  annulable ; « Relire les rues (IGN) » les met à jour. Le nom se pose au milieu de ce qu'on voit de
  la rue, jamais la tête en bas.

- **Arbres : des feuilles de près.** Quand la caméra approche d'un arbre (moins de 30 m), de petites
  feuilles couvrent son houppier — des aiguilles sur un conifère —, chacune son orientation et sa
  nuance, en une seule maille instanciée par arbre ; elles tombent avec le feuillage d'un caduc en
  hiver et ne changent pas l'ombre. À l'export GLB, que la version de three.js en place ne sait pas
  écrire en instances, elles sont converties en maille ordinaire pour les arbres proches du centre
  (12 000 feuilles au plus) : la visionneuse et la réalité augmentée les montrent aussi
  (`MD/spec-arbres-3d.md` §3.1).

- **Des arbres qui ressemblent à des arbres en 3D** (`MD/spec-arbres-3d.md`) : un tronc conique,
  des branches, un houppier en lobes selon le **port** (rond, étalé, colonnaire, conique,
  parasol), coloré en deux tons, propre à chaque arbre et stable d'une ouverture à l'autre ; une
  **essence** caduque ou persistante — un caduc est nu de novembre à mars, à la date de l'étude
  d'ensoleillement, et son ombre sur la terrasse change avec la saison. Rien n'est chargé, l'export
  GLB et la réalité augmentée emportent l'arbre tel qu'il est vu. Les arbres importés de la BD TOPO
  reçoivent port et essence d'après la nature de la zone (conifères en cônes persistants). Section
  « Arbre » de l'inspecteur : Port et Essence.

- **Relevé de façade : trois méthodes, expliquées.** Après le choix du mur, une étape « Choisir la
  méthode » présente, en deux phrases chacune, la **photo de rue** (Panoramax : des photos libres
  prises depuis la rue par OpenStreetMap France et l'IGN, cherchées autour du mur, les plus proches
  et les plus de face d'abord ; un panoramique est recadré sur le mur ; la distance au mur vient de
  la position de la photo), la **caméra guidée** (comme avant) et l'**import d'une photo** déjà
  prise. Au téléphone, la **boussole** propose le mur qu'on a devant soi sur l'écran du choix du mur
  (`MD/spec-releve-facade.md` §4.2 et §4.3).

- **« Voir chez vous (réalité augmentée) »** dans la visionneuse GLB : le modèle 3D de la terrasse
  se pose grandeur nature dans l'image de la caméra d'un téléphone ou d'une tablette — dans la page
  sur Android (Chrome), dans Quick Look sur iPhone et iPad (Safari). Rien n'est téléversé : le
  modèle reste dans le navigateur. Sur un ordinateur, le modèle se montre et le conseil dit sur quoi
  l'ouvrir (`MD/spec-ar.md`).

- **Un ouvrage neuf naît là où on le construirait**, plus au centre de la parcelle : la terrasse
  contre la façade au soleil de la maison, la pergola et le parasol sur la terrasse (sinon là où elle
  irait), la piscine au jardin (à 3 m des limites, hors de l'ombre de la maison, au sud), le carport
  près de la rue. La place libre la plus proche est prise ensuite, comme avant. Sans maison ni rue
  connue, le centre de la parcelle vaut toujours (`MD/spec-placement.md`).

- **Le portail se pose côté rue, deviné.** Quand aucun côté n'est dit sur rue, le plan devine le
  côté rue : le plus proche du point d'adresse (posé sur la voirie devant la porte), sinon le plus
  long des côtés sans parcelle voisine accolée. Le bouton « Ajouter un portail » dit quel côté il
  retient, et le champ « Limite » d'un côté non précisé note ce que le plan devine
  (`MD/spec-cloture.md` §2.1).

- **« Voisinage (3D) » : un groupe de réglages sur la parcelle du projet** (inspecteur, section
  repliée) qui rassemble tout ce qui décide de l'apparence des maisons voisines dans la Vue 3D :
  les **murs** (couleur du plan, une couleur, ou une nuance tirée au hasard entre deux ou trois couleurs
  pour casser l'uniformité),
  les **vitres** (une couleur, ou une nuance entre deux), les **fenêtres** (largeur, hauteur et
  entraxe, chacun entre un minimum et un maximum tirés par maison), et les **clôtures du voisinage**
  (afficher, type palissade / grillage / haie / mur, couleur). La case « Clôtures du voisinage » des
  réglages de la Vue 3D a rejoint ce groupe. Préférences d'affichage, enregistrées avec le projet ;
  rien n'est écrit sur les parcelles voisines. Les défauts sont le rendu d'avant
  (`MD/spec-toit-ign.md` §6.4).

- **« Fenêtres (3D) » sur un bâtiment du projet** : la section règle les fenêtres que la Vue 3D
  dessine sur les murs sans relevé de façade. « Toutes pareilles » : largeur, hauteur, hauteur
  d'appui, entraxe et couleur des vitres, communs. « Une par une » : la liste part de la disposition
  automatique, et chaque fenêtre ou porte se déplace sur son mur, se taille, change de mur ; on en
  ajoute, on en supprime, on revient à l'automatique. Ces réglages écrivent le projet (Ctrl+Z) et se
  retrouvent dans l'export GLB (`MD/spec-toit-ign.md` §6.3).

- **« Clôtures du voisinage » dans les réglages de la Vue 3D**, cochée par défaut. Elle
  pose un grillage léger et translucide sur les limites des parcelles voisines, pour situer le projet
  dans sa rue : chaque limite une fois, pas sur la limite commune avec la parcelle du projet quand
  elle a sa clôture, en suivant le relief. Préférence d'affichage seulement : rien n'est écrit sur les
  parcelles voisines ; décochée, le grillage disparaît (`MD/spec-cloture.md` §4.1).

- **L'import depuis une adresse part de votre position.** À l'ouverture du dialogue, Plan demande
  la position de l'appareil (le navigateur demande la permission la première fois). Précise à 50 m
  près, elle désigne la parcelle sous vos pieds : l'adresse la plus proche s'écrit dans le champ et
  la parcelle est cherchée sous le point GPS, pas sous le point d'adresse posé sur la voirie. Moins
  précise (un ordinateur situé par son réseau), l'adresse est seulement proposée, à vérifier. Un
  refus reste silencieux ; une adresse tapée entre-temps a la priorité. Le bouton « Utiliser ma
  position » relance la lecture à tout moment. Le serveur autorise désormais la géolocalisation au
  site lui-même (`Permissions-Policy: geolocation=(self)`, `.htaccess` et serveur Node).

- **La forme des toits mesurée sur le LiDAR HD de l'IGN.** À l'import depuis une adresse et à
  l'actualisation IGN, après la couleur des toits, Plan lit le modèle numérique de hauteur (MNH,
  grille de 50 cm) sous chaque bâtiment et y ajuste la forme qui l'explique le mieux : toit plat,
  croupes, deux pans ou quatre pans, dans l'axe du plus long mur ou en travers — avec la hauteur du
  faîtage et celle de l'égout mesurées, là où la BD TOPO les devinait à un mètre près et ne
  connaissait pas les pignons. Un arbre ou une cheminée qui déborde sur le toit est écarté ; un toit
  que rien de simple n'explique garde sa forme BD TOPO. Les bâtiments les plus proches de la
  parcelle d'abord (150 au plus, 20 s), sans dalle LiDAR rien n'est lu. Les toits lus sur une photo
  ou saisis ne sont pas touchés. L'inspecteur dit « ajustée sur le LiDAR HD de l'IGN »
  (`MD/spec-toit-ign.md` §10).

- **Des bâtiments qui ne sont plus des cubes avec un chapeau (Vue 3D et export GLB).** Chaque
  bâtiment reçoit, sans donnée nouvelle : un débord de toit de 40 cm dans le prolongement des pans,
  avec son épaisseur, sa sous-face et l'ombre sous l'égout ; une gouttière le long des égouts ; les
  arêtes des murs en trait fin (aucun trait sur le toit, dont les pans se lisent par la lumière) ; un soubassement plus sombre ; des fenêtres régulières à
  chaque niveau (le nombre d'étages de la BD TOPO, sinon la hauteur) et une porte au rez-de-chaussée
  du plus long mur, sauf sur un mur photographié ; une cheminée sur un toit en pente. Au-delà de
  120 m du centre de la scène, seuls le débord et les arêtes : un voisinage de deux mille bâtiments
  reste fluide. La structure du GLB exporté change (témoin recapturé, `EMPREINTES.md`) ; aucune
  quantité ni aucun autre export ne bouge (`MD/spec-toit-ign.md` §6.3).

- **La taille du projet après l'heure d'enregistrement.** La barre d'état dit « Enregistré à 10:42
  (820 Ko) » : la taille de ce qui part à la plateforme, pour voir venir sa limite avant qu'elle ne
  refuse le projet. Si l'enregistrement échoue, la taille est mise à jour quand même : « Échec de
  l'enregistrement (2,4 Mo) » remplace l'heure du dernier succès (« Échec (2,4 Mo) » au téléphone),
  et le message d'erreur la reprend, jusqu'au prochain enregistrement réussi.

- **« Fichier › Supprimer le voisinage… ».** Retire d'un coup tous les objets du voisinage
  (parcelles, bâtiments, végétation — voisinage étendu de l'import comme « Ajouter le voisinage » de
  l'actualisation IGN), et les cotes qui s'y appuient. Masquer le voisinage ne l'enlève pas du
  document ; le supprimer allège le projet. Confirmation d'abord, une seule étape d'annulation
  (Ctrl+Z), refusé en lecture seule, grisé quand le plan n'a pas de voisinage.

- **« Affichage › Relief ».** Une entrée du menu Affichage montre ou cache d'un geste les **courbes de
  niveau** du plan et le **sol en relief** de la 3D. Elle est cochée quand les deux sont montrés ; si
  un seul l'est, un clic montre les deux. Elle n'apparaît qu'une fois le relief lu. C'est une
  préférence d'affichage, comme les deux cases de la section Relief de l'inspecteur : pas de Ctrl+Z,
  pas de « projet modifié », permise en lecture seule, retrouvée à la réouverture.

- **Relief à l'import et à l'actualisation IGN.** « Nouveau plan depuis une adresse » (étape 3, et
  résumé de l'import direct) et « Actualiser depuis l'IGN » proposent une case **« Relief du terrain »,
  cochée par défaut**, et sous elle **« Relief sur toutes les parcelles »**, cochée aussi : la grille
  couvre alors les parcelles voisines du plan, tout en restant rangée sur la parcelle du projet. Si
  ces parcelles dépassent un pas de 5 m, la grille revient à la parcelle du projet et ses abords.
  À l'import, un relief que l'IGN ne rend pas ne bloque pas la création : le plan arrive plat.
  Les cases disparaissent sans la capacité `plan.relief`.

- **Voisinage étendu au curseur, compté avant l'import, et import direct.** Le voisinage étendu se
  règle au **curseur, de 10 à 200 m** par pas de 10, à l'étape 3 de « Nouveau plan depuis une adresse »
  comme dans « Actualiser depuis l'IGN » : une case « Ajouter tout le voisinage dans un rayon de… » puis
  le curseur. Le disque de 200 m est lu une fois, en **plusieurs requêtes** à l'IGN (API Carto par
  pages de 1 000 parcelles, BD TOPO par pages au WFS), sans filtre de commune ; le curseur le filtre
  ensuite sans appel au réseau. **Le nombre de parcelles et de bâtiments qui seront ajoutés s'affiche
  avant de créer** (ou d'actualiser) et suit le curseur ; il ne compte pas ce qui arrive déjà (voisines
  cochées, leur bâti, objets déjà dans le plan). L'option « Afficher le voisinage étendu » le montre
  dans l'aperçu, avec son cercle, et le laisse visible à l'ouverture ; décochée, il est importé masqué.
  Tout arrive verrouillé et marqué « voisinage », masquable d'un coup par l'œil de l'explorateur.
  - **Import direct** : à l'étape 1, la case « Import direct, sans les étapes 2 et 3 » saute le choix
    de la parcelle et la liste des voisines. Une fois l'adresse trouvée, un résumé montre l'aperçu, la
    parcelle, son bâti et sa végétation, et le compte du voisinage étendu ; « Créer le projet » crée le
    plan d'un clic, « Ajuster (étapes 2 et 3) » rouvre le parcours complet. Le choix est mémorisé par
    le navigateur.
- **Centrer une piscine ou un trou sur sa terrasse.** Un bouton « Centrer sur la terrasse » (étape
  1 de la piscine ; section « Trou dans la terrasse » d'un trou) déplace le bassin ou le trou pour
  que son centre de surface tombe au centre de sa terrasse — la plage liée au bassin, sinon la
  terrasse qu'il perce. La terrasse ne bouge pas ; Ctrl+Z annule ; déjà centré, le bouton se grise.
- **« Platelage translucide — voir les plots »** (Vue 3D). Par défaut, lames et dalle sont pleines :
  on ne voit pas dessous. Case cochée, les lames deviennent presque transparentes (15 %) et la
  dalle translucide : on voit la structure bois, les plots et leur assise. Préférence d'affichage
  de la session, sans effet sur le projet.
- **Bouton « Terrasse » dans la palette**, à côté de Parasol, Pergola, Carport et Piscine (rail
  sur tablette, feuille Outils sur téléphone). Il pose une terrasse bois de 4 × 3 m sur plots,
  plots dans l'emprise, coins libres, à la place libre la plus proche du centre de la parcelle :
  hors de la maison, des annexes, des autres terrasses, des massifs et des arbres, sans sortir de
  la parcelle. Elle est sélectionnée et chiffrée aussitôt ; Ctrl+Z la retire.
- **Option « Sections de l'inspecteur repliées »** (menu Affichage ; feuille Projet sur
  téléphone). Cochée, les sections de l'inspecteur s'ouvrent repliées, titres seuls : les étapes
  d'une terrasse ou d'une piscine se lisent d'un coup d'œil, on ouvre celle qu'on règle. La cocher
  ou la décocher replie ou déplie aussitôt les sections affichées ; « Prix » et « Paramètres de
  calcul » restent repliées par défaut. C'est une préférence de l'utilisateur, gardée par le
  navigateur d'un projet à l'autre : ni Ctrl+Z, ni « projet modifié », permise en lecture seule.
