// Supabase type declaration overrides for development
// This file helps bypass strict TypeScript issues with Supabase query builder

declare module '@supabase/supabase-js' {
  interface PostgrestFilterBuilder<T, S, R, P, Q> {
    insert(values: any): PostgrestFilterBuilder<T, any, R, P, Q>;
    update(values: any): PostgrestFilterBuilder<T, any, R, P, Q>;
    eq(column: string, value: any): PostgrestFilterBuilder<T, any, R, P, Q>;
    or(filters: string): PostgrestFilterBuilder<T, any, R, P, Q>;
    range(from: number, to: number): PostgrestFilterBuilder<T, any, R, P, Q>;
    order(column: string, options?: { ascending?: boolean }): PostgrestFilterBuilder<T, any, R, P, Q>;
    select(columns?: string, options?: { count?: 'exact' | 'planned' | 'estimated' | null, head?: boolean }): PostgrestFilterBuilder<T, any, R, P, Q>;
    returns<T>(): PostgrestFilterBuilder<T, any, R, P, Q>;
    single(): PostgrestFilterBuilder<T, any, R | null, P, Q>;
    maybeSingle(): PostgrestFilterBuilder<T, any, R | null, P, Q>;
  }
}

export {};