import type { CabinType } from "../utils/types";
import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Error fetching cabins");
  }

  return data;
}

export async function createEditCabin({
  cabin,
  id,
}: {
  cabin: CabinType;
  id?: string;
}) {
  console.log(cabin);
  const hasImagePath =
    typeof cabin.image === "string" && !cabin.name.startsWith("Copy of");

  let imagename;

  if (!hasImagePath)
    imagename = `${Math.random()}-${cabin.image?.name?.replaceAll("/", "")}`;

  const imageUrl =
    hasImagePath || cabin.name.startsWith("Copy of")
      ? cabin.image
      : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imagename}`;

  // 1. Create/Edit Cabin
  let query = supabase.from("cabins");

  // A. Create
  if (!hasImagePath) {
    query = query.insert([{ ...cabin, image: imageUrl }]);
  }

  // B. Edit
  if (hasImagePath) {
    query = query.update({ ...cabin, image: imageUrl }).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    throw new Error(`Error ${id ? "updating" : "creating"} cabin`);
  }

  // 2. Upload image to supabase storage
  if (!hasImagePath) {
    const { error: StorageError } = await supabase.storage
      .from("cabin-images")
      .upload(imagename, cabin.image);

    // 3. Delete the cabin if the image upload fails
    if (StorageError) {
      await supabase.from("cabins").delete().eq("id", data[0].id);
      throw new Error("Error uploading image so cabin was not created");
    }
  }

  return data;
}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error("Error deleting cabin");
  }

  return data;
}
