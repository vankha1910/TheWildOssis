import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://kpnrvqttgrmeqdvhezlv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbnJ2cXR0Z3JtZXFkdmhlemx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Njg0MDIsImV4cCI6MjAyOTQ0NDQwMn0.HosIK2EKt4tzerQPEx-bE4LXH6AJzlBcKb-LSY6qbhI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
