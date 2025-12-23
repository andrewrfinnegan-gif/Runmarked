import React, { useState, useRef } from 'react';

const HISTORICAL_FACTS = [
  // WEST SIDE - Hudson River (South to North)
  { id: 1, lat: 40.7028, lng: -74.0169, title: "Castle Clinton", fact: "Built in 1811 as a fort to defend New York Harbor, Castle Clinton later served as an immigration depot processing 8 million immigrants before Ellis Island opened. Jenny Lind performed here in 1850.", year: "1811", category: "military" },
  { id: 2, lat: 40.7048, lng: -74.0175, title: "Battery Park City Origins", fact: "This entire neighborhood sits on 92 acres of landfill created from dirt excavated during the World Trade Center's construction. In 1982, artist Agnes Denes planted two acres of wheat here.", year: "1976", category: "urban-development" },
  { id: 3, lat: 40.7080, lng: -74.0165, title: "The Battery's Cannons", fact: "Battery Park got its name in 1623 when Dutch settlers erected the first 'battery' of cannons to defend New Amsterdam. The British later expanded it in 1683.", year: "1623", category: "colonial" },
  { id: 4, lat: 40.7115, lng: -74.0155, title: "Irish Hunger Memorial", fact: "This quarter-acre memorial contains stones from each of Ireland's 32 counties and an authentic 19th-century Irish cottage, commemorating the Great Famine of 1845-1852.", year: "2002", category: "historic-events" },
  { id: 5, lat: 40.7150, lng: -74.0145, title: "Lincoln's Funeral Procession", fact: "President Lincoln's body arrived by ferry at Desbrosses Street pier in 1865. His body was placed in a glass hearse and drawn by six horses to City Hall, where 500,000 people waited.", year: "1865", category: "historic-events" },
  { id: 6, lat: 40.7195, lng: -74.0134, title: "Tribeca's Transformation", fact: "TriBeCa was coined in the 1970s by artists seeking cheaper rents than SoHo. It stands for 'Triangle Below Canal Street' and was once home to Washington Market, America's largest produce market.", year: "1970s", category: "neighborhoods" },
  { id: 7, lat: 40.7230, lng: -74.0110, title: "Lenape Origins", fact: "This waterfront was a seasonal camp for the Lenape tribe called Sapohanikan. They fished and harvested oyster reefs that lined the Hudson's shore for thousands of years.", year: "Pre-1626", category: "indigenous" },
  { id: 8, lat: 40.7268, lng: -74.0089, title: "Hamilton's Final Journey", fact: "After being mortally wounded in his duel with Aaron Burr in Weehawken, Alexander Hamilton was rowed across the Hudson and landed at a pier at Horatio Street.", year: "1804", category: "historic-events" },
  { id: 9, lat: 40.7300, lng: -74.0100, title: "Robert Fulton's Steamboat", fact: "In 1807, the first successful passenger steamboat in America—Robert Fulton's Clermont—was launched from Pier 42, revolutionizing Hudson River transportation.", year: "1807", category: "innovation" },
  { id: 10, lat: 40.7320, lng: -74.0095, title: "The West Side Highway Collapse", fact: "In 1973, a truck crashed through the elevated West Side Highway near Gansevoort Street. This collapse led to the highway's eventual transformation into Hudson River Park.", year: "1973", category: "transportation" },
  { id: 11, lat: 40.7353, lng: -74.0086, title: "Little Island & Pier 54", fact: "Little Island floats on 132 concrete 'tulips' where Pier 54 once stood. This pier received Titanic survivors in 1912 and was the departure point for the Lusitania in 1915.", year: "2021/1912", category: "maritime" },
  { id: 12, lat: 40.7380, lng: -74.0080, title: "LGBTQ+ Sanctuary", fact: "In the 1970s and 80s, abandoned piers along this stretch became a vital gathering place for NYC's LGBTQ+ community. The first state LGBT memorial was dedicated here in 2018.", year: "1970s", category: "civil-rights" },
  { id: 13, lat: 40.7420, lng: -74.0070, title: "Chelsea Piers History", fact: "Built in 1910, Chelsea Piers was the original destination for the Titanic. The piers served as embarkation points for over 3 million troops during WWI.", year: "1910", category: "maritime" },
  { id: 14, lat: 40.7450, lng: -74.0060, title: "Pier 57: D-Day Connection", fact: "Pier 57's massive concrete caissons were designed using WWII technology developed for D-Day invasion breakwaters. Google now calls this pier home.", year: "1954", category: "military" },
  { id: 15, lat: 40.7480, lng: -74.0050, title: "The High Line's Secret Past", fact: "This elevated park was a freight rail line built in 1934. Street-level trains killed so many pedestrians that 'West Side Cowboys' rode ahead waving red flags.", year: "1934", category: "transportation" },
  { id: 16, lat: 40.7510, lng: -74.0030, title: "Luxury Liner Row", fact: "Through the 1950s, piers from 46th to 54th Street were 'Luxury Liner Row' where the Queen Mary, Queen Elizabeth, and SS United States docked.", year: "1950s", category: "maritime" },
  { id: 17, lat: 40.7540, lng: -74.0010, title: "Slaughterhouse District", fact: "In the 1870s, this was NYC's slaughterhouse district. Underground cattle tunnels at 34th and 38th Streets allowed animals to be herded under 12th Avenue.", year: "1870s", category: "industry" },
  { id: 18, lat: 40.7580, lng: -73.9995, title: "Intrepid's Arrival", fact: "The aircraft carrier USS Intrepid, which survived five kamikaze attacks in WWII, has been docked at Pier 86 as a museum since 1982.", year: "1982", category: "military" },
  { id: 19, lat: 40.7620, lng: -73.9980, title: "DeWitt Clinton Park", fact: "Named after the governor who championed the Erie Canal, this park sits where Hell's Kitchen gangs once ruled. The neighborhood's name came from its brutal summer heat.", year: "1901", category: "neighborhoods" },
  { id: 20, lat: 40.7680, lng: -73.9920, title: "79th Street Boat Basin", fact: "This is one of the few places in Manhattan where people live on houseboats year-round. The marina was built as part of Robert Moses's Henry Hudson Parkway project.", year: "1937", category: "urban-development" },
  { id: 21, lat: 40.7750, lng: -73.9870, title: "Soldiers and Sailors Monument", fact: "This monument honors Union Army soldiers and sailors who served in the Civil War. It was modeled after the ancient choragic monument of Lysicrates in Athens.", year: "1902", category: "military" },
  { id: 22, lat: 40.7820, lng: -73.9810, title: "Edgar Allan Poe's Farm", fact: "Poe lived in a farmhouse near here in 1844, where he wrote 'The Raven.' The area was then rural countryside, with views of the Hudson.", year: "1844", category: "historic-events" },
  { id: 23, lat: 40.7890, lng: -73.9750, title: "Grant's Tomb", fact: "The largest mausoleum in North America contains the remains of President Ulysses S. Grant and his wife Julia. Over 90,000 people donated to build it.", year: "1897", category: "historic-events" },
  { id: 24, lat: 40.7950, lng: -73.9700, title: "Riverside Church", fact: "This interdenominational church has the world's largest tuned carillon with 74 bells. Martin Luther King Jr. delivered his famous anti-Vietnam War speech here in 1967.", year: "1930", category: "historic-events" },
  { id: 25, lat: 40.8020, lng: -73.9650, title: "Sakura Park Cherry Trees", fact: "Japan gifted 2,500 cherry trees to NYC in 1912. Many were planted here, creating a stunning spring display overlooking the Hudson.", year: "1912", category: "urban-development" },
  { id: 26, lat: 40.8100, lng: -73.9580, title: "Audubon's Final Home", fact: "Naturalist John James Audubon spent his final years in an estate here, painting birds of America. His property once extended from 155th to 158th Street.", year: "1841", category: "historic-events" },
  { id: 27, lat: 40.8180, lng: -73.9520, title: "The Little Red Lighthouse", fact: "Made famous by a children's book, this 1880 lighthouse was saved from demolition by public outcry. It's the only lighthouse remaining in Manhattan.", year: "1880", category: "maritime" },
  { id: 28, lat: 40.8250, lng: -73.9470, title: "Fort Washington", fact: "The highest natural point in Manhattan was the site of Fort Washington, which fell to British forces in 1776, resulting in 2,800 American prisoners of war.", year: "1776", category: "military" },
  { id: 29, lat: 40.8380, lng: -73.9420, title: "The Cloisters", fact: "This museum incorporates elements from five medieval French cloisters, reassembled stone by stone. John D. Rockefeller Jr. donated the land and much of the collection.", year: "1938", category: "historic-events" },
  { id: 30, lat: 40.8520, lng: -73.9350, title: "Dyckman Farmhouse", fact: "Manhattan's oldest surviving farmhouse was built in 1784 after the original was destroyed by British troops. The Dyckman family farmed here for 200 years.", year: "1784", category: "colonial" },
  { id: 31, lat: 40.8650, lng: -73.9280, title: "Inwood Hill Caves", fact: "These caves were used as seasonal camps by the Lenape people for centuries. Archaeologists found artifacts, pottery, and remains of ancient campfires inside.", year: "Pre-1626", category: "indigenous" },
  { id: 32, lat: 40.8720, lng: -73.9220, title: "Peter Minuit's Purchase", fact: "A plaque marks where Peter Minuit allegedly purchased Manhattan from the Lenape in 1626 for goods worth 60 guilders. A 280-year-old tulip tree witnessed the deal until 1938.", year: "1626", category: "colonial" },
  { id: 33, lat: 40.8780, lng: -73.9180, title: "Last Natural Forest", fact: "Inwood Hill Park contains the last natural forest and salt marsh in Manhattan—an untouched remnant of what the island looked like before European contact.", year: "Pre-1626", category: "indigenous" },
  
  // NORTHERN TIP - Harlem River
  { id: 34, lat: 40.8750, lng: -73.9120, title: "Spuyten Duyvil Creek", fact: "Dutch for 'Spitting Devil,' this treacherous waterway was so dangerous that a colonial messenger supposedly drowned trying to cross it during a storm.", year: "1693", category: "colonial" },
  { id: 35, lat: 40.8680, lng: -73.9080, title: "Henry Hudson Bridge", fact: "This double-deck bridge connects Manhattan to the Bronx. Its lower level was originally for trolleys, later converted for vehicles.", year: "1936", category: "transportation" },
  { id: 36, lat: 40.8600, lng: -73.9020, title: "Columbia University's Move", fact: "Columbia University moved from Midtown to Morningside Heights in 1897, transforming the neighborhood from rural farmland to an academic center.", year: "1897", category: "urban-development" },
  { id: 37, lat: 40.8520, lng: -73.8980, title: "High Bridge", fact: "NYC's oldest standing bridge was built as an aqueduct to carry water from the Croton River. Its original stone arches were replaced with a steel span.", year: "1848", category: "transportation" },
  { id: 38, lat: 40.8450, lng: -73.9350, title: "Morris-Jumel Mansion", fact: "Manhattan's oldest house served as George Washington's headquarters during the Battle of Harlem Heights. Aaron Burr married the widow Jumel here in 1833.", year: "1765", category: "colonial" },
  { id: 39, lat: 40.8380, lng: -73.9280, title: "Sugar Hill", fact: "Named because residents lived the 'sweet life,' this neighborhood was home to Duke Ellington, Thurgood Marshall, and W.E.B. Du Bois during the Harlem Renaissance.", year: "1920s", category: "neighborhoods" },
  { id: 40, lat: 40.8300, lng: -73.9220, title: "Polo Grounds Site", fact: "The legendary stadium hosted the Giants (baseball and football), the Mets' first two seasons, and the famous 'Shot Heard Round the World' home run in 1951.", year: "1890", category: "historic-events" },
  { id: 41, lat: 40.8220, lng: -73.9180, title: "Macombs Dam Bridge", fact: "Named after Robert Macomb, who built a dam across the Harlem River in 1813. The current bridge is NYC's third-oldest standing bridge.", year: "1895", category: "transportation" },
  { id: 42, lat: 40.8150, lng: -73.9350, title: "Hamilton Grange", fact: "Alexander Hamilton's country home was built in 1802, just two years before his fatal duel. It was moved twice to its current location in St. Nicholas Park.", year: "1802", category: "historic-events" },
  
  // EAST SIDE - Harlem to Upper East Side
  { id: 43, lat: 40.8080, lng: -73.9400, title: "Jackie Robinson Park", fact: "Originally named Colonial Park, it was renamed in 1978 for the baseball legend who broke the color barrier. The WPA built its pool during the Depression.", year: "1911", category: "civil-rights" },
  { id: 44, lat: 40.7980, lng: -73.9420, title: "Marcus Garvey Park", fact: "This park contains Manhattan's only fire watchtower still standing—a cast-iron structure from 1856 that warned residents of fires before telephone alerts.", year: "1856", category: "historic-events" },
  { id: 45, lat: 40.7920, lng: -73.9450, title: "Harlem's Apollo Theater", fact: "Since 1934, Amateur Night at the Apollo has launched careers of Ella Fitzgerald, James Brown, and Stevie Wonder. The audience is notoriously tough.", year: "1934", category: "historic-events" },
  { id: 46, lat: 40.7850, lng: -73.9480, title: "Central Park North", fact: "The northern end of Central Park was considered too rocky and wild when the park was designed. Frederick Law Olmsted kept it naturalistic intentionally.", year: "1858", category: "urban-development" },
  { id: 47, lat: 40.7800, lng: -73.9580, title: "Museum Mile Begins", fact: "Fifth Avenue between 82nd and 110th Streets contains nine museums, earning the name 'Museum Mile' in 1979 with the first Museum Mile Festival.", year: "1979", category: "urban-development" },
  { id: 48, lat: 40.7790, lng: -73.9630, title: "Reservoir Running Track", fact: "The 1.58-mile track around the Jacqueline Kennedy Onassis Reservoir is one of NYC's most popular running routes. Jackie O jogged here regularly.", year: "1862", category: "urban-development" },
  
  // EAST SIDE - Upper East Side to Midtown (East River)
  { id: 49, lat: 40.7760, lng: -73.9510, title: "Gracie Mansion", fact: "The mayor's official residence since 1942 was built in 1799 by merchant Archibald Gracie. Alexander Hamilton and John Quincy Adams attended parties here.", year: "1799", category: "historic-events" },
  { id: 50, lat: 40.7720, lng: -73.9480, title: "Carl Schurz Park", fact: "Built over the FDR Drive, this park's promenade offers views of Hell Gate, where treacherous currents sank countless ships. The British bombarded a fort here in 1776.", year: "1876", category: "military" },
  { id: 51, lat: 40.7680, lng: -73.9550, title: "General Slocum Disaster", fact: "In 1904, the steamship General Slocum caught fire off East 90th Street, killing over 1,000 passengers—mostly women and children from Little Germany.", year: "1904", category: "maritime" },
  { id: 52, lat: 40.7620, lng: -73.9590, title: "Yorkville's German Heritage", fact: "This neighborhood was once so German that street signs were bilingual. After the General Slocum disaster, the community dispersed, ending Little Germany.", year: "1880s", category: "neighborhoods" },
  { id: 53, lat: 40.7570, lng: -73.9620, title: "Queensboro Bridge", fact: "Opened in 1909, the 'Queensborough' appears in The Great Gatsby as Nick Carraway drives into Manhattan. F. Scott Fitzgerald lived nearby.", year: "1909", category: "transportation" },
  { id: 54, lat: 40.7520, lng: -73.9650, title: "Roosevelt Island Tramway", fact: "This aerial tramway, opened in 1976, was the first commuter cable car in North America. It rises 250 feet above the East River.", year: "1976", category: "transportation" },
  { id: 55, lat: 40.7480, lng: -73.9680, title: "United Nations Complex", fact: "Built on land donated by John D. Rockefeller Jr., the UN Headquarters is technically international territory—not part of the United States.", year: "1952", category: "historic-events" },
  { id: 56, lat: 40.7440, lng: -73.9700, title: "Tudor City", fact: "This self-contained residential complex from the 1920s was built facing inward to avoid views of slaughterhouses and glue factories that once lined the East River.", year: "1927", category: "urban-development" },
  { id: 57, lat: 40.7390, lng: -73.9720, title: "Empire State Building's Airship Mast", fact: "The Art Deco masterpiece's spire was designed as a mooring mast for dirigibles, though only one airship ever attempted docking due to dangerous winds.", year: "1931", category: "innovation" },
  
  // EAST SIDE - Midtown to Lower East Side
  { id: 58, lat: 40.7340, lng: -73.9750, title: "Grand Central Terminal", fact: "12 acres of tracks run beneath Park Avenue. The starry ceiling's constellations are painted backwards—either a mistake or intentional 'God's view.'", year: "1913", category: "transportation" },
  { id: 59, lat: 40.7290, lng: -73.9780, title: "Morgan Library", fact: "J.P. Morgan's personal library holds three Gutenberg Bibles, Mozart's handwritten music, and Dickens's manuscripts. The vault doors weigh 20 tons.", year: "1906", category: "historic-events" },
  { id: 60, lat: 40.7240, lng: -73.9810, title: "Gramercy Park", fact: "NYC's only private park requires a key for entry. Residents of surrounding buildings pay for the privilege—about 400 keys exist, each numbered.", year: "1831", category: "neighborhoods" },
  { id: 61, lat: 40.7190, lng: -73.9840, title: "Stuyvesant Town", fact: "Built for returning WWII veterans, this complex was initially segregated until protests and lawsuits forced integration in 1950.", year: "1947", category: "civil-rights" },
  { id: 62, lat: 40.7140, lng: -73.9870, title: "Tompkins Square Riots", fact: "This park saw the 1874 police riot against unemployed workers and the 1988 clash over homeless encampments. It was the heart of 1960s counterculture.", year: "1874", category: "civil-rights" },
  { id: 63, lat: 40.7100, lng: -73.9900, title: "Alphabet City", fact: "Named for avenues A, B, C, and D, this neighborhood was so dangerous in the 1970s-80s that taxi drivers refused to enter. Now it's gentrified.", year: "1970s", category: "neighborhoods" },
  { id: 64, lat: 40.7050, lng: -73.9920, title: "East River Park", fact: "Robert Moses built this park on landfill in the 1930s. It's currently being rebuilt and elevated to protect against flooding from climate change.", year: "1939", category: "urban-development" },
  
  // LOWER EAST SIDE & SOUTH
  { id: 65, lat: 40.7130, lng: -73.9880, title: "Williamsburg Bridge", fact: "When it opened in 1903, it was the world's longest suspension bridge. Jewish immigrants called crossing it 'the allrightnik's journey' to better housing.", year: "1903", category: "transportation" },
  { id: 66, lat: 40.7150, lng: -73.9850, title: "Tenement Museum", fact: "This preserved tenement at 97 Orchard Street housed 7,000 working-class immigrants between 1863 and 1935. Apartments had no running water until 1905.", year: "1863", category: "historic-events" },
  { id: 67, lat: 40.7180, lng: -73.9900, title: "Katz's Delicatessen", fact: "Operating since 1888, Katz's served free salami to soldiers in both World Wars with the slogan 'Send a salami to your boy in the army.'", year: "1888", category: "neighborhoods" },
  { id: 68, lat: 40.7120, lng: -73.9920, title: "Essex Street Market", fact: "Mayor La Guardia created this indoor market in 1940 to get pushcart vendors off the streets. It was recently relocated to a new building.", year: "1940", category: "urban-development" },
  { id: 69, lat: 40.7080, lng: -73.9960, title: "Seward Park", fact: "NYC's first municipal playground opened here in 1903. The surrounding blocks were the most densely populated on Earth in the early 1900s.", year: "1903", category: "urban-development" },
  { id: 70, lat: 40.7050, lng: -74.0000, title: "Manhattan Bridge", fact: "The last of the three East River bridges, it carries more subway traffic than any bridge in the world—over 80 million passengers per year.", year: "1909", category: "transportation" },
  
  // SOUTHERN TIP - Financial District & South Street Seaport
  { id: 71, lat: 40.7070, lng: -74.0030, title: "Brooklyn Bridge", fact: "When it opened in 1883, it was the longest suspension bridge in the world. At least 27 workers died during construction from 'caisson disease' (the bends).", year: "1883", category: "transportation" },
  { id: 72, lat: 40.7065, lng: -74.0010, title: "Roebling's Tragedy", fact: "John Roebling, designer of the Brooklyn Bridge, died of tetanus after his foot was crushed surveying the site. His son Washington became paralyzed from the bends.", year: "1869", category: "historic-events" },
  { id: 73, lat: 40.7055, lng: -73.9970, title: "South Street Seaport", fact: "NYC's original port received more than 4,000 vessels from foreign ports in 1860 alone. The Fulton Fish Market operated here for over 180 years.", year: "1625", category: "maritime" },
  { id: 74, lat: 40.7060, lng: -73.9995, title: "Schermerhorn Row", fact: "These 1812 counting houses are built on landfill. Merchant Schermerhorn was so eager he built all four stories at once—the floors still slant today.", year: "1812", category: "urban-development" },
  { id: 75, lat: 40.7040, lng: -74.0020, title: "Titanic Memorial Lighthouse", fact: "This lighthouse at the Seaport entrance memorializes those lost on the Titanic. The ball on top once dropped at noon so ships could set their chronometers.", year: "1913", category: "maritime" },
  { id: 76, lat: 40.7035, lng: -74.0080, title: "Fraunces Tavern", fact: "George Washington bid farewell to his officers here in 1783. The building survived a 1975 bombing by Puerto Rican nationalists that killed four people.", year: "1762", category: "colonial" },
  { id: 77, lat: 40.7055, lng: -74.0090, title: "Stone Street", fact: "NYC's first paved street (1658) is now lined with restaurants. The Dutch paved it with cobblestones to reduce mud and fire risk.", year: "1658", category: "colonial" },
  { id: 78, lat: 40.7068, lng: -74.0093, title: "Wall Street's Origin", fact: "The street is named for a wooden wall built by the Dutch in 1653 to protect against British invasion. It ran from the Hudson to the East River.", year: "1653", category: "colonial" },
  { id: 79, lat: 40.7085, lng: -74.0095, title: "Federal Hall", fact: "George Washington was inaugurated as the first President on this site in 1789. The current building contains the stone he stood on.", year: "1789", category: "historic-events" },
  { id: 80, lat: 40.7065, lng: -74.0112, title: "Trinity Church", fact: "The current church is the third on this site. Alexander Hamilton and Robert Fulton are buried in its cemetery. Its spire was once NYC's tallest structure.", year: "1846", category: "historic-events" },
  { id: 81, lat: 40.7105, lng: -74.0130, title: "World Trade Center Site", fact: "The Twin Towers stood from 1973 to 2001. The 9/11 Memorial's reflecting pools sit in the footprints of the original towers.", year: "2001", category: "historic-events" },
  { id: 82, lat: 40.7090, lng: -74.0140, title: "St. Paul's Chapel", fact: "The oldest church building in Manhattan survived 9/11 undamaged, protected by a sycamore tree. George Washington worshipped here after his inauguration.", year: "1766", category: "colonial" },
  { id: 83, lat: 40.7115, lng: -74.0085, title: "African Burial Ground", fact: "Discovered in 1991, this is the oldest and largest known excavated burial ground for Africans in North America. Over 400 remains were found.", year: "1690s", category: "civil-rights" },
  { id: 84, lat: 40.7130, lng: -74.0060, title: "City Hall", fact: "Built in 1812, the back was originally clad in cheap brownstone because officials assumed the city would never grow north of it.", year: "1812", category: "urban-development" },
  { id: 85, lat: 40.7145, lng: -74.0040, title: "Brooklyn Bridge Walking Path", fact: "When the bridge opened, 12 people were trampled to death in a panic after someone yelled it was collapsing. P.T. Barnum later walked 21 elephants across it.", year: "1883", category: "transportation" },
  
  // ROOSEVELT ISLAND (visible from East Side)
  { id: 86, lat: 40.7610, lng: -73.9500, title: "Smallpox Hospital Ruins", fact: "This Gothic Revival ruin designed by James Renwick Jr. (who also designed St. Patrick's Cathedral) quarantined smallpox patients from 1856-1875. NYC's only landmarked ruin.", year: "1856", category: "historic-events" },
  { id: 87, lat: 40.7580, lng: -73.9520, title: "Blackwell's Island Asylum", fact: "The 'Lunatic Asylum' housed over 1,700 patients who were severely mistreated. Reporter Nellie Bly went undercover here in 1887, exposing the horrors.", year: "1839", category: "historic-events" },
  { id: 88, lat: 40.7690, lng: -73.9450, title: "Roosevelt Island Lighthouse", fact: "Built in 1872 by prison inmates using stone quarried from the island, this 50-foot lighthouse guided ships through the treacherous Hell Gate.", year: "1872", category: "maritime" },
  { id: 89, lat: 40.7520, lng: -73.9600, title: "FDR Four Freedoms Park", fact: "Louis Kahn designed this memorial to FDR in 1974, but it wasn't built until 2012. The park sits on the site of the former smallpox hospital grounds.", year: "2012", category: "historic-events" },
  
  // GOVERNORS ISLAND (visible from Battery)
  { id: 90, lat: 40.6890, lng: -74.0170, title: "Governors Island", fact: "The U.S. Army and Coast Guard occupied this island for 200 years. Castle Williams held Confederate prisoners during the Civil War.", year: "1800", category: "military" },
  
  // ADDITIONAL WEST SIDE FACTS
  { id: 91, lat: 40.7210, lng: -74.0080, title: "Pier 40", fact: "Once a shipping terminal, this pier is now a sports complex. In the 1970s, gay men cruised the abandoned piers here—part of NYC's LGBTQ+ history.", year: "1962", category: "civil-rights" },
  { id: 92, lat: 40.7395, lng: -74.0085, title: "Gansevoort Market", fact: "The Meatpacking District got its name from the 250 slaughterhouses and packing plants that operated here. Blood literally ran in the streets.", year: "1880s", category: "industry" },
  { id: 93, lat: 40.7560, lng: -74.0015, title: "Hell's Kitchen Origin", fact: "This neighborhood's violent reputation inspired the name. An 1881 newspaper wrote: 'Hell's Kitchen holds its own against all comers.'", year: "1881", category: "neighborhoods" },
  { id: 94, lat: 40.7720, lng: -73.9890, title: "Riverside Park", fact: "Frederick Law Olmsted designed this park, but Robert Moses extended it over the railway tracks in the 1930s, adding 132 acres of landfill.", year: "1875", category: "urban-development" },
  { id: 95, lat: 40.8000, lng: -73.9680, title: "Tom's Restaurant", fact: "This diner's exterior was used as the establishing shot for 'Monk's Cafe' in Seinfeld. Suzanne Vega wrote 'Tom's Diner' about it.", year: "1945", category: "neighborhoods" },
  
  // ADDITIONAL EAST SIDE & MIDTOWN FACTS
  { id: 96, lat: 40.7484, lng: -73.9857, title: "Empire State Building Plane Crash", fact: "In 1945, a B-25 bomber crashed into the 79th floor in fog, killing 14 people. Elevator operator Betty Lou Oliver survived a 75-story fall.", year: "1945", category: "historic-events" },
  { id: 97, lat: 40.7580, lng: -73.9855, title: "Grand Central's Secret Platform", fact: "Track 61 beneath the Waldorf-Astoria has a secret platform used by FDR to hide his wheelchair from the public.", year: "1929", category: "transportation" },
  { id: 98, lat: 40.7614, lng: -73.9776, title: "Lever House Revolution", fact: "This 1952 skyscraper pioneered the glass curtain wall and open plaza. It sparked the modern era of International Style architecture.", year: "1952", category: "urban-development" },
  { id: 99, lat: 40.7527, lng: -73.9772, title: "Chrysler Building's Secret", fact: "The distinctive spire was secretly assembled inside the building and raised through the roof in 90 minutes to beat the Bank of Manhattan for 'tallest building.'", year: "1930", category: "innovation" },
  { id: 100, lat: 40.7484, lng: -73.9967, title: "Penn Station's Demolition", fact: "The destruction of the original Penn Station in 1963 was so controversial it sparked the modern historic preservation movement.", year: "1963", category: "urban-development" },
  
  // ADDITIONAL LOWER MANHATTAN FACTS
  { id: 101, lat: 40.7128, lng: -74.0060, title: "Five Points", fact: "Once the most dangerous slum in America, Five Points saw over 1,000 murders annually in the 1850s. Gangs like the Dead Rabbits ruled here.", year: "1820s", category: "neighborhoods" },
  { id: 102, lat: 40.7159, lng: -73.9970, title: "Bowery Savings", fact: "The Bowery was both skid row and the nation's first entertainment district. Its theaters, beer gardens, and hotels defined American pop culture.", year: "1870s", category: "neighborhoods" },
  { id: 103, lat: 40.7188, lng: -73.9956, title: "CBGB's Legacy", fact: "From 1973-2006, CBGB launched punk rock with Ramones, Blondie, and Talking Heads. The club's name stood for 'Country, Bluegrass, Blues.'", year: "1973", category: "historic-events" },
  { id: 104, lat: 40.7275, lng: -74.0000, title: "Triangle Shirtwaist Fire", fact: "146 workers, mostly young immigrant women, died in this 1911 factory fire. Locked exit doors and inadequate fire escapes sparked labor reform.", year: "1911", category: "industry" },
  { id: 105, lat: 40.7308, lng: -73.9973, title: "Cooper Union", fact: "Abraham Lincoln's 1860 'Right Makes Might' speech here helped launch his presidential campaign. The building was one of NYC's first to use steel beams.", year: "1860", category: "historic-events" }
];

