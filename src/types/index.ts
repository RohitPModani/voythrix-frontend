export interface QuestionField {
  id: string;
  type: string;
  question: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  max?: number;
}

export interface QuestionGroup {
  id: string;
  title: string;
  description: string;
  fields: QuestionField[];
}

export interface TripAnswers {
  start_location: string;
  destinations: string[];
  budget: string;
  travel_style: string[];
  accommodation: string[];
  interests: string[];
  group_size: string;
  transportation: string;
  dietary_restrictions?: string[];
  special_requirements?: string[];
  travel_season?: string;
  pace: string;
  start_date: string;
  end_date: string;
}

export interface DayItinerary {
  day_number: number;
  date?: string;
  destination?: string;
  themes?: string[];
  morning?: Array<{
    time?: string;
    activity: string;
    description?: string;
    location?: string;
    notes?: string;
    cost?: string;
  }>;
  afternoon?: Array<{
    time?: string;
    activity: string;
    description?: string;
    location?: string;
    notes?: string;
    cost?: string;
  }>;
  evening?: Array<{
    time?: string;
    activity: string;
    description?: string;
    location?: string;
    notes?: string;
    cost?: string;
  }>;
  transportation?: Array<{
    type: string;
    route?: string;
    cost?: string;
    duration?: string;
  }>;
  daily_budget_estimate?: string;
}

export interface Location {
  name: string;
  address: string;
  coordinates: string;
}

export interface BookingInfo {
  required: boolean;
  instructions: string;
}

export interface Cost {
  amount: string;
  currency: string;
}

export interface Activity {
  time: string;
  activity: string;
  description: string;
  location: Location;
  cost: Cost;
  booking_info: BookingInfo;
  travel_time_from_previous: string;
  notes: string[];
}

export interface DiningOption {
  name: string;
  cuisine: string;
  cost_range: string;
  address: string;
  recommended_dishes: string[];
  booking_required: boolean;
  notes: string[];
}

export interface Dining {
  city: string;
  meal_options: MealOption[];
}

export interface MealOption {
  meal_type: string; // e.g., breakfast, lunch, dinner
  restaurants: Restaurant[];
}

export interface Restaurant {
  name: string;
  cuisine: string;
  price_range: {
    low: string;
    high: string;
    currency: string;
  };
  address: string;
  pros: string[];
  cons: string[];
}

export interface Transportation {
  type: string;
  route: string;
  cost: Cost;
  duration: string;
  frequency: string;
  booking_info: string;
}

export interface DailyBudgetEstimate {
  low: string;
  high: string;
  currency: string;
}

export interface Day {
  day_number: number;
  date: string;
  destination: string;
  themes: string[];
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
  transportation: Transportation[];
  daily_budget_estimate: DailyBudgetEstimate;
  important_notes: string[];
}

export interface AccommodationRecommendation {
  name: string;
  type: string;
  price_range: {
    low: string;
    high: string;
    currency: string;
  };
  location: {
    address: string;
    proximity_highlights: string[];
  };
  amenities: string[];
  pros: string[];
  cons: string[];
}

export interface Accommodation {
  city: string;
  recommendations: AccommodationRecommendation[];
}

export interface EssentialInformation {
  emergency_contacts: Record<string, string>;
  cultural_tips: string[];
  packing_list: string[];
  weather_expectations: {
    temperature_range: string;
    precipitation: string;
    seasonal_notes: string;
  };
  visa_requirements: {
    type: string;
    process: string;
    duration: string;
    cost: Cost;
  };
  safety_considerations: string[];
  local_transportation: {
    options: string[];
    tips: string[];
    apps: string[];
  };
  local_sim_wifi_advice: {
    sim_advice: string;
    wifi_advice: string;
  };
  hidden_gems: string[];
  photo_worthy_locations: string[];
}

export interface TotalBudgetEstimate {
  low: string;
  high: string;
  currency: string;
  breakdown: {
    accommodation: string;
    activities: string;
    transportation: string;
    food: string;
    miscellaneous: string;
  };
}

export interface Itinerary {
  summary: string;
  destinations: string[];
  trip_duration: {
    total_days: number;
    start_date: string;
    end_date: string;
  };
  days: Day[];
  dining: Dining[];
  accommodation: Accommodation[];
  essential_information: EssentialInformation;
  total_budget_estimate: TotalBudgetEstimate;
}

export interface VacationAnswers {
  vacation_style: string[];
  departure_location: string;
  start_date: string;
  end_date: string;
  budget: string;
  preferred_region?: string;
  visa_flexibility: string;
  special_requirements?: string;
  group_size: string;
}

export interface VacationItinerary {
  summary: string;
  recommendations: Array<{
    destination: {
      country: string;
      region: string;
      match_score: number;
    };
    why_perfect_match: string;
    costs: {
      currency: string;
      total_per_person: number;
      breakdown: Record<string, number>;
    };
    visa_requirements: {
      type: string;
      processing_time: string;
      cost: string;
      requirements: string[];
    };
    best_time_to_visit: {
      peak_season: string[];
      shoulder_season: string[];
      weather: string;
    };
    transportation: {
      score: number;
      explanation: string;
      main_options: string[];
    };
    safety: {
      score: number;
      explanation: string;
      special_considerations: string[];
    };
    must_do_activities: {
      name: string;
      description: string;
      estimated_cost: string;
    }[];
    recommended_duration: {
      minimum_days: number;
      optimal_days: number;
      explanation: string;
    };
  }>;
  meta: {
    currency: string;
    search_criteria: {
      vacation_style: string;
      budget_range: string;
      dates: string;
    };
  };
}