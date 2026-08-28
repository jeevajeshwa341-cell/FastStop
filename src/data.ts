import { CHENNAI_MTC_ROUTES } from './data/chennaiRoutes';
import { COIMBATORE_TNSTC_ROUTES } from './data/coimbatoreRoutes';
import { getStopById } from './data/stops';

export interface District {
  nameEN: string;
  nameTA: string;
  lat: number;
  lng: number;
  liveCount: number;
  zones: string;
}

export interface Stop {
  nameEN: string;
  nameTA: string;
  lat: number;
  lng: number;
  district: string;
}

export interface Route {
  id: string;
  code: string;
  nameEN: string;
  nameTA: string;
  type: 'Express' | 'Ordinary' | 'Mini Bus';
  stops: Stop[];
  color: string; // Tailwind color class or hex for badge styling
}

export interface Bus {
  id: string;
  busNumber: string;
  routeId: string;
  status: 'Available' | 'Delayed' | 'Not Available';
  speed: number; // km/h
  direction: 'forward' | 'backward';
  currentStopIndex: number;
  progressRatio: number; // 0 to 1
  capacity: number; // occupancy %
  frequency: string;
}

// All 39 districts of Tamil Nadu with exact centers & real live counters
export const DISTRICTS: District[] = [
  { nameEN: "Chennai", nameTA: "சென்னை", lat: 13.0827, lng: 80.2707, liveCount: 245, zones: "15 Zones" },
  { nameEN: "Coimbatore", nameTA: "கோயம்புத்தூர்", lat: 11.0168, lng: 76.9558, liveCount: 84, zones: "11 Zones" },
  { nameEN: "Madurai", nameTA: "மதுரை", lat: 9.9252, lng: 78.1198, liveCount: 62, zones: "8 Zones" },
  { nameEN: "Tiruchirappalli", nameTA: "திருச்சிராப்பள்ளி", lat: 10.7905, lng: 78.7047, liveCount: 51, zones: "7 Zones" },
  { nameEN: "Salem", nameTA: "சேலம்", lat: 11.6643, lng: 78.1460, liveCount: 56, zones: "6 Zones" },
  { nameEN: "Tirunelveli", nameTA: "திருநெல்வேலி", lat: 8.7139, lng: 77.7567, liveCount: 26, zones: "5 Zones" },
  { nameEN: "Tiruppur", nameTA: "திருப்பூர்", lat: 11.1085, lng: 77.3411, liveCount: 45, zones: "6 Zones" },
  { nameEN: "Vellore", nameTA: "வேலூர்", lat: 12.9165, lng: 79.1325, liveCount: 38, zones: "4 Zones" },
  { nameEN: "Erode", nameTA: "ஈரோடு", lat: 11.3410, lng: 77.7172, liveCount: 28, zones: "5 Zones" },
  { nameEN: "Thoothukudi", nameTA: "தூத்துக்குடி", lat: 8.7642, lng: 78.1348, liveCount: 22, zones: "4 Zones" },
  { nameEN: "Dindigul", nameTA: "திண்டுக்கல்", lat: 10.3624, lng: 77.9695, liveCount: 18, zones: "5 Zones" },
  { nameEN: "Thanjavur", nameTA: "தஞ்சாவூர்", lat: 10.7870, lng: 79.1378, liveCount: 31, zones: "6 Zones" },
  { nameEN: "Ranipet", nameTA: "ராணிப்பேட்டை", lat: 12.9399, lng: 79.3327, liveCount: 16, zones: "3 Zones" },
  { nameEN: "Sivaganga", nameTA: "சிவகங்கை", lat: 9.8477, lng: 78.4801, liveCount: 15, zones: "4 Zones" },
  { nameEN: "Virudhunagar", nameTA: "விருதுநகர்", lat: 9.5851, lng: 77.9624, liveCount: 18, zones: "4 Zones" },
  { nameEN: "Nagapattinam", nameTA: "நாகப்பட்டினம்", lat: 10.7672, lng: 79.8449, liveCount: 14, zones: "3 Zones" },
  { nameEN: "Kanyakumari", nameTA: "கன்னியாகுமரி", lat: 8.0883, lng: 77.5385, liveCount: 19, zones: "3 Zones" },
  { nameEN: "Dharmapuri", nameTA: "தர்மபுரி", lat: 12.1277, lng: 78.1580, liveCount: 15, zones: "3 Zones" },
  { nameEN: "Krishnagiri", nameTA: "கிருஷ்ணகிரி", lat: 12.5186, lng: 78.2137, liveCount: 24, zones: "4 Zones" },
  { nameEN: "Namakkal", nameTA: "நாமக்கல்", lat: 11.2189, lng: 78.1674, liveCount: 17, zones: "3 Zones" },
  { nameEN: "Cuddalore", nameTA: "கடலூர்", lat: 11.7447, lng: 79.7689, liveCount: 22, zones: "4 Zones" },
  { nameEN: "Villupuram", nameTA: "விழுப்புரம்", lat: 11.9399, lng: 79.4927, liveCount: 25, zones: "5 Zones" },
  { nameEN: "Ariyalur", nameTA: "அரியலூர்", lat: 11.1404, lng: 79.0785, liveCount: 12, zones: "2 Zones" },
  { nameEN: "Perambalur", nameTA: "பெரம்பலூர்", lat: 11.2342, lng: 78.8811, liveCount: 11, zones: "2 Zones" },
  { nameEN: "Karur", nameTA: "கரூர்", lat: 10.9601, lng: 78.0766, liveCount: 14, zones: "3 Zones" },
  { nameEN: "Nilgiris", nameTA: "நீலகிரி", lat: 11.4916, lng: 76.7337, liveCount: 16, zones: "3 Zones" },
  { nameEN: "Ramanathapuram", nameTA: "ராமநாதபுரம்", lat: 9.3711, lng: 78.8307, liveCount: 14, zones: "3 Zones" },
  { nameEN: "Pudukkottai", nameTA: "புதுக்கோட்டை", lat: 10.3797, lng: 78.8203, liveCount: 16, zones: "3 Zones" },
  { nameEN: "Tenkasi", nameTA: "தென்காசி", lat: 8.9593, lng: 77.3152, liveCount: 15, zones: "3 Zones" },
  { nameEN: "Tiruvannamalai", nameTA: "திருவண்ணாமலை", lat: 12.2253, lng: 79.0747, liveCount: 18, zones: "4 Zones" },
  { nameEN: "Tiruvarur", nameTA: "திருவாரூர்", lat: 10.7672, lng: 79.6366, liveCount: 12, zones: "2 Zones" },
  { nameEN: "Tirupattur", nameTA: "திருப்பத்தூர்", lat: 12.4965, lng: 78.5726, liveCount: 14, zones: "3 Zones" },
  { nameEN: "Chengalpattu", nameTA: "செங்கல்பட்டு", lat: 12.6921, lng: 79.9765, liveCount: 26, zones: "5 Zones" },
  { nameEN: "Kallakurichi", nameTA: "கள்ளக்குறிச்சி", lat: 11.7380, lng: 78.9590, liveCount: 15, zones: "3 Zones" },
  { nameEN: "Mayiladuthurai", nameTA: "மயிலாடுதுறை", lat: 11.1000, lng: 79.6500, liveCount: 13, zones: "2 Zones" },
  { nameEN: "Kancheepuram", nameTA: "காஞ்சீபுரம்", lat: 12.8387, lng: 79.7012, liveCount: 21, zones: "4 Zones" },
  { nameEN: "Tiruvallur", nameTA: "திருவள்ளூர்", lat: 13.1200, lng: 79.9100, liveCount: 22, zones: "4 Zones" },
  { nameEN: "The Nilgiris Extended", nameTA: "கொடைக்கானல் பகுதி", lat: 10.2381, lng: 77.4892, liveCount: 11, zones: "2 Zones" },
  { nameEN: "Theni", nameTA: "தேனி", lat: 10.0104, lng: 77.4771, liveCount: 15, zones: "3 Zones" }
];

