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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      academic_profile: {
        Row: {
          cgpa: number | null
          cgpa_scale: number
          created_at: string
          current_semester: string | null
          degree: string
          id: string
          institution: string
          note: string | null
          university: string
          updated_at: string
        }
        Insert: {
          cgpa?: number | null
          cgpa_scale?: number
          created_at?: string
          current_semester?: string | null
          degree?: string
          id?: string
          institution?: string
          note?: string | null
          university?: string
          updated_at?: string
        }
        Update: {
          cgpa?: number | null
          cgpa_scale?: number
          created_at?: string
          current_semester?: string | null
          degree?: string
          id?: string
          institution?: string
          note?: string | null
          university?: string
          updated_at?: string
        }
        Relationships: []
      }
      academic_records: {
        Row: {
          academic_year: string | null
          cgpa: number | null
          created_at: string
          credits: number | null
          id: string
          notes: string | null
          published: boolean
          semester: number
          sgpa: number | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          academic_year?: string | null
          cgpa?: number | null
          created_at?: string
          credits?: number | null
          id?: string
          notes?: string | null
          published?: boolean
          semester: number
          sgpa?: number | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          academic_year?: string | null
          cgpa?: number | null
          created_at?: string
          credits?: number | null
          id?: string
          notes?: string | null
          published?: boolean
          semester?: number
          sgpa?: number | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          id: string
          link_url: string | null
          organization: string | null
          published: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          link_url?: string | null
          organization?: string | null
          published?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          link_url?: string | null
          organization?: string | null
          published?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          sort_order: number
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          sort_order?: number
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          sort_order?: number
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          credential_id: string | null
          credential_url: string | null
          description: string | null
          expiration_date: string | null
          id: string
          image_url: string | null
          issue_date: string | null
          name: string
          organization: string
          pdf_url: string | null
          published: boolean
          skills: string[]
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          description?: string | null
          expiration_date?: string | null
          id?: string
          image_url?: string | null
          issue_date?: string | null
          name: string
          organization?: string
          pdf_url?: string | null
          published?: boolean
          skills?: string[]
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          description?: string | null
          expiration_date?: string | null
          id?: string
          image_url?: string | null
          issue_date?: string | null
          name?: string
          organization?: string
          pdf_url?: string | null
          published?: boolean
          skills?: string[]
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      current_status: {
        Row: {
          created_at: string
          emoji: string
          id: string
          label: string
          published: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          emoji?: string
          id?: string
          label: string
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          label?: string
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          achievements: string[]
          coursework: string[]
          created_at: string
          degree: string
          description: string | null
          end_date: string | null
          id: string
          institution: string
          is_current: boolean
          published: boolean
          sort_order: number
          start_date: string | null
          university: string | null
          updated_at: string
        }
        Insert: {
          achievements?: string[]
          coursework?: string[]
          created_at?: string
          degree: string
          description?: string | null
          end_date?: string | null
          id?: string
          institution?: string
          is_current?: boolean
          published?: boolean
          sort_order?: number
          start_date?: string | null
          university?: string | null
          updated_at?: string
        }
        Update: {
          achievements?: string[]
          coursework?: string[]
          created_at?: string
          degree?: string
          description?: string | null
          end_date?: string | null
          id?: string
          institution?: string
          is_current?: boolean
          published?: boolean
          sort_order?: number
          start_date?: string | null
          university?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          certificate_url: string | null
          created_at: string
          description: string | null
          employment_type: string | null
          end_date: string | null
          id: string
          is_current: boolean
          organization: string
          organization_url: string | null
          position: string
          projects_worked_on: string[]
          published: boolean
          responsibilities: string[]
          skills_gained: string[]
          sort_order: number
          start_date: string | null
          technologies: string[]
          updated_at: string
        }
        Insert: {
          certificate_url?: string | null
          created_at?: string
          description?: string | null
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean
          organization?: string
          organization_url?: string | null
          position: string
          projects_worked_on?: string[]
          published?: boolean
          responsibilities?: string[]
          skills_gained?: string[]
          sort_order?: number
          start_date?: string | null
          technologies?: string[]
          updated_at?: string
        }
        Update: {
          certificate_url?: string | null
          created_at?: string
          description?: string | null
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean
          organization?: string
          organization_url?: string | null
          position?: string
          projects_worked_on?: string[]
          published?: boolean
          responsibilities?: string[]
          skills_gained?: string[]
          sort_order?: number
          start_date?: string | null
          technologies?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      journey: {
        Row: {
          category: string
          created_at: string
          description: string
          featured: boolean
          id: string
          image_url: string | null
          link_url: string | null
          published: boolean
          sort_order: number
          technologies: string[]
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          link_url?: string | null
          published?: boolean
          sort_order?: number
          technologies?: string[]
          title?: string
          updated_at?: string
          year: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          link_url?: string | null
          published?: boolean
          sort_order?: number
          technologies?: string[]
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          bio: string
          college: string
          created_at: string
          descriptor: string
          email: string
          github_url: string
          github_username: string
          headline: string
          hero_intro: string
          id: string
          linkedin_url: string
          name: string
          philosophy: string
          photo_url: string | null
          research_interests: string[]
          tagline: string
          university: string
          updated_at: string
        }
        Insert: {
          bio?: string
          college?: string
          created_at?: string
          descriptor?: string
          email?: string
          github_url?: string
          github_username?: string
          headline?: string
          hero_intro?: string
          id?: string
          linkedin_url?: string
          name?: string
          philosophy?: string
          photo_url?: string | null
          research_interests?: string[]
          tagline?: string
          university?: string
          updated_at?: string
        }
        Update: {
          bio?: string
          college?: string
          created_at?: string
          descriptor?: string
          email?: string
          github_url?: string
          github_username?: string
          headline?: string
          hero_intro?: string
          id?: string
          linkedin_url?: string
          name?: string
          philosophy?: string
          photo_url?: string | null
          research_interests?: string[]
          tagline?: string
          university?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          architecture: string | null
          category: string | null
          challenges: string | null
          created_at: string
          demo_video_url: string | null
          description: string | null
          docs_url: string | null
          end_date: string | null
          featured: boolean
          features: string[]
          github_url: string | null
          id: string
          learned: string[]
          live_url: string | null
          name: string
          problem: string | null
          published: boolean
          screenshots: string[]
          short_description: string
          slug: string
          solution: string | null
          sort_order: number
          start_date: string | null
          status: string
          technologies: string[]
          updated_at: string
        }
        Insert: {
          architecture?: string | null
          category?: string | null
          challenges?: string | null
          created_at?: string
          demo_video_url?: string | null
          description?: string | null
          docs_url?: string | null
          end_date?: string | null
          featured?: boolean
          features?: string[]
          github_url?: string | null
          id?: string
          learned?: string[]
          live_url?: string | null
          name: string
          problem?: string | null
          published?: boolean
          screenshots?: string[]
          short_description?: string
          slug: string
          solution?: string | null
          sort_order?: number
          start_date?: string | null
          status?: string
          technologies?: string[]
          updated_at?: string
        }
        Update: {
          architecture?: string | null
          category?: string | null
          challenges?: string | null
          created_at?: string
          demo_video_url?: string | null
          description?: string | null
          docs_url?: string | null
          end_date?: string | null
          featured?: boolean
          features?: string[]
          github_url?: string | null
          id?: string
          learned?: string[]
          live_url?: string | null
          name?: string
          problem?: string | null
          published?: boolean
          screenshots?: string[]
          short_description?: string
          slug?: string
          solution?: string | null
          sort_order?: number
          start_date?: string | null
          status?: string
          technologies?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      research: {
        Row: {
          area: string | null
          created_at: string
          dataset: string | null
          date: string | null
          description: string | null
          github_url: string | null
          id: string
          methodology: string | null
          paper_url: string | null
          problem: string | null
          publication: string | null
          published: boolean
          results: string | null
          sort_order: number
          status: string
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          area?: string | null
          created_at?: string
          dataset?: string | null
          date?: string | null
          description?: string | null
          github_url?: string | null
          id?: string
          methodology?: string | null
          paper_url?: string | null
          problem?: string | null
          publication?: string | null
          published?: boolean
          results?: string | null
          sort_order?: number
          status?: string
          technologies?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          area?: string | null
          created_at?: string
          dataset?: string | null
          date?: string | null
          description?: string | null
          github_url?: string | null
          id?: string
          methodology?: string | null
          paper_url?: string | null
          problem?: string | null
          publication?: string | null
          published?: boolean
          results?: string | null
          sort_order?: number
          status?: string
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      resumes: {
        Row: {
          created_at: string
          file_path: string
          file_url: string
          id: string
          is_active: boolean
          label: string
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          file_path: string
          file_url: string
          id?: string
          is_active?: boolean
          label?: string
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          file_path?: string
          file_url?: string
          id?: string
          is_active?: boolean
          label?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          published: boolean
          sort_order: number
          state: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
          published?: boolean
          sort_order?: number
          state?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          published?: boolean
          sort_order?: number
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          icon: string
          id: string
          label: string
          published: boolean
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon?: string
          id?: string
          label: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          label?: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
