import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export async function uploadAvatar(file: File, userId: string) {
  try {
    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${userId}/${Date.now()}-${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(data.path);

    // Update the user's metadata with the new avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}

interface ProfileUpdates {
  avatar_url?: string;
  full_name?: string;
  username?: string;
  website?: string;
  [key: string]: string | undefined;
}

export async function updateProfile(userId: string, updates: ProfileUpdates) {
  try {
    const { error } = await supabase.auth.updateUser({
      data: updates,
    });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}
