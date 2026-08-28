import { BusRoute } from '../types';
import { makeCbeRoute } from './coimbatoreRoutesHelper';

export const UKKADAM_HUB_ROUTES: BusRoute[] = [
  // 1. Route 102B: Ukkadam ↔ Velanthavalam
  makeCbeRoute(
    'route_cbe_102b',
    '102B',
    'Ukkadam ↔ Velanthavalam (via Kovaipudur, Thirumalayampalayam, KG Chavadi, Velanthavalam)',
    'உக்கடம் ↔ வேலந்தாவளம் (கோவைபுதூர், திருமலையம்பாளையம், கே.ஜி. சாவடி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_velanthavalam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kuniyamuthur', 'stop_cbe_kovaipudur_junction', 'stop_cbe_thirumalayampalayam', 'stop_cbe_kg_chavadi', 'stop_cbe_velanthavalam'],
    28.0,
    62,
    15
  ),

  // 2. Route 122: Ukkadam ↔ Madukkarai (via Kurichi SIDCO)
  makeCbeRoute(
    'route_cbe_122',
    '122',
    'Ukkadam ↔ Madukkarai (via Kurichi Housing Unit, SIDCO, Madukkarai)',
    'உக்கடம் ↔ மதுக்கரை (குறிச்சி ஹவுசிங் யூனிட், சிட்கோ, மதுக்கரை வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kurichi_housing_unit', 'stop_cbe_sidco', 'stop_cbe_madukkarai_bs'],
    14.5,
    35,
    12
  ),

  // 3. Route 122C: Ukkadam ↔ Madukkarai (via Sundarapuram, SIDCO)
  makeCbeRoute(
    'route_cbe_122c',
    '122C',
    'Ukkadam ↔ Madukkarai (via Sundarapuram, SIDCO, Madukkarai Market)',
    'உக்கடம் ↔ மதுக்கரை (சுந்தராபுரம், சிட்கோ, மதுக்கரை மார்க்கெட் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_sidco', 'stop_cbe_madukkarai_bs'],
    15.0,
    36,
    15
  ),

  // 4. Route 135: Ukkadam ↔ Nallampalayam (via DB Road, Saibaba Colony)
  makeCbeRoute(
    'route_cbe_135',
    '135',
    'Ukkadam ↔ Nallampalayam (via DB Road, Flower Market, Saibaba Colony, Srinivasa Nagar, Nallampalayam)',
    'உக்கடம் ↔ நல்லாம்பாளையம் (டி.பி. ரோடு, பூ மார்க்கெட், சாய்பாபா காலனி, நல்லாம்பாளையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_nallampalayam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_rs_puram', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_srinivasa_nagar', 'stop_cbe_nallampalayam'],
    11.5,
    30,
    15
  ),

  // 5. Route 135C: Ukkadam ↔ Nallampalayam (via MTP Road)
  makeCbeRoute(
    'route_cbe_135c',
    '135C',
    'Ukkadam ↔ Nallampalayam (via Vadakovai, MTP Road, Kavundampalayam, Nallampalayam)',
    'உக்கடம் ↔ நல்லாம்பாளையம் (வடகோவை, மேட்டுப்பாளையம் ரோடு, கவுண்டம்பாளையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_nallampalayam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_vadakovai', 'stop_cbe_kavundampalayam', 'stop_cbe_nallampalayam'],
    12.0,
    32,
    15
  ),

  // 6. Route 3: Ukkadam ↔ Madukkarai
  makeCbeRoute(
    'route_cbe_3',
    '3',
    'Ukkadam ↔ Madukkarai (via Sundarapuram, Malumichampatti, Madukkarai Market)',
    'உக்கடம் ↔ மதுக்கரை (சுந்தராபுரம், மலுமிச்சம்பட்டி, மதுக்கரை மார்க்கெட் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_malumichampatti', 'stop_cbe_madukkarai_bs'],
    15.5,
    38,
    10
  ),

  // 7. Route 3A: Ukkadam ↔ Thirumalayampalayam
  makeCbeRoute(
    'route_cbe_3a',
    '3A',
    'Ukkadam ↔ Thirumalayampalayam (via Sundarapuram, Malumichampatti, Thirumalayampalayam)',
    'உக்கடம் ↔ திருமலையம்பாளையம் (சுந்தராபுரம், மலுமிச்சம்பட்டி, திருமலையம்பாளையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_thirumalayampalayam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_malumichampatti', 'stop_cbe_thirumalayampalayam'],
    18.5,
    44,
    15
  ),

  // 8. Route 3C: Ukkadam ↔ KG Chavadi
  makeCbeRoute(
    'route_cbe_3c',
    '3C',
    'Ukkadam ↔ KG Chavadi (via Kuniamuthur, Kovaipudur Pirivu, Thirumalayampalayam, KG Chavadi)',
    'உக்கடம் ↔ கே.ஜி. சாவடி (குனியமுத்தூர், கோவைபுதூர் பிரிவு, கே.ஜி. சாவடி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_kg_chavadi',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kuniyamuthur', 'stop_cbe_kovaipudur_junction', 'stop_cbe_thirumalayampalayam', 'stop_cbe_kg_chavadi'],
    22.5,
    50,
    15
  ),

  // 9. Route 3D: Ukkadam ↔ Velanthavalam
  makeCbeRoute(
    'route_cbe_3d',
    '3D',
    'Ukkadam ↔ Velanthavalam (via Sundarapuram, SIDCO, KG Chavadi, Velanthavalam)',
    'உக்கடம் ↔ வேலந்தாவளம் (சுந்தராபுரம், சிட்கோ, கே.ஜி. சாவடி, வேலந்தாவளம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_velanthavalam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_sidco', 'stop_cbe_kg_chavadi', 'stop_cbe_velanthavalam'],
    26.0,
    58,
    20
  ),

  // 10. Route 3E: Ukkadam ↔ Walayar Checkpost
  makeCbeRoute(
    'route_cbe_3e',
    '3E',
    'Ukkadam ↔ Walayar Checkpost (via Kuniamuthur, Ettimadai, Walayar Border)',
    'உக்கடம் ↔ வாலையார் சோதனைச் சாவடி (குனியமுத்தூர், எட்டிமடை, வாலையார் எல்லை வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_walayar',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kuniyamuthur', 'stop_cbe_ettimadai', 'stop_cbe_walayar'],
    25.0,
    55,
    15
  ),

  // 11. Route 3F: Ukkadam ↔ Ettimadai (Amrita University)
  makeCbeRoute(
    'route_cbe_3f',
    '3F',
    'Ukkadam ↔ Ettimadai (via Kuniamuthur, Kovaipudur Pirivu, Amrita University, Ettimadai)',
    'உக்கடம் ↔ எட்டிமடை (குனியமுத்தூர், கோவைபுதூர் பிரிவு, அம்ரிதா பல்கலைக்கழகம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_ettimadai',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kuniyamuthur', 'stop_cbe_kovaipudur_junction', 'stop_cbe_ettimadai'],
    19.0,
    44,
    12
  ),

  // 12. Route 3G: Ukkadam ↔ Madukkarai (via Eachanari)
  makeCbeRoute(
    'route_cbe_3g',
    '3G',
    'Ukkadam ↔ Madukkarai (via Sundarapuram, Eachanari Temple, Madukkarai)',
    'உக்கடம் ↔ மதுக்கரை (சுந்தராபுரம், ஈச்சனாரி கோவில், மதுக்கரை வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_eachanari_temple', 'stop_cbe_madukkarai_bs'],
    15.0,
    36,
    15
  ),

  // 13. Route 3H: Ukkadam ↔ Malumichampatti
  makeCbeRoute(
    'route_cbe_3h',
    '3H',
    'Ukkadam ↔ Malumichampatti (via Sundarapuram, SIDCO, Malumichampatti)',
    'உக்கடம் ↔ மலுமிச்சம்பட்டி (சுந்தராபுரம், சிட்கோ, மலுமிச்சம்பட்டி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_malumichampatti',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_sidco', 'stop_cbe_malumichampatti'],
    13.5,
    32,
    15
  ),

  // 14. Route 3K: Ukkadam ↔ Kinathukadavu
  makeCbeRoute(
    'route_cbe_3k',
    '3K',
    'Ukkadam ↔ Kinathukadavu (via Sundarapuram, Eachanari, Malumichampatti, Kinathukadavu)',
    'உக்கடம் ↔ கிணத்துக்கடவு (சுந்தராபுரம், ஈச்சனாரி, மலுமிச்சம்பட்டி, கிணத்துக்கடவு வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_kinathukadavu',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_eachanari_temple', 'stop_cbe_malumichampatti', 'stop_cbe_kinathukadavu'],
    25.0,
    55,
    12
  ),

  // 15. Route 3M: Ukkadam ↔ Seerapalayam
  makeCbeRoute(
    'route_cbe_3m',
    '3M',
    'Ukkadam ↔ Seerapalayam (via Sundarapuram, Malumichampatti, Seerapalayam)',
    'உக்கடம் ↔ சீராபாளையம் (சுந்தராபுரம், மலுமிச்சம்பட்டி, சீராபாளையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_seerapalayam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_malumichampatti', 'stop_cbe_seerapalayam'],
    16.0,
    38,
    15
  ),

  // 16. Route 3N: Ukkadam ↔ Madukkarai (via Kuniamuthur)
  makeCbeRoute(
    'route_cbe_3n',
    '3N',
    'Ukkadam ↔ Madukkarai (via Kuniamuthur, Palakkad Road, Madukkarai)',
    'உக்கடம் ↔ மதுக்கரை (குனியமுத்தூர், பாலக்காடு ரோடு, மதுக்கரை வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_madukkarai_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kuniyamuthur', 'stop_cbe_madukkarai_bs'],
    14.0,
    34,
    15
  ),

  // 17. Route 3R: Ukkadam ↔ Thirumalayampalayam
  makeCbeRoute(
    'route_cbe_3r',
    '3R',
    'Ukkadam ↔ Thirumalayampalayam (via Sundarapuram, Eachanari, Thirumalayampalayam)',
    'உக்கடம் ↔ திருமலையம்பாளையம் (சுந்தராபுரம், ஈச்சனாரி, திருமலையம்பாளையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_thirumalayampalayam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundarapuram', 'stop_cbe_eachanari_temple', 'stop_cbe_thirumalayampalayam'],
    18.0,
    42,
    20
  ),

  // 18. Route 3S: Ukkadam ↔ SIDCO
  makeCbeRoute(
    'route_cbe_3s',
    '3S',
    'Ukkadam ↔ SIDCO (via Kurichi Housing Unit, SIDCO Industrial Estate)',
    'உக்கடம் ↔ சிட்கோ (குறிச்சி ஹவுசிங் யூனிட், சிட்கோ தொழிற்பேட்டை வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_sidco',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kurichi_housing_unit', 'stop_cbe_sidco'],
    9.0,
    22,
    15
  ),

  // 19. Route 4D: Ukkadam ↔ Thudiyalur
  makeCbeRoute(
    'route_cbe_4d',
    '4D',
    'Ukkadam ↔ Thudiyalur (via Town Hall, Vadakovai, Saibaba Colony, Vijayalakshmi Mills, Thudiyalur)',
    'உக்கடம் ↔ துடியலூர் (டவுன் ஹால், வடகோவை, சாய்பாபா காலனி, விஜயலட்சுமி மில்ஸ் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_thudiyalur_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_vadakovai', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_vijayalakshmi_mills', 'stop_cbe_thudiyalur_bs'],
    15.0,
    38,
    10
  ),

  // 20. Route 4N: Ukkadam ↔ Palani Gounden Pudur
  makeCbeRoute(
    'route_cbe_4n',
    '4N',
    'Ukkadam ↔ Palani Gounden Pudur (via Vadakovai, Saibaba Colony, Thudiyalur, PG Pudur)',
    'உக்கடம் ↔ பழனி கவுண்டன் புதூர் (வடகோவை, சாய்பாபா காலனி, துடியலூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_palani_gounden_pudur',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_vadakovai', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_thudiyalur_bs', 'stop_cbe_palani_gounden_pudur'],
    17.5,
    44,
    15
  ),

  // 21. Route 11A: Ukkadam ↔ Gandhipuram
  makeCbeRoute(
    'route_cbe_11a',
    '11A',
    'Ukkadam ↔ Gandhipuram (via Town Hall, Railway Station, Gandhipuram)',
    'உக்கடம் ↔ காந்திபுரம் (டவுன் ஹால், ரயில் நிலையம், காந்திபுரம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_gandhipuram_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_railway_station', 'stop_cbe_gandhipuram_bs'],
    6.5,
    18,
    5
  ),

  // 22. Route 11C / 45F: Ukkadam ↔ Annur
  makeCbeRoute(
    'route_cbe_11c',
    '11C',
    'Ukkadam ↔ Annur (via Gandhipuram, Ganapathy, Saravanampatti, Kovilpalayam, Annur)',
    'உக்கடம் ↔ அன்னூர் (காந்திபுரம், கணபதி, சரவணம்பட்டி, கோவில்பாளையம், அன்னூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_annur',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_annur'],
    36.5,
    75,
    15
  ),

  // 23. Route 15D: Ukkadam ↔ Vellamadai
  makeCbeRoute(
    'route_cbe_15d',
    '15D',
    'Ukkadam ↔ Vellamadai (via Gandhipuram, Ganapathy, Saravanampatti, Kovilpalayam, Vellamadai)',
    'உக்கடம் ↔ வெள்ளமடை (காந்திபுரம், கணபதி, சரவணம்பட்டி, கோவில்பாளையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_vellamadai',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs', 'stop_cbe_kovilpalayam', 'stop_cbe_vellamadai'],
    28.0,
    62,
    20
  ),

  // 24. Route 18: Ukkadam ↔ Thondamuthur
  makeCbeRoute(
    'route_cbe_18',
    '18',
    'Ukkadam ↔ Thondamuthur (via Selvapuram, Perur, Devarayapuram, Thondamuthur)',
    'உக்கடம் ↔ தொண்டாமுத்தூர் (செல்வபுரம், பேரூர், தேவராயபுரம், தொண்டாமுத்தூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_thondamuthur',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_devarayapuram', 'stop_cbe_thondamuthur'],
    19.0,
    44,
    12
  ),

  // 25. Route 19: Ukkadam ↔ Sadivayal / Siruvani
  makeCbeRoute(
    'route_cbe_19',
    '19',
    'Ukkadam ↔ Sadivayal / Siruvani (via Selvapuram, Perur, Madampatti, Alandurai, Karunya Nagar, Sadivayal)',
    'உக்கடம் ↔ சாடிவயல் / சிறுவாணி (செல்வபுரம், பேரூர், மாதம்பட்டி, ஆலந்துறை, காருண்யா நகர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_sadivayal',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_madampatti', 'stop_cbe_alandurai', 'stop_cbe_nallur_vayal', 'stop_cbe_sadivayal'],
    34.0,
    72,
    15
  ),

  // 26. Route 19B: Ukkadam ↔ Kovai Kondattam
  makeCbeRoute(
    'route_cbe_19b',
    '19B',
    'Ukkadam ↔ Kovai Kondattam (via Selvapuram, Perur, Kovai Kondattam)',
    'உக்கடம் ↔ கோவை கொண்டாட்டம் (செல்வபுரம், பேரூர், கோவை கொண்டாட்டம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_kovai_kondattam',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_kovai_kondattam'],
    12.5,
    30,
    15
  ),

  // 27. Route 19E: Ukkadam ↔ Pooluvapatti
  makeCbeRoute(
    'route_cbe_19e',
    '19E',
    'Ukkadam ↔ Pooluvapatti (via Selvapuram, Perur, Madampatti, Pooluvapatti)',
    'உக்கடம் ↔ பூளுவபட்டி (செல்வபுரம், பேரூர், மாதம்பட்டி, பூளுவபட்டி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_pooluvapatti',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_madampatti', 'stop_cbe_pooluvapatti'],
    20.0,
    45,
    15
  ),

  // 28. Route 24: Ukkadam ↔ Kovaipudur
  makeCbeRoute(
    'route_cbe_24',
    '24',
    'Ukkadam ↔ Kovaipudur (via Kuniamuthur, Kovaipudur Pirivu, Kovaipudur)',
    'உக்கடம் ↔ கோவைபுதூர் (குனியமுத்தூர், கோவைபுதூர் பிரிவு, கோவைபுதூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_kovaipudur_junction',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kuniyamuthur', 'stop_cbe_kovaipudur_junction'],
    9.5,
    24,
    8
  ),

  // 29. Route 24A: Ukkadam ↔ Kovaipudur (via Sundakkamuthur)
  makeCbeRoute(
    'route_cbe_24a',
    '24A',
    'Ukkadam ↔ Kovaipudur (via Sundakkamuthur, Kovaipudur)',
    'உக்கடம் ↔ கோவைபுதூர் (சுந்தக்கமுத்தூர், கோவைபுதூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_kovaipudur_junction',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sundakkamuthur', 'stop_cbe_kovaipudur_junction'],
    10.5,
    26,
    15
  ),

  // 30. Route 26: Ukkadam ↔ Singanallur
  makeCbeRoute(
    'route_cbe_26',
    '26',
    'Ukkadam ↔ Singanallur (via Sungam, Ramanathapuram, Singanallur)',
    'உக்கடம் ↔ சிங்கநல்லூர் (சுங்கம், ராமநாதபுரம், சிங்கநல்லூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_singanallur_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sungam', 'stop_cbe_ramanathapuram', 'stop_cbe_singanallur_bs'],
    8.5,
    22,
    10
  ),

  // 31. Route 27B: Ukkadam ↔ Karadimadai
  makeCbeRoute(
    'route_cbe_27b',
    '27B',
    'Ukkadam ↔ Karadimadai (via Selvapuram, Perur, Madampatti, Karadimadai)',
    'உக்கடம் ↔ கரடிமடை (செல்வபுரம், பேரூர், மாதம்பட்டி, கரடிமடை வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_karadimadai',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_madampatti', 'stop_cbe_karadimadai'],
    18.5,
    42,
    20
  ),

  // 32. Route 30: Ukkadam ↔ Sulur
  makeCbeRoute(
    'route_cbe_30',
    '30',
    'Ukkadam ↔ Sulur (via Sungam, Ramanathapuram, Singanallur, Ondipudur, Sulur)',
    'உக்கடம் ↔ சூலூர் (சுங்கம், ராமநாதபுரம், சிங்கநல்லூர், ஒண்டிப்புதூர், சூலூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_sulur_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sungam', 'stop_cbe_ramanathapuram', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_sulur_bs'],
    20.0,
    48,
    10
  ),

  // 33. Route 30C: Ukkadam ↔ Kannampalayam
  makeCbeRoute(
    'route_cbe_30c',
    '30C',
    'Ukkadam ↔ Kannampalayam (via Singanallur, Ondipudur, Kannampalayam)',
    'உக்கடம் ↔ கண்ணம்பாளையம் (சிங்கநல்லூர், ஒண்டிப்புதூர், கண்ணம்பாளையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_kannampalayam_town',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sungam', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_kannampalayam_town'],
    18.5,
    44,
    15
  ),

  // 34. Route 30E: Ukkadam ↔ Somanur
  makeCbeRoute(
    'route_cbe_30e',
    '30E',
    'Ukkadam ↔ Somanur (via Singanallur, Ondipudur, Sulur, Somanur)',
    'உக்கடம் ↔ சோமனூர் (சிங்கநல்லூர், ஒண்டிப்புதூர், சூலூர், சோமனூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_somanur',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sungam', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_sulur_bs', 'stop_cbe_somanur'],
    31.0,
    70,
    15
  ),

  // 35. Route 30G: Ukkadam ↔ Irugur
  makeCbeRoute(
    'route_cbe_30g',
    '30G',
    'Ukkadam ↔ Irugur (via Singanallur, Ondipudur, Irugur)',
    'உக்கடம் ↔ இருகூர் (சிங்கநல்லூர், ஒண்டிப்புதூர், இருகூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_irugur',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_sungam', 'stop_cbe_singanallur_bs', 'stop_cbe_ondipudur_bs', 'stop_cbe_irugur'],
    16.0,
    38,
    15
  ),

  // 36. Route 31: Ukkadam ↔ Saravanampatti
  makeCbeRoute(
    'route_cbe_31',
    '31',
    'Ukkadam ↔ Saravanampatti (via Town Hall, Gandhipuram, Ganapathy, Saravanampatti)',
    'உக்கடம் ↔ சரவணம்பட்டி (டவுன் ஹால், காந்திபுரம், கணபதி, சரவணம்பட்டி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_saravanampatti_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_saravanampatti_bs'],
    17.5,
    42,
    10
  ),

  // 37. Route 31B: Ukkadam ↔ Cheran Maa Nagar
  makeCbeRoute(
    'route_cbe_31b',
    '31B',
    'Ukkadam ↔ Cheran Maa Nagar (via Gandhipuram, Ganapathy, Cheran Maa Nagar)',
    'உக்கடம் ↔ சேரன் மா நகர் (காந்திபுரம், கணபதி, சேரன் மா நகர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_cheran_maa_nagar',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_cheran_maa_nagar'],
    16.0,
    38,
    12
  ),

  // 38. Route 31D: Ukkadam ↔ Vilankurichi
  makeCbeRoute(
    'route_cbe_31d',
    '31D',
    'Ukkadam ↔ Vilankurichi (via Gandhipuram, Ganapathy, Vilankurichi)',
    'உக்கடம் ↔ விளாங்குறிச்சி (காந்திபுரம், கணபதி, விளாங்குறிச்சி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_vilankurichi',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_gandhipuram_bs', 'stop_cbe_ganapathy_bus_stand', 'stop_cbe_vilankurichi'],
    17.0,
    40,
    15
  ),

  // 39. Route 32B: Ukkadam ↔ Sundarapuram
  makeCbeRoute(
    'route_cbe_32b',
    '32B',
    'Ukkadam ↔ Sundarapuram (via Kurichi, Sundarapuram)',
    'உக்கடம் ↔ சுந்தராபுரம் (குறிச்சி, சுந்தராபுரம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_sundarapuram',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_kurichi_housing_unit', 'stop_cbe_sundarapuram'],
    7.5,
    18,
    10
  ),

  // 40. Route 37: Ukkadam ↔ Vadavalli
  makeCbeRoute(
    'route_cbe_37',
    '37',
    'Ukkadam ↔ Vadavalli (via Town Hall, DB Road, Lawley Road, Vadavalli)',
    'உக்கடம் ↔ வடவள்ளி (டவுன் ஹால், டி.பி. ரோடு, லாலி ரோடு, வடவள்ளி வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_vadavalli_bs',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_rs_puram', 'stop_cbe_lawley_road', 'stop_cbe_vadavalli_bs'],
    13.0,
    32,
    10
  ),

  // 41. Route 48A: Ukkadam ↔ Narasimhanaickenpalayam
  makeCbeRoute(
    'route_cbe_48a',
    '48A',
    'Ukkadam ↔ Narasimhanaickenpalayam (via Town Hall, Vadakovai, Saibaba Colony, Thudiyalur, NSN Palayam)',
    'உக்கடம் ↔ நரசிம்மநாயக்கன்பாளையம் (டவுன் ஹால், வடகோவை, சாய்பாபா காலனி, துடியலூர் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_poochiyur',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_town_hall', 'stop_cbe_vadakovai', 'stop_cbe_saibaba_colony_bs', 'stop_cbe_thudiyalur_bs', 'stop_cbe_poochiyur'],
    19.0,
    46,
    12
  ),

  // 42. Route 14E: Ukkadam ↔ Isha Yoga Centre / Velliangiri Foothills
  makeCbeRoute(
    'route_cbe_14e',
    '14E',
    'Ukkadam ↔ Isha Yoga Centre (via Selvapuram, Perur, Alandurai, Poondi, Isha Yoga)',
    'உக்கடம் ↔ ஈஷா யோகா மையம் (செல்வபுரம், பேரூர், ஆலந்துறை, பூண்டி, ஈஷா யோகா மையம் வழி)',
    'stop_cbe_ukkadam_bs',
    'stop_cbe_isha_yoga_centre',
    ['stop_cbe_ukkadam_bs', 'stop_cbe_selvapuram', 'stop_cbe_perur_patteeswarar', 'stop_cbe_alandurai', 'stop_cbe_poondi_temple', 'stop_cbe_isha_yoga_centre'],
    32.0,
    65,
    15,
    'Deluxe'
  )
];
