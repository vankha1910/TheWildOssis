import supabase, { supabaseUrl } from './supabase';
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
  console.log(data);
  return data?.user;
}

export async function updateUserInfor({ password, fullName, avatar }) {
  // Update infor
  let updateData;
  if (fullName)
    updateData = {
      data: {
        full_name: fullName,
      },
    };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(storageError.message);

  if (!avatar) return data;

  // Storage avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  // Update avatar
  const { data: updateAvatarUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateAvatarError) throw new Error(storageError.message);

  return updateAvatarUser;
}
