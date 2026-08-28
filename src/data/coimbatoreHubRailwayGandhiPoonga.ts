import { BusRoute } from '../types';
import { makeCbeRoute } from './coimbatoreRoutesHelper';

export const RAILWAY_TOWNHALL_SAIBABA_ROUTES: BusRoute[] = [
  // 1. Route 5: Sivananda Colony ↔ Sivananda Colony (Circular)
  makeCbeRoute(
    'route_cbe_5',
    '5',
    'Sivananda Colony ↔ Sivananda Colony (via Vadakovai, DB Road, RS Puram, Flower Market, Railway Station, Gandhipuram)',
    'சிவானந்தா காலனி ↔ சிவானந்தா காலனி (வடகோவை, டி.பி. ரோடு, பூ மார்க்கெட், ரயில் நிலையம், காந்திபுரம் வழி)',
    'stop_cbe_sivananda_colony',
    'stop_cbe_sivananda_colony',
    ['stop_cbe_sivananda_colony', 'stop_cbe_vadakovai', 'stop_cbe_rs_puram', 'stop_cbe_town_hall', 'stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_sivananda_colony'],
    16.0,
    42,
    10
  ),

  // 2. Route 5C: Sivananda Colony ↔ Sivananda Colony (Reverse Circular)
  makeCbeRoute(
    'route_cbe_5c',
    '5C',
    'Sivananda Colony ↔ Sivananda Colony (via Gandhipuram, Railway Station, Flower Market, RS Puram, DB Road, Vadakovai)',
    'சிவானந்தா காலனி ↔ சிவானந்தா காலனி (காந்திபுரம், ரயில் நிலையம், பூ மார்க்கெட், ஆர்.எஸ். புரம், வடகோவை வழி)',
    'stop_cbe_sivananda_colony',
    'stop_cbe_sivananda_colony',
    ['stop_cbe_sivananda_colony', 'stop_cbe_gandhipuram_bs', 'stop_cbe_railway_station', 'stop_cbe_town_hall', 'stop_cbe_rs_puram', 'stop_cbe_vadakovai', 'stop_cbe_sivananda_colony'],
    16.0,
    42,
    10
  ),

  // 3. Route 7: Gandhi Poonga ↔ Gandhi Poonga (via Karupa Goundar St, Town Hall, Air India, Puliakulam, Thomas Park, DSP Office, Gandhipuram, Vadakovai, RS Puram)
  makeCbeRoute(
    'route_cbe_7',
    '7',
    'Gandhi Poonga ↔ Gandhi Poonga (via Karupa Goundar St, Town Hall, Air India, Puliakulam, Thomas Park, DSP Office, Gandhipuram, Vadakovai, RS Puram)',
    'காந்தி பூங்கா ↔ காந்தி பூங்கா (கருப்ப கவுண்டர் வீதி, டவுன் ஹால், ஏர் இந்தியா, புலியகுளம், தாமஸ் பார்க், காந்திபுரம், வடகோவை வழி)',
    'stop_cbe_gandhi_poonga',
    'stop_cbe_gandhi_poonga',
    ['stop_cbe_gandhi_poonga', 'stop_cbe_karupa_goundar_street', 'stop_cbe_town_hall', 'stop_cbe_air_india', 'stop_cbe_puliakulam', 'stop_cbe_thomas_park', 'stop_cbe_dsp_office', 'stop_cbe_gandhipuram_bs', 'stop_cbe_karpagam_complex', 'stop_cbe_vadakovai', 'stop_cbe_rs_puram', 'stop_cbe_gandhi_poonga'],
    18.5,
    48,
    12
  ),

  // 4. Route 7A: Gandhi Poonga ↔ Gandhi Poonga (via Railway Station, Gandhipuram, Vadakovai, RS Puram)
  makeCbeRoute(
    'route_cbe_7a',
    '7A',
    'Gandhi Poonga ↔ Gandhi Poonga (via Karupa Goundar St, Town Hall, Railway Station, Gandhipuram, Karpagam Complex, Vadakovai, RS Puram)',
    'காந்தி பூங்கா ↔ காந்தி பூங்கா (டவுன் ஹால், ரயில் நிலையம், காந்திபுரம், வடகோவை, ஆர்.எஸ். புரம் வழி)',
    'stop_cbe_gandhi_poonga',
    'stop_cbe_gandhi_poonga',
    ['stop_cbe_gandhi_poonga', 'stop_cbe_karupa_goundar_street', 'stop_cbe_town_hall', 'stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_karpagam_complex', 'stop_cbe_vadakovai', 'stop_cbe_rs_puram', 'stop_cbe_gandhi_poonga'],
    17.0,
    44,
    15
  ),

  // 5. Route 7C: Gandhi Poonga ↔ Gandhi Poonga (Reverse Loop: RS Puram, Vadakovai, Gandhipuram, Thomas Park, Puliakulam, Town Hall)
  makeCbeRoute(
    'route_cbe_7c',
    '7C',
    'Gandhi Poonga ↔ Gandhi Poonga (via RS Puram, Vadakovai, Gandhipuram, DSP Office, Thomas Park, Puliakulam, Air India, Town Hall)',
    'காந்தி பூங்கா ↔ காந்தி பூங்கா (ஆர்.எஸ். புரம், வடகோவை, காந்திபுரம், தாமஸ் பார்க், புலியகுளம், டவுன் ஹால் வழி)',
    'stop_cbe_gandhi_poonga',
    'stop_cbe_gandhi_poonga',
    ['stop_cbe_gandhi_poonga', 'stop_cbe_rs_puram', 'stop_cbe_vadakovai', 'stop_cbe_karpagam_complex', 'stop_cbe_gandhipuram_bs', 'stop_cbe_dsp_office', 'stop_cbe_thomas_park', 'stop_cbe_puliakulam', 'stop_cbe_air_india', 'stop_cbe_town_hall', 'stop_cbe_karupa_goundar_street', 'stop_cbe_gandhi_poonga'],
    18.5,
    48,
    12
  ),

  // 6. Route 11: Railway Station ↔ Annur
  makeCbeRoute(
    'route_cbe_11',
    '11',
    'Railway Station ↔ Annur (via Gandhipuram, Ganapathy, Saravanampatti, Kovilpalayam, Annur)',
    'ரயில் நிலையம் ↔ அன்னூர் (காந்திபுரம், கணபதி, சரவணம்பட்டி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_annur',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    34.0,
    70,
    10
  ),

  // 7. Route 11B: Railway Station ↔ Annur (via Town Hall)
  makeCbeRoute(
    'route_cbe_11b',
    '11B',
    'Railway Station ↔ Annur (via Town Hall, Gandhipuram, Ganapathy, Kovilpalayam, Annur)',
    'ரயில் நிலையம் ↔ அன்னூர் (டவுன் ஹால், காந்திபுரம், கணபதி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_annur',
    ['stop_cbe_railway_station', 'stop_cbe_town_hall', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    35.0,
    72,
    15
  ),

  // 8. Route 11D: Railway Station ↔ Idigarai
  makeCbeRoute(
    'route_cbe_11d',
    '11D',
    'Railway Station ↔ Idigarai (via Gandhipuram, Ganapathy, Saravanampatti, Idigarai)',
    'ரயில் நிலையம் ↔ இடிகரை (காந்திபுரம், கணபதி, சரவணம்பட்டி, இடிகரை வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_idigarai',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_idigarai'],
    20.5,
    46,
    15
  ),

  // 9. Route 11E: Railway Station ↔ Press Colony
  makeCbeRoute(
    'route_cbe_11e',
    '11E',
    'Railway Station ↔ Press Colony (via Gandhipuram, Ganapathy, Saravanampatti, Press Colony)',
    'ரயில் நிலையம் ↔ பிரஸ் காலனி (காந்திபுரம், கணபதி, சரவணம்பட்டி, பிரஸ் காலனி வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_press_colony',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_press_colony'],
    24.5,
    55,
    20
  ),

  // 10. Route 11F: Railway Station ↔ Serayampalayam
  makeCbeRoute(
    'route_cbe_11f',
    '11F',
    'Railway Station ↔ Serayampalayam (via Gandhipuram, Ganapathy, Kalapatti, Serayampalayam)',
    'ரயில் நிலையம் ↔ சேரையாம்பாளையம் (காந்திபுரம், கணபதி, காளப்பட்டி வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_serayampalayam',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_kalapatti', 'stop_cbe_serayampalayam'],
    23.0,
    52,
    20
  ),

  // 11. Route 11H: Railway Station ↔ Vellamadai
  makeCbeRoute(
    'route_cbe_11h',
    '11H',
    'Railway Station ↔ Vellamadai (via Gandhipuram, Ganapathy, Saravanampatti, Kovilpalayam, Vellamadai)',
    'ரயில் நிலையம் ↔ வெள்ளமடை (காந்திபுரம், கணபதி, சரவணம்பட்டி, கோவில்பாளையம் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_vellamadai',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_vellamadai'],
    24.5,
    56,
    15
  ),

  // 12. Route 11K: Railway Station ↔ Kovanur
  makeCbeRoute(
    'route_cbe_11k',
    '11K',
    'Railway Station ↔ Kovanur (via Gandhipuram, Ganapathy, Saravanampatti, Kovilpalayam, Vellamadai, Kovanur)',
    'ரயில் நிலையம் ↔ கோவனூர் (காந்திபுரம், கணபதி, சரவணம்பட்டி, கோவில்பாளையம், கோவனூர் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_kovanur',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_vellamadai', 'stop_cbe_kovanur'],
    28.0,
    62,
    20
  ),

  // 13. Route 12E: Railway Station ↔ Vadavalli
  makeCbeRoute(
    'route_cbe_12e',
    '12E',
    'Railway Station ↔ Vadavalli (via DB Road, Lawley Road, Mullai Nagar, Vadavalli)',
    'ரயில் நிலையம் ↔ வடவள்ளி (டி.பி. ரோடு, லாலி ரோடு, முல்லை நகர், வடவள்ளி வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_vadavalli_bs',
    ['stop_cbe_railway_station', 'stop_cbe_rs_puram', 'stop_cbe_lawley_road', 'stop_cbe_mullai_nagar', 'stop_cbe_vadavalli_bs'],
    11.0,
    28,
    10
  ),

  // 14. Route 12F: Railway Station ↔ Maruthamalai
  makeCbeRoute(
    'route_cbe_12f',
    '12F',
    'Railway Station ↔ Maruthamalai (via DB Road, Lawley Road, Vadavalli, Maruthamalai Temple)',
    'ரயில் நிலையம் ↔ மருதமலை (டி.பி. ரோடு, லாலி ரோடு, வடவள்ளி, மருதமலை கோவில் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_marudhamalai',
    ['stop_cbe_railway_station', 'stop_cbe_rs_puram', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs', 'stop_cbe_mullai_nagar', 'stop_cbe_marudhamalai'],
    16.5,
    40,
    10
  ),

  // 15. Route 12H: Railway Station ↔ Karunya Nagar
  makeCbeRoute(
    'route_cbe_12h',
    '12H',
    'Railway Station ↔ Karunya Nagar (via Town Hall, Perur, Alandurai, Karunya Nagar / Nallur Vayal)',
    'ரயில் நிலையம் ↔ காருண்யா நகர் (டவுன் ஹால், பேரூர், ஆலந்துறை, நல்லூர் வயல் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_nallur_vayal',
    ['stop_cbe_railway_station', 'stop_cbe_town_hall', 'stop_cbe_perur_patteeswarar', 'stop_cbe_madampatti', 'stop_cbe_alandurai', 'stop_cbe_nallur_vayal'],
    30.0,
    65,
    15
  ),

  // 16. Route 13A: Railway Station ↔ Thondamuthur
  makeCbeRoute(
    'route_cbe_13a',
    '13A',
    'Railway Station ↔ Thondamuthur (via DB Road, Gandhi Park, Telungupalayam, Thondamuthur)',
    'ரயில் நிலையம் ↔ தொண்டாமுத்தூர் (டி.பி. ரோடு, காந்தி பார்க், தெலுங்குபாளையம், தொண்டாமுத்தூர் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_thondamuthur',
    ['stop_cbe_railway_station', 'stop_cbe_rs_puram', 'stop_cbe_gandhi_park_west', 'stop_cbe_telungupalayam', 'stop_cbe_thondamuthur'],
    18.5,
    44,
    15
  ),

  // 17. Route 22: Railway Station ↔ Sulur
  makeCbeRoute(
    'route_cbe_22',
    '22',
    'Railway Station ↔ Sulur (via Sungam, Ramanathapuram, Singanallur, Ondipudur, Sulur)',
    'ரயில் நிலையம் ↔ சூலூர் (சுங்கம், ராமநாதபுரம், சிங்கநல்லூர், ஒண்டிப்புதூர், சூலூர் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_sulur_bs',
    ['stop_cbe_railway_station', 'stop_cbe_sungam', 'stop_cbe_ramanathapuram', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_chinthamanipudur', 'stop_cbe_sulur_bs'],
    21.5,
    50,
    10
  ),

  // 18. Route 27: Railway Station ↔ Siruvani / Sadivayal
  makeCbeRoute(
    'route_cbe_27',
    '27',
    'Railway Station ↔ Sadivayal / Siruvani (via Town Hall, Perur, Madampatti, Alandurai, Sadivayal)',
    'ரயில் நிலையம் ↔ சாடிவயல் / சிறுவாணி (டவுன் ஹால், பேரூர், மாதம்பட்டி, ஆலந்துறை வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_sadivayal',
    ['stop_cbe_railway_station', 'stop_cbe_town_hall', 'stop_cbe_perur_patteeswarar', 'stop_cbe_madampatti', 'stop_cbe_alandurai', 'stop_cbe_sadivayal'],
    35.0,
    74,
    15
  ),

  // 19. Route 30A: Railway Station ↔ Somanur
  makeCbeRoute(
    'route_cbe_30a',
    '30A',
    'Railway Station ↔ Somanur (via Singanallur, Ondipudur, Sulur, Somanur)',
    'ரயில் நிலையம் ↔ சோமனூர் (சிங்கநல்லூர், ஒண்டிப்புதூர், சூலூர், சோமனூர் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_somanur',
    ['stop_cbe_railway_station', 'stop_cbe_sungam', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_sulur_bs', 'stop_cbe_somanur'],
    32.5,
    72,
    15
  ),

  // 20. Route 30F: Railway Station ↔ Kannampalayam
  makeCbeRoute(
    'route_cbe_30f',
    '30F',
    'Railway Station ↔ Kannampalayam (via Singanallur, Ondipudur, Kannampalayam)',
    'ரயில் நிலையம் ↔ கண்ணம்பாளையம் (சிங்கநல்லூர், ஒண்டிப்புதூர், கண்ணம்பாளையம் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_kannampalayam_town',
    ['stop_cbe_railway_station', 'stop_cbe_sungam', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_kannampalayam_town'],
    20.0,
    46,
    15
  ),

  // 21. Route 32A: Railway Station ↔ Madukkarai
  makeCbeRoute(
    'route_cbe_32a',
    '32A',
    'Railway Station ↔ Madukkarai (via Ukkadam, Sundarapuram, Madukkarai)',
    'ரயில் நிலையம் ↔ மதுக்கரை (உக்கடம், சுந்தராபுரம், மதுக்கரை வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_railway_station', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_madukkarai_bs'],
    16.5,
    40,
    12
  ),

  // 22. Route 33A: Railway Station ↔ Kinathukadavu
  makeCbeRoute(
    'route_cbe_33a',
    '33A',
    'Railway Station ↔ Kinathukadavu (via Ukkadam, Sundarapuram, Eachanari, Kinathukadavu)',
    'ரயில் நிலையம் ↔ கிணத்துக்கடவு (உக்கடம், சுந்தராபுரம், ஈச்சனாரி, கிணத்துக்கடவு வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_kinathukadavu',
    ['stop_cbe_railway_station', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_eachanari_temple', 'stop_cbe_kinathukadavu'],
    26.5,
    58,
    15
  ),

  // 23. Route 33D: Railway Station ↔ Malumichampatti
  makeCbeRoute(
    'route_cbe_33d',
    '33D',
    'Railway Station ↔ Malumichampatti (via Ukkadam, Sundarapuram, Malumichampatti)',
    'ரயில் நிலையம் ↔ மலுமிச்சம்பட்டி (உக்கடம், சுந்தராபுரம், மலுமிச்சம்பட்டி வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_malumichampatti',
    ['stop_cbe_railway_station', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_malumichampatti'],
    15.0,
    36,
    15
  ),

  // 24. Route 42A: Railway Station ↔ Saravanampatti
  makeCbeRoute(
    'route_cbe_42a',
    '42A',
    'Railway Station ↔ Saravanampatti (via Gandhipuram, Ganapathy, Saravanampatti)',
    'ரயில் நிலையம் ↔ சரவணம்பட்டி (காந்திபுரம், கணபதி, சரவணம்பட்டி வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_saravanampatti_bs',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs'],
    15.0,
    36,
    10
  ),

  // 25. Route 44: Railway Station ↔ Cheran Maa Nagar
  makeCbeRoute(
    'route_cbe_44',
    '44',
    'Railway Station ↔ Cheran Maa Nagar (via Gandhipuram, Ganapathy, Cheran Maa Nagar)',
    'ரயில் நிலையம் ↔ சேரன் மா நகர் (காந்திபுரம், கணபதி, சேரன் மா நகர் வழி)',
    'stop_cbe_railway_station',
    'stop_cbe_cheran_maa_nagar',
    ['stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_cheran_maa_nagar'],
    14.0,
    34,
    12
  ),

  // 26. Route 4: Saibaba Colony ↔ Ukkadam
  makeCbeRoute(
    'route_cbe_4',
    '4',
    'Saibaba Colony ↔ Ukkadam (via Vadakovai, Flower Market, Town Hall, Ukkadam)',
    'சாய்பாபா காலனி ↔ உக்கடம் (வடகோவை, பூ மார்க்கெட், டவுன் ஹால், உக்கடம் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_ukkadam_bs',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_town_hall', 'stop_cbe_ukkadam_bs'],
    7.5,
    20,
    8
  ),

  // 27. Route 4C: Saibaba Colony ↔ Madukkarai
  makeCbeRoute(
    'route_cbe_4c',
    '4C',
    'Saibaba Colony ↔ Madukkarai (via Vadakovai, Town Hall, Ukkadam, Sundarapuram, Madukkarai)',
    'சாய்பாபா காலனி ↔ மதுக்கரை (வடகோவை, டவுன் ஹால், உக்கடம், சுந்தராபுரம் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_town_hall', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_madukkarai_bs'],
    21.5,
    52,
    15
  ),

  // 28. Route 4H: Saibaba Colony ↔ Kinathukadavu
  makeCbeRoute(
    'route_cbe_4h',
    '4H',
    'Saibaba Colony ↔ Kinathukadavu (via Vadakovai, Ukkadam, Sundarapuram, Eachanari, Kinathukadavu)',
    'சாய்பாபா காலனி ↔ கிணத்துக்கடவு (வடகோவை, உக்கடம், சுந்தராபுரம், ஈச்சனாரி வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_kinathukadavu',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_eachanari_temple', 'stop_cbe_kinathukadavu'],
    31.5,
    68,
    15
  ),

  // 29. Route 4K: Saibaba Colony ↔ Malumichampatti
  makeCbeRoute(
    'route_cbe_4k',
    '4K',
    'Saibaba Colony ↔ Malumichampatti (via Town Hall, Ukkadam, Sundarapuram, Malumichampatti)',
    'சாய்பாபா காலனி ↔ மலுமிச்சம்பட்டி (டவுன் ஹால், உக்கடம், சுந்தராபுரம் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_malumichampatti',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_town_hall', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_malumichampatti'],
    20.0,
    48,
    15
  ),

  // 30. Route 4M: Saibaba Colony ↔ Seerapalayam
  makeCbeRoute(
    'route_cbe_4m',
    '4M',
    'Saibaba Colony ↔ Seerapalayam (via Vadakovai, Ukkadam, Sundarapuram, Seerapalayam)',
    'சாய்பாபா காலனி ↔ சீராபாளையம் (வடகோவை, உக்கடம், சுந்தராபுரம் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_seerapalayam',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_seerapalayam'],
    21.0,
    50,
    20
  ),

  // 31. Route 10B: Saibaba Colony ↔ Singanallur
  makeCbeRoute(
    'route_cbe_10b',
    '10B',
    'Saibaba Colony ↔ Singanallur (via Vadakovai, Gandhipuram, Lakshmi Mills, Singanallur)',
    'சாய்பாபா காலனி ↔ சிங்கநல்லூர் (வடகோவை, காந்திபுரம், லக்ஷ்மி மில்ஸ் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_singanallur_bs',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_gandhipuram_bs', 'stop_cbe_lakshmi_mills', 'stop_cbe_singanallur_bs'],
    14.5,
    36,
    10
  ),

  // 32. Route 10C: Saibaba Colony ↔ Ondipudur
  makeCbeRoute(
    'route_cbe_10c',
    '10C',
    'Saibaba Colony ↔ Ondipudur (via Vadakovai, Gandhipuram, Singanallur, Ondipudur)',
    'சாய்பாபா காலனி ↔ ஒண்டிப்புதூர் (வடகோவை, காந்திபுரம், சிங்கநல்லூர் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_ondipudur_bs',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_gandhipuram_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs'],
    16.5,
    42,
    12
  ),

  // 33. Route 16: Saibaba Colony ↔ Sulur
  makeCbeRoute(
    'route_cbe_16',
    '16',
    'Saibaba Colony ↔ Sulur (via Vadakovai, Gandhipuram, Singanallur, Ondipudur, Sulur)',
    'சாய்பாபா காலனி ↔ சூலூர் (வடகோவை, காந்திபுரம், சிங்கநல்லூர், ஒண்டிப்புதூர் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_sulur_bs',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_vadakovai', 'stop_cbe_gandhipuram_bs', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_sulur_bs'],
    25.5,
    58,
    12
  ),

  // 34. Route 19A: Saibaba Colony ↔ Kovai Kondattam
  makeCbeRoute(
    'route_cbe_19a',
    '19A',
    'Saibaba Colony ↔ Kovai Kondattam (via Lawley Road, Perur, Kovai Kondattam)',
    'சாய்பாபா காலனி ↔ கோவை கொண்டாட்டம் (லாலி ரோடு, பேரூர் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_kovai_kondattam',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_lawley_road', 'stop_cbe_perur_patteeswarar', 'stop_cbe_kovai_kondattam'],
    14.0,
    34,
    15
  ),

  // 35. Route 20: Saibaba Colony ↔ Saravanampatti
  makeCbeRoute(
    'route_cbe_20',
    '20',
    'Saibaba Colony ↔ Saravanampatti (via Sivananda Colony, Ganapathy, Saravanampatti)',
    'சாய்பாபா காலனி ↔ சரவணம்பட்டி (சிவானந்தா காலனி, கணபதி வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_saravanampatti_bs',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_sivananda_colony', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs'],
    13.0,
    32,
    10
  ),

  // 36. Route 20A: Saibaba Colony ↔ Cheran Maa Nagar
  makeCbeRoute(
    'route_cbe_20a',
    '20A',
    'Saibaba Colony ↔ Cheran Maa Nagar (via Sivananda Colony, Ganapathy, Cheran Maa Nagar)',
    'சாய்பாபா காலனி ↔ சேரன் மா நகர் (சிவானந்தா காலனி, கணபதி வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_cheran_maa_nagar',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_sivananda_colony', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_cheran_maa_nagar'],
    12.0,
    28,
    12
  ),

  // 37. Route 20B: Saibaba Colony ↔ Vilankurichi
  makeCbeRoute(
    'route_cbe_20b',
    '20B',
    'Saibaba Colony ↔ Vilankurichi (via Sivananda Colony, Ganapathy, Vilankurichi)',
    'சாய்பாபா காலனி ↔ விளாங்குறிச்சி (சிவானந்தா காலனி, கணபதி வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_vilankurichi',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_sivananda_colony', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_vilankurichi'],
    13.5,
    32,
    15
  ),

  // 38. Route 20C: Saibaba Colony ↔ Annur
  makeCbeRoute(
    'route_cbe_20c',
    '20C',
    'Saibaba Colony ↔ Annur (via Sivananda Colony, Ganapathy, Saravanampatti, Kovilpalayam, Annur)',
    'சாய்பாபா காலனி ↔ அன்னூர் (சிவானந்தா காலனி, கணபதி, சரவணம்பட்டி, கோவில்பாளையம் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_annur',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_sivananda_colony', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    32.0,
    66,
    15
  ),

  // 39. Route 38A: Saibaba Colony ↔ Vadavalli
  makeCbeRoute(
    'route_cbe_38a',
    '38A',
    'Saibaba Colony ↔ Vadavalli (via Bharathi Park, Lawley Road, Vadavalli)',
    'சாய்பாபா காலனி ↔ வடவள்ளி (பாரதி பார்க், லாலி ரோடு, வடவள்ளி வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_vadavalli_bs',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs'],
    8.0,
    20,
    10
  ),

  // 40. Route 39: Saibaba Colony ↔ Maruthamalai
  makeCbeRoute(
    'route_cbe_39',
    '39',
    'Saibaba Colony ↔ Maruthamalai (via Lawley Road, Mullai Nagar, Vadavalli, Maruthamalai)',
    'சாய்பாபா காலனி ↔ மருதமலை (லாலி ரோடு, முல்லை நகர், வடவள்ளி வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_marudhamalai',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs', 'stop_cbe_mullai_nagar', 'stop_cbe_marudhamalai'],
    14.5,
    36,
    10
  ),

  // 41. Route 39A: Saibaba Colony ↔ Karunya Nagar
  makeCbeRoute(
    'route_cbe_39a',
    '39A',
    'Saibaba Colony ↔ Karunya Nagar (via Lawley Road, Perur, Madampatti, Karunya Nagar)',
    'சாய்பாபா காலனி ↔ காருண்யா நகர் (லாலி ரோடு, பேரூர், மாதம்பட்டி வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_nallur_vayal',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_lawley_road', 'stop_cbe_perur_patteeswarar', 'stop_cbe_madampatti', 'stop_cbe_nallur_vayal'],
    28.0,
    62,
    15
  ),

  // 42. Route 40: Saibaba Colony ↔ Thondamuthur
  makeCbeRoute(
    'route_cbe_40',
    '40',
    'Saibaba Colony ↔ Thondamuthur (via Lawley Road, Gandhi Park, Thondamuthur)',
    'சாய்பாபா காலனி ↔ தொண்டாமுத்தூர் (லாலி ரோடு, காந்தி பார்க், தொண்டாமுத்தூர் வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_thondamuthur',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_lawley_road', 'stop_cbe_gandhi_park_west', 'stop_cbe_thondamuthur'],
    16.5,
    40,
    15
  ),

  // 43. Route 43: Saibaba Colony ↔ Sadivayal / Siruvani
  makeCbeRoute(
    'route_cbe_43',
    '43',
    'Saibaba Colony ↔ Sadivayal / Siruvani (via Lawley Road, Perur, Alandurai, Sadivayal)',
    'சாய்பாபா காலனி ↔ சாடிவயல் / சிறுவாணி (லாலி ரோடு, பேரூர், ஆலந்துறை வழி)',
    'stop_cbe_saibaba_colony_bs',
    'stop_cbe_sadivayal',
    ['stop_cbe_saibaba_colony_bs', 'stop_cbe_lawley_road', 'stop_cbe_perur_patteeswarar', 'stop_cbe_alandurai', 'stop_cbe_sadivayal'],
    32.0,
    68,
    15
  )
];