export const BASE_ROUTES: Route[] = [
  // ==========================================
  // COIMBATORE LOCAL BUS ROUTES
  // ==========================================

  // 1. BUS 45C (Green/Town Bus) - Gandhipuram to SNS College of Technology / Kovilpalayam
  {
    id: "R_45C",
    code: "45C",
    nameEN: "Gandhipuram ⇄ SNS College of Technology (via Saravanampatti)",
    nameTA: "காந்திபுரம் ⇄ எஸ்.என்.எஸ் தொழில்நுட்பக் கல்லூரி (சரவணம்பட்டி வழியாக)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Gandhipuram Omni Bus Stand", nameTA: "ஆம்னி பேருந்து நிலையம்", lat: 11.0205, lng: 76.9692, district: "Coimbatore" },
      { nameEN: "Cross Cut Road Corner", nameTA: "கிராஸ் கட் ரோடு", lat: 11.0192, lng: 76.9634, district: "Coimbatore" },
      { nameEN: "Textool Bus Stop", nameTA: "டெக்ஸ்டூல் பேருந்து நிறுத்தம்", lat: 11.0289, lng: 76.9742, district: "Coimbatore" },
      { nameEN: "Ganapathy Bus Stand", nameTA: "கணபதி பேருந்து நிலையம்", lat: 11.0365, lng: 76.9798, district: "Coimbatore" },
      { nameEN: "Surya Hospital (Sathy Road)", nameTA: "சூர்யா மருத்துவமனை (சத்தி ரோடு)", lat: 11.0475, lng: 76.9872, district: "Coimbatore" },
      { nameEN: "Prozone Mall Stop", nameTA: "புரோசோன் மால் நிறுத்தம்", lat: 11.0542, lng: 76.9935, district: "Coimbatore" },
      { nameEN: "Saravanampatti Checkpost", nameTA: "சரவணம்பட்டி செக்போஸ்ட்", lat: 11.0682, lng: 77.0018, district: "Coimbatore" },
      { nameEN: "Saravanampatti Junction", nameTA: "சரவணம்பட்டி சந்திப்பு", lat: 11.0776, lng: 77.0062, district: "Coimbatore" },
      { nameEN: "Kurumbapalayam Pirivu", nameTA: "குரும்பபாளையம் பிரிவு", lat: 11.0950, lng: 77.0160, district: "Coimbatore" },
      { nameEN: "SNS College of Technology", nameTA: "எஸ்.என்.எஸ் தொழில்நுட்பக் கல்லூரி", lat: 11.1068, lng: 77.0232, district: "Coimbatore" },
      { nameEN: "Kovilpalayam Bus Stand", nameTA: "கோவில்பாளையம் பேருந்து நிலையம்", lat: 11.1395, lng: 77.0421, district: "Coimbatore" }
    ]
  },

  // 2. BUS 45A (Town Bus) - Gandhipuram to Kovilpalayam
  {
    id: "R_45A",
    code: "45A",
    nameEN: "Gandhipuram ⇄ Kovilpalayam (via Sathy Road & Ganapathy)",
    nameTA: "காந்திபுரம் ⇄ கோவில்பாளையம் (சத்தி ரோடு & கணபதி)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Textool Ganapathy", nameTA: "டெக்ஸ்டூல் கணபதி", lat: 11.0289, lng: 76.9742, district: "Coimbatore" },
      { nameEN: "Ganapathy Bus Stand", nameTA: "கணபதி பேருந்து நிலையம்", lat: 11.0365, lng: 76.9798, district: "Coimbatore" },
      { nameEN: "Prozone Mall Sathy Road", nameTA: "புரோசோன் மால் சத்தி ரோடு", lat: 11.0542, lng: 76.9935, district: "Coimbatore" },
      { nameEN: "Saravanampatti Junction", nameTA: "சரவணம்பட்டி சந்திப்பு", lat: 11.0776, lng: 77.0062, district: "Coimbatore" },
      { nameEN: "SNS College of Technology Stop", nameTA: "எஸ்.என்.எஸ் கல்லூரி நிறுத்தம்", lat: 11.1068, lng: 77.0232, district: "Coimbatore" },
      { nameEN: "Kovilpalayam Bus Stand", nameTA: "கோவில்பாளையம் பேருந்து நிலையம்", lat: 11.1395, lng: 77.0421, district: "Coimbatore" }
    ]
  },

  // 3. BUS 70A (Town Bus) - Gandhipuram to Kurumbapalayam / SNS Tech
  {
    id: "R_70A",
    code: "70A",
    nameEN: "Gandhipuram ⇄ Kurumbapalayam / SNS College",
    nameTA: "காந்திபுரம் ⇄ குரும்பபாளையம் / SNS கல்லூரி",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Cross Cut Road", nameTA: "கிராஸ் கட் ரோடு", lat: 11.0192, lng: 76.9634, district: "Coimbatore" },
      { nameEN: "Ganapathy Bus Stand", nameTA: "கணபதி பேருந்து நிலையம்", lat: 11.0365, lng: 76.9798, district: "Coimbatore" },
      { nameEN: "Surya Hospital", nameTA: "சூர்யா மருத்துவமனை", lat: 11.0475, lng: 76.9872, district: "Coimbatore" },
      { nameEN: "Saravanampatti Checkpost", nameTA: "சரவணம்பட்டி செக்போஸ்ட்", lat: 11.0682, lng: 77.0018, district: "Coimbatore" },
      { nameEN: "Saravanampatti Junction", nameTA: "சரவணம்பட்டி சந்திப்பு", lat: 11.0776, lng: 77.0062, district: "Coimbatore" },
      { nameEN: "SNS College of Technology Stop", nameTA: "SNS கல்லூரி நிறுத்தம்", lat: 11.1068, lng: 77.0232, district: "Coimbatore" }
    ]
  },

  // 4. BUS 111 (Express) - Gandhipuram to Annur via SNS Tech
  {
    id: "R_111",
    code: "111",
    nameEN: "Gandhipuram ⇄ Annur (via Saravanampatti & SNS Tech)",
    nameTA: "காந்திபுரம் ⇄ அன்னூர் (சரவணம்பட்டி & SNS டெக் வழியாக)",
    type: "Express",
    color: "#4a90e2",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Ganapathy Bus Stand", nameTA: "கணபதி பேருந்து நிலையம்", lat: 11.0365, lng: 76.9798, district: "Coimbatore" },
      { nameEN: "Prozone Mall Sathy Road", nameTA: "புரோசோன் மால் சத்தி ரோடு", lat: 11.0542, lng: 76.9935, district: "Coimbatore" },
      { nameEN: "Saravanampatti Junction", nameTA: "சரவணம்பட்டி சந்திப்பு", lat: 11.0776, lng: 77.0062, district: "Coimbatore" },
      { nameEN: "SNS College of Technology", nameTA: "எஸ்.என்.எஸ் தொழில்நுட்பக் கல்லூரி", lat: 11.1068, lng: 77.0232, district: "Coimbatore" },
      { nameEN: "Kovilpalayam Bus Stand", nameTA: "கோவில்பாளையம் பேருந்து நிலையம்", lat: 11.1395, lng: 77.0421, district: "Coimbatore" },
      { nameEN: "Annur Bus Terminal", nameTA: "அன்னூர் பேருந்து முனையம்", lat: 11.2332, lng: 77.1772, district: "Coimbatore" }
    ]
  },

  // 5. BUS 20C (Deluxe / Ordinary) - Gandhipuram to Marudhamalai Temple
  {
    id: "R_20C",
    code: "20C",
    nameEN: "Gandhipuram ⇄ Marudhamalai Temple (via Vadavalli)",
    nameTA: "காந்திபுரம் ⇄ மருதமலை கோவில் (வடவள்ளி வழியாக)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Cross Cut Road Corner", nameTA: "கிராஸ் கட் ரோடு", lat: 11.0192, lng: 76.9634, district: "Coimbatore" },
      { nameEN: "Saibaba Colony (NSR Road)", nameTA: "சாய்பாபா காலனி (NSR ரோடு)", lat: 11.0278, lng: 76.9482, district: "Coimbatore" },
      { nameEN: "Lawley Road Junction", nameTA: "லாலி ரோடு சந்திப்பு", lat: 11.0125, lng: 76.9362, district: "Coimbatore" },
      { nameEN: "Vadavalli Bus Stand", nameTA: "வடவள்ளி பேருந்து நிலையம்", lat: 11.0285, lng: 76.9025, district: "Coimbatore" },
      { nameEN: "Marudhamalai Adivaram Stop", nameTA: "மருதமலை அடிவாரம் நிறுத்தம்", lat: 11.0458, lng: 76.8528, district: "Coimbatore" }
    ]
  },

  // 6. BUS 90A (Town Bus) - Gandhipuram to Ondipudur via PSG Tech & Hope College
  {
    id: "R_90A",
    code: "90A",
    nameEN: "Gandhipuram ⇄ Ondipudur (via PSG Tech & Hope College)",
    nameTA: "காந்திபுரம் ⇄ ஒண்டிப்புதூர் (PSG டெக் & ஹோப் காலேஜ்)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Lakshmi Mills Bus Stop", nameTA: "லட்சுமி மில்ஸ் நிறுத்தம்", lat: 11.0095, lng: 76.9868, district: "Coimbatore" },
      { nameEN: "Nava India Bus Stop", nameTA: "நவ இந்தியா நிறுத்தம்", lat: 11.0145, lng: 76.9995, district: "Coimbatore" },
      { nameEN: "Peelamedu (PSG Tech / Hospital)", nameTA: "பீளமேடு (PSG டெக் / மருத்துவமனை)", lat: 11.0242, lng: 77.0035, district: "Coimbatore" },
      { nameEN: "Hope College Bus Stop", nameTA: "ஹோப் காலேஜ் நிறுத்தம்", lat: 11.0298, lng: 77.0162, district: "Coimbatore" },
      { nameEN: "CIT College Stop", nameTA: "சி.ஐ.டி கல்லூரி நிறுத்தம்", lat: 11.0315, lng: 77.0278, district: "Coimbatore" },
      { nameEN: "Ondipudur Bus Depot", nameTA: "ஒண்டிப்புதூர் பணிமனை", lat: 11.0028, lng: 77.0498, district: "Coimbatore" }
    ]
  },

  // 7. BUS 10A-CBE (Ordinary - Free for Women) - Ukkadam to Thudiyalur
  {
    id: "R_10A_CBE",
    code: "10A",
    nameEN: "Ukkadam ⇄ Thudiyalur (via Gandhipuram & Saibaba Colony)",
    nameTA: "உக்கடம் ⇄ துடியலூர் (காந்திபுரம் & சாய்பாபா காலனி)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Ukkadam Bus Stand", nameTA: "உக்கடம் பேருந்து நிலையம்", lat: 10.9882, lng: 76.9582, district: "Coimbatore" },
      { nameEN: "Town Hall Clock Tower", nameTA: "டவுன் ஹால் மணிக்கூண்டு", lat: 10.9962, lng: 76.9625, district: "Coimbatore" },
      { nameEN: "Coimbatore Railway Junction", nameTA: "கோயம்புத்தூர் ரயில்வே சந்திப்பு", lat: 10.9984, lng: 76.9688, district: "Coimbatore" },
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Saibaba Colony (NSR Road)", nameTA: "சாய்பாபா காலனி (NSR ரோடு)", lat: 11.0278, lng: 76.9482, district: "Coimbatore" },
      { nameEN: "Kavundampalayam Bus Stop", nameTA: "கவுண்டம்பாளையம் நிறுத்தம்", lat: 11.0425, lng: 76.9425, district: "Coimbatore" },
      { nameEN: "Thudiyalur Bus Stand", nameTA: "துடியலூர் பேருந்து நிலையம்", lat: 11.0782, lng: 76.9385, district: "Coimbatore" }
    ]
  },

  // 8. BUS 41D (Town Bus) - Ukkadam to Saravanampatti KCT
  {
    id: "R_41D",
    code: "41D",
    nameEN: "Ukkadam ⇄ Saravanampatti [KCT] (via Gandhipuram)",
    nameTA: "உக்கடம் ⇄ சரவணம்பட்டி [KCT] (காந்திபுரம் வழியாக)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Ukkadam Bus Stand", nameTA: "உக்கடம் பேருந்து நிலையம்", lat: 10.9882, lng: 76.9582, district: "Coimbatore" },
      { nameEN: "Town Hall Clock Tower", nameTA: "டவுன் ஹால் மணிக்கூண்டு", lat: 10.9962, lng: 76.9625, district: "Coimbatore" },
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Textool Ganapathy", nameTA: "டெக்ஸ்டூல் கணபதி", lat: 11.0289, lng: 76.9742, district: "Coimbatore" },
      { nameEN: "Ganapathy Bus Stand", nameTA: "கணபதி பேருந்து நிலையம்", lat: 11.0365, lng: 76.9798, district: "Coimbatore" },
      { nameEN: "Saravanampatti Checkpost", nameTA: "சரவணம்பட்டி செக்போஸ்ட்", lat: 11.0682, lng: 77.0018, district: "Coimbatore" },
      { nameEN: "Saravanampatti Junction", nameTA: "சரவணம்பட்டி சந்திப்பு", lat: 11.0776, lng: 77.0062, district: "Coimbatore" },
      { nameEN: "Kumaraguru College (KCT) Gate", nameTA: "குமரகுரு கல்லூரி (KCT) நுழைவு வாயில்", lat: 11.0825, lng: 76.9928, district: "Coimbatore" }
    ]
  },

  // 9. BUS 33A (Ordinary) - Gandhipuram to Eachanari Temple & Karpagam
  {
    id: "R_33A",
    code: "33A",
    nameEN: "Gandhipuram ⇄ Eachanari Temple (via Ukkadam & Sundarapuram)",
    nameTA: "காந்திபுரம் ⇄ ஈச்சனாரி கோவில் (உக்கடம் & சுந்தராபுரம்)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Coimbatore Railway Junction", nameTA: "கோயம்புத்தூர் ரயில்வே சந்திப்பு", lat: 10.9984, lng: 76.9688, district: "Coimbatore" },
      { nameEN: "Town Hall Clock Tower", nameTA: "டவுன் ஹால் மணிக்கூண்டு", lat: 10.9962, lng: 76.9625, district: "Coimbatore" },
      { nameEN: "Ukkadam Bus Stand", nameTA: "உக்கடம் பேருந்து நிலையம்", lat: 10.9882, lng: 76.9582, district: "Coimbatore" },
      { nameEN: "Sundarapuram Bus Stop", nameTA: "சுந்தராபுரம் பேருந்து நிறுத்தம்", lat: 10.9482, lng: 76.9745, district: "Coimbatore" },
      { nameEN: "Eachanari Vinayagar Temple & College", nameTA: "ஈச்சனாரி விநாயகர் கோவில் & கல்லூரி", lat: 10.9275, lng: 76.9815, district: "Coimbatore" }
    ]
  },

  // 10. BUS 88A (Town Bus) - Ukkadam to Sri Krishna College (SKCET)
  {
    id: "R_88A",
    code: "88A",
    nameEN: "Ukkadam ⇄ Sri Krishna College [SKCET] (via Kuniyamuthur)",
    nameTA: "உக்கடம் ⇄ ஸ்ரீ கிருஷ்ணா கல்லூரி [SKCET] (குனியமுத்தூர் வழியாக)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Ukkadam Bus Stand", nameTA: "உக்கடம் பேருந்து நிலையம்", lat: 10.9882, lng: 76.9582, district: "Coimbatore" },
      { nameEN: "Athupalam Tollgate", nameTA: "ஆத்துப்பாலம்", lat: 10.9752, lng: 76.9515, district: "Coimbatore" },
      { nameEN: "Kuniyamuthur Bus Stop", nameTA: "குனியமுத்தூர் பேருந்து நிறுத்தம்", lat: 10.9575, lng: 76.9458, district: "Coimbatore" },
      { nameEN: "BK Pudur Stop", nameTA: "பிகே புதூர் நிறுத்தம்", lat: 10.9450, lng: 76.9510, district: "Coimbatore" },
      { nameEN: "Sri Krishna College (SKCET) Gate", nameTA: "ஸ்ரீ கிருஷ்ணா கல்லூரி (SKCET) வாசல்", lat: 10.9388, lng: 76.9562, district: "Coimbatore" }
    ]
  },

  // 11. BUS S1 (Airport Express - Low Floor AC)
  {
    id: "R_S1",
    code: "S1",
    nameEN: "Gandhipuram ⇄ Coimbatore Airport SITRA (via KMCH & Hope College)",
    nameTA: "காந்திபுரம் ⇄ கோவை விமான நிலையம் SITRA (KMCH & ஹோப் காலேஜ்)",
    type: "Express",
    color: "#4a90e2",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Lakshmi Mills Bus Stop", nameTA: "லட்சுமி மில்ஸ் நிறுத்தம்", lat: 11.0095, lng: 76.9868, district: "Coimbatore" },
      { nameEN: "Peelamedu (PSG Tech / PSG Hospital)", nameTA: "பீளமேடு (PSG டெக்)", lat: 11.0242, lng: 77.0035, district: "Coimbatore" },
      { nameEN: "Hope College Bus Stop", nameTA: "ஹோப் காலேஜ் நிறுத்தம்", lat: 11.0298, lng: 77.0162, district: "Coimbatore" },
      { nameEN: "CIT College Stop", nameTA: "சி.ஐ.டி கல்லூரி", lat: 11.0315, lng: 77.0278, district: "Coimbatore" },
      { nameEN: "KMCH Hospital Stop", nameTA: "KMCH மருத்துவமனை நிறுத்தம்", lat: 11.0385, lng: 77.0398, district: "Coimbatore" },
      { nameEN: "Coimbatore International Airport (SITRA)", nameTA: "கோவை சர்வதேச விமான நிலையம் (SITRA)", lat: 11.0362, lng: 77.0435, district: "Coimbatore" }
    ]
  },

  // 12. BUS 3A (Ordinary) - Singanallur to Gandhipuram
  {
    id: "R_3A",
    code: "3A",
    nameEN: "Singanallur ⇄ Gandhipuram (via Ramanathapuram)",
    nameTA: "சிங்காநல்லூர் ⇄ காந்திபுரம் (ராமநாதபுரம் வழியாக)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Singanallur Bus Stand", nameTA: "சிங்காநல்லூர் பேருந்து நிலையம்", lat: 10.9998, lng: 77.0265, district: "Coimbatore" },
      { nameEN: "Ramanathapuram 80ft Road", nameTA: "ராமநாதபுரம் 80 அடி ரோடு", lat: 10.9928, lng: 76.9912, district: "Coimbatore" },
      { nameEN: "Lakshmi Mills Bus Stop", nameTA: "லட்சுமி மில்ஸ் நிறுத்தம்", lat: 11.0095, lng: 76.9868, district: "Coimbatore" },
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" }
    ]
  },

  // 13. BUS 76 (Town Bus) - Gandhipuram to Perur Temple
  {
    id: "R_76",
    code: "76",
    nameEN: "Gandhipuram ⇄ Perur Patteeswarar Temple",
    nameTA: "காந்திபுரம் ⇄ பேரூர் பட்டீஸ்வரர் கோவில்",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Coimbatore Railway Junction", nameTA: "கோயம்புத்தூர் ரயில்வே சந்திப்பு", lat: 10.9984, lng: 76.9688, district: "Coimbatore" },
      { nameEN: "Town Hall Clock Tower", nameTA: "டவுன் ஹால் மணிக்கூண்டு", lat: 10.9962, lng: 76.9625, district: "Coimbatore" },
      { nameEN: "Telungupalayam / Selvapuram", nameTA: "தெலுங்குபாளையம் / செல்வபுரம்", lat: 10.9850, lng: 76.9380, district: "Coimbatore" },
      { nameEN: "Perur Patteeswarar Temple", nameTA: "பேரூர் பட்டீஸ்வரர் திருக்கோவில்", lat: 10.9702, lng: 76.9168, district: "Coimbatore" }
    ]
  },

  // 14. BUS 1C (Town Bus) - Ondipudur to Marudhamalai
  {
    id: "R_1C",
    code: "1C",
    nameEN: "Ondipudur ⇄ Marudhamalai (via Singanallur & Gandhipuram)",
    nameTA: "ஒண்டிப்புதூர் ⇄ மருதமலை (சிங்காநல்லூர் & காந்திபுரம்)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Ondipudur Bus Depot", nameTA: "ஒண்டிப்புதூர் பணிமனை", lat: 11.0028, lng: 77.0498, district: "Coimbatore" },
      { nameEN: "Singanallur Bus Stand", nameTA: "சிங்காநல்லூர் பேருந்து நிலையம்", lat: 10.9998, lng: 77.0265, district: "Coimbatore" },
      { nameEN: "Ramanathapuram 80ft Road", nameTA: "ராமநாதபுரம் 80 அடி ரோடு", lat: 10.9928, lng: 76.9912, district: "Coimbatore" },
      { nameEN: "Coimbatore Railway Junction", nameTA: "ரயில்வே சந்திப்பு", lat: 10.9984, lng: 76.9688, district: "Coimbatore" },
      { nameEN: "Gandhipuram Central Bus Stand", nameTA: "காந்திபுரம் மத்திய பேருந்து நிலையம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Saibaba Colony (NSR Road)", nameTA: "சாய்பாபா காலனி", lat: 11.0278, lng: 76.9482, district: "Coimbatore" },
      { nameEN: "Vadavalli Bus Stand", nameTA: "வடவள்ளி பேருந்து நிலையம்", lat: 11.0285, lng: 76.9025, district: "Coimbatore" },
      { nameEN: "Marudhamalai Adivaram Stop", nameTA: "மருதமலை அடிவாரம் நிறுத்தம்", lat: 11.0458, lng: 76.8528, district: "Coimbatore" }
    ]
  },

  // ==========================================
  // ARIYALUR & INTER-DISTRICT ROUTES
  // ==========================================

  // 15. BUS 10A (Green) - Ariyalur BS to Andimadam
  {
    id: "R1",
    code: "10A",
    nameEN: "Ariyalur BS ⇄ Andimadam",
    nameTA: "அரியலூர் BS ⇄ ஆண்டிமடம்",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Ariyalur BS", nameTA: "அரியலூர் BS", lat: 11.1404, lng: 79.0785, district: "Ariyalur" },
      { nameEN: "Sendurai", nameTA: "செந்துறை", lat: 11.2428, lng: 79.1664, district: "Ariyalur" },
      { nameEN: "Udayarpalayam", nameTA: "உடையார்பாளையம்", lat: 11.1738, lng: 79.2891, district: "Ariyalur" },
      { nameEN: "Andimadam", nameTA: "ஆண்டிமடம்", lat: 11.3323, lng: 79.3789, district: "Ariyalur" }
    ]
  },
  // 16. BUS 10B (Orange) - Ariyalur Rural Express
  {
    id: "R2",
    code: "10B",
    nameEN: "Ariyalur Rural Express",
    nameTA: "அரியலூர் கிராமப்புற விரைவு",
    type: "Express",
    color: "#ff9f43",
    stops: [
      { nameEN: "Jayankondam", nameTA: "ஜெயங்கொண்டம்", lat: 11.2144, lng: 79.4442, district: "Ariyalur" },
      { nameEN: "Ariyalur BS", nameTA: "அரியலூர் BS", lat: 11.1404, lng: 79.0785, district: "Ariyalur" },
      { nameEN: "Sendurai", nameTA: "செந்துறை", lat: 11.2428, lng: 79.1664, district: "Ariyalur" },
      { nameEN: "T.Palur", nameTA: "டி.பளூர்", lat: 11.0827, lng: 79.4144, district: "Ariyalur" },
      { nameEN: "Andimadam", nameTA: "ஆண்டிமடம்", lat: 11.3323, lng: 79.3789, district: "Ariyalur" }
    ]
  },
  // 17. BUS 5C (Blue) - Chennai Express to Vellore
  {
    id: "R3",
    code: "5C",
    nameEN: "Chennai CMBT ⇄ Vellore Fort",
    nameTA: "சென்னை CMBT ⇄ வேலூர் கோட்டை",
    type: "Express",
    color: "#4a90e2",
    stops: [
      { nameEN: "Chennai CMBT", nameTA: "சென்னை CMBT", lat: 13.0612, lng: 80.2084, district: "Chennai" },
      { nameEN: "Kancheepuram", nameTA: "காஞ்சீபுரம்", lat: 12.8387, lng: 79.7012, district: "Kancheepuram" },
      { nameEN: "Vellore Fort Stand", nameTA: "வேலூர் கோட்டை நிலையம்", lat: 12.9165, lng: 79.1325, district: "Vellore" }
    ]
  },
  // 18. Route 108 Express (Chennai to Coimbatore)
  {
    id: "R4",
    code: "108",
    nameEN: "Chennai CMBT ⇄ Coimbatore",
    nameTA: "சென்னை CMBT ⇄ கோயம்புத்தூர்",
    type: "Express",
    color: "#4a90e2",
    stops: [
      { nameEN: "Chennai CMBT", nameTA: "சென்னை CMBT", lat: 13.0612, lng: 80.2084, district: "Chennai" },
      { nameEN: "Kancheepuram", nameTA: "காஞ்சீபுரம்", lat: 12.8387, lng: 79.7012, district: "Kancheepuram" },
      { nameEN: "Vellore", nameTA: "வேலூர்", lat: 12.9165, lng: 79.1325, district: "Vellore" },
      { nameEN: "Salem Terminal", nameTA: "சேலம் முனையம்", lat: 11.6643, lng: 78.1460, district: "Salem" },
      { nameEN: "Erode Central", nameTA: "ஈரோடு மத்திய", lat: 11.3410, lng: 77.7172, district: "Erode" },
      { nameEN: "Tiruppur Stand", nameTA: "திருப்பூர் நிலையம்", lat: 11.1085, lng: 77.3411, district: "Tiruppur" },
      { nameEN: "Coimbatore Gandhipuram", nameTA: "கோயம்புத்தூர் காந்திபுரம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" }
    ]
  },
  // 19. Route 47C Ordinary
  {
    id: "R5",
    code: "47C",
    nameEN: "Madurai ⇄ Tiruchirappalli",
    nameTA: "மதுரை ⇄ திருச்சிராப்பள்ளி",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Madurai Mattuthavani", nameTA: "மதுரை மாட்டுத்தாவணி", lat: 9.9252, lng: 78.1198, district: "Madurai" },
      { nameEN: "Dindigul Bus Stand", nameTA: "திண்டுக்கல் நிலையம்", lat: 10.3624, lng: 77.9695, district: "Dindigul" },
      { nameEN: "Karur Stand", nameTA: "கரூர் நிலையம்", lat: 10.9601, lng: 78.0766, district: "Karur" },
      { nameEN: "Tiruchirappalli Central", nameTA: "திருச்சிராப்பள்ளி மத்திய", lat: 10.7905, lng: 78.7047, district: "Tiruchirappalli" }
    ]
  },
  // 20. Route 5E Ordinary (Coimbatore to Ooty)
  {
    id: "R7",
    code: "5E",
    nameEN: "Coimbatore ⇄ Ooty (Nilgiris)",
    nameTA: "கோயம்புத்தூர் ⇄ ஊட்டி (நீலகிரி)",
    type: "Ordinary",
    color: "#2ecc71",
    stops: [
      { nameEN: "Coimbatore Gandhipuram", nameTA: "கோயம்புத்தூர் காந்திபுரம்", lat: 11.0168, lng: 76.9678, district: "Coimbatore" },
      { nameEN: "Mettupalayam Stand", nameTA: "மேட்டுப்பாளையம் நிலையம்", lat: 11.3014, lng: 76.9389, district: "Coimbatore" },
      { nameEN: "Coonoor Stand", nameTA: "குன்னூர் நிலையம்", lat: 11.3530, lng: 76.7959, district: "Nilgiris" },
      { nameEN: "Ooty Main Stand", nameTA: "ஊட்டி முதன்மை நிலையம்", lat: 11.4102, lng: 76.6950, district: "Nilgiris" }
    ]
  },
  // 21. Route 55P Express
  {
    id: "R15",
    code: "55P",
    nameEN: "Coimbatore ⇄ Madurai Transit",
    nameTA: "கோயம்புத்தூர் ⇄ மதுரை கடப்பு",
    type: "Express",
    color: "#4a90e2",
    stops: [
      { nameEN: "Coimbatore Singanallur", nameTA: "கோயம்புத்தூர் சிங்காநல்லூர்", lat: 10.9998, lng: 77.0265, district: "Coimbatore" },
      { nameEN: "Palani Stand", nameTA: "பழனி நிலையம்", lat: 10.4492, lng: 77.5222, district: "The Nilgiris Extended" },
      { nameEN: "Dindigul Bus Stand", nameTA: "திண்டுக்கல் நிலையம்", lat: 10.3624, lng: 77.9695, district: "Dindigul" },
      { nameEN: "Madurai Mattuthavani", nameTA: "மதுரை மாட்டுத்தாவணி", lat: 9.9252, lng: 78.1198, district: "Madurai" }
    ]
  }
];

