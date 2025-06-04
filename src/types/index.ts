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
  destinations: string;
  currency?: string;
  min_budget?: string;
  max_budget?: string;
  budget: string;
  travel_style: string[];
  accommodation: string[];
  interests: string[];
  group_size: string;
  transportation: string;
  dietary_restrictions?: string[];
  special_requirements?: string;
  pace: string;
  start_date: string;
  end_date: string;
}

export interface DailyItinerary {
  day_number: number;
  date: string;
  title: string;
  description: string;
}

export interface Accommodation {
  city: string;
  recommendations: AccommodationRecommendation[];
}

export interface AccommodationRecommendation {
  name: string;
  address: string;
}

export interface Dining {
  city: string;
  recommendations: DiningRecommendation[];
}

export interface DiningRecommendation {
  name: string;
  address: string;
}

export interface Itinerary {
  summary: string;
  destinations: string[];
  trip_duration: {
    total_days: number;
    start_date: string;
    end_date: string;
  };
  daily_itinerary: DailyItinerary[];
  accommodation: Accommodation[];
  dining: Dining[];
  hidden_gems: string[];
  estimated_costs: {
    currency: string;
    minimum_total: number;
    maximum_total: number;
  };
}

export interface VacationAnswers {
  vacation_style: string[];
  departure_location: string;
  start_date: string;
  end_date: string;
  currency?: string;
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