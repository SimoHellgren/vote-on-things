import { redirect } from "@sveltejs/kit";

export async function load({ params, locals: { supabase, getSession } }) {
    const session = await getSession();

    const { data: items } = await supabase.from("item").select(`
        id,
        name,
        owner:profiles(id, email)
    `).eq('list_id', params.id);

    const { data: list } = await supabase.from("list").select(`
        id,
        name,
        owner:profiles!owner(email)
    `
    ).eq('id', params.id).single();

    const { data: members } = await supabase.from("listpermission").select(`
        member:profiles(email)
    `).eq('list_id', params.id);

    return {
        list,
        members: members.map(m => m.member),
        items: items ?? [],
        user: session.user
    };
}


export const actions = {
    addItem: async ({ request, params, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const newitems = formData.get("newitems").split("\n").filter(Boolean);

        const session = await getSession();

        const { dbData, error } = await supabase.from("item").insert(newitems.map(item => ({
            name: item,
            list_id: params.id,
            owner: session.user.id,
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
    },

    removeList: async ({ params, locals: { supabase, getSession } }) => {
        const { error } = await supabase.from("list").delete().eq('id', params.id);

        redirect(302, '/lists')
    },

    removeItem: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const itemId = formData.get("itemId");
        const { error } = await supabase.from("item").delete().eq('id', itemId);
    },

    shareList: async ({ request, params, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const email = formData.get("email");

        if (!email) {
            return {
                status: 400,
                body: "Email is required",
            };
        }

        const { data: user } = await supabase.from("profiles").select().eq('email', email).single();

        if (!user) {
            return {
                status: 404,
                body: "User not found",
            };
        }

        console.log(user)

        const { error } = await supabase.from("listpermission").insert({
            list_id: params.id,
            user_id: user.id,
            permission: "member",
        });

        if (error) {
            console.error(error);
            return {
                status: 500,
                body: error,
            };
        }

    }
}