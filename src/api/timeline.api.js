// src/api/timeline.api.js
import { apiClient } from './apiClient';

export function getTimelineEvents(patientId) {
  if (!patientId) {
    return Promise.resolve([]);
  }

  return apiClient
    .get(`/records/patient/${encodeURIComponent(patientId)}/timeline`)
    .then((response) => response.data);
}

export function createMedicalEvent(data) {
  return apiClient
    .post('/records', data)
    .then((response) => response.data);
}

export const timelineApi = {
  getAll: getTimelineEvents,
  create: createMedicalEvent
};
