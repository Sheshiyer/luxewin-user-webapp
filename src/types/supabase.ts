export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          email: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string
        }
      }
      raffles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          ticket_price: number
          total_tickets: number
          tickets_sold: number
          end_date: string
          is_active: boolean
          winner_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          ticket_price: number
          total_tickets: number
          tickets_sold?: number
          end_date: string
          is_active?: boolean
          winner_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          ticket_price?: number
          total_tickets?: number
          tickets_sold?: number
          end_date?: string
          is_active?: boolean
          winner_id?: string | null
        }
      }
      tickets: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          raffle_id: string
          user_id: string
          ticket_number: string
          status: 'active' | 'won' | 'expired'
          transaction_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          raffle_id: string
          user_id: string
          ticket_number: string
          status?: 'active' | 'won' | 'expired'
          transaction_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          raffle_id?: string
          user_id?: string
          ticket_number?: string
          status?: 'active' | 'won' | 'expired'
          transaction_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