const CATEGORY_COLORS = {
  'maritime': '#4A7C7E', 'historic-events': '#D97B3D', 'transportation': '#C9A227',
  'urban-development': '#2D5A45', 'neighborhoods': '#7C6B9E', 'industry': '#6B7280',
  'innovation': '#4A7C7E', 'civil-rights': '#D97B3D', 'military': '#1E3A5F',
  'colonial': '#8B6F4E', 'indigenous': '#6B8E5A'
};

const getCategoryIcon = (category) => {
  const icons = {
    'maritime': <path d="M3 17h18l-3-9H6l-3 9zm9-14l-4 5h8l-4-5z" />,
    'historic-events': <path d="M4 4h16v2H4V4zm0 4h16v12H4V8zm4 4h8v2H8v-2z" />,
    'transportation': <path d="M4 16h16V8H4v8zm2-6h12v4H6v-4zM8 5h8v2H8V5z" />,
    'urban-development': <path d="M4 21h6v-6h4v6h6V10l-8-6-8 6v11z" />,
    'neighborhoods': <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />,
    'industry': <path d="M4 10v10h16V10l-5 3V8l-5 3V6L4 10z" />,
    'innovation': <path d="M9 21h6v-2H9v2zm3-19a7 7 0 00-7 7c0 2.4 1.2 4.5 3 5.7V17h8v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 00-7-7z" />,
    'civil-rights': <path d="M16 11a3 3 0 100-6 3 3 0 000 6zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5c0-2.3-4.7-3.5-7-3.5z" />,
    'military': <path d="M12 2L5 22l7-3 7 3L12 2z" />,
    'colonial': <path d="M12 2L3 9v12h18V9L12 2zm0 3l6 5v9H6v-9l6-5z" />,
    'indigenous': <path d="M12 2C8 4 6 8 6 12s2 8 6 10c4-2 6-6 6-10s-2-8-6-10zm0 4a2 2 0 110 4 2 2 0 010-4z" />
  };
  return icons[category] || <circle cx="12" cy="12" r="6" />;
};

