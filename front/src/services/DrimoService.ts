import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import axios from 'axios';
import { getCookie } from '../Helpers/cookies';
import { ICategory } from '../models/ICategory';
import { IDelivery } from '../models/IDelivery';
import { IFillingItem } from '../models/IFillingItem';
import { IPayment } from '../models/IPayment';
import { ISolution } from '../models/ISolution';
import { ISolutionPage } from '../models/ISolutionPage';
import { ISubcategory } from '../models/ISubcategory';
import { useAppSelector } from '../store/hooks/redux';
import { getUrl } from './URL';

const drimoURL = getUrl();

export const drimoAPI = createApi({
  reducerPath: 'drimoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: drimoURL }),
  tagTypes: ['Category', 'Texture', 'Subcategory', 'Solution', 'DeliveryMethod', 'Order', 'PaymentMethod', 'Restrictions', 'Filling', 'SavedSolutions'],
  endpoints: (build) => ({

    fetchAllCategories: build.query<ICategory[], any>({
      query: ({ param, order }) => {
        return {
          url: `category/categories${param && order ? `?${param}=${order}` : ''}`,
        }
      },
      providesTags: result => ['Category']
    }),

    fetchCategory: build.query<ICategory, any>({
      query: (id) => ({
        url: `category/${id}`,
      }),
      providesTags: result => ['Category']
    }),

    createCategory: build.mutation({
      query: (category) => ({
        url: 'category',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Category']
    }),

    updateCategory: build.mutation({
      query: (category) => ({
        url: `category/${category.id}`,
        method: 'PATCH',
        body: category,
      }),
      invalidatesTags: ['Category']
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category']
    }),

    //////////////////////////////////

    fetchTextureTypes: build.query({
      query: () => ({
        url: `texture/texture_types`,
      }),
      providesTags: result => ['Texture']
    }),

    fetchAllTextures: build.query({
      query: ({ currentPage, types, param, order }) => ({
        url: `texture/textures?page=${currentPage + 1}&${types.length > 0 ? 'type=' + types.join('&type=') : ''}${param && order ? `&${param}=${order}` : ''}`,
        // params: {
        //   sort_order: 'desc',
        //   col_name: 'name'
        // }
      }),
      providesTags: result => ['Texture']
    }),

    fetchTextureELements: build.query({
      query: ({ id, param, order }) => ({
        url: `element2texture/by_texture/${id}?${param}=${order}`
      }),
      providesTags: ['Texture']
    }),

    fetchTexture: build.query({
      query: (id) => ({
        url: `texture/${id}`,
      }),
      providesTags: result => ['Texture']
    }),

    createTexture: build.mutation<{}, FormData>({
      query: (formData) => ({
        url: 'texture',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Texture']
    }),

    updateTexture: build.mutation({
      query: ({ formData, id }) => ({
        url: `texture/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Texture']
    }),
    updateDefaultTexture: build.mutation({
      query: ({ type, id }) => ({
        url: `default/texture/${id}`,
        method: 'PATCH',
        body: { type : type },
      }),
      invalidatesTags: ['Texture']
    }),

    updateTextureElement: build.mutation({
      query: ({ id, formData }) => ({
        url: `element2texture/${id}`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['Texture']
    }),

    deleteTexture: build.mutation({
      query: (id) => ({
        url: `texture/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Texture']
    }),

    ////////////////////////////////// 

    fetchAllSolutions: build.query<{ rows: ISolution[], total: number }, any>({
      query: ({ page, param, order }) => ({
        url: `solution/solutions?page=${page + 1}&${param}=${order}`,
      }),
      providesTags: result => ['Solution']
    }),

    fetchSolutionsById: build.query<ISolution[], any>({
      query: ({ id, order, param }) => ({
        url: `solution/by_subcategory/${id}?${param}=${order}`,
      }),
      providesTags: result => ['Solution']
    }),

    fetchSolution: build.query<ISolutionPage, any>({
      query: ({ id, param, order }) => ({
        url: `solution/${id}?${param}=${order}`,
      }),
      providesTags: result => ['Solution']
    }),

    createSolution: build.mutation({
      query: (solution) => ({
        url: 'solution',
        method: 'POST',
        body: solution,
      }),
      invalidatesTags: ['Solution']
    }),

    updateSolution: build.mutation({
      query: ({ formData, id }) => ({
        url: `solution/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Solution']
    }),

    deleteSolution: build.mutation({
      query: (id) => ({
        url: `solution/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Solution']
    }),

    //////////////////////////////////

    fetchAllSubcategories: build.query<ISubcategory[], any>({
      query: ({ parent_id, order, param }) => ({
        url: `subcategory/by_category/${parent_id}${param && order ? `?${param}=${order}` : ''}`,
      }),
      providesTags: result => ['Subcategory']
    }),

    fetchSubcategory: build.query({
      query: (id) => ({
        url: `subcategory/${id}`,
      })
    }),

    createSubcategory: build.mutation<{}, FormData>({
      query: (formData) => ({
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        url: 'subcategory',
        method: 'POST',
        body: formData,

      }),
      invalidatesTags: ['Subcategory', 'Category']
    }),

    updateSubcategory: build.mutation({
      query: ({ id, formData }) => ({
        url: `subcategory/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Subcategory']
    }),

    deleteSubcategory: build.mutation({
      query: (id) => ({
        url: `subcategory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subcategory']
    }),

    //////////////////////////////////

    fetchRestrictions: build.query({
      query: () => ({
        url: `restriction/restrictions`
      }),
      providesTags: result => ['Restrictions']
    }),

    updateRestrictions: build.mutation({
      query: (restrictions) => ({
        url: `restriction`,
        method: 'PATCH',
        body: restrictions
      }),
      invalidatesTags: ['Restrictions']
    }),

    //////////////////////////////////

    fetchDeliveryMethods: build.query({
      query: ({ param, order }) => ({
        url: `delivery_method/delivery_methods?${param}=${order}`,
      }),
      providesTags: result => ['DeliveryMethod']
    }),

    fetchDeliveryMethod: build.query<IDelivery, any>({
      query: (id) => ({
        url: `delivery_method/${id}`,
      }),
      providesTags: result => ['DeliveryMethod']
    }),


    createDeliveryMethod: build.mutation({
      query: (delivery_method) => ({
        url: 'delivery_method',
        method: 'POST',
        body: delivery_method,
      }),
      invalidatesTags: ['DeliveryMethod']
    }),

    updateDeliveryMethod: build.mutation({
      query: ({ id, name, cost, description }) => ({
        url: `delivery_method/${id}`,
        method: 'PATCH',
        body: { name, cost, description },
      }),
      invalidatesTags: ['DeliveryMethod']
    }),

    deleteDeliveryMethod: build.mutation({
      query: (id) => ({
        url: `delivery_method/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DeliveryMethod']
    }),

    fetchDeliveryTypes: build.query({
      query: () => ({
        url: `delivery_method/delivery_method_types`
      })
    }),

    //////////////////////////////////

    fetchOrders: build.query({
      query: () => ({
        url: `order/get_orders`,
      }),
      providesTags: result => ['Order']
    }),

    createOrder: build.mutation({
      query: (order) => ({
        url: 'order/',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order']
    }),

    updateOrder: build.mutation({
      query: (order) => ({
        url: `order/${order.id}`,
        method: 'PATCH',
        body: order,
      }),
      invalidatesTags: ['Order']
    }),

    deleteOrder: build.mutation({
      query: (id) => ({
        url: `order/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order']
    }),

    fetchOrderStatuses: build.query({
      query: () => ({
        url: `order/order_status`,
      }),
      providesTags: result => ['Order']
    }),

    //////////////////////////////////

    fetchPaymentMethods: build.query({
      query: ({ param, order }) => ({
        url: `payment_method/payment_methods?${param}=${order}`,
      }),
      providesTags: result => ['PaymentMethod']
    }),

    fetchPaymentMethod: build.query<IPayment, any>({
      query: (id) => ({
        url: `payment_method/${id}`,
      }),
      providesTags: result => ['PaymentMethod']
    }),

    createPaymentMethod: build.mutation({
      query: (payment_method) => ({
        url: 'payment_method',
        method: 'POST',
        body: payment_method,
      }),
      invalidatesTags: ['PaymentMethod']
    }),

    updatePaymentMethod: build.mutation({
      query: ({ id, name, description }) => ({
        url: `payment_method/${id}`,
        method: 'PATCH',
        body: { name, description },
      }),
      invalidatesTags: ['PaymentMethod']
    }),

    deletePaymentMethod: build.mutation({
      query: (id) => ({
        url: `payment_method/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PaymentMethod']
    }),

    fetchPaymentTypes: build.query({
      query: () => ({
        url: `payment_method/payment_method_types`
      })
    }),

    //////////////////////////////////

    fetchAllElements: build.query({
      query: ({ type, param, order }) => ({
        url: `element/elements?type=${type}&${param}=${order}`
      }),
      providesTags: result => ['Filling']
    }),

    fetchElement: build.query({
      query: (id) => ({
        url: `/element/${id}`
      }),
      providesTags: result => ['Filling']
    }),

    updateElement: build.mutation({
      query: ({ id, formData }) => ({
        url: `/element/${id}`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['Filling']
    }),

    fetchCatalog: build.query({
      query: ({ id, page }) => ({
        url: `/solution/catalog?subcategory_id=${id}&page=${page}`,
      })
    }),
    fetchPopularSubcategories: build.query({
      query: () => ({
        url: `/subcategory/popular_subcategory`
      })
    }),
    fetchPopularCategories: build.query({
      query: () => ({
        url: `/category/popular_category`
      })
    }),

    fetchPopularSolutions: build.query({
      query: () => ({
        url: `/solution/popular_solutions`
      })
    }),

    //////////////////////////////////

    fetchSavedSolutions: build.query({
      query: ({ page, type }) => ({
        url: `saved/all_saved?${type ? 'type=' + type : ''}&page=${page + 1}`,
        headers: {
          Authorization: `Bearer ${getCookie('apiToken')}`,
          ID: `${getCookie('userId')}`
        }
      }),
      providesTags: result => ['SavedSolutions']
    }),

    deleteSavedSolution: build.mutation({
      query: (id) => ({
        url: `saved/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getCookie('apiToken')}`,
          ID: `${getCookie('userId')}`
        }
      }),
      invalidatesTags: ['SavedSolutions']
    }),

    fetchAllUserSavedSolutions: build.query({
      query: ({ id, page, param, order }) => ({
        url: `saved/manager_saved/${id}?page=${page}&${param}=${order}`,
        headers: {
          Authorization: `Bearer ${getCookie('apiTokenManager')}`,
          ID: `${getCookie('userIdManager')}`
        }
      }),
      providesTags: result => ['SavedSolutions']
    }),

    createSavedSolution: build.mutation({
      query: (id) => ({
        url: `saved`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getCookie('apiToken')}`,
          ID: `${getCookie('userId')}`
        },
        body: {
          solution_id: id
        }
      }),
      invalidatesTags: ['SavedSolutions']
    }),

    fetchSavedSolutionsTypes: build.query({
      query: () => ({
        url: `saved/get_types`,
        headers: {
          Authorization: `Bearer ${getCookie('apiToken')}`,
          ID: `${getCookie('userId')}`
        }
      }),
      providesTags: result => ['SavedSolutions']
    }),

    //////////////////////////////////

    fetchUserOrders: build.query({
      query: () => ({
        url: `order/private_orders`,
        headers: {
          Authorization: `Bearer ${getCookie('apiToken')}`,
          ID: `${getCookie('userId')}`
        }
      })
    }),

    fetchUserOrder: build.query({
      query: (id) => ({
        url: `order/private_order/${id}`,
        headers: {
          Authorization: `Bearer ${getCookie('apiToken')}`,
          ID: `${getCookie('userId')}`
        }
      }),
      providesTags: result => ['Order']
    }),

    fetchManagerUserOrders: build.query({
      query: ({ id, page, param, order }) => ({
        url: `order/${id}?page=${page}&${param}=${order}`,
        headers: {
          Authorization: `Bearer ${getCookie('apiTokenManager')}`,
          ID: `${getCookie('userIdManager')}`
        }
      }),
      providesTags: result => ['Order']
    }),

    fetchAllOrders: build.query({
      query: ({ page, param, order, delivery, payment, status }) => ({
        url: `order/orders?page=${page + 1}&${delivery.length > 0 ? 'delivery_type=' + delivery.join('&delivery_type=') : ''}&${payment.length > 0 ? 'payment_type=' + payment.join('&payment_type=') : ''}&${status.length > 0 ? 'status_type=' + status.join('&status_type=') : ''}&${param}=${order}`,
      }),
      providesTags: result => ['Order']
    }),

    fetchSingleUserOrder: build.query({
      query: (id) => ({
        url: `order/order_id/${id}`,
        headers: {
          Authorization: `Bearer ${getCookie('apiTokenManager')}`,
          ID: `${getCookie('userIdManager')}`
        }
      }),
      providesTags: result => ['Order']
    }),

    //////////////////////////////////

    deliveryCity: build.query<{ search: string }, any>({
      query: ({ search }) => ({
        url: `delivery_city?search=${search}`,
      }),
    }),

    deliveryStreet: build.query<{ city_id: number; search: string }, any>({
      query: ({ city_id, search }) => ({
        url: `delivery_street?city_id=${city_id}&search=${search}`,
      }),
    }),

    calculateAddress: build.query<{ city: string; street: string; building: string; weight: any; }, any>({
      query: ({ city, street, building, weight }) => ({
        url: `delivery_price?city=${city}&street=${street}&building=${building}&weight=${weight}`,
      }),
    }),

  })
})