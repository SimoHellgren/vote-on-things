import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
    const { data: items } = await supabase.from("item").select().eq('list_id', params.id);
    const { data: list } = await supabase.from("list").select().eq('id', params.id).single();


    return {
        list,
        items: items ?? [],
    };
}
