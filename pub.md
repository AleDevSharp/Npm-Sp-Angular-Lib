# Pubblicazione di SpLib

Guida di riferimento del progetto per pubblicare i sorgenti su GitHub, lo showcase su Netlify e il pacchetto su npm. Esegui i comandi PowerShell dalla root del repository.

GitHub, npm e lo showcase online si aggiornano separatamente. Per la prima pubblicazione dello showcase segui questo ordine:

1. Commit e push dei sorgenti e della configurazione di deploy su GitHub.
2. Creazione del secondo sito su Netlify e verifica dello showcase pubblico.
3. Inserimento dell'URL definitivo nei README e nei metadati, seguito da un secondo commit e push.
4. Pubblicazione della nuova versione npm con README e link aggiornati.
5. Aggiornamento del portfolio e configurazione di Google Search Console.

Non serve aspettare l'URL di Netlify per fare il primo push. Aggiungi il collegamento alla demo quando il sito è raggiungibile a un indirizzo stabile.

## Preparazione completata prima del push

- Rimossa la dipendenza locale `file:../sp-lib` e aggiornato il lockfile. Lo showcase usa i sorgenti della libreria attraverso il path mapping TypeScript.
- Allineato `ng-packagr` ad Angular 19.
- Aggiunti `.nvmrc` e `netlify.toml`, con Node.js 22.22.3, build dello showcase e fallback per le route Angular.
- Aggiornati il README principale, il README del pacchetto e la documentazione dello showcase.
- Adattato lo showcase a telefoni e tablet: menu richiudibile fino a 900px, spaziature e homepage responsive, scorrimento locale per codice, tabelle API e demo più larghe.
- Menu disponibile in italiano e inglese, con chiusura alla selezione di una pagina e gestione di Escape e focus.

Verifiche eseguite durante la preparazione:

- Installazione con `npm ci` in una copia temporanea pulita, senza cartelle esterne della libreria.
- Build di produzione dello showcase e build della libreria riuscite.
- Controllo browser delle 23 pagine a 320, 375, 768, 900, 1024 e 1440px: nessun overflow orizzontale della pagina o errore JavaScript rilevato.
- Controllo delle 23 pagine in italiano a 320px con gli esempi di codice aperti.
- Verifica del menu, della navigazione da tastiera e del focus; geometrie desktop confrontate rimaste identiche.

I controlli responsive sono stati eseguiti in Chrome con viewport simulate. Dopo il deploy controlla anche il sito su un telefono reale. Queste verifiche descrivono la preparazione attuale: ripeti quelle pertinenti se modifichi il codice prima della pubblicazione.

## 1. Aggiornare GitHub

### Controllare e verificare le modifiche

Controlla il branch e le modifiche, compresi i file nuovi non ancora tracciati:

```powershell
git branch --show-current
git status
git diff --stat
git diff --check
```

Il branch verificato è `master`. Se cambi branch, adegua il comando di push e il branch scelto su Netlify.

Se hai modificato il codice dopo le verifiche riportate sopra, ricompila dalla root:

```powershell
npm run build
```

Per modifiche al comportamento dei componenti, esegui anche i test pertinenti. Il comando completo per i test della libreria è riportato nella sezione npm.

### Selezionare i file da includere

Per includere i sorgenti della libreria e dello showcase, i nuovi componenti, traduzioni, icone, documentazione e configurazione di deploy:

```powershell
git add README.md pub.md package.json package-lock.json angular.json tsconfig.json .nvmrc netlify.toml projects
```

Il percorso `projects` include anche i file nuovi e le eliminazioni al suo interno. Gli artefatti `dist`, `node_modules` e `tmp` sono esclusi tramite `.gitignore`. Le configurazioni locali in `.agents` non sono incluse dal comando sopra.

Controlla il contenuto selezionato prima del commit, soprattutto se avevi già altri file in staging:

```powershell
git diff --cached --stat
git diff --cached --check
git diff --cached
```

### Creare il commit ed eseguire il push

```powershell
git commit -m "Prepare SpLib showcase for Netlify and mobile devices"
git push origin master
git status
```

