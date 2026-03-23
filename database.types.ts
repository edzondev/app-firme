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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      emergency_contacts: {
        Row: {
          contact_push_token: string | null
          created_at: string | null
          id: string
          linked_user_id: string | null
          name: string
          notify_method:
          | Database["public"]["Enums"]["notification_method"]
          | null
          notify_on_trip_start: boolean | null
          phone: string
          priority: number | null
          relationship:
          | Database["public"]["Enums"]["contact_relationship"]
          | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_push_token?: string | null
          created_at?: string | null
          id?: string
          linked_user_id?: string | null
          name: string
          notify_method?:
          | Database["public"]["Enums"]["notification_method"]
          | null
          notify_on_trip_start?: boolean | null
          phone: string
          priority?: number | null
          relationship?:
          | Database["public"]["Enums"]["contact_relationship"]
          | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_push_token?: string | null
          created_at?: string | null
          id?: string
          linked_user_id?: string | null
          name?: string
          notify_method?:
          | Database["public"]["Enums"]["notification_method"]
          | null
          notify_on_trip_start?: boolean | null
          phone?: string
          priority?: number | null
          relationship?:
          | Database["public"]["Enums"]["contact_relationship"]
          | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_linked_user_id_users_id_fk"
            columns: ["linked_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_contacts_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      family_members: {
        Row: {
          created_at: string | null
          id: string
          member_user_id: string
          nickname: string | null
          owner_user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_user_id: string
          nickname?: string | null
          owner_user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          member_user_id?: string
          nickname?: string | null
          owner_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_members_member_user_id_users_id_fk"
            columns: ["member_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_members_owner_user_id_users_id_fk"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      location_logs: {
        Row: {
          accuracy: number | null
          altitude: number | null
          batch_id: string | null
          device_timestamp: string
          heading: number | null
          id: number
          latitude: number
          longitude: number
          recorded_at: string | null
          speed: number | null
          trip_id: string
        }
        Insert: {
          accuracy?: number | null
          altitude?: number | null
          batch_id?: string | null
          device_timestamp: string
          heading?: number | null
          id?: number
          latitude: number
          longitude: number
          recorded_at?: string | null
          speed?: number | null
          trip_id: string
        }
        Update: {
          accuracy?: number | null
          altitude?: number | null
          batch_id?: string | null
          device_timestamp?: string
          heading?: number | null
          id?: number
          latitude?: number
          longitude?: number
          recorded_at?: string | null
          speed?: number | null
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_logs_trip_id_trips_id_fk"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      sos_alerts: {
        Row: {
          accuracy: number | null
          id: string
          latitude: number
          longitude: number
          message: string | null
          resolution_note: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["sos_status"] | null
          triggered_at: string | null
          trip_id: string | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          id?: string
          latitude: number
          longitude: number
          message?: string | null
          resolution_note?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["sos_status"] | null
          triggered_at?: string | null
          trip_id?: string | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          id?: string
          latitude?: number
          longitude?: number
          message?: string | null
          resolution_note?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["sos_status"] | null
          triggered_at?: string | null
          trip_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sos_alerts_trip_id_trips_id_fk"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sos_alerts_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sos_notifications: {
        Row: {
          channel: Database["public"]["Enums"]["sos_channel"]
          contact_id: string
          delivered_at: string | null
          failed_at: string | null
          failure_reason: string | null
          id: string
          provider_message_id: string | null
          sent_at: string | null
          sos_alert_id: string
        }
        Insert: {
          channel: Database["public"]["Enums"]["sos_channel"]
          contact_id: string
          delivered_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          provider_message_id?: string | null
          sent_at?: string | null
          sos_alert_id: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["sos_channel"]
          contact_id?: string
          delivered_at?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          provider_message_id?: string | null
          sent_at?: string | null
          sos_alert_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sos_notifications_contact_id_emergency_contacts_id_fk"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "emergency_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sos_notifications_sos_alert_id_sos_alerts_id_fk"
            columns: ["sos_alert_id"]
            isOneToOne: false
            referencedRelation: "sos_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_recordings: {
        Row: {
          chunk_number: number | null
          created_at: string | null
          duration_seconds: number | null
          encryption_algorithm: string | null
          encryption_key_hash: string | null
          expires_at: string | null
          file_size_bytes: number | null
          id: string
          storage_key: string
          storage_provider: string | null
          trip_id: string
        }
        Insert: {
          chunk_number?: number | null
          created_at?: string | null
          duration_seconds?: number | null
          encryption_algorithm?: string | null
          encryption_key_hash?: string | null
          expires_at?: string | null
          file_size_bytes?: number | null
          id?: string
          storage_key: string
          storage_provider?: string | null
          trip_id: string
        }
        Update: {
          chunk_number?: number | null
          created_at?: string | null
          duration_seconds?: number | null
          encryption_algorithm?: string | null
          encryption_key_hash?: string | null
          expires_at?: string | null
          file_size_bytes?: number | null
          id?: string
          storage_key?: string
          storage_provider?: string | null
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_recordings_trip_id_trips_id_fk"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          audio_enabled: boolean | null
          created_at: string | null
          distance_meters: number | null
          driver_name: string | null
          driver_plate: string | null
          duration_seconds: number | null
          ended_at: string | null
          external_app: Database["public"]["Enums"]["external_app"]
          id: string
          location_points_count: number | null
          route_deviation_enabled: boolean | null
          share_enabled: boolean | null
          share_token: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["trip_status"] | null
          user_id: string
          user_rating: number | null
          vehicle_color: string | null
        }
        Insert: {
          audio_enabled?: boolean | null
          created_at?: string | null
          distance_meters?: number | null
          driver_name?: string | null
          driver_plate?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          external_app: Database["public"]["Enums"]["external_app"]
          id?: string
          location_points_count?: number | null
          route_deviation_enabled?: boolean | null
          share_enabled?: boolean | null
          share_token?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["trip_status"] | null
          user_id: string
          user_rating?: number | null
          vehicle_color?: string | null
        }
        Update: {
          audio_enabled?: boolean | null
          created_at?: string | null
          distance_meters?: number | null
          driver_name?: string | null
          driver_plate?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          external_app?: Database["public"]["Enums"]["external_app"]
          id?: string
          location_points_count?: number | null
          route_deviation_enabled?: boolean | null
          share_enabled?: boolean | null
          share_token?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["trip_status"] | null
          user_id?: string
          user_rating?: number | null
          vehicle_color?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          custom_sos_message: string | null
          email: string | null
          expo_push_token: string | null
          firebase_uid: string
          full_name: string
          id: string
          is_deleted: boolean | null
          last_active_at: string | null
          phone: string | null
          rc_customer_id: string | null
          settings_audio_quality: string | null
          settings_dark_mode: boolean | null
          settings_notifications_enabled: boolean | null
          settings_sos_delay: number | null
          subscription_expires_at: string | null
          subscription_product_id: string | null
          subscription_started_at: string | null
          subscription_status:
          | Database["public"]["Enums"]["subscription_status"]
          | null
          subscription_store: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          custom_sos_message?: string | null
          email?: string | null
          expo_push_token?: string | null
          firebase_uid: string
          full_name: string
          id?: string
          is_deleted?: boolean | null
          last_active_at?: string | null
          phone?: string | null
          rc_customer_id?: string | null
          settings_audio_quality?: string | null
          settings_dark_mode?: boolean | null
          settings_notifications_enabled?: boolean | null
          settings_sos_delay?: number | null
          subscription_expires_at?: string | null
          subscription_product_id?: string | null
          subscription_started_at?: string | null
          subscription_status?:
          | Database["public"]["Enums"]["subscription_status"]
          | null
          subscription_store?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          custom_sos_message?: string | null
          email?: string | null
          expo_push_token?: string | null
          firebase_uid?: string
          full_name?: string
          id?: string
          is_deleted?: boolean | null
          last_active_at?: string | null
          phone?: string | null
          rc_customer_id?: string | null
          settings_audio_quality?: string | null
          settings_dark_mode?: boolean | null
          settings_notifications_enabled?: boolean | null
          settings_sos_delay?: number | null
          subscription_expires_at?: string | null
          subscription_product_id?: string | null
          subscription_started_at?: string | null
          subscription_status?:
          | Database["public"]["Enums"]["subscription_status"]
          | null
          subscription_store?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          error: string | null
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          received_at: string | null
          source: string
        }
        Insert: {
          error?: string | null
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          received_at?: string | null
          source: string
        }
        Update: {
          error?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          received_at?: string | null
          source?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contact_relationship:
      | "madre"
      | "padre"
      | "pareja"
      | "hermano"
      | "hermana"
      | "amigo"
      | "amiga"
      | "hijo"
      | "hija"
      | "otro"
      external_app:
      | "indrive"
      | "uber"
      | "didi"
      | "yango"
      | "cabify"
      | "maxim"
      | "other"
      notification_method: "push" | "sms" | "whatsapp"
      sos_channel: "push" | "sms" | "whatsapp" | "call"
      sos_status: "active" | "resolved" | "false_alarm"
      subscription_status:
      | "free"
      | "active"
      | "expired"
      | "cancelled"
      | "grace_period"
      trip_status: "active" | "completed" | "sos_triggered" | "cancelled"
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
      contact_relationship: [
        "madre",
        "padre",
        "pareja",
        "hermano",
        "hermana",
        "amigo",
        "amiga",
        "hijo",
        "hija",
        "otro",
      ],
      external_app: [
        "indrive",
        "uber",
        "didi",
        "yango",
        "cabify",
        "maxim",
        "other",
      ],
      notification_method: ["push", "sms", "whatsapp"],
      sos_channel: ["push", "sms", "whatsapp", "call"],
      sos_status: ["active", "resolved", "false_alarm"],
      subscription_status: [
        "free",
        "active",
        "expired",
        "cancelled",
        "grace_period",
      ],
      trip_status: ["active", "completed", "sos_triggered", "cancelled"],
    },
  },
} as const
