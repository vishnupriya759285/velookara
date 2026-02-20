// Kerala Districts and their Panchayats (Grama Panchayats)
// This is a representative list — each district has many panchayats

export interface Panchayat {
  name: string;
  area?: string;
}

export interface District {
  name: string;
  panchayats: Panchayat[];
}

export const keralaDistricts: District[] = [
  {
    name: 'Thiruvananthapuram',
    panchayats: [
      { name: 'Anchuthengu' }, { name: 'Andoorkonam' }, { name: 'Aruvikkara' },
      { name: 'Azhoor' }, { name: 'Balaramapuram' }, { name: 'Chenkal' },
      { name: 'Chirayinkeezhu' }, { name: 'Edava' }, { name: 'Kalliyoor' },
      { name: 'Karakulam' }, { name: 'Karette' }, { name: 'Kattakkada' },
      { name: 'Kollayil' }, { name: 'Kottukal' }, { name: 'Kunnathukal' },
      { name: 'Kuttichal' }, { name: 'Manickal' }, { name: 'Mangalapuram' },
      { name: 'Maranalloor' }, { name: 'Nagaroor' }, { name: 'Nedumangad' },
      { name: 'Nellanad' }, { name: 'Ottasekharamangalam' }, { name: 'Ottoor' },
      { name: 'Panavoor' }, { name: 'Pangode' }, { name: 'Parassala' },
      { name: 'Perumkadavila' }, { name: 'Poovachal' }, { name: 'Pullampara' },
      { name: 'Thirupuram' }, { name: 'Uzhamalakkal' }, { name: 'Vamanapuram' },
      { name: 'Vellanad' }, { name: 'Venganoor' }, { name: 'Vilavoorkkal' },
    ],
  },
  {
    name: 'Kollam',
    panchayats: [
      { name: 'Adichanalloor' }, { name: 'Alayamon' }, { name: 'Alappad' },
      { name: 'Anchal' }, { name: 'Aryankavu' }, { name: 'Chadayamangalam' },
      { name: 'Chavara' }, { name: 'Chirakkara' }, { name: 'Clappana' },
      { name: 'Edamulakkal' }, { name: 'Elamad' }, { name: 'Elampalloor' },
      { name: 'Ittiva' }, { name: 'Kadakkal' }, { name: 'Kalluvathukkal' },
      { name: 'Kareepra' }, { name: 'Kottamkara' }, { name: 'Kulasekharapuram' },
      { name: 'Kummil' }, { name: 'Kundara' }, { name: 'Melila' },
      { name: 'Munroethuruth' }, { name: 'Mylom' }, { name: 'Nedumpana' },
      { name: 'Neendakara' }, { name: 'Oachira' }, { name: 'Panmana' },
      { name: 'Pavithreswaram' }, { name: 'Perayam' }, { name: 'Poruvazhy' },
      { name: 'Sasthamcotta' }, { name: 'Sooranadu North' }, { name: 'Sooranadu South' },
      { name: 'Thevalakkara' }, { name: 'Thrikkaruva' }, { name: 'Velinalloor' },
    ],
  },
  {
    name: 'Pathanamthitta',
    panchayats: [
      { name: 'Anicadu' }, { name: 'Aruvappulam' }, { name: 'Cherukole' },
      { name: 'Elanthoor' }, { name: 'Enadimangalam' }, { name: 'Erathu' },
      { name: 'Ezhamkulam' }, { name: 'Kadampanadu' }, { name: 'Kallooppara' },
      { name: 'Kaviyoor' }, { name: 'Kodumon' }, { name: 'Konni' },
      { name: 'Kottanad' }, { name: 'Kottangal' }, { name: 'Kulanada' },
      { name: 'Kumbazha' }, { name: 'Mallappally' }, { name: 'Malayalappuzha' },
      { name: 'Mylapra' }, { name: 'Naranganam' }, { name: 'Niranam' },
      { name: 'Omalloor' }, { name: 'Pandalam' }, { name: 'Peringara' },
      { name: 'Pramadom' }, { name: 'Puramattom' }, { name: 'Ranni' },
      { name: 'Seethathodu' }, { name: 'Thottapuzhassery' }, { name: 'Thiruvalla' },
      { name: 'Vechoochira' },
    ],
  },
  {
    name: 'Alappuzha',
    panchayats: [
      { name: 'Ambalappuzha North' }, { name: 'Ambalappuzha South' }, { name: 'Arattupuzha' },
      { name: 'Arookutty' }, { name: 'Aryad' }, { name: 'Bharanikkavu' },
      { name: 'Budhanoor' }, { name: 'Champakulam' }, { name: 'Chennithala' },
      { name: 'Cheruthana' }, { name: 'Cherthala' }, { name: 'Chingoli' },
      { name: 'Devikulangara' }, { name: 'Edathua' }, { name: 'Haripad' },
      { name: 'Kadakkarappally' }, { name: 'Kainakary' }, { name: 'Kanjikuzhy' },
      { name: 'Karuvatta' }, { name: 'Krishnapuram' }, { name: 'Kumarapuram' },
      { name: 'Kuthiathode' }, { name: 'Mannar' }, { name: 'Mavelikkara' },
      { name: 'Muhamma' }, { name: 'Muttar' }, { name: 'Neelamperoor' },
      { name: 'Palamel' }, { name: 'Pallippad' }, { name: 'Pathiyoor' },
      { name: 'Puliyoor' }, { name: 'Ramankary' }, { name: 'Thalavady' },
      { name: 'Thazhakara' }, { name: 'Thuravoor' }, { name: 'Veeyapuram' },
    ],
  },
  {
    name: 'Kottayam',
    panchayats: [
      { name: 'Arpookara' }, { name: 'Ayarkunnam' }, { name: 'Aymanam' },
      { name: 'Bharanganam' }, { name: 'Changanasserry' }, { name: 'Chirakkadavu' },
      { name: 'Erattupetta' }, { name: 'Ettumanoor' }, { name: 'Kadanad' },
      { name: 'Kaduthuruthy' }, { name: 'Kanakkary' }, { name: 'Kanjirappally' },
      { name: 'Karoor' }, { name: 'Kidangoor' }, { name: 'Kooroppada' },
      { name: 'Kottayam' }, { name: 'Kumarakom' }, { name: 'Kurichi' },
      { name: 'Madappally' }, { name: 'Manarcaud' }, { name: 'Meenachil' },
      { name: 'Melukavu' }, { name: 'Mundakkayam' }, { name: 'Pala' },
      { name: 'Pallickathodu' }, { name: 'Pampady' }, { name: 'Poonjar' },
      { name: 'Ramapuram' }, { name: 'Thalayolaparambu' }, { name: 'Thidanad' },
      { name: 'Uzhavoor' }, { name: 'Vakathanam' }, { name: 'Vazhoor' },
      { name: 'Veliyannoor' }, { name: 'Vijayapuram' },
    ],
  },
  {
    name: 'Idukki',
    panchayats: [
      { name: 'Adimali' }, { name: 'Alakode' }, { name: 'Ayyappancoil' },
      { name: 'Chinnakanal' }, { name: 'Devikulam' }, { name: 'Edamalakkudy' },
      { name: 'Elappara' }, { name: 'Idukki' }, { name: 'Kanchiyar' },
      { name: 'Kanjikuzhy' }, { name: 'Karimannoor' }, { name: 'Kattappana' },
      { name: 'Kokkayar' }, { name: 'Kumily' }, { name: 'Manakkad' },
      { name: 'Marayoor' }, { name: 'Mariyapuram' }, { name: 'Munnar' },
      { name: 'Nedumkandam' }, { name: 'Pallivasal' }, { name: 'Peermade' },
      { name: 'Rajakkad' }, { name: 'Rajakumary' }, { name: 'Santhanpara' },
      { name: 'Thodupuzha' }, { name: 'Udumbannoor' }, { name: 'Upputhara' },
      { name: 'Vagamon' }, { name: 'Vathikudy' }, { name: 'Vellathooval' },
    ],
  },
  {
    name: 'Ernakulam',
    panchayats: [
      { name: 'Alangad' }, { name: 'Amballoor' }, { name: 'Angamaly' },
      { name: 'Ayyampuzha' }, { name: 'Chendamangalam' }, { name: 'Cheranalloor' },
      { name: 'Chottanikkara' }, { name: 'Edakkattuvayal' }, { name: 'Edathala' },
      { name: 'Kadungalloor' }, { name: 'Kalady' }, { name: 'Kalamassery' },
      { name: 'Karukutty' }, { name: 'Keezhmad' }, { name: 'Kizhakkambalam' },
      { name: 'Koovappady' }, { name: 'Kothamangalam' }, { name: 'Kumbalam' },
      { name: 'Kunnukara' }, { name: 'Kuzhuppilly' }, { name: 'Malayattoor' },
      { name: 'Maradu' }, { name: 'Mookkannoor' }, { name: 'Muvattupuzha' },
      { name: 'Nedumbassery' }, { name: 'Njarakkal' }, { name: 'Paipra' },
      { name: 'Pallarimangalam' }, { name: 'Perumbavoor' }, { name: 'Piravom' },
      { name: 'Pootrikka' }, { name: 'Ramamangalam' }, { name: 'Thrikkakara' },
      { name: 'Thuravoor' }, { name: 'Vadavucode' }, { name: 'Vengola' },
    ],
  },
  {
    name: 'Thrissur',
    panchayats: [
      { name: 'Adat' }, { name: 'Aloor' }, { name: 'Annamanada' },
      { name: 'Avanur' }, { name: 'Chalakudy' }, { name: 'Chavakkad' },
      { name: 'Chelakkara' }, { name: 'Cherpu' }, { name: 'Chowannur' },
      { name: 'Engandiyoor' }, { name: 'Eriyad' }, { name: 'Guruvayoor' },
      { name: 'Irinjalakuda' }, { name: 'Kadangode' }, { name: 'Kadavallur' },
      { name: 'Kaduppassery' }, { name: 'Kandanassery' }, { name: 'Kodakara' },
      { name: 'Kodungallur' }, { name: 'Koratty' }, { name: 'Kunnamkulam' },
      { name: 'Madakkathara' }, { name: 'Mala' }, { name: 'Mathilakam' },
      { name: 'Mullassery' }, { name: 'Mundathicode' }, { name: 'Nadathara' },
      { name: 'Ollur' }, { name: 'Padiyoor' }, { name: 'Pavaratty' },
      { name: 'Perinjanam' }, { name: 'Poyya' }, { name: 'Puthenchira' },
      { name: 'Thrissur' }, { name: 'Varandarappilly' }, { name: 'Velookara' },
      { name: 'Vellangallur' }, { name: 'Wadakkancherry' },
    ],
  },
  {
    name: 'Palakkad',
    panchayats: [
      { name: 'Agali' }, { name: 'Akathethara' }, { name: 'Alathur' },
      { name: 'Chittur' }, { name: 'Elappully' }, { name: 'Eruthenpathy' },
      { name: 'Kadambazhipuram' }, { name: 'Kanhirapuzha' }, { name: 'Karimba' },
      { name: 'Karimpuzha' }, { name: 'Keralassery' }, { name: 'Kizhakkencherry' },
      { name: 'Kodumba' }, { name: 'Koduvayur' }, { name: 'Kollengode' },
      { name: 'Koppam' }, { name: 'Kottayi' }, { name: 'Kuzhalmannam' },
      { name: 'Malampuzha' }, { name: 'Mannarkkad' }, { name: 'Marutharoad' },
      { name: 'Mundur' }, { name: 'Muthalamada' }, { name: 'Nellaya' },
      { name: 'Nemmara' }, { name: 'Ottappalam' }, { name: 'Palakkad' },
      { name: 'Pattambi' }, { name: 'Pattithara' }, { name: 'Peruvemba' },
      { name: 'Pirayiri' }, { name: 'Shoranur' }, { name: 'Sreekrishnapuram' },
      { name: 'Tarur' }, { name: 'Thrithala' }, { name: 'Vadakkencherry' },
    ],
  },
  {
    name: 'Malappuram',
    panchayats: [
      { name: 'Anakkayam' }, { name: 'Areekode' }, { name: 'Chelembra' },
      { name: 'Cherukavu' }, { name: 'Chokkad' }, { name: 'Edappal' },
      { name: 'Edavanna' }, { name: 'Irimbiliyam' }, { name: 'Kadampuzha' },
      { name: 'Kalikavu' }, { name: 'Kalpakanchery' }, { name: 'Karulai' },
      { name: 'Keezhattur' }, { name: 'Kondotty' }, { name: 'Kottakkal' },
      { name: 'Kuruvattur' }, { name: 'Malappuram' }, { name: 'Mammpad' },
      { name: 'Manjeri' }, { name: 'Mankada' }, { name: 'Melattur' },
      { name: 'Morayur' }, { name: 'Nilambur' }, { name: 'Othukkungal' },
      { name: 'Pandikkad' }, { name: 'Perinthalmanna' }, { name: 'Ponnani' },
      { name: 'Puzhakkattiri' }, { name: 'Tanur' }, { name: 'Tenhipalam' },
      { name: 'Thenhippalam' }, { name: 'Thirurrangadi' }, { name: 'Tirunavaya' },
      { name: 'Valanchery' }, { name: 'Vengara' }, { name: 'Wandoor' },
    ],
  },
  {
    name: 'Kozhikode',
    panchayats: [
      { name: 'Azhiyur' }, { name: 'Balussery' }, { name: 'Changaroth' },
      { name: 'Chathamangalam' }, { name: 'Chelannur' }, { name: 'Chempanoda' },
      { name: 'Chemancheri' }, { name: 'Chorode' }, { name: 'Feroke' },
      { name: 'Karassery' }, { name: 'Kakkodi' }, { name: 'Kayakkody' },
      { name: 'Kodiyathur' }, { name: 'Koduvally' }, { name: 'Koothali' },
      { name: 'Koyilandy' }, { name: 'Kunnamangalam' }, { name: 'Kunnummal' },
      { name: 'Kuttiady' }, { name: 'Madavoor' }, { name: 'Mavoor' },
      { name: 'Meppayur' }, { name: 'Mukkom' }, { name: 'Nadapuram' },
      { name: 'Nanminda' }, { name: 'Olavanna' }, { name: 'Panangad' },
      { name: 'Perambra' }, { name: 'Peruvayal' }, { name: 'Ramanattukara' },
      { name: 'Thamarassery' }, { name: 'Thiruvambady' }, { name: 'Thuneri' },
      { name: 'Ulliyeri' }, { name: 'Unnikulam' }, { name: 'Vadakara' },
    ],
  },
  {
    name: 'Wayanad',
    panchayats: [
      { name: 'Ambalavayal' }, { name: 'Edavaka' }, { name: 'Kaniyambetta' },
      { name: 'Kalpetta' }, { name: 'Kottathara' }, { name: 'Mananthavady' },
      { name: 'Meenangadi' }, { name: 'Meppadi' }, { name: 'Muttil' },
      { name: 'Nenmeni' }, { name: 'Noolpuzha' }, { name: 'Padinjarethara' },
      { name: 'Panamaram' }, { name: 'Poothadi' }, { name: 'Pozhuthana' },
      { name: 'Pulpally' }, { name: 'Sultan Bathery' }, { name: 'Thirunelli' },
      { name: 'Thondernad' }, { name: 'Vellamunda' }, { name: 'Vythiri' },
    ],
  },
  {
    name: 'Kannur',
    panchayats: [
      { name: 'Azhikode' }, { name: 'Chapparapadavu' }, { name: 'Cherukunnu' },
      { name: 'Cheruthazham' }, { name: 'Chirakkal' }, { name: 'Dharmadam' },
      { name: 'Edakkad' }, { name: 'Iritty' }, { name: 'Kadirur' },
      { name: 'Kalliasseri' }, { name: 'Kannapuram' }, { name: 'Kannur' },
      { name: 'Kuthuparamba' }, { name: 'Madayi' }, { name: 'Maloor' },
      { name: 'Mattanur' }, { name: 'Mayyil' }, { name: 'Mokeri' },
      { name: 'Muzhappilangad' }, { name: 'Narath' }, { name: 'New Mahe' },
      { name: 'Padiyoor' }, { name: 'Panoor' }, { name: 'Pappinisseri' },
      { name: 'Payyanur' }, { name: 'Peralasseri' }, { name: 'Peravoor' },
      { name: 'Peringathur' }, { name: 'Taliparamba' }, { name: 'Thalassery' },
      { name: 'Thripangottur' }, { name: 'Ulikkal' }, { name: 'Valapattanam' },
    ],
  },
  {
    name: 'Kasaragod',
    panchayats: [
      { name: 'Ajanur' }, { name: 'Badiadka' }, { name: 'Balal' },
      { name: 'Bedadka' }, { name: 'Belur' }, { name: 'Chemmanad' },
      { name: 'Cheruvathur' }, { name: 'Delampady' }, { name: 'East Eleri' },
      { name: 'Enmakaje' }, { name: 'Hosdurg' }, { name: 'Karadka' },
      { name: 'Kanhangad' }, { name: 'Kasaragod' }, { name: 'Kinanoor Karinthalam' },
      { name: 'Kodombelur' }, { name: 'Kumbadaje' }, { name: 'Madhur' },
      { name: 'Mangalpady' }, { name: 'Manjeshwaram' }, { name: 'Meenja' },
      { name: 'Muliyar' }, { name: 'Nileshwar' }, { name: 'Padne' },
      { name: 'Pallikkara' }, { name: 'Panathady' }, { name: 'Pilicode' },
      { name: 'Pullur Periya' }, { name: 'Udma' }, { name: 'Vorkady' },
      { name: 'West Eleri' },
    ],
  },
];

// Helper to get all district names
export const getDistrictNames = (): string[] => {
  return keralaDistricts.map(d => d.name);
};

// Helper to get panchayats for a district
export const getPanchayatsByDistrict = (districtName: string): Panchayat[] => {
  const district = keralaDistricts.find(d => d.name === districtName);
  return district ? district.panchayats : [];
};

// Helper to search panchayats across all districts
export const searchPanchayats = (query: string): { district: string; panchayat: Panchayat }[] => {
  const results: { district: string; panchayat: Panchayat }[] = [];
  const lowerQuery = query.toLowerCase();
  
  keralaDistricts.forEach(district => {
    district.panchayats.forEach(panchayat => {
      if (panchayat.name.toLowerCase().includes(lowerQuery)) {
        results.push({ district: district.name, panchayat });
      }
    });
  });
  
  return results;
};
