import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins can not be loaded');
  }
  return data;
}

export async function deleteCabinApi(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
export async function createCabinApi(newCabinData) {
  // For duplicate cabin
  const hasImagePath = newCabinData.image?.startsWith?.(supabaseUrl);

  const imageName = newCabinData?.image?.name
    ? `${Math.random()}-${newCabinData?.image?.name}`.replaceAll('/', '')
    : null;

  const imagePath = hasImagePath
    ? newCabinData?.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-imgs/${imageName}`
    : null;

  // 1. Create cabin
  let query = supabase.from('cabins');

  query = query.insert([{ ...newCabinData, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  if (!imageName) return data;

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-imgs')
    .upload(imageName, newCabinData.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function editCabinApi(newCabin, id) {
  console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-imgs/${imageName}`;

  // 1. Edit cabin
  let query = supabase
    .from('cabins')
    .update({ ...newCabin, image: imagePath })
    .eq('id', id);

  const { data, error } = await query.select().single();

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-imgs')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }
  return data;
}
