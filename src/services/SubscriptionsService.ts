import { AxiosResponse } from "axios";
import $api from "../http";
import { GetSubscriptionsResponse, СreatingSubscriptionResponse, SubscriptionData } from "../types/subscriptions";

class SubscriptionsService {
    static async getSubscriptions(id: number): Promise<AxiosResponse<GetSubscriptionsResponse>> {
        return $api.get<GetSubscriptionsResponse>(`api/v1/subscriptions/user/${id}/`)
    }
    static async creatingSubscription(data: SubscriptionData): Promise<AxiosResponse<СreatingSubscriptionResponse>> {
        return $api.post<СreatingSubscriptionResponse>(`api/v1/subscriptions/`, {...data})
    }
    static async editSubscription(id: number, data: SubscriptionData): Promise<AxiosResponse<СreatingSubscriptionResponse>> {
        return $api.patch<СreatingSubscriptionResponse>(`api/v1/subscriptions/${id}/`, {...data})
    }
    static async deleteSubscription(id: number): Promise<AxiosResponse> {
        return $api.delete(`api/v1/subscriptions/${id}/`)
    }
}

export default SubscriptionsService