function parseGPX(gpxContent) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(gpxContent, "text/xml");
  const points = [];
  ['trkpt', 'rtept', 'wpt'].forEach(tag => {
    xmlDoc.querySelectorAll(tag).forEach(point => {
      const lat = parseFloat(point.getAttribute('lat'));
      const lon = parseFloat(point.getAttribute('lon'));
      if (!isNaN(lat) && !isNaN(lon)) points.push({ lat, lng: lon });
    });
  });
  return points;
}

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180, Δλ = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function findNearbyFacts(routePoints, maxDistance = 300) {
  return HISTORICAL_FACTS.map(fact => {
    let minDistance = Infinity;
    routePoints.forEach(point => {
      const d = getDistance(fact.lat, fact.lng, point.lat, point.lng);
      if (d < minDistance) minDistance = d;
    });
    return minDistance <= maxDistance ? { ...fact, distance: Math.round(minDistance) } : null;
  }).filter(Boolean).sort((a, b) => a.lat - b.lat);
}

const DEMO_ROUTE = [
  { lat: 40.7080, lng: -74.0175 }, { lat: 40.7120, lng: -74.0165 }, { lat: 40.7160, lng: -74.0145 },
  { lat: 40.7200, lng: -74.0130 }, { lat: 40.7240, lng: -74.0115 }, { lat: 40.7280, lng: -74.0100 },
  { lat: 40.7320, lng: -74.0095 }, { lat: 40.7360, lng: -74.0085 }, { lat: 40.7400, lng: -74.0075 },
  { lat: 40.7440, lng: -74.0065 }, { lat: 40.7480, lng: -74.0055 }, { lat: 40.7520, lng: -74.0035 },
  { lat: 40.7560, lng: -74.0015 }
];

