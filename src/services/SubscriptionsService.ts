import { AxiosResponse } from "axios";
import $api from "../http";
import { GetSubscriptionsResponse, СreatingSubscriptionResponse, SubscriptionData } from "../types/subscriptions";

class SubscriptionsService {
    static async getSubscriptions(id: number): Promise<AxiosResponse<GetSubscriptionsResponse>> {
        return $api.get<GetSubscriptionsResponse>(`api/v1/users/${id}/subscription-types/`)
    }
    static async creatingSubscription(data: SubscriptionData): Promise<AxiosResponse<СreatingSubscriptionResponse>> {
        return $api.post<СreatingSubscriptionResponse>(`api/v1/subscription-types/`, {...data}, {
            headers: {
              'Content-type' : 'multipart/form-data'
            }
          })
    }
    static async editSubscription(id: number, data: SubscriptionData): Promise<AxiosResponse<СreatingSubscriptionResponse>> {
        return $api.patch<СreatingSubscriptionResponse>(`api/v1/subscription-types/${id}/`, {...data})
    }
    static async deleteSubscription(id: number): Promise<AxiosResponse> {
        return $api.delete(`api/v1/subscription-types/${id}/`)
    }
}

export default SubscriptionsService