import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { addCategory, callListCategories, callListCategoriesHome, changeStatusCategory, removeCategory, updateCategory } from "../api/categoryApi";
import { addProduct, changeStatusProduct, listInactiveProducts, listProducts, listProductsBy, removeProduct, updateProduct } from "../api/productApi";
import { listOrdersAdmin, removeOrder, updateOrder } from "../api/orderApi";
import { getCount, reportPerDay } from "../api/reportApi";

const ecomStore = (set, get) => ({
    categories: null,
    inactiveCategories: null,
    products: null,
    productsLoading: false,
    productsError: null,
    inactiveProducts: null,
    orders: null,
    pNewArrival: null,
    pNewArrivalLoading: false,
    pNewArrivalError: null,
    pBestSeller: null,
    pBestSellerLoading: false,
    pBestSellerError: null,
    reportThisMonth: null,
    countuser: null,
    countproduct: null,
    countcategory: null,

    // report
    actionCountModel: async (model, token) => {
        try {
            const res = await getCount(model, token);

            if (res.status === 200) {
                set({ ['count' + model.toLowerCase()]: res.data.result });
                return { success: { message: 'Success' } };
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err);
            if (err?.code === "ERR_NETWORK") return { error: { message: err.message } };
            return { error: { message: err.response.data.message } };
        };
    },


    actionReportThisMonth: async (payload, token) => {
        try {
            const res = await reportPerDay(payload, token);

            if (res.status === 200) {
                set({ reportThisMonth: res.data.result });
                return { success: { message: 'Success' } };
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err);
            if (err?.code === "ERR_NETWORK") return { error: { message: err.message } };
            return { error: { message: err.response.data.message } };
        }
    },

    // categories
    actionCallListCategoriesOnHome: async () => {
        try {
            const res = await callListCategoriesHome();

            if (res.status === 200) {
                set({ categories: res.data.result });
            } else {
                return { error: { message: 'Somthing wrong' } };
            };

            return res;
        } catch (err) {
            if (err?.code === "ERR_NETWORK") return { error: { message: err.message } };
            return { error: { message: err.response.data.message } };
        }
    },

    actionCallListCategories: async (statusby, token) => {
        try {
            const res = await callListCategories(statusby, token);

            if (statusby === 'active') {
                set({ categories: res.data.result });
            } else {
                set({ inactiveCategories: res.data.result });
            }

            return res;
        } catch (err) {
            return { error: { message: err.response.data.message } };
        }
    },

    actionAddCategory: async ({ data, token }) => {
        try {
            const resAdd = await addCategory(data, token);

            if (resAdd.status === 200) {
                const res = await callListCategories('active', token);

                set({ categories: res.data.result });

                return resAdd;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            return { error: { message: err.response.data.message } };
        }
    },

    actionUpdateStatusCategory: async (item, token) => {
        try {
            const { id, status } = item;
            const data = status === 'active' ? { status: 'inactive' } : { status: 'active' };

            const resStatus = await changeStatusCategory(id, data, token);

            if (resStatus.status === 200) {
                const statusby = status;
                const res = await callListCategories(statusby, token);

                if (statusby === 'active') {
                    set({ categories: res.data.result });
                } else {
                    set({ inactiveCategories: res.data.result });
                }

                return resStatus;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            return { error: { message: err.response.data.message } };
        }
    },

    actionUpdateCategory: async (id, data, token) => {
        try {
            const resUpdate = await updateCategory(id, data, token);

            if (resUpdate.status === 200) {
                const res = await callListCategories('active', token);

                set({ categories: res.data.result });

                return resUpdate;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            return { error: { message: err.response.data.message } };
        }
    },

    actionRemoveCategory: async (id, token) => {
        try {
            const resRemove = await removeCategory(id, token);

            if (resRemove.status === 200) {
                const res = await callListCategories('inactive', token);

                set({ inactiveCategories: res.data.result });

                return resRemove;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },


    // products
    actionCallListProduct: async (count) => {
        set({ productsLoading: true, productsError: null });
        try {
            const res = await listProducts(count);
            set({ products: res.data.result, productsLoading: false });
            return { success: true, res };
        } catch (err) {
            console.error("Error fetching products:", err);
            set({ productsError: err, productsLoading: false });
            if (err?.code === "ERR_NETWORK") return { error: { message: err.message } };
            const errorMessage = err.response?.data?.message || 'Failed to fetch products';
            return { error: { message: errorMessage } };
        }
    },

    actionCallListInactiveProducts: async (count, token) => {
        try {
            const res = await listInactiveProducts(count, token);

            set({ inactiveProducts: res.data.result });

            return res;
        } catch (err) {
            // console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

    actionAddProduct: async (data, token) => {
        try {
            const res = await addProduct(data, token);

            return res;
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

    actionUpdateProduct: async (id, data, token) => {
        try {
            const res = await updateProduct(id, data, token);

            return res;
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

    actionUpdateStatusProduct: async (item, token) => {
        try {
            const { id, status } = item;
            const data = status === 'active' ? { status: 'inactive' } : { status: 'active' };

            const resStatus = await changeStatusProduct(id, data, token);

            if (resStatus.status === 200) {
                if (status === 'active') {
                    const res = await listProducts(6);

                    if (res.status === 200) set({ products: res.data.result });
                };

                if (status === 'inactive') {
                    const res = await listInactiveProducts(6, token);

                    if (res.status === 200) set({ inactiveProducts: res.data.result });
                };

                return resStatus;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

    actionRemoveProduct: async (id, token) => {
        try {
            const resRemove = await removeProduct(id, token);

            if (resRemove.status === 200) {
                const res = await listInactiveProducts(6, token);

                if (res.status === 200) set({ inactiveProducts: res.data.result });

                return resRemove;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

    actionListProductsBy: async (count, sort) => {
        let keyName, loadingKey, errorKey, sortBy;
        
        // Determine keys based on sort parameter
        switch (sort) {
            case 'newarrival':
                keyName = 'pNewArrival';
                loadingKey = 'pNewArrivalLoading';
                errorKey = 'pNewArrivalError';
                sortBy = 'create_date';
                break;
            case 'bestseller':
                keyName = 'pBestSeller';
                loadingKey = 'pBestSellerLoading';
                errorKey = 'pBestSellerError';
                sortBy = 'sold'
                break;
            default:
                console.error("Invalid sort parameter for actionListProductsBy");
                return { error: { message: 'Invalid sort parameter' } };
        };

        // Set loading state to true and clear previous errors for the specific type
        set({ [loadingKey]: true, [errorKey]: null });

        try {
            const res = await listProductsBy(count, sortBy);

            if (res.status === 200) {
                // Set data and loading to false on success
                set({ [keyName]: res.data.result, [loadingKey]: false });
                return { success: true, res };
            } else {
                // Handle non-200 status as error
                const errorMessage = 'Failed to fetch products (non-200 status)';
                console.error(errorMessage, res);
                set({ [errorKey]: new Error(errorMessage), [loadingKey]: false });
                return { error: { message: 'Somthing wrong' } }; // Keep original return for consistency?
            };
        } catch (err) {
            console.error(`Error fetching ${sort} products:`, err);
             // Set error state and loading to false on catch
            set({ [errorKey]: err, [loadingKey]: false });
            if (err?.code === "ERR_NETWORK") return { error: { message: err.message } };
            const errorMessage = err.response?.data?.message || `Failed to fetch ${sort} products`;
            return { error: { message: errorMessage } };
        }
    },


    // orders
    actionCalllistOrdersAdmin: async (count, token) => {
        try {
            const res = await listOrdersAdmin(count, token);

            if (res.status === 200) {
                set({ orders: res.data.result });
                return res;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

    actionUpdateTrackingOrder: async (id, data, token) => {
        try {
            const res = await updateOrder(id, data, token);

            if (res.status === 200) {
                const resList = await listOrdersAdmin(20, token);

                set({ orders: resList.data.result });

                return res;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

    actionRemoveOrder: async (id, token) => {
        try {
            const res = await removeOrder(id, token);

            if (res.status === 200) {
                const resList = await listOrdersAdmin(20, token);

                set({ orders: resList.data.result });
                return res;
            } else {
                return { error: { message: 'Somthing wrong' } };
            };
        } catch (err) {
            console.log(err)
            return { error: { message: err.response.data.message } };
        }
    },

});

const usePersist = {
    name: 'ecomStore-121167', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage),
    // storage: createJSONStorage(() => sessionStorage),
};

export const useEcomStore = create(persist(ecomStore, usePersist));