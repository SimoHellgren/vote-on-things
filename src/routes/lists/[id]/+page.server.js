import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
    const { data } = await supabase.from("item").select().eq('list_id', params.id);

    return {
        items: data ?? [],
    };
}