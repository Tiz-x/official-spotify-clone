// Burna Boy
import lastlast from "../Assets/images/lastlast.jpeg";
// import burna from "../Assets/images/burna.jpeg"
// import ye from "../Assets/images/thumbnail/1001424005.png";
import burnaboy from "../Assets/images/thumbnail/jj.jpg";
import burnaboyImage from "../Assets/images/thumbnail/bh.jpg";

// Wizkid
import wizzy from "../Assets/images/thumbnail/1001424034.png";
import wizzyPic from "../Assets/images/thumbnail/1001424029.png";
import wizzkid from "../Assets/images/thumbnail/1001424159.png";

// Davido
import DavidoFall from "../Assets/images/thumbnail/1001424109.png";
import DavidoIf from "../Assets/images/thumbnail/1001424118.png";
import Davido from "../Assets/images/thumbnail/1001424124.png";

// Asake
import Asake from "../Assets/images/thumbnail/1001424127.png";

// Rema
import rema from "../Assets/images/thumbnail/1001424171.png";
import remaa from "../Assets/images/thumbnail/1001424178.png";
import remaaa from "../Assets/images/thumbnail/1001424188.png";

// Tems
import tems from "../Assets/images/thumbnail/1001424192.png";

// Omahlay
import dj from "../Assets/images/thumbnail/1001424099.png";
import omahlay from "../Assets/images/thumbnail/1001424201.png";
import omah from "../Assets/images/thumbnail/1001424209.png";
import ayra from "../Assets/images/thumbnail/ayra.jpg";
import seyi from "../Assets/images/thumbnail/seyi.jpg";

// ckay
import ckay from "../Assets/images/thumbnail/1001424265.png"
import ck from "../Assets/images/thumbnail/1001424271.png"

// FireBoy
import fireboy from "../Assets/images/thumbnail/1001424280.png"

// KizzDanieal
import kizz from "../Assets/images/thumbnail/kizzDaniel.jpg"

// Tiwa Savage
import tiwa from "../Assets/images/thumbnail/1001424253.png"
import tiwasavage from "../Assets/images/thumbnail/1001424259.png"

// Track
import type { Track } from "../context/PlayerContext";

