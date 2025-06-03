export interface LocationData {
    country: string;
    cities: City[];
    states: State[];
    currency: string;
}

export interface City {
    city: string;
}

export interface State {
    state: string;
}

export interface Continents {
    continent: string;
}

export const ContinentData: Continents[] = [
    {
        continent: 'Asia',
    },
    {
        continent: 'Europe',
    },
    {
        continent: 'Africa',
    },
    {
        continent: 'Australia',
    },
    {
        continent: 'North America',
    },
    {
        continent: 'South America',
    }
]

export const locationData: LocationData[] = [
    {
      "country": "Afghanistan",
      "cities": [
        {
          "city": "Herat, Afghanistan"
        },
        {
          "city": "Kabul, Afghanistan"
        },
        {
          "city": "Kandahar, Afghanistan"
        },
        {
          "city": "Molah, Afghanistan"
        },
        {
          "city": "Rana, Afghanistan"
        },
        {
          "city": "Shar, Afghanistan"
        },
        {
          "city": "Sharif, Afghanistan"
        },
        {
          "city": "Wazir Akbar Khan, Afghanistan"
        }
      ],
      "states": [
        {
          "state": "Badakhshan, Afghanistan"
        },
        {
          "state": "Badghis, Afghanistan"
        },
        {
          "state": "Baghlan, Afghanistan"
        },
        {
          "state": "Balkh, Afghanistan"
        },
        {
          "state": "Bamyan, Afghanistan"
        },
        {
          "state": "Daykundi, Afghanistan"
        },
        {
          "state": "Farah, Afghanistan"
        },
        {
          "state": "Faryab, Afghanistan"
        },
        {
          "state": "Ghazni, Afghanistan"
        },
        {
          "state": "Gh\u014dr, Afghanistan"
        },
        {
          "state": "Helmand, Afghanistan"
        },
        {
          "state": "Herat, Afghanistan"
        },
        {
          "state": "Jowzjan, Afghanistan"
        },
        {
          "state": "Kabul, Afghanistan"
        },
        {
          "state": "Kandahar, Afghanistan"
        },
        {
          "state": "Kapisa, Afghanistan"
        },
        {
          "state": "Khost, Afghanistan"
        },
        {
          "state": "Kunar, Afghanistan"
        },
        {
          "state": "Kunduz Province, Afghanistan"
        },
        {
          "state": "Laghman, Afghanistan"
        },
        {
          "state": "Logar, Afghanistan"
        },
        {
          "state": "Nangarhar, Afghanistan"
        },
        {
          "state": "Nimruz, Afghanistan"
        },
        {
          "state": "Nuristan, Afghanistan"
        },
        {
          "state": "Paktia, Afghanistan"
        },
        {
          "state": "Paktika, Afghanistan"
        },
        {
          "state": "Panjshir, Afghanistan"
        },
        {
          "state": "Parwan, Afghanistan"
        },
        {
          "state": "Samangan, Afghanistan"
        },
        {
          "state": "Sar-e Pol, Afghanistan"
        },
        {
          "state": "Takhar, Afghanistan"
        },
        {
          "state": "Urozgan, Afghanistan"
        },
        {
          "state": "Zabul, Afghanistan"
        }
      ],
      "currency": "AFN"
    },
    {
      "country": "Albania",
      "cities": [
        {
          "city": "Elbasan, Albania"
        },
        {
          "city": "Petran, Albania"
        },
        {
          "city": "Pogradec, Albania"
        },
        {
          "city": "Shkoder, Albania"
        },
        {
          "city": "Tirana, Albania"
        },
        {
          "city": "Ura Vajgurore, Albania"
        }
      ],
      "states": [
        {
          "state": "Berat County, Albania"
        },
        {
          "state": "Berat District, Albania"
        },
        {
          "state": "Bulqiz\u00eb District, Albania"
        },
        {
          "state": "Delvin\u00eb District, Albania"
        },
        {
          "state": "Devoll District, Albania"
        },
        {
          "state": "Dib\u00ebr County, Albania"
        },
        {
          "state": "Dib\u00ebr District, Albania"
        },
        {
          "state": "Durr\u00ebs County, Albania"
        },
        {
          "state": "Durr\u00ebs District, Albania"
        },
        {
          "state": "Elbasan County, Albania"
        },
        {
          "state": "Fier County, Albania"
        },
        {
          "state": "Fier District, Albania"
        },
        {
          "state": "Gjirokast\u00ebr County, Albania"
        },
        {
          "state": "Gjirokast\u00ebr District, Albania"
        },
        {
          "state": "Gramsh District, Albania"
        },
        {
          "state": "Has District, Albania"
        },
        {
          "state": "Kavaj\u00eb District, Albania"
        },
        {
          "state": "Kolonj\u00eb District, Albania"
        },
        {
          "state": "Kor\u00e7\u00eb County, Albania"
        },
        {
          "state": "Kor\u00e7\u00eb District, Albania"
        },
        {
          "state": "Kruj\u00eb District, Albania"
        },
        {
          "state": "Ku\u00e7ov\u00eb District, Albania"
        },
        {
          "state": "Kuk\u00ebs County, Albania"
        },
        {
          "state": "Kuk\u00ebs District, Albania"
        },
        {
          "state": "Kurbin District, Albania"
        },
        {
          "state": "Lezh\u00eb County, Albania"
        },
        {
          "state": "Lezh\u00eb District, Albania"
        },
        {
          "state": "Librazhd District, Albania"
        },
        {
          "state": "Lushnj\u00eb District, Albania"
        },
        {
          "state": "Mal\u00ebsi e Madhe District, Albania"
        },
        {
          "state": "Mallakast\u00ebr District, Albania"
        },
        {
          "state": "Mat District, Albania"
        },
        {
          "state": "Mirdit\u00eb District, Albania"
        },
        {
          "state": "Peqin District, Albania"
        },
        {
          "state": "P\u00ebrmet District, Albania"
        },
        {
          "state": "Pogradec District, Albania"
        },
        {
          "state": "Puk\u00eb District, Albania"
        },
        {
          "state": "Sarand\u00eb District, Albania"
        },
        {
          "state": "Shkod\u00ebr County, Albania"
        },
        {
          "state": "Shkod\u00ebr District, Albania"
        },
        {
          "state": "Skrapar District, Albania"
        },
        {
          "state": "Tepelen\u00eb District, Albania"
        },
        {
          "state": "Tirana County, Albania"
        },
        {
          "state": "Tirana District, Albania"
        },
        {
          "state": "Tropoj\u00eb District, Albania"
        },
        {
          "state": "Vlor\u00eb County, Albania"
        },
        {
          "state": "Vlor\u00eb District, Albania"
        }
      ],
      "currency": "ALL"
    },
    {
      "country": "Algeria",
      "cities": [
        {
          "city": "Algiers, Algeria"
        },
        {
          "city": "Annaba, Algeria"
        },
        {
          "city": "Azazga, Algeria"
        },
        {
          "city": "Batna City, Algeria"
        },
        {
          "city": "Blida, Algeria"
        },
        {
          "city": "Bordj, Algeria"
        },
        {
          "city": "Bordj Bou Arreridj, Algeria"
        },
        {
          "city": "Bougara, Algeria"
        },
        {
          "city": "Cheraga, Algeria"
        },
        {
          "city": "Chlef, Algeria"
        },
        {
          "city": "Constantine, Algeria"
        },
        {
          "city": "Djelfa, Algeria"
        },
        {
          "city": "Draria, Algeria"
        },
        {
          "city": "El Tarf, Algeria"
        },
        {
          "city": "Hussein Dey, Algeria"
        },
        {
          "city": "Illizi, Algeria"
        },
        {
          "city": "Jijel, Algeria"
        },
        {
          "city": "Kouba, Algeria"
        },
        {
          "city": "Laghouat, Algeria"
        },
        {
          "city": "Oran, Algeria"
        },
        {
          "city": "Ouargla, Algeria"
        },
        {
          "city": "Oued Smar, Algeria"
        },
        {
          "city": "Relizane, Algeria"
        },
        {
          "city": "Rouiba, Algeria"
        },
        {
          "city": "Saida, Algeria"
        },
        {
          "city": "Souk Ahras, Algeria"
        },
        {
          "city": "Tamanghasset, Algeria"
        },
        {
          "city": "Tiaret, Algeria"
        },
        {
          "city": "Tissemsilt, Algeria"
        },
        {
          "city": "Tizi, Algeria"
        },
        {
          "city": "Tizi Ouzou, Algeria"
        },
        {
          "city": "Tlemcen, Algeria"
        }
      ],
      "states": [
        {
          "state": "Adrar Province, Algeria"
        },
        {
          "state": "A\u00efn Defla Province, Algeria"
        },
        {
          "state": "A\u00efn T\u00e9mouchent Province, Algeria"
        },
        {
          "state": "Algiers Province, Algeria"
        },
        {
          "state": "Annaba Province, Algeria"
        },
        {
          "state": "Batna Province, Algeria"
        },
        {
          "state": "B\u00e9char Province, Algeria"
        },
        {
          "state": "B\u00e9ja\u00efa Province, Algeria"
        },
        {
          "state": "Biskra, Algeria"
        },
        {
          "state": "Blida Province, Algeria"
        },
        {
          "state": "Bordj Bou Arr\u00e9ridj Province, Algeria"
        },
        {
          "state": "Bou\u00efra Province, Algeria"
        },
        {
          "state": "Boumerd\u00e8s Province, Algeria"
        },
        {
          "state": "Chlef Province, Algeria"
        },
        {
          "state": "Constantine Province, Algeria"
        },
        {
          "state": "Djelfa Province, Algeria"
        },
        {
          "state": "El Bayadh Province, Algeria"
        },
        {
          "state": "El Oued Province, Algeria"
        },
        {
          "state": "El Tarf Province, Algeria"
        },
        {
          "state": "Gharda\u00efa Province, Algeria"
        },
        {
          "state": "Guelma Province, Algeria"
        },
        {
          "state": "Illizi Province, Algeria"
        },
        {
          "state": "Jijel Province, Algeria"
        },
        {
          "state": "Khenchela Province, Algeria"
        },
        {
          "state": "Laghouat Province, Algeria"
        },
        {
          "state": "M'Sila Province, Algeria"
        },
        {
          "state": "Mascara Province, Algeria"
        },
        {
          "state": "M\u00e9d\u00e9a Province, Algeria"
        },
        {
          "state": "Mila Province, Algeria"
        },
        {
          "state": "Mostaganem Province, Algeria"
        },
        {
          "state": "Naama Province, Algeria"
        },
        {
          "state": "Oran Province, Algeria"
        },
        {
          "state": "Ouargla Province, Algeria"
        },
        {
          "state": "Oum El Bouaghi Province, Algeria"
        },
        {
          "state": "Relizane Province, Algeria"
        },
        {
          "state": "Sa\u00efda Province, Algeria"
        },
        {
          "state": "S\u00e9tif Province, Algeria"
        },
        {
          "state": "Skikda Province, Algeria"
        },
        {
          "state": "Souk Ahras Province, Algeria"
        },
        {
          "state": "Tamanghasset Province, Algeria"
        },
        {
          "state": "T\u00e9bessa Province, Algeria"
        },
        {
          "state": "Tiaret Province, Algeria"
        },
        {
          "state": "Tindouf Province, Algeria"
        },
        {
          "state": "Tipasa Province, Algeria"
        },
        {
          "state": "Tissemsilt Province, Algeria"
        },
        {
          "state": "Tizi Ouzou Province, Algeria"
        },
        {
          "state": "Tlemcen Province, Algeria"
        }
      ],
      "currency": "DZD"
    },
]