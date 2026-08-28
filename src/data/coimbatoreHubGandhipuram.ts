import { BusRoute } from '../types';
import { makeCbeRoute } from './coimbatoreRoutesHelper';

export const GANDHIPURAM_HUB_ROUTES: BusRoute[] = [
  // 1. Route 1: Maruthamalai ↔ Avarampalayam
  makeCbeRoute(
    'route_cbe_1',
    '1',
    'Maruthamalai ↔ Avarampalayam (via Vadavalli, Lawley Road, Gandhipuram)',
    'மருதமலை ↔ அவாரம்பாளையம் (வடவள்ளி, லாலி ரோடு, காந்திபுரம் வழி)',
    'stop_cbe_marudhamalai',
    'stop_cbe_avarampalayam',
    ['stop_cbe_marudhamalai', 'stop_cbe_mullai_nagar', 'stop_cbe_vadavalli_bs', 'stop_cbe_lawley_road', 'stop_cbe_gandhipuram_bs', 'stop_cbe_sri_ramakrishna_hosp', 'stop_cbe_avarampalayam'],
    19.5,
    48,
    10
  ),

  // 2. Route 100: Gandhipuram ↔ Gandhipuram (Circular via Peelamedu, Cheran Ma Nagar, Ganapathi)
  makeCbeRoute(
    'route_cbe_100',
    '100',
    'Gandhipuram ↔ Gandhipuram (via Lakshmi Mills, Peelamedu, Cheran Ma Nagar, Police Colony, Ganapathi)',
    'காந்திபுரம் ↔ காந்திபுரம் (சுற்றுப் பாதை: லக்ஷ்மி மில்ஸ், பீளமேடு, சேரன் மா நகர், கணபதி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_peelamedu_psg', 'stop_cbe_cheran_maa_nagar', 'stop_cbe_police_colony', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_gandhipuram_bs'],
    24.0,
    58,
    12
  ),

  // 3. Route 100C: Gandhipuram ↔ Gandhipuram (Reverse Circular)
  makeCbeRoute(
    'route_cbe_100c',
    '100C',
    'Gandhipuram ↔ Gandhipuram (via Ganapathi, Police Colony, Cheran Ma Nagar, Peelamedu, Lakshmi Mills)',
    'காந்திபுரம் ↔ காந்திபுரம் (மறுசுற்றுப் பாதை: கணபதி, போலீஸ் காலனி, சேரன் மா நகர், பீளமேடு வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_police_colony', 'stop_cbe_cheran_maa_nagar', 'stop_cbe_peelamedu_psg', 'stop_cbe_lakshmi_mills', 'stop_cbe_gandhipuram_bs'],
    24.0,
    58,
    12
  ),

  // 4. Route 111: Gandhipuram ↔ Gandhipuram (via North Coimbatore, Chinthamani, Vellakinaru, Thudiyalur, Kavundampalayam, Saibaba Colony)
  makeCbeRoute(
    'route_cbe_111',
    '111',
    'Gandhipuram ↔ Gandhipuram (via Vadakovai, Vellakinaru, Thudiyalur, Kavundampalayam, Saibaba Colony)',
    'காந்திபுரம் ↔ காந்திபுரம் (வடகோவை, வெள்ளக்கிணறு, துடியலூர், கவுண்டம்பாளையம், சாய்பாபா காலனி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_vadakovai', 'stop_cbe_vellakinaru', 'stop_cbe_thudiyalur_bs', 'stop_cbe_cheran_nagar', 'stop_cbe_kavundampalayam', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_gandhipuram_bs'],
    26.5,
    62,
    15
  ),

  // 5. Route 111A: Gandhipuram ↔ Gandhipuram (Reverse Loop via Saibaba Colony, Kavundampalayam, Thudiyalur, Vellakinaru)
  makeCbeRoute(
    'route_cbe_111a',
    '111A',
    'Gandhipuram ↔ Gandhipuram (via Saibaba Colony, Kavundampalayam, Thudiyalur, Vellakinaru, Vadakovai)',
    'காந்திபுரம் ↔ காந்திபுரம் (சாய்பாபா காலனி, கவுண்டம்பாளையம், துடியலூர், வெள்ளக்கிணறு, வடகோவை வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_kavundampalayam', 'stop_cbe_cheran_nagar', 'stop_cbe_thudiyalur_bs', 'stop_cbe_vellakinaru', 'stop_cbe_vadakovai', 'stop_cbe_gandhipuram_bs'],
    26.5,
    62,
    15
  ),

  // 6. Route 115: Gandhipuram ↔ Gandhipuram (via Hope College, SITRA, Nehru Nagar, Dr NGP Arts, Kalapatti, Chinniampalayam)
  makeCbeRoute(
    'route_cbe_115',
    '115',
    'Gandhipuram ↔ Gandhipuram (via Hope College, SITRA, Nehru Nagar, Dr NGP Arts, Kalapatti, Chinniampalayam)',
    'காந்திபுரம் ↔ காந்திபுரம் (ஹோப் காலேஜ், சிட்ரா, நேரு நகர், என்.ஜி.பி கலை கல்லூரி, காளப்பட்டி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_aravind_eye', 'stop_cbe_hope_college', 'stop_cbe_sitra_junction', 'stop_cbe_nehru_nagar', 'stop_cbe_ngp_arts', 'stop_cbe_kalapatti', 'stop_cbe_chinniampalayam', 'stop_cbe_gandhipuram_bs'],
    28.0,
    65,
    15
  ),

  // 7. Route 115A: Gandhipuram ↔ Gandhipuram (Reverse Loop via Chinniampalayam, Kalapatti, Dr NGP Arts, SITRA)
  makeCbeRoute(
    'route_cbe_115a',
    '115A',
    'Gandhipuram ↔ Gandhipuram (via Chinniampalayam, Kalapatti, Dr NGP Arts, SITRA, Hope College)',
    'காந்திபுரம் ↔ காந்திபுரம் (சின்னியம்பாளையம், காளப்பட்டி, என்.ஜி.பி கலை கல்லூரி, சிட்ரா, ஹோப் காலேஜ் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_chinniampalayam', 'stop_cbe_kalapatti', 'stop_cbe_ngp_arts', 'stop_cbe_nehru_nagar', 'stop_cbe_sitra_junction', 'stop_cbe_hope_college', 'stop_cbe_aravind_eye', 'stop_cbe_gandhipuram_bs'],
    28.0,
    65,
    15
  ),

  // 8. Route 115C: Gandhipuram ↔ Gandhipuram (via Peelamedu, Hope College, SITRA, Kalapatti, Chinniampalayam)
  makeCbeRoute(
    'route_cbe_115c',
    '115C',
    'Gandhipuram ↔ Gandhipuram (via Lakshmi Mills, Peelamedu, SITRA, Kalapatti, Chinniampalayam)',
    'காந்திபுரம் ↔ காந்திபுரம் (லக்ஷ்மி மில்ஸ், பீளமேடு, சிட்ரா, காளப்பட்டி, சின்னியம்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_peelamedu_psg', 'stop_cbe_hope_college', 'stop_cbe_sitra_junction', 'stop_cbe_kalapatti', 'stop_cbe_chinniampalayam', 'stop_cbe_gandhipuram_bs'],
    27.0,
    63,
    20
  ),

  // 9. Route 117: Gandhipuram ↔ Gandhipuram (via Gandhi Park, Selvapuram, Perur, Sundakkamuthur, Kuniamuthur, Ukkadam, Railway Station)
  makeCbeRoute(
    'route_cbe_117',
    '117',
    'Gandhipuram ↔ Gandhipuram (via Gandhi Park, Selvapuram, Perur, Sundakkamuthur, Kuniamuthur, Ukkadam, Railway Station)',
    'காந்திபுரம் ↔ காந்திபுரம் (காந்தி பார்க், செல்வபுரம், பேரூர், குனியமுத்தூர், உக்கடம், ரயில் நிலையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_gandhi_park_west', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_sundakkamuthur', 'stop_cbe_kuniyamuthur', 'stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs'],
    28.5,
    68,
    15
  ),

  // 10. Route 118: Gandhipuram ↔ Gandhipuram (Reverse: via Railway Station, Ukkadam, Kuniamuthur, Perur, Selvapuram, Gandhi Park)
  makeCbeRoute(
    'route_cbe_118',
    '118',
    'Gandhipuram ↔ Gandhipuram (via Railway Station, Ukkadam, Kuniamuthur, Perur, Selvapuram, Gandhi Park)',
    'காந்திபுரம் ↔ காந்திபுரம் (ரயில் நிலையம், உக்கடம், குனியமுத்தூர், பேரூர், செல்வபுரம், காந்தி பார்க் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_railway_station', 'stop_cbe_town_hall', 'stop_cbe_ukkadam_bs', 'stop_cbe_kuniyamuthur', 'stop_cbe_sundakkamuthur', 'stop_cbe_perur_patteeswarar', 'stop_cbe_selvapuram', 'stop_cbe_gandhi_park_west', 'stop_cbe_gandhipuram_bs'],
    28.5,
    68,
    15
  ),

  // 11. Route 14: Gandhipuram ↔ Neelambur
  makeCbeRoute(
    'route_cbe_14',
    '14',
    'Gandhipuram ↔ Neelambur (via Lakshmi Mills, Peelamedu, Hope College, SITRA, Chinniampalayam)',
    'காந்திபுரம் ↔ நீலம்பூர் (லக்ஷ்மி மில்ஸ், பீளமேடு, ஹோப் காலேஜ், சிட்ரா, சின்னியம்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_neelambur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_peelamedu_psg', 'stop_cbe_hope_college', 'stop_cbe_sitra_junction', 'stop_cbe_chinniampalayam', 'stop_cbe_neelambur'],
    16.8,
    42,
    10
  ),

  // 12. Route 14A: Gandhipuram ↔ Neelambur (via PSG iTech)
  makeCbeRoute(
    'route_cbe_14a',
    '14A',
    'Gandhipuram ↔ Neelambur (via Peelamedu, Hope College, SITRA, Goldwins, PSG iTech)',
    'காந்திபுரம் ↔ நீலம்பூர் (பீளமேடு, ஹோப் காலேஜ், சிட்ரா, கோல்ட்வின்ஸ், பிஎஸ்ஜி ஐடெக் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_neelambur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_peelamedu_psg', 'stop_cbe_hope_college', 'stop_cbe_sitra_junction', 'stop_cbe_goldwins', 'stop_cbe_neelambur'],
    17.2,
    43,
    12
  ),

  // 13. Route 14B: Gandhipuram ↔ Neelambur (via Nava India, Hope College)
  makeCbeRoute(
    'route_cbe_14b',
    '14B',
    'Gandhipuram ↔ Neelambur (via Nava India, Hope College, SITRA, Chinniampalayam)',
    'காந்திபுரம் ↔ நீலம்பூர் (நவா இந்தியா, ஹோப் காலேஜ், சிட்ரா, சின்னியம்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_neelambur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_nava_india', 'stop_cbe_hope_college', 'stop_cbe_sitra_junction', 'stop_cbe_chinniampalayam', 'stop_cbe_neelambur'],
    16.5,
    40,
    15
  ),

  // 14. Route 14C: Gandhipuram ↔ Mylampatti
  makeCbeRoute(
    'route_cbe_14c',
    '14C',
    'Gandhipuram ↔ Mylampatti (via Hope College, SITRA, Nehru Nagar, Kalapatti)',
    'காந்திபுரம் ↔ மயிலம்பட்டி (ஹோப் காலேஜ், சிட்ரா, நேரு நகர், காளப்பட்டி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kalapatti',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_hope_college', 'stop_cbe_sitra_junction', 'stop_cbe_nehru_nagar', 'stop_cbe_ngp_arts', 'stop_cbe_kalapatti'],
    18.5,
    46,
    15
  ),

  // 15. Route 14D: Gandhipuram ↔ Neelambur (via CIT, SITRA)
  makeCbeRoute(
    'route_cbe_14d',
    '14D',
    'Gandhipuram ↔ Neelambur (via Lakshmi Mills, CIT, SITRA, Chinniampalayam)',
    'காந்திபுரம் ↔ நீலம்பூர் (லக்ஷ்மி மில்ஸ், சி.ஐ.டி, சிட்ரா, சின்னியம்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_neelambur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_cit_college', 'stop_cbe_sitra_junction', 'stop_cbe_chinniampalayam', 'stop_cbe_neelambur'],
    17.0,
    42,
    15
  ),

  // 16. Route 15: Gandhipuram ↔ Vellamadai
  makeCbeRoute(
    'route_cbe_15',
    '15',
    'Gandhipuram ↔ Vellamadai (via Ganapathy, Saravanampatti, Kovilpalayam)',
    'காந்திபுரம் ↔ வெள்ளமடை (கணபதி, சரவணம்பட்டி, கோவில்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_vellamadai',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_vellamadai'],
    22.0,
    52,
    15
  ),

  // 17. Route 15B: Gandhipuram ↔ Kovanur
  makeCbeRoute(
    'route_cbe_15b',
    '15B',
    'Gandhipuram ↔ Kovanur (via Ganapathy, Saravanampatti, Kovilpalayam, Vellamadai)',
    'காந்திபுரம் ↔ கோவனூர் (கணபதி, சரவணம்பட்டி, கோவில்பாளையம், வெள்ளமடை வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kovanur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_vellamadai', 'stop_cbe_kovanur'],
    25.5,
    58,
    20
  ),

  // 18. Route 19C: Gandhipuram ↔ Kovai Kondattam
  makeCbeRoute(
    'route_cbe_19c',
    '19C',
    'Gandhipuram ↔ Kovai Kondattam (via Town Hall, Selvapuram, Perur, Pachapalayam)',
    'காந்திபுரம் ↔ கோவை கொண்டாட்டம் (டவுன் ஹால், செல்வபுரம், பேரூர், பச்சைப்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kovai_kondattam',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_town_hall', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_pachapalayam', 'stop_cbe_kovai_kondattam'],
    16.5,
    42,
    15
  ),

  // 19. Route 19D: Gandhipuram ↔ Perur
  makeCbeRoute(
    'route_cbe_19d',
    '19D',
    'Gandhipuram ↔ Perur (via Town Hall, Selvapuram, Perur Patteeswarar Temple)',
    'காந்திபுரம் ↔ பேரூர் (டவுன் ஹால், செல்வபுரம், பேரூர் பட்டீஸ்வரர் கோவில் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_perur_patteeswarar',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_town_hall', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar'],
    12.0,
    30,
    10
  ),

  // 20. Route 21: Gandhipuram ↔ Sulur
  makeCbeRoute(
    'route_cbe_21',
    '21',
    'Gandhipuram ↔ Sulur (via Lakshmi Mills, Singanallur, Ondipudur, Chinthamanipudur, Sulur)',
    'காந்திபுரம் ↔ சூலூர் (லக்ஷ்மி மில்ஸ், சிங்கநல்லூர், ஒண்டிப்புதூர், சிந்தாமணிப்புதூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_sulur_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_chinthamanipudur', 'stop_cbe_sulur_bs'],
    21.0,
    50,
    10
  ),

  // 21. Route 21A: Gandhipuram ↔ Somanur
  makeCbeRoute(
    'route_cbe_21a',
    '21A',
    'Gandhipuram ↔ Somanur (via Singanallur, Ondipudur, Sulur, Somanur)',
    'காந்திபுரம் ↔ சோமனூர் (சிங்கநல்லூர், ஒண்டிப்புதூர், சூலூர், சோமனூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_somanur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_chinthamanipudur', 'stop_cbe_sulur_bs', 'stop_cbe_somanur'],
    32.0,
    72,
    15
  ),

  // 22. Route 21B: Gandhipuram ↔ Sulur (via Peelamedu)
  makeCbeRoute(
    'route_cbe_21b',
    '21B',
    'Gandhipuram ↔ Sulur (via Peelamedu, Singanallur, Ondipudur, Sulur)',
    'காந்திபுரம் ↔ சூலூர் (பீளமேடு, சிங்கநல்லூர், ஒண்டிப்புதூர், சூலூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_sulur_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_peelamedu_psg', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_sulur_bs'],
    22.5,
    54,
    15
  ),

  // 23. Route 21D: Gandhipuram ↔ Kannampalayam
  makeCbeRoute(
    'route_cbe_21d',
    '21D',
    'Gandhipuram ↔ Kannampalayam (via Singanallur, Ondipudur, Chinthamanipudur, Kannampalayam)',
    'காந்திபுரம் ↔ கண்ணம்பாளையம் (சிங்கநல்லூர், ஒண்டிப்புதூர், சிந்தாமணிப்புதூர், கண்ணம்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kannampalayam_town',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_chinthamanipudur', 'stop_cbe_kannampalayam_town'],
    19.5,
    46,
    15
  ),

  // 24. Route 22A: Gandhipuram ↔ Chellapa Goundan Pudur
  makeCbeRoute(
    'route_cbe_22a',
    '22A',
    'Gandhipuram ↔ Chellapa Goundan Pudur (via Hope College, Singanallur, Irugur)',
    'காந்திபுரம் ↔ செல்லப்ப கவுண்டன் புதூர் (ஹோப் காலேஜ், சிங்கநல்லூர், இருகூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_chellapa_goundan_pudur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_hope_college', 'stop_cbe_singanallur_bs', 'stop_cbe_irugur', 'stop_cbe_chellapa_goundan_pudur'],
    18.0,
    44,
    20
  ),

  // 25. Route 27A: Gandhipuram ↔ Karadimadai
  makeCbeRoute(
    'route_cbe_27a',
    '27A',
    'Gandhipuram ↔ Karadimadai (via Town Hall, Perur, Madampatti, Karadimadai)',
    'காந்திபுரம் ↔ கரடிமடை (டவுன் ஹால், பேரூர், மாதம்பட்டி, கரடிமடை வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_karadimadai',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_town_hall', 'stop_cbe_perur_patteeswarar', 'stop_cbe_madampatti', 'stop_cbe_karadimadai'],
    20.0,
    48,
    20
  ),

  // 26. Route 32: Gandhipuram ↔ Madukkarai
  makeCbeRoute(
    'route_cbe_32',
    '32',
    'Gandhipuram ↔ Madukkarai (via Ukkadam, Sundarapuram, Malumichampatti, Madukkarai Market)',
    'காந்திபுரம் ↔ மதுக்கரை (உக்கடம், சுந்தராபுரம், மலுமிச்சம்பட்டி, மதுக்கரை மார்க்கெட் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_malumichampatti', 'stop_cbe_madukkarai_bs'],
    18.5,
    45,
    12
  ),

  // 27. Route 32G: Gandhipuram ↔ Seerapalayam
  makeCbeRoute(
    'route_cbe_32g',
    '32G',
    'Gandhipuram ↔ Seerapalayam (via Ukkadam, Sundarapuram, Malumichampatti, Seerapalayam)',
    'காந்திபுரம் ↔ சீராபாளையம் (உக்கடம், சுந்தராபுரம், மலுமிச்சம்பட்டி, சீராபாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_seerapalayam',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_malumichampatti', 'stop_cbe_seerapalayam'],
    19.0,
    46,
    15
  ),

  // 28. Route 33E: Gandhipuram ↔ Kinathukadavu
  makeCbeRoute(
    'route_cbe_33e',
    '33E',
    'Gandhipuram ↔ Kinathukadavu (via Ukkadam, Sundarapuram, Eachanari, Malumichampatti, Kinathukadavu)',
    'காந்திபுரம் ↔ கிணத்துக்கடவு (உக்கடம், சுந்தராபுரம், ஈச்சனாரி, மலுமிச்சம்பட்டி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kinathukadavu',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_eachanari_temple', 'stop_cbe_malumichampatti', 'stop_cbe_kinathukadavu'],
    28.0,
    60,
    15
  ),

  // 29. Route 35B: Gandhipuram ↔ Vadavalli
  makeCbeRoute(
    'route_cbe_35b',
    '35B',
    'Gandhipuram ↔ Vadavalli (via Cross Cut, Vadakovai, Lawley Road, Mullai Nagar, Vadavalli)',
    'காந்திபுரம் ↔ வடவள்ளி (கிராஸ் கட், வடகோவை, லாலி ரோடு, முல்லை நகர், வடவள்ளி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_vadavalli_bs',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_karpagam_complex', 'stop_cbe_vadakovai', 'stop_cbe_lawley_road', 'stop_cbe_mullai_nagar', 'stop_cbe_vadavalli_bs'],
    11.5,
    28,
    10
  ),

  // 30. Route 41A: Gandhipuram ↔ Annur
  makeCbeRoute(
    'route_cbe_41a',
    '41A',
    'Gandhipuram ↔ Annur (via Ganapathy, Saravanampatti, Kovilpalayam, Annur)',
    'காந்திபுரம் ↔ அன்னூர் (கணபதி, சரவணம்பட்டி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_annur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    31.5,
    65,
    12
  ),

  // 31. Route 41B: Gandhipuram ↔ Kempanaickenpalayam
  makeCbeRoute(
    'route_cbe_41b',
    '41B',
    'Gandhipuram ↔ Kempanaickenpalayam (via Ganapathy, Saravanampatti, Kovilpalayam, Annur, Kempanaickenpalayam)',
    'காந்திபுரம் ↔ கெம்பநாயக்கன்பாளையம் (கணபதி, சரவணம்பட்டி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kempanaickenpalayam',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur', 'stop_cbe_kempanaickenpalayam'],
    36.0,
    75,
    20
  ),

  // 32. Route 41D: Gandhipuram ↔ Kittampalayam
  makeCbeRoute(
    'route_cbe_41d',
    '41D',
    'Gandhipuram ↔ Kittampalayam (via Saravanampatti, Kovilpalayam, Annur, Kittampalayam)',
    'காந்திபுரம் ↔ கிட்டாம்பாளையம் (சரவணம்பட்டி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kittampalayam',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur', 'stop_cbe_kittampalayam'],
    33.5,
    68,
    20
  ),

  // 33. Route 41F: Gandhipuram ↔ Kommandampalayam
  makeCbeRoute(
    'route_cbe_41f',
    '41F',
    'Gandhipuram ↔ Kommandampalayam (via Ganapathy, Kovilpalayam, Annur, Kommandampalayam)',
    'காந்திபுரம் ↔ கொம்மண்டம்பாளையம் (கணபதி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kommandampalayam',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur', 'stop_cbe_kommandampalayam'],
    35.0,
    70,
    20
  ),

  // 34. Route 45: Gandhipuram ↔ Annur (via Sivanandha Mills)
  makeCbeRoute(
    'route_cbe_45',
    '45',
    'Gandhipuram ↔ Annur (via Ganapathy, Sivanandha Mills, Saravanampatti, Kovilpalayam, Annur)',
    'காந்திபுரம் ↔ அன்னூர் (கணபதி, சிவானந்தா மில்ஸ், சரவணம்பட்டி, கோவில்பாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_annur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_sivanandha_mills', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    31.5,
    65,
    10
  ),

  // 35. Route 45B: Gandhipuram ↔ Annur (via Kalapatti)
  makeCbeRoute(
    'route_cbe_45b',
    '45B',
    'Gandhipuram ↔ Annur (via Peelamedu, Kalapatti, Kovilpalayam, Annur)',
    'காந்திபுரம் ↔ அன்னூர் (பீளமேடு, காளப்பட்டி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_annur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_peelamedu_psg', 'stop_cbe_kalapatti', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    32.5,
    66,
    15
  ),

  // 36. Route 45C: Gandhipuram ↔ Idigarai
  makeCbeRoute(
    'route_cbe_45c',
    '45C',
    'Gandhipuram ↔ Idigarai (via Ganapathy, Saravanampatti, Idigarai)',
    'காந்திபுரம் ↔ இடிகரை (கணபதி, சரவணம்பட்டி, இடிகரை வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_idigarai',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_idigarai'],
    18.0,
    42,
    15
  ),

  // 37. Route 45D: Gandhipuram ↔ Press Colony
  makeCbeRoute(
    'route_cbe_45d',
    '45D',
    'Gandhipuram ↔ Press Colony (via Ganapathy, Saravanampatti, Press Colony)',
    'காந்திபுரம் ↔ பிரஸ் காலனி (கணபதி, சரவணம்பட்டி, பிரஸ் காலனி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_press_colony',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_press_colony'],
    22.0,
    50,
    20
  ),

  // 38. Route 45E: Gandhipuram ↔ Serayampalayam
  makeCbeRoute(
    'route_cbe_45e',
    '45E',
    'Gandhipuram ↔ Serayampalayam (via Ganapathy, Saravanampatti, Kalapatti, Serayampalayam)',
    'காந்திபுரம் ↔ சேரையாம்பாளையம் (கணபதி, சரவணம்பட்டி, காளப்பட்டி வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_serayampalayam',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kalapatti', 'stop_cbe_serayampalayam'],
    20.5,
    48,
    20
  ),

  // 39. Route 45G: Gandhipuram ↔ Sowripalayam
  makeCbeRoute(
    'route_cbe_45g',
    '45G',
    'Gandhipuram ↔ Sowripalayam (via Cross Cut, Lakshmi Mills, Puliakulam, Sowripalayam)',
    'காந்திபுரம் ↔ சௌரிபாளையம் (கிராஸ் கட், லக்ஷ்மி மில்ஸ், புலியகுளம், சௌரிபாளையம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_sowripalayam',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_puliakulam', 'stop_cbe_sowripalayam'],
    7.5,
    22,
    10
  ),

  // 40. Route 47: Gandhipuram ↔ Thondamuthur
  makeCbeRoute(
    'route_cbe_47',
    '47',
    'Gandhipuram ↔ Thondamuthur (via DB Road, Gandhi Park, Telungupalayam, Devarayapuram, Thondamuthur)',
    'காந்திபுரம் ↔ தொண்டாமுத்தூர் (டி.பி. ரோடு, காந்தி பார்க், தெலுங்குபாளையம், தேவராயபுரம் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_thondamuthur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_rs_puram', 'stop_cbe_gandhi_park_west', 'stop_cbe_telungupalayam', 'stop_cbe_devarayapuram', 'stop_cbe_thondamuthur'],
    20.0,
    48,
    12
  ),

  // 41. Route 47A: Gandhipuram ↔ Kembanur
  makeCbeRoute(
    'route_cbe_47a',
    '47A',
    'Gandhipuram ↔ Kembanur (via DB Road, Gandhi Park, Thondamuthur, Kembanur)',
    'காந்திபுரம் ↔ செம்பனூர் (டி.பி. ரோடு, காந்தி பார்க், தொண்டாமுத்தூர், கெம்பனூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_kembanur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_rs_puram', 'stop_cbe_gandhi_park_west', 'stop_cbe_thondamuthur', 'stop_cbe_kembanur'],
    22.5,
    52,
    15
  ),

  // 42. Route 48: Gandhipuram ↔ Narasimhanaickenpalayam
  makeCbeRoute(
    'route_cbe_48',
    '48',
    'Gandhipuram ↔ Narasimhanaickenpalayam (via Saibaba Colony, Kavundampalayam, Thudiyalur, Poochiyur)',
    'காந்திபுரம் ↔ நரசிம்மநாயக்கன்பாளையம் (சாய்பாபா காலனி, கவுண்டம்பாளையம், துடியலூர், பூச்சியூர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_poochiyur',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_kavundampalayam', 'stop_cbe_thudiyalur_bs', 'stop_cbe_poochiyur'],
    16.0,
    38,
    12
  ),

  // 43. Route 48B: Gandhipuram ↔ TVS Nagar
  makeCbeRoute(
    'route_cbe_48b',
    '48B',
    'Gandhipuram ↔ TVS Nagar (via Vadakovai, Saibaba Colony, TVS Nagar)',
    'காந்திபுரம் ↔ டிவிஎஸ் நகர் (வடகோவை, சாய்பாபா காலனி, டிவிஎஸ் நகர் வழி)',
    'stop_cbe_gandhipuram_bs',
    'stop_cbe_tvs_nagar',
    ['stop_cbe_gandhipuram_bs', 'stop_cbe_vadakovai', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_tvs_nagar'],
    8.5,
    22,
    10
  )
];
