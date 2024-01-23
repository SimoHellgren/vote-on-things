import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
    const { data: items } = await supabase.from("item").select().eq('list_id', params.id);
    const { data: list } = await supabase.from("list").select().eq('id', params.id).single();


    return {
        list,
        items: items ?? [],
    };
}


export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData()
        const newitems = formData.get("newitems").split("\n").filter(Boolean)

        const { dbData, error } = await supabase.from("item").insert(newitems.map(item => ({
            name: item,
            list_id: params.id
        })));

        if (error) {
            console.error(error);
            return {
                status: 500,
                body: error,
            };
        }

        return {
            status: 200,
            body: dbData,
        };
    }
}