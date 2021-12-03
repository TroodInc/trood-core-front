const googleFontLink = 'https://fonts.googleapis.com/css2?family='
const googleFontQuery = ':ital,wght@' +
  Array(9).fill(0).map((_, i) => `0,${(i + 1) * 100}`).join(';') + ';' +
  Array(9).fill(0).map((_, i) => `1,${(i + 1) * 100}`).join(';')

const googleFonts = [
  {
    name: 'ABeeZee',
    category: 'sans-serif',
  },
  {
    name: 'Abel',
    category: 'sans-serif',
  },
  {
    name: 'Abhaya Libre',
    category: 'serif',
  },
  {
    name: 'Abril Fatface',
  },
  {
    name: 'Aclonica',
    category: 'sans-serif',
  },
  {
    name: 'Acme',
    category: 'sans-serif',
  },
  {
    name: 'Actor',
    category: 'sans-serif',
  },
  {
    name: 'Adamina',
    category: 'serif',
  },
  {
    name: 'Advent Pro',
    category: 'sans-serif',
  },
  {
    name: 'Aguafina Script',
    category: 'cursive',
  },
  {
    name: 'Akaya Kanadaka',
  },
  {
    name: 'Akaya Telivigala',
  },
  {
    name: 'Akronim',
  },
  {
    name: 'Aladin',
    category: 'cursive',
  },
  {
    name: 'Alata',
    category: 'sans-serif',
  },
  {
    name: 'Alatsi',
    category: 'sans-serif',
  },
  {
    name: 'Aldrich',
    category: 'sans-serif',
  },
  {
    name: 'Alef',
    category: 'sans-serif',
  },
  {
    name: 'Alegreya',
    category: 'serif',
  },
  {
    name: 'Alegreya SC',
    category: 'serif',
  },
  {
    name: 'Alegreya Sans',
    category: 'sans-serif',
  },
  {
    name: 'Alegreya Sans SC',
    category: 'sans-serif',
  },
  {
    name: 'Aleo',
    category: 'serif',
  },
  {
    name: 'Alex Brush',
    category: 'cursive',
  },
  {
    name: 'Alfa Slab One',
  },
  {
    name: 'Alice',
    category: 'serif',
  },
  {
    name: 'Alike',
    category: 'serif',
  },
  {
    name: 'Alike Angular',
    category: 'serif',
  },
  {
    name: 'Allan',
  },
  {
    name: 'Allerta',
    category: 'sans-serif',
  },
  {
    name: 'Allerta Stencil',
    category: 'sans-serif',
  },
  {
    name: 'Allison',
    category: 'cursive',
  },
  {
    name: 'Allura',
    category: 'cursive',
  },
  {
    name: 'Almarai',
    category: 'sans-serif',
  },
  {
    name: 'Almendra',
    category: 'serif',
  },
  {
    name: 'Almendra Display',
  },
  {
    name: 'Almendra SC',
    category: 'serif',
  },
  {
    name: 'Alumni Sans',
    category: 'sans-serif',
  },
  {
    name: 'Amarante',
  },
  {
    name: 'Amaranth',
    category: 'sans-serif',
  },
  {
    name: 'Amatic SC',
    category: 'cursive',
  },
  {
    name: 'Amethysta',
    category: 'serif',
  },
  {
    name: 'Amiko',
    category: 'sans-serif',
  },
  {
    name: 'Amiri',
    category: 'serif',
  },
  {
    name: 'Amita',
    category: 'cursive',
  },
  {
    name: 'Anaheim',
    category: 'sans-serif',
  },
  {
    name: 'Andada Pro',
    category: 'serif',
  },
  {
    name: 'Andika',
    category: 'sans-serif',
  },
  {
    name: 'Andika New Basic',
    category: 'sans-serif',
  },
  {
    name: 'Angkor',
  },
  {
    name: 'Annie Use Your Telescope',
    category: 'cursive',
  },
  {
    name: 'Anonymous Pro',
    category: 'monospace',
  },
  {
    name: 'Antic',
    category: 'sans-serif',
  },
  {
    name: 'Antic Didone',
    category: 'serif',
  },
  {
    name: 'Antic Slab',
    category: 'serif',
  },
  {
    name: 'Anton',
    category: 'sans-serif',
  },
  {
    name: 'Antonio',
    category: 'sans-serif',
  },
  {
    name: 'Arapey',
    category: 'serif',
  },
  {
    name: 'Arbutus',
  },
  {
    name: 'Arbutus Slab',
    category: 'serif',
  },
  {
    name: 'Architects Daughter',
    category: 'cursive',
  },
  {
    name: 'Archivo',
    category: 'sans-serif',
  },
  {
    name: 'Archivo Black',
    category: 'sans-serif',
  },
  {
    name: 'Archivo Narrow',
    category: 'sans-serif',
  },
  {
    name: 'Are You Serious',
    category: 'cursive',
  },
  {
    name: 'Aref Ruqaa',
    category: 'serif',
  },
  {
    name: 'Arima Madurai',
  },
  {
    name: 'Arimo',
    category: 'sans-serif',
  },
  {
    name: 'Arizonia',
    category: 'cursive',
  },
  {
    name: 'Armata',
    category: 'sans-serif',
  },
  {
    name: 'Arsenal',
    category: 'sans-serif',
  },
  {
    name: 'Artifika',
    category: 'serif',
  },
  {
    name: 'Arvo',
    category: 'serif',
  },
  {
    name: 'Arya',
    category: 'sans-serif',
  },
  {
    name: 'Asap',
    category: 'sans-serif',
  },
  {
    name: 'Asap Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Asar',
    category: 'serif',
  },
  {
    name: 'Asset',
  },
  {
    name: 'Assistant',
    category: 'sans-serif',
  },
  {
    name: 'Astloch',
  },
  {
    name: 'Asul',
    category: 'sans-serif',
  },
  {
    name: 'Athiti',
    category: 'sans-serif',
  },
  {
    name: 'Atkinson Hyperlegible',
    category: 'sans-serif',
  },
  {
    name: 'Atma',
  },
  {
    name: 'Atomic Age',
  },
  {
    name: 'Aubrey',
  },
  {
    name: 'Audiowide',
  },
  {
    name: 'Autour One',
  },
  {
    name: 'Average',
    category: 'serif',
  },
  {
    name: 'Average Sans',
    category: 'sans-serif',
  },
  {
    name: 'Averia Gruesa Libre',
  },
  {
    name: 'Averia Libre',
  },
  {
    name: 'Averia Sans Libre',
  },
  {
    name: 'Averia Serif Libre',
  },
  {
    name: 'Azeret Mono',
    category: 'monospace',
  },
  {
    name: 'B612',
    category: 'sans-serif',
  },
  {
    name: 'B612 Mono',
    category: 'monospace',
  },
  {
    name: 'Bad Script',
    category: 'cursive',
  },
  {
    name: 'Bahiana',
  },
  {
    name: 'Bahianita',
  },
  {
    name: 'Bai Jamjuree',
    category: 'sans-serif',
  },
  {
    name: 'Ballet',
    category: 'cursive',
  },
  {
    name: 'Baloo 2',
  },
  {
    name: 'Baloo Bhai 2',
  },
  {
    name: 'Baloo Bhaijaan 2',
  },
  {
    name: 'Baloo Bhaina 2',
  },
  {
    name: 'Baloo Chettan 2',
  },
  {
    name: 'Baloo Da 2',
  },
  {
    name: 'Baloo Paaji 2',
  },
  {
    name: 'Baloo Tamma 2',
  },
  {
    name: 'Baloo Tammudu 2',
  },
  {
    name: 'Baloo Thambi 2',
  },
  {
    name: 'Balsamiq Sans',
  },
  {
    name: 'Balthazar',
    category: 'serif',
  },
  {
    name: 'Bangers',
  },
  {
    name: 'Barlow',
    category: 'sans-serif',
  },
  {
    name: 'Barlow Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Barlow Semi Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Barriecito',
  },
  {
    name: 'Barrio',
  },
  {
    name: 'Basic',
    category: 'sans-serif',
  },
  {
    name: 'Baskervville',
    category: 'serif',
  },
  {
    name: 'Battambang',
  },
  {
    name: 'Baumans',
  },
  {
    name: 'Bayon',
    category: 'sans-serif',
  },
  {
    name: 'Be Vietnam Pro',
    category: 'sans-serif',
  },
  {
    name: 'Bebas Neue',
  },
  {
    name: 'Belgrano',
    category: 'serif',
  },
  {
    name: 'Bellefair',
    category: 'serif',
  },
  {
    name: 'Belleza',
    category: 'sans-serif',
  },
  {
    name: 'Bellota',
  },
  {
    name: 'Bellota Text',
  },
  {
    name: 'BenchNine',
    category: 'sans-serif',
  },
  {
    name: 'Benne',
    category: 'serif',
  },
  {
    name: 'Bentham',
    category: 'serif',
  },
  {
    name: 'Berkshire Swash',
    category: 'cursive',
  },
  {
    name: 'Besley',
    category: 'serif',
  },
  {
    name: 'Beth Ellen',
    category: 'cursive',
  },
  {
    name: 'Bevan',
  },
  {
    name: 'Big Shoulders Display',
  },
  {
    name: 'Big Shoulders Inline Display',
  },
  {
    name: 'Big Shoulders Inline Text',
  },
  {
    name: 'Big Shoulders Stencil Display',
  },
  {
    name: 'Big Shoulders Stencil Text',
  },
  {
    name: 'Big Shoulders Text',
  },
  {
    name: 'Bigelow Rules',
  },
  {
    name: 'Bigshot One',
  },
  {
    name: 'Bilbo',
    category: 'cursive',
  },
  {
    name: 'Bilbo Swash Caps',
    category: 'cursive',
  },
  {
    name: 'BioRhyme',
    category: 'serif',
  },
  {
    name: 'BioRhyme Expanded',
    category: 'serif',
  },
  {
    name: 'Birthstone',
    category: 'cursive',
  },
  {
    name: 'Birthstone Bounce',
    category: 'cursive',
  },
  {
    name: 'Biryani',
    category: 'sans-serif',
  },
  {
    name: 'Bitter',
    category: 'serif',
  },
  {
    name: 'Black And White Picture',
    category: 'sans-serif',
  },
  {
    name: 'Black Han Sans',
    category: 'sans-serif',
  },
  {
    name: 'Black Ops One',
  },
  {
    name: 'Blinker',
    category: 'sans-serif',
  },
  {
    name: 'Bodoni Moda',
    category: 'serif',
  },
  {
    name: 'Bokor',
  },
  {
    name: 'Bona Nova',
    category: 'serif',
  },
  {
    name: 'Bonbon',
    category: 'cursive',
  },
  {
    name: 'Bonheur Royale',
    category: 'cursive',
  },
  {
    name: 'Boogaloo',
  },
  {
    name: 'Bowlby One',
  },
  {
    name: 'Bowlby One SC',
  },
  {
    name: 'Brawler',
    category: 'serif',
  },
  {
    name: 'Bree Serif',
    category: 'serif',
  },
  {
    name: 'Brygada 1918',
    category: 'serif',
  },
  {
    name: 'Bubblegum Sans',
  },
  {
    name: 'Bubbler One',
    category: 'sans-serif',
  },
  {
    name: 'Buda',
  },
  {
    name: 'Buenard',
    category: 'serif',
  },
  {
    name: 'Bungee',
  },
  {
    name: 'Bungee Hairline',
  },
  {
    name: 'Bungee Inline',
  },
  {
    name: 'Bungee Outline',
  },
  {
    name: 'Bungee Shade',
  },
  {
    name: 'Butcherman',
  },
  {
    name: 'Butterfly Kids',
    category: 'cursive',
  },
  {
    name: 'Cabin',
    category: 'sans-serif',
  },
  {
    name: 'Cabin Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Cabin Sketch',
  },
  {
    name: 'Caesar Dressing',
  },
  {
    name: 'Cagliostro',
    category: 'sans-serif',
  },
  {
    name: 'Cairo',
    category: 'sans-serif',
  },
  {
    name: 'Caladea',
    category: 'serif',
  },
  {
    name: 'Calistoga',
  },
  {
    name: 'Calligraffitti',
    category: 'cursive',
  },
  {
    name: 'Cambay',
    category: 'sans-serif',
  },
  {
    name: 'Cambo',
    category: 'serif',
  },
  {
    name: 'Candal',
    category: 'sans-serif',
  },
  {
    name: 'Cantarell',
    category: 'sans-serif',
  },
  {
    name: 'Cantata One',
    category: 'serif',
  },
  {
    name: 'Cantora One',
    category: 'sans-serif',
  },
  {
    name: 'Capriola',
    category: 'sans-serif',
  },
  {
    name: 'Caramel',
    category: 'cursive',
  },
  {
    name: 'Carattere',
    category: 'cursive',
  },
  {
    name: 'Cardo',
    category: 'serif',
  },
  {
    name: 'Carme',
    category: 'sans-serif',
  },
  {
    name: 'Carrois Gothic',
    category: 'sans-serif',
  },
  {
    name: 'Carrois Gothic SC',
    category: 'sans-serif',
  },
  {
    name: 'Carter One',
  },
  {
    name: 'Castoro',
    category: 'serif',
  },
  {
    name: 'Catamaran',
    category: 'sans-serif',
  },
  {
    name: 'Caudex',
    category: 'serif',
  },
  {
    name: 'Caveat',
    category: 'cursive',
  },
  {
    name: 'Caveat Brush',
    category: 'cursive',
  },
  {
    name: 'Cedarville Cursive',
    category: 'cursive',
  },
  {
    name: 'Ceviche One',
  },
  {
    name: 'Chakra Petch',
    category: 'sans-serif',
  },
  {
    name: 'Changa',
    category: 'sans-serif',
  },
  {
    name: 'Changa One',
  },
  {
    name: 'Chango',
  },
  {
    name: 'Charm',
    category: 'cursive',
  },
  {
    name: 'Charmonman',
    category: 'cursive',
  },
  {
    name: 'Chathura',
    category: 'sans-serif',
  },
  {
    name: 'Chau Philomene One',
    category: 'sans-serif',
  },
  {
    name: 'Chela One',
  },
  {
    name: 'Chelsea Market',
  },
  {
    name: 'Chenla',
  },
  {
    name: 'Cherish',
    category: 'cursive',
  },
  {
    name: 'Cherry Cream Soda',
  },
  {
    name: 'Cherry Swash',
  },
  {
    name: 'Chewy',
  },
  {
    name: 'Chicle',
  },
  {
    name: 'Chilanka',
    category: 'cursive',
  },
  {
    name: 'Chivo',
    category: 'sans-serif',
  },
  {
    name: 'Chonburi',
  },
  {
    name: 'Cinzel',
    category: 'serif',
  },
  {
    name: 'Cinzel Decorative',
  },
  {
    name: 'Clicker Script',
    category: 'cursive',
  },
  {
    name: 'Coda',
  },
  {
    name: 'Coda Caption',
    category: 'sans-serif',
  },
  {
    name: 'Codystar',
  },
  {
    name: 'Coiny',
  },
  {
    name: 'Combo',
  },
  {
    name: 'Comfortaa',
  },
  {
    name: 'Comforter',
    category: 'cursive',
  },
  {
    name: 'Comforter Brush',
    category: 'cursive',
  },
  {
    name: 'Comic Neue',
    category: 'cursive',
  },
  {
    name: 'Coming Soon',
    category: 'cursive',
  },
  {
    name: 'Commissioner',
    category: 'sans-serif',
  },
  {
    name: 'Concert One',
  },
  {
    name: 'Condiment',
    category: 'cursive',
  },
  {
    name: 'Content',
  },
  {
    name: 'Contrail One',
  },
  {
    name: 'Convergence',
    category: 'sans-serif',
  },
  {
    name: 'Cookie',
    category: 'cursive',
  },
  {
    name: 'Copse',
    category: 'serif',
  },
  {
    name: 'Corben',
  },
  {
    name: 'Corinthia',
    category: 'cursive',
  },
  {
    name: 'Cormorant',
    category: 'serif',
  },
  {
    name: 'Cormorant Garamond',
    category: 'serif',
  },
  {
    name: 'Cormorant Infant',
    category: 'serif',
  },
  {
    name: 'Cormorant SC',
    category: 'serif',
  },
  {
    name: 'Cormorant Unicase',
    category: 'serif',
  },
  {
    name: 'Cormorant Upright',
    category: 'serif',
  },
  {
    name: 'Courgette',
    category: 'cursive',
  },
  {
    name: 'Courier Prime',
    category: 'monospace',
  },
  {
    name: 'Cousine',
    category: 'monospace',
  },
  {
    name: 'Coustard',
    category: 'serif',
  },
  {
    name: 'Covered By Your Grace',
    category: 'cursive',
  },
  {
    name: 'Crafty Girls',
    category: 'cursive',
  },
  {
    name: 'Creepster',
  },
  {
    name: 'Crete Round',
    category: 'serif',
  },
  {
    name: 'Crimson Pro',
    category: 'serif',
  },
  {
    name: 'Croissant One',
  },
  {
    name: 'Crushed',
  },
  {
    name: 'Cuprum',
    category: 'sans-serif',
  },
  {
    name: 'Cute Font',
  },
  {
    name: 'Cutive',
    category: 'serif',
  },
  {
    name: 'Cutive Mono',
    category: 'monospace',
  },
  {
    name: 'DM Mono',
    category: 'monospace',
  },
  {
    name: 'DM Sans',
    category: 'sans-serif',
  },
  {
    name: 'DM Serif Display',
    category: 'serif',
  },
  {
    name: 'DM Serif Text',
    category: 'serif',
  },
  {
    name: 'Damion',
    category: 'cursive',
  },
  {
    name: 'Dancing Script',
    category: 'cursive',
  },
  {
    name: 'Dangrek',
  },
  {
    name: 'Darker Grotesque',
    category: 'sans-serif',
  },
  {
    name: 'David Libre',
    category: 'serif',
  },
  {
    name: 'Dawning of a New Day',
    category: 'cursive',
  },
  {
    name: 'Days One',
    category: 'sans-serif',
  },
  {
    name: 'Dekko',
    category: 'cursive',
  },
  {
    name: 'Dela Gothic One',
  },
  {
    name: 'Delius',
    category: 'cursive',
  },
  {
    name: 'Delius Swash Caps',
    category: 'cursive',
  },
  {
    name: 'Delius Unicase',
    category: 'cursive',
  },
  {
    name: 'Della Respira',
    category: 'serif',
  },
  {
    name: 'Denk One',
    category: 'sans-serif',
  },
  {
    name: 'Devonshire',
    category: 'cursive',
  },
  {
    name: 'Dhurjati',
    category: 'sans-serif',
  },
  {
    name: 'Didact Gothic',
    category: 'sans-serif',
  },
  {
    name: 'Diplomata',
  },
  {
    name: 'Diplomata SC',
  },
  {
    name: 'Do Hyeon',
    category: 'sans-serif',
  },
  {
    name: 'Dokdo',
    category: 'cursive',
  },
  {
    name: 'Domine',
    category: 'serif',
  },
  {
    name: 'Donegal One',
    category: 'serif',
  },
  {
    name: 'Dongle',
    category: 'sans-serif',
  },
  {
    name: 'Doppio One',
    category: 'sans-serif',
  },
  {
    name: 'Dorsa',
    category: 'sans-serif',
  },
  {
    name: 'Dosis',
    category: 'sans-serif',
  },
  {
    name: 'DotGothic16',
    category: 'sans-serif',
  },
  {
    name: 'Dr Sugiyama',
    category: 'cursive',
  },
  {
    name: 'Duru Sans',
    category: 'sans-serif',
  },
  {
    name: 'Dynalight',
  },
  {
    name: 'EB Garamond',
    category: 'serif',
  },
  {
    name: 'Eagle Lake',
    category: 'cursive',
  },
  {
    name: 'East Sea Dokdo',
    category: 'cursive',
  },
  {
    name: 'Eater',
  },
  {
    name: 'Economica',
    category: 'sans-serif',
  },
  {
    name: 'Eczar',
    category: 'serif',
  },
  {
    name: 'El Messiri',
    category: 'sans-serif',
  },
  {
    name: 'Electrolize',
    category: 'sans-serif',
  },
  {
    name: 'Elsie',
  },
  {
    name: 'Elsie Swash Caps',
  },
  {
    name: 'Emblema One',
  },
  {
    name: 'Emilys Candy',
  },
  {
    name: 'Encode Sans',
    category: 'sans-serif',
  },
  {
    name: 'Encode Sans Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Encode Sans Expanded',
    category: 'sans-serif',
  },
  {
    name: 'Encode Sans SC',
    category: 'sans-serif',
  },
  {
    name: 'Encode Sans Semi Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Encode Sans Semi Expanded',
    category: 'sans-serif',
  },
  {
    name: 'Engagement',
    category: 'cursive',
  },
  {
    name: 'Englebert',
    category: 'sans-serif',
  },
  {
    name: 'Enriqueta',
    category: 'serif',
  },
  {
    name: 'Ephesis',
    category: 'cursive',
  },
  {
    name: 'Epilogue',
    category: 'sans-serif',
  },
  {
    name: 'Erica One',
  },
  {
    name: 'Esteban',
    category: 'serif',
  },
  {
    name: 'Estonia',
    category: 'cursive',
  },
  {
    name: 'Euphoria Script',
    category: 'cursive',
  },
  {
    name: 'Ewert',
  },
  {
    name: 'Exo',
    category: 'sans-serif',
  },
  {
    name: 'Exo 2',
    category: 'sans-serif',
  },
  {
    name: 'Expletus Sans',
  },
  {
    name: 'Explora',
    category: 'cursive',
  },
  {
    name: 'Fahkwang',
    category: 'sans-serif',
  },
  {
    name: 'Fanwood Text',
    category: 'serif',
  },
  {
    name: 'Farro',
    category: 'sans-serif',
  },
  {
    name: 'Farsan',
  },
  {
    name: 'Fascinate',
  },
  {
    name: 'Fascinate Inline',
  },
  {
    name: 'Faster One',
  },
  {
    name: 'Fasthand',
  },
  {
    name: 'Fauna One',
    category: 'serif',
  },
  {
    name: 'Faustina',
    category: 'serif',
  },
  {
    name: 'Federant',
  },
  {
    name: 'Federo',
    category: 'sans-serif',
  },
  {
    name: 'Felipa',
    category: 'cursive',
  },
  {
    name: 'Fenix',
    category: 'serif',
  },
  {
    name: 'Festive',
    category: 'cursive',
  },
  {
    name: 'Finger Paint',
  },
  {
    name: 'Fira Code',
    category: 'monospace',
  },
  {
    name: 'Fira Mono',
    category: 'monospace',
  },
  {
    name: 'Fira Sans',
    category: 'sans-serif',
  },
  {
    name: 'Fira Sans Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Fira Sans Extra Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Fjalla One',
    category: 'sans-serif',
  },
  {
    name: 'Fjord One',
    category: 'serif',
  },
  {
    name: 'Flamenco',
  },
  {
    name: 'Flavors',
  },
  {
    name: 'Fleur De Leah',
    category: 'cursive',
  },
  {
    name: 'Flow Block',
  },
  {
    name: 'Flow Circular',
  },
  {
    name: 'Flow Rounded',
  },
  {
    name: 'Fondamento',
    category: 'cursive',
  },
  {
    name: 'Fontdiner Swanky',
  },
  {
    name: 'Forum',
  },
  {
    name: 'Francois One',
    category: 'sans-serif',
  },
  {
    name: 'Frank Ruhl Libre',
    category: 'serif',
  },
  {
    name: 'Fraunces',
    category: 'serif',
  },
  {
    name: 'Freckle Face',
  },
  {
    name: 'Fredericka the Great',
  },
  {
    name: 'Fredoka One',
  },
  {
    name: 'Freehand',
  },
  {
    name: 'Fresca',
    category: 'sans-serif',
  },
  {
    name: 'Frijole',
  },
  {
    name: 'Fruktur',
  },
  {
    name: 'Fugaz One',
  },
  {
    name: 'Fuggles',
    category: 'cursive',
  },
  {
    name: 'Fuzzy Bubbles',
    category: 'cursive',
  },
  {
    name: 'GFS Didot',
    category: 'serif',
  },
  {
    name: 'GFS Neohellenic',
    category: 'sans-serif',
  },
  {
    name: 'Gabriela',
    category: 'serif',
  },
  {
    name: 'Gaegu',
    category: 'cursive',
  },
  {
    name: 'Gafata',
    category: 'sans-serif',
  },
  {
    name: 'Galada',
  },
  {
    name: 'Galdeano',
    category: 'sans-serif',
  },
  {
    name: 'Galindo',
  },
  {
    name: 'Gamja Flower',
    category: 'cursive',
  },
  {
    name: 'Gayathri',
    category: 'sans-serif',
  },
  {
    name: 'Gelasio',
    category: 'serif',
  },
  {
    name: 'Gemunu Libre',
    category: 'sans-serif',
  },
  {
    name: 'Genos',
    category: 'sans-serif',
  },
  {
    name: 'Gentium Basic',
    category: 'serif',
  },
  {
    name: 'Gentium Book Basic',
    category: 'serif',
  },
  {
    name: 'Geo',
    category: 'sans-serif',
  },
  {
    name: 'Georama',
    category: 'sans-serif',
  },
  {
    name: 'Geostar',
  },
  {
    name: 'Geostar Fill',
  },
  {
    name: 'Germania One',
  },
  {
    name: 'Gideon Roman',
  },
  {
    name: 'Gidugu',
    category: 'sans-serif',
  },
  {
    name: 'Gilda Display',
    category: 'serif',
  },
  {
    name: 'Girassol',
  },
  {
    name: 'Give You Glory',
    category: 'cursive',
  },
  {
    name: 'Glass Antiqua',
  },
  {
    name: 'Glegoo',
    category: 'serif',
  },
  {
    name: 'Gloria Hallelujah',
    category: 'cursive',
  },
  {
    name: 'Glory',
    category: 'sans-serif',
  },
  {
    name: 'Gluten',
  },
  {
    name: 'Goblin One',
  },
  {
    name: 'Gochi Hand',
    category: 'cursive',
  },
  {
    name: 'Goldman',
  },
  {
    name: 'Gorditas',
  },
  {
    name: 'Gothic A1',
    category: 'sans-serif',
  },
  {
    name: 'Gotu',
    category: 'sans-serif',
  },
  {
    name: 'Goudy Bookletter 1911',
    category: 'serif',
  },
  {
    name: 'Gowun Batang',
    category: 'serif',
  },
  {
    name: 'Gowun Dodum',
    category: 'sans-serif',
  },
  {
    name: 'Graduate',
  },
  {
    name: 'Grand Hotel',
    category: 'cursive',
  },
  {
    name: 'Grandstander',
  },
  {
    name: 'Gravitas One',
  },
  {
    name: 'Great Vibes',
    category: 'cursive',
  },
  {
    name: 'Grechen Fuemen',
    category: 'cursive',
  },
  {
    name: 'Grenze',
    category: 'serif',
  },
  {
    name: 'Grenze Gotisch',
  },
  {
    name: 'Grey Qo',
    category: 'cursive',
  },
  {
    name: 'Griffy',
  },
  {
    name: 'Gruppo',
  },
  {
    name: 'Gudea',
    category: 'sans-serif',
  },
  {
    name: 'Gugi',
  },
  {
    name: 'Gupter',
    category: 'serif',
  },
  {
    name: 'Gurajada',
    category: 'serif',
  },
  {
    name: 'Gwendolyn',
    category: 'cursive',
  },
  {
    name: 'Habibi',
    category: 'serif',
  },
  {
    name: 'Hachi Maru Pop',
    category: 'cursive',
  },
  {
    name: 'Hahmlet',
    category: 'serif',
  },
  {
    name: 'Halant',
    category: 'serif',
  },
  {
    name: 'Hammersmith One',
    category: 'sans-serif',
  },
  {
    name: 'Hanalei',
  },
  {
    name: 'Hanalei Fill',
  },
  {
    name: 'Handlee',
    category: 'cursive',
  },
  {
    name: 'Hanuman',
    category: 'serif',
  },
  {
    name: 'Happy Monkey',
  },
  {
    name: 'Harmattan',
    category: 'sans-serif',
  },
  {
    name: 'Headland One',
    category: 'serif',
  },
  {
    name: 'Heebo',
    category: 'sans-serif',
  },
  {
    name: 'Henny Penny',
  },
  {
    name: 'Hepta Slab',
    category: 'serif',
  },
  {
    name: 'Herr Von Muellerhoff',
    category: 'cursive',
  },
  {
    name: 'Hi Melody',
    category: 'cursive',
  },
  {
    name: 'Hina Mincho',
    category: 'serif',
  },
  {
    name: 'Hind',
    category: 'sans-serif',
  },
  {
    name: 'Hind Guntur',
    category: 'sans-serif',
  },
  {
    name: 'Hind Madurai',
    category: 'sans-serif',
  },
  {
    name: 'Hind Siliguri',
    category: 'sans-serif',
  },
  {
    name: 'Hind Vadodara',
    category: 'sans-serif',
  },
  {
    name: 'Holtwood One SC',
    category: 'serif',
  },
  {
    name: 'Homemade Apple',
    category: 'cursive',
  },
  {
    name: 'Homenaje',
    category: 'sans-serif',
  },
  {
    name: 'Hurricane',
    category: 'cursive',
  },
  {
    name: 'IBM Plex Mono',
    category: 'monospace',
  },
  {
    name: 'IBM Plex Sans',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Sans Arabic',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Sans Condensed',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Sans Devanagari',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Sans Hebrew',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Sans KR',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Sans Thai',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Sans Thai Looped',
    category: 'sans-serif',
  },
  {
    name: 'IBM Plex Serif',
    category: 'serif',
  },
  {
    name: 'IM Fell DW Pica',
    category: 'serif',
  },
  {
    name: 'IM Fell DW Pica SC',
    category: 'serif',
  },
  {
    name: 'IM Fell Double Pica',
    category: 'serif',
  },
  {
    name: 'IM Fell Double Pica SC',
    category: 'serif',
  },
  {
    name: 'IM Fell English',
    category: 'serif',
  },
  {
    name: 'IM Fell English SC',
    category: 'serif',
  },
  {
    name: 'IM Fell French Canon',
    category: 'serif',
  },
  {
    name: 'IM Fell French Canon SC',
    category: 'serif',
  },
  {
    name: 'IM Fell Great Primer',
    category: 'serif',
  },
  {
    name: 'IM Fell Great Primer SC',
    category: 'serif',
  },
  {
    name: 'Ibarra Real Nova',
    category: 'serif',
  },
  {
    name: 'Iceberg',
  },
  {
    name: 'Iceland',
  },
  {
    name: 'Imbue',
    category: 'serif',
  },
  {
    name: 'Imprima',
    category: 'sans-serif',
  },
  {
    name: 'Inconsolata',
    category: 'monospace',
  },
  {
    name: 'Inder',
    category: 'sans-serif',
  },
  {
    name: 'Indie Flower',
    category: 'cursive',
  },
  {
    name: 'Inika',
    category: 'serif',
  },
  {
    name: 'Inknut Antiqua',
    category: 'serif',
  },
  {
    name: 'Inria Sans',
    category: 'sans-serif',
  },
  {
    name: 'Inria Serif',
    category: 'serif',
  },
  {
    name: 'Inter',
    category: 'sans-serif',
  },
  {
    name: 'Irish Grover',
  },
  {
    name: 'Istok Web',
    category: 'sans-serif',
  },
  {
    name: 'Italiana',
    category: 'serif',
  },
  {
    name: 'Italianno',
    category: 'cursive',
  },
  {
    name: 'Itim',
    category: 'cursive',
  },
  {
    name: 'Jacques Francois',
    category: 'serif',
  },
  {
    name: 'Jacques Francois Shadow',
  },
  {
    name: 'Jaldi',
    category: 'sans-serif',
  },
  {
    name: 'JetBrains Mono',
    category: 'monospace',
  },
  {
    name: 'Jim Nightshade',
    category: 'cursive',
  },
  {
    name: 'Jockey One',
    category: 'sans-serif',
  },
  {
    name: 'Jolly Lodger',
  },
  {
    name: 'Jomhuria',
  },
  {
    name: 'Jomolhari',
    category: 'serif',
  },
  {
    name: 'Josefin Sans',
    category: 'sans-serif',
  },
  {
    name: 'Josefin Slab',
    category: 'serif',
  },
  {
    name: 'Jost',
    category: 'sans-serif',
  },
  {
    name: 'Joti One',
  },
  {
    name: 'Jua',
    category: 'sans-serif',
  },
  {
    name: 'Judson',
    category: 'serif',
  },
  {
    name: 'Julee',
    category: 'cursive',
  },
  {
    name: 'Julius Sans One',
    category: 'sans-serif',
  },
  {
    name: 'Junge',
    category: 'serif',
  },
  {
    name: 'Jura',
    category: 'sans-serif',
  },
  {
    name: 'Just Another Hand',
    category: 'cursive',
  },
  {
    name: 'Just Me Again Down Here',
    category: 'cursive',
  },
  {
    name: 'K2D',
    category: 'sans-serif',
  },
  {
    name: 'Kadwa',
    category: 'serif',
  },
  {
    name: 'Kaisei Decol',
    category: 'serif',
  },
  {
    name: 'Kaisei HarunoUmi',
    category: 'serif',
  },
  {
    name: 'Kaisei Opti',
    category: 'serif',
  },
  {
    name: 'Kaisei Tokumin',
    category: 'serif',
  },
  {
    name: 'Kalam',
    category: 'cursive',
  },
  {
    name: 'Kameron',
    category: 'serif',
  },
  {
    name: 'Kanit',
    category: 'sans-serif',
  },
  {
    name: 'Kantumruy',
    category: 'sans-serif',
  },
  {
    name: 'Karantina',
  },
  {
    name: 'Karla',
    category: 'sans-serif',
  },
  {
    name: 'Karma',
    category: 'serif',
  },
  {
    name: 'Katibeh',
  },
  {
    name: 'Kaushan Script',
    category: 'cursive',
  },
  {
    name: 'Kavivanar',
    category: 'cursive',
  },
  {
    name: 'Kavoon',
  },
  {
    name: 'Kdam Thmor',
  },
  {
    name: 'Keania One',
  },
  {
    name: 'Kelly Slab',
  },
  {
    name: 'Kenia',
  },
  {
    name: 'Khand',
    category: 'sans-serif',
  },
  {
    name: 'Khmer',
  },
  {
    name: 'Khula',
    category: 'sans-serif',
  },
  {
    name: 'Kings',
    category: 'cursive',
  },
  {
    name: 'Kirang Haerang',
  },
  {
    name: 'Kite One',
    category: 'sans-serif',
  },
  {
    name: 'Kiwi Maru',
    category: 'serif',
  },
  {
    name: 'Klee One',
    category: 'cursive',
  },
  {
    name: 'Knewave',
  },
  {
    name: 'KoHo',
    category: 'sans-serif',
  },
  {
    name: 'Kodchasan',
    category: 'sans-serif',
  },
  {
    name: 'Koh Santepheap',
  },
  {
    name: 'Kosugi',
    category: 'sans-serif',
  },
  {
    name: 'Kosugi Maru',
    category: 'sans-serif',
  },
  {
    name: 'Kotta One',
    category: 'serif',
  },
  {
    name: 'Koulen',
  },
  {
    name: 'Kranky',
  },
  {
    name: 'Kreon',
    category: 'serif',
  },
  {
    name: 'Kristi',
    category: 'cursive',
  },
  {
    name: 'Krona One',
    category: 'sans-serif',
  },
  {
    name: 'Krub',
    category: 'sans-serif',
  },
  {
    name: 'Kufam',
    category: 'sans-serif',
  },
  {
    name: 'Kulim Park',
    category: 'sans-serif',
  },
  {
    name: 'Kumar One',
  },
  {
    name: 'Kumar One Outline',
  },
  {
    name: 'Kumbh Sans',
    category: 'sans-serif',
  },
  {
    name: 'Kurale',
    category: 'serif',
  },
  {
    name: 'La Belle Aurore',
    category: 'cursive',
  },
  {
    name: 'Lacquer',
  },
  {
    name: 'Laila',
    category: 'sans-serif',
  },
  {
    name: 'Lakki Reddy',
    category: 'cursive',
  },
  {
    name: 'Lalezar',
  },
  {
    name: 'Lancelot',
  },
  {
    name: 'Langar',
  },
  {
    name: 'Lateef',
    category: 'cursive',
  },
  {
    name: 'Lato',
    category: 'sans-serif',
  },
  {
    name: 'League Script',
    category: 'cursive',
  },
  {
    name: 'Leckerli One',
    category: 'cursive',
  },
  {
    name: 'Ledger',
    category: 'serif',
  },
  {
    name: 'Lekton',
    category: 'sans-serif',
  },
  {
    name: 'Lemon',
  },
  {
    name: 'Lemonada',
  },
  {
    name: 'Lexend',
    category: 'sans-serif',
  },
  {
    name: 'Lexend Deca',
    category: 'sans-serif',
  },
  {
    name: 'Lexend Exa',
    category: 'sans-serif',
  },
  {
    name: 'Lexend Giga',
    category: 'sans-serif',
  },
  {
    name: 'Lexend Mega',
    category: 'sans-serif',
  },
  {
    name: 'Lexend Peta',
    category: 'sans-serif',
  },
  {
    name: 'Lexend Tera',
    category: 'sans-serif',
  },
  {
    name: 'Lexend Zetta',
    category: 'sans-serif',
  },
  {
    name: 'Libre Barcode 128',
  },
  {
    name: 'Libre Barcode 128 Text',
  },
  {
    name: 'Libre Barcode 39',
  },
  {
    name: 'Libre Barcode 39 Extended',
  },
  {
    name: 'Libre Barcode 39 Extended Text',
  },
  {
    name: 'Libre Barcode 39 Text',
  },
  {
    name: 'Libre Barcode EAN13 Text',
  },
  {
    name: 'Libre Baskerville',
    category: 'serif',
  },
  {
    name: 'Libre Caslon Display',
    category: 'serif',
  },
  {
    name: 'Libre Caslon Text',
    category: 'serif',
  },
  {
    name: 'Libre Franklin',
    category: 'sans-serif',
  },
  {
    name: 'Life Savers',
  },
  {
    name: 'Lilita One',
  },
  {
    name: 'Lily Script One',
  },
  {
    name: 'Limelight',
  },
  {
    name: 'Linden Hill',
    category: 'serif',
  },
  {
    name: 'Literata',
    category: 'serif',
  },
  {
    name: 'Liu Jian Mao Cao',
    category: 'cursive',
  },
  {
    name: 'Livvic',
    category: 'sans-serif',
  },
  {
    name: 'Lobster',
  },
  {
    name: 'Lobster Two',
  },
  {
    name: 'Londrina Outline',
  },
  {
    name: 'Londrina Shadow',
  },
  {
    name: 'Londrina Sketch',
  },
  {
    name: 'Londrina Solid',
  },
  {
    name: 'Long Cang',
    category: 'cursive',
  },
  {
    name: 'Lora',
    category: 'serif',
  },
  {
    name: 'Love Ya Like A Sister',
  },
  {
    name: 'Loved by the King',
    category: 'cursive',
  },
  {
    name: 'Lovers Quarrel',
    category: 'cursive',
  },
  {
    name: 'Luckiest Guy',
  },
  {
    name: 'Lusitana',
    category: 'serif',
  },
  {
    name: 'Lustria',
    category: 'serif',
  },
  {
    name: 'Luxurious Script',
    category: 'cursive',
  },
  {
    name: 'M PLUS 1',
    category: 'sans-serif',
  },
  {
    name: 'M PLUS 1 Code',
    category: 'sans-serif',
  },
  {
    name: 'M PLUS 1p',
    category: 'sans-serif',
  },
  {
    name: 'M PLUS 2',
    category: 'sans-serif',
  },
  {
    name: 'M PLUS Code Latin',
    category: 'sans-serif',
  },
  {
    name: 'M PLUS Rounded 1c',
    category: 'sans-serif',
  },
  {
    name: 'Ma Shan Zheng',
    category: 'cursive',
  },
  {
    name: 'Macondo',
  },
  {
    name: 'Macondo Swash Caps',
  },
  {
    name: 'Mada',
    category: 'sans-serif',
  },
  {
    name: 'Magra',
    category: 'sans-serif',
  },
  {
    name: 'Maiden Orange',
  },
  {
    name: 'Maitree',
    category: 'serif',
  },
  {
    name: 'Major Mono Display',
    category: 'monospace',
  },
  {
    name: 'Mako',
    category: 'sans-serif',
  },
  {
    name: 'Mali',
    category: 'cursive',
  },
  {
    name: 'Mallanna',
    category: 'sans-serif',
  },
  {
    name: 'Mandali',
    category: 'sans-serif',
  },
  {
    name: 'Manjari',
    category: 'sans-serif',
  },
  {
    name: 'Manrope',
    category: 'sans-serif',
  },
  {
    name: 'Mansalva',
    category: 'cursive',
  },
  {
    name: 'Manuale',
    category: 'serif',
  },
  {
    name: 'Marcellus',
    category: 'serif',
  },
  {
    name: 'Marcellus SC',
    category: 'serif',
  },
  {
    name: 'Marck Script',
    category: 'cursive',
  },
  {
    name: 'Margarine',
  },
  {
    name: 'Markazi Text',
    category: 'serif',
  },
  {
    name: 'Marko One',
    category: 'serif',
  },
  {
    name: 'Marmelad',
    category: 'sans-serif',
  },
  {
    name: 'Martel',
    category: 'serif',
  },
  {
    name: 'Martel Sans',
    category: 'sans-serif',
  },
  {
    name: 'Marvel',
    category: 'sans-serif',
  },
  {
    name: 'Mate',
    category: 'serif',
  },
  {
    name: 'Mate SC',
    category: 'serif',
  },
  {
    name: 'Maven Pro',
    category: 'sans-serif',
  },
  {
    name: 'McLaren',
  },
  {
    name: 'Meddon',
    category: 'cursive',
  },
  {
    name: 'MedievalSharp',
  },
  {
    name: 'Medula One',
  },
  {
    name: 'Meera Inimai',
    category: 'sans-serif',
  },
  {
    name: 'Megrim',
  },
  {
    name: 'Meie Script',
    category: 'cursive',
  },
  {
    name: 'Meow Script',
    category: 'cursive',
  },
  {
    name: 'Merienda',
    category: 'cursive',
  },
  {
    name: 'Merienda One',
    category: 'cursive',
  },
  {
    name: 'Merriweather',
    category: 'serif',
  },
  {
    name: 'Merriweather Sans',
    category: 'sans-serif',
  },
  {
    name: 'Metal',
  },
  {
    name: 'Metal Mania',
  },
  {
    name: 'Metamorphous',
  },
  {
    name: 'Metrophobic',
    category: 'sans-serif',
  },
  {
    name: 'Michroma',
    category: 'sans-serif',
  },
  {
    name: 'Milonga',
  },
  {
    name: 'Miltonian',
  },
  {
    name: 'Miltonian Tattoo',
  },
  {
    name: 'Mina',
    category: 'sans-serif',
  },
  {
    name: 'Miniver',
  },
  {
    name: 'Miriam Libre',
    category: 'sans-serif',
  },
  {
    name: 'Mirza',
  },
  {
    name: 'Miss Fajardose',
    category: 'cursive',
  },
  {
    name: 'Mitr',
    category: 'sans-serif',
  },
  {
    name: 'Mochiy Pop One',
    category: 'sans-serif',
  },
  {
    name: 'Mochiy Pop P One',
    category: 'sans-serif',
  },
  {
    name: 'Modak',
  },
  {
    name: 'Modern Antiqua',
  },
  {
    name: 'Mogra',
  },
  {
    name: 'Mohave',
    category: 'sans-serif',
  },
  {
    name: 'Molengo',
    category: 'sans-serif',
  },
  {
    name: 'Molle',
    category: 'cursive',
  },
  {
    name: 'Monda',
    category: 'sans-serif',
  },
  {
    name: 'Monofett',
  },
  {
    name: 'Monoton',
  },
  {
    name: 'Monsieur La Doulaise',
    category: 'cursive',
  },
  {
    name: 'Montaga',
    category: 'serif',
  },
  {
    name: 'Montagu Slab',
    category: 'serif',
  },
  {
    name: 'MonteCarlo',
    category: 'cursive',
  },
  {
    name: 'Montez',
    category: 'cursive',
  },
  {
    name: 'Montserrat',
    category: 'sans-serif',
  },
  {
    name: 'Montserrat Alternates',
    category: 'sans-serif',
  },
  {
    name: 'Montserrat Subrayada',
    category: 'sans-serif',
  },
  {
    name: 'Moul',
  },
  {
    name: 'Moulpali',
  },
  {
    name: 'Mountains of Christmas',
  },
  {
    name: 'Mouse Memoirs',
    category: 'sans-serif',
  },
  {
    name: 'Mr Bedfort',
    category: 'cursive',
  },
  {
    name: 'Mr Dafoe',
    category: 'cursive',
  },
  {
    name: 'Mr De Haviland',
    category: 'cursive',
  },
  {
    name: 'Mrs Saint Delafield',
    category: 'cursive',
  },
  {
    name: 'Mrs Sheppards',
    category: 'cursive',
  },
  {
    name: 'Mukta',
    category: 'sans-serif',
  },
  {
    name: 'Mukta Mahee',
    category: 'sans-serif',
  },
  {
    name: 'Mukta Malar',
    category: 'sans-serif',
  },
  {
    name: 'Mukta Vaani',
    category: 'sans-serif',
  },
  {
    name: 'Mulish',
    category: 'sans-serif',
  },
  {
    name: 'Murecho',
    category: 'sans-serif',
  },
  {
    name: 'MuseoModerno',
  },
  {
    name: 'Mystery Quest',
  },
  {
    name: 'NTR',
    category: 'sans-serif',
  },
  {
    name: 'Nanum Brush Script',
    category: 'cursive',
  },
  {
    name: 'Nanum Gothic',
    category: 'sans-serif',
  },
  {
    name: 'Nanum Gothic Coding',
    category: 'monospace',
  },
  {
    name: 'Nanum Myeongjo',
    category: 'serif',
  },
  {
    name: 'Nanum Pen Script',
    category: 'cursive',
  },
  {
    name: 'Nerko One',
    category: 'cursive',
  },
  {
    name: 'Neucha',
    category: 'cursive',
  },
  {
    name: 'Neuton',
    category: 'serif',
  },
  {
    name: 'New Rocker',
  },
  {
    name: 'New Tegomin',
    category: 'serif',
  },
  {
    name: 'News Cycle',
    category: 'sans-serif',
  },
  {
    name: 'Newsreader',
    category: 'serif',
  },
  {
    name: 'Niconne',
    category: 'cursive',
  },
  {
    name: 'Niramit',
    category: 'sans-serif',
  },
  {
    name: 'Nixie One',
  },
  {
    name: 'Nobile',
    category: 'sans-serif',
  },
  {
    name: 'Nokora',
    category: 'sans-serif',
  },
  {
    name: 'Norican',
    category: 'cursive',
  },
  {
    name: 'Nosifer',
  },
  {
    name: 'Notable',
    category: 'sans-serif',
  },
  {
    name: 'Nothing You Could Do',
    category: 'cursive',
  },
  {
    name: 'Noticia Text',
    category: 'serif',
  },
  {
    name: 'Noto Kufi Arabic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Music',
    category: 'sans-serif',
  },
  {
    name: 'Noto Naskh Arabic',
    category: 'serif',
  },
  {
    name: 'Noto Nastaliq Urdu',
    category: 'serif',
  },
  {
    name: 'Noto Rashi Hebrew',
    category: 'serif',
  },
  {
    name: 'Noto Sans',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Adlam',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Adlam Unjoined',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Anatolian Hieroglyphs',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Arabic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Armenian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Avestan',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Balinese',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Bamum',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Bassa Vah',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Batak',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Bengali',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Bhaiksuki',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Brahmi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Buginese',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Buhid',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Canadian Aboriginal',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Carian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Caucasian Albanian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Chakma',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Cham',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Cherokee',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Coptic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Cuneiform',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Cypriot',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Deseret',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Devanagari',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Display',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Duployan',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Egyptian Hieroglyphs',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Elbasan',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Elymaic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Georgian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Glagolitic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Gothic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Grantha',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Gujarati',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Gunjala Gondi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Gurmukhi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans HK',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Hanifi Rohingya',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Hanunoo',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Hatran',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Hebrew',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Imperial Aramaic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Indic Siyaq Numbers',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Inscriptional Pahlavi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Inscriptional Parthian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans JP',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Javanese',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans KR',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Kaithi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Kannada',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Kayah Li',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Kharoshthi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Khmer',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Khojki',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Khudawadi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Lao',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Lepcha',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Limbu',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Linear A',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Linear B',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Lisu',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Lycian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Lydian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Mahajani',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Malayalam',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Mandaic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Manichaean',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Marchen',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Masaram Gondi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Math',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Mayan Numerals',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Medefaidrin',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Meetei Mayek',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Meroitic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Miao',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Modi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Mongolian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Mono',
    category: 'monospace',
  },
  {
    name: 'Noto Sans Mro',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Multani',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Myanmar',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans N Ko',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Nabataean',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans New Tai Lue',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Newa',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Nushu',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Ogham',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Ol Chiki',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old Hungarian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old Italic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old North Arabian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old Permic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old Persian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old Sogdian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old South Arabian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Old Turkic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Oriya',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Osage',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Osmanya',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Pahawh Hmong',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Palmyrene',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Pau Cin Hau',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Phags Pa',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Phoenician',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Psalter Pahlavi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Rejang',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Runic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans SC',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Samaritan',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Saurashtra',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Sharada',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Shavian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Siddham',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Sinhala',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Sogdian',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Sora Sompeng',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Soyombo',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Sundanese',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Syloti Nagri',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Symbols',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Symbols 2',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Syriac',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans TC',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tagalog',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tagbanwa',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tai Le',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tai Tham',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tai Viet',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Takri',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tamil',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tamil Supplement',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Telugu',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Thaana',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Thai',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Thai Looped',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tifinagh',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Tirhuta',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Ugaritic',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Vai',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Wancho',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Warang Citi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Yi',
    category: 'sans-serif',
  },
  {
    name: 'Noto Sans Zanabazar Square',
    category: 'sans-serif',
  },
  {
    name: 'Noto Serif',
    category: 'serif',
  },
  {
    name: 'Noto Serif Ahom',
    category: 'serif',
  },
  {
    name: 'Noto Serif Armenian',
    category: 'serif',
  },
  {
    name: 'Noto Serif Balinese',
    category: 'serif',
  },
  {
    name: 'Noto Serif Bengali',
    category: 'serif',
  },
  {
    name: 'Noto Serif Devanagari',
    category: 'serif',
  },
  {
    name: 'Noto Serif Display',
    category: 'serif',
  },
  {
    name: 'Noto Serif Dogra',
    category: 'serif',
  },
  {
    name: 'Noto Serif Ethiopic',
    category: 'serif',
  },
  {
    name: 'Noto Serif Georgian',
    category: 'serif',
  },
  {
    name: 'Noto Serif Grantha',
    category: 'serif',
  },
  {
    name: 'Noto Serif Gujarati',
    category: 'serif',
  },
  {
    name: 'Noto Serif Gurmukhi',
    category: 'serif',
  },
  {
    name: 'Noto Serif Hebrew',
    category: 'serif',
  },
  {
    name: 'Noto Serif JP',
    category: 'serif',
  },
  {
    name: 'Noto Serif KR',
    category: 'serif',
  },
  {
    name: 'Noto Serif Kannada',
    category: 'serif',
  },
  {
    name: 'Noto Serif Khmer',
    category: 'serif',
  },
  {
    name: 'Noto Serif Lao',
    category: 'serif',
  },
  {
    name: 'Noto Serif Malayalam',
    category: 'serif',
  },
  {
    name: 'Noto Serif Myanmar',
    category: 'serif',
  },
  {
    name: 'Noto Serif Nyiakeng Puachue Hmong',
    category: 'serif',
  },
  {
    name: 'Noto Serif SC',
    category: 'serif',
  },
  {
    name: 'Noto Serif Sinhala',
    category: 'serif',
  },
  {
    name: 'Noto Serif TC',
    category: 'serif',
  },
  {
    name: 'Noto Serif Tamil',
    category: 'serif',
  },
  {
    name: 'Noto Serif Tangut',
    category: 'serif',
  },
  {
    name: 'Noto Serif Telugu',
    category: 'serif',
  },
  {
    name: 'Noto Serif Thai',
    category: 'serif',
  },
  {
    name: 'Noto Serif Tibetan',
    category: 'serif',
  },
  {
    name: 'Noto Serif Yezidi',
    category: 'serif',
  },
  {
    name: 'Noto Traditional Nushu',
    category: 'sans-serif',
  },
  {
    name: 'Nova Cut',
  },
  {
    name: 'Nova Flat',
  },
  {
    name: 'Nova Mono',
    category: 'monospace',
  },
  {
    name: 'Nova Oval',
  },
  {
    name: 'Nova Round',
  },
  {
    name: 'Nova Script',
  },
  {
    name: 'Nova Slim',
  },
  {
    name: 'Nova Square',
  },
  {
    name: 'Numans',
    category: 'sans-serif',
  },
  {
    name: 'Nunito',
    category: 'sans-serif',
  },
  {
    name: 'Nunito Sans',
    category: 'sans-serif',
  },
  {
    name: 'Odibee Sans',
  },
  {
    name: 'Odor Mean Chey',
    category: 'serif',
  },
  {
    name: 'Offside',
  },
  {
    name: 'Oi',
  },
  {
    name: 'Old Standard TT',
    category: 'serif',
  },
  {
    name: 'Oldenburg',
  },
  {
    name: 'Oleo Script',
  },
  {
    name: 'Oleo Script Swash Caps',
  },
  {
    name: 'Open Sans',
    category: 'sans-serif',
  },
  {
    name: 'Open Sans Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Oranienbaum',
    category: 'serif',
  },
  {
    name: 'Orbitron',
    category: 'sans-serif',
  },
  {
    name: 'Oregano',
  },
  {
    name: 'Orelega One',
  },
  {
    name: 'Orienta',
    category: 'sans-serif',
  },
  {
    name: 'Original Surfer',
  },
  {
    name: 'Oswald',
    category: 'sans-serif',
  },
  {
    name: 'Otomanopee One',
    category: 'sans-serif',
  },
  {
    name: 'Outfit',
    category: 'sans-serif',
  },
  {
    name: 'Over the Rainbow',
    category: 'cursive',
  },
  {
    name: 'Overlock',
  },
  {
    name: 'Overlock SC',
  },
  {
    name: 'Overpass',
    category: 'sans-serif',
  },
  {
    name: 'Overpass Mono',
    category: 'monospace',
  },
  {
    name: 'Ovo',
    category: 'serif',
  },
  {
    name: 'Oxanium',
  },
  {
    name: 'Oxygen',
    category: 'sans-serif',
  },
  {
    name: 'Oxygen Mono',
    category: 'monospace',
  },
  {
    name: 'PT Mono',
    category: 'monospace',
  },
  {
    name: 'PT Sans',
    category: 'sans-serif',
  },
  {
    name: 'PT Sans Caption',
    category: 'sans-serif',
  },
  {
    name: 'PT Sans Narrow',
    category: 'sans-serif',
  },
  {
    name: 'PT Serif',
    category: 'serif',
  },
  {
    name: 'PT Serif Caption',
    category: 'serif',
  },
  {
    name: 'Pacifico',
    category: 'cursive',
  },
  {
    name: 'Padauk',
    category: 'sans-serif',
  },
  {
    name: 'Palanquin',
    category: 'sans-serif',
  },
  {
    name: 'Palanquin Dark',
    category: 'sans-serif',
  },
  {
    name: 'Palette Mosaic',
  },
  {
    name: 'Pangolin',
    category: 'cursive',
  },
  {
    name: 'Paprika',
  },
  {
    name: 'Parisienne',
    category: 'cursive',
  },
  {
    name: 'Passero One',
  },
  {
    name: 'Passion One',
  },
  {
    name: 'Passions Conflict',
    category: 'cursive',
  },
  {
    name: 'Pathway Gothic One',
    category: 'sans-serif',
  },
  {
    name: 'Patrick Hand',
    category: 'cursive',
  },
  {
    name: 'Patrick Hand SC',
    category: 'cursive',
  },
  {
    name: 'Pattaya',
    category: 'sans-serif',
  },
  {
    name: 'Patua One',
  },
  {
    name: 'Pavanam',
    category: 'sans-serif',
  },
  {
    name: 'Paytone One',
    category: 'sans-serif',
  },
  {
    name: 'Peddana',
    category: 'serif',
  },
  {
    name: 'Peralta',
  },
  {
    name: 'Permanent Marker',
    category: 'cursive',
  },
  {
    name: 'Petemoss',
    category: 'cursive',
  },
  {
    name: 'Petit Formal Script',
    category: 'cursive',
  },
  {
    name: 'Petrona',
    category: 'serif',
  },
  {
    name: 'Philosopher',
    category: 'sans-serif',
  },
  {
    name: 'Piazzolla',
    category: 'serif',
  },
  {
    name: 'Piedra',
  },
  {
    name: 'Pinyon Script',
    category: 'cursive',
  },
  {
    name: 'Pirata One',
  },
  {
    name: 'Plaster',
  },
  {
    name: 'Play',
    category: 'sans-serif',
  },
  {
    name: 'Playball',
  },
  {
    name: 'Playfair Display',
    category: 'serif',
  },
  {
    name: 'Playfair Display SC',
    category: 'serif',
  },
  {
    name: 'Podkova',
    category: 'serif',
  },
  {
    name: 'Poiret One',
  },
  {
    name: 'Poller One',
  },
  {
    name: 'Poly',
    category: 'serif',
  },
  {
    name: 'Pompiere',
  },
  {
    name: 'Pontano Sans',
    category: 'sans-serif',
  },
  {
    name: 'Poor Story',
  },
  {
    name: 'Poppins',
    category: 'sans-serif',
  },
  {
    name: 'Port Lligat Sans',
    category: 'sans-serif',
  },
  {
    name: 'Port Lligat Slab',
    category: 'serif',
  },
  {
    name: 'Potta One',
  },
  {
    name: 'Pragati Narrow',
    category: 'sans-serif',
  },
  {
    name: 'Praise',
    category: 'cursive',
  },
  {
    name: 'Prata',
    category: 'serif',
  },
  {
    name: 'Preahvihear',
    category: 'sans-serif',
  },
  {
    name: 'Press Start 2P',
  },
  {
    name: 'Pridi',
    category: 'serif',
  },
  {
    name: 'Princess Sofia',
    category: 'cursive',
  },
  {
    name: 'Prociono',
    category: 'serif',
  },
  {
    name: 'Prompt',
    category: 'sans-serif',
  },
  {
    name: 'Prosto One',
  },
  {
    name: 'Proza Libre',
    category: 'sans-serif',
  },
  {
    name: 'Public Sans',
    category: 'sans-serif',
  },
  {
    name: 'Puppies Play',
    category: 'cursive',
  },
  {
    name: 'Puritan',
    category: 'sans-serif',
  },
  {
    name: 'Purple Purse',
  },
  {
    name: 'Qahiri',
    category: 'sans-serif',
  },
  {
    name: 'Quando',
    category: 'serif',
  },
  {
    name: 'Quantico',
    category: 'sans-serif',
  },
  {
    name: 'Quattrocento',
    category: 'serif',
  },
  {
    name: 'Quattrocento Sans',
    category: 'sans-serif',
  },
  {
    name: 'Questrial',
    category: 'sans-serif',
  },
  {
    name: 'Quicksand',
    category: 'sans-serif',
  },
  {
    name: 'Quintessential',
    category: 'cursive',
  },
  {
    name: 'Qwigley',
    category: 'cursive',
  },
  {
    name: 'Racing Sans One',
  },
  {
    name: 'Radley',
    category: 'serif',
  },
  {
    name: 'Rajdhani',
    category: 'sans-serif',
  },
  {
    name: 'Rakkas',
  },
  {
    name: 'Raleway',
    category: 'sans-serif',
  },
  {
    name: 'Raleway Dots',
  },
  {
    name: 'Ramabhadra',
    category: 'sans-serif',
  },
  {
    name: 'Ramaraja',
    category: 'serif',
  },
  {
    name: 'Rambla',
    category: 'sans-serif',
  },
  {
    name: 'Rammetto One',
  },
  {
    name: 'Rampart One',
  },
  {
    name: 'Ranchers',
  },
  {
    name: 'Rancho',
    category: 'cursive',
  },
  {
    name: 'Ranga',
  },
  {
    name: 'Rasa',
    category: 'serif',
  },
  {
    name: 'Rationale',
    category: 'sans-serif',
  },
  {
    name: 'Ravi Prakash',
  },
  {
    name: 'Readex Pro',
    category: 'sans-serif',
  },
  {
    name: 'Recursive',
    category: 'sans-serif',
  },
  {
    name: 'Red Hat Display',
    category: 'sans-serif',
  },
  {
    name: 'Red Hat Mono',
    category: 'monospace',
  },
  {
    name: 'Red Hat Text',
    category: 'sans-serif',
  },
  {
    name: 'Red Rose',
  },
  {
    name: 'Redacted',
  },
  {
    name: 'Redacted Script',
  },
  {
    name: 'Redressed',
    category: 'cursive',
  },
  {
    name: 'Reem Kufi',
    category: 'sans-serif',
  },
  {
    name: 'Reenie Beanie',
    category: 'cursive',
  },
  {
    name: 'Reggae One',
  },
  {
    name: 'Revalia',
  },
  {
    name: 'Rhodium Libre',
    category: 'serif',
  },
  {
    name: 'Ribeye',
  },
  {
    name: 'Ribeye Marrow',
  },
  {
    name: 'Righteous',
  },
  {
    name: 'Risque',
  },
  {
    name: 'Road Rage',
  },
  {
    name: 'Roboto',
    category: 'sans-serif',
  },
  {
    name: 'Roboto Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Roboto Mono',
    category: 'monospace',
  },
  {
    name: 'Roboto Slab',
    category: 'serif',
  },
  {
    name: 'Rochester',
    category: 'cursive',
  },
  {
    name: 'Rock Salt',
    category: 'cursive',
  },
  {
    name: 'RocknRoll One',
    category: 'sans-serif',
  },
  {
    name: 'Rokkitt',
    category: 'serif',
  },
  {
    name: 'Romanesco',
    category: 'cursive',
  },
  {
    name: 'Ropa Sans',
    category: 'sans-serif',
  },
  {
    name: 'Rosario',
    category: 'sans-serif',
  },
  {
    name: 'Rosarivo',
    category: 'serif',
  },
  {
    name: 'Rouge Script',
    category: 'cursive',
  },
  {
    name: 'Rowdies',
  },
  {
    name: 'Rozha One',
    category: 'serif',
  },
  {
    name: 'Rubik',
    category: 'sans-serif',
  },
  {
    name: 'Rubik Beastly',
  },
  {
    name: 'Rubik Mono One',
    category: 'sans-serif',
  },
  {
    name: 'Ruda',
    category: 'sans-serif',
  },
  {
    name: 'Rufina',
    category: 'serif',
  },
  {
    name: 'Ruge Boogie',
    category: 'cursive',
  },
  {
    name: 'Ruluko',
    category: 'sans-serif',
  },
  {
    name: 'Rum Raisin',
    category: 'sans-serif',
  },
  {
    name: 'Ruslan Display',
  },
  {
    name: 'Russo One',
    category: 'sans-serif',
  },
  {
    name: 'Ruthie',
    category: 'cursive',
  },
  {
    name: 'Rye',
  },
  {
    name: 'STIX Two Text',
    category: 'serif',
  },
  {
    name: 'Sacramento',
    category: 'cursive',
  },
  {
    name: 'Sahitya',
    category: 'serif',
  },
  {
    name: 'Sail',
  },
  {
    name: 'Saira',
    category: 'sans-serif',
  },
  {
    name: 'Saira Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Saira Extra Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Saira Semi Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Saira Stencil One',
  },
  {
    name: 'Salsa',
  },
  {
    name: 'Sanchez',
    category: 'serif',
  },
  {
    name: 'Sancreek',
  },
  {
    name: 'Sansita',
    category: 'sans-serif',
  },
  {
    name: 'Sansita Swashed',
  },
  {
    name: 'Sarabun',
    category: 'sans-serif',
  },
  {
    name: 'Sarala',
    category: 'sans-serif',
  },
  {
    name: 'Sarina',
  },
  {
    name: 'Sarpanch',
    category: 'sans-serif',
  },
  {
    name: 'Sassy Frass',
    category: 'cursive',
  },
  {
    name: 'Satisfy',
    category: 'cursive',
  },
  {
    name: 'Sawarabi Gothic',
    category: 'sans-serif',
  },
  {
    name: 'Sawarabi Mincho',
    category: 'sans-serif',
  },
  {
    name: 'Scada',
    category: 'sans-serif',
  },
  {
    name: 'Scheherazade New',
    category: 'serif',
  },
  {
    name: 'Schoolbell',
    category: 'cursive',
  },
  {
    name: 'Scope One',
    category: 'serif',
  },
  {
    name: 'Seaweed Script',
  },
  {
    name: 'Secular One',
    category: 'sans-serif',
  },
  {
    name: 'Sedgwick Ave',
    category: 'cursive',
  },
  {
    name: 'Sedgwick Ave Display',
    category: 'cursive',
  },
  {
    name: 'Sen',
    category: 'sans-serif',
  },
  {
    name: 'Sevillana',
  },
  {
    name: 'Seymour One',
    category: 'sans-serif',
  },
  {
    name: 'Shadows Into Light',
    category: 'cursive',
  },
  {
    name: 'Shadows Into Light Two',
    category: 'cursive',
  },
  {
    name: 'Shalimar',
    category: 'cursive',
  },
  {
    name: 'Shanti',
    category: 'sans-serif',
  },
  {
    name: 'Share',
  },
  {
    name: 'Share Tech',
    category: 'sans-serif',
  },
  {
    name: 'Share Tech Mono',
    category: 'monospace',
  },
  {
    name: 'Shippori Antique',
    category: 'sans-serif',
  },
  {
    name: 'Shippori Antique B1',
    category: 'sans-serif',
  },
  {
    name: 'Shippori Mincho',
    category: 'serif',
  },
  {
    name: 'Shippori Mincho B1',
    category: 'serif',
  },
  {
    name: 'Shojumaru',
  },
  {
    name: 'Short Stack',
    category: 'cursive',
  },
  {
    name: 'Shrikhand',
  },
  {
    name: 'Siemreap',
  },
  {
    name: 'Sigmar One',
  },
  {
    name: 'Signika',
    category: 'sans-serif',
  },
  {
    name: 'Signika Negative',
    category: 'sans-serif',
  },
  {
    name: 'Simonetta',
  },
  {
    name: 'Single Day',
  },
  {
    name: 'Sintony',
    category: 'sans-serif',
  },
  {
    name: 'Sirin Stencil',
  },
  {
    name: 'Six Caps',
    category: 'sans-serif',
  },
  {
    name: 'Skranji',
  },
  {
    name: 'Slabo 13px',
    category: 'serif',
  },
  {
    name: 'Slabo 27px',
    category: 'serif',
  },
  {
    name: 'Slackey',
  },
  {
    name: 'Smokum',
  },
  {
    name: 'Smooch',
    category: 'cursive',
  },
  {
    name: 'Smythe',
  },
  {
    name: 'Sniglet',
  },
  {
    name: 'Snippet',
    category: 'sans-serif',
  },
  {
    name: 'Snowburst One',
  },
  {
    name: 'Sofadi One',
  },
  {
    name: 'Sofia',
    category: 'cursive',
  },
  {
    name: 'Solway',
    category: 'serif',
  },
  {
    name: 'Song Myung',
    category: 'serif',
  },
  {
    name: 'Sonsie One',
  },
  {
    name: 'Sora',
    category: 'sans-serif',
  },
  {
    name: 'Sorts Mill Goudy',
    category: 'serif',
  },
  {
    name: 'Source Code Pro',
    category: 'monospace',
  },
  {
    name: 'Source Sans 3',
    category: 'sans-serif',
  },
  {
    name: 'Source Sans Pro',
    category: 'sans-serif',
  },
  {
    name: 'Source Serif Pro',
    category: 'serif',
  },
  {
    name: 'Space Grotesk',
    category: 'sans-serif',
  },
  {
    name: 'Space Mono',
    category: 'monospace',
  },
  {
    name: 'Spartan',
    category: 'sans-serif',
  },
  {
    name: 'Special Elite',
  },
  {
    name: 'Spectral',
    category: 'serif',
  },
  {
    name: 'Spectral SC',
    category: 'serif',
  },
  {
    name: 'Spicy Rice',
  },
  {
    name: 'Spinnaker',
    category: 'sans-serif',
  },
  {
    name: 'Spirax',
  },
  {
    name: 'Squada One',
  },
  {
    name: 'Sree Krushnadevaraya',
    category: 'serif',
  },
  {
    name: 'Sriracha',
    category: 'cursive',
  },
  {
    name: 'Srisakdi',
  },
  {
    name: 'Staatliches',
  },
  {
    name: 'Stalemate',
    category: 'cursive',
  },
  {
    name: 'Stalinist One',
  },
  {
    name: 'Stardos Stencil',
  },
  {
    name: 'Stick',
    category: 'sans-serif',
  },
  {
    name: 'Stick No Bills',
    category: 'sans-serif',
  },
  {
    name: 'Stint Ultra Condensed',
  },
  {
    name: 'Stint Ultra Expanded',
  },
  {
    name: 'Stoke',
    category: 'serif',
  },
  {
    name: 'Strait',
    category: 'sans-serif',
  },
  {
    name: 'Style Script',
    category: 'cursive',
  },
  {
    name: 'Stylish',
    category: 'sans-serif',
  },
  {
    name: 'Sue Ellen Francisco',
    category: 'cursive',
  },
  {
    name: 'Suez One',
    category: 'serif',
  },
  {
    name: 'Sulphur Point',
    category: 'sans-serif',
  },
  {
    name: 'Sumana',
    category: 'serif',
  },
  {
    name: 'Sunflower',
    category: 'sans-serif',
  },
  {
    name: 'Sunshiney',
    category: 'cursive',
  },
  {
    name: 'Supermercado One',
  },
  {
    name: 'Sura',
    category: 'serif',
  },
  {
    name: 'Suranna',
    category: 'serif',
  },
  {
    name: 'Suravaram',
    category: 'serif',
  },
  {
    name: 'Suwannaphum',
    category: 'serif',
  },
  {
    name: 'Swanky and Moo Moo',
    category: 'cursive',
  },
  {
    name: 'Syncopate',
    category: 'sans-serif',
  },
  {
    name: 'Syne',
    category: 'sans-serif',
  },
  {
    name: 'Syne Mono',
    category: 'monospace',
  },
  {
    name: 'Syne Tactile',
  },
  {
    name: 'Tajawal',
    category: 'sans-serif',
  },
  {
    name: 'Tangerine',
    category: 'cursive',
  },
  {
    name: 'Taprom',
  },
  {
    name: 'Tauri',
    category: 'sans-serif',
  },
  {
    name: 'Taviraj',
    category: 'serif',
  },
  {
    name: 'Teko',
    category: 'sans-serif',
  },
  {
    name: 'Telex',
    category: 'sans-serif',
  },
  {
    name: 'Tenali Ramakrishna',
    category: 'sans-serif',
  },
  {
    name: 'Tenor Sans',
    category: 'sans-serif',
  },
  {
    name: 'Text Me One',
    category: 'sans-serif',
  },
  {
    name: 'Texturina',
    category: 'serif',
  },
  {
    name: 'Thasadith',
    category: 'sans-serif',
  },
  {
    name: 'The Girl Next Door',
    category: 'cursive',
  },
  {
    name: 'Tienne',
    category: 'serif',
  },
  {
    name: 'Tillana',
    category: 'cursive',
  },
  {
    name: 'Timmana',
    category: 'sans-serif',
  },
  {
    name: 'Tinos',
    category: 'serif',
  },
  {
    name: 'Titan One',
  },
  {
    name: 'Titillium Web',
    category: 'sans-serif',
  },
  {
    name: 'Tomorrow',
    category: 'sans-serif',
  },
  {
    name: 'Tourney',
  },
  {
    name: 'Trade Winds',
  },
  {
    name: 'Train One',
  },
  {
    name: 'Trirong',
    category: 'serif',
  },
  {
    name: 'Trispace',
    category: 'sans-serif',
  },
  {
    name: 'Trocchi',
    category: 'serif',
  },
  {
    name: 'Trochut',
  },
  {
    name: 'Truculenta',
    category: 'sans-serif',
  },
  {
    name: 'Trykker',
    category: 'serif',
  },
  {
    name: 'Tulpen One',
  },
  {
    name: 'Turret Road',
  },
  {
    name: 'Ubuntu',
    category: 'sans-serif',
  },
  {
    name: 'Ubuntu Condensed',
    category: 'sans-serif',
  },
  {
    name: 'Ubuntu Mono',
    category: 'monospace',
  },
  {
    name: 'Uchen',
    category: 'serif',
  },
  {
    name: 'Ultra',
    category: 'serif',
  },
  {
    name: 'Uncial Antiqua',
  },
  {
    name: 'Underdog',
  },
  {
    name: 'Unica One',
  },
  {
    name: 'UnifrakturCook',
  },
  {
    name: 'UnifrakturMaguntia',
  },
  {
    name: 'Unkempt',
  },
  {
    name: 'Unlock',
  },
  {
    name: 'Unna',
    category: 'serif',
  },
  {
    name: 'Urbanist',
    category: 'sans-serif',
  },
  {
    name: 'VT323',
    category: 'monospace',
  },
  {
    name: 'Vampiro One',
  },
  {
    name: 'Varela',
    category: 'sans-serif',
  },
  {
    name: 'Varela Round',
    category: 'sans-serif',
  },
  {
    name: 'Varta',
    category: 'sans-serif',
  },
  {
    name: 'Vast Shadow',
  },
  {
    name: 'Vesper Libre',
    category: 'serif',
  },
  {
    name: 'Viaoda Libre',
  },
  {
    name: 'Vibes',
  },
  {
    name: 'Vibur',
    category: 'cursive',
  },
  {
    name: 'Vidaloka',
    category: 'serif',
  },
  {
    name: 'Viga',
    category: 'sans-serif',
  },
  {
    name: 'Voces',
  },
  {
    name: 'Volkhov',
    category: 'serif',
  },
  {
    name: 'Vollkorn',
    category: 'serif',
  },
  {
    name: 'Vollkorn SC',
    category: 'serif',
  },
  {
    name: 'Voltaire',
    category: 'sans-serif',
  },
  {
    name: 'Waiting for the Sunrise',
    category: 'cursive',
  },
  {
    name: 'Wallpoet',
  },
  {
    name: 'Walter Turncoat',
    category: 'cursive',
  },
  {
    name: 'Warnes',
  },
  {
    name: 'Wellfleet',
  },
  {
    name: 'Wendy One',
    category: 'sans-serif',
  },
  {
    name: 'WindSong',
    category: 'cursive',
  },
  {
    name: 'Wire One',
    category: 'sans-serif',
  },
  {
    name: 'Work Sans',
    category: 'sans-serif',
  },
  {
    name: 'Xanh Mono',
    category: 'monospace',
  },
  {
    name: 'Yaldevi',
    category: 'sans-serif',
  },
  {
    name: 'Yanone Kaffeesatz',
    category: 'sans-serif',
  },
  {
    name: 'Yantramanav',
    category: 'sans-serif',
  },
  {
    name: 'Yatra One',
  },
  {
    name: 'Yellowtail',
    category: 'cursive',
  },
  {
    name: 'Yeon Sung',
  },
  {
    name: 'Yeseva One',
  },
  {
    name: 'Yesteryear',
    category: 'cursive',
  },
  {
    name: 'Yomogi',
    category: 'cursive',
  },
  {
    name: 'Yrsa',
    category: 'serif',
  },
  {
    name: 'Yuji Boku',
    category: 'serif',
  },
  {
    name: 'Yuji Mai',
    category: 'serif',
  },
  {
    name: 'Yuji Syuku',
    category: 'serif',
  },
  {
    name: 'Yusei Magic',
    category: 'sans-serif',
  },
  {
    name: 'ZCOOL KuaiLe',
  },
  {
    name: 'ZCOOL QingKe HuangYou',
  },
  {
    name: 'ZCOOL XiaoWei',
    category: 'serif',
  },
  {
    name: 'Zen Antique',
    category: 'serif',
  },
  {
    name: 'Zen Antique Soft',
    category: 'serif',
  },
  {
    name: 'Zen Dots',
  },
  {
    name: 'Zen Kaku Gothic Antique',
    category: 'sans-serif',
  },
  {
    name: 'Zen Kaku Gothic New',
    category: 'sans-serif',
  },
  {
    name: 'Zen Kurenaido',
    category: 'sans-serif',
  },
  {
    name: 'Zen Loop',
  },
  {
    name: 'Zen Maru Gothic',
    category: 'sans-serif',
  },
  {
    name: 'Zen Old Mincho',
    category: 'serif',
  },
  {
    name: 'Zen Tokyo Zoo',
  },
  {
    name: 'Zeyada',
    category: 'cursive',
  },
  {
    name: 'Zhi Mang Xing',
    category: 'cursive',
  },
  {
    name: 'Zilla Slab',
    category: 'serif',
  },
  {
    name: 'Zilla Slab Highlight',
  },
]

export const fontList = googleFonts.map(f => f.name)

export const fontDict = googleFonts.reduce((memo, f) => ({
  ...memo,
  [f.name]: {
    ...f,
    fontFamily: [`"${f.name}"`, f.category].filter(Boolean).join(', '),
    link: googleFontLink + f.name.replace(/ /gi, '+') + googleFontQuery,
  },
}), {})