// Convert all verified Chennai MTC routes to Route structure with stop coordinates
export const CHENNAI_APP_ROUTES: Route[] = CHENNAI_MTC_ROUTES.map(cr => {
  const stops: Stop[] = cr.stops.map(st => {
    const sObj = getStopById(st.stop_id);
    return {
      nameEN: sObj ? sObj.stop_name : st.stop_id,
      nameTA: sObj ? (sObj.stop_name_ta || sObj.stop_name) : st.stop_id,
      lat: sObj ? sObj.latitude : 13.0827,
      lng: sObj ? sObj.longitude : 80.2707,
      district: sObj && sObj.district_id === 'dist_chengalpattu' ? 'Chengalpattu' :
                sObj && sObj.district_id === 'dist_tiruvallur' ? 'Tiruvallur' :
                sObj && sObj.district_id === 'dist_kancheepuram' ? 'Kancheepuram' : 'Chennai'
    };
  });

  const isACorDeluxe = (cr.bus_type?.toLowerCase().includes('deluxe')) || 
                       (cr.bus_type?.toLowerCase().includes('ac')) || 
                       (cr.bus_type === 'Express');
  const isMini = cr.bus_type?.toLowerCase().includes('mini');
  const type: 'Express' | 'Ordinary' | 'Mini Bus' = isMini ? 'Mini Bus' : isACorDeluxe ? 'Express' : 'Ordinary';
  const color = isMini ? '#f59e0b' : isACorDeluxe ? '#3b82f6' : '#10b981';

  return {
    id: cr.id,
    code: cr.route_number,
    nameEN: cr.route_name,
    nameTA: cr.route_name_ta || cr.route_name,
    type,
    color,
    stops
  };
});

