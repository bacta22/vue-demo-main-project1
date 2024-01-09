export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const newCoach = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate,
    };
    const response = await fetch(
      `https://vue-http-demo-da57e-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );

    // const responseData = await response.json();
    if (!response.ok) {
      // error ...
    }

    context.commit('addCoach', { ...newCoach, id: userId });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `https://vue-http-demo-da57e-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      // ...
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