Il branch verificato durante questa sessione è `master`. Il push aggiorna i sorgenti su GitHub, ma non pubblica una versione su npm e non mette automaticamente online lo showcase, salvo automazioni configurate appositamente.

**Installazione da un clone pulito:** usa Node.js 22.22.3 (vedi `.nvmrc`) ed esegui `npm ci` dalla root. Lo showcase usa direttamente i sorgenti della libreria nel repository; non richiede cartelle esterne o una versione già pubblicata su npm.

### Pubblicare lo showcase su Netlify prima della release npm

1. Dopo il push, crea un secondo progetto Netlify collegato a questo repository e seleziona `master` come branch di produzione, se resta il branch principale.
2. Usa la root del repository come directory base. `netlify.toml` configura Node.js 22.22.3, il comando `npm run build:showcase`, la cartella pubblicata `dist/sp-showcase/browser` e il fallback delle route Angular a `index.html`.
3. Verifica homepage, demo, immagini, apertura diretta e ricaricamento delle pagine dei componenti.
4. Scelto l'URL HTTPS stabile, aggiungilo ai due README, al campo `homepage` del manifest della libreria (e del workspace) e alla sezione About di GitHub. Completa i metadati legati al dominio descritti in `projects/sp-showcase/BRANDING.md`.
5. Fai un secondo commit e push, quindi pubblica la release npm con README e collegamenti aggiornati. Il push su GitHub da solo non aggiorna il README del pacchetto su npm.

La configurazione dell'hosting è pronta nel repository; la creazione del sito e la verifica dell'URL pubblico restano da eseguire su Netlify. Il deploy dello showcase non pubblica il pacchetto npm.

Prima di condividere il sito pubblico, controlla:

- Apertura diretta e ricaricamento di una route come `/buttons`, senza errori 404.
- Navigazione desktop e mobile, scorrimento del menu e chiusura dopo la selezione.
- Cambio lingua, apertura degli esempi di codice e scorrimento delle tabelle API.
- Demo interattive, immagini, logo, favicon e collegamenti a npm e GitHub.
- Visualizzazione su un telefono reale, sia in verticale sia in orizzontale.

### Secondo commit con il link pubblico

Quando hai aggiornato i README, i manifest e i metadati usando l'URL effettivo, controlla e seleziona i file modificati:

```powershell
git status
git add README.md package.json package-lock.json projects pub.md
git diff --cached --stat
git diff --cached --check
git diff --cached
git commit -m "Link the live SpLib showcase"
git push origin master
```

Se modifichi la versione o le dipendenze del manifest principale, aggiorna anche il lockfile. La sola modifica di `homepage` non richiede una reinstallazione.

Nel portfolio mantieni SpLib come progetto separato e usa lo showcase per il pulsante principale «Demo live», con npm e GitHub come collegamenti aggiuntivi. Non serve integrare Angular nel portfolio React.

## 2. Pubblicare su npm

Esegui i comandi dalla root del repository.

Controlla prima l'ultima versione pubblicata:

```powershell
npm view @aledevsharp/sp-lib version
```

Alla verifica del 17 novembre 2026, la versione pubblicata era `2.0.1`.

Aggiorna il campo `version` in **`projects/sp-lib/package.json`**, non quello del workspace principale:

- **Patch**, per esempio `2.0.2`: correzioni o aggiornamenti del README.
- **Minor**, per esempio `2.1.0`: nuovi componenti o funzionalità compatibili.
- **Major**, per esempio `3.0.0`: modifiche incompatibili con l'API precedente.

Usa una versione mai pubblicata prima e allinea eventuali riferimenti alla versione nei README e nello showcase.

Compila e verifica la libreria:

```powershell
npm run build:lib
npm test -- --watch=false --browsers=ChromeHeadless
npm pack ./dist/sp-lib --dry-run
```

Se Chrome non viene rilevato, in PowerShell puoi indicarlo prima dei test:

```powershell
$env:CHROME_BIN = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
```

