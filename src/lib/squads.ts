// Official FIFA World Cup 2026 final 26-man squads (web-verified June 2026).
// Powers the Man-of-the-Match picker, scoped to the two teams in a match.
// Free text is still allowed, so anyone missing can be typed.
export const SQUADS: Record<string, string[]> = {
  'South Africa': [
    'Ronwen Williams', 'Sipho Chaine', 'Ricardo Goss', 'Khuliso Mudau', 'Aubrey Modiba', 'Khulumani Ndamane',
    'Nkosinathi Sibisi', 'Mbekezeli Mbokazi', 'Ime Okon', 'Thabang Matuludi', 'Samukele Kabini', 'Olwethu Makhanya',
    'Bradley Cross', 'Teboho Mokoena', 'Thalente Mbatha', 'Themba Zwane', 'Sphephelo Sithole', 'Jayden Adams',
    'Lyle Foster', 'Oswin Appollis', 'Tshepang Moremi', 'Relebohile Mofokeng', 'Thapelo Maseko', 'Iqraam Rayners',
    'Evidence Makgopa', 'Kamogelo Sebelebele',
  ],
  Canada: [
    'Dayne St. Clair', 'Maxime Crépeau', 'Tom McGill', 'Moïse Bombito', 'Derek Cornelius', 'Alphonso Davies',
    'Luc de Fougerolles', 'Alistair Johnston', 'Alfie Jones', 'Richie Laryea', 'Niko Sigur', 'Joel Waterman',
    'Ali Ahmed', 'Tajon Buchanan', 'Mathieu Choinière', 'Stephen Eustáquio', 'Marcelo Flores', 'Ismaël Koné',
    'Liam Millar', 'Jonathan Osorio', 'Nathan Saliba', 'Jacob Shaffelburg', 'Jonathan David', 'Promise David',
    'Cyle Larin', 'Tani Oluwaseyi',
  ],
  Netherlands: [
    'Bart Verbruggen', 'Mark Flekken', 'Robin Roefs', 'Virgil van Dijk', 'Nathan Aké', 'Micky van de Ven',
    'Jan Paul van Hecke', 'Denzel Dumfries', 'Jorrel Hato', 'Lutsharel Geertruida', 'Frenkie de Jong',
    'Tijjani Reijnders', 'Ryan Gravenberch', 'Teun Koopmeiners', 'Quinten Timber', 'Guus Til', 'Mats Wieffer',
    'Marten de Roon', 'Memphis Depay', 'Cody Gakpo', 'Justin Kluivert', 'Noa Lang', 'Donyell Malen',
    'Crysencio Summerville', 'Wout Weghorst', 'Brian Brobbey',
  ],
  Morocco: [
    'Yassine Bounou', 'Munir El Kajoui', 'Ahmed Reda Tagnaouti', 'Achraf Hakimi', 'Noussair Mazraoui',
    'Anass Salah-Eddine', 'Zakaria El Ouahdi', 'Radouane Halhal', 'Chadi Riad', 'Issa Diop', 'Youssef Belammari',
    'Marwane Saâdane', 'Sofyan Amrabat', 'Azzedine Ounahi', 'Bilal El Khannouss', 'Ismael Saibari',
    'Neil El Aynaoui', 'Ayyoub Bouaddi', 'Samir El Mourabet', 'Brahim Díaz', 'Ayoub El Kaabi', 'Soufiane Rahimi',
    'Chemsdine Talbi', 'Yassine Gessime', 'Amine Sbaï', 'Ayoube Amaimouni',
  ],
  Germany: [
    'Manuel Neuer', 'Oliver Baumann', 'Alexander Nübel', 'Antonio Rüdiger', 'Waldemar Anton', 'Jonathan Tah',
    'Aleksandar Pavlović', 'Nico Schlotterbeck', 'David Raum', 'Nathaniel Brown', 'Malick Thiaw', 'Joshua Kimmich',
    'Leon Goretzka', 'Angelo Stiller', 'Pascal Groß', 'Nadiem Amiri', 'Assan Ouédraogo', 'Felix Nmecha',
    'Kai Havertz', 'Jamal Musiala', 'Jamie Leweling', 'Nick Woltemade', 'Florian Wirtz', 'Leroy Sané',
    'Maximilian Beier', 'Deniz Undav',
  ],
  Paraguay: [
    'Gatito Fernández', 'Gustavo Velázquez', 'Omar Alderete', 'Juan José Cáceres', 'Fabián Balbuena',
    'Júnior Alonso', 'Ramón Sosa', 'Diego Gómez', 'Miguel Almirón', 'Andrés Cubas', 'Gustavo Gómez',
    'Damián Bobadilla', 'Kaku', 'Braian Ojeda', 'Gastón Olveira', 'Matías Galarza', 'Alexandro Maidana',
    'Antonio Sanabria', 'Maurício', 'Orlando Gill', 'José Canale', 'Álex Arce', 'Julio Enciso', 'Gabriel Ávalos',
    'Gustavo Caballero', 'Isidro Pitta',
  ],
  France: [
    'Mike Maignan', 'Brice Samba', 'Robin Risser', 'Malo Gusto', 'Lucas Digne', 'Dayot Upamecano', 'Jules Koundé',
    'Ibrahima Konaté', 'William Saliba', 'Théo Hernandez', 'Lucas Hernandez', 'Maxence Lacroix', 'Manu Koné',
    'Aurélien Tchouaméni', "N'Golo Kanté", 'Adrien Rabiot', 'Warren Zaïre-Emery', 'Rayan Cherki',
    'Maghnes Akliouche', 'Ousmane Dembélé', 'Marcus Thuram', 'Kylian Mbappé', 'Michael Olise', 'Bradley Barcola',
    'Désiré Doué', 'Jean-Philippe Mateta',
  ],
  Sweden: [
    'Jacob Widell Zetterström', 'Viktor Johansson', 'Kristoffer Nordfeldt', 'Gustaf Lagerbielke', 'Victor Lindelöf',
    'Isak Hien', 'Gabriel Gudmundsson', 'Herman Johansson', 'Carl Starfelt', 'Elliot Stroud', 'Lucas Bergvall',
    'Daniel Svensson', 'Benjamin Nygren', 'Ken Sema', 'Hjalmar Ekdal', 'Jesper Karlström', 'Yasin Ayari',
    'Mattias Svanberg', 'Eric Smith', 'Alexander Bernhardsson', 'Besfort Zeneli', 'Alexander Isak',
    'Anthony Elanga', 'Viktor Gyökeres', 'Gustaf Nilsson', 'Taha Ali',
  ],
  Belgium: [
    'Thibaut Courtois', 'Senne Lammens', 'Mike Penders', 'Timothy Castagne', 'Zeno Debast', 'Maxim De Cuyper',
    'Koni De Winter', 'Brandon Mechele', 'Thomas Meunier', 'Nathan Ngoy', 'Joaquin Seys', 'Arthur Theate',
    'Kevin De Bruyne', 'Amadou Onana', 'Nicolas Raskin', 'Youri Tielemans', 'Hans Vanaken', 'Axel Witsel',
    'Charles De Ketelaere', 'Jeremy Doku', 'Matias Fernandez-Pardo', 'Romelu Lukaku', 'Dodi Lukebakio',
    'Diego Moreira', 'Alexis Saelemaekers', 'Leandro Trossard',
  ],
  Senegal: [
    'Édouard Mendy', 'Mory Diaw', 'Yehvann Diouf', 'Kalidou Koulibaly', 'Krépin Diatta', 'Moussa Niakhaté',
    'Ismaïl Jakobs', 'Abdoulaye Seck', 'El Hadji Malick Diouf', 'Mamadou Sarr', 'Antoine Mendy',
    'Idrissa Gana Gueye', 'Pape Gueye', 'Pape Matar Sarr', 'Lamine Camara', 'Pathé Ciss', 'Habib Diarra',
    'Bara Sapoko Ndiaye', 'Sadio Mané', 'Ismaïla Sarr', 'Iliman Ndiaye', 'Nicolas Jackson', 'Bamba Dieng',
    'Cherif Ndiaye', 'Ibrahim Mbaye', 'Assane Diao',
  ],
  USA: [
    'Chris Brady', 'Matt Freese', 'Matt Turner', 'Max Arfsten', 'Sergiño Dest', 'Alex Freeman', 'Mark McKenzie',
    'Tim Ream', 'Chris Richards', 'Antonee Robinson', 'Miles Robinson', 'Joe Scally', 'Auston Trusty',
    'Tyler Adams', 'Sebastian Berhalter', 'Weston McKennie', 'Gio Reyna', 'Cristian Roldan', 'Malik Tillman',
    'Brenden Aaronson', 'Folarin Balogun', 'Ricardo Pepi', 'Christian Pulisic', 'Tim Weah', 'Haji Wright',
    'Alex Zendejas',
  ],
  'Bosnia and Herzegovina': [
    'Nikola Vasilj', 'Martin Zlomislić', 'Dennis Hadžikadunić', 'Nihad Mujakić', 'Tarik Muharemović',
    'Sead Kolašinac', 'Amar Dedić', 'Nikola Katić', 'Stjepan Radeljić', 'Benjamin Tahirović', 'Armin Gigović',
    'Amir Hadžiahmetović', 'Ivan Šunjić', 'Ivan Bašić', 'Dženis Burnić', 'Amar Memić', 'Ermin Mahmić',
    'Kerim Alajbegović', 'Esmir Bajraktarević', 'Ermedin Demirović', 'Edin Džeko', 'Samed Baždar',
    'Haris Tabaković', 'Jovo Lukić', 'Mladen Jurkas', 'Arjan Malić',
  ],
  Spain: [
    'Unai Simón', 'David Raya', 'Joan García', 'Marc Cucurella', 'Alejandro Grimaldo', 'Pau Cubarsí', 'Eric García',
    'Aymeric Laporte', 'Marc Pubill', 'Marcos Llorente', 'Pedro Porro', 'Mikel Merino', 'Pedri', 'Fabián Ruiz',
    'Martín Zubimendi', 'Gavi', 'Rodri', 'Álex Baena', 'Mikel Oyarzabal', 'Dani Olmo', 'Nico Williams',
    'Yéremy Pino', 'Ferran Torres', 'Borja Iglesias', 'Víctor Muñoz', 'Lamine Yamal',
  ],
  Austria: [
    'Patrick Pentz', 'Alexander Schlager', 'Florian Wiegele', 'David Affengruber', 'David Alaba', 'Kevin Danso',
    'Marco Friedl', 'Philipp Lienhart', 'Phillipp Mwene', 'Stefan Posch', 'Alexander Prass', 'Michael Svoboda',
    'Christoph Baumgartner', 'Carney Chukwuemeka', 'Florian Grillitsch', 'Konrad Laimer', 'Marcel Sabitzer',
    'Xaver Schlager', 'Romano Schmid', 'Alessandro Schopf', 'Nicolas Seiwald', 'Paul Wanner', 'Patrick Wimmer',
    'Marko Arnautović', 'Michael Gregoritsch', 'Saša Kalajdžić',
  ],
  Portugal: [
    'Diogo Costa', 'Rui Silva', 'José Sá', 'João Cancelo', 'Diogo Dalot', 'Nélson Semedo', 'Nuno Mendes',
    'Matheus Nunes', 'Rúben Dias', 'Gonçalo Inácio', 'Renato Veiga', 'Tomás Araújo', 'Rúben Neves', 'João Neves',
    'Vitinha', 'Bruno Fernandes', 'Bernardo Silva', 'Samuel Costa', 'Cristiano Ronaldo', 'Gonçalo Ramos',
    'João Félix', 'Francisco Conceição', 'Rafael Leão', 'Pedro Neto', 'Francisco Trincão', 'Gonçalo Guedes',
  ],
  Croatia: [
    'Dominik Livaković', 'Dominik Kotarski', 'Ivor Pandur', 'Joško Gvardiol', 'Duje Ćaleta-Car', 'Josip Šutalo',
    'Josip Stanišić', 'Marin Pongračić', 'Martin Erlić', 'Luka Vušković', 'Luka Modrić', 'Mateo Kovačić',
    'Mario Pašalić', 'Nikola Vlašić', 'Luka Sučić', 'Martin Baturina', 'Kristijan Jakić', 'Petar Sučić',
    'Nikola Moro', 'Toni Fruk', 'Ivan Perišić', 'Andrej Kramarić', 'Ante Budimir', 'Marco Pašalić', 'Petar Musa',
    'Igor Matanović',
  ],
  Brazil: [
    'Alisson', 'Ederson', 'Weverton', 'Danilo', 'Gabriel Magalhães', 'Marquinhos', 'Alex Sandro', 'Léo Pereira',
    'Douglas Santos', 'Bremer', 'Roger Ibañez', 'Casemiro', 'Bruno Guimarães', 'Fabinho', 'Lucas Paquetá',
    'Danilo (Forest)', 'Éderson', 'Vinícius Júnior', 'Matheus Cunha', 'Neymar', 'Raphinha', 'Rayan', 'Igor Thiago',
    'Endrick', 'Luiz Henrique', 'Gabriel Martinelli',
  ],
  Japan: [
    'Zion Suzuki', 'Keisuke Osako', 'Tomoki Hayakawa', 'Yuto Nagatomo', 'Shogo Taniguchi', 'Tsuyoshi Watanabe',
    'Junnosuke Suzuki', 'Hiroki Ito', 'Ko Itakura', 'Takehiro Tomiyasu', 'Ayumu Seko', 'Yukinari Sugawara',
    'Daichi Kamada', 'Kaishu Sano', 'Ao Tanaka', 'Shuto Machino', 'Junya Ito', 'Ritsu Doan', 'Keito Nakamura',
    'Takefusa Kubo', 'Yuito Suzuki', 'Daizen Maeda', 'Ayase Ueda', 'Koki Ogawa', 'Keisuke Goto', 'Kento Shiogai',
  ],
  'Ivory Coast': [
    'Yahia Fofana', 'Mohamed Koné', 'Alban Lafont', 'Emmanuel Agbadou', 'Ousmane Diomande', 'Guela Doué',
    'Ghislain Konan', 'Odilon Kossounou', 'Evan Ndicka', 'Christopher Operi', 'Wilfried Singo', 'Seko Fofana',
    'Parfait Guiagon', 'Christ Inao Oulai', 'Franck Kessié', 'Ibrahim Sangaré', 'Jean-Michaël Seri',
    'Simon Adingra', 'Ange-Yoan Bonny', 'Oumar Diakité', 'Amad Diallo', 'Yan Diomandé', 'Evann Guessand',
    'Nicolas Pépé', 'Bazoumana Touré', 'Elye Wahi',
  ],
  Norway: [
    'Ørjan Nyland', 'Egil Selvik', 'Sander Tangvik', 'Kristoffer Ajer', 'Julian Ryerson', 'Leo Østigård',
    'Marcus Holmgren Pedersen', 'David Møller Wolfe', 'Fredrik Bjørkan', 'Torbjørn Heggem', 'Sondre Langås',
    'Henrik Falchener', 'Martin Ødegaard', 'Sander Berge', 'Patrick Berg', 'Kristian Thorstvedt', 'Morten Thorsby',
    'Antonio Nusa', 'Fredrik Aursnes', 'Oscar Bobb', 'Jens Petter Hauge', 'Andreas Schjelderup', 'Thelo Aasgaard',
    'Alexander Sørloth', 'Erling Haaland', 'Jørgen Strand Larsen',
  ],
  Mexico: [
    'Raúl Rangel', 'Guillermo Ochoa', 'Carlos Acevedo', 'Jorge Sánchez', 'César Montes', 'Edson Álvarez',
    'Johan Vásquez', 'Israel Reyes', 'Mateo Chávez', 'Jesús Gallardo', 'Érik Lira', 'Luis Romo', 'Álvaro Fidalgo',
    'Luis Chávez', 'Orbelín Pineda', 'Obed Vargas', 'Gilberto Mora', 'Roberto Alvarado', 'Brian Gutiérrez',
    'Raúl Jiménez', 'Alexis Vega', 'Santiago Giménez', 'Armando González', 'Julián Quiñones', 'César Huerta',
    'Guillermo Martínez',
  ],
  Ecuador: [
    'Hernán Galíndez', 'Moisés Ramírez', 'Gonzalo Valle', 'Félix Torres', 'Piero Hincapié', 'Joel Ordóñez',
    'Willian Pacho', 'Pervis Estupiñán', 'Ángelo Preciado', 'Jackson Porozo', 'Yaimar Medina', 'Jordy Alcívar',
    'Kendry Páez', 'Pedro Vite', 'Denil Castillo', 'Nilson Angulo', 'Alan Franco', 'Moisés Caicedo', 'Alan Minda',
    'John Yeboah', 'Kevin Rodríguez', 'Anthony Valencia', 'Enner Valencia', 'Jordy Caicedo', 'Gonzalo Plata',
    'Jeremy Arévalo',
  ],
  England: [
    'Jordan Pickford', 'Dean Henderson', 'James Trafford', 'Reece James', 'Djed Spence', "Nico O'Reilly",
    'Marc Guéhi', 'John Stones', 'Ezri Konsa', 'Dan Burn', 'Jarell Quansah', 'Trevoh Chalobah', 'Declan Rice',
    'Jude Bellingham', 'Elliot Anderson', 'Kobbie Mainoo', 'Jordan Henderson', 'Eberechi Eze', 'Morgan Rogers',
    'Bukayo Saka', 'Marcus Rashford', 'Harry Kane', 'Ollie Watkins', 'Anthony Gordon', 'Noni Madueke', 'Ivan Toney',
  ],
  'DR Congo': [
    'Matthieu Epolo', 'Timothy Fayulu', 'Lionel Mpasi', 'Dylan Batubinsika', 'Rocky Bushiri', 'Gédéon Kalulu',
    'Steve Kapuadi', 'Joris Kayembe', 'Arthur Masuaku', 'Chancel Mbemba', 'Axel Tuanzebe', 'Aaron Wan-Bissaka',
    'Théo Bongonda', 'Brian Cipenga', 'Meschack Elia', 'Gaël Kakuta', 'Edo Kayembe', 'Nathanaël Mbuku',
    'Samuel Moutoussamy', "Ngal'ayel Mukau", 'Charles Pickel', 'Noah Sadiki', 'Cédric Bakambu', 'Simon Banza',
    'Fiston Mayele', 'Yoane Wissa',
  ],
  Switzerland: [
    'Gregor Kobel', 'Yvon Mvogo', 'Marvin Keller', 'Manuel Akanji', 'Nico Elvedi', 'Ricardo Rodríguez',
    'Silvan Widmer', 'Miro Muheim', 'Aurèle Amenda', 'Eray Cömert', 'Luca Jaquez', 'Granit Xhaka', 'Johan Manzambi',
    'Remo Freuler', 'Denis Zakaria', 'Ardon Jashari', 'Djibril Sow', 'Christian Fassnacht', 'Michel Aebischer',
    'Fabian Rieder', 'Rubén Vargas', 'Breel Embolo', 'Noah Okafor', 'Dan Ndoye', 'Zeki Amdouni', 'Cedric Itten',
  ],
  Algeria: [
    'Oussama Benbot', 'Melvin Masstil', 'Luca Zidane', 'Achraf Abada', 'Rayan Aït-Nouri', 'Zinedine Belaïd',
    'Rafik Belghali', 'Ramy Bensebaïni', 'Samir Chergui', 'Jaouen Hadjam', 'Aïssa Mandi', 'Mohamed Amine Tougaï',
    'Houssem Aouar', 'Nabil Bentaleb', 'Hicham Boudaoui', 'Farès Chaïbi', 'Ibrahim Maza', 'Yassine Titraoui',
    'Ramiz Zerrouki', 'Mohamed Amine Amoura', 'Nadir Benbouali', 'Adil Boulbina', 'Farès Ghedjemis', 'Amine Gouiri',
    'Riyad Mahrez', 'Anis Hadj Moussa',
  ],
  Colombia: [
    'Camilo Vargas', 'Álvaro Montero', 'David Ospina', 'Daniel Muñoz', 'Dávinson Sánchez', 'Jhon Lucumí',
    'Johan Mojica', 'Willer Ditta', 'Santiago Arias', 'Déiver Machado', 'Yerry Mina', 'Jefferson Lerma',
    'Jhon Arias', 'Jorge Carrascal', 'Juan Camilo Portilla', 'Richard Ríos', 'Juan Fernando Quintero',
    'Gustavo Puerta', 'Kevin Castaño', 'James Rodríguez', 'Jaminton Campaz', 'Luis Díaz', 'Jhon Córdoba',
    'Luis Suárez', 'Juan Camilo Hernández', 'Carlos Andrés Gómez',
  ],
  Ghana: [
    'Benjamin Asare', 'Lawrence Ati-Zigi', 'Joseph Anang', 'Baba Abdul Rahman', 'Gideon Mensah', 'Marvin Senaya',
    'Alidu Seidu', 'Abdul Mumin', 'Jerome Opoku', 'Jonas Adjetey', 'Kojo Oppong Peprah', 'Derrick Luckassen',
    'Elisha Owusu', 'Thomas Partey', 'Kwasi Sibo', 'Augustine Boakye', 'Caleb Yirenkyi', 'Abdul Fatawu Issahaku',
    'Kamaldeen Sulemana', 'Christopher Bonsu Baah', 'Ernest Nuamah', 'Antoine Semenyo', 'Brandon Thomas-Asante',
    'Prince Kwabena Adu', 'Iñaki Williams', 'Jordan Ayew',
  ],
  Australia: [
    'Mathew Ryan', 'Paul Izzo', 'Patrick Beach', 'Aziz Behich', 'Jordan Bos', 'Cameron Burgess',
    'Alessandro Circati', 'Miloš Degenek', 'Jason Geria', 'Lucas Herrington', 'Jacob Italiano', 'Harry Souttar',
    'Kai Trewin', 'Cameron Devlin', 'Ajdin Hrustić', 'Jackson Irvine', 'Connor Metcalfe', 'Paul Okon-Engstler',
    "Aiden O'Neill", 'Nestory Irankunda', 'Mathew Leckie', 'Awer Mabil', 'Mohamed Touré', 'Nishan Velupillay',
    'Cristian Volpato', 'Tete Yengi',
  ],
  Egypt: [
    'Mohamed El Shenawy', 'Mostafa Shobeir', 'El Mahdy Soliman', 'Mohamed Alaa', 'Yasser Ibrahim', 'Mohamed Hany',
    'Hossam Abdelmaguid', 'Ramy Rabia', 'Mohamed Abdelmonem', 'Ahmed Fatouh', 'Karim Hafez', 'Tarek Alaa',
    'Emam Ashour', 'Mostafa Ziko', 'Hamdy Fathy', 'Mohanad Lasheen', 'Nabil Emad', 'Marwan Attia', 'Mahmoud Saber',
    'Mohamed Salah', 'Omar Marmoush', 'Trézéguet', 'Zizo', 'Ibrahim Adel', 'Haissem Hassan', 'Hamza Abdelkarim',
  ],
  Argentina: [
    'Emiliano Martínez', 'Gerónimo Rulli', 'Juan Musso', 'Marcos Senesi', 'Nicolás Tagliafico', 'Gonzalo Montiel',
    'Lisandro Martínez', 'Cristian Romero', 'Nicolás Otamendi', 'Facundo Medina', 'Nahuel Molina', 'Leandro Paredes',
    'Rodrigo De Paul', 'Valentín Barco', 'Giovani Lo Celso', 'Exequiel Palacios', 'Alexis Mac Allister',
    'Enzo Fernández', 'Nico Paz', 'Thiago Almada', 'Julián Álvarez', 'Lionel Messi', 'Nicolás González',
    'Giuliano Simeone', 'Lautaro Martínez', 'José Manuel López',
  ],
  'Cape Verde': [
    'Vozinha', 'Márcio Rosa', 'CJ dos Santos', 'Stopira', 'Diney Borges', 'Pico Lopes', 'Logan Costa',
    'Sidny Lopes Cabral', 'Steven Moreira', 'Wagner Pina', 'Kelvin Pires', 'Telmo Arcanjo', 'Jovane Cabral',
    'Nuno da Costa', 'Deroy Duarte', 'Laros Duarte', 'João Paulo', 'Jamiro Monteiro', 'Kevin Pina',
    'Yannick Semedo', 'Gilson Benchimol', 'Garry Rodrigues', 'Dailon Livramento', 'Willy Semedo', 'Hélio Varela',
    'Ryan Mendes',
  ],
}

export function squadFor(team: string): string[] {
  return SQUADS[team] ?? []
}

// MOTM options for a match = both teams' squads, each tagged with its team.
export function squadOptionsForMatch(home: string, away: string): { name: string; team: string }[] {
  return [
    ...squadFor(home).map((name) => ({ name, team: home })),
    ...squadFor(away).map((name) => ({ name, team: away })),
  ]
}
