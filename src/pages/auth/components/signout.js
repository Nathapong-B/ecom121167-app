import { useAuthStore } from "../../../ecomStore/authStore";

export const signOut = async ({ isReload = true } = {}) => {
    const localName = useAuthStore.persist.getOptions().name;

    await new Promise(resolv => {
        resolv(localStorage.removeItem(localName));
    });

    if (isReload) window.location.reload();

    return true;
};