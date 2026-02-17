import { writable, derived } from 'svelte/store';

export const locales = [
  { code: 'en', name: 'English', label: 'English' },
  { code: 'ta', name: 'Tamil', label: 'தமிழ்' },
  { code: 'si', name: 'Sinhala', label: 'සිංහල' }
];

export const locale = writable('en');

const translations = {
  en: {
    common: {
      submit_btn: "Submit Census Data",
      submitting: "Submitting...",
      review_msg: "Please review all sections before submitting.",
      select: "Select...",
      rs: "Rs.",
      optional: "Optional"
    },
    header: {
      title: "Census Data Entry",
      subtitle: "Family & household information form",
      toggle_theme: "Toggle theme"
    },
    sections: {
      location: "Location Details",
      location_desc: "GS Division, village, and address information",
      payment: "Payment Information",
      payment_desc: "Monthly payment and subsidy details",
      property: "Property Details",
      property_desc: "House and land measurements",
      family: "Family Members",
      family_desc: "Add all members of the household"
    },
    fields: {
      gs_division: "GS Division",
      gs_division_placeholder: "Enter GS Division",
      village: "Village",
      village_placeholder: "Enter village name",
      address: "Address",
      address_placeholder: "Enter full address",
      whatsapp: "WhatsApp Number",
      whatsapp_desc: "Include country code for WhatsApp contact",
      
      samurdhi: "Samurdhi Payment",
      elders: "Elders Payment",
      disease: "Disease Payment",
      monthly: "Monthly Payment",
      
      house_dims: "House Dimensions",
      land_dims: "Land Dimensions",
      land_size: "Land Size",
      length: "Length (ft)",
      width: "Width (ft)",
      size: "Size",
      unit: "Unit",
      select_unit: "Select unit",
      special_needs: "Special Needs Member Details",
      special_needs_placeholder: "Enter details about family members with special needs (if any)",
      special_needs_desc: "Leave blank if not applicable",
      
      full_name: "Full Name",
      full_name_placeholder: "Enter full name",
      nic: "NIC Number",
      relationship: "Relationship",
      gender: "Gender",
      dob: "Date of Birth",
      education: "Education Level",
      occupation: "Occupation",
      phone: "Telephone Number",
      
      add_member: "Add Member",
      add_first_member: "Add First Member",
      remove_member: "Remove",
      no_members: "No family members added",
      start_adding: "Click \"Add Member\" to start adding family members",
      member_label: "Member",
      added_suffix: "added"
    },
    options: {
      units: {
        perches: "Perches",
        acres: "Acres",
        hectares: "Hectares",
        square_meters: "Square Meters",
        square_feet: "Square Feet"
      },
      gender: {
        male: "Male",
        female: "Female",
        other: "Other"
      },
      relationship: {
        head: "Head of Household",
        spouse: "Spouse",
        son: "Son",
        daughter: "Daughter",
        father: "Father",
        mother: "Mother",
        brother: "Brother",
        sister: "Sister",
        grandfather: "Grandfather",
        grandmother: "Grandmother",
        uncle: "Uncle",
        aunt: "Aunt",
        nephew: "Nephew",
        niece: "Niece",
        other: "Other"
      },
      education: {
        no_education: "No Formal Education",
        primary: "Primary (Grade 1-5)",
        junior_secondary: "Junior Secondary (Grade 6-9)",
        senior_secondary: "Senior Secondary (Grade 10-11)",
        gce_ol: "GCE O/L",
        gce_al: "GCE A/L",
        diploma: "Diploma",
        bachelors: "Bachelor's Degree",
        masters: "Master's Degree",
        doctorate: "Doctorate",
        other: "Other"
      },
      occupation: {
        unemployed: "Unemployed",
        government: "Government Employee",
        private: "Private Sector Employee",
        self_employed: "Self-Employed",
        student: "Student",
        retired: "Retired",
        semi_government: "Semi-Government Employee",
        other: "Other"
      }
    }
  },
  ta: {
    common: {
      submit_btn: "மக்கள் தொகை தரவைச் சமர்ப்பிக்கவும்",
      submitting: "சமர்ப்பிக்கப்படுகிறது...",
      review_msg: "சமர்ப்பிப்பதற்கு முன் அனைத்து பிரிவுகளையும் மதிப்பாய்வு செய்யவும்.",
      select: "தேர்ந்தெடு...",
      rs: "ரூ.",
      optional: "விருப்பத் தேர்வு"
    },
    header: {
      title: "மக்கள் தொகை தரவு உள்ளீடு",
      subtitle: "குடும்பம் மற்றும் வீட்டுத் தகவல் படிவம்",
      toggle_theme: "தீமை மாற்றவும்"
    },
    sections: {
      location: "இருப்பிட விவரங்கள்",
      location_desc: "கிராம சேவகர் பிரிவு, கிராமம் மற்றும் முகவரி தகவல்கள்",
      payment: "கொடுப்பனவுத் தகவல்கள்",
      payment_desc: "மாதாந்திர கொடுப்பனவு மற்றும் மானிய விவரங்கள்",
      property: "சொத்து விவரங்கள்",
      property_desc: "வீடு மற்றும் நில அளவீடுகள்",
      family: "குடும்ப உறுப்பினர்கள்",
      family_desc: "வீட்டின் அனைத்து உறுப்பினர்களையும் சேர்க்கவும்"
    },
    fields: {
      gs_division: "கிராம சேவகர் பிரிவு",
      gs_division_placeholder: "கிராம சேவகர் பிரிவை உள்ளிடவும்",
      village: "கிராமம்",
      village_placeholder: "கிராமத்தின் பெயரை உள்ளிடவும்",
      address: "முகவரி",
      address_placeholder: "முழு முகவரியை உள்ளிடவும்",
      whatsapp: "வாட்ஸ்அப் எண்",
      whatsapp_desc: "வாட்ஸ்அப் தொடர்புக்கான நாட்டின் குறியீட்டைச் சேர்க்கவும்",
      
      samurdhi: "சமுர்த்தி கொடுப்பனவு",
      elders: "முதியோர் கொடுப்பனவு",
      disease: "நோய் நிவாரணக் கொடுப்பனவு",
      monthly: "மாதாந்திர கொடுப்பனவு",
      
      house_dims: "வீட்டின் பரிமாணங்கள்",
      land_dims: "நிலத்தின் பரிமாணங்கள்",
      land_size: "நிலத்தின் அளவு",
      length: "நீளம் (அடி)",
      width: "அகலம் (அடி)",
      size: "அளவு",
      unit: "அலகு",
      select_unit: "அலகைத் தேர்ந்தெடுக்கவும்",
      special_needs: "சிறப்புத் தேவை உறுப்பினர் விவரங்கள்",
      special_needs_placeholder: "சிறப்புத் தேவைகள் உள்ள குடும்ப உறுப்பினர்கள் பற்றிய விவரங்களை உள்ளிடவும் (ஏதேனும் இருப்பின்)",
      special_needs_desc: "பொருந்தவில்லை என்றால் வெற்றிடமாக விடவும்",
      
      full_name: "முழுப் பெயர்",
      full_name_placeholder: "முழுப் பெயரை உள்ளிடவும்",
      nic: "தேசிய அடையாள அட்டை எண்",
      relationship: "உறவுமுறை",
      gender: "பாலினம்",
      dob: "பிறந்த தேதி",
      education: "கல்வித் தகுதி",
      occupation: "தொழில்",
      phone: "தொலைபேசி எண்",
      
      add_member: "உறுப்பினரைச் சேர்",
      add_first_member: "முதல் உறுப்பினரைச் சேர்",
      remove_member: "அகற்று",
      no_members: "குடும்ப உறுப்பினர்கள் யாரும் சேர்க்கப்படவில்லை",
      start_adding: "குடும்ப உறுப்பினர்களைச் சேர்க்க 'உறுப்பினரைச் சேர்' என்பதைக் கிளிக் செய்யவும்",
      member_label: "உறுப்பினர்",
      added_suffix: "சேர்க்கப்பட்டது"
    },
    options: {
      units: {
        perches: "பேர்சஸ் (Perches)",
        acres: "ஏக்கர் (Acres)",
        hectares: "ஹெக்டேர் (Hectares)",
        square_meters: "சதுர மீட்டர்கள்",
        square_feet: "சதுர அடிகள்"
      },
      gender: {
        male: "ஆண்",
        female: "பெண்",
        other: "பிற"
      },
      relationship: {
        head: "குடும்பத் தலைவர்",
        spouse: "வாழ்க்கைத் துணை",
        son: "மகன்",
        daughter: "மகள்",
        father: "தந்தை",
        mother: "தாய்",
        brother: "சகோதரன்",
        sister: "சகோதரி",
        grandfather: "தாத்தா",
        grandmother: "பாட்டி",
        uncle: "மாமா/சித்தப்பா/பெரியப்பா",
        aunt: "அத்தை/சித்தி/பெரியம்மா",
        nephew: "மருமகன்",
        niece: "மருமகள்",
        other: "பிற"
      },
      education: {
        no_education: "முறைசாரா கல்வி இல்லை",
        primary: "ஆரம்பக் கல்வி (தரம் 1-5)",
        junior_secondary: "இளநிலை இடைநிலைக் கல்வி (தரம் 6-9)",
        senior_secondary: "முதுநிலை இடைநிலைக் கல்வி (தரம் 10-11)",
        gce_ol: "க.பொ.த சா/த (O/L)",
        gce_al: "க.பொ.த உ/த (A/L)",
        diploma: "டிப்ளமோ",
        bachelors: "இளங்கலை பட்டம்",
        masters: "முதுகலை பட்டம்",
        doctorate: "முனைவர் பட்டம்",
        other: "பிற"
      },
      occupation: {
        unemployed: "வேலையில்லாதவர்",
        government: "அரசு ஊழியர்",
        private: "தனியார் துறை ஊழியர்",
        self_employed: "சுயதொழில்",
        student: "மாணவர்",
        retired: "ஓய்வுபெற்றவர்",
        semi_government: "அரை-அரசு ஊழியர்",
        other: "பிற"
      }
    }
  },
  si: {
    common: {
      submit_btn: "ජන සංගණන දත්ත ඉදිරිපත් කරන්න",
      submitting: "ඉදිරිපත් කරමින්...",
      review_msg: "කරුණාකර ඉදිරිපත් කිරීමට පෙර සියලුම කොටස් සමාලෝචනය කරන්න.",
      select: "තෝරන්න...",
      rs: "රු.",
      optional: "විකල්ප"
    },
    header: {
      title: "ජන සංගණන දත්ත ඇතුළත් කිරීම",
      subtitle: "පවුල් හා ගෘහස්ථ තොරතුරු පෝරමය",
      toggle_theme: "තේමාව මාරු කරන්න"
    },
    sections: {
      location: "ස්ථාන විස්තර",
      location_desc: "ග්‍රාම නිලධාරී වසම, ගම සහ ලිපිනය පිළිබඳ තොරතුරු",
      payment: "ගෙවීම් තොරතුරු",
      payment_desc: "මාසික ගෙවීම් සහ සහනාධාර විස්තර",
      property: "දේපල විස්තර",
      property_desc: "නිවාස සහ ඉඩම් මිනුම්",
      family: "පවුලේ සාමාජිකයන්",
      family_desc: "නිවසේ සියලුම සාමාජිකයින් ඇතුළත් කරන්න"
    },
    fields: {
      gs_division: "ග්‍රාම නිලධාරී වසම",
      gs_division_placeholder: "ග්‍රාම නිලධාරී වසම ඇතුළත් කරන්න",
      village: "ගම",
      village_placeholder: "ගමේ නම ඇතුළත් කරන්න",
      address: "ලිපිනය",
      address_placeholder: "සම්පූර්ණ ලිපිනය ඇතුළත් කරන්න",
      whatsapp: "ව්ට්ස්ඇප් අංකය",
      whatsapp_desc: "ව්ට්ස්ඇප් සම්බන්ධතා සඳහා රටේ කේතය ඇතුළත් කරන්න",
      
      samurdhi: "සමෘද්ධි ගෙවීම",
      elders: "වැඩිහිටි දීමනාව",
      disease: "රෝගී දීමනාව",
      monthly: "මාසික ගෙවීම",
      
      house_dims: "නිවාස මානයන්",
      land_dims: "ඉඩම් මානයන්",
      land_size: "ඉඩම් ප්‍රමාණය",
      length: "දිග (අඩි)",
      width: "පළල (අඩි)",
      size: "ප්‍රමාණය",
      unit: "ඒකකය",
      select_unit: "ඒකකය තෝරන්න",
      special_needs: "විශේෂ අවශ්‍යතා සහිත සාමාජික විස්තර",
      special_needs_placeholder: "විශේෂ අවශ්‍යතා සහිත පවුලේ සාමාජිකයන්ගේ විස්තර ඇතුළත් කරන්න (ඇත්නම්)",
      special_needs_desc: "අදාළ නොවේ නම් හිස්ව තබන්න",
      
      full_name: "සම්පූර්ණ නම",
      full_name_placeholder: "සම්පූර්ණ නම ඇතුළත් කරන්න",
      nic: "ජාතික හැඳුනුම්පත් අංකය",
      relationship: "සබඳතාව",
      gender: "ස්ත්‍රී/පුරුෂ භාවය",
      dob: "උපන් දිනය",
      education: "අධ්‍යාපන මට්ටම",
      occupation: "රැකියාව",
      phone: "දුරකථන අංකය",
      
      add_member: "සාමාජිකයෙකු එක් කරන්න",
      add_first_member: "පළමු සාමාජිකයා එක් කරන්න",
      remove_member: "ඉවත් කරන්න",
      no_members: "පවුලේ සාමාජිකයින් කිසිවෙකු ඇතුළත් කර නොමැත",
      start_adding: "පවුලේ සාමාජිකයින් ඇතුළත් කිරීම ආරම්භ කිරීමට 'සාමාජිකයෙකු එක් කරන්න' ක්ලික් කරන්න",
      member_label: "සාමාජික",
      added_suffix: "එක් කරන ලදී"
    },
    options: {
      units: {
        perches: "පර්චස්",
        acres: "අක්කර",
        hectares: "හෙක්ටයාර",
        square_meters: "වර්ග මීටර",
        square_feet: "වර්ග අඩි"
      },
      gender: {
        male: "පුරුෂ",
        female: "ස්ත්‍රී",
        other: "වෙනත්"
      },
      relationship: {
        head: "ගෘහ මූලිකයා",
        spouse: "කලත්‍රයා",
        son: "පුතා",
        daughter: "දියණිය",
        father: "පියා",
        mother: "මව",
        brother: "සහෝදරයා",
        sister: "සහෝදරිය",
        grandfather: "සීයා",
        grandmother: "ආච්චි",
        uncle: "මාමා/බාප්පා",
        aunt: "නැන්දා/පුංචි අම්මා",
        nephew: "බෑණා",
        niece: "ලේලිය",
        other: "වෙනත්"
      },
      education: {
        no_education: "විධිමත් අධ්‍යාපනයක් නොමැත",
        primary: "ප්‍රාථමික (1-5 ශ්‍රේණි)",
        junior_secondary: "කණිෂ්ඨ ද්විතීයික (6-9 ශ්‍රේණි)",
        senior_secondary: "ජ්‍යෙෂ්ඨ ද්විතීයික (10-11 ශ්‍රේණි)",
        gce_ol: "අ.පො.ස සා/පෙළ",
        gce_al: "අ.පො.ස උ/පෙළ",
        diploma: "ඩිප්ලෝමා",
        bachelors: "උපාධිය",
        masters: "පශ්චාත් උපාධිය",
        doctorate: "ආචාර්ය උපාධිය",
        other: "වෙනත්"
      },
      occupation: {
        unemployed: "රැකියා විරහිත",
        government: "රජයේ සේවක",
        private: "පෞද්ගලික අංශයේ සේවක",
        self_employed: "ස්වයං රැකියා",
        student: "ශිෂ්‍ය",
        retired: "විශ්‍රාමික",
        semi_government: "අර්ධ රාජ්‍ය සේවක",
        other: "වෙනත්"
      }
    }
  }
};

function getValue(obj: any, key: string) {
  const keys = key.split('.');
  let value = obj;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return null;
    }
  }
  return value;
}

export const t = derived(locale, ($locale) => (key: string) => {
  const value = getValue(translations[$locale as keyof typeof translations], key);
  if (value) return value;
  
  // Fallback to English if not found in current locale
  const fallbackValue = getValue(translations['en'], key);
  return fallbackValue || key;
});
