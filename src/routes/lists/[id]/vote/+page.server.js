export async function load({ params, locals: { supabase } }) {
    const { data: items } = await supabase.from("item").select().eq('list_id', params.id);
    const { data: list } = await supabase.from("list").select().eq('id', params.id).single();
    const { data: votes } = await supabase.from("itemvote").select(`
        item(id, name),
        user:profiles(email),
        result
    `).eq('list_id', params.id);

    return {
        list,
        items: items ?? [],
        votes: votes ?? [],
    };
}


export const actions = {
    default: async ({ params, request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const result = formData.get("result");
        const item_id = formData.get("id");

        const session = await getSession();

        const { data, error } = await supabase.from("itemvote").insert(
            {
                item_id,
                user_id: session.user.id,
                result: result,
                list_id: params.id
            }
        ).select().single();

        if (error) console.error(error);

        return data

    }
}