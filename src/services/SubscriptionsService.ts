import { AxiosResponse } from 'axios';
import $api from '../http';
import {
  GetSubscriptionsResponse,
  SubData,
  SubCreateData,
  SubEditData,
} from '../types/subscriptions';

class SubscriptionsService {
  static async getSubscriptions(
    userId: number
  ): Promise<AxiosResponse<GetSubscriptionsResponse>> {
    return $api.get<GetSubscriptionsResponse>(
      `users/${userId}/subscription-types/`
    );
  }
  static async getSubscriptionData(
    postId: number
  ): Promise<AxiosResponse<SubData>> {
    return $api.get<SubData>(`subscription-types/${postId}`);
  }
  static async creatingSubscription(
    data: SubCreateData
  ): Promise<AxiosResponse<SubData>> {
    return $api.post<SubData>(
      `subscription-types/`,
      { ...data },
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
    );
  }
  static async editSubscription(
    subId: number,
    data: SubEditData
  ): Promise<AxiosResponse<SubData>> {
    return $api.patch<SubData>(
      `subscription-types/${subId}/`,
      { ...data },
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
    );
  }
  static async deleteSubscription(subId: number): Promise<AxiosResponse> {
    return $api.delete(`subscription-types/${subId}/`);
  }
  static async subOrUnsub(
    subId: number,
    type: 'sub' | 'unsub'
  ): Promise<AxiosResponse<{ message: string }>> {
    let url = `subscription-types/${subId}/subscribe/`;
    switch (type) {
      case 'sub':
        return $api.post<{ message: string }>(url);
      case 'unsub':
        return $api.delete<{ message: string }>(url);
    }
  }
}

export default SubscriptionsService;
