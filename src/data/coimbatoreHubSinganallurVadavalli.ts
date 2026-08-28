import { BusRoute } from '../types';
import { makeCbeRoute } from './coimbatoreRoutesHelper';

export const SINGANALLUR_VADAVALLI_PERIPHERAL_ROUTES: BusRoute[] = [
  // 1. Route 1A: Maruthamalai ↔ Ondipudur
  makeCbeRoute(
    'route_cbe_1a',
    '1A',
    'Maruthamalai ↔ Ondipudur (via Vadavalli, Lawley Road, Gandhipuram, Lakshmi Mills, Singanallur, Ondipudur)',
    'மருதமலை ↔ ஒண்டிப்புதூர் (வடவள்ளி, லாலி ரோடு, காந்திபுரம், லக்ஷ்மி மில்ஸ், சிங்கநல்லூர் வழி)',
    'stop_cbe_marudhamalai',
    'stop_cbe_ondipudur_bs',
    ['stop_cbe_marudhamalai', 'stop_cbe_vadavalli_bs', 'stop_cbe_lawley_road', 'stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs'],
    25.5,
    58,
    8
  ),

  // 2. Route 1B: Maruthamalai ↔ Singanallur
  makeCbeRoute(
    'route_cbe_1b',
    '1B',
    'Maruthamalai ↔ Singanallur (via Vadavalli, Lawley Road, Gandhipuram, Lakshmi Mills, Singanallur)',
    'மருதமலை ↔ சிங்கநல்லூர் (வடவள்ளி, லாலி ரோடு, காந்திபுரம், லக்ஷ்மி மில்ஸ் வழி)',
    'stop_cbe_marudhamalai',
    'stop_cbe_singanallur_bs',
    ['stop_cbe_marudhamalai', 'stop_cbe_vadavalli_bs', 'stop_cbe_lawley_road', 'stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_singanallur_bs'],
    22.5,
    52,
    10
  ),

  // 3. Route 1C: Maruthamalai ↔ Sulur
  makeCbeRoute(
    'route_cbe_1c',
    '1C',
    'Maruthamalai ↔ Sulur (via Vadavalli, Lawley Road, Gandhipuram, Singanallur, Ondipudur, Sulur)',
    'மருதமலை ↔ சூலூர் (வடவள்ளி, லாலி ரோடு, காந்திபுரம், சிங்கநல்லூர், ஒண்டிப்புதூர் வழி)',
    'stop_cbe_marudhamalai',
    'stop_cbe_sulur_bs',
    ['stop_cbe_marudhamalai', 'stop_cbe_vadavalli_bs', 'stop_cbe_lawley_road', 'stop_cbe_gandhipuram_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_chinthamanipudur', 'stop_cbe_sulur_bs'],
    34.5,
    75,
    12
  ),

  // 4. Route 1D: Maruthamalai ↔ Somanur
  makeCbeRoute(
    'route_cbe_1d',
    '1D',
    'Maruthamalai ↔ Somanur (via Vadavalli, Gandhipuram, Singanallur, Ondipudur, Sulur, Somanur)',
    'மருதமலை ↔ சோமனூர் (வடவள்ளி, காந்திபுரம், சிங்கநல்லூர், ஒண்டிப்புதூர், சூலூர் வழி)',
    'stop_cbe_marudhamalai',
    'stop_cbe_somanur',
    ['stop_cbe_marudhamalai', 'stop_cbe_vadavalli_bs', 'stop_cbe_lawley_road', 'stop_cbe_gandhipuram_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_sulur_bs', 'stop_cbe_somanur'],
    45.5,
    95,
    20
  ),

  // 5. Route 1E: Maruthamalai ↔ Irugur
  makeCbeRoute(
    'route_cbe_1e',
    '1E',
    'Maruthamalai ↔ Irugur (via Vadavalli, Gandhipuram, Singanallur, Ondipudur, Irugur)',
    'மருதமலை ↔ இருகூர் (வடவள்ளி, காந்திபுரம், சிங்கநல்லூர், ஒண்டிப்புதூர் வழி)',
    'stop_cbe_marudhamalai',
    'stop_cbe_irugur',
    ['stop_cbe_marudhamalai', 'stop_cbe_vadavalli_bs', 'stop_cbe_lawley_road', 'stop_cbe_gandhipuram_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_irugur'],
    28.0,
    64,
    15
  ),

  // 6. Route 2: Ondipudur ↔ Perur
  makeCbeRoute(
    'route_cbe_2',
    '2',
    'Ondipudur ↔ Perur (via Singanallur, Ramanathapuram, Sungam, Town Hall, Selvapuram, Perur)',
    'ஒண்டிப்புதூர் ↔ பேரூர் (சிங்கநல்லூர், ராமநாதபுரம், சுங்கம், டவுன் ஹால், செல்வபுரம் வழி)',
    'stop_cbe_ondipudur_bs',
    'stop_cbe_perur_patteeswarar',
    ['stop_cbe_ondipudur_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ramanathapuram', 'stop_cbe_sungam', 'stop_cbe_town_hall', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar'],
    19.5,
    48,
    10
  ),

  // 7. Route 2B: Ondipudur ↔ Vadavalli
  makeCbeRoute(
    'route_cbe_2b',
    '2B',
    'Ondipudur ↔ Vadavalli (via Singanallur, Lakshmi Mills, Gandhipuram, Lawley Road, Vadavalli)',
    'ஒண்டிப்புதூர் ↔ வடவள்ளி (சிங்கநல்லூர், லக்ஷ்மி மில்ஸ், காந்திபுரம், லாலி ரோடு வழி)',
    'stop_cbe_ondipudur_bs',
    'stop_cbe_vadavalli_bs',
    ['stop_cbe_ondipudur_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_gandhipuram_bs', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs'],
    20.5,
    48,
    12
  ),

  // 8. Route 2C: Ondipudur ↔ Maruthamalai
  makeCbeRoute(
    'route_cbe_2c',
    '2C',
    'Ondipudur ↔ Maruthamalai (via Singanallur, Gandhipuram, Lawley Road, Vadavalli, Maruthamalai)',
    'ஒண்டிப்புதூர் ↔ மருதமலை (சிங்கநல்லூர், காந்திபுரம், லாலி ரோடு, வடவள்ளி வழி)',
    'stop_cbe_ondipudur_bs',
    'stop_cbe_marudhamalai',
    ['stop_cbe_ondipudur_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_gandhipuram_bs', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs', 'stop_cbe_marudhamalai'],
    25.5,
    58,
    10
  ),

  // 9. Route 10D: Singanallur ↔ Thudiyalur
  makeCbeRoute(
    'route_cbe_10d',
    '10D',
    'Singanallur ↔ Thudiyalur (via Ramanathapuram, Gandhipuram, Vadakovai, Saibaba Colony, Thudiyalur)',
    'சிங்கநல்லூர் ↔ துடியலூர் (ராமநாதபுரம், காந்திபுரம், வடகோவை, சாய்பாபா காலனி வழி)',
    'stop_cbe_singanallur_bs',
    'stop_cbe_thudiyalur_bs',
    ['stop_cbe_singanallur_bs', 'stop_cbe_ramanathapuram', 'stop_cbe_gandhipuram_bs', 'stop_cbe_vadakovai', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_thudiyalur_bs'],
    19.0,
    46,
    12
  ),

  // 10. Route 16C: Singanallur ↔ Narasimhanaickenpalayam
  makeCbeRoute(
    'route_cbe_16c',
    '16C',
    'Singanallur ↔ Narasimhanaickenpalayam (via Gandhipuram, Saibaba Colony, Thudiyalur, NSN Palayam)',
    'சிங்கநல்லூர் ↔ நரசிம்மநாயக்கன்பாளையம் (காந்திபுரம், சாய்பாபா காலனி, துடியலூர் வழி)',
    'stop_cbe_singanallur_bs',
    'stop_cbe_poochiyur',
    ['stop_cbe_singanallur_bs', 'stop_cbe_gandhipuram_bs', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_thudiyalur_bs', 'stop_cbe_poochiyur'],
    22.5,
    52,
    15
  ),

  // 11. Route 21C: Ondipudur ↔ Annur
  makeCbeRoute(
    'route_cbe_21c',
    '21C',
    'Ondipudur ↔ Annur (via Singanallur, Gandhipuram, Ganapathy, Saravanampatti, Kovilpalayam, Annur)',
    'ஒண்டிப்புதூர் ↔ அன்னூர் (சிங்கநல்லூர், காந்திபுரம், கணபதி, சரவணம்பட்டி, கோவில்பாளையம் வழி)',
    'stop_cbe_ondipudur_bs',
    'stop_cbe_annur',
    ['stop_cbe_ondipudur_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    38.0,
    78,
    15
  ),

  // 12. Route 26A: Singanallur ↔ Vadavalli
  makeCbeRoute(
    'route_cbe_26a',
    '26A',
    'Singanallur ↔ Vadavalli (via Ramanathapuram, Sungam, Town Hall, Lawley Road, Vadavalli)',
    'சிங்கநல்லூர் ↔ வடவள்ளி (ராமநாதபுரம், சுங்கம், டவுன் ஹால், லாலி ரோடு வழி)',
    'stop_cbe_singanallur_bs',
    'stop_cbe_vadavalli_bs',
    ['stop_cbe_singanallur_bs', 'stop_cbe_ramanathapuram', 'stop_cbe_sungam', 'stop_cbe_town_hall', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs'],
    18.5,
    44,
    12
  ),

  // 13. Route 35: Ondipudur ↔ Vadavalli
  makeCbeRoute(
    'route_cbe_35',
    '35',
    'Ondipudur ↔ Vadavalli (via Singanallur, Ramanathapuram, Gandhi Park, Lawley Road, Vadavalli)',
    'ஒண்டிப்புதூர் ↔ வடவள்ளி (சிங்கநல்லூர், ராமநாதபுரம், காந்தி பார்க், லாலி ரோடு வழி)',
    'stop_cbe_ondipudur_bs',
    'stop_cbe_vadavalli_bs',
    ['stop_cbe_ondipudur_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ramanathapuram', 'stop_cbe_gandhi_park_west', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs'],
    20.5,
    48,
    15
  ),

  // 14. Route 36: Ondipudur ↔ Maruthamalai
  makeCbeRoute(
    'route_cbe_36',
    '36',
    'Ondipudur ↔ Maruthamalai (via Singanallur, Sungam, Town Hall, Lawley Road, Vadavalli, Maruthamalai)',
    'ஒண்டிப்புதூர் ↔ மருதமலை (சிங்கநல்லூர், சுங்கம், டவுன் ஹால், லாலி ரோடு, வடவள்ளி வழி)',
    'stop_cbe_ondipudur_bs',
    'stop_cbe_marudhamalai',
    ['stop_cbe_ondipudur_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_sungam', 'stop_cbe_town_hall', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs', 'stop_cbe_marudhamalai'],
    26.0,
    60,
    12
  ),

  // 15. Route 46: Singanallur ↔ Madukkarai
  makeCbeRoute(
    'route_cbe_46',
    '46',
    'Singanallur ↔ Madukkarai (via Podanur, Sundarapuram, SIDCO, Madukkarai)',
    'சிங்கநல்லூர் ↔ மதுக்கரை (போத்தனூர், சுந்தராபுரம், சிட்கோ, மதுக்கரை வழி)',
    'stop_cbe_singanallur_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_singanallur_bs', 'stop_cbe_podanur_junction', 'stop_cbe_sundarapuram', 'stop_cbe_sidco', 'stop_cbe_madukkarai_bs'],
    16.0,
    38,
    15
  ),

  // 16. Route 20D: Coimbatore Airport (SITRA) ↔ Railway Station / Gandhipuram
  makeCbeRoute(
    'route_cbe_20d',
    '20D',
    'Coimbatore Airport (SITRA) ↔ Railway Station (via SITRA, Hope College, Peelamedu, Lakshmi Mills, Gandhipuram, Railway Station)',
    'கோவை விமான நிலையம் (சிட்ரா) ↔ ரயில் நிலையம் (ஹோப் காலேஜ், பீளமேடு, லக்ஷ்மி மில்ஸ், காந்திபுரம் வழி)',
    'stop_cbe_airport',
    'stop_cbe_railway_station',
    ['stop_cbe_airport', 'stop_cbe_sitra_junction', 'stop_cbe_hope_college', 'stop_cbe_peelamedu_psg', 'stop_cbe_lakshmi_mills', 'stop_cbe_gandhipuram_bs', 'stop_cbe_railway_station'],
    14.0,
    35,
    10,
    'Low Floor AC'
  ),

  // 17. Route 70: Gandhipuram ↔ Mettupalayam (Gateway to Nilgiris)
  makeCbeRoute(
    'route_cbe_70',
    '70',
    'Gandhipuram ↔ Mettupalayam (via Saibaba Colony, Kavundampalayam, Thudiyalur, Periyanaickenpalayam, Karamadai, Mettupalayam)',
    'காந்திபுரம் ↔ மேட்டுப்பாளையம் (சாய்பாபா காலனி, துடியலூர், பெரியநாயக்கன்பாளையம், காரமடை வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_mettupalayam_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_kavundampalayam', 'stop_cbe_thudiyalur_bs', 'stop_cbe_periyanaickenpalayam', 'stop_cbe_karamadai', 'stop_cbe_mettupalayam_bs'],
    37.0,
    65,
    8,
    'Express'
  ),

  // 18. Route 96: Ukkadam ↔ Pollachi New Bus Stand
  makeCbeRoute(
    'route_cbe_96',
    '96',
    'Ukkadam ↔ Pollachi (via Sundarapuram, Eachanari, Malumichampatti, Kinathukadavu, Achipatti, Pollachi New Bus Stand)',
    'உக்கடம் ↔ பொள்ளாச்சி (சுந்தராபுரம், ஈச்சனாரி, மலுமிச்சம்பட்டி, கிணத்துக்கடவு, ஆச்சிபட்டி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_pollachi_new_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_eachanari_temple', 'stop_cbe_malumichampatti', 'stop_cbe_kinathukadavu', 'stop_cbe_pollachi_new_bs'],
    42.0,
    68,
    6,
    'Express'
  )
];
