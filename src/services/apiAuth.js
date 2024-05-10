import supabase from './supabase';
export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}
export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
export async function getUserApi() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data?.user;
}