Controlla l'elenco dei file del pacchetto e il README generato in `dist/sp-lib/README.md`. Quando sei pronto a pubblicare:

```powershell
npm login
npm publish ./dist/sp-lib --access public
```

**L'ultimo comando pubblica realmente il pacchetto.** Segui l'eventuale verifica 2FA richiesta da npm. Pubblica `dist/sp-lib`, che contiene la libreria compilata.

Dopo la pubblicazione, verifica la nuova versione:

```powershell
npm view @aledevsharp/sp-lib version
```

Salva su GitHub anche le modifiche alla versione e alla documentazione del rilascio.

Riferimenti: [pubblicazione di pacchetti scoped pubblici](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages/), [versionamento semantico](https://docs.npmjs.com/about-semantic-versioning/).

## 3. Migliorare la visibilità della libreria

La ricerca interna di npm e Google sono sistemi distinti. Essere disponibili su npm non garantisce la presenza nei risultati di Google.

### Preparazione completata nel repository

- Descrizione e keyword pertinenti nei manifest del workspace e della libreria.
- `repository.directory` impostato a `projects/sp-lib` nel manifest npm.
- Logo e attribuzione ad AleDevSharp nei README GitHub e npm, con link a pacchetto, sorgenti e showcase.
- Titolo e descrizione iniziali dello showcase coerenti con i metadati social e con il catalogo inglese; presentazione localizzata anche in italiano.
- Metadato autore, icone e metadati specifici per le pagine dello showcase.
- Badge della versione dello showcase allineato al manifest della libreria.

I metadati del pacchetto saranno aggiornati su npm con la prossima release. Le modifiche nel repository non garantiscono un posizionamento nei motori di ricerca. `homepage` continua a puntare a GitHub finché non viene scelto un URL pubblico per lo showcase.

### Da completare quando lo showcase sarà pubblico

1. Scegli un URL HTTPS stabile e configura hosting, base href e accesso diretto alle route.
2. Inserisci il link dello showcase nei README, nella sezione About di GitHub e nel campo `homepage` del manifest della libreria.
3. Configura canonical per pagina, sitemap, URL social e immagini di anteprima assoluti, usando il dominio effettivo.
4. Aggiungi i dati strutturati `WebSite` sulla homepage con l'URL reale.
5. Aggiungi screenshot o brevi video delle demo ai README e prepara una presentazione per le community Angular.

Logo e favicon sono già disponibili. Gli screenshot delle demo e le immagini social dedicate restano materiale da preparare; non sono sostituiti dal logo.

### Indicizzazione Google

Sul sito pubblico che controlli:

1. Configura e verifica la proprietà in Google Search Console.
2. Verifica che le pagine siano raggiungibili, senza blocchi di accesso o direttive `noindex` indesiderate.
3. Configura canonical corretti e una sitemap con gli URL pubblicati.
4. Invia la sitemap e richiedi l'indicizzazione delle pagine principali.
5. Valuta il prerendering dello showcase: Google può elaborare JavaScript, ma HTML già completo aiuta anche i crawler che non lo eseguono.

Search Console si configura sul sito di cui puoi dimostrare il controllo, non sulla pagina del pacchetto ospitata da npm. Le richieste di indicizzazione non garantiscono indicizzazione, tempi o posizionamento.

I dettagli da completare quando sarà noto l'URL pubblico sono in [BRANDING.md](projects/sp-showcase/BRANDING.md).

Riferimenti: [richiedere una nuova scansione a Google](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [SEO per siti JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [metadati npm](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#keywords).

### Far conoscere SpLib

Presenta la libreria alle community Angular con esempi concreti, una demo raggiungibile e un link di installazione. Pubblica tutorial su problemi che i componenti risolvono e mantieni documentazione e release aggiornate. Collegamenti pertinenti e contributi utili aiutano le persone a scoprirla.

**Ordine consigliato:** aggiornare GitHub con la configurazione di deploy, mettere online lo showcase, aggiungere il suo URL alla documentazione e ai metadati, fare un secondo push, pubblicare la nuova versione npm e configurare Search Console.
