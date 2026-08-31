export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json
          id: string
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json
          id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      areas: {
        Row: {
          city_id: string
          id: string
          name: string
        }
        Insert: {
          city_id: string
          id?: string
          name: string
        }
        Update: {
          city_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "areas_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          client_id: string
          created_at: string
          duration_min: number
          id: string
          mode: Database["public"]["Enums"]["lesson_mode"]
          professional_id: string
          proposal_id: string | null
          rate: number
          request_id: string | null
          scheduled_at: string | null
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          duration_min?: number
          id?: string
          mode?: Database["public"]["Enums"]["lesson_mode"]
          professional_id: string
          proposal_id?: string | null
          rate: number
          request_id?: string | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          duration_min?: number
          id?: string
          mode?: Database["public"]["Enums"]["lesson_mode"]
          professional_id?: string
          proposal_id?: string | null
          rate?: number
          request_id?: string | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          icon: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          sort: number
        }
        Insert: {
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort?: number
        }
        Update: {
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort?: number
        }
        Relationships: []
      }
      cities: {
        Row: {
          id: string
          is_active: boolean
          lat: number | null
          lng: number | null
          name: string
        }
        Insert: {
          id?: string
          is_active?: boolean
          lat?: number | null
          lng?: number | null
          name: string
        }
        Update: {
          id?: string
          is_active?: boolean
          lat?: number | null
          lng?: number | null
          name?: string
        }
        Relationships: []
      }
      connections: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          professional_id: string
          request_id: string
          source: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          professional_id: string
          request_id: string
          source?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          professional_id?: string
          request_id?: string
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          category_id: string
          cycle: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort: number
        }
        Insert: {
          category_id: string
          cycle: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort?: number
        }
        Update: {
          category_id?: string
          cycle?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort?: number
        }
        Relationships: [
          {
            foreignKeyName: "levels_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          booking_id: string | null
          created_at: string
          flagged: boolean
          id: string
          proposal_id: string | null
          read_at: string | null
          recipient_id: string
          request_id: string | null
          sender_id: string
        }
        Insert: {
          body: string
          booking_id?: string | null
          created_at?: string
          flagged?: boolean
          id?: string
          proposal_id?: string | null
          read_at?: string | null
          recipient_id: string
          request_id?: string | null
          sender_id: string
        }
        Update: {
          body?: string
          booking_id?: string | null
          created_at?: string
          flagged?: boolean
          id?: string
          proposal_id?: string | null
          read_at?: string | null
          recipient_id?: string
          request_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          professional_id: string
          provider: string
          reference: string | null
          status: string
          subscription_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          professional_id: string
          provider?: string
          reference?: string | null
          status?: string
          subscription_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          professional_id?: string
          provider?: string
          reference?: string | null
          status?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      professional_availability: {
        Row: {
          end_min: number
          id: string
          professional_id: string
          start_min: number
          weekday: number
        }
        Insert: {
          end_min: number
          id?: string
          professional_id: string
          start_min: number
          weekday: number
        }
        Update: {
          end_min?: number
          id?: string
          professional_id?: string
          start_min?: number
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "professional_availability_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_levels: {
        Row: {
          level_id: string
          professional_id: string
        }
        Insert: {
          level_id: string
          professional_id: string
        }
        Update: {
          level_id?: string
          professional_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_levels_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_levels_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_services: {
        Row: {
          professional_id: string
          service_id: string
        }
        Insert: {
          professional_id: string
          service_id: string
        }
        Update: {
          professional_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "professional_services_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          admin_message: string | null
          area: string | null
          bio: string | null
          category_id: string
          certifications: string | null
          city_id: string | null
          created_at: string
          diplomas: string | null
          display_name: string
          email: string | null
          experience_description: string | null
          experience_years: number
          first_name: string | null
          headline: string | null
          hourly_rate: number
          id: string
          institutions: string | null
          is_verified: boolean
          languages: string[]
          last_name: string | null
          lat: number | null
          lessons_count: number
          lng: number | null
          mode_home: boolean
          mode_online: boolean
          mode_studio: boolean
          onboarding_completed: boolean
          onboarding_step: number
          phone: string | null
          photo_url: string | null
          plan_code: string
          radius_km: number
          rating_avg: number
          rating_count: number
          rejection_reason: string | null
          response_rate: number
          specialty: string | null
          status: Database["public"]["Enums"]["pro_status"]
          updated_at: string
          user_id: string | null
          verification_status: Database["public"]["Enums"]["verification_status"]
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          admin_message?: string | null
          area?: string | null
          bio?: string | null
          category_id: string
          certifications?: string | null
          city_id?: string | null
          created_at?: string
          diplomas?: string | null
          display_name: string
          email?: string | null
          experience_description?: string | null
          experience_years?: number
          first_name?: string | null
          headline?: string | null
          hourly_rate?: number
          id?: string
          institutions?: string | null
          is_verified?: boolean
          languages?: string[]
          last_name?: string | null
          lat?: number | null
          lessons_count?: number
          lng?: number | null
          mode_home?: boolean
          mode_online?: boolean
          mode_studio?: boolean
          onboarding_completed?: boolean
          onboarding_step?: number
          phone?: string | null
          photo_url?: string | null
          plan_code?: string
          radius_km?: number
          rating_avg?: number
          rating_count?: number
          rejection_reason?: string | null
          response_rate?: number
          specialty?: string | null
          status?: Database["public"]["Enums"]["pro_status"]
          updated_at?: string
          user_id?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          admin_message?: string | null
          area?: string | null
          bio?: string | null
          category_id?: string
          certifications?: string | null
          city_id?: string | null
          created_at?: string
          diplomas?: string | null
          display_name?: string
          email?: string | null
          experience_description?: string | null
          experience_years?: number
          first_name?: string | null
          headline?: string | null
          hourly_rate?: number
          id?: string
          institutions?: string | null
          is_verified?: boolean
          languages?: string[]
          last_name?: string | null
          lat?: number | null
          lessons_count?: number
          lng?: number | null
          mode_home?: boolean
          mode_online?: boolean
          mode_studio?: boolean
          onboarding_completed?: boolean
          onboarding_step?: number
          phone?: string | null
          photo_url?: string | null
          plan_code?: string
          radius_km?: number
          rating_avg?: number
          rating_count?: number
          rejection_reason?: string | null
          response_rate?: number
          specialty?: string | null
          status?: Database["public"]["Enums"]["pro_status"]
          updated_at?: string
          user_id?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professionals_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professionals_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professionals_plan_code_fkey"
            columns: ["plan_code"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["code"]
          },
        ]
      }
      profile_views: {
        Row: {
          created_at: string
          id: string
          professional_id: string
          viewer_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          professional_id: string
          viewer_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          professional_id?: string
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_views_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      proposals: {
        Row: {
          created_at: string
          id: string
          match_score: number | null
          message: string | null
          professional_id: string
          proposed_at: string | null
          rate: number
          request_id: string
          status: Database["public"]["Enums"]["proposal_status"]
        }
        Insert: {
          created_at?: string
          id?: string
          match_score?: number | null
          message?: string | null
          professional_id: string
          proposed_at?: string | null
          rate: number
          request_id: string
          status?: Database["public"]["Enums"]["proposal_status"]
        }
        Update: {
          created_at?: string
          id?: string
          match_score?: number | null
          message?: string | null
          professional_id?: string
          proposed_at?: string | null
          rate?: number
          request_id?: string
          status?: Database["public"]["Enums"]["proposal_status"]
        }
        Relationships: [
          {
            foreignKeyName: "proposals_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          details: string | null
          id: string
          reason: string
          reporter_id: string
          status: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          reason: string
          reporter_id: string
          status?: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          status?: string
          target_id?: string
          target_type?: string
        }
        Relationships: []
      }
      request_contacts: {
        Row: {
          created_at: string
          email: string
          full_name: string
          phone: string | null
          request_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          phone?: string | null
          request_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          phone?: string | null
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_contacts_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          area: string | null
          budget_max: number | null
          budget_min: number | null
          category_id: string
          city_id: string | null
          client_id: string | null
          created_at: string
          description: string | null
          expires_at: string
          id: string
          lat: number | null
          level_id: string | null
          lng: number | null
          mode: Database["public"]["Enums"]["lesson_mode"]
          service_id: string | null
          slots: Json
          status: Database["public"]["Enums"]["request_status"]
          target_professional_id: string | null
          target_status: string
        }
        Insert: {
          area?: string | null
          budget_max?: number | null
          budget_min?: number | null
          category_id: string
          city_id?: string | null
          client_id?: string | null
          created_at?: string
          description?: string | null
          expires_at?: string
          id?: string
          lat?: number | null
          level_id?: string | null
          lng?: number | null
          mode?: Database["public"]["Enums"]["lesson_mode"]
          service_id?: string | null
          slots?: Json
          status?: Database["public"]["Enums"]["request_status"]
          target_professional_id?: string | null
          target_status?: string
        }
        Update: {
          area?: string | null
          budget_max?: number | null
          budget_min?: number | null
          category_id?: string
          city_id?: string | null
          client_id?: string | null
          created_at?: string
          description?: string | null
          expires_at?: string
          id?: string
          lat?: number | null
          level_id?: string | null
          lng?: number | null
          mode?: Database["public"]["Enums"]["lesson_mode"]
          service_id?: string | null
          slots?: Json
          status?: Database["public"]["Enums"]["request_status"]
          target_professional_id?: string | null
          target_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "requests_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_target_professional_id_fkey"
            columns: ["target_professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          author_id: string
          booking_id: string
          comment: string | null
          communication: number | null
          created_at: string
          id: string
          professional_id: string
          punctuality: number | null
          quality: number | null
          rating: number
        }
        Insert: {
          author_id: string
          booking_id: string
          comment?: string | null
          communication?: number | null
          created_at?: string
          id?: string
          professional_id: string
          punctuality?: number | null
          quality?: number | null
          rating: number
        }
        Update: {
          author_id?: string
          booking_id?: string
          comment?: string | null
          communication?: number | null
          created_at?: string
          id?: string
          professional_id?: string
          punctuality?: number | null
          quality?: number | null
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category_id: string
          id: string
          is_active: boolean
          level_id: string | null
          name: string
          slug: string
          sort: number
          specialty_id: string | null
        }
        Insert: {
          category_id: string
          id?: string
          is_active?: boolean
          level_id?: string | null
          name: string
          slug: string
          sort?: number
          specialty_id?: string | null
        }
        Update: {
          category_id?: string
          id?: string
          is_active?: boolean
          level_id?: string | null
          name?: string
          slug?: string
          sort?: number
          specialty_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      specialties: {
        Row: {
          category_id: string
          id: string
          is_active: boolean
          level_id: string
          name: string
          slug: string
          sort: number
        }
        Insert: {
          category_id: string
          id?: string
          is_active?: boolean
          level_id: string
          name: string
          slug: string
          sort?: number
        }
        Update: {
          category_id?: string
          id?: string
          is_active?: boolean
          level_id?: string
          name?: string
          slug?: string
          sort?: number
        }
        Relationships: [
          {
            foreignKeyName: "specialties_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "specialties_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          badge: string | null
          code: string
          duration_days: number
          features: Json
          is_visible: boolean
          max_requests_per_month: number | null
          max_responses_per_month: number | null
          name: string
          price_mad: number
          sort: number
          trial_days: number
          visibility_boost: number
        }
        Insert: {
          badge?: string | null
          code: string
          duration_days?: number
          features?: Json
          is_visible?: boolean
          max_requests_per_month?: number | null
          max_responses_per_month?: number | null
          name: string
          price_mad?: number
          sort?: number
          trial_days?: number
          visibility_boost?: number
        }
        Update: {
          badge?: string | null
          code?: string
          duration_days?: number
          features?: Json
          is_visible?: boolean
          max_requests_per_month?: number | null
          max_responses_per_month?: number | null
          name?: string
          price_mad?: number
          sort?: number
          trial_days?: number
          visibility_boost?: number
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          plan_code: string
          professional_id: string
          started_at: string
          status: Database["public"]["Enums"]["subscription_status"]
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_code: string
          professional_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_code?: string
          professional_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_code_fkey"
            columns: ["plan_code"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "subscriptions_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          created_at: string
          file_path: string
          id: string
          kind: string
          notes: string | null
          professional_id: string
          reviewed_by: string | null
          status: string
        }
        Insert: {
          created_at?: string
          file_path: string
          id?: string
          kind: string
          notes?: string | null
          professional_id: string
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          file_path?: string
          id?: string
          kind?: string
          notes?: string | null
          professional_id?: string
          reviewed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_logs: {
        Row: {
          action: string
          admin_id: string | null
          comment: string | null
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["verification_status"] | null
          old_status: Database["public"]["Enums"]["verification_status"] | null
          professional_id: string
          request_id: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["verification_status"] | null
          old_status?: Database["public"]["Enums"]["verification_status"] | null
          professional_id: string
          request_id?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["verification_status"] | null
          old_status?: Database["public"]["Enums"]["verification_status"] | null
          professional_id?: string
          request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_logs_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "verification_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          admin_message: string | null
          created_at: string
          id: string
          professional_id: string
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"]
          submitted_at: string
          updated_at: string
        }
        Insert: {
          admin_message?: string | null
          created_at?: string
          id?: string
          professional_id: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          admin_message?: string | null
          created_at?: string
          id?: string
          professional_id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_message_with: { Args: { _other: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      owns_professional: { Args: { _pro: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      booking_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "completed"
        | "disputed"
      lesson_mode: "home" | "studio" | "online"
      pro_status: "draft" | "active" | "suspended"
      proposal_status: "pending" | "accepted" | "declined" | "withdrawn"
      request_status:
        | "active"
        | "proposals_received"
        | "booked"
        | "completed"
        | "cancelled"
        | "expired"
      subscription_status:
        | "active"
        | "trial"
        | "expired"
        | "cancelled"
        | "pending"
      verification_status:
        | "not_submitted"
        | "pending"
        | "needs_information"
        | "verified"
        | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      booking_status: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
        "disputed",
      ],
      lesson_mode: ["home", "studio", "online"],
      pro_status: ["draft", "active", "suspended"],
      proposal_status: ["pending", "accepted", "declined", "withdrawn"],
      request_status: [
        "active",
        "proposals_received",
        "booked",
        "completed",
        "cancelled",
        "expired",
      ],
      subscription_status: [
        "active",
        "trial",
        "expired",
        "cancelled",
        "pending",
      ],
      verification_status: [
        "not_submitted",
        "pending",
        "needs_information",
        "verified",
        "rejected",
      ],
    },
  },
} as const
