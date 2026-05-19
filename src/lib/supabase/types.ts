export type CompanySpecialization =
  | 'investment_fraud'
  | 'crypto_loss'
  | 'bank_fraud'
  | 'romance_scam'
  | 'other';

export interface Company {
  id: string;
  name: string;
  description: string;
  website_url: string | null;
  logo_url: string | null;
  specialization: CompanySpecialization[];
  languages: string[];
  country: string;
  is_active: boolean;
  created_at?: string;
}

export interface CaseSubmission {
  id?: string;
  loss_type: CompanySpecialization;
  amount_range: string;
  country: string;
  description: string;
  contact_email: string;
  locale: 'en' | 'de';
  status?: 'pending' | 'reviewed' | 'matched' | 'closed';
  created_at?: string;
}

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: Company;
        Insert: Omit<Company, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Company>;
        Relationships: [];
      };
      case_submissions: {
        Row: CaseSubmission & { id: string; created_at: string };
        Insert: Omit<CaseSubmission, 'id' | 'created_at' | 'status'>;
        Update: Partial<CaseSubmission>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      specialization_t: CompanySpecialization;
      case_status_t: 'pending' | 'reviewed' | 'matched' | 'closed';
    };
    CompositeTypes: Record<string, never>;
  };
}