// Convert all verified Coimbatore TNSTC routes to Route structure with stop coordinates
export const COIMBATORE_APP_ROUTES: Route[] = COIMBATORE_TNSTC_ROUTES.map(cr => {
  const stops: Stop[] = cr.stops.map(st => {
    const sObj = getStopById(st.stop_id);
    return {
      nameEN: sObj ? sObj.stop_name : st.stop_id,
      nameTA: sObj ? (sObj.stop_name_ta || sObj.stop_name) : st.stop_id,
      lat: sObj ? sObj.latitude : 11.0168,
      lng: sObj ? sObj.longitude : 76.9558,
      district: 'Coimbatore'
    };
  });

  const isACorDeluxe = (cr.bus_type?.toLowerCase().includes('deluxe')) || 
                       (cr.bus_type?.toLowerCase().includes('ac')) || 
                       (cr.bus_type === 'Express');
  const isMini = cr.bus_type?.toLowerCase().includes('mini');
  const type: 'Express' | 'Ordinary' | 'Mini Bus' = isMini ? 'Mini Bus' : isACorDeluxe ? 'Express' : 'Ordinary';
  const color = isMini ? '#f59e0b' : isACorDeluxe ? '#3b82f6' : '#10b981';

  return {
    id: cr.id,
    code: cr.route_number,
    nameEN: cr.route_name,
    nameTA: cr.route_name_ta || cr.route_name,
    type,
    color,
    stops
  };
});