export const NIGERIAN_TRACKS: Track[] = [
  // ============================================
  // BURNA BOY
  // ============================================
  {
    id: "burna-last-last",
    title: "Last Last",
    artist: "Burna Boy",
    audioUrl: "/audio/nigerian/BurnaBoy/Burna_Boy_last-last.mp3",
    image: lastlast,
    duration: 163,
    album: "Love, Damini",
  },
  {
    id: "burna-on-the-low",
    title: "City Boys",
    artist: "Burna Boy",
    audioUrl: "/audio/nigerian/BurnaBoy/Burna_Boy_City_Boys(128k).mp3",
    image: burnaboy,
    duration: 229,
    album: "African Giant",
  },
  {
    id: "burna-ye",
    title: "I Told Them",
    artist: "Burna Boy",
    audioUrl: "/audio/nigerian/BurnaBoy/Burna_Boy_I_Told_Them(128k).mp3",
    image: burnaboyImage,
    duration: 247,
    album: "Outside",
  },

  // ============================================
  // WIZKID
  // ============================================
  {
    id: "wizkid-essence",
    title: "Essence",
    artist: "Wizkid ft. Tems",
    audioUrl: "/audio/nigerian/wizkid/Wizkid_Essence.mp3",
    image: wizzy,
    duration: 244,
    album: "Made In Lagos",
  },
  {
    id: "wizkid-joro",
    title: "Kai",
    artist: "Wizkid",
    audioUrl: "/audio/nigerian/wizkid/Wizkid_Kai.mp3",
    image: wizzkid,
    duration: 202,
    album: "Made In Lagos",
  },
  {
    id: "wizkid-ojuelegba",
    title: "Ojuelegba",
    artist: "Wizkid",
    audioUrl: "/audio/nigerian/wizkid/Wizkid_Ojuelegba(128k).mp3",
    image: wizzyPic,
    duration: 235,
    album: "Ayo",
  },

  // ============================================
  // DAVIDO
  // ============================================
  {
    id: "davido-fall",
    title: "Fall",
    artist: "Davido",
    audioUrl: "/audio/nigerian/Davido/davido_Fall(128k).mp3",
    image: DavidoFall,
    duration: 219,
    album: "A Good Time",
  },
  {
    id: "davido-if",
    title: "If",
    artist: "Davido",
    audioUrl: "/audio/nigerian/Davido/davido_If(128k).mp3",
    image: DavidoIf,
    duration: 248,
    album: "A Good Time",
  },
  {
    id: "davido-unavailable",
    title: "Unavailable",
    artist: "Davido ft. Musa Keys",
    audioUrl: "/audio/nigerian/Davido/davido_UNAVAILABLE(128k).mp3",
    image: Davido,
    duration: 201,
    album: "Timeless",
  },

  // ============================================
  // ASAKE
  // ============================================
  {
    id: "asake-sungba",
    title: "Sungba",
    artist: "Asake ft. Burna Boy",
    audioUrl: "/audio/nigerian/Asake/Asake_Sungba__Remix_(128k).mp3",
    image: Asake,
    duration: 177,
    album: "Mr Money With The Vibe",
  },
  {
    id: "asake-terminator",
    title: "Terminator",
    artist: "Asake",
    audioUrl: "/audio/nigerian/Asake/Asake_Terminator(128k).mp3",
    image: Asake,
    duration: 198,
    album: "Mr Money With The Vibe",
  },
  {
    id: "asake-organise",
    title: "Organise",
    artist: "Asake",
    audioUrl: "/audio/nigerian/Asake/Asake_Organise(128k).mp3",
    image: Asake,
    duration: 210,
    album: "Mr Money With The Vibe",
  },

  // ============================================
  // REMA
  // ============================================
  {
    id: "rema-calm-down",
    title: "Azaman",
    artist: "Rema",
    audioUrl: "/audio/nigerian/Rema/Rema_AZAMAN(128k).mp3",
    image: rema,
    duration: 239,
    album: "Rave & Roses",
  },
  {
    id: "rema-dumebi",
    title: "March Am",
    artist: "Rema",
    audioUrl: "/audio/nigerian/Rema/Rema_MARCH_AM(128k).mp3",
    image: remaa,
    duration: 212,
    album: "Rema",
  },
  {
    id: "rema-soundgasm",
    title: "Ozeba",
    artist: "Rema",
    audioUrl: "/audio/nigerian/Rema/Rema_OZEBA(128k).mp3",
    image: remaaa,
    duration: 188,
    album: "Rave & Roses",
  },

  // ============================================
  // TEMS
  // ============================================
  {
    id: "tems-free-mind",
    title: "Me U",
    artist: "Tems",
    audioUrl: "/audio/nigerian/tems/tems_Me___U(128k).mp3",
    image: tems,
    duration: 266,
    album: "If Orange Was A Place",
  },
  {
    id: "tems-damages",
    title: "Love Me Jeje",
    artist: "Tems",
    audioUrl: "/audio/nigerian/tems/tems_Love_Me_JeJe(128k).mp3",
    image: tems,
    duration: 199,
    album: "For Broken Ears",
  },

  // ============================================
  // OMAH LAY
  // ============================================
  {
    id: "omah-godly",
    title: "Holy Ghost",
    artist: "Dj Khaleed",
    audioUrl: "/audio/nigerian/DjKhaleed/DjKhaleed_I_m_the_One(128k).mp3",
    image: dj,
    duration: 174,
    album: "Get Layd",
  },

  // ============================================
  // CKAY
  // ============================================
  {
    id: "ckay-love-nwantiti",
    title: "Body",
    artist: "Mavo ft. CKay",
    audioUrl: "/audio/nigerian/Ckay/ckay_BODY__danz_(128k).mp3",
    image: ckay,
    duration: 129,
    album: "CKay The First",
  },
  {
    id: "ckay-emiliana",
    title: "Forever",
    artist: "CKay",
    audioUrl: "/audio/nigerian/Ckay/ckay_forever(128k).mp3",
    image: ck,
    duration: 197,
    album: "Sad Romance",
  },

  // ============================================
  // FIREBOY DML
  // ============================================
  {
    id: "fireboy-peru",
    title: "Peru",
    artist: "Fireboy DML ft. Ed Sheeran",
    audioUrl: "/audio/nigerian/fireboy/fireboy_Peru(128k).mp3",
    image: fireboy,
    duration: 192,
    album: "Playboy",
  },

   {
    id: "burna-time-flies",  
    title: "Man of the year",
    artist: "Seyi Vibez",
    audioUrl: "/audio/nigerian/seyivibez/seyi_vibez_.mp3",
    image: seyi,
    duration: 192,
    album: "Boy Alone",
  },
  {
    id: "wizkid-understand",  
    title: "Rush",
    artist: "Ayra Star",
    audioUrl: "/audio/nigerian/AyraStar/AyraStar_Rush(128k).mp3",
    image: ayra,
    duration: 192,
    album: "Boy Alone",
  },
  {
    id: "omah-understand", 
    title: "Soso",
    artist: "Omah Lay",
    audioUrl: "/audio/nigerian/omahlay/omahlay_soso(128k).mp3",
    image: omahlay,
    duration: 192,
    album: "Boy Alone",
  },
  
  {
    id: "fireboy-bandana",
    title: "Holy Ghost",
    artist: "Fireboy DML ft. Asake",
    audioUrl: "/audio/nigerian/omahlay/omahlay_Holy_Ghost(128k).mp3",
    image: omah,
    album: "Playboy",
  },

  // ============================================
  // KIZZ DANIEL
  // ============================================
  {
    id: "kizz-buga",
    title: "Buga",
    artist: "Kizz Daniel ft. Tekno",
    audioUrl: "/audio/nigerian/kizzdaniel/kizzDaniel_Buga.mp3",
    image: kizz,
    duration: 175,
    album: "Buga",
  },
  {
    id: "kizz-cough",
    title: "Cough",
    artist: "Kizz Daniel",
    audioUrl: "/audio/nigerian/kizzdaniel/kizzDaniel_Cough__Odo_(128k).mp3",
    image: kizz,
    duration: 204,
    album: "Maverick",
  },

  // ============================================
  // TIWA SAVAGE
  // ============================================
  {
    id: "tiwa-somebody-son",
    title: "Somebody Son",
    artist: "Tiwa Savage ft. Brandy",
    audioUrl: "/audio/nigerian/TiwaSavage/tiwasavage_Somebody’s_Son(128k).mp3",
    image: tiwa,
    duration: 221,
    album: "Water & Garri",
  },
  {
    id: "tiwa-koroba",
    title: "Koroba",
    artist: "Tiwa Savage",
    audioUrl: "/audio/nigerian/TiwaSavage/tiwasavage_Koroba(128k).mp3",
    image: tiwasavage,
    album: "Celia",
  },
];