export default function RunHistoryApp() {
  const [route, setRoute] = useState(null);
  const [facts, setFacts] = useState([]);
  const [selectedFact, setSelectedFact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState('upload');
  const [filterCategory, setFilterCategory] = useState('all');
  const [mapPopup, setMapPopup] = useState(null);
  const fileInputRef = useRef(null);

  const loadDemoRoute = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRoute(DEMO_ROUTE);
      setFacts(findNearbyFacts(DEMO_ROUTE));
      setView('map');
      setIsLoading(false);
    }, 800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const routePoints = parseGPX(ev.target.result);
      if (routePoints.length === 0) {
        alert('No GPS points found. Please upload a valid GPX file.');
        setIsLoading(false);
        return;
      }
      setRoute(routePoints);
      setFacts(findNearbyFacts(routePoints));
      setView('map');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  const filteredFacts = filterCategory === 'all' ? facts : facts.filter(f => f.category === filterCategory);
  const categories = [...new Set(facts.map(f => f.category))];

  const getRouteBounds = () => {
    if (!route?.length) return null;
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
    route.forEach(p => { minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat); minLng = Math.min(minLng, p.lng); maxLng = Math.max(maxLng, p.lng); });
    return { center: { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 }, latSpan: maxLat - minLat, lngSpan: maxLng - minLng };
  };

  const handleMarkerClick = (fact, x, y) => {
    if (selectedFact?.id === fact.id) { setSelectedFact(null); setMapPopup(null); }
    else { setSelectedFact(fact); setMapPopup({ x, y, fact }); }
  };

  const MapView = () => {
    const bounds = getRouteBounds();
    if (!bounds) return null;
    const padding = 30, width = 420, height = 580;
    const scale = Math.min((width - padding * 2) / (bounds.lngSpan || 0.01), (height - padding * 2) / (bounds.latSpan || 0.01));
    const toX = lng => padding + (lng - (bounds.center.lng - bounds.lngSpan/2)) * scale;
    const toY = lat => height - padding - (lat - (bounds.center.lat - bounds.latSpan/2)) * scale;
    const routePath = route.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.lng)} ${toY(p.lat)}`).join(' ');

    // Detailed Manhattan coastline with many more points
    const manhattanCoast = [
      {lat:40.6998,lng:-74.0201},{lat:40.7005,lng:-74.0185},{lat:40.7015,lng:-74.0165},{lat:40.7008,lng:-74.0145},
      {lat:40.7005,lng:-74.0120},{lat:40.7010,lng:-74.0095},{lat:40.7025,lng:-74.0070},{lat:40.7045,lng:-74.0045},
      {lat:40.7068,lng:-74.0025},{lat:40.7085,lng:-73.9998},{lat:40.7095,lng:-73.9970},{lat:40.7100,lng:-73.9940},
      {lat:40.7108,lng:-73.9880},{lat:40.7118,lng:-73.9820},{lat:40.7135,lng:-73.9785},{lat:40.7160,lng:-73.9765},
      {lat:40.7190,lng:-73.9750},{lat:40.7225,lng:-73.9738},{lat:40.7265,lng:-73.9728},{lat:40.7310,lng:-73.9720},
      {lat:40.7360,lng:-73.9712},{lat:40.7415,lng:-73.9702},{lat:40.7475,lng:-73.9688},{lat:40.7535,lng:-73.9668},
      {lat:40.7590,lng:-73.9640},{lat:40.7640,lng:-73.9608},{lat:40.7690,lng:-73.9572},{lat:40.7740,lng:-73.9532},
      {lat:40.7790,lng:-73.9488},{lat:40.7840,lng:-73.9448},{lat:40.7890,lng:-73.9412},{lat:40.7940,lng:-73.9382},
      {lat:40.7990,lng:-73.9358},{lat:40.8040,lng:-73.9342},{lat:40.8090,lng:-73.9332},{lat:40.8140,lng:-73.9325},
      {lat:40.8195,lng:-73.9315},{lat:40.8250,lng:-73.9298},{lat:40.8305,lng:-73.9275},{lat:40.8360,lng:-73.9255},
      {lat:40.8415,lng:-73.9238},{lat:40.8470,lng:-73.9228},{lat:40.8525,lng:-73.9220},{lat:40.8580,lng:-73.9215},
      {lat:40.8635,lng:-73.9208},{lat:40.8690,lng:-73.9195},{lat:40.8740,lng:-73.9175},{lat:40.8775,lng:-73.9155},
      {lat:40.8792,lng:-73.9180},{lat:40.8785,lng:-73.9210},{lat:40.8765,lng:-73.9245},{lat:40.8730,lng:-73.9278},
      {lat:40.8680,lng:-73.9305},{lat:40.8620,lng:-73.9328},{lat:40.8555,lng:-73.9350},{lat:40.8485,lng:-73.9378},
      {lat:40.8410,lng:-73.9412},{lat:40.8335,lng:-73.9455},{lat:40.8260,lng:-73.9505},{lat:40.8185,lng:-73.9560},
      {lat:40.8110,lng:-73.9612},{lat:40.8035,lng:-73.9662},{lat:40.7960,lng:-73.9710},{lat:40.7885,lng:-73.9758},
      {lat:40.7810,lng:-73.9805},{lat:40.7735,lng:-73.9852},{lat:40.7665,lng:-73.9895},{lat:40.7600,lng:-73.9935},
      {lat:40.7535,lng:-73.9972},{lat:40.7470,lng:-74.0008},{lat:40.7405,lng:-74.0042},{lat:40.7340,lng:-74.0072},
      {lat:40.7275,lng:-74.0098},{lat:40.7210,lng:-74.0118},{lat:40.7145,lng:-74.0138},{lat:40.7080,lng:-74.0158},
      {lat:40.7030,lng:-74.0178},{lat:40.6998,lng:-74.0201}
    ];
    const coastPath = manhattanCoast.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.lng)} ${toY(p.lat)}`).join(' ') + ' Z';

    // Central Park
    const centralPark = [{lat:40.7648,lng:-73.9730},{lat:40.7648,lng:-73.9813},{lat:40.8003,lng:-73.9582},{lat:40.8003,lng:-73.9499}];
    const cpPath = centralPark.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.lng)} ${toY(p.lat)}`).join(' ') + ' Z';

    // Hudson River Park
    const hudsonPark = [
      {lat:40.7028,lng:-74.0178},{lat:40.7100,lng:-74.0155},{lat:40.7180,lng:-74.0128},{lat:40.7260,lng:-74.0102},
      {lat:40.7340,lng:-74.0078},{lat:40.7420,lng:-74.0055},{lat:40.7500,lng:-74.0022},{lat:40.7580,lng:-73.9988},
      {lat:40.7660,lng:-73.9952},{lat:40.7660,lng:-73.9975},{lat:40.7580,lng:-74.0010},{lat:40.7500,lng:-74.0045},
      {lat:40.7420,lng:-74.0078},{lat:40.7340,lng:-74.0100},{lat:40.7260,lng:-74.0125},{lat:40.7180,lng:-74.0150},
      {lat:40.7100,lng:-74.0175},{lat:40.7028,lng:-74.0198}
    ];
    const hudsonPath = hudsonPark.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.lng)} ${toY(p.lat)}`).join(' ') + ' Z';

    // Battery Park
    const batteryPark = [{lat:40.7002,lng:-74.0175},{lat:40.7025,lng:-74.0135},{lat:40.7045,lng:-74.0160},{lat:40.7020,lng:-74.0195}];
    const batteryPath = batteryPark.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.lng)} ${toY(p.lat)}`).join(' ') + ' Z';

    // Riverside Park
    const riversidePark = [
      {lat:40.7750,lng:-73.9885},{lat:40.7850,lng:-73.9820},{lat:40.7950,lng:-73.9755},{lat:40.8050,lng:-73.9695},
      {lat:40.8050,lng:-73.9720},{lat:40.7950,lng:-73.9780},{lat:40.7850,lng:-73.9845},{lat:40.7750,lng:-73.9910}
    ];
    const riversidePath = riversidePark.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.lng)} ${toY(p.lat)}`).join(' ') + ' Z';

    // Avenues (north-south) - more detailed including all named streets
    const avenues = [
      -73.9380, -73.9420, -73.9455, -73.9490, -73.9525, -73.9560, -73.9595, -73.9630, -73.9665,
      -73.9700, -73.9735, -73.9770, -73.9805, -73.9840, -73.9875, -73.9910, -73.9945, -73.9980,
      -74.0015, -74.0050, -74.0085, -74.0120, -74.0155
    ];

    // Generate cross streets - EVERY block from Houston to 220th
    const crossStreets = [];
    for (let st = 0; st <= 220; st += 1) {
      crossStreets.push({ lat: 40.7092 + st * 0.000486, major: st % 10 === 0 });
    }
    
    // Downtown diagonal streets (below Houston - different grid)
    const downtownStreets = [
      // Major downtown east-west
      {y1: 40.7090, y2: 40.7090}, // Houston
      {y1: 40.7060, y2: 40.7060}, // Canal roughly
      {y1: 40.7030, y2: 40.7030}, // Chambers roughly
      {y1: 40.7080, y2: 40.7080},
      {y1: 40.7070, y2: 40.7070},
      {y1: 40.7050, y2: 40.7050},
      {y1: 40.7040, y2: 40.7040},
      {y1: 40.7020, y2: 40.7020},
      {y1: 40.7010, y2: 40.7010},
    ];
    
    // Downtown north-south streets (irregular grid)
    const downtownAvenues = [
      -74.0000, -74.0020, -74.0040, -74.0060, -74.0080, -74.0100, -74.0120, -74.0140,
      -73.9980, -73.9960, -73.9940, -73.9920, -73.9900, -73.9880, -73.9860, -73.9840,
      -73.9820, -73.9800, -73.9780
    ];

    // Broadway (diagonal street)
    const broadway = [
      {lat:40.7055,lng:-74.0138},{lat:40.7110,lng:-74.0098},{lat:40.7165,lng:-74.0055},{lat:40.7220,lng:-74.0012},
      {lat:40.7280,lng:-73.9972},{lat:40.7345,lng:-73.9932},{lat:40.7410,lng:-73.9892},{lat:40.7480,lng:-73.9868},
      {lat:40.7555,lng:-73.9858},{lat:40.7635,lng:-73.9842},{lat:40.7720,lng:-73.9818},{lat:40.7810,lng:-73.9788},
      {lat:40.7905,lng:-73.9745},{lat:40.8005,lng:-73.9688},{lat:40.8110,lng:-73.9622},{lat:40.8220,lng:-73.9548},
      {lat:40.8340,lng:-73.9465},{lat:40.8465,lng:-73.9375}
    ];
    const broadwayPath = broadway.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.lng)} ${toY(p.lat)}`).join(' ');

    return (
      <div className="relative w-full h-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2D5A45" /><stop offset="50%" stopColor="#4A7C7E" /><stop offset="100%" stopColor="#D97B3D" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D0E4F5" /><stop offset="100%" stopColor="#B8D4EC" />
            </linearGradient>
            <filter id="routeGlow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="markerShadow"><feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.25"/></filter>
            <pattern id="waterWaves" patternUnits="userSpaceOnUse" width="12" height="12">
              <path d="M0 6 Q3 4 6 6 T12 6" fill="none" stroke="#9FC5E8" strokeWidth="0.4" opacity="0.4"/>
            </pattern>
          </defs>
          
          {/* Water */}
          <rect x="0" y="0" width={width} height={height} fill="url(#waterGrad)" />
          <rect x="0" y="0" width={width} height={height} fill="url(#waterWaves)" />
          
          {/* Manhattan island */}
          <path d={coastPath} fill="#F7F4EE" stroke="#9B8B7A" strokeWidth="1" />
          
          {/* Parks */}
          <path d={cpPath} fill="#B5D9A8" stroke="#8BC07A" strokeWidth="0.5" />
          <path d={hudsonPath} fill="#C8E6C0" />
          <path d={batteryPath} fill="#C8E6C0" />
          <path d={riversidePath} fill="#C8E6C0" />
          
          {/* Cross streets - every block */}
          {crossStreets.map((st, i) => {
            const y = toY(st.lat);
            return y > 5 && y < height - 5 ? (
              <line key={`st${i}`} x1={toX(-74.018)} y1={y} x2={toX(-73.935)} y2={y}
                stroke="#1E3A5F" strokeOpacity={st.major ? 0.18 : 0.08} strokeWidth={st.major ? 0.7 : 0.35} />
            ) : null;
          })}
          
          {/* Avenues - all north-south streets */}
          {avenues.map((lng, i) => {
            const x = toX(lng);
            return x > 5 && x < width - 5 ? (
              <line key={`av${i}`} x1={x} y1={toY(40.705)} x2={x} y2={toY(40.878)}
                stroke="#1E3A5F" strokeOpacity={i % 3 === 0 ? 0.15 : 0.08} strokeWidth={i % 3 === 0 ? 0.6 : 0.35} />
            ) : null;
          })}
          
          {/* Downtown streets - different grid below Houston */}
          {downtownStreets.map((st, i) => {
            const y = toY(st.y1);
            return y > 5 && y < height - 5 ? (
              <line key={`dst${i}`} x1={toX(-74.02)} y1={y} x2={toX(-73.975)} y2={y}
                stroke="#1E3A5F" strokeOpacity="0.1" strokeWidth="0.4" />
            ) : null;
          })}
          
          {/* Downtown avenues */}
          {downtownAvenues.map((lng, i) => {
            const x = toX(lng);
            return x > 5 && x < width - 5 ? (
              <line key={`dav${i}`} x1={x} y1={toY(40.700)} x2={x} y2={toY(40.712)}
                stroke="#1E3A5F" strokeOpacity="0.08" strokeWidth="0.35" />
            ) : null;
          })}
          
          {/* Broadway */}
          <path d={broadwayPath} fill="none" stroke="#1E3A5F" strokeOpacity="0.15" strokeWidth="0.8" />
          
          {/* Route */}
          <path d={routePath} fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d={routePath} fill="none" stroke="url(#routeGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#routeGlow)" />
          
          {/* Markers */}
          {filteredFacts.map((fact, idx) => {
            const x = toX(fact.lng), y = toY(fact.lat), sel = selectedFact?.id === fact.id;
            return (
              <g key={fact.id} onClick={() => setSelectedFact(sel ? null : fact)} style={{ cursor: 'pointer' }}>
                {sel && <circle cx={x} cy={y} r="15" fill="none" stroke={CATEGORY_COLORS[fact.category]} strokeWidth="2" opacity="0.5" />}
                <circle cx={x} cy={y} r={sel ? 10 : 7} fill={CATEGORY_COLORS[fact.category]} stroke="#fff" strokeWidth="1.5" filter="url(#markerShadow)" />
                <text x={x} y={y + 2.5} textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold">{idx + 1}</text>
              </g>
            );
          })}
          
          {/* Start */}
          <g filter="url(#markerShadow)">
            <circle cx={toX(route[0].lng)} cy={toY(route[0].lat)} r="11" fill="#2D5A45" stroke="#fff" strokeWidth="2" />
            <text x={toX(route[0].lng)} y={toY(route[0].lat) + 3.5} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">S</text>
          </g>
          
          {/* Finish */}
          <g filter="url(#markerShadow)">
            <circle cx={toX(route[route.length-1].lng)} cy={toY(route[route.length-1].lat)} r="11" fill="#D97B3D" stroke="#fff" strokeWidth="2" />
            <text x={toX(route[route.length-1].lng)} y={toY(route[route.length-1].lat) + 3.5} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">F</text>
          </g>
        </svg>
        
        {/* Popup */}
        {selectedFact && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg border border-[#1E3A5F]/10 p-4 z-10">
            <button onClick={() => setSelectedFact(null)} className="absolute top-3 right-3 text-[#1E3A5F]/30 hover:text-[#1E3A5F]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: `${CATEGORY_COLORS[selectedFact.category]}20`, color: CATEGORY_COLORS[selectedFact.category] }}>{selectedFact.year}</span>
              <span className="text-xs text-[#1E3A5F]/50 capitalize">{selectedFact.category.replace('-', ' ')}</span>
            </div>
            <h4 className="font-bold text-[#1E3A5F] text-sm mb-1">{selectedFact.title}</h4>
            <p className="text-[#1E3A5F]/60 text-xs leading-relaxed">{selectedFact.fact}</p>
            <p className="text-[#1E3A5F]/40 text-xs mt-2">📍 {selectedFact.distance}m from route</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#1E3A5F] relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Subtle vintage map background - simplified */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Single compass rose in corner */}
        <svg className="absolute top-20 right-20 w-48 h-48 opacity-[0.035]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1E3A5F" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1E3A5F" strokeWidth="0.3"/>
          <circle cx="50" cy="50" r="25" fill="none" stroke="#1E3A5F" strokeWidth="0.3"/>
          <path d="M50,5 L50,95 M5,50 L95,50" stroke="#1E3A5F" strokeWidth="0.5"/>
          <path d="M50,5 L53,30 L50,20 L47,30 Z" fill="#1E3A5F"/>
          <text x="50" y="3" textAnchor="middle" fontSize="6" fill="#1E3A5F" fontWeight="bold">N</text>
          <text x="98" y="52" textAnchor="middle" fontSize="5" fill="#1E3A5F">E</text>
          <text x="50" y="99" textAnchor="middle" fontSize="5" fill="#1E3A5F">S</text>
          <text x="3" y="52" textAnchor="middle" fontSize="5" fill="#1E3A5F">W</text>
        </svg>
        
        {/* Subtle coastline at bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-64 opacity-[0.025]" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,150 Q100,120 200,140 T400,130 T600,145 T800,125 T1000,140 T1200,135" fill="none" stroke="#1E3A5F" strokeWidth="2"/>
          <path d="M0,170 Q150,150 300,165 T600,155 T900,168 T1200,160" fill="none" stroke="#1E3A5F" strokeWidth="1" strokeDasharray="8,8"/>
        </svg>
        
        {/* Decorative corner flourish - top left */}
        <svg className="absolute top-10 left-10 w-32 h-32 opacity-[0.03]" viewBox="0 0 100 100">
          <path d="M5,50 Q5,5 50,5" fill="none" stroke="#1E3A5F" strokeWidth="2"/>
          <path d="M10,50 Q10,10 50,10" fill="none" stroke="#1E3A5F" strokeWidth="1"/>
          <circle cx="50" cy="5" r="2" fill="#1E3A5F"/>
          <circle cx="5" cy="50" r="2" fill="#1E3A5F"/>
        </svg>
        
        {/* Decorative corner flourish - bottom right */}
        <svg className="absolute bottom-10 right-10 w-32 h-32 opacity-[0.03] rotate-180" viewBox="0 0 100 100">
          <path d="M5,50 Q5,5 50,5" fill="none" stroke="#1E3A5F" strokeWidth="2"/>
          <path d="M10,50 Q10,10 50,10" fill="none" stroke="#1E3A5F" strokeWidth="1"/>
          <circle cx="50" cy="5" r="2" fill="#1E3A5F"/>
          <circle cx="5" cy="50" r="2" fill="#1E3A5F"/>
        </svg>
        
        {/* Scattered depth markers */}
        <span className="absolute top-[30%] left-[15%] text-[#1E3A5F] text-xs opacity-[0.04] font-serif italic">12 ft</span>
        <span className="absolute top-[60%] right-[20%] text-[#1E3A5F] text-xs opacity-[0.04] font-serif italic">8 ft</span>
        <span className="absolute bottom-[35%] left-[40%] text-[#1E3A5F] text-xs opacity-[0.04] font-serif italic">15 ft</span>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
        .title-font { font-family: 'Fraunces', serif; }
        .fact-card { background: #FFFFFF; border: 1px solid rgba(30, 58, 95, 0.1); box-shadow: 0 2px 8px rgba(30, 58, 95, 0.06); }
        .fact-card:hover { border-color: rgba(30, 58, 95, 0.2); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(30, 58, 95, 0.1); }
        .upload-zone { background: #FFFFFF; }
        .upload-zone:hover { background: #FDFCFA; }
        .gradient-text { background: linear-gradient(135deg, #1E3A5F 0%, #D97B3D 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .category-pill { transition: all 0.2s ease; }
        .category-pill:hover { transform: scale(1.05); }
        .pulse-ring { animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite; }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 0; } 100% { transform: scale(0.8); opacity: 0.5; } }
        .animate-ping-slow { animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes ping-slow { 0% { transform-origin: center; transform: scale(1); opacity: 0.8; } 75%, 100% { transform: scale(1.5); opacity: 0; } }
        .slide-up { animation: slideUp 0.5s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <header className="relative z-10 border-b border-[#1E3A5F]/10 px-6 py-4 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#D97B3D] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#D97B3D] pulse-ring" />
            </div>
            <div><h1 className="title-font text-xl font-bold tracking-tight text-[#1E3A5F]">Runmarked</h1><p className="text-xs text-[#1E3A5F]/50 uppercase tracking-widest">Discover Your Route</p></div>
          </div>
          {view !== 'upload' && (
            <div className="flex gap-2">
              <button onClick={() => setView('map')} className={`px-4 py-2 rounded-lg text-sm transition-all ${view === 'map' ? 'bg-[#1E3A5F] text-white' : 'text-[#1E3A5F]/60 hover:text-[#1E3A5F]'}`}>Map</button>
              <button onClick={() => setView('list')} className={`px-4 py-2 rounded-lg text-sm transition-all ${view === 'list' ? 'bg-[#1E3A5F] text-white' : 'text-[#1E3A5F]/60 hover:text-[#1E3A5F]'}`}>Timeline</button>
              <button onClick={() => { setView('upload'); setRoute(null); setFacts([]); setSelectedFact(null); setMapPopup(null); }} className="px-4 py-2 rounded-lg text-sm text-[#1E3A5F]/60 hover:text-[#1E3A5F] transition-all">New Run</button>
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {view === 'upload' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] slide-up">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <p className="text-[#D97B3D] font-semibold uppercase tracking-widest text-sm mb-4">Discover History On Every Run</p>
              <h2 className="title-font text-6xl md:text-7xl font-bold mb-10 text-[#1E3A5F] leading-tight">
                Every Mile Has<br/><span className="gradient-text">a Story</span>
              </h2>
              
              {/* Feature Points - More Pronounced */}
              <div style={{ backgroundColor: '#E8E0D4' }} className="rounded-2xl p-8 max-w-3xl mx-auto shadow-md border border-[#1E3A5F]/10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                  <div className="flex flex-col items-center text-center">
                    <div style={{ backgroundColor: '#D97B3D' }} className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                      </svg>
                    </div>
                    <p style={{ color: '#1E3A5F' }} className="font-semibold text-base mb-1">Upload Your Run</p>
                    <p style={{ color: 'rgba(30,58,95,0.6)' }} className="text-sm">Any GPX from Strava,<br/>Garmin, or Apple Watch</p>
                  </div>
                  
                  <div className="hidden md:block w-px h-20" style={{ backgroundColor: 'rgba(30,58,95,0.15)' }} />
                  
                  <div className="flex flex-col items-center text-center">
                    <div style={{ backgroundColor: '#4A7C7E' }} className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2"/>
                      </svg>
                    </div>
                    <p style={{ color: '#1E3A5F' }} className="font-semibold text-base mb-1">Discover Sites</p>
                    <p style={{ color: 'rgba(30,58,95,0.6)' }} className="text-sm">Find historical landmarks<br/>within steps of your route</p>
                  </div>
                  
                  <div className="hidden md:block w-px h-20" style={{ backgroundColor: 'rgba(30,58,95,0.15)' }} />
                  
                  <div className="flex flex-col items-center text-center">
                    <div style={{ backgroundColor: '#C9A227' }} className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                      </svg>
                    </div>
                    <p style={{ color: '#1E3A5F' }} className="font-semibold text-base mb-1">Learn History</p>
                    <p style={{ color: 'rgba(30,58,95,0.6)' }} className="text-sm">Explore 400+ years<br/>of hidden stories</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats bar */}
            <div className="flex items-center justify-center gap-8 mb-12 py-4 px-8 bg-white/60 rounded-full border border-[#1E3A5F]/10">
              <div className="text-center">
                <p className="title-font text-2xl font-bold text-[#1E3A5F]">{HISTORICAL_FACTS.length}</p>
                <p className="text-xs text-[#1E3A5F]/50 uppercase tracking-wider">Historical Sites</p>
              </div>
              <div className="w-px h-8 bg-[#1E3A5F]/10" />
              <div className="text-center">
                <p className="title-font text-2xl font-bold text-[#1E3A5F]">400+</p>
                <p className="text-xs text-[#1E3A5F]/50 uppercase tracking-wider">Years of History</p>
              </div>
              <div className="w-px h-8 bg-[#1E3A5F]/10" />
              <div className="text-center">
                <p className="title-font text-2xl font-bold text-[#1E3A5F]">NYC</p>
                <p className="text-xs text-[#1E3A5F]/50 uppercase tracking-wider">Launch City</p>
              </div>
            </div>
            
            <div className="w-full max-w-lg">
              {/* Upload Card - More Prominent */}
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-[#1E3A5F]/10 mb-6 relative overflow-hidden">
                
                <h3 className="title-font text-2xl font-bold text-[#1E3A5F] text-center mb-2">Upload Your Run</h3>
                <p className="text-[#1E3A5F]/50 text-center text-sm mb-6">Drop a GPX file to discover what history you ran through</p>
                
                <div className="upload-zone border-2 border-dashed border-[#D97B3D]/40 bg-[#D97B3D]/5 rounded-xl p-8 text-center cursor-pointer hover:border-[#D97B3D] hover:bg-[#D97B3D]/10 transition-all" onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept=".gpx" onChange={handleFileUpload} className="hidden" />
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D97B3D] to-[#C9A227] flex items-center justify-center shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                  </div>
                  <p className="title-font text-xl font-bold text-[#1E3A5F] mb-1">Drag & Drop GPX</p>
                  <p className="text-[#1E3A5F]/50 text-sm">or click to browse files</p>
                </div>
                
                <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                  <span className="text-xs text-[#1E3A5F]/40 bg-[#1E3A5F]/5 px-3 py-1 rounded-full">Strava</span>
                  <span className="text-xs text-[#1E3A5F]/40 bg-[#1E3A5F]/5 px-3 py-1 rounded-full">Garmin</span>
                  <span className="text-xs text-[#1E3A5F]/40 bg-[#1E3A5F]/5 px-3 py-1 rounded-full">Apple Watch</span>
                  <span className="text-xs text-[#1E3A5F]/40 bg-[#1E3A5F]/5 px-3 py-1 rounded-full">Nike Run Club</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 my-6"><div className="flex-1 h-px bg-[#1E3A5F]/10" /><span className="text-[#1E3A5F]/40 text-sm font-medium">or try a demo</span><div className="flex-1 h-px bg-[#1E3A5F]/10" /></div>
              
              <button onClick={loadDemoRoute} disabled={isLoading} className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#1E3A5F] to-[#D97B3D] hover:from-[#2a4a73] hover:to-[#e08a4d] text-white font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50">
                {isLoading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Loading...</span> : <span className="flex items-center justify-center gap-2"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Explore West Side Highway</span>}
              </button>
              <p className="text-[#1E3A5F]/40 text-center text-sm mt-3">5-mile route • Battery Park to Hudson Yards</p>
            </div>
          </div>
        )}

        {view === 'map' && route && (
          <div className="grid lg:grid-cols-5 gap-8 slide-up">
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-[#1E3A5F]/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#1E3A5F]/60 uppercase tracking-wider">Your Route</h3>
                <span className="text-xs text-[#1E3A5F]/50 bg-[#1E3A5F]/5 px-2 py-1 rounded">{filteredFacts.length} stops</span>
              </div>
              <div className="aspect-[2/3] relative overflow-visible"><MapView /></div>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-[#1E3A5F]/60">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#2D5A45] flex items-center justify-center text-[8px] font-bold text-white">S</div><span>Start</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#D97B3D] flex items-center justify-center text-[8px] font-bold text-white">F</div><span>Finish</span></div>
              </div>
              <p className="text-center text-xs text-[#1E3A5F]/40 mt-3">Click markers to see historical facts</p>
            </div>
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div><h3 className="title-font text-2xl font-bold text-[#1E3A5F]">{filteredFacts.length} Historical {filteredFacts.length === 1 ? 'Discovery' : 'Discoveries'}</h3><p className="text-[#1E3A5F]/50 text-sm">Along your {(route.length * 0.015).toFixed(1)} mile route</p></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <button onClick={() => setFilterCategory('all')} className={`category-pill px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filterCategory === 'all' ? 'bg-[#1E3A5F] text-white' : 'bg-[#1E3A5F]/5 text-[#1E3A5F]/60 hover:bg-[#1E3A5F]/10'}`}>All ({facts.length})</button>
                {categories.map(cat => <button key={cat} onClick={() => setFilterCategory(cat)} className="category-pill px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all" style={{ backgroundColor: filterCategory === cat ? CATEGORY_COLORS[cat] : 'transparent', border: `1px solid ${CATEGORY_COLORS[cat]}`, color: filterCategory === cat ? '#fff' : CATEGORY_COLORS[cat] }}>{cat.replace('-', ' ')}</button>)}
              </div>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {filteredFacts.map((fact) => (
                  <div key={fact.id} onClick={() => setSelectedFact(selectedFact?.id === fact.id ? null : fact)} className={`fact-card rounded-xl p-5 cursor-pointer transition-all duration-300 ${selectedFact?.id === fact.id ? 'ring-2' : ''}`} style={{ '--tw-ring-color': CATEGORY_COLORS[fact.category] }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${CATEGORY_COLORS[fact.category]}20` }}><svg width="20" height="20" viewBox="0 0 24 24" fill={CATEGORY_COLORS[fact.category]}>{getCategoryIcon(fact.category)}</svg></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold uppercase tracking-wider" style={{ color: CATEGORY_COLORS[fact.category] }}>{fact.year}</span><span className="text-[#1E3A5F]/20">•</span><span className="text-xs text-[#1E3A5F]/40">{fact.distance}m away</span></div>
                        <h4 className="font-bold text-base mb-2 text-[#1E3A5F]">{fact.title}</h4>
                        <p className="text-[#1E3A5F]/60 text-sm leading-relaxed">{fact.fact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'list' && facts.length > 0 && (
          <div className="max-w-2xl mx-auto slide-up">
            <div className="text-center mb-12"><h2 className="title-font text-3xl font-bold mb-2 text-[#1E3A5F]">Your Run Through History</h2><p className="text-[#1E3A5F]/50">From Battery Park to Hudson Yards, spanning 400 years</p></div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1E3A5F] via-[#4A7C7E] to-[#D97B3D]" />
              <div className="space-y-8">
                {facts.sort((a, b) => (parseInt(a.year) || 0) - (parseInt(b.year) || 0)).map((fact) => (
                  <div key={fact.id} className="flex gap-6 relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ backgroundColor: CATEGORY_COLORS[fact.category], boxShadow: `0 0 20px ${CATEGORY_COLORS[fact.category]}40` }}><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">{getCategoryIcon(fact.category)}</svg></div>
                    <div className="fact-card rounded-xl p-5 flex-1">
                      <div className="flex items-center gap-2 mb-2"><span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]/50">{fact.year}</span></div>
                      <h4 className="font-bold text-lg mb-2 text-[#1E3A5F]">{fact.title}</h4>
                      <p className="text-[#1E3A5F]/60 text-sm leading-relaxed">{fact.fact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-[#1E3A5F]/10 px-6 py-6 mt-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[#1E3A5F]/50 text-sm">
          <p>Runmarked MVP • Built to discover the stories beneath your feet</p>
          <p className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Starting with NYC • More cities coming soon</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
