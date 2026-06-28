// Squad lists per team for the Man-of-the-Match picker. Built from known national-team
// players (knowledge cutoff Jan 2026) — a convenience list, not necessarily the final
// 26-man rosters. The MOTM field still allows free text, so anyone can be typed/added.
export const SQUADS: Record<string, string[]> = {
  'South Africa': [
    'Ronwen Williams', 'Khuliso Mudau', 'Grant Kekana', 'Mothobi Mvala', 'Aubrey Modiba', 'Teboho Mokoena',
    'Sphephelo Sithole', 'Themba Zwane', 'Percy Tau', 'Relebohile Mofokeng', 'Oswin Appollis', 'Lyle Foster',
    'Evidence Makgopa', 'Bongokuhle Hlongwane', 'Thapelo Maseko', 'Siyanda Xulu',
  ],
  Canada: [
    'Maxime Crépeau', 'Dayne St. Clair', 'Alphonso Davies', 'Alistair Johnston', 'Moïse Bombito', 'Derek Cornelius',
    'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio', 'Tajon Buchanan', 'Jacob Shaffelburg', 'Jonathan David',
    'Cyle Larin', 'Liam Millar', 'Promise David',
  ],
  Netherlands: [
    'Bart Verbruggen', 'Virgil van Dijk', 'Denzel Dumfries', 'Nathan Aké', 'Matthijs de Ligt', 'Micky van de Ven',
    'Jurriën Timber', 'Jeremie Frimpong', 'Frenkie de Jong', 'Tijjani Reijnders', 'Xavi Simons', 'Joey Veerman',
    'Cody Gakpo', 'Memphis Depay', 'Donyell Malen', 'Steven Bergwijn', 'Wout Weghorst', 'Brian Brobbey',
  ],
  Morocco: [
    'Yassine Bounou', 'Achraf Hakimi', 'Noussair Mazraoui', 'Nayef Aguerd', 'Romain Saïss', 'Sofyan Amrabat',
    'Azzedine Ounahi', 'Hakim Ziyech', 'Brahim Díaz', 'Youssef En-Nesyri', 'Sofiane Boufal', 'Amine Harit',
    'Bilal El Khannouss', 'Eliesse Ben Seghir', 'Abde Ezzalzouli', 'Ayoub El Kaabi',
  ],
  Germany: [
    'Marc-André ter Stegen', 'Antonio Rüdiger', 'Joshua Kimmich', 'Jonathan Tah', 'Nico Schlotterbeck', 'David Raum',
    'Maximilian Mittelstädt', 'Robert Andrich', 'Aleksandar Pavlović', 'İlkay Gündoğan', 'Jamal Musiala',
    'Florian Wirtz', 'Leroy Sané', 'Serge Gnabry', 'Kai Havertz', 'Niclas Füllkrug', 'Deniz Undav',
  ],
  Paraguay: [
    'Antony Silva', 'Gustavo Gómez', 'Omar Alderete', 'Fabián Balbuena', 'Junior Alonso', 'Andrés Cubas',
    'Mathías Villasanti', 'Matías Galarza', 'Miguel Almirón', 'Julio Enciso', 'Diego Gómez', 'Ramón Sosa',
    'Antonio Sanabria', 'Adam Bareiro', 'Ángel Romero',
  ],
  France: [
    'Mike Maignan', 'Jules Koundé', 'Dayot Upamecano', 'William Saliba', 'Ibrahima Konaté', 'Theo Hernández',
    'Aurélien Tchouaméni', 'Eduardo Camavinga', 'Adrien Rabiot', 'Warren Zaïre-Emery', 'Antoine Griezmann',
    'Kylian Mbappé', 'Ousmane Dembélé', 'Michael Olise', 'Bradley Barcola', 'Marcus Thuram', 'Randal Kolo Muani',
  ],
  Sweden: [
    'Robin Olsen', 'Victor Lindelöf', 'Isak Hien', 'Gabriel Gudmundsson', 'Emil Krafth', 'Albin Ekdal',
    'Mattias Svanberg', 'Jens Cajuste', 'Lucas Bergvall', 'Yasin Ayari', 'Dejan Kulusevski', 'Emil Forsberg',
    'Anthony Elanga', 'Alexander Isak', 'Viktor Gyökeres',
  ],
  Belgium: [
    'Thibaut Courtois', 'Koen Casteels', 'Timothy Castagne', 'Wout Faes', 'Zeno Debast', 'Arthur Theate',
    'Maxim De Cuyper', 'Youri Tielemans', 'Amadou Onana', 'Orel Mangala', 'Kevin De Bruyne', 'Jérémy Doku',
    'Leandro Trossard', 'Johan Bakayoko', 'Charles De Ketelaere', 'Dodi Lukebakio', 'Romelu Lukaku',
  ],
  Senegal: [
    'Édouard Mendy', 'Kalidou Koulibaly', 'Abdou Diallo', 'Ismail Jakobs', 'Krépin Diatta', 'Idrissa Gueye',
    'Pape Matar Sarr', 'Pape Gueye', 'Lamine Camara', 'Sadio Mané', 'Ismaïla Sarr', 'Iliman Ndiaye',
    'Nicolas Jackson', 'Boulaye Dia', 'Habib Diallo',
  ],
  USA: [
    'Matt Turner', 'Sergiño Dest', 'Chris Richards', 'Tim Ream', 'Antonee Robinson', 'Cameron Carter-Vickers',
    'Tyler Adams', 'Weston McKennie', 'Yunus Musah', 'Christian Pulisic', 'Gio Reyna', 'Timothy Weah',
    'Brenden Aaronson', 'Malik Tillman', 'Folarin Balogun', 'Ricardo Pepi', 'Haji Wright',
  ],
  'Bosnia and Herzegovina': [
    'Ibrahim Šehić', 'Sead Kolašinac', 'Amar Dedić', 'Nikola Katić', 'Dennis Hadžikadunić', 'Miralem Pjanić',
    'Armin Gigović', 'Benjamin Tahirović', 'Edin Džeko', 'Ermedin Demirović', 'Smail Prevljak', 'Said Hamulić',
    'Haris Tabaković',
  ],
  Spain: [
    'Unai Simón', 'Dani Carvajal', 'Robin Le Normand', 'Aymeric Laporte', 'Marc Cucurella', 'Rodri',
    'Martín Zubimendi', 'Pedri', 'Fabián Ruiz', 'Mikel Merino', 'Dani Olmo', 'Nico Williams', 'Lamine Yamal',
    'Álvaro Morata', 'Mikel Oyarzabal', 'Ferran Torres', 'Fermín López',
  ],
  Austria: [
    'Patrick Pentz', 'Philipp Lienhart', 'Kevin Danso', 'Maximilian Wöber', 'Stefan Posch', 'David Alaba',
    'Konrad Laimer', 'Nicolas Seiwald', 'Christoph Baumgartner', 'Marcel Sabitzer', 'Romano Schmid',
    'Alexander Prass', 'Patrick Wimmer', 'Marko Arnautović', 'Michael Gregoritsch',
  ],
  Portugal: [
    'Diogo Costa', 'Rúben Dias', 'António Silva', 'Nuno Mendes', 'João Cancelo', 'Nélson Semedo', 'Rúben Neves',
    'João Palhinha', 'Vitinha', 'Bruno Fernandes', 'Bernardo Silva', 'Rafael Leão', 'Pedro Neto',
    'Francisco Conceição', 'Cristiano Ronaldo', 'Gonçalo Ramos', 'Diogo Jota', 'João Félix',
  ],
  Croatia: [
    'Dominik Livaković', 'Joško Gvardiol', 'Josip Stanišić', 'Josip Šutalo', 'Borna Sosa', 'Marcelo Brozović',
    'Luka Modrić', 'Mateo Kovačić', 'Petar Sučić', 'Martin Baturina', 'Lovro Majer', 'Mario Pašalić',
    'Ivan Perišić', 'Andrej Kramarić', 'Ante Budimir', 'Bruno Petković',
  ],
  Brazil: [
    'Alisson', 'Éderson', 'Danilo', 'Marquinhos', 'Gabriel Magalhães', 'Éder Militão', 'Wendell', 'Vanderson',
    'Bruno Guimarães', 'André', 'Lucas Paquetá', 'Raphinha', 'Vinícius Júnior', 'Rodrygo', 'Savinho', 'Estêvão',
    'Endrick', 'Gabriel Martinelli', 'João Pedro',
  ],
  Japan: [
    'Zion Suzuki', 'Hiroki Itō', 'Ko Itakura', 'Takehiro Tomiyasu', 'Wataru Endō', 'Hidemasa Morita',
    'Daichi Kamada', 'Reo Hatate', 'Takefusa Kubo', 'Kaoru Mitoma', 'Junya Itō', 'Ritsu Dōan',
    'Takumi Minamino', 'Ayase Ueda', 'Daizen Maeda', 'Keito Nakamura',
  ],
  'Ivory Coast': [
    'Yahia Fofana', 'Evan Ndicka', 'Ousmane Diomandé', 'Willy Boly', 'Odilon Kossounou', 'Ghislain Konan',
    'Seko Fofana', 'Franck Kessié', 'Ibrahim Sangaré', 'Simon Adingra', 'Nicolas Pépé', 'Amad Diallo',
    'Max Gradel', 'Sébastien Haller', 'Jean-Philippe Krasso', 'Jonathan Bamba',
  ],
  Norway: [
    'Ørjan Nyland', 'Kristoffer Ajer', 'Leo Østigård', 'Julian Ryerson', 'Birger Meling', 'Martin Ødegaard',
    'Sander Berge', 'Patrick Berg', 'Fredrik Aursnes', 'Antonio Nusa', 'Oscar Bobb', 'Erling Haaland',
    'Alexander Sørloth', 'Jørgen Strand Larsen', 'Mohamed Elyounoussi',
  ],
  Mexico: [
    'Guillermo Ochoa', 'Luis Malagón', 'Jorge Sánchez', 'César Montes', 'Johan Vásquez', 'Jesús Gallardo',
    'Edson Álvarez', 'Luis Chávez', 'Orbelín Pineda', 'Roberto Alvarado', 'Hirving Lozano', 'Alexis Vega',
    'Uriel Antuna', 'Santiago Giménez', 'Raúl Jiménez', 'Julián Quiñones',
  ],
  Ecuador: [
    'Hernán Galíndez', 'Alexander Domínguez', 'Pervis Estupiñán', 'Piero Hincapié', 'Félix Torres',
    'Ángelo Preciado', 'Moisés Caicedo', 'Carlos Gruezo', 'Alan Franco', 'Kendry Páez', 'Jeremy Sarmiento',
    'Gonzalo Plata', 'Enner Valencia', 'Kevin Rodríguez', 'Pedro Vite',
  ],
  England: [
    'Jordan Pickford', 'Kyle Walker', 'John Stones', 'Marc Guéhi', 'Ezri Konsa', 'Levi Colwill',
    'Trent Alexander-Arnold', 'Declan Rice', 'Jude Bellingham', 'Phil Foden', 'Cole Palmer', 'Bukayo Saka',
    'Anthony Gordon', 'Eberechi Eze', 'Harry Kane', 'Ollie Watkins', 'Jarrod Bowen',
  ],
  'DR Congo': [
    'Lionel Mpasi', 'Chancel Mbemba', 'Arthur Masuaku', 'Gédéon Kalulu', 'Axel Tuanzebe', 'Noah Sadiki',
    'Samuel Moutoussamy', 'Charles Pickel', 'Edo Kayembe', 'Théo Bongonda', 'Silas Katompa', 'Meschack Elia',
    'Yoane Wissa', 'Cédric Bakambu', 'Fiston Mayele', 'Simon Banza',
  ],
  Switzerland: [
    'Yann Sommer', 'Gregor Kobel', 'Manuel Akanji', 'Nico Elvedi', 'Ricardo Rodríguez', 'Fabian Schär',
    'Granit Xhaka', 'Remo Freuler', 'Denis Zakaria', 'Michel Aebischer', 'Fabian Rieder', 'Xherdan Shaqiri',
    'Ruben Vargas', 'Dan Ndoye', 'Breel Embolo', 'Zeki Amdouni',
  ],
  Algeria: [
    'Alexandre Oukidja', 'Aïssa Mandi', 'Ramy Bensebaïni', 'Youcef Atal', 'Nabil Bentaleb', 'Ismaël Bennacer',
    'Houssem Aouar', 'Riyad Mahrez', 'Saïd Benrahma', 'Youcef Belaïli', 'Amine Gouiri', 'Mohamed Amoura',
    'Islam Slimani', 'Baghdad Bounedjah', 'Rachid Ghezzal',
  ],
  Colombia: [
    'David Ospina', 'Camilo Vargas', 'Daniel Muñoz', 'Davinson Sánchez', 'Yerry Mina', 'Carlos Cuesta',
    'Johan Mojica', 'Jefferson Lerma', 'Richard Ríos', 'James Rodríguez', 'Juan Fernando Quintero', 'Jhon Arias',
    'Luis Díaz', 'Jhon Córdoba', 'Rafael Santos Borré', 'Daniel Ruiz',
  ],
  Ghana: [
    'Lawrence Ati-Zigi', 'Mohammed Salisu', 'Alexander Djiku', 'Tariq Lamptey', 'Gideon Mensah', 'Thomas Partey',
    'Majeed Ashimeru', 'Mohammed Kudus', 'Jordan Ayew', 'Iñaki Williams', 'Antoine Semenyo', 'Ernest Nuamah',
    'Kamaldeen Sulemana', 'Abdul Fatawu', 'Brandon Thomas-Asante',
  ],
  Australia: [
    'Mathew Ryan', 'Harry Souttar', 'Kye Rowles', 'Cameron Burgess', 'Aziz Behich', 'Jordan Bos',
    'Connor Metcalfe', 'Aiden O’Neill', 'Jackson Irvine', 'Riley McGree', 'Martin Boyle', 'Mathew Leckie',
    'Craig Goodwin', 'Mitchell Duke', 'Kusini Yengi', 'Nestory Irankunda',
  ],
  Egypt: [
    'Mohamed El Shenawy', 'Mohamed Abdelmonem', 'Ahmed Hegazi', 'Omar Kamal', 'Ahmed Fatouh', 'Mohamed Elneny',
    'Hamdi Fathi', 'Emam Ashour', 'Mohamed Salah', 'Trezeguet', 'Omar Marmoush', 'Ibrahim Adel',
    'Mostafa Mohamed', 'Ahmed Sayed Zizo',
  ],
  Argentina: [
    'Emiliano Martínez', 'Gerónimo Rulli', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi',
    'Lisandro Martínez', 'Nicolás Tagliafico', 'Marcos Acuña', 'Rodrigo De Paul', 'Enzo Fernández',
    'Alexis Mac Allister', 'Leandro Paredes', 'Lionel Messi', 'Julián Álvarez', 'Lautaro Martínez',
    'Ángel Di María', 'Nico González', 'Giovani Lo Celso', 'Alejandro Garnacho', 'Valentín Carboni',
  ],
  'Cape Verde': [
    'Vozinha', 'Kenny Rocha Santos', 'Roberto Lopes', 'Diney Borges', 'Stopira', 'Jamiro Monteiro',
    'Kevin Pina', 'Deroy Duarte', 'Laros Duarte', 'Ryan Mendes', 'Garry Rodrigues', 'Bebé', 'Júlio Tavares',
    'Gilson Benchimol', 'Willy Semedo', 'Dailon Livramento',
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
