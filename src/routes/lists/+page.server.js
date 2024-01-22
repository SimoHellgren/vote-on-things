import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data } = await supabase.from("list").select();

    return {
        list: data ?? [],
    };
}