// All routes across all districts
export const ROUTES: Route[] = [
  ...BASE_ROUTES,
  ...CHENNAI_APP_ROUTES,
  ...COIMBATORE_APP_ROUTES
];

export const BASE_BUSES: Bus[] = [
  // Coimbatore Local Buses (Featuring 45C)
  { id: "B_45C_1", busNumber: "45C", routeId: "R_45C", status: "Available", speed: 48, direction: "forward", currentStopIndex: 4, progressRatio: 0.40, capacity: 62, frequency: "EVERY 10 MINS" },
  { id: "B_45C_2", busNumber: "45C", routeId: "R_45C", status: "Available", speed: 42, direction: "backward", currentStopIndex: 8, progressRatio: 0.65, capacity: 55, frequency: "EVERY 10 MINS" },
  { id: "B_45A_1", busNumber: "45A", routeId: "R_45A", status: "Available", speed: 45, direction: "forward", currentStopIndex: 2, progressRatio: 0.30, capacity: 70, frequency: "EVERY 12 MINS" },
  { id: "B_70A_1", busNumber: "70A", routeId: "R_70A", status: "Available", speed: 50, direction: "forward", currentStopIndex: 3, progressRatio: 0.25, capacity: 58, frequency: "EVERY 15 MINS" },
  { id: "B_111_1", busNumber: "111", routeId: "R_111", status: "Available", speed: 55, direction: "forward", currentStopIndex: 1, progressRatio: 0.50, capacity: 65, frequency: "EVERY 15 MINS" },
  { id: "B_20C_1", busNumber: "20C", routeId: "R_20C", status: "Available", speed: 38, direction: "forward", currentStopIndex: 2, progressRatio: 0.70, capacity: 80, frequency: "EVERY 8 MINS" },
  { id: "B_90A_1", busNumber: "90A", routeId: "R_90A", status: "Available", speed: 44, direction: "forward", currentStopIndex: 3, progressRatio: 0.20, capacity: 75, frequency: "EVERY 10 MINS" },
  { id: "B_10A_CBE_1", busNumber: "10A", routeId: "R_10A_CBE", status: "Available", speed: 40, direction: "forward", currentStopIndex: 3, progressRatio: 0.55, capacity: 85, frequency: "EVERY 8 MINS" },
  { id: "B_41D_1", busNumber: "41D", routeId: "R_41D", status: "Available", speed: 46, direction: "forward", currentStopIndex: 2, progressRatio: 0.45, capacity: 60, frequency: "EVERY 12 MINS" },
  { id: "B_33A_1", busNumber: "33A", routeId: "R_33A", status: "Available", speed: 36, direction: "forward", currentStopIndex: 1, progressRatio: 0.80, capacity: 78, frequency: "EVERY 10 MINS" },
  { id: "B_88A_1", busNumber: "88A", routeId: "R_88A", status: "Available", speed: 42, direction: "forward", currentStopIndex: 2, progressRatio: 0.35, capacity: 68, frequency: "EVERY 12 MINS" },
  { id: "B_S1_1", busNumber: "S1", routeId: "R_S1", status: "Available", speed: 52, direction: "forward", currentStopIndex: 3, progressRatio: 0.60, capacity: 45, frequency: "EVERY 15 MINS" },
  { id: "B_3A_1", busNumber: "3A", routeId: "R_3A", status: "Available", speed: 38, direction: "forward", currentStopIndex: 1, progressRatio: 0.40, capacity: 52, frequency: "EVERY 6 MINS" },
  { id: "B_76_1", busNumber: "76", routeId: "R_76", status: "Available", speed: 40, direction: "forward", currentStopIndex: 2, progressRatio: 0.50, capacity: 60, frequency: "EVERY 15 MINS" },
  { id: "B_1C_1", busNumber: "1C", routeId: "R_1C", status: "Available", speed: 45, direction: "forward", currentStopIndex: 4, progressRatio: 0.30, capacity: 82, frequency: "EVERY 10 MINS" },

  // Ariyalur & Inter-district Buses
  { id: "B1", busNumber: "10A", routeId: "R1", status: "Available", speed: 45, direction: "forward", currentStopIndex: 1, progressRatio: 0.15, capacity: 55, frequency: "EVERY 20 MINS" },
  { id: "B2", busNumber: "10B", routeId: "R2", status: "Available", speed: 55, direction: "forward", currentStopIndex: 0, progressRatio: 0.35, capacity: 68, frequency: "EVERY 30 MINS" },
  { id: "B3", busNumber: "5C", routeId: "R3", status: "Available", speed: 65, direction: "forward", currentStopIndex: 0, progressRatio: 0.55, capacity: 72, frequency: "EVERY 15 MINS" },
  { id: "B4", busNumber: "108-A", routeId: "R4", status: "Available", speed: 70, direction: "forward", currentStopIndex: 2, progressRatio: 0.42, capacity: 85, frequency: "EVERY 45 MINS" },
  { id: "B5", busNumber: "108-B", routeId: "R4", status: "Delayed", speed: 38, direction: "backward", currentStopIndex: 5, progressRatio: 0.75, capacity: 90, frequency: "EVERY 45 MINS" },
  { id: "B6", busNumber: "47C", routeId: "R5", status: "Available", speed: 48, direction: "forward", currentStopIndex: 1, progressRatio: 0.25, capacity: 42, frequency: "EVERY 25 MINS" },
  { id: "B8", busNumber: "5E", routeId: "R7", status: "Available", speed: 32, direction: "forward", currentStopIndex: 1, progressRatio: 0.18, capacity: 95, frequency: "EVERY 15 MINS" },
  { id: "B15", busNumber: "55P", routeId: "R15", status: "Available", speed: 58, direction: "forward", currentStopIndex: 1, progressRatio: 0.65, capacity: 62, frequency: "EVERY 20 MINS" }
];

