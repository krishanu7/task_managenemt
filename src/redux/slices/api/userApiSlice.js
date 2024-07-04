import { apiSlice } from "../apiSlice";
const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getTeamList: builder.query({
      query: () => ({
        url: `${USER_URL}/get-team`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    userActive: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `${USER_URL}/notifications`,
        method: "GET",
        credentials: "include",
      }),
    }),
    markNotificationAsRead: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/read-notifications?isReadType=${data.type}&id=${data?.id}`,
        method: "PUT",
        data: data,
        credentials: "include",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});
export const {
  useUpdateMutation,
  useGetTeamListQuery,
  useDeleteUserMutation,
  useUserActiveMutation,
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useChangePasswordMutation,
} = userApiSlice;