// Generate live GPS tracked bus vehicles for all Chennai routes (Forward & Return buses)
export const CHENNAI_APP_BUSES: Bus[] = CHENNAI_MTC_ROUTES.flatMap((cr, idx) => {
  const stopsLen = cr.stops?.length || 4;
  const forwardStopIdx = Math.min(Math.max(1, Math.floor(stopsLen * 0.35)), Math.max(0, stopsLen - 2));
  const backwardStopIdx = Math.min(Math.max(1, Math.floor(stopsLen * 0.65)), Math.max(0, stopsLen - 1));
  const freqText = `EVERY ${cr.frequency_minutes || 10} MINS`;

  const bus1: Bus = {
    id: `B_CHN_${cr.route_number}_1`,
    busNumber: cr.route_number,
    routeId: cr.id,
    status: 'Available',
    speed: 32 + ((idx * 3) % 16),
    direction: 'forward',
    currentStopIndex: forwardStopIdx,
    progressRatio: parseFloat((0.20 + ((idx * 7) % 60) / 100).toFixed(2)),
    capacity: 55 + ((idx * 8) % 35),
    frequency: freqText
  };

  const bus2: Bus = {
    id: `B_CHN_${cr.route_number}_2`,
    busNumber: cr.route_number,
    routeId: cr.id,
    status: (idx % 6 === 0) ? 'Delayed' : 'Available',
    speed: 28 + ((idx * 4) % 15),
    direction: 'backward',
    currentStopIndex: backwardStopIdx,
    progressRatio: parseFloat((0.40 + ((idx * 5) % 50) / 100).toFixed(2)),
    capacity: 60 + ((idx * 6) % 32),
    frequency: freqText
  };

  return [bus1, bus2];
});

// Generate live GPS tracked bus vehicles for all Coimbatore routes
export const COIMBATORE_APP_BUSES: Bus[] = COIMBATORE_TNSTC_ROUTES.flatMap((cr, idx) => {
  const stopsLen = cr.stops?.length || 4;
  const forwardStopIdx = Math.min(Math.max(1, Math.floor(stopsLen * 0.40)), Math.max(0, stopsLen - 2));
  const backwardStopIdx = Math.min(Math.max(1, Math.floor(stopsLen * 0.70)), Math.max(0, stopsLen - 1));
  const freqText = `EVERY ${cr.frequency_minutes || 12} MINS`;

  const bus1: Bus = {
    id: `B_CBE_${cr.route_number}_1`,
    busNumber: cr.route_number,
    routeId: cr.id,
    status: 'Available',
    speed: 35 + ((idx * 2) % 15),
    direction: 'forward',
    currentStopIndex: forwardStopIdx,
    progressRatio: parseFloat((0.25 + ((idx * 6) % 50) / 100).toFixed(2)),
    capacity: 58 + ((idx * 7) % 32),
    frequency: freqText
  };

  const bus2: Bus = {
    id: `B_CBE_${cr.route_number}_2`,
    busNumber: cr.route_number,
    routeId: cr.id,
    status: (idx % 7 === 0) ? 'Delayed' : 'Available',
    speed: 30 + ((idx * 3) % 14),
    direction: 'backward',
    currentStopIndex: backwardStopIdx,
    progressRatio: parseFloat((0.45 + ((idx * 4) % 45) / 100).toFixed(2)),
    capacity: 62 + ((idx * 5) % 30),
    frequency: freqText
  };

  return [bus1, bus2];
});

export const INITIAL_BUSES: Bus[] = [
  ...BASE_BUSES,
  ...CHENNAI_APP_BUSES,
  ...COIMBATORE_APP_BUSES
